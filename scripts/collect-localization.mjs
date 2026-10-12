import fs from 'node:fs/promises';
import {inventory} from './localization-core.mjs';
const root=process.cwd();
const entries=await inventory(`${root}/dist`,`${root}/public/media/v86/captions`);
await fs.mkdir('src/data/i18n',{recursive:true});
await fs.writeFile('src/data/i18n/source.json',JSON.stringify(entries,null,2)+'\n');
console.log(`Collected ${Object.keys(entries).length} unique page, accessibility and caption phrases.`);
