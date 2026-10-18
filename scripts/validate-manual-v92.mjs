import fs from 'node:fs/promises';
import path from 'node:path';
import {parse} from 'parse5';

const norm=value=>value.replace(/\s+/g,' ').trim();
const attributes=node=>Object.fromEntries((node.attrs||[]).map(a=>[a.name,a.value]));
const locales=['zh-CN','en','th','ja','ko','ms','id','vi'];
const sections={install:'s2',account:'s13',authorization:'s13',dtf:'s5',dtg:'s6',sublimation:'s8',ai:'s9','ai-credits':'s9',files:'s12',appearance:'s15',purchase:'s14',faq:'s18'};

function inspect(html){
  const nodes=[],values=[];
  function visit(node,excluded=false){
    const a=attributes(node);
    if(node.tagName)nodes.push(node);
    excluded||=['script','style'].includes(node.tagName)||'data-native-language' in a||'data-current-language' in a;
    if(!excluded){
      if(node.nodeName==='#text'&&norm(node.value))values.push(norm(node.value));
      for(const item of node.attrs||[])if(['alt','aria-label','title','placeholder'].includes(item.name)||(node.tagName==='meta'&&item.name==='content'))values.push(norm(item.value));
    }
    for(const child of node.childNodes||[])visit(child,excluded);
  }
  visit(parse(html));return {nodes,values};
}

export async function validateManualV92(){
  const failures=[];
  const source=JSON.parse(await fs.readFile('src/data/manual-v92/i18n/website-strings.json','utf8'));
  const catalogs={};
  for(const locale of locales){
    const ids=JSON.parse(await fs.readFile(`src/data/manual-v92/i18n/${locale==='zh-CN'?'zh':locale}.json`,'utf8'));
    const map={};
    for(const [id,chinese]of Object.entries(source.strings)){
      if(typeof ids[id]!=='string'||!ids[id].trim())failures.push(`${locale}: missing manual string ${id}`);
      else map[norm(chinese)]=norm(ids[id]);
    }
    catalogs[locale]=map;
  }
  if(JSON.stringify(source._meta.available_languages)!==JSON.stringify(locales))failures.push('Manual availability does not cover all eight locales');
  let pages=0;
  for(const topic of ['',...Object.keys(sections)]){
    const relative=`guide/${topic?topic+'/':''}index.html`;
    const base=inspect(await fs.readFile(path.join('dist/zh-CN',relative),'utf8'));
    for(const locale of locales){
      const file=path.join('dist',locale,relative),html=await fs.readFile(file,'utf8'),actual=inspect(html);pages++;
      const body=actual.nodes.find(n=>n.tagName==='body');
      if(!body||!('data-manual-v92'in attributes(body)))failures.push(`${file}: old guide still present`);
      if((attributes(body)['data-initial-section']||'')!==(sections[topic]||''))failures.push(`${file}: legacy chapter mapping mismatch`);
      const chapterIds=actual.nodes.filter(n=>n.tagName==='section').map(n=>attributes(n).id);
      if(JSON.stringify(chapterIds)!==JSON.stringify(Array.from({length:20},(_,i)=>`s${i}`)))failures.push(`${file}: incomplete chapters`);
      if(actual.values.length!==base.values.length)failures.push(`${file}: shared document structure changed`);
      else actual.values.forEach((value,i)=>{
        const original=base.values[i];
        const expected=/[\u4e00-\u9fff]/.test(original)?catalogs[locale][original]:original;
        if(value!==expected)failures.push(`${file}: untranslated or mismatched text: ${original}`);
      });
      const scripts=actual.nodes.filter(n=>n.tagName==='script').map(attributes).map(a=>a.src).filter(Boolean);
      if(JSON.stringify(scripts)!==JSON.stringify(['/manual/v9.2/20261019/assets/js/app.8languages.js']))failures.push(`${file}: demonstration script differs`);
      const styles=actual.nodes.filter(n=>n.tagName==='link'&&attributes(n).rel==='stylesheet').map(n=>attributes(n).href);
      if(JSON.stringify(styles)!==JSON.stringify(['/manual/v9.2/20261019/assets/css/style.8languages.css']))failures.push(`${file}: shared manual style differs`);
      const languageLinks=actual.nodes.filter(n=>n.tagName==='a'&&'data-manual-language'in attributes(n));
      for(const target of locales)if(languageLinks.filter(n=>attributes(n).href===`/${target}/guide/`).length!==3)failures.push(`${file}: missing language entry ${target}`);
      for(const node of actual.nodes){
        const a=attributes(node);
        for(const key of ['src','data-full'])if(a[key]?.startsWith('/')){
          try{await fs.access(path.join('dist',a[key].split('?')[0]));}catch{failures.push(`${file}: missing ${key} ${a[key]}`);}
        }
      }
    }
  }
  return {failures,pages,languages:locales.length,stringsPerLocale:Object.keys(source.strings).length};
}
