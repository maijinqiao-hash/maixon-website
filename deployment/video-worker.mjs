// Only software MP4 requests use this handler. Other assets keep direct hosting.
// Stream byte ranges without buffering a complete video in the Worker isolate.
import mediaManifest from '../src/data/v86/media-manifest.json' with {type: 'json'};

// ASSETS can omit Content-Length internally even when the edge adds it later.
// This build-validated manifest supplies lengths without reading the whole body.
const videoSizes = new Map(mediaManifest.assets.filter(asset => asset.path.endsWith('.mp4'))
  .map(asset => [`/media/v86/${asset.path}`, asset.bytes]));
export function byteRange(value, size) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(value?.trim() || '');
  if (!match || (!match[1] && !match[2])) return null;
  let start, end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return {invalid: true};
    start = Math.max(0, size - suffix); end = size - 1;
  } else {
    start = Number(match[1]); end = match[2] ? Number(match[2]) : size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) return {invalid: true};
    if (start >= size || end < start) return {invalid: true};
    end = Math.min(end, size - 1);
  }
  return size > 0 ? {start, end} : {invalid: true};
}

export function sliceStream(body, start, end) {
  const reader = body.getReader();
  let offset = 0;
  return new ReadableStream({
    async pull(controller) {
      try {
        while (true) {
          const {value, done} = await reader.read();
          if (done) {controller.error(new Error('Video ended before the requested byte range')); return;}
          const from = Math.max(0, start - offset);
          const to = Math.min(value.byteLength, end + 1 - offset);
          offset += value.byteLength;
          if (to > from) controller.enqueue(value.subarray(from, to));
          if (offset > end) {controller.close(); await reader.cancel(); return;}
          if (to > from) return;
        }
      } catch (error) {controller.error(error);}
    },
    cancel(reason) {return reader.cancel(reason);}
  });
}

export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    if (!path.startsWith('/media/v86/') || !path.endsWith('.mp4') || !['GET','HEAD'].includes(request.method)) {
      return env.ASSETS.fetch(request);
    }
    const assetRequest = new Request(request);
    assetRequest.headers.delete('Range');
    assetRequest.headers.delete('If-Range');
    assetRequest.headers.set('Accept-Encoding', 'identity');
    const response = await env.ASSETS.fetch(assetRequest);
    if (response.status !== 200 && response.status !== 304) return response;
    const headers = new Headers(response.headers);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('X-Maixon-Video-Delivery', 'bytes-v1');
    headers.set('Cache-Control', 'public, max-age=86400');
    if (response.status === 304) return new Response(null, {status: 304, headers});
    const size = Number(headers.get('Content-Length') ?? videoSizes.get(path));
    if (request.method === 'HEAD' && Number.isSafeInteger(size) && size > 0) headers.set('Content-Length', String(size));
    const full = () => new Response(response.body, {status: 200, headers});
    if (request.method !== 'GET' || !Number.isSafeInteger(size) || size <= 0 || headers.has('Content-Encoding')) return full();
    const condition = request.headers.get('If-Range');
    if (condition && condition !== headers.get('ETag')) return full();
    const range = byteRange(request.headers.get('Range'), size);
    if (!range) return full();
    if (range.invalid) {
      await response.body?.cancel();
      headers.set('Cache-Control', 'no-store');
      headers.set('Content-Range', `bytes */${size}`);
      headers.set('Content-Length', '0');
      return new Response(null, {status: 416, headers});
    }
    const length = range.end - range.start + 1;
    headers.set('Content-Range', `bytes ${range.start}-${range.end}/${size}`);
    headers.set('Content-Length', String(length));
    // Cloudflare derives Content-Length from this stream, not a manual header.
    const {readable, writable} = new FixedLengthStream(length);
    ctx.waitUntil(sliceStream(response.body, range.start, range.end).pipeTo(writable).catch(() => {}));
    return new Response(readable, {status: 206, headers});
  }
};
