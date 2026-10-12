export const siteLanguages = [
  {code:'zh-CN', name:'中文'},
  {code:'en', name:'English'},
  {code:'th', name:'ไทย'},
  {code:'ja', name:'日本語'},
  {code:'ko', name:'한국어'}
] as const;
export type SiteLanguage = typeof siteLanguages[number]['code'];

export function languagePath(pathname:string, language:SiteLanguage) {
  const relative=pathname.replace(/^\/(?:zh-CN|en|th|ja|ko)(?=\/|$)/,'');
  return `/${language}${relative.startsWith('/')?relative:`/${relative}`}`;
}
