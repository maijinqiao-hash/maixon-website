# MAIXON V5.9 官网动效审计

核验日期：2026-08-17  
范围：新 Astro 官网的 CSS 交互与可访问性；产品工作流视频不作为装饰性 UI 动画审查。

| Before | After | Why |
|---|---|---|
| reduced-motion 对所有元素统一设置 `0.01ms` | 只移除滚动、按压位移、菜单图标与 hover 位移，保留 160ms 颜色反馈 | 减少前庭运动，同时保留帮助理解的非位移反馈 |

## Verdict

Approve。现有运动只服务于按压反馈、菜单状态与颜色反馈；没有滚动飞入、视差、持续漂浮、`transition: all`、`scale(0)`、`ease-in`、布局属性动画或未限制的 hover 位移。按钮按压采用 `transform: scale(0.97)` 与 140ms 强 ease-out，移动端菜单采用 180ms transform，并提供 reduced-motion、reduced-transparency 与 higher-contrast 处理。

不引入 Motion、Sonner 或 UI 组件库：当前站没有 spring、布局动画、exit animation、toast、dialog、popover 或复杂客户端状态需求。`prototype` 不启用，因为用户已确认 Precision Studio 单一方向，本阶段不重新分叉设计。
