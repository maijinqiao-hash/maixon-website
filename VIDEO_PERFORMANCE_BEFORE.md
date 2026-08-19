# MAIXON V5.9 Video Performance — Before Baseline

Recorded: 2026-08-19 (Asia/Shanghai)

## Frozen source

- Branch: `website-v59-redesign`
- Baseline HEAD: `949709ef82b63211ea9b8d159c0f5ff88b5ca85f`
- Baseline worktree: clean
- Test build: existing production `dist`
- Cold origin: a new local no-cache origin on `http://127.0.0.1:4351`
- Browser: Codex in-app Chromium 151, 1440 × 1000
- Route: `/zh-CN/?cold=before#software`

## Cold-load result

- Navigation returned in: 58 ms
- Requests observed in first 3.5 s: 28
- Bytes transferred in first 3.5 s: 23,139,991 bytes (22.07 MiB)
- Video requests started immediately: 11
- Video bytes transferred in first 3.5 s: 20,780,933 bytes (19.82 MiB)
- Relevant console errors: 0
- First visible video requested at: +16 ms
- First visible video reached motion at approximately: +58–400 ms (the first sampled moving frame was at 0.342 s)

The important defect is not a slow server response. All 11 homepage MP4 sources were attached during HTML parsing, so videos many screens below the viewport competed for bandwidth immediately. Ten of those requests were for off-screen media.

## Initial video waterfall

| Start | Video | Source size | Bytes transferred during sample | Initial visibility |
|---:|---|---:|---:|---|
| +16 ms | `demo_overall_zh_v59.mp4` | 781,635 | 781,635 | visible / hero |
| +16 ms | `artwork-extraction-compare.mp4` | 574,235 | 574,235 | off-screen |
| +18 ms | `background-removal-compare.mp4` | 769,948 | 769,948 | hidden tab |
| +18 ms | `continue-to-dtg.mp4` | 3,161,562 | 3,161,562 | off-screen |
| +19 ms | `parameter-tour.mp4` | 931,632 | 931,632 | hidden tab |
| +19 ms | `multi-layout.mp4` | 14,508,870 | 3,866,624 before sample ended | off-screen |
| +20 ms | `single-artwork.mp4` | 2,043,268 | 2,043,268 | hidden tab |
| +21 ms | `single-row-layout.mp4` | 2,822,013 | 2,822,013 | hidden tab |
| +22 ms | `one-meter-layout.mp4` | 3,601,023 | 3,601,023 | hidden tab |
| +23 ms | `parameter-controls.mp4` | 455,109 | 455,109 | off-screen |
| +25 ms | `layout-workflow.mp4` | 1,773,884 | 1,773,884 | off-screen |

## Baseline loading behavior

- `MediaFrame.astro` rendered a `src` attribute for every video immediately.
- Non-priority videos used `preload="metadata"`, but the local/Chromium test still issued complete range requests for all attached sources.
- `SiteLayout.astro` paused off-screen playback but did not defer the source request.
- Hidden switcher panels also had live `src` attributes, so inactive demonstrations loaded immediately.
- The source files are H.264 MP4 and already have their `moov` atom before `mdat`; the principal homepage problem is request scheduling, with several large hardware masters adding further risk on product pages.

## Evidence

- Screenshot: `/Users/maijinqiao/Documents/Codex/2026-08-19/maixon-v59-video-optimization/before-homepage-1440.png`
- Raw request log: `/tmp/maixon-video-before-network.jsonl`
- Request server used `Cache-Control: no-store` and HTTP Range responses.

The measurements above are observed values from the frozen build, not estimates. The motion timestamp is reported as a range because the browser runtime exposes video state but not Navigation Timing in this controlled in-app session.
