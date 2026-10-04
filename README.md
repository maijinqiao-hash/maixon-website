# MAIXON TOOL V8.6 website content release

Astro static website refresh based on commit ff7e7ff7f71933059491f4da3f7b14f576176c7a. The owner authorized direct publication on 2026-10-04 after the local preview work. Production installers remain V8.3; website content is V8.6.

Use Node.js 22.12 or newer (verified with 22.23.2).

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 8630
npm run build
```

The build generates `dist/`, checks Astro types, validates bilingual pages, and verifies the V8.6 media hashes and paired themes / narration. New content lives in `src/data/v86/`; the website media lives in `public/media/v86/`.

Revision 2 integrates all 12 owner videos, 12 bilingual workflow pages, 30 bilingual subfeature topics, dedicated DTF and DTG MainTop pages, and seven built-in AI examples in both themes. Complete owner video content is shared across both locales, including the existing audio and subtitles. Six oversized desktop videos are encoded for web hosting without cuts or audio changes; original supplied files are retained in the handoff. Full-length mobile derivatives use compatible H.264/AAC encoding. User-initiated playback starts with sound; browser-controlled automatic previews are muted. The 17 assistant walkthroughs use Chinese and English narration processed with Jianying Pro's 生动解说 voice and independent WebVTT captions. `src/data/v86/maintop.ts` points to the complete owner DTF-to-MainTop workflow.

The source entry is `src/pages/`. The root-level legacy `index.html`, `assets/`, `content/`, `version.json` and older audit documents are retained for history; they are not the V8.6 preview entry.

Deploy using the checked-in `wrangler.json`, not a bare static-directory upload. Its small streaming Worker handles byte ranges only for `/media/v86/*.mp4`; other pages and assets retain direct static hosting. The handler supports mobile video probes and seeking without buffering full videos. `npm run test:video-ranges` checks byte ranges, suffixes, bounds, validators, HEAD and normal asset passthrough. The hosting implementation follows Cloudflare's [asset routing](https://developers.cloudflare.com/workers/static-assets/binding/) and [FixedLengthStream](https://developers.cloudflare.com/workers/runtime-apis/response/) documentation.

Hardware, support contacts, prices, payment codes and existing installer URLs are preserved. Access rules explain global email registration, the 72-hour base trial, five independent AI uses, free tools and module-scoped voice execution. The owner's publication approval covers these website changes. Installer changes require the corresponding release packages; do not relabel existing V8.3 files as V8.6. The software-update fields in public/version.json retain V8.3, while website_revision identifies the V8.6 content release.
