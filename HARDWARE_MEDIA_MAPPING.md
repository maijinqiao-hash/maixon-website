# MAIXON V5.9 Hardware Real Media Mapping

Internal development record only. This file is not customer-facing and must not be exposed by the public build.

## Routing rules

- `dtf604-only` may appear only on DTF604.
- `dtf608-only` may appear only on DTF608.
- `garment-shared` may appear only on DTF604 and DTF608.
- `quality-shared` may appear only on DTF604, DTF608 and DFG604.
- DFG604 existing foil, banner and apparel sections remain untouched.
- The source folder is read-only. All website files are derived copies.

| Source filename | Source SHA-256 | Actual type and visual meaning | Category | Allowed page(s) | Forbidden page(s) | Target media ID | Purpose / public caption direction | Converted output | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `DTF 604 演示视频。.jpeg` | `4dec7d12a7da8762518d0995491fe302c5ef8ce6e2d41abbe85b2f287786e9cd` | JPEG, 1080 × 1440. Real DTF604 system in a workshop; despite the filename, this is a still photo, not a video. | `dtf604-only` / machine overview | DTF604 | DTF608, DFG604, OVEN604 | `hw-real-dtf604-machine-overview` | Standard-production machine overview. Do not describe it as a video. | Responsive AVIF/WebP/JPEG | `local-preview`; real hardware; brand/publication review pending |
| `copy_DFA19B02-484F-4366-998D-2F934D0F843A.mov` | `4a2a981b1a1bc60c96f2be0a59f364302137df4b6335d270b4f1d9006cf928f5` | MOV/H.264, 1080 × 1440, 11.216 s. Real DTF604 system operation, printed-film travel and take-up close view. | `dtf604-only` / machine operation | DTF604 | DTF608, DFG604, OVEN604 | `hw-real-dtf604-machine-operation` | Replaces the still inside the existing DTF604 standard-production frame; existing customer copy and layout remain unchanged. | Muted H.264 MP4 + real-frame poster | `local-preview`; real hardware operation; brand/publication review pending |
| `八头机打印近景.MP4` | `a32c39aa0c1ca1766d1abe8c4e6d761c2f7cebc733377f0826a3eff5b5b216c1` | MP4/HEVC, 1728 × 3072, 25.65 s. Close view of the eight-head carriage printing on film. | `dtf608-only` / printing close-up | DTF608 | DTF604, DFG604, OVEN604 | `hw-real-dtf608-print-closeup` | Printing-head motion, film travel and output detail. | Muted H.264 MP4 + real-frame poster | `local-preview`; real production; brand/publication review pending |
| `八头机照片（标明：过滤机 and 电脑是另需购买的）.JPG` | `f43cd89f1f0428e4ecf031a54e9c03ff11e0b7b9f5c3812f1327ce48ea7eab78` | JPEG, 1184 × 864. Clean-background eight-head production system; computer and filtration equipment are visible but separately configured. | `dtf608-only` / machine overview | DTF608 | DTF604, DFG604, OVEN604 | `hw-real-dtf608-machine-overview` | Eight-head system overview. Customer note: computer and filtration equipment shown are separately configured. | Responsive AVIF/WebP/JPEG | `local-preview`; real hardware; brand/publication review pending |
| `八头机视频.MOV` | `f635cf39d6b1fc84beea8c71330d22e65708d8ba9c2bb4c8c232324a72da2a5d` | MOV/HEVC, 2160 × 3840, 21.18 s. Front view of the eight-head system running continuously. | `dtf608-only` / production-wide | DTF608 | DTF604, DFG604, OVEN604 | `hw-real-dtf608-production-wide` | Continuous production and media travel. | Muted H.264 MP4 + real-frame poster | `local-preview`; real production; brand/publication review pending |
| `八头机视频（近景）.MOV` | `cba2559de96bdaa1cd95dc681e1621b424c6c2407b5f17152926b3886356f889` | MOV/HEVC, 2160 × 3840, 17.00 s. Angled close view of the same eight-head system, carriage and printed film. | `dtf608-only` / production-close | DTF608 | DTF604, DFG604, OVEN604 | `hw-real-dtf608-production-close` | Eight-head carriage and output path from a closer angle. | Muted H.264 MP4 + real-frame poster | `local-preview`; real production; brand/publication review pending |
| `成品样衣.heic` | `0781c1dc9176d878e8e14ce8ef19f19360a68c9b472439c9d54060847e4429cb` | HEIC, 2794 × 3726. Finished grey printed hoodie. Third-party automotive marks are visible. | `garment-shared` / finished garment | DTF604, DTF608 | DFG604, OVEN604 | `hw-real-garment-hoodie` | Finished garment application; keep caption process-focused and avoid trademark claims. | Responsive AVIF/WebP/JPEG | `local-preview`; rights clearance pending |
| `成品样衣 2.heic` | `d1943494a80c5d942df949733d0d43203db8fb1d712eaf6237629922c211511c` | HEIC, 2393 × 3283. Finished black printed sweatshirt. A person is visible at the top edge; the website derivative must use a minimal crop that removes the face. | `garment-shared` / finished garment | DTF604, DTF608 | DFG604, OVEN604 | `hw-real-garment-sweatshirt` | Finished garment detail with privacy-safe crop. | Privacy-cropped responsive AVIF/WebP/JPEG | `local-preview`; privacy crop required; rights clearance pending |
| `打印成品演示，放置于三款机器的介绍页里展示.mov` | `1148a8e24ba04efb6d88d254816582d2cc489a14aa3095bde0a2d6bea3eeb12c` | MOV/HEVC, 1080 × 1080, 17.50 s. First portion is a finished print close-up; later footage reveals a specific blue DTF machine. Only the machine-neutral opening portion may be shared. | `quality-shared` / finished-output detail | DTF604, DTF608, DFG604 | OVEN604 | `hw-real-shared-output-demo` | Close view of color coverage and printed surface. The derived clip ends before model-specific machine footage. | Muted H.264 MP4, approximately 0–10.5 s + real-frame poster | `local-preview`; rights clearance pending |
| `样图色彩精度演示，这条视频要放在 3 个机器的介绍页里面.MOV` | `2183323167af4cb8a530c073cfe38d8fe3ed6e37df43be4eaaa5cd290d21002d` | MOV/HEVC, 2160 × 3840, 39.00 s. Printed fabric details. Early footage includes four-head/model-specific text; only the later model-neutral detail segment may be shared. | `quality-shared` / color-and-detail demo | DTF604, DTF608, DFG604 | OVEN604 | `hw-real-shared-quality-demo` | Color layers, edges, fine graphic detail and finished surface; no unmeasured accuracy claims. | Muted H.264 MP4, approximately 24–39 s + real-frame poster | `local-preview`; rights clearance pending |

## DTF604 machine media resolution

The direct user attachment received on 2026-08-19 resolves the earlier DTF604 motion-media gap. Its website derivative replaces the still only in the existing DTF604 standard-production media frame. The original JPEG remains archived and is no longer rendered in that frame.

## Privacy and publication review

- The derivative of `成品样衣 2.heic` must remove the visible face using a minimal top crop; no black masking.
- No private chats, phone numbers, email addresses, file paths, vehicle plates or customer QR codes were found in the reviewed frames selected for output.
- Several supplied media items show third-party artwork or equipment branding. They are allowed in local preview, but remain `rights_clearance: pending` / `public_safe: false` until the user approves publication.
- Source files remain untouched in `/Users/maijinqiao/Desktop/新官网补全的素材/官网机器视频素材/`.
