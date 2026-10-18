# 多语言交付说明

## 现状

- 说明书正文、菜单、按钮、提示、图注目前**只有中文**。
- 本次交付 **不放未经审校的机器翻译**，也不伪造外语软件界面截图。
- `zh.json` 是唯一完整源；`en/ja/ko/th/ms/id/vi.json` 为空的待译骨架（值为 `null`，`_meta.status = pending`）。
- `strings.csv` 可直接交给翻译或 CAT 工具，列：`key, section, tag, zh, en, ja, ko, th, ms, id, vi`。

## 使用方式

1. 以 `zh.json` 为基准翻译，保持 key 不变。
2. 回填对应语言 JSON（不要删除 key）。
3. 网站侧按 `lang` 加载对应 JSON，用 `data-i18n` 或构建时替换；章节锚点 `s0`–`s19` 不随语言变化。
4. 图片中的软件界面文字保持中文原图，不生成假的外语界面；外语页面只需翻译图注与正文。

## 术语参考

软件界面已有八语言词条，翻译时请沿用软件内用语，避免同一功能出现两种叫法：

| 中文 | English | 说明 |
|---|---|---|
| 白墨烫画 | White-Ink Transfer / DTF | 保持 DTF 缩写 |
| 白墨直喷 | White-Ink DTG | 保持 DTG 缩写 |
| 热升华 | Sublimation | |
| 半色调 | Halftone | |
| 白墨专色 | W1 spot channel | 通道名固定 W1 |
| 切割框 | Cut Line | |
| 排版 | Layout | |
| 图稿 | Artwork | |
| 积分 | Points | |
| 授权 | License | |

## 注意

- 价格、试用、积分等数字不要写死在翻译里，统一取软件/官网实时值。
- 翻译完成后请由熟悉印花工艺的人复核一遍，特别是“扩边 / 收缩 / 套位 / 分卷”等术语。
