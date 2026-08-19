# MAIXON V5.9 Video Asset Audit

Recorded before optimization on 2026-08-19. Original files are frozen masters and must remain byte-for-byte unchanged.

Common current behavior for every referenced video:

- Container: MP4
- Codec: H.264 / `avc1`
- Audio tracks: 0
- Muted: yes
- Plays inline: yes
- Controls: no
- Loading: a `src` is attached at parse time; viewport logic pauses playback but does not defer the network request
- MP4 atom order: `moov` before `mdat` for all 20 audited files

| Source file | Page / section | Media ID | Product | Resolution | FPS | Duration | Video bitrate | Size | Autoplay / loop | Preload | Poster |
|---|---|---|---|---:|---:|---:|---:|---:|---|---|---|
| `software/zh/videos/demo_overall_zh_v59.mp4` | zh-CN + en home / hero | `software-zh-videos-demo-overall-zh-v59` | Overall | 1920×1216 | 30.00 | 23.00 s | 269 kb/s | 781,635 B | yes / no | metadata | `software-zh-posters-poster-overall-zh-v59` |
| `software/zh/runtime-update/ai/artwork-extraction-compare.mp4` | home AI 02; guide AI | `software-zh-runtime-update-ai-artwork-extraction-compare` | AI | 778×990 | 30.00 | 10.30 s | 443 kb/s | 574,235 B | scripted / no | metadata | `software-zh-runtime-update-posters-ai-artwork-extraction-compare` |
| `software/zh/runtime-update/ai/background-removal-compare.mp4` | home AI 02 inactive tab | `software-zh-runtime-update-ai-background-removal-compare` | AI | 1000×1048 | 30.00 | 9.40 s | 652 kb/s | 769,948 B | scripted / no | metadata | `software-zh-runtime-update-posters-ai-background-removal-compare` |
| `software/zh/runtime-update/ai/continue-to-dtg.mp4` | home AI 03 | `software-zh-runtime-update-ai-continue-to-dtg` | AI → DTG | 1601×1008 | 30.00 | 54.37 s | 462 kb/s | 3,161,562 B | scripted / no | metadata | `software-zh-runtime-update-posters-ai-continue-to-dtg` |
| `software/zh/runtime-update/dtf/multi-layout.mp4` | home DTF main tab | `software-zh-runtime-update-dtf-multi-layout` | DTF | 1600×1008 | 30.00 | 59.33 s | 1,953 kb/s | 14,508,870 B | scripted / no | metadata | `software-zh-runtime-update-posters-dtf-multi-layout` |
| `software/zh/runtime-update/dtf/parameter-tour.mp4` | home DTF inactive tab; guide DTF | `software-zh-runtime-update-dtf-parameter-tour` | DTF | 1599×1008 | 30.00 | 12.67 s | 585 kb/s | 931,632 B | scripted / no | metadata | `software-zh-runtime-update-posters-dtf-parameter-tour` |
| `software/zh/runtime-update/dtf/single-artwork.mp4` | home DTF inactive tab | `software-zh-runtime-update-dtf-single-artwork` | DTF | 1599×1010 | 30.00 | 25.47 s | 639 kb/s | 2,043,268 B | scripted / no | metadata | `software-zh-runtime-update-posters-dtf-single-artwork` |
| `software/zh/runtime-update/dtf/single-row-layout.mp4` | home DTF inactive tab | `software-zh-runtime-update-dtf-single-row-layout` | DTF | 1598×1002 | 30.00 | 57.10 s | 392 kb/s | 2,822,013 B | scripted / no | metadata | `software-zh-runtime-update-posters-dtf-single-row-layout` |
| `software/zh/runtime-update/dtf/one-meter-layout.mp4` | home DTF inactive tab | `software-zh-runtime-update-dtf-one-meter-layout` | DTF | 1599×1008 | 30.00 | 49.43 s | 580 kb/s | 3,601,023 B | scripted / no | metadata | `software-zh-runtime-update-posters-dtf-one-meter-layout` |
| `software/zh/runtime-update/dtg/parameter-controls.mp4` | home DTG; guide DTG | `software-zh-runtime-update-dtg-parameter-controls` | DTG | 1599×1008 | 30.00 | 20.10 s | 178 kb/s | 455,109 B | scripted / no | metadata | `software-zh-runtime-update-posters-dtg-parameter-controls` |
| `software/zh/runtime-update/sublimation/layout-workflow.mp4` | home Sublimation; guide Sublimation | `software-zh-runtime-update-sublimation-layout-workflow` | Sublimation | 1600×1010 | 30.00 | 54.70 s | 256 kb/s | 1,773,884 B | scripted / no | metadata | `software-zh-runtime-update-posters-sublimation-layout-workflow` |
| `hardware/real/videos/dtf604-machine-operation.mp4` | DTF604 / machine operation | `hw-real-dtf604-machine-operation` | DTF604 only | 1080×1440 | 30.05 | 11.22 s | 9,896 kb/s | 13,963,445 B | yes / yes | metadata | `hw-real-dtf604-machine-operation-poster` |
| `hardware/real/videos/dtf608-production-wide.mp4` | DTF608 / continuous production | `hw-real-dtf608-production-wide` | DTF608 only | 720×1280 | 23.99 | 21.18 s | 5,668 kb/s | 15,010,729 B | yes / yes | metadata | `hw-real-dtf608-production-wide-poster` |
| `hardware/real/videos/dtf608-print-closeup.mp4` | DTF608 / print close-up | `hw-real-dtf608-print-closeup` | DTF608 only | 720×1280 | 23.98 | 25.65 s | 6,608 kb/s | 21,195,828 B | yes / yes | metadata | `hw-real-dtf608-print-closeup-poster` |
| `hardware/real/videos/dtf608-production-close.mp4` | DTF608 / output path close-up | `hw-real-dtf608-production-close` | DTF608 only | 720×1280 | 24.00 | 17.00 s | 5,921 kb/s | 12,589,873 B | yes / yes | metadata | `hw-real-dtf608-production-close-poster` |
| `hardware/real/videos/shared-output-demo.mp4` | DTF604, DFG604, DTF608 / output quality | `hw-real-shared-output-demo` | approved shared output | 1080×1080 | 30.00 | 10.50 s | 9,435 kb/s | 12,390,689 B | yes / yes | metadata | `hw-real-shared-output-demo-poster` |
| `hardware/real/videos/shared-quality-demo.mp4` | DTF604, DFG604, DTF608 / color and detail | `hw-real-shared-quality-demo` | approved shared quality | 720×1280 | 24.00 | 15.00 s | 6,532 kb/s | 12,255,059 B | yes / yes | metadata | `hw-real-shared-quality-demo-poster` |

## Present in the media package but not referenced by the current site

| Source file | Media ID | Resolution | FPS | Duration | Bitrate | Size | Decision |
|---|---|---:|---:|---:|---:|---:|---|
| `software/zh/videos/demo_ai_zh_v59.mp4` | `software-zh-videos-demo-ai-zh-v59` | 1920×1216 | 30 | 23 s | 229 kb/s | 667,851 B | preserve source; do not add a new page reference |
| `software/zh/videos/demo_dtf_zh_v59.mp4` | `software-zh-videos-demo-dtf-zh-v59` | 1920×1216 | 30 | 21 s | 114 kb/s | 306,668 B | preserve source; do not add a new page reference |
| `software/zh/videos/demo_sublimation_zh_v59.mp4` | `software-zh-videos-demo-sublimation-zh-v59` | 1920×1216 | 30 | 38 s | 255 kb/s | 1,226,525 B | preserve source; do not add a new page reference |

## Audit conclusion

The homepage issue is caused primarily by eager source attachment. Hardware masters additionally use 5.7–9.9 Mb/s and are 11.7–20.2 MiB each, so they need derived web versions. Most software captures are already lightweight; byte-identical derived copies preserve UI legibility, while the 13.84 MiB DTF multi-layout capture is the only software video that merits a careful re-encode test.
