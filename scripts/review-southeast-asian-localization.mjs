import fs from 'node:fs/promises';

const locales=['ms','id','vi'];
const reviewed={
 ...JSON.parse(await fs.readFile('src/data/i18n/southeast-asian-reviewed.json','utf8')),
 ...JSON.parse(await fs.readFile('src/data/i18n/southeast-asian-captions-reviewed.json','utf8'))
};
const terms=['Voice Commands','VOICE COMMANDS','AI Workbench','AI WORKBENCH','MAIXON Image Finder','MAIXON IMAGE FINDER','Extract Print','Remove Background','Enhance Detail','Enhance','Edit with Instructions','Expand Image','Crop Print','Vectorize','Sublimation','SUBLIMATION','Halftone','HALFTONE'];
const source=JSON.parse(await fs.readFile('src/data/i18n/source.json','utf8'));
for(const [index,locale] of locales.entries()){
 const filename=`src/data/i18n/${locale}.json`,catalog=JSON.parse(await fs.readFile(filename,'utf8'));
 for(const [key,translations] of Object.entries(reviewed))catalog[key]=translations[index];
 for(const key of Object.keys(source)){
  let result=catalog[key];
  for(const term of terms)result=result.replaceAll(term,reviewed[term][index]);
  if(locale==='ms'){
   if(/\bPSD\b/.test(key))result=result.replace(/\bJPA\b/g,'PSD');
   result=result.replaceAll('Meja Kerja AI','Ruang Kerja AI').replaceAll('meja kerja AI','Ruang Kerja AI');
   if(/light[- ]fabric/i.test(key))result=result.replace(/fabrik ringan/gi,'fabrik cerah');
  }
  if(locale==='id'&&/light[- ]fabric/i.test(key))result=result.replace(/kain ringan/gi,'kain terang');
  if(locale==='vi'&&/light[- ]fabric/i.test(key))result=result.replace(/vải nhẹ/gi,'vải sáng màu');
  if(locale==='id')result=result.replaceAll('Meja Kerja AI','Ruang Kerja AI');
  if(locale==='vi')result=result.replace(/bàn làm việc AI/gi,'Không gian làm việc AI');
  if(/artwork/i.test(key)){
   const expression={ms:/karya seni/gi,id:/karya seni/gi,vi:/tác phẩm nghệ thuật/gi}[locale];
   const replacement={ms:'corak',id:'gambar',vi:'hình'}[locale];
   result=result.replace(expression,match=>match[0]===match[0].toUpperCase()?replacement[0].toUpperCase()+replacement.slice(1):replacement);
  }
  if(/candidate/i.test(key)){
   if(locale==='ms')result=result.replace(/calon/gi,'imej padanan');
   if(locale==='id')result=result.replace(/kandidat/gi,'gambar hasil');
   if(locale==='vi')result=result.replace(/(?:các )?ứng (?:cử )?viên/gi,'các ảnh phù hợp');
  }
  if(locale==='vi')result=result.replaceAll('Tín dụng AI','Điểm AI').replaceAll('tín dụng AI','điểm AI').replaceAll('tín dụng','điểm');
  if(/^Play with sound[:：]/.test(key)){
   const title=key.replace(/^Play with sound[:：]\s*/,'');
   if(catalog[title])result=`${reviewed['Play with sound'][index]}: ${catalog[title]}`;
  }
  const namedTitle=key.match(/^(.+?) · (AI WORKBENCH|MAIXON TOOL V8\.6|MAIXON)$/);
  if(namedTitle&&catalog[namedTitle[1]])result=`${catalog[namedTitle[1]]} · ${reviewed[namedTitle[2]]?.[index]||namedTitle[2]}`;
  if(key.startsWith('← ')&&catalog[key.slice(2)])result=`← ${catalog[key.slice(2)]}`;
  const workflow=key.match(/^(.+) workflow$/);
  if(workflow&&catalog[workflow[1]])result=`${{ms:'Aliran kerja',id:'Alur kerja',vi:'Quy trình'}[locale]} · ${catalog[workflow[1]]}`;
  const screen=key.match(/^MAIXON TOOL V8\.6 (.+) — (light|dark) interface$/);
  if(screen){
   const topic=catalog[screen[1]]||({themes:{ms:'Tema',id:'Tema',vi:'Giao diện'}}[screen[1]]?.[locale]);
   if(topic)result=`MAIXON TOOL V8.6 · ${topic} · ${screen[2]==='light'?reviewed.Light[index]:reviewed.Dark[index]}`;
  }
  catalog[key]=result.replace(/\s+/g,' ').trim();
 }
 for(const [key,translations] of Object.entries(reviewed))catalog[key]=translations[index];
 await fs.writeFile(filename,JSON.stringify(Object.fromEntries(Object.entries(catalog).sort((a,b)=>a[0].localeCompare(b[0]))),null,2)+'\n');
}
console.log(`Reviewed ${Object.keys(reviewed).length} essential phrases and caption cues in Malay, Indonesian and Vietnamese.`);
