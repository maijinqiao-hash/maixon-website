export const siteLanguages = [
  {code:'zh-CN', name:'中文', flag:'cn'},
  {code:'en', name:'English', flag:'us'},
  {code:'th', name:'ไทย', flag:'th'},
  {code:'ja', name:'日本語', flag:'jp'},
  {code:'ko', name:'한국어', flag:'kr'},
  {code:'ms', name:'Bahasa Melayu', flag:'my'},
  {code:'id', name:'Bahasa Indonesia', flag:'id'},
  {code:'vi', name:'Tiếng Việt', flag:'vn'}
] as const;
export type SiteLanguage = typeof siteLanguages[number]['code'];

export function languagePath(pathname:string, language:SiteLanguage) {
  const relative=pathname.replace(/^\/(?:zh-CN|en|th|ja|ko|ms|id|vi)(?=\/|$)/,'');
  return `/${language}${relative.startsWith('/')?relative:`/${relative}`}`;
}
