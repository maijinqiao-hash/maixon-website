# MAIXON V5.9 官网素材更新映射

## 审计基线

- 原始素材包：`/Users/maijinqiao/Desktop/官网素材更新包.zip`
- 原始素材包 SHA-256：`aa8107dcb5ca643def482910a58a13d44a21a28a12bf054e9ccf19446a84c46d`（已核对一致）
- 加速派生包 SHA-256：`2d8f58138513655ad29d9ec4ce719e8d65435b162f50975ada7391d24075916c`
- 只读 staging：`/tmp/maixon-media-update.HbKHTw/original`
- 当前实施分支：`website-v59-redesign`
- 新包媒体语言：仅 `zh-CN`
- 发布 Gate：凡含 Metallica、Rolling Stones 或疑似球队/球衣标识的画面，均保持 `rights_clearance: pending`，只允许本地预览。

## 逐项映射

| 原文件名 | 实际画面语义 | 目标媒体 ID | 页面 / 段落 | 展示形式 | locale | 重复情况 | 权利状态 | 是否使用与原因 |
|---|---|---|---|---|---|---|---|---|
| DTF/DTF界面可以被操作或修改的演示滑动视频。.mp4 | DTF 参数区滚动与可调参数概览；画面可见 300 PPI 参数 | `software-zh-runtime-update-dtf-parameter-tour` | DTF / 参数设置 | 切换后自动播放 | zh-CN | 否 | pending | 使用；用于说明参数能力，不把 Photoshop 截图描述成 300 PPI 证据 |
| DTF/单图制图演示视频。.mp4 | 单张图稿进入 DTF、设置尺寸并生成 Photoshop 结果 | `software-zh-runtime-update-dtf-single-artwork` | DTF / 单图制图 | 切换后自动播放 | zh-CN | 否 | pending | 使用；作为短流程步骤 |
| DTF/单图排版排成一行的演示使用。.mp4 | 单图按行重复排版并输出到 Photoshop | `software-zh-runtime-update-dtf-single-row-layout` | DTF / 按行排版 | 切换后自动播放 | zh-CN | 否 | pending | 使用；与单图制图区分为排版能力 |
| DTF/单图排版排成正好1米的演示视频.mp4 | 单图按一米长度自动排版并生成结果 | `software-zh-runtime-update-dtf-one-meter-layout` | DTF / 一米排版 | 切换后自动播放 | zh-CN | 否 | pending | 使用；作为长度约束排版步骤 |
| DTF/多图排版演示视频需要倍加快速。.mp4 | 多图批量排版完整原片，等待段较长（235.56 秒） | — | — | — | zh-CN | 与加速版同一流程 | pending | 不直接用于网页；由 59.33 秒加速无声派生版替代 |
| 视频加速版/DTF/DTF_多图排版演示_处理段加速无声版.mp4 | 保留参数选择、首次结果与最终输出，压缩等待/批处理段 | `software-zh-runtime-update-dtf-multi-layout` | DTF / 多图排版 | 进入可视区自动播放 | zh-CN | 原片派生 | pending | 使用；DTF 网页主视频，不采用 235.56 秒原片 |
| DTF/DTF原素材演示。.png | Photoshop 中的 DTF 彩色图稿，通道面板可见 CMYK/W1 | `software-zh-runtime-update-dtf-artwork-source` | DTF / 图稿准备 | 静态媒体选项 | zh-CN | 否 | pending | 使用；说明图稿准备与通道结构，不称实体成品 |
| DTF/DTF做好的通道演示。.png | Photoshop W1 白墨通道可视结果 | `software-zh-runtime-update-dtf-white-channel-output` | DTF / CMYK + W1 | 静态媒体选项 | zh-CN | 否 | pending | 使用；只说明白墨通道输出，不声称截图显示 300 PPI |
| DTG/DTG界面可以进行修改的DIF操作演示。.mp4 | DTG 参数与白墨区域控制滑块操作；按画面归为 DTG | `software-zh-runtime-update-dtg-parameter-controls` | DTG / 参数控制 | 进入可视区自动播放 | zh-CN | 否 | pending | 使用；公开文案不出现 DIF 或命名解释 |
| DTG/DTG生成好后没有显示通道的截图.png | Photoshop 中已生成图稿，W1 通道存在但未显示 | `software-zh-runtime-update-dtg-photoshop-color-state` | DTG / 处理前后 | 静态媒体选项 | zh-CN | 与 AI 同名文件完全重复 | pending | 使用为 canonical 资产；AI 重复副本不再存储 |
| DTG/DTG生成好后显示通道的截图。.png | Photoshop 中显示 W1 白墨通道后的结果 | `software-zh-runtime-update-dtg-photoshop-white-channel` | DTG / W1 通道 | 静态媒体选项 | zh-CN | 与 AI 同名文件完全重复 | pending | 使用为 canonical 资产；AI 重复副本不再存储 |
| DTG/从AI工作台做好的图进入的PS还没有通道。也就是原图素材。可以被当成原图素材使用。.png | AI 结果进入 Photoshop 后的彩色图稿状态 | — | DTG / 未来扩展 | — | zh-CN | 与“未显示通道”语义高度重合 | pending | 暂不使用；canonical 前后状态更清楚，避免同段重复画面 |
| DTG/原图素材。.png | 黑白图稿的处理前后拼图，分辨率较低 | — | — | — | zh-CN | 与 AI 对比视频叙事重合 | pending | 暂不使用；低分辨率且不如可交互对比视频清楚 |
| SUBLIMATION/SUB演示视频。.mp4 | 热升华识别、Quick/Balanced/Best 方案与输出完整原片（150.21 秒） | — | — | — | zh-CN | 与加速版同一流程 | pending | 不直接用于网页；由 54.69 秒加速无声派生版替代 |
| 视频加速版/SUBLIMATION/SUBLIMATION_演示_处理段加速无声版.mp4 | 依次保留 Quick、Balanced、Best 与最终排版结果 | `software-zh-runtime-update-sublimation-layout-workflow` | 热升华 / 智能排版 | 进入可视区自动播放 | zh-CN | 原片派生 | pending | 使用；保留三种方案依次出现和最终结果 |
| SUBLIMATION/热升华 原素材。.jpg | 球衣裁片原始设计集合，无软件 UI | `software-zh-runtime-update-sublimation-garment-pieces-source` | 热升华 / 输入图稿 | 静态媒体选项 | zh-CN | 否 | pending | 使用；登记为 artwork_source，不称实体布料或成衣 |
| SUBLIMATION/热升华已经完成的样子。.png | 软件生成的裁片排版结果，无软件 UI | `software-zh-runtime-update-sublimation-layout-output` | 热升华 / 排版输出 | 静态媒体选项 | zh-CN | 否 | pending | 使用；登记为 production_output，不称实体成品 |
| AI工作台 更新/原始截图.png | MAIXON AI 工作区、输入参数、300 PPI 字段与处理前图像 | `software-zh-runtime-update-ai-workspace-source` | MAIXON AI / 输入 | 静态媒体选项 | zh-CN | 否 | pending | 使用；保留真实 UI，不修改顶部/侧栏品牌差异 |
| AI工作台 更新/印花提取中.png | 印花提取任务执行中与进度状态 | `software-zh-runtime-update-ai-extraction-progress` | MAIXON AI / 处理中 | 静态媒体选项 | zh-CN | 否 | pending | 使用；组成操作链路 |
| AI工作台 更新/印花提取完成提示.png | AI 成品生成完成提示和输出路径 | `software-zh-runtime-update-ai-extraction-complete` | MAIXON AI / 完成 | 静态媒体选项 | zh-CN | 否 | pending | 使用；组成操作链路，不公开解释内部命名 |
| AI工作台 更新/用提取印花后提取好的图进行下一步AI处理，一键抠图。.png | 提取结果进入一键抠图并显示处理进度 | `software-zh-runtime-update-ai-background-removal-progress` | MAIXON AI / 一键抠图 | 静态媒体选项 | zh-CN | 否 | pending | 使用；说明下一步处理 |
| AI工作台 更新/印花提取完成之后，可以用生成好的结果一键连入DTF或者DTG。或者自动排版。.png | 结果页可继续 AI、进入 DTF/DTG 或自动排版 | `software-zh-runtime-update-ai-workflow-routing` | MAIXON AI / 工作流衔接 | 静态媒体选项 | zh-CN | 否 | pending | 使用；说明工作流入口，不披露内部状态 |
| AI工作台 更新/一键抠图之后完成的前后对比视频。.mp4 | 一键抠图前后滑块对比 | `software-zh-runtime-update-ai-background-removal-compare` | MAIXON AI / 抠图对比 | 切换后自动播放 | zh-CN | 否 | pending | 使用；短对比视频，保留进度条 |
| AI工作台 更新/提取后的前后对比视频.mp4 | 衣服照片与提取图稿之间的滑块对比 | `software-zh-runtime-update-ai-artwork-extraction-compare` | MAIXON AI / 印花提取 | 进入可视区自动播放 | zh-CN | 否 | pending | 使用；展示软件处理前后，不称实体生产照片 |
| AI工作台 更新/用生成好的图片进行下一步DTG的制作（视频。.mp4 | AI 结果一键进入 DTG、调用 Photoshop 并生成通道 | `software-zh-runtime-update-ai-continue-to-dtg` | MAIXON AI / 进入 DTG | 切换后自动播放 | zh-CN | 否 | pending | 使用；连接 AI 与 DTG，不重复存储同一通道截图 |
| AI工作台 更新/DTG生成好后没有显示通道的截图.png | 与 DTG 目录“未显示通道”图片逐字节相同 | `software-zh-runtime-update-dtg-photoshop-color-state` | DTG / 处理前后 | canonical 引用 | zh-CN | SHA-256 完全重复 | pending | 不另存；引用 DTG canonical 媒体 ID |
| AI工作台 更新/DTG生成好后显示通道的截图。.png | 与 DTG 目录“显示通道”图片逐字节相同 | `software-zh-runtime-update-dtg-photoshop-white-channel` | DTG / W1 通道 | canonical 引用 | zh-CN | SHA-256 完全重复 | pending | 不另存；引用 DTG canonical 媒体 ID |

## 不替换项

- `hardware-dtf604`、`hardware-dtg604`、`hardware-dtf608`、`hardware-oven604`、`hardware-wf7610`：本包没有硬件实拍，继续保持 `generated / provisional / replaceable`。
- `/en/`：优先使用现有英文媒体；没有对应英文录屏时，按 `media-locale-fallbacks.json` 的白名单引用中文真实录屏与其 poster，英文标题、按钮、说明和无障碍文本保持英文。
- 现有已批准媒体不会因“有新包”而被机械删除；未被新流程取代的首页概览、英文媒体与旧证明图继续保留。

## 画面事实与待确认

- Photoshop 通道画面能证明 CMYK/W1 结构，但不能单独证明 300 PPI；300 PPI 只引用 DTF/AI 软件界面中实际可见的参数。
- 软件顶部显示 `MAIXON`，部分左侧栏显示 `MAXON`。本地预览保留真实录屏，不重绘、不篡改，等待用户确认产品内品牌一致性。
- 本包不能证明实体打印膜、成衣、布料或硬件实拍；公开文案只描述软件流程、通道和软件输出。
