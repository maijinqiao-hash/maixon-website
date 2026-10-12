import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parse,serialize,attrs,walkContent,normalized,invariant,htmlFiles,languages,nativeNames} from './localization-core.mjs';

const captionNames={th:'คำบรรยายภาษาไทย',ja:'日本語字幕',ko:'한국어 자막'};
const ogLocales={'zh-CN':'zh_CN',en:'en_US',th:'th_TH',ja:'ja_JP',ko:'ko_KR'};
function setAttr(node,name,value){const existing=node.attrs?.find(a=>a.name===name);if(existing)existing.value=value;else(node.attrs ||= []).push({name,value});}
function localize(document,locale,catalog){
  const missing=new Set();
  walkContent(document,(node,kind,value)=>{
    const key=normalized(value);if(!key||invariant(key))return;
    const translated=catalog[key];
    if(!translated){missing.add(key);return;}
    const replacement=`${value.match(/^\s*/)[0]}${translated}${value.match(/\s*$/)[0]}`;
    if(kind==='text')node.value=replacement;else setAttr(node,kind,replacement);
  });
  if(missing.size)throw new Error(`Missing ${locale} translations: ${[...missing].join('\n')}`);
  function visit(node){
    const a=attrs(node);
    if(node.tagName==='html')setAttr(node,'lang',locale);
    if('data-current-language' in a){node.childNodes=[{nodeName:'#text',value:nativeNames[locale],parentNode:node}];setAttr(node,'data-native-language',locale);}
    if(node.tagName==='a'&&a['data-native-language']){
      if(a['data-native-language']===locale)setAttr(node,'aria-current','true');
      else node.attrs=node.attrs.filter(item=>item.name!=='aria-current');
    }
    if(!a['data-native-language']&&!a.hreflang) for(const attribute of node.attrs||[]){
      if(attribute.name==='href'||(node.tagName==='meta'&&['og:url','refresh'].includes(a.property||a['http-equiv'])))attribute.value=attribute.value.replace(/(^|https:\/\/guojindigital\.com|url=)\/en(?=\/|$)/g,`$1/${locale}`);
    }
    if(node.tagName==='track'){
      setAttr(node,'srclang',locale);setAttr(node,'label',captionNames[locale]);
      for(const attribute of node.attrs)if(['src','data-fallback-src'].includes(attribute.name))attribute.value=attribute.value.replace(/\.en\.vtt$/,`.${locale}.vtt`);
    }
    if(node.tagName==='meta'&&a.property==='og:locale')setAttr(node,'content',ogLocales[locale]);
    if(node.tagName==='meta'&&a.property==='og:locale:alternate'&&a.content===ogLocales[locale])setAttr(node,'content','en_US');
    for(const child of node.childNodes||[])visit(child);
  }
  visit(document);return document;
}
function escapeXml(text){return text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));}

export async function buildLocalizedPages({dir,site='https://guojindigital.com',logger}){
  const dist=fileURLToPath(dir);
  const captions=path.resolve('public/media/v86/captions');
  const foundation=await htmlFiles(path.join(dist,'en'));
  const catalogs={};for(const locale of ['th','ja','ko'])catalogs[locale]=JSON.parse(await fs.readFile(`src/data/i18n/${locale}.json`,'utf8'));
  for(const file of foundation){
    const source=await fs.readFile(file,'utf8'),relative=path.relative(path.join(dist,'en'),file);
    for(const locale of ['th','ja','ko']){
      const output=path.join(dist,locale,relative);await fs.mkdir(path.dirname(output),{recursive:true});
      await fs.writeFile(output,serialize(localize(parse(source),locale,catalogs[locale])));
    }
  }
  // Translate only existing caption cues. Original bilingual films remain intact.
  let captionCount=0;
  for(const name of await fs.readdir(captions)){
    if(!name.endsWith('.en.vtt'))continue;
    const source=await fs.readFile(path.join(captions,name),'utf8');
    for(const locale of ['th','ja','ko']){
      const translated=source.trim().split(/\n\s*\n/).map(block=>{
        const lines=block.split('\n'),at=lines.findIndex(line=>line.includes('-->'));
        if(at<0)return block;
        const key=normalized(lines.slice(at+1).join(' '));
        const text=catalogs[locale][key]||(invariant(key)?key:null);
        if(!text)throw new Error(`Missing ${locale} caption: ${name}: ${key}`);
        return [...lines.slice(0,at+1),text].join('\n');
      }).join('\n\n')+'\n';
      const output=path.join(dist,'media/v86/captions',name.replace('.en.vtt',`.${locale}.vtt`));
      await fs.writeFile(output,translated);captionCount++;
    }
  }
  const routes=['/',...languages.flatMap(locale=>foundation.map(file=>`/${locale}/${path.relative(path.join(dist,'en'),path.dirname(file)).replaceAll(path.sep,'/')}`.replace(/\/?$/,'/')))];
  const items=routes.map(route=>{
    const sibling=route==='/'?'/':route.replace(/^\/(?:zh-CN|en|th|ja|ko)\//,'/');
    const alternates=languages.map(locale=>`<xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(`${site}/${locale}${sibling}`)}"/>`).join('');
    return `<url><loc>${escapeXml(site+route)}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(route==='/'?site+'/':`${site}/zh-CN${sibling}`)}"/></url>`;
  });
  await fs.writeFile(path.join(dist,'sitemap-0.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${items.join('')}</urlset>`);
  await fs.writeFile(path.join(dist,'sitemap-index.xml'),`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${site}/sitemap-0.xml</loc></sitemap></sitemapindex>`);
  logger?.info(`Published ${foundation.length} complete pages per language; ${routes.length} routes in five languages; ${captionCount} additional caption files.`);
  return {pagesPerLanguage:foundation.length,totalPages:routes.length,captionCount};
}

export default function localizedPages(){return {name:'maixon-complete-localized-pages',hooks:{'astro:build:done':buildLocalizedPages}};}
