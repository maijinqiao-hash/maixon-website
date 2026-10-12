# Website languages and studio scenes

The site publishes Chinese, English, Thai, Japanese and Korean pages. All 76 routes are available in each language. Translation happens during the build; visitors do not call a translation service.

## Build and update

Run `npm run build`. The `localized-pages` Astro integration runs after the English and Chinese build and sitemap integration. It translates visible text, accessibility labels, metadata, internal routes and 17 caption files per added language. Existing user-recorded films and their burned-in subtitles remain unchanged. The generated film audio remains the existing Chinese or English audio; the three added languages use matching translated captions.

When English source copy changes, run `node scripts/collect-localization.mjs`, update the corresponding static `th.json`, `ja.json` and `ko.json` entries, then run `node scripts/review-localization.mjs` and build. Missing translations fail the build. Reviewed marketing, licensing and caption translations are stored alongside the catalogs. Preserve module access rules, numeric values, MainTop spelling and CNY prices.

Run `npm run validate:locales` for route coverage, accessible text, metadata, internal links, caption text and timing, media identity, download mapping and screenshot integrity. This complements the existing bilingual, original-media and video-range validators.

## Media and publishing

Four photographic backgrounds live under `public/media/v86/scenes/20261012/`. They were generated with the built-in image tool. `studio-scenes.json` records their source hashes, the real application screenshot hashes and monitor corners. `V86StudioScene.astro` places the unchanged screenshot into the monitor plane and recomputes its projection when the viewport changes. No model redraws the software interface.

Upload only new hashed scripts/styles, new backgrounds and generated localized VTT files to the existing configured public-assets prefix. Verify content hashes, content types and CORS before promotion. Do not delete previous assets, change download mappings, expose unrelated bucket data, or change the bucket ACL.

The five-language selector preserves the current subpage and anchor. Captions start enabled, display below inline video, and use native captions when the video itself enters fullscreen. Caption delivery falls back to the same-site copy when the primary storage path fails.

## Validation boundary

The 2026-10-12 release was checked at 320, 390, 768, 1024, 1366 and 1920 pixel widths, including feature, authorization, download and hardware pages. Browser checks include language navigation, download selection, generated-film playback with sound, pause/resume, caption controls, light/dark controls, the original MainTop film and caption-delivery failure recovery. Safari playback was checked separately. These are viewport simulations and browser checks, not tests on every physical device or customer network.
