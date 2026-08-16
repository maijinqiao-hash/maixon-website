# MAIXON Legacy URL Inventory

状态：DESIGN / REDIRECT PLAN  
基线日期：2026-08-17  
原则：继承 URL 历史和产品事实，不继承旧页面实现。任何旧 URL 都不得无计划变成 404。

## 1. 状态定义

| 状态 | 含义 |
|---|---|
| KEEP | 保留当前公开路径，但用全新 Astro 页面实现 |
| MIGRATE | 内容迁入新的信息架构，旧 URL 保留为兼容入口或重定向入口 |
| 301 | 旧 URL 永久重定向到明确的新 URL |
| REVIEW | 目标受双语 URL 策略影响，设计确认后锁定 |

## 2. 双语 URL 建议

推荐生成独立静态语言路由：

- 中文：/zh-CN/...
- 英文：/en/...
- 根路径 /：保留为极轻量语言入口或默认中文入口，不在客户端动态替换整页 SEO 文案。

原因：

- 每种语言可以生成独立静态 HTML、title、description、canonical 和 Open Graph。
- 搜索引擎可以通过 hreflang 明确识别中文与英文页面。
- 软件截图和视频可以按 locale 构建期绑定，避免切换语言后仍出现另一种语言的应用界面。
- 不需要 SSR、SPA 或复杂客户端状态。

待确认项：最终决定附件在“宁可素材暂缺，”之后被截断，因此本文件不把 /zh-CN 与 /en 路径直接写进代码。正式实现前需要用户确认被截断部分是否包含另一套 URL 规则。

## 3. 旧 URL 决策矩阵

表中的 {locale} 代表 zh-CN 或 en。对没有语言前缀的历史 URL，建议 301 到中文默认目标；语言切换链接直接进入对应英文目标。

| 旧 URL | 当前状态 | 决策 | 新目标建议 | 迁移内容 |
|---|---:|---|---|---|
| / | 200 | KEEP / REVIEW | / 或 /zh-CN/ | 新首页：Software → Hardware → Support |
| /index.html | 公开链接存在 | 301 | / | 消除重复首页 |
| /printer | 200 | MIGRATE | /{locale}/hardware/printers/ | 打印机总览、型号比较、真实设备入口 |
| /oven | 200 | MIGRATE | /{locale}/hardware/oven604/ | OVEN604 独立产品页 |
| /printhead | 200 | MIGRATE | /{locale}/hardware/printheads/wf7610/ | 喷头与质保事实 |
| /manuals | 200 | MIGRATE | /{locale}/support/manuals/ | 使用说明中心 |
| /guide | 200 | MIGRATE | /{locale}/support/software-guide/ | MAIXON TOOL V5.9 软件说明 |
| /equipment-manual | 200 | MIGRATE | /{locale}/support/equipment-manual/ | 设备说明 |
| /dtf604 | 200 | MIGRATE | /{locale}/hardware/printers/dtf604/ | DTF604 独立产品页 |
| /dtg604 | 200 | MIGRATE | /{locale}/hardware/printers/dtg604/ | DTG604 独立产品页 |
| /dtf608 | 200 | MIGRATE | /{locale}/hardware/printers/dtf608/ | DTF608 独立产品页 |

说明：MIGRATE 不等于立即删除旧路径。上线时可以让旧路径直接 301 到中文目标，也可以先用同路径新页面维持一段过渡期。最终方案以 SEO 迁移测试和双语 URL 确认为准。

## 4. .html 兼容入口

当前 Cloudflare 将以下 URL 以 307 跳转到 clean URL。新站上线后建议改成稳定的单跳 301，不要形成 .html → clean URL → locale URL 的两段跳转。

| 旧 URL | 当前行为 | 建议最终目标 |
|---|---|---|
| /printer.html | 307 → /printer | 301 → /zh-CN/hardware/printers/ |
| /oven.html | 307 → /oven | 301 → /zh-CN/hardware/oven604/ |
| /printhead.html | 307 → /printhead | 301 → /zh-CN/hardware/printheads/wf7610/ |
| /manuals.html | 307 → /manuals | 301 → /zh-CN/support/manuals/ |
| /guide.html | 307 → /guide | 301 → /zh-CN/support/software-guide/ |
| /equipment-manual.html | 307 → /equipment-manual | 301 → /zh-CN/support/equipment-manual/ |
| /dtf604.html | 307 → /dtf604 | 301 → /zh-CN/hardware/printers/dtf604/ |
| /dtg604.html | 307 → /dtg604 | 301 → /zh-CN/hardware/printers/dtg604/ |
| /dtf608.html | 307 → /dtf608 | 301 → /zh-CN/hardware/printers/dtf608/ |

version.json 当前仍直接引用多个 .html URL。重定向切换前必须同步更新 version.json，避免安装程序或客户端长期经过兼容跳转。

## 5. 新信息架构建议

建议的核心静态路由：

- /{locale}/
- /{locale}/software/
- /{locale}/software/dtf/
- /{locale}/software/dtg/
- /{locale}/software/sublimation/
- /{locale}/ai/
- /{locale}/download/
- /{locale}/hardware/
- /{locale}/hardware/printers/
- /{locale}/hardware/printers/dtf604/
- /{locale}/hardware/printers/dtg604/
- /{locale}/hardware/printers/dtf608/
- /{locale}/hardware/oven604/
- /{locale}/hardware/printheads/wf7610/
- /{locale}/support/
- /{locale}/support/software-guide/
- /{locale}/support/manuals/
- /{locale}/support/equipment-manual/
- /{locale}/support/contact/

首页导航仍保持极简：Software、Hardware、AI、Download、Support。详细模块页可以存在，但不把它们全部塞进主导航。

## 6. 重定向规则

- 永久迁移使用 301。
- 每个旧 URL 只允许一次跳转到最终 URL。
- 保留可安全保留的 query string。
- 对旧页面片段链接建立 fragment 对照；没有等价锚点时跳到最接近的页面顶部，避免空锚点。
- 不按浏览器语言静默把已选择语言的 URL 重定向到另一语言。
- 语言切换必须指向同一内容实体的另一语言 URL；如果翻译页未完成，保持当前语言并显示明确状态，不跳到无关页面。
- 所有目标 URL 必须返回 200，不能软 404。
- 旧 URL 页面不得继续输出旧 V5.0 / V5.3.2 canonical。

## 7. SEO 迁移要求

- 中文与英文页面各自具有唯一 title、description、canonical。
- 每组中英文页面互相输出 hreflang=zh-CN、hreflang=en 和 x-default。
- 建立 sitemap.xml，并只收录最终 200 URL。
- robots.txt 继续允许正常搜索索引；AI 训练信号是否沿用现状需单独确认。
- 为首页、软件、AI、下载、硬件产品与支持页建立独立 Open Graph 数据。
- 下载页中的版本、文件大小和 SHA256 从单一数据源生成，避免与 version.json 漂移。
- 上线前抓取旧 URL 在搜索引擎中的已知标题和反向链接；本轮只记录公开站点内链，未调用付费 SEO 数据源。

## 8. 上线前自动化验收

对清单中的每一个旧 URL 验证：

1. HTTP 状态符合预期。
2. 最多一次跳转。
3. 最终 URL 为 HTTPS。
4. 最终页面返回 200。
5. canonical 等于最终 URL。
6. 中英文 hreflang 成对。
7. 语言切换落到同一产品/说明实体。
8. 页面内安装包链接仍指向已核实的阿里云 OSS 文件。
9. 不出现 MAIXON DTF TOOL V5.0 或 Professional V5.3.2 的旧品牌标题。
10. 不加载旧 CSS、旧 JavaScript 或 v=5.3.2-20260720b 资源。

## 9. 当前结论

- 现有 URL 有真实 SEO 和客户端兼容价值，必须继承。
- 现有页面代码和视觉没有迁移价值。
- 最低风险方案是 Astro 生成全新页面，同时用明确的静态 301 规则维护全部历史入口。
- 在双语 URL 规则和附件截断内容确认前，本清单保持 DESIGN / REDIRECT PLAN，不进入实施。
