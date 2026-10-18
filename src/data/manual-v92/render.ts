import {parse,serialize} from 'parse5';
import template from './template.html?raw';
import sourceStrings from './i18n/website-strings.json';
import originalStrings from './i18n/zh.json';

const nativeNames:Record<string,string>={'zh-CN':'中文',en:'English',th:'ไทย',ja:'日本語',ko:'한국어',ms:'Bahasa Melayu',id:'Bahasa Indonesia',vi:'Tiếng Việt'};
const countries:Record<string,string>={'zh-CN':'cn',en:'us',th:'th',ja:'jp',ko:'kr',ms:'my',id:'id',vi:'vn'};
const normalized=(s:string)=>s.replace(/\s+/g,' ').trim();
export const legacySections:Record<string,string>={install:'s2',account:'s13',authorization:'s13',dtf:'s5',dtg:'s6',sublimation:'s8',ai:'s9','ai-credits':'s9',files:'s12',appearance:'s15',purchase:'s14',faq:'s18'};

export function manualCatalogFromIds(translations:Record<string,unknown>){
 const catalog:Record<string,string>={};
 for(const source of [originalStrings,sourceStrings.strings])for(const [id,chinese] of Object.entries(source)){
  const translated=translations[id];
  if(typeof chinese==='string'&&typeof translated==='string'&&translated.trim())catalog[normalized(chinese)]=translated;
 }
 return catalog;
}

export function renderManual(locale:string,initialSection='',catalog:Record<string,string>={}){
 catalog={...manualCatalogFromIds(catalog),...catalog};
 const availableLanguages=sourceStrings._meta.available_languages;
 if(!availableLanguages.includes(locale))throw new Error(`Manual language ${locale} is not ready`);
 const links=availableLanguages.map(code=>`<a data-native-language="${code}" data-manual-language href="/${code}/guide/"${code===locale?' aria-current="true"':''}><img src="/media/flags/${countries[code]}.svg" width="20" height="14" alt="">${nativeNames[code]}</a>`).join('');
 const alternatives=availableLanguages.map(code=>`<link rel="alternate" hreflang="${code}" href="https://guojindigital.com/${code}/guide/">`).join('')+'<link rel="alternate" hreflang="x-default" href="https://guojindigital.com/zh-CN/guide/">';
 let html=template.replaceAll('__LOCALE__',locale).replaceAll('__INITIAL_SECTION__',/^s\d+$/.test(initialSection)?initialSection:'').replace('__LANGUAGE_LINKS__',links).replace('<!--MANUAL_LANGUAGE_ALTERNATES-->',alternatives);
 html=html.replace('<body ','<body data-manual-v92 ');
 if(locale==='zh-CN')return html;
 const doc=parse(html);
 const translatedAttributes=new Set(['alt','aria-label','title','placeholder']);
 function visit(node:any,excluded=false){
  const attrs=Object.fromEntries((node.attrs||[]).map((a:any)=>[a.name,a.value]));
  excluded ||= ['script','style'].includes(node.tagName)||'data-native-language' in attrs;
  if(node.tagName==='html')node.attrs.find((a:any)=>a.name==='lang').value=locale;
  if('data-current-language' in attrs)node.childNodes=[{nodeName:'#text',value:nativeNames[locale],parentNode:node}];
  if('data-current-language-flag' in attrs)node.attrs.find((a:any)=>a.name==='src').value=`/media/flags/${countries[locale]}.svg`;
  if(!excluded){
   if(node.nodeName==='#text'&&/[\u4e00-\u9fff]/.test(node.value)){
    const key=normalized(node.value),translation=catalog[key];
    if(!translation)throw new Error(`Missing manual ${locale} text: ${key}`);
    node.value=node.value.match(/^\s*/)[0]+translation+node.value.match(/\s*$/)[0];
   }
   for(const attr of node.attrs||[]){
    if(!(translatedAttributes.has(attr.name)||(node.tagName==='meta'&&attr.name==='content'))||!/[\u4e00-\u9fff]/.test(attr.value))continue;
    const translation=catalog[normalized(attr.value)];if(!translation)throw new Error(`Missing manual ${locale} attribute: ${attr.value}`);attr.value=translation;
   }
  }
  for(const child of node.childNodes||[])visit(child,excluded);
 }
 visit(doc);return serialize(doc);
}
