# MAIXON V5.9 最终架构与视觉方向对齐

状态：DESIGN CONFIRMED / LOCAL ASTRO IMPLEMENTATION IN PROGRESS  
日期：2026-08-17  
范围：把最终重构决定、既有 Precision Studio 方向、双语要求、素材现状和动效规范统一为实施前 Gate。本文不包含源码实现。

## 1. 已锁定的产品定义

- 正式品牌：MAIXON TOOL。
- 品牌描述：MAIXON · PRINT PRODUCTION SUITE · PROFESSIONAL V5.9。
- 商业优先级：软件第一、硬件第二、支持第三。
- 软件体系：DTF、DTG、Sublimation、MAIXON AI。
- 旧站仅是 Legacy Reference：继承产品事实、硬件参数、公开 URL、SEO 历史、下载和联系信息。
- 不继承旧 HTML、旧 CSS、旧 JavaScript、旧深蓝紫渐变、旧六宫格、CSS 模拟软件 UI、旧 V5.0/V5.3.2 品牌和旧机器页模板。

## 2. 已锁定的技术方向

- Astro。
- Static Output。
- Cloudflare Pages。
- 阿里云 OSS 独立提供 Windows 安装包。
- 不启用 SSR。
- 不默认引入 React。
- 不做 SPA。
- 不建立复杂客户端状态。
- 能用 Astro、HTML、CSS 完成的，不引入额外前端框架。
- 客户端 JavaScript 尽可能少。
- 最终输出高性能静态 HTML。

这不是旧 HTML 转 Astro，而是全新信息结构、全新页面组件和全新视觉系统。

## 3. Precision Studio 方向的最终调整

保留：

- 精密、克制、可信的专业生产工具气质。
- 大比例真实软件媒体。
- 清晰层级、严谨网格、充足留白。
- 工业设备与软件输出的真实证据。
- 视觉服务于理解，而不是堆功能卡片。

调整：

- 官网整体以明亮、中性、精密的工作室气质为主，不回到旧站全局深色蓝紫。
- 深石墨背景只作为 Sublimation 等关键节奏段落的局部舞台。
- 首页不再使用六宫格、密集 Feature Cards、假数字、假客户 Logo 或十几个图标。
- 软件画面必须来自最终 V5.9，不重绘、不用 CSS 模拟。
- 硬件视觉从“统一模板抠图”改为每台机器独立摄影叙事。
- 装饰层降低，让真实导入、处理、输出、AI Before/After 和实际设备承担品牌记忆。

目标感受：精确、可信、安静、有控制力。不是炫技，不是游戏化，也不是传统工业设备目录。

## 4. 首页信息架构

### Header

- 品牌：MAIXON。
- 一级导航：Software、Hardware、AI、Download、Support。
- 中文对应文案。
- 语言入口：中 / EN。
- 主 CTA：下载 V5.9。
- 不扩展为十几个一级菜单。

### Hero

- 主角：MAIXON TOOL V5.9。
- 真实最终版软件媒体优先。
- 极少文字，一个清晰产品定位。
- 主 CTA：下载 V5.9。
- 次 CTA：观看实际工作流程。

### DTF

- 真实流程：导入 → 参数 → 处理 → 输出。
- 视频承担主要说明，文字只回答“是什么、解决什么问题”。
- 当前素材只有中文锁定/试用界面，不能视为最终生产演示。

### DTG

- 真实流程必须展示 K 值、白墨量、整体白墨量、处理结果和 TIFF 输出。
- 中文与英文分别录制。

### Sublimation

- 首页视觉高潮之一。
- 流程：导入 PDF → 识别裁片 → Quick / Balanced / Best → 选择方案 → 导出。
- 允许局部深石墨背景。
- 不把深色延伸到整个官网。

### MAIXON AI

- 展示真实输入、处理、Before/After、结果和一键制作 DTF/DTG。
- 不公开 AI Provider、Model Name、第三方 API 或内部算法。
- 无语言文字的真实结果图可跨语言复用；应用框架截图必须跟随语言。

### Download

- MAIXON TOOL V5.9。
- Windows 10/11。
- 显示版本、文件大小，必要时显示 SHA256。
- 下载按钮直达已核实的阿里云 OSS 安装包。

### Hardware

- 软件之后进入 MAIXON Hardware。
- 设备：DTF604、DTG604、DTF608、OVEN604、Printer、Printhead 和真实产品体系。
- 每个机型独立身份；素材不达标时标记缺失，不生成假机器图。

### Support

- Support、Guide、Contact、获取授权。
- 中文优先微信，英文优先 WhatsApp；最终入口需按真实业务流程核实。

### Footer

- 极简。
- 只保留品牌、必要导航、联系、版权与法律信息。

## 5. 双语体验契约

- 中文页面的网页文案和软件画面全部为中文。
- 英文页面的网页文案和软件画面全部为英文。
- 语言切换进入同一内容实体的另一语言静态 URL。
- 不只替换导航文字，不在英文页继续展示中文按钮和菜单。
- /zh-CN 与 /en 各自拥有完整静态 HTML、title、description、canonical、hreflang 和 Open Graph。
- 缺少对应语言软件媒体时隐藏或延后该媒体，不以另一语言替代。
- 当前素材只证明软件支持中英文，尚未提供完整成对媒体；详见 BILINGUAL_MEDIA_AUDIT.md。

## 6. 动效策略

### 主要动效来源

主要“Explanation”动效是最终 V5.9 的真实操作视频：

- 真实点击。
- 真实处理。
- 真实结果。
- 真实导出。

网站 UI 本身保持克制，避免装饰运动抢走软件演示。

### 可以进入后续原型的候选

| 场景 | 目的 | 频率 | 后续实现边界 |
|---|---|---|---|
| CTA 按压反馈 | Feedback | 每次访问少量 | CSS transform，100–160ms；触摸即时反馈 |
| AI Before/After 拖动比较 | Direct manipulation / State indication | 偶尔 | clip-path + Pointer Events，1:1 跟随；必须支持键盘替代 |
| 软件流程步骤切换 | Explanation / Spatial consistency | 偶尔 | 仅在真实媒体就绪后设计；不让文字和结果为装饰而移动 |
| 硬件局部放大 | Explanation | 偶尔 | 真实照片局部；不生成虚构结构 |

### 明确拒绝

- 拒绝所有 Section 统一滚动飞入：重复、模板化，削弱真实媒体。
- 拒绝全屏视差和持续漂浮：干扰阅读，并增加 reduced-motion 风险。
- 拒绝鼠标追踪 3D 倾斜：对专业工业产品没有功能价值。
- 拒绝语言切换动画：静态路由切换应直接、可预测。
- 拒绝给核心导航加入慢速过渡：高频使用不应等待。
- 拒绝仅为“高级感”使用弹跳和长时间 Spring。

### 未来实现硬规则

- 简单 hover、press、color 使用 CSS transition。
- 进入/退出优先 ease-out；屏幕内移动才使用 ease-in-out；不使用 ease-in。
- UI 动效通常低于 300ms。
- 只动画 transform 和 opacity；必要的比较揭示可用 clip-path。
- hover 仅在 hover:hover 且 pointer:fine 时启用。
- 每一项动效同时提供 prefers-reduced-motion 版本。
- 进入和退出保持同一路径。
- 只有真正需要弹簧、布局动画、退出动画或手势驱动值时才考虑 Motion；当前不安装。

## 7. UI 库决定

当前结论：不选择、不安装 UI 库。

理由：

- 新站是静态产品官网，不是复杂应用。
- Header、静态路由语言链接、下载 CTA、内容 Section 和 Footer 均可由 Astro/HTML/CSS 完成。
- 目前没有 toast、命令面板、复杂弹窗、拖拽列表或客户端状态需求。

未来条件触发：

- 如果出现真正的无障碍 dialog、popover、menu 或 select，优先评估 Base UI。
- 如果出现真实 toast 需求且项目已明确引入 React 岛，再评估 Sonner；当前不为“可能有通知”引入 React。
- 如果出现手势驱动、可中断动画，再评估 Motion；简单淡入和按压不需要它。
- 不为了展示技术栈而引入 shadcn、React 或整套客户端组件系统。

## 8. 原型 Gate

如果下一阶段需要比较视觉方向：

- 只在隔离的 prototype 路由或独立静态页面工作。
- 不修改生产页面。
- 默认建立 3 个真正不同的方向，不做三个换色版本。
- 每个方向使用真实产品文案和真实可用素材。
- 选择器切换即时，不加动画。
- 完成后展示、说明真实取舍并停止，等待用户选择。
- 用户选定前不把任何原型合入正式页面。

当前附件已经给出单一明确产品方向，因此不主动制造多方案；只有用户明确要求比较具体组件或页面时才启用 prototype。

## 9. 当前待办与发布阻断项

- Cloudflare Pages Project Name、Production Deployment ID、pages.dev 地址和可回滚 Deployment ID 尚未从控制台取得。
- 中文 DTF、Sublimation、AI 视频与真实输出证据已接入；英文工作流视频仍缺失。
- 英文首页、DTF、Sublimation 与 AI 截图已接入；英文 DTG UI 媒体仍缺失，当前只用语言中性真实输出。
- 硬件真实多角度摄影和生产场景缺失。
- 两个 Windows Codex 增量素材包已接收并校验；当前生成/旧站硬件图仅作 `provisional / replaceable media`。

## 10. 设计确认结论

- 架构：Astro 纯静态，确认。
- 产品主叙事：软件 → 硬件 → 支持，确认。
- 视觉：Precision Studio 调整为明亮精密、真实媒体主导，确认建议。
- 双语：静态路由 + 同语言软件媒体，作为强制 Gate。
- 动效：真实流程为主，网站动效克制；默认 CSS、默认无 Motion。
- UI 库：当前不引入。
- 硬件：真实摄影优先，素材不足则阻断视觉定稿。

用户已确认继续 Astro 本地实现。当前允许创建并验证新 Astro 静态站，但仍不修改旧站已跟踪源码、不部署生产；最终摄影可通过 Media Manifest 替换。
