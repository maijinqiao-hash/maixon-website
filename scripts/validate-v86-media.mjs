import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const manifest=JSON.parse(await fs.readFile('src/data/v86/media-manifest.json','utf8'));
const files=new Set();
for(const asset of manifest.assets){
  const p=path.join('public/media/v86',asset.path);
  const data=await fs.readFile(p);
  if(data.length!==asset.bytes||crypto.createHash('sha256').update(data).digest('hex')!==asset.sha256)throw new Error(`V8.6 media changed without review: ${p}`);
  files.add(asset.path);
  if(asset.path.endsWith('.mp4')&&!asset.full_decode_passed)throw new Error(`Missing full decode verification: ${p}`);
  if(asset.path.endsWith('.mp4')&&!(asset.audio_peak_db>-65))throw new Error(`Missing audible audio: ${p}`);
}
for(const asset of manifest.assets.filter(x=>x.path.endsWith('.mp4')&&!x.path.startsWith('mobile/'))){
  const mobile=manifest.assets.find(x=>x.path===`mobile/${asset.path}`);
  if(!mobile||Math.abs(mobile.duration-asset.duration)>.15)throw new Error(`Missing complete mobile video: ${asset.path}`);
}
for(const asset of manifest.assets.filter(x=>x.path.startsWith('screenshots/light/'))){
  if(!files.has(asset.path.replace('/light/','/dark/')))throw new Error(`Missing dark pair: ${asset.path}`);
}
for(const asset of manifest.assets.filter(x=>x.path.startsWith('videos/')&&!x.path.startsWith('videos/en/'))){
  const name=path.basename(asset.path,'.mp4');
  for(const required of [`videos/en/${name}.mp4`,`captions/${name}.zh-CN.vtt`,`captions/${name}.en.vtt`])if(!files.has(required))throw new Error(`Missing translated media: ${required}`);
}
const demosSource=await fs.readFile('src/data/v86/demos.ts','utf8');
const ownerVideos=manifest.assets.filter(x=>x.path.startsWith('owner/')&&x.path.endsWith('.mp4'));
if(ownerVideos.length!==12)throw new Error(`Expected 12 owner videos, found ${ownerVideos.length}`);
for(const asset of ownerVideos){
  const id=path.basename(asset.path,'.mp4');
  if(!new RegExp(`id:\\s*['"]${id}['"]`).test(demosSource))throw new Error(`Owner video missing from page catalog: ${id}`);
  if(!files.has(`owner/${id}.webp`))throw new Error(`Missing owner video poster: ${id}`);
}
console.log(`V8.6 media validation passed: ${files.size} verified assets, paired themes and bilingual narration/captions.`);
