import assert from 'node:assert/strict';
import worker from '../deployment/video-worker.mjs';
import mediaManifest from '../src/data/v86/media-manifest.json' with {type:'json'};

// Model the runtime's byte-length guarantee while exercising real Fetch streams.
globalThis.FixedLengthStream = class extends TransformStream {
  constructor(length) {
    let written = 0;
    super({transform(chunk, controller) {written += chunk.byteLength; assert.ok(written <= length); controller.enqueue(chunk);}, flush() {assert.equal(written,length);}});
  }
};
const data = Uint8Array.from({length: 10007}, (_,i) => i % 251);
let cancellations = 0, forwarded;
const env={ASSETS:{async fetch(request) {
  forwarded=request;
  if (request.headers.get('If-None-Match') === '"fixture"') return new Response(null,{status:304});
  let offset=0;
  const body=request.method==='HEAD'?null:new ReadableStream({pull(c) {if(offset===data.length){c.close();return;}const end=Math.min(offset+997,data.length);c.enqueue(data.slice(offset,end));offset=end;},cancel(){cancellations++;}});
  return new Response(body,{headers:{'Content-Type':'video/mp4','Content-Length':String(data.length),ETag:'"fixture"'}});
}}};
async function run(range, status, start=0, end=data.length-1, extra={}) {
  const pending=[];const headers={...extra};if(range)headers.Range=range;
  const response=await worker.fetch(new Request('https://example.test/media/v86/videos/voice.mp4',{headers}),env,{waitUntil(p){pending.push(p);}});
  assert.equal(response.status,status);
  const actual=new Uint8Array(await response.arrayBuffer());await Promise.all(pending);
  if(status===206){assert.equal(response.headers.get('Content-Range'),`bytes ${start}-${end}/${data.length}`);assert.equal(response.headers.get('Content-Length'),String(end-start+1));assert.deepEqual(actual,data.slice(start,end+1));}
  else if(status===200)assert.deepEqual(actual,data);
  else assert.equal(actual.length,0);
  assert.equal(forwarded.headers.get('Range'),null);
}
await run(undefined,200);
await run('bytes=0-1',206,0,1);
await run('bytes=996-1996',206,996,1996);
await run('bytes=5000-',206,5000,10006);
await run('bytes=-9',206,9998,10006);
await run('bytes=-20000',206,0,10006);
await run('bytes=9000-90000',206,9000,10006);
await run('bytes=10007-',416);
await run('bytes=50-10',416);
await run('bytes=-0',416);
await run('bytes=9007199254740992-',416);
await run('bytes=0-1,4-5',200);
await run('invalid',200);
await run('bytes=0-1',200,0,10006,{'If-Range':'"old"'});
await run('bytes=0-1',206,0,1,{'If-Range':'"fixture"'});
await run('bytes=0-1',304,0,0,{'If-None-Match':'"fixture"'});
const head=await worker.fetch(new Request('https://example.test/media/v86/videos/voice.mp4',{method:'HEAD'}),env,{waitUntil(){}});
assert.equal(head.headers.get('Accept-Ranges'),'bytes');assert.equal((await head.arrayBuffer()).byteLength,0);
const other=new Request('https://example.test/zh-CN/');await worker.fetch(other,env,{});assert.equal(forwarded,other);
assert.ok(cancellations>0,'Partial reads cancel the unused asset stream');
const manifestSize=mediaManifest.assets.find(asset=>asset.path==='videos/voice.mp4').bytes;
const withoutLength={ASSETS:{async fetch(request){return new Response(request.method==='HEAD'?null:new Uint8Array(manifestSize),{headers:{'Content-Type':'video/mp4'}});}}};
const pending=[];
const fallback=await worker.fetch(new Request('https://example.test/media/v86/videos/voice.mp4',{headers:{Range:'bytes=100000-101023'}}),withoutLength,{waitUntil(p){pending.push(p);}});
assert.equal(fallback.status,206);assert.equal(fallback.headers.get('Content-Range'),`bytes 100000-101023/${manifestSize}`);
assert.equal((await fallback.arrayBuffer()).byteLength,1024);await Promise.all(pending);
const fallbackHead=await worker.fetch(new Request('https://example.test/media/v86/videos/voice.mp4',{method:'HEAD'}),withoutLength,{});
assert.equal(fallbackHead.headers.get('Content-Length'),String(manifestSize));
console.log('PASS: 20 range, boundary, validator, HEAD, passthrough and missing-length checks; exact bytes verified across stream chunk boundaries.');
