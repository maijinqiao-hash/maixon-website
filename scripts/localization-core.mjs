import {parse, serialize} from 'parse5';
import fs from 'node:fs/promises';
import path from 'node:path';

export const languages = ['zh-CN', 'en', 'th', 'ja', 'ko', 'ms', 'id', 'vi'];
export const localizedLanguages = languages.filter(locale => !['zh-CN', 'en'].includes(locale));
export const nativeNames = {'zh-CN':'中文', en:'English', th:'ไทย', ja:'日本語', ko:'한국어', ms:'Bahasa Melayu', id:'Bahasa Indonesia', vi:'Tiếng Việt'};
export const countries = {'zh-CN':'cn', en:'us', th:'th', ja:'jp', ko:'kr', ms:'my', id:'id', vi:'vn'};
export const normalized = value => value.replace(/\s+/g,' ').trim();
export const attributeNames = new Set(['alt','aria-label','title','placeholder','data-title','data-description']);
const metaNames = new Set(['description','og:title','og:description','twitter:title','twitter:description']);
export const attrs = node => Object.fromEntries((node.attrs || []).map(a=>[a.name,a.value]));
export function invariant(value) {
  return !/[A-Za-z]/.test(value) || /^(?:©|https?:|mailto:)/.test(value) ||
    /^(?:MAIXON(?: TOOL)?(?: V[\d.]+)?|MAIXON × MainTop|MainTop|Photoshop|Windows|Windows 10 \/ 11|Windows 7(?: SP1 x64)?|macOS|AI|DTF|DTG|PDF|PSD|PSB|TIFF|PNG|JPG|EPS|RGB|CMYK|DPI|LPI|W1|W2|W3|W5|ICC|English|EN|[\d.,]+\s*(?:mm|cm|m|dpi|DPI|LPI|GB|MB|%|px)|[\d.,]+\s*×\s*[\d.,]+|[\d.,]+\s*(?:mm|cm|m)\s*×\s*[\d.,]+\s*(?:mm|cm|m))$/i.test(value) ||
    /^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(value);
}
export function walkContent(document, fn) {
  function visit(node, excluded=false) {
    const a=attrs(node);
    excluded ||= ['script','style','svg'].includes(node.tagName) || 'data-native-language' in a;
    if(!excluded) {
      if(node.nodeName==='#text') fn(node,'text',node.value);
      for(const attribute of node.attrs || []) {
        if(attributeNames.has(attribute.name) || (node.tagName==='meta' && attribute.name==='content' && metaNames.has(a.name || a.property))) fn(node,attribute.name,attribute.value);
      }
    }
    for(const child of node.childNodes || []) visit(child,excluded);
  }
  visit(document);
}
export async function htmlFiles(directory) {
  const files=[];
  for(const item of await fs.readdir(directory,{withFileTypes:true})) {
    const target=path.join(directory,item.name);
    if(item.isDirectory()) files.push(...await htmlFiles(target));
    else if(item.name.endsWith('.html')) files.push(target);
  }
  return files.sort();
}
export async function inventory(distRoot, captionRoot) {
  const occurrences=new Map();
  for(const file of await htmlFiles(path.join(distRoot,'en'))) {
    walkContent(parse(await fs.readFile(file,'utf8')),(_node,_kind,value)=>{
      const key=normalized(value); if(!key || invariant(key)) return;
      occurrences.set(key,(occurrences.get(key)||0)+1);
    });
  }
  if(captionRoot) for(const name of await fs.readdir(captionRoot)) {
    if(!name.endsWith('.en.vtt')) continue;
    const blocks=(await fs.readFile(path.join(captionRoot,name),'utf8')).trim().split(/\n\s*\n/);
    for(const block of blocks) {
      const lines=block.split('\n'), at=lines.findIndex(line=>line.includes('-->'));
      if(at<0) continue;
      const key=normalized(lines.slice(at+1).join(' '));
      if(key && !invariant(key)) occurrences.set(key,(occurrences.get(key)||0)+1);
    }
  }
  return Object.fromEntries([...occurrences.entries()].sort((a,b)=>a[0].localeCompare(b[0])));
}
export {parse, serialize};
