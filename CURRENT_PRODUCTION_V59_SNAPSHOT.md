# MAIXON 当前生产环境 V5.9 冻结快照

状态：READ-ONLY / PRODUCTION FROZEN  
采集时间：2026-08-17 00:44:56 +08:00（Asia/Shanghai）  
生产域名：https://maixon.vip  
采集目的：为 MAIXON V5.9 新官网开发建立上线前回滚基线。  

## 1. 冻结边界

- 新官网开发期间不得修改 maixon.vip 当前生产部署。
- 不得用本地重构分支覆盖当前 Cloudflare Pages 生产版本。
- 安装包继续由阿里云 OSS 独立托管；网站仓库不得收纳或覆盖安装包。
- 本文件记录了公开网络能够验证的生产事实。
- Cloudflare Pages 项目名、生产 Deployment ID、pages.dev 地址和可回滚 Deployment ID 不是公开网页信息；当前浏览器停留在 Cloudflare 登录页，本机也没有独立 wrangler 命令或仓库级 Wrangler 配置，因此这些字段不能猜测。
- 在以上 Cloudflare 控制台字段补齐前，生产发布 Gate 保持关闭。

## 2. 仓库与生产版本关系

| 项目 | 已核实值 |
|---|---|
| 正式仓库 | https://github.com/maijinqiao-hash/maixon-website.git |
| 本地重构目录 | /Users/maijinqiao/maixon-website-v59-redesign |
| 重构分支 | website-v59-redesign |
| 当前 HEAD | f70eb72af5c1f872f08e0e9cfe32a4cd9d0baa84 |
| origin/main | f70eb72af5c1f872f08e0e9cfe32a4cd9d0baa84 |
| 工作区基线 | 旧站原生 HTML/CSS/JavaScript；新站不得以其 UI/CSS/DOM/JS 为实现基础 |

重要差异：当前 Git HEAD 仍是旧品牌和旧页面实现，但线上 version.json 已发布 V5.9.0，线上页面同时仍加载大量带 v=5.3.2-20260720b 的旧资源。不能把 Git HEAD 单独视为完整生产回滚包。

## 3. Cloudflare Pages 生产控制面

| 必须冻结的字段 | 当前状态 | 上线前要求 |
|---|---|---|
| Cloudflare Account | 未验证；登录页显示最近使用账户，但未进入控制台 | 由账户所有者登录后确认 |
| Pages Project Name | 未验证 | 记录精确项目名 |
| Production Deployment ID | 未验证 | 记录当前部署 ID、时间和关联 Commit |
| Production branch | 推定为 main，但未由控制台证明 | 控制台确认，不以推定代替 |
| pages.dev 生产地址 | 未验证 | 记录并测试 |
| Custom domain binding | maixon.vip 公开可访问，但控制台绑定未验证 | 控制台确认 |
| 可回滚 Deployment ID | 未验证 | 至少记录当前稳定部署和上一稳定部署 |
| Rollback 操作权限 | 未验证 | 上线前由账户所有者确认 |

公开网络证据：

- maixon.vip 响应头 server: cloudflare。
- 公共 DNS A 记录在 1.1.1.1 查询结果为 104.21.40.50、172.67.176.115。
- 首页 Cache-Control 为 public, max-age=0, must-revalidate；采集时 cf-cache-status 为 MISS。

结论：Cloudflare Pages 托管方向与现有 README 一致，但公开证据不足以证明具体 Project 和 Deployment。该缺口是发布阻断项，不是设计阻断项。

## 4. 当前公开 Route 清单

以下 SHA256 是采集时返回 HTML 正文的指纹，可用于判断生产页面是否发生变化。

| Route | HTTP | 当前标题 | HTML SHA256 |
|---|---:|---|---|
| / | 200 | MAIXON TOOL V5.9 \| AI 智能印花生产软件 | 16ef20fc40a0cef51f7812a6f916ddc5366c48ea41ebf30e71d99d7756475e42 |
| /printer | 200 | MAIXON 打印机产品线 \| 三款独立机型 | de8621fddb093c6ef62684e1205b30c988295df469c8493557030916eb8da2c7 |
| /oven | 200 | MAIXON OVEN604 \| DTF 自动撒粉烘干系统 | c89c81a05a3e8a4ca8383098a695b6c22403e52e2dd528e189e05e6e384925c4 |
| /printhead | 200 | MAIXON 7610 喷头与质保保障 | 2a1cfc9babe014084c76dc6d3847b0607edc53451a5a7145395c80dd6d10bd0b |
| /manuals | 200 | MAIXON 官方使用说明中心 | 2d6c947009785bfa0a9288f2491a157886651f57de366e932349ee621a0ba28a |
| /guide | 200 | 软件说明 \| MAIXON DTF TOOL Professional V5.3.2 | 69431345dbc8e946cc964d9edb90863dc30ef3327dbf31819b7df944d122d9ea |
| /equipment-manual | 200 | MAIXON DTF 设备官方使用说明 | da1a3adec794c4a0d7f2bb39306da736f46a528746c6b454ce9a85c9191c0671 |
| /dtf604 | 200 | MAIXON DTF604 \| 四头高速 DTF 打印机 | 94c5b4bddac9c3fe2634720043b6a0d055da58de0416655157d6305f42b7b55d |
| /dtg604 | 200 | MAIXON DTG604 \| 四头烫金打印机 | d1b9ed41e16945b38070ad05afeea177d47bae5c0848f478363189f19179baa8 |
| /dtf608 | 200 | MAIXON DTF608 \| 八头高速 DTF 打印机 | 0cf74fa2de51f8c64f2dcb284d82e8e8ef33f145a8f5efbcb13b81e5d696c0d6 |

Cloudflare 当前为对应 .html URL 提供 307 清理跳转：

- /printer.html → /printer
- /oven.html → /oven
- /printhead.html → /printhead
- /manuals.html → /manuals
- /guide.html → /guide
- /equipment-manual.html → /equipment-manual
- /dtf604.html → /dtf604
- /dtg604.html → /dtg604
- /dtf608.html → /dtf608

这些 clean URL 与 .html URL 都必须进入新站重定向测试，不能制造 404。

## 5. 当前 version.json

URL：https://maixon.vip/version.json  
HTTP：200  
Content-Type：application/json  
ETag：10f14b04a2b2c20dc46d2d2a86c71097  
正文 SHA256：677292bf35e49703e13b1f3724d3ae8e0d48304fdbcb1f3071f081b08b9cebf1

| 字段 | 当前值 |
|---|---|
| version | 5.9.0 |
| name | MAIXON TOOL |
| download_url | https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V5.9_Windows10_11_Setup.exe |
| guide_url | https://maixon.vip/manuals.html |
| software_guide_url | https://maixon.vip/guide.html |
| equipment_guide_url | https://maixon.vip/equipment-manual.html |
| printer_url | https://maixon.vip/printer.html |
| oven_url | https://maixon.vip/oven.html |
| website_revision | 5.9.0-release |
| release_date | 2026-08-15 |
| file_size_bytes | 71576430 |
| sha256 | 2528235A8E95CAAB8FAD0BCABFD4D1523B189EEEB61759464B53E6427E7550D7 |
| operating_system | Windows 10/11 |

## 6. 当前安装包链路

安装包 URL：https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V5.9_Windows10_11_Setup.exe

2026-08-17 复核结果：

| 项目 | 结果 |
|---|---|
| HTTP | 200 |
| Server | AliyunOSS |
| Content-Length | 71,576,430 bytes |
| ETag | 3ACC77E81F1E77E95DF85A79C91D4187 |
| Last-Modified | Fri, 14 Aug 2026 18:37:50 GMT |
| Content-Disposition | attachment |
| Content-MD5 | Osx36B8ed+ld+Fp5yR1Bhw== |
| 实际流式 SHA256 | 2528235a8e95caab8fad0bcabfd4d1523b189eeeb61759464b53e6427e7550d7 |
| 与 version.json | 一致 |

上线时必须继续把下载按钮指向 OSS，不得把 71.6 MB 安装包打进 Astro 构建或 Cloudflare Pages 仓库。

## 7. 当前在线资源清单

下列资源由现有公开页面直接引用。它们是回滚识别和 Legacy Reference，不是新站 UI 迁移清单。

基础样式、脚本与数据：

- assets/styles.css?v=5.3.2-20260720b
- assets/software-v532.css?v=5.3.2-20260720b
- assets/guide-v532.css?v=5.3.2-20260720b
- assets/main.js?v=5.3.2-20260720b
- assets/product.js?v=5.3.2-20260720b
- assets/software-v532.js?v=5.3.2-20260720b
- assets/equipment-detail.js?v=5.3.2-20260720b
- assets/equipment-manual.js?v=5.3.2-20260720b
- content/site-data.js?v=5.3.2-20260720b
- content/translations.js?v=5.3.2-20260720b
- content/software-translations-v532.js?v=5.3.2-20260720b
- content/equipment-data.js?v=5.3.2-20260720b

品牌与软件界面：

- assets/maixon-logo-white.png?v=5.3.2-20260720b
- assets/software/maixon-ai-workbench.png?v=5.3.2-20260720b
- assets/software/maixon-dtf-interface.png?v=5.3.2-20260720b
- assets/software/maixon-dtg-dark-fabric.png?v=5.3.2-20260720b
- assets/software/maixon-multi-layout.png?v=5.3.2-20260720b
- assets/software/maixon-production-overview.png?v=5.3.2-20260720b
- assets/software/maixon-single-layout.png?v=5.3.2-20260720b
- assets/software/maixon-sublimation-layout.png?v=5.3.2-20260720b

硬件：

- assets/equipment/models/dtf604.webp?v=5.3.2-20260720b
- assets/equipment/models/dtg604.webp?v=5.3.2-20260720b
- assets/equipment/models/dtf608.webp?v=5.3.2-20260720b
- assets/equipment/models/oven604.webp?v=5.3.2-20260720b
- assets/equipment/printheads/epson-wf7610.webp?v=5.3.2-20260720b
- assets/equipment/details/head-cleaning.webp?v=5.3.2-20260720b
- assets/equipment/details/head-damper.webp?v=5.3.2-20260720b
- assets/equipment/details/ink-level-alarm.webp?v=5.3.2-20260720b
- assets/equipment/details/oven-control.webp?v=5.3.2-20260720b
- assets/equipment/details/oven-cooling.webp?v=5.3.2-20260720b
- assets/equipment/details/powder-recovery.webp?v=5.3.2-20260720b
- assets/equipment/details/pressure-feed.webp?v=5.3.2-20260720b
- assets/equipment/details/tension-core.webp?v=5.3.2-20260720b
- assets/equipment/details/touch-panel.webp?v=5.3.2-20260720b
- assets/equipment/details/white-ink-shaker.webp?v=5.3.2-20260720b
- assets/equipment/details/white-ink-tank.webp?v=5.3.2-20260720b
- assets/equipment/applications/oven-compact.webp?v=5.3.2-20260720b
- assets/equipment/applications/oven-shop.webp?v=5.3.2-20260720b
- assets/equipment/applications/oven-studio.webp?v=5.3.2-20260720b
- assets/equipment/applications/oven-volume.webp?v=5.3.2-20260720b
- assets/equipment/samples/precision-animals.webp?v=5.3.2-20260720b
- assets/equipment/samples/precision-color.webp?v=5.3.2-20260720b
- assets/equipment/samples/precision-labels.webp?v=5.3.2-20260720b

AI、Photoshop 与联系：

- assets/ai/astronaut-before.webp
- assets/ai/astronaut-after.webp
- assets/ai/floral-before.webp
- assets/ai/floral-after.webp
- assets/ai/jellyfish-before.webp
- assets/ai/jellyfish-after.webp
- assets/ai/koi-before.webp
- assets/ai/koi-after.webp
- assets/ai/phoenix-before.webp
- assets/ai/phoenix-after.webp
- assets/ai/tiger-before.webp
- assets/ai/tiger-after.webp
- assets/photoshop/ps-step-original.webp
- assets/photoshop/ps-step-selection.webp
- assets/photoshop/ps-step-w1-mask.webp
- assets/contact/wechat.webp?v=5.3.2-20260720b
- assets/contact/whatsapp.webp?v=5.3.2-20260720b

硬件主图采集指纹：

| 资源 | 尺寸 | SHA256 |
|---|---:|---|
| dtf604.webp | 1279 × 1800 | 4d854045d27e9451a68020111dfbf412a10a090533327e22b3916ee8ae98a2db |
| dtg604.webp | 1488 × 1584 | 599c673fc0e7d0f5dc7711feb9f30a45e79d5eb7e7f58635e20fbba467119db8 |
| dtf608.webp | 1500 × 1564 | 70e10955f7ebc37cb375524a012ee9f309fe1bba9506d95c4a763988da1a9a27 |
| oven604.webp | 900 × 1270 | 40a231fccc9f402abc90bd99205cbeb3a8f0b09b9c0a230c1102c6ad357da6f7 |

以上四项均在本轮重新取得完整 SHA256。发布前仍需对最终批准素材建立独立 manifest。

## 8. 当前联系与业务入口

- 电话：+86 159 5487 0827 / 15954870827
- WhatsApp：https://wa.me/8615954870827
- 公开页面包含微信与 WhatsApp 联系二维码。
- V5.9 素材包还包含支付宝、微信支付、微信支持、WhatsApp 支持二维码；它们不是本快照所证明的线上路由，正式发布前需再次按 QR_VALIDATION.md 验证使用场景。

## 9. 当前 SEO 与索引状态

- /robots.txt 返回 200。
- 通用搜索抓取允许；Cloudflare Managed Content Signals 标记 search=yes、ai-train=no、use=reference。
- robots.txt 对 Amazonbot、Applebot-Extended、Bytespider、CCBot、ClaudeBot、CloudflareBrowserRenderingCrawler、Google-Extended、GPTBot、meta-externalagent 等单独禁止。
- /sitemap.xml 当前返回 404。
- /guide 标题仍写 MAIXON DTF TOOL Professional V5.3.2。
- 页面资源大量保留 5.3.2 查询版本；品牌、版本和 SEO 叙事不一致。
- 新站需要每语言独立 canonical、hreflang、title、description、Open Graph 与 XML sitemap；旧 URL 必须有明确迁移策略。

## 10. 双语现状

- V5.9 产品事实确认软件界面实际支持中文和英文。
- 现有完整素材包主要为中文界面，仅有 purchase_ai_points_dark_en_v59.png 明确为英文界面。
- 当前素材不足以证明网站切换为英文后，首页、DTF、DTG、Sublimation、MAIXON AI、账户、使用说明中的软件界面媒体都能同步切换为英文。
- 新站必须执行强约束：中文页面只展示中文软件 UI；英文页面只展示英文软件 UI。缺少对应语言媒体时应隐藏或标记待补，不能用另一语言界面冒充完成。
- 详细结论见 BILINGUAL_MEDIA_AUDIT.md。

## 11. 回滚与发布 Gate

发布前必须全部完成：

1. 由 Cloudflare 账户所有者补齐 Project Name、Production Deployment ID、pages.dev 地址和至少一个可回滚 Deployment ID。
2. 保存当前生产部署的 Cloudflare 控制台截图或导出记录。
3. 重新抓取本文件全部公开 Route，并与本快照比较。
4. 对安装包重新核对 Content-Length、ETag、SHA256 与 version.json。
5. 对 Legacy URL Inventory 中每条 clean URL 和 .html URL 运行自动化重定向测试。
6. 验证中英文 canonical、hreflang、sitemap 与语言内软件媒体一致性。
7. 先部署 Preview，不把 website-v59-redesign 直接设为 production。
8. 获得明确上线批准后才允许切换生产。

本快照能识别公开内容是否变化，但不能替代 Cloudflare Deployment ID。控制台回滚信息未补齐前，不具备生产发布条件。
