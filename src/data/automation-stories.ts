import type { Locale } from "./media";

export type AutomationStoryId = "dtf" | "dtg" | "sublimation";

export type AutomationStoryContent = {
  label: string;
  titleSegments: string[];
  description: string;
  claimSegments: string[];
  steps: string[];
  parameters?: string[];
  details?: Array<{
    label: string;
    title: string;
    items: string[];
    claimSegments: string[];
  }>;
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  comparison?: Array<{
    label: string;
    titleSegments: string[];
    body: string;
    emphasis?: boolean;
  }>;
};

export const automationStories: Record<Locale, Record<AutomationStoryId, AutomationStoryContent>> = {
  "zh-CN": {
    dtf: {
      label: "DTF · 一键自动化",
      titleSegments: ["所有功能，", "全部一键搞定。"],
      description: "从确定尺寸、外扩画布到建立 W1 专色通道并导出，把原本反复切换的 Photoshop 操作收成一次确认。",
      claimSegments: ["你甚至还没眨眼，", "就已经做好了。"],
      steps: ["设置尺寸", "外扩画布", "确认分辨率", "收缩像素", "建立 W1 通道", "命名并导出"],
      parameters: ["成品尺寸可自定义", "分辨率可自定义 · 300 PPI", "W1 收缩像素可自定义"],
      details: [
        {
          label: "DTF 01",
          title: "单图排版",
          items: ["单独调整尺寸与旋转方向", "每一边的扩边都可自由定义", "分辨率、排版长度与面积均可输入", "支持一米与一平方米排版", "按真实尺寸平均分配图像间距"],
          claimSegments: ["每张图排出来，", "都是这么完美。"]
        },
        {
          label: "DTF 02",
          title: "多图排版",
          items: ["读取文件夹内的 PSD、PNG 与 TIFF", "自动统计并确认待排文件数量", "自由选择是否允许图像穿插", "自由选择是否允许图像旋转", "批量完成排版并进入后续输出"],
          claimSegments: ["把魔法植入电脑里，", "让它自己动起来。"]
        }
      ]
    },
    dtg: {
      label: "DTG · 白墨自动作图",
      titleSegments: ["它比你想象中，", "还要更快。"],
      description: "自动识别 K 值区域与其他色彩区域，分别建立可调白墨量通道，再完成检查、命名与导出。",
      claimSegments: ["原本严格而漫长的作图过程，", "平均只需 2–3 秒。"],
      steps: ["导入并确认尺寸", "外扩画布 5 mm", "K 区白墨 0–10", "其他区域 0–100", "建立白墨通道", "检查并导出"],
      metrics: [
        { value: "2–3 s", label: "平均自动作图用时" },
        { value: "5% / 50%", label: "常用白墨量示例：K 值区域约 5%，其他区域约 50%；两组参数均可按工艺自由调整。" }
      ]
    },
    sublimation: {
      label: "热升华 · 智能排版",
      titleSegments: ["你冲杯咖啡的功夫，", "它可能已经排好了。"],
      description: "从 Illustrator 导出的初始 PDF 出发，识别裁片、保护布纹方向、比较三套方案并衔接打印输出。",
      claimSegments: ["少一点反复试排，", "多一点确定。"],
      steps: ["导入 PDF", "识别裁片", "设置间距与切割线", "布纹保护 0° / 180°", "比较三套方案", "EPS / TIFF 输出"],
      comparison: [
        {
          label: "人工排版",
          titleSegments: ["反复比较，", "还要防止裁片相碰。"],
          body: "裁片越多，人工比较越久；间距或方向出错，还可能影响激光裁切与整批打印。"
        },
        {
          label: "MAIXON",
          titleSegments: ["快速、均匀、最省料。", "三套方案，直接选。"],
          body: "支持快速查看图像与 PDF、导出 EPS，或一键进入 Photoshop 输出 TIFF。长任务独立运行，其他功能仍可继续使用。",
          emphasis: true
        }
      ]
    }
  },
  en: {
    dtf: {
      label: "DTF · ONE-CLICK AUTOMATION",
      titleSegments: ["Every step.", "One click."],
      description: "From sizing and canvas expansion to the W1 spot channel and final export, MAIXON turns a long Photoshop routine into one confirmed action.",
      claimSegments: ["Done before", "you even blink."],
      steps: ["Set size", "Expand canvas", "Set resolution", "Contract pixels", "Build W1 channel", "Name & export"],
      parameters: ["Custom output size", "Custom resolution · 300 PPI", "Custom W1 contraction"],
      details: [
        {
          label: "DTF 01",
          title: "Single-image layout",
          items: ["Adjust size and rotation per artwork", "Define bleed independently on every edge", "Enter resolution, layout length, or area", "Supports one-meter and one-square-meter layouts", "Distributes spacing from real dimensions"],
          claimSegments: ["Every image lands", "exactly where it should."]
        },
        {
          label: "DTF 02",
          title: "Multi-image layout",
          items: ["Reads PSD, PNG, and TIFF files from a folder", "Counts and confirms every layout-ready file", "Choose whether interlocking is allowed", "Choose whether rotation is allowed", "Completes the batch and moves to output"],
          claimSegments: ["Put the magic inside.", "Let the computer move."]
        }
      ]
    },
    dtg: {
      label: "DTG · WHITE-INK AUTOMATION",
      titleSegments: ["Faster than", "you imagined."],
      description: "MAIXON separates K-value and non-K regions, builds independently adjustable white-ink channels, then checks, names, and exports the result.",
      claimSegments: ["A demanding manual routine,", "completed in 2–3 seconds on average."],
      steps: ["Import & size", "Expand 5 mm", "K white 0–10", "Other areas 0–100", "Build channels", "Check & export"],
      metrics: [
        { value: "2–3 s", label: "Average automated preparation time" },
        { value: "5% / 50%", label: "Typical white-ink example: about 5% in K regions and 50% elsewhere. Both values remain fully adjustable for each process." }
      ]
    },
    sublimation: {
      label: "SUBLIMATION · INTELLIGENT NESTING",
      titleSegments: ["Make a coffee.", "The layout may be done."],
      description: "Start with a PDF from Illustrator. MAIXON recognizes panels, protects grain direction, compares three layout strategies, and prepares production output.",
      claimSegments: ["Less trial and error.", "More certainty."],
      steps: ["Import PDF", "Detect panels", "Spacing & cut lines", "Grain-safe 0° / 180°", "Compare 3 plans", "EPS / TIFF output"],
      comparison: [
        {
          label: "MANUAL",
          titleSegments: ["Repeated manual trials,", "with collision risk."],
          body: "More panels mean more comparisons. A spacing or direction error can compromise cutting and the entire print run."
        },
        {
          label: "MAIXON",
          titleSegments: ["Quick, Balanced, Best.", "Compare, then choose."],
          body: "Preview images and PDFs, export EPS, or open Photoshop for TIFF output. Long jobs run independently so the rest of the software stays available.",
          emphasis: true
        }
      ]
    }
  }
};
