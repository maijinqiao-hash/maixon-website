# MAIXON V5.9 增量素材接入报告

核验日期：2026-08-17  
目标：将 Windows Codex 增量包作为素材来源接入新 Astro 站，不覆盖旧站 main 或原素材包。

## 包级校验

| 素材包 | SHA256 | Manifest 记录 | 结果 |
|---|---|---:|---|
| MAIXON_V5.9_WEBSITE_MISSING_ASSETS_ONLY.zip | `30f1c20117b012e39ce8164afa80b55e630ff67499141489f717cd7767710006` | 44 | ZIP 与逐文件 SHA256 全部通过 |
| MAIXON_V5.9_WEBSITE_DTG_MISSING_MEDIA_ADDON.zip | `ffc804f5dfd5f3c33eb9f4ecb08d45d487e0196ace0295ef7cc0b17330a234f5` | 8 | ZIP 与逐文件 SHA256 全部通过；无主包重复 |

主包包含 25 张软件截图、4 条中文工作流视频、4 张 Poster、7 份生产输出证明与 4 份说明/Manifest。DTG 补全包包含最终 V5.9 中文 DTG 截图与 4252 × 5085、CMYK + W1 的真实 TIFF 输出证明。

## 网站媒体层

- `scripts/build-media.mjs` 扫描接入资产并生成 WebP 响应式变体。
- `src/data/media-manifest.json` 与 `public/media-manifest.json` 是统一数据层；组件不直接写具体图片路径。
- `MediaFrame.astro` 只接受稳定媒体 ID，统一输出 `picture/srcset`、`aspect-ratio`、`object-fit`、`object-position` 和媒体状态属性。
- 当前 50 条网站媒体记录：39 条 `runtime_capture/approved`、4 条 `production_output/approved`、2 条 `official/approved`、5 条 `generated/provisional`。
- 5 条临时硬件图全部为 `replaceable=true`；`layout_depends_on_image=true` 当前为 0。

## 双语结论

- 中文网站绑定中文软件截图和中文视频。
- 英文网站绑定英文软件截图；没有英文版本的视频不在英文页播放。
- 英文 DTG 软件 UI 尚缺，因此暂用不含界面文字的真实 DTG 输出图，不借用中文 UI。
- 后续真实摄影或英文补拍到达时，只替换媒体文件或 Manifest 映射；正常情况下无需重做 Section。
