import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {validateManualV92} from './validate-manual-v92.mjs';
import {parse,attrs,walkContent,normalized,invariant,htmlFiles,languages,localizedLanguages,countries,nativeNames} from './localization-core.mjs';
const failures=[];
const source=JSON.parse(await fs.readFile('src/data/i18n/source.json','utf8'));
const english=await htmlFiles('dist/en');
const catalogs={};for(const locale of localizedLanguages)catalogs[locale]=JSON.parse(await fs.readFile(`src/data/i18n/${locale}.json`,'utf8'));
const values=document=>{const result=[];walkContent(document,(node,kind,value)=>{const text=normalized(value);if(text)result.push({node,kind,text});});return result;};
const allNodes=document=>{const result=[];function visit(node){if(node.tagName)result.push(node);for(const child of node.childNodes||[])visit(child);}visit(document);return result;};
const technical=value=>!value.replace(/\b(?:MAIXON(?: TOOL)?|MainTop|DTF\d*|DFG\d*|DTG|AI|WORKBENCH|HALFTONE|Windows|SP1|x64|macOS|Photoshop|CNY|V\d+(?:\.\d+)*|SHA256|[A-F0-9]{64}|ICC|RGB|CMYK|PDF|PSD|PSB|PNG|TIFF|JPG|JPEG|EPS|USB|QR|WhatsApp|mm|cm|m|ml|kW|W|V|h)\b/g,'').replace(/°C/g,'').replace(/[^A-Za-z]/g,'');
// These loanwords, product names and technical units are correct as written.
const sharedTerms={ms:new Set(['Halftone','Menu','Model','Epson WF-7610','Ethernet / LAN','WeChat Pay','SUBLIMATION · MAIXON TOOL V9.1','OVEN604','kg','m³']),id:new Set(['Halftone','Menu','Model','Epson WF-7610','Ethernet / LAN','WeChat Pay','OVEN604','kg','m³']),vi:new Set(['Epson WF-7610','Ethernet / LAN','WeChat Pay','OVEN604','kg','m³'])};
const protectedPrintTerms=/\b(?:MAIXON|MainTop|Photoshop|Windows|macOS|DTF|DTG|AI|PDF|PSD|PSB|PNG|TIFF|JPG|JPEG|EPS|SVG|RGB|CMYK|ICC|DPI|LPI|PPI|W1|W2|W3|W5)\b/g;
for(const locale of localizedLanguages){
 const catalog=catalogs[locale];
 for(const key of Object.keys(source)){
  const text=catalog[key];if(!text){failures.push(`${locale}: missing phrase ${key}`);continue;}
  if(/ZXQROW|ZXQ\d+QXZ/.test(text))failures.push(`${locale}: unresolved draft marker ${key}`);
  for(const number of key.match(/\d+(?:[.,]\d+)*/g)||[])if(!text.includes(number))failures.push(`${locale}: changed numeric value ${number}: ${key}`);
  for(const brand of ['MainTop','MAIXON'])if(key.includes(brand)&&!text.includes(brand))failures.push(`${locale}: changed brand ${brand}: ${key}`);
  for(const money of ['CNY','¥'])if(key.includes(money)&&!text.includes(money))failures.push(`${locale}: changed currency ${money}: ${key}`);
  if(['ms','id','vi'].includes(locale))for(const term of new Set(key.match(protectedPrintTerms)||[]))if(!new RegExp(`\\b${term}\\b`,'i').test(text))failures.push(`${locale}: changed printing identifier ${term}: ${key}`);
  if(text===key&&!invariant(key)&&!technical(key)&&!sharedTerms[locale]?.has(key)&&!/^\d+(?:\.\d+)?\s*(?:kg|m³)$/.test(key)&&!/^\d+\s*×\s*\d+\s*×\s*\d+\s*mm$/.test(key))failures.push(`${locale}: untranslated phrase ${key}`);
 }
 const pages=await htmlFiles(`dist/${locale}`);
 if(pages.length!==english.length)failures.push(`${locale}: ${pages.length} pages, expected ${english.length}`);
 for(const enFile of english){
  const relative=path.relative('dist/en',enFile),file=path.join('dist',locale,relative);
  const document=parse(await fs.readFile(file,'utf8')),base=parse(await fs.readFile(enFile,'utf8'));
  const baseValues=values(base),localizedValues=values(document);
  const manual=allNodes(base).some(node=>node.tagName==='body'&&'data-manual-v92'in attrs(node));
  if(!manual&&baseValues.length!==localizedValues.length)failures.push(`${file}: changed content structure`);
  else if(!manual)for(let i=0;i<baseValues.length;i++){
   const item=baseValues[i],expected=normalized(invariant(item.text)?item.text:catalog[item.text]);
   if(expected!==localizedValues[i].text)failures.push(`${file}: incomplete ${item.kind} translation: ${item.text}`);
  }
  const nodes=allNodes(document),html=nodes.find(node=>node.tagName==='html');
  if(attrs(html).lang!==locale)failures.push(`${file}: wrong document language`);
  const alternatives=nodes.filter(node=>node.tagName==='link'&&attrs(node).rel==='alternate').map(attrs);
  for(const required of [...languages,'x-default'])if(!alternatives.some(a=>a.hreflang===required))failures.push(`${file}: missing alternate ${required}`);
  const canonical=nodes.find(node=>node.tagName==='link'&&attrs(node).rel==='canonical');
  if(!attrs(canonical).href?.includes(`/${locale}/`))failures.push(`${file}: incorrect canonical`);
  for(const node of nodes){const a=attrs(node);
   if(node.tagName==='track'){
    if(a.srclang!==locale||!a.src.endsWith(`.${locale}.vtt`)||!a['data-fallback-src'].endsWith(`.${locale}.vtt`))failures.push(`${file}: caption language or fallback mismatch`);
    const localPath=a['data-fallback-src'];
    try{await fs.access(path.join('dist',localPath));}catch{failures.push(`${file}: missing caption ${localPath}`);}
   }
   if(node.tagName==='a'&&a['data-native-language']){
    const target=a['data-native-language'];
    const flag=node.childNodes.find(child=>child.tagName==='img');
    if(!languages.includes(target)||!attrs(flag).src?.endsWith(`/flags/${countries[target]}.svg`))failures.push(`${file}: missing or wrong ${target} language flag`);
    if((a['aria-current']==='true')!==(target===locale))failures.push(`${file}: wrong selected language ${target}`);
   }
   if('data-current-language' in a&&normalized(node.childNodes.map(child=>child.value||'').join(''))!==nativeNames[locale])failures.push(`${file}: wrong current language name`);
   if('data-current-language-flag' in a&&!a.src?.endsWith(`/flags/${countries[locale]}.svg`))failures.push(`${file}: wrong current language flag`);
   if(node.tagName==='a'&&a.href?.startsWith('/')){
    const route=a.href.split(/[?#]/)[0];
    const destination=route.endsWith('/')?route+'index.html':route;
    try{await fs.access(path.join('dist',destination));}catch{failures.push(`${file}: broken internal link ${a.href}`);}
    if(!a['data-native-language']&&route.startsWith('/en/'))failures.push(`${file}: English route escaped localization`);
   }
  }
  const downloadUrls=tree=>allNodes(tree).map(attrs).map(a=>a.href).filter(h=>h?.includes('aliyuncs.com/downloads/')).sort();
  if(JSON.stringify(downloadUrls(document))!==JSON.stringify(downloadUrls(base)))failures.push(`${file}: changed installer or auxiliary download URLs`);
  const ownerSources=tree=>allNodes(tree).map(attrs).flatMap(a=>Object.values(a)).filter(v=>/\/owner\/.*\.(mp4|webp)$/.test(v)).sort();
  if(JSON.stringify(ownerSources(document))!==JSON.stringify(ownerSources(base)))failures.push(`${file}: original owner film changed`);
 }
}
let captionCount=0;
for(const name of await fs.readdir('public/media/v86/captions')){
 if(!name.endsWith('.en.vtt'))continue;
 const timing=text=>text.split('\n').filter(line=>line.includes('-->'));
 const originalText=await fs.readFile(`public/media/v86/captions/${name}`,'utf8');
 const base=timing(originalText);
 const cueText=text=>text.split('\n').filter(line=>line.trim()&&line.trim()!=='WEBVTT'&&!line.includes('-->')).map(normalized);
 const originalCues=cueText(originalText);
 for(const locale of localizedLanguages){
  const localizedText=await fs.readFile(`dist/media/v86/captions/${name.replace('.en.vtt',`.${locale}.vtt`)}`,'utf8');
  const translated=timing(localizedText);
  const expectedCues=originalCues.map(cue=>normalized(catalogs[locale][cue]||cue));
  if(JSON.stringify(cueText(localizedText))!==JSON.stringify(expectedCues))failures.push(`${locale}: missing or incorrect caption text ${name}`);
  if(JSON.stringify(base)!==JSON.stringify(translated))failures.push(`${locale}: changed caption timing ${name}`);captionCount++;
 }
}
const scenes=JSON.parse(await fs.readFile('src/data/v86/studio-scenes.json','utf8'));
for(const scene of scenes){const data=await fs.readFile(`public/media/v86/screenshots/${scene.screen}`);if(crypto.createHash('sha256').update(data).digest('hex')!==scene.screenSha256)failures.push(`${scene.id}: real screenshot changed`);}
const flags=JSON.parse(await fs.readFile('src/data/i18n/flag-provenance.json','utf8'));
for(const flag of flags.files){const data=await fs.readFile(`public/media/flags/${flag.country}.svg`);if(crypto.createHash('sha256').update(data).digest('hex')!==flag.sha256)failures.push(`${flag.country}: flag source changed`);}
const sitemap=await fs.readFile('dist/sitemap-0.xml','utf8');
const total=(await htmlFiles('dist')).length;
if((sitemap.match(/<url>/g)||[]).length!==total)failures.push('Sitemap does not cover all published routes');
const manual=await validateManualV92();failures.push(...manual.failures);
if(failures.length)throw new Error(`Localization validation failed (${failures.length}):\n${failures.slice(0,80).join('\n')}`);
console.log(`Manual PASS: ${manual.pages} routes, ${manual.languages} languages, ${manual.stringsPerLocale} complete strings per language, one shared DOM/CSS/JS, all legacy chapters and assets.`);
console.log(`PASS: ${total} pages, ${english.length} routes per language, ${Object.keys(source).length} phrases per new language, ${captionCount} aligned caption files, preserved downloads, original films and ${scenes.length} exact real-screen sources.`);
