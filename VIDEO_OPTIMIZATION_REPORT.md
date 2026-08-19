# MAIXON V5.9 Video Performance Optimization Report

Recorded: 2026-08-19 (Asia/Shanghai)

## Scope and release status

- Source branch: `website-v59-redesign`
- Frozen baseline HEAD: `949709ef82b63211ea9b8d159c0f5ff88b5ca85f`
- Local Preview: `http://127.0.0.1:4321/zh-CN/`
- Production deployment: **NOT DEPLOYED**
- Original masters: unchanged and retained under `public/media`
- Served derivatives: `public/media-web`
- No dependency or lockfile changes

The implementation changes only derived video delivery, Manifest resolution, and viewport scheduling. It does not change page copy, layout, video frames, video container sizes, media ownership, download data, product parameters, or global CSS.

## Measured cold-load result

Same route, viewport and controlled no-cache local server were used for both samples: `/zh-CN/?cold=...#software`, Codex in-app Chromium 151, 1440 × 1000, first 3.5 seconds.

| Metric | Before | After | Change |
|---|---:|---:|---:|
| Initial requests | 28 | 19 | -32.1% |
| Initial bytes | 23,139,991 B | 3,715,829 B | -83.94% |
| Initial video requests | 11 | 2 | -81.8% |
| Initial video bytes | 20,780,933 B | 1,355,870 B | -93.48% |
| Relevant console errors | 0 | 0 | unchanged |
| First visible motion | first sample at +58–400 ms | +191 ms | measured, not estimated |

After optimization, only the visible hero video is attached immediately. The second request in the after sample is the next near section because the tested URL intentionally opened at `#software`; hidden tabs and distant sections did not attach a source.

## Derived media inventory

All web MP4 files use H.264 / `avc1`, `yuv420p`, no audio track, and `moov` before `mdat`. Resolution, duration, frame sequence and existing poster mapping are preserved. WebM was not added because the H.264 fallback already covers Safari and Chromium/Chrome and avoids creating a second competing delivery path.

| Source file | Source size | Web MP4 size | WebM | Source → web resolution | Duration | Reduction | Page / section |
|---|---:|---:|---|---|---:|---:|---|
| `software/zh/videos/demo_overall_zh_v59.mp4` | 781,635 B | 781,635 B | N/A | 1920×1216 → 1920×1216 | 23.00 s | 0.00% | zh-CN + en home / hero |
| `software/zh/runtime-update/ai/artwork-extraction-compare.mp4` | 574,235 B | 574,235 B | N/A | 778×990 → 778×990 | 10.30 s | 0.00% | Home AI 02; Guide AI |
| `software/zh/runtime-update/ai/background-removal-compare.mp4` | 769,948 B | 769,948 B | N/A | 1000×1048 → 1000×1048 | 9.40 s | 0.00% | Home AI 02 alternate tab |
| `software/zh/runtime-update/ai/continue-to-dtg.mp4` | 3,161,562 B | 3,161,562 B | N/A | 1601×1008 → 1601×1008 | 54.37 s | 0.00% | Home AI 03 |
| `software/zh/runtime-update/dtf/multi-layout.mp4` | 14,508,870 B | 14,508,870 B | N/A | 1600×1008 → 1600×1008 | 59.33 s | 0.00% | Home DTF main tab |
| `software/zh/runtime-update/dtf/parameter-tour.mp4` | 931,632 B | 931,632 B | N/A | 1599×1008 → 1599×1008 | 12.67 s | 0.00% | Home DTF alternate tab; Guide DTF |
| `software/zh/runtime-update/dtf/single-artwork.mp4` | 2,043,268 B | 2,043,268 B | N/A | 1599×1010 → 1599×1010 | 25.47 s | 0.00% | Home DTF alternate tab |
| `software/zh/runtime-update/dtf/single-row-layout.mp4` | 2,822,013 B | 2,822,013 B | N/A | 1598×1002 → 1598×1002 | 57.10 s | 0.00% | Home DTF alternate tab |
| `software/zh/runtime-update/dtf/one-meter-layout.mp4` | 3,601,023 B | 3,601,023 B | N/A | 1599×1008 → 1599×1008 | 49.43 s | 0.00% | Home DTF alternate tab |
| `software/zh/runtime-update/dtg/parameter-controls.mp4` | 455,109 B | 455,109 B | N/A | 1599×1008 → 1599×1008 | 20.10 s | 0.00% | Home DTG; Guide DTG |
| `software/zh/runtime-update/sublimation/layout-workflow.mp4` | 1,773,884 B | 1,773,884 B | N/A | 1600×1010 → 1600×1010 | 54.70 s | 0.00% | Home Sublimation; Guide Sublimation |
| `hardware/real/videos/dtf604-machine-operation.mp4` | 13,963,445 B | 3,469,358 B | N/A | 1080×1440 → 1080×1440 | 11.22 s | 75.15% | DTF604 only / machine operation |
| `hardware/real/videos/dtf608-print-closeup.mp4` | 21,195,828 B | 6,443,864 B | N/A | 720×1280 → 720×1280 | 25.65 s | 69.60% | DTF608 only / print close-up |
| `hardware/real/videos/dtf608-production-wide.mp4` | 15,010,729 B | 5,053,177 B | N/A | 720×1280 → 720×1280 | 21.18 s | 66.34% | DTF608 only / continuous production |
| `hardware/real/videos/dtf608-production-close.mp4` | 12,589,873 B | 4,248,147 B | N/A | 720×1280 → 720×1280 | 17.00 s | 66.26% | DTF608 only / output path close-up |
| `hardware/real/videos/shared-output-demo.mp4` | 12,390,689 B | 3,380,922 B | N/A | 1080×1080 → 1080×1080 | 10.50 s | 72.71% | Approved shared output / DTF604, DFG604, DTF608 |
| `hardware/real/videos/shared-quality-demo.mp4` | 12,255,059 B | 3,743,375 B | N/A | 720×1280 → 720×1280 | 15.00 s | 69.45% | Approved shared quality / DTF604, DFG604, DTF608 |

Total referenced source bytes are 118,828,802 B; served web assets are 57,762,022 B, a 51.39% reduction before viewport scheduling is considered.

The software recordings were kept byte-identical in the derived directory. A lower-bitrate trial of the DTF multi-layout recording visibly softened small Chinese UI text, so it was rejected. Their performance gain comes from not requesting distant and inactive-tab recordings until needed.

## Loading strategy

- Critical / visible: attach the MP4 source, preload automatically, and play muted inline.
- Near: within 180% viewport margin, attach source with metadata preload so the next section is ready.
- Far / hidden tab: no `src` is attached and no video request competes with the first screen.
- Off-screen: pause playback but keep the already-loaded source and buffer.
- Return: resume from the retained position without resetting.
- Reduced motion: keep the real-frame poster and avoid attaching new video sources.

## Browser and responsive QA

| Gate | Result | Evidence |
|---|---|---|
| Homepage cold load | PASS | 11 initial video requests reduced to 2 on the anchored cold test |
| MAIXON AI autoplay | PASS | entered viewport, advanced from 0.247 s to 0.613 s |
| DTF autoplay | PASS | entered viewport, advanced from 0.466 s to 0.839 s |
| DTG autoplay | PASS | entered viewport, advanced from 0.363 s to 0.729 s |
| Sublimation autoplay | PASS | entered viewport, advanced from 0.464 s to 0.833 s |
| Off-screen pause | PASS | DTF long video paused off-screen at 34.217 s |
| Buffer retention / resume | PASS | same source retained; resumed from 34.217 s to 35.010 s |
| muted / playsinline / no controls | PASS | verified on homepage and hardware videos |
| loop preservation | PASS | hardware loops remain enabled; existing non-loop software behavior unchanged |
| poster | PASS | every referenced video retains an existing real-frame poster |
| HTTP Range | PASS | `206 Partial Content`, `bytes 0-1023/3469358`, 1024 B response |
| Safari | PASS | homepage hero and AI recording autoplayed; far sources remained unattached |
| Chromium / Chrome engine | PASS | Chromium 151, autoplay/load/pause/resume/console tests passed |
| Exact Google Chrome app | NOT AVAILABLE | Google Chrome is not installed and no Chrome profile is available on this Mac; no substitute app was installed during this strict task |
| 390 px | PASS | `innerWidth = scrollWidth = 390`; no horizontal overflow; only hero source attached at top |
| Console | PASS | 0 logs/errors on home, English home, DTF604, DFG604 and DTF608 QA tabs |

## Media mapping gate

- DTF604 page: `dtf604-machine-operation` plus the two approved shared videos; no DTF608 media.
- DFG604 page: only the two approved shared videos; no DTF604 or DTF608 model-specific media.
- DTF608 page: three DTF608-only videos plus the two approved shared videos; no DTF604 media.
- `CROSS_MODEL_VIDEO_ERROR = 0`.

## Visual regression

- Before: `/Users/maijinqiao/Documents/Codex/2026-08-19/maixon-v59-video-optimization/before-homepage-1440.png`
- After: `/Users/maijinqiao/Documents/Codex/2026-08-19/maixon-v59-video-optimization/after-homepage-1440.png`
- Mobile after: `/Users/maijinqiao/Documents/Codex/2026-08-19/maixon-v59-video-optimization/after-homepage-390.png`
- Safari homepage: `/Users/maijinqiao/Documents/Codex/2026-08-19/maixon-v59-video-optimization/safari-homepage.png`
- Safari AI autoplay: `/Users/maijinqiao/Documents/Codex/2026-08-19/maixon-v59-video-optimization/safari-ai-autoplay.png`
- DTF604: `/Users/maijinqiao/Documents/Codex/2026-08-19/maixon-v59-video-optimization/after-dtf604-1440.png`
- DFG604: `/Users/maijinqiao/Documents/Codex/2026-08-19/maixon-v59-video-optimization/after-dfg604-1440.png`
- DTF608: `/Users/maijinqiao/Documents/Codex/2026-08-19/maixon-v59-video-optimization/after-dtf608-1440.png`

At the matched homepage viewport, layout, typography, colors, copy, media frame sizes and section positions are unchanged. Only the video request/playback state differs.

## Build

- Media build: 98 records
- Astro check: 0 errors (one pre-existing unused variable hint)
- Astro static build: 47 pages
- Bilingual validation: PASS
- Build result: PASS

## Zero-regression answers

1. 是否修改任何现有文案？ **NO**
2. 是否修改页面布局？ **NO**
3. 是否修改视频容器大小？ **NO**
4. 是否修改媒体归属？ **NO**
5. 是否修改下载？ **NO**
6. 是否修改硬件参数？ **NO**
7. 是否修改 Global CSS？ **NO**
8. 是否删除原始视频？ **NO**
9. 是否剪短视频内容？ **NO**
10. 是否修改任何非视频性能相关功能？ **NO**
