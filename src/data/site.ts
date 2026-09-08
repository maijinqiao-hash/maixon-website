import type { Locale } from "./media";
import { windows1011Installer } from "./downloads";

export const installer = {
  version: windows1011Installer.version,
  displayVersion: "V6.3",
  os: "Windows 10/11",
  size: "72.0 MB",
  sha256: windows1011Installer.sha256,
  url: windows1011Installer.downloadUrl
};

export const localePath = (locale: Locale) => `/${locale}/`;

export const nav = {
  "zh-CN": [
    { label: "软件", href: "#software" },
    { label: "硬件", href: "#hardware" },
    { label: "AI", href: "#ai" },
    { label: "下载", href: "#download" },
    { label: "支持", href: "#support" }
  ],
  en: [
    { label: "Software", href: "#software" },
    { label: "Hardware", href: "#hardware" },
    { label: "AI", href: "#ai" },
    { label: "Download", href: "#download" },
    { label: "Support", href: "#support" }
  ]
} satisfies Record<Locale, Array<{ label: string; href: string }>>;

export type WorkflowContent = {
  id: "dtf" | "dtg" | "sublimation" | "ai-workbench" | "ai-results" | "ai-production";
  number: string;
  title: string;
  titleSegments?: string[];
  eyebrow: string;
  description: string;
  steps: string[];
  mediaId: string;
  videoId?: string;
  posterId?: string;
  proofId?: string;
  mediaChoices?: MediaChoiceContent[];
  tone: "light" | "graphite";
};

export type MediaChoiceContent = {
  label: string;
  caption: string;
  mediaId: string;
  posterId?: string;
};

export type SiteCopy = {
  meta: {
    title: string;
    description: string;
  };
  header: {
    download: string;
    menu: string;
  };
  hero: {
    title: string;
    lead: string;
    descriptor: string;
    primary: string;
    secondary: string;
    mediaId: string;
    videoId?: string;
    posterId?: string;
  };
  softwareIntro: {
    label: string;
    title: string;
    titleSegments?: string[];
    body: string;
  };
  workflows: WorkflowContent[];
  hardware: {
    label: string;
    title: string;
    titleSegments?: string[];
    body: string;
    products: Array<{
      name: string;
      type: string;
      description: string;
      mediaId: string;
      href: string;
    }>;
  };
  download: {
    label: string;
    title: string;
    body: string;
    button: string;
    integrity: string;
  };
  support: {
    label: string;
    title: string;
    titleSegments?: string[];
    body: string;
    guide: string;
    contact: string;
    authorization: string;
  };
  footer: {
    statement: string;
    legal: string;
  };
};

export const copy: Record<Locale, SiteCopy> = {
  "zh-CN": {
    meta: {
      title: "MAIXON TOOL V6.3｜印花生产套件",
      description: "面向 DTF、DTG 与热升华生产的 MAIXON TOOL V6.3，覆盖核心生产工作流程、MAIXON AI、软件下载与硬件设备。"
    },
    header: {
      download: "下载 V6.3",
      menu: "打开导航"
    },
    hero: {
      title: "MAIXON TOOL",
      lead: "从图稿到可生产文件。",
      descriptor: "PRINT PRODUCTION SUITE · PROFESSIONAL V6.3",
      primary: "下载 V6.3",
      secondary: "查看产品演示",
      mediaId: "software-zh-home-overview",
      videoId: "software-zh-videos-demo-overall-zh-v59",
      posterId: "software-zh-posters-poster-overall-zh-v59"
    },
    softwareIntro: {
      label: "软件",
      title: "一套工具，连接完整印花生产流程。",
      titleSegments: ["一套工具，", "连接完整", "印花生产流程。"],
      body: "覆盖图稿导入、生产参数设置、智能处理与文件输出，让 DTF、DTG、热升华和 AI 工作流程顺畅衔接。"
    },
    workflows: [
      {
        id: "dtf",
        number: "01",
        title: "DTF 白墨烫画",
        titleSegments: ["DTF ", "白墨烫画"],
        eyebrow: "从单图到 CMYK + W1",
        description: "设置尺寸、300 PPI、W1 收缩和排版间距，完成单图或多图排版并检查 Photoshop 通道输出。",
        steps: ["选择图稿", "设置 300 PPI 与 W1", "单图或多图排版", "检查 CMYK / W1"],
        mediaId: "software-zh-runtime-update-dtf-multi-layout",
        mediaChoices: [
          {
            label: "多图排版",
            caption: "在一个任务中设置排版宽度、间距与 W1 参数，并查看 Photoshop 排版结果。",
            mediaId: "software-zh-runtime-update-dtf-multi-layout",
            posterId: "software-zh-runtime-update-posters-dtf-multi-layout"
          },
          {
            label: "参数设置",
            caption: "查看尺寸、300 PPI、W1 收缩与扩边等可调参数。",
            mediaId: "software-zh-runtime-update-dtf-parameter-tour",
            posterId: "software-zh-runtime-update-posters-dtf-parameter-tour"
          },
          {
            label: "单图制图",
            caption: "从单张图稿设置尺寸并生成对应的 Photoshop 文件。",
            mediaId: "software-zh-runtime-update-dtf-single-artwork",
            posterId: "software-zh-runtime-update-posters-dtf-single-artwork"
          },
          {
            label: "按行排版",
            caption: "将单张图稿按行重复排列，检查版面后继续输出。",
            mediaId: "software-zh-runtime-update-dtf-single-row-layout",
            posterId: "software-zh-runtime-update-posters-dtf-single-row-layout"
          },
          {
            label: "一米排版",
            caption: "按一米长度约束自动计算重复数量和版面。",
            mediaId: "software-zh-runtime-update-dtf-one-meter-layout",
            posterId: "software-zh-runtime-update-posters-dtf-one-meter-layout"
          },
          {
            label: "彩色图稿",
            caption: "在 Photoshop 中检查彩色图稿与通道结构。",
            mediaId: "software-zh-runtime-update-dtf-artwork-source"
          },
          {
            label: "W1 通道",
            caption: "查看白墨专色通道的输出状态。",
            mediaId: "software-zh-runtime-update-dtf-white-channel-output"
          }
        ],
        tone: "light"
      },
      {
        id: "dtg",
        number: "02",
        title: "DTG 白墨直喷",
        titleSegments: ["DTG ", "白墨直喷"],
        eyebrow: "控制深色与浅色面料",
        description: "按面料设置普通区域白墨、K 黑区域白墨、收缩与扩边，生成带 W1 通道的生产 TIFF。",
        steps: ["选择面料", "调整白墨量", "处理去黑/抠白", "导出 TIFF"],
        mediaId: "software-zh-runtime-update-dtg-parameter-controls",
        mediaChoices: [
          {
            label: "白墨参数",
            caption: "按面料调整普通区域与 K 黑区域的白墨密度。",
            mediaId: "software-zh-runtime-update-dtg-parameter-controls",
            posterId: "software-zh-runtime-update-posters-dtg-parameter-controls"
          },
          {
            label: "CMYK 状态",
            caption: "在 Photoshop 中检查彩色通道与 W1 通道结构。",
            mediaId: "software-zh-runtime-update-dtg-photoshop-color-state"
          },
          {
            label: "W1 通道",
            caption: "切换到 W1 通道，检查白墨层的覆盖范围。",
            mediaId: "software-zh-runtime-update-dtg-photoshop-white-channel"
          }
        ],
        tone: "light"
      },
      {
        id: "sublimation",
        number: "03",
        title: "热升华智能排版",
        titleSegments: ["热升华", "智能排版"],
        eyebrow: "把材料利用率变成可比较的方案",
        description: "识别裁片，生成 Quick、Balanced 与 Best 三种排版方案，再选择、分卷并导出 PDF 或 TIFF。",
        steps: ["导入 PDF", "识别裁片", "比较三种方案", "选择并导出"],
        mediaId: "software-zh-runtime-update-sublimation-layout-workflow",
        mediaChoices: [
          {
            label: "方案对比",
            caption: "依次生成 Quick、Balanced 与 Best，并查看最终排版结果。",
            mediaId: "software-zh-runtime-update-sublimation-layout-workflow",
            posterId: "software-zh-runtime-update-posters-sublimation-layout-workflow"
          },
          {
            label: "输入裁片",
            caption: "查看进入排版流程的球衣裁片图稿。",
            mediaId: "software-zh-runtime-update-sublimation-garment-pieces-source"
          },
          {
            label: "排版输出",
            caption: "查看软件生成的裁片版面并检查各部位的排列结果。",
            mediaId: "software-zh-runtime-update-sublimation-layout-output"
          }
        ],
        tone: "graphite"
      },
      {
        id: "ai-workbench",
        number: "AI 01",
        title: "MAIXON AI",
        eyebrow: "从导入到获得结果",
        description: "在工作台中导入图像、选择处理能力并执行任务，在同一界面查看进度与完成结果。",
        steps: ["导入图像", "选择处理能力", "开始执行", "查看结果"],
        mediaId: "software-zh-runtime-update-ai-workspace-source",
        mediaChoices: [
          {
            label: "工作台",
            caption: "导入图像，选择处理能力并设置输出要求。",
            mediaId: "software-zh-runtime-update-ai-workspace-source"
          },
          {
            label: "执行中",
            caption: "在工作台中查看任务执行状态与处理进度。",
            mediaId: "software-zh-runtime-update-ai-extraction-progress"
          },
          {
            label: "完成结果",
            caption: "任务完成后检查结果，并继续保存或生产操作。",
            mediaId: "software-zh-runtime-update-ai-extraction-complete"
          }
        ],
        tone: "light"
      },
      {
        id: "ai-results",
        number: "AI 02",
        title: "BEFORE / AFTER",
        eyebrow: "查看处理前后的差异",
        description: "用对比画面检查印花提取与抠图前后的变化，直接判断图案、背景和边缘处理结果。",
        steps: ["查看原图", "提取印花", "比较结果", "检查边缘"],
        mediaId: "software-zh-runtime-update-ai-artwork-extraction-compare",
        mediaChoices: [
          {
            label: "印花提取",
            caption: "比较服装图像与提取后的图案结果。",
            mediaId: "software-zh-runtime-update-ai-artwork-extraction-compare",
            posterId: "software-zh-runtime-update-posters-ai-artwork-extraction-compare"
          },
          {
            label: "抠图对比",
            caption: "通过对比画面检查抠图前后的背景与边缘变化。",
            mediaId: "software-zh-runtime-update-ai-background-removal-compare",
            posterId: "software-zh-runtime-update-posters-ai-background-removal-compare"
          }
        ],
        tone: "graphite"
      },
      {
        id: "ai-production",
        number: "AI 03",
        title: "AI → PRODUCTION",
        eyebrow: "让处理结果继续进入生产",
        description: "确认结果后，可从同一工作流继续制作 DTF、DTG 或进入自动排版，减少图稿在工具之间的重复准备。",
        steps: ["确认结果", "选择生产路径", "进入 DTF / DTG", "检查生产输出"],
        mediaId: "software-zh-runtime-update-ai-continue-to-dtg",
        mediaChoices: [
          {
            label: "进入 DTG",
            caption: "将当前图稿送入 DTG，并在 Photoshop 中检查通道结果。",
            mediaId: "software-zh-runtime-update-ai-continue-to-dtg",
            posterId: "software-zh-runtime-update-posters-ai-continue-to-dtg"
          },
          {
            label: "生产入口",
            caption: "从结果页继续进入 DTF、DTG 或自动排版。",
            mediaId: "software-zh-runtime-update-ai-workflow-routing"
          }
        ],
        tone: "light"
      }
    ],
    hardware: {
      label: "硬件",
      title: "为生产流程而设计的设备生态。",
      titleSegments: ["为生产流程而", "设计的设备生态。"],
      body: "覆盖 DTF、白墨烫画烫金、撒粉、烘干与收卷环节，为不同产能需求提供完整设备选择。",
      products: [
        { name: "DTF604", type: "四头 DTF 打印系统", description: "面向稳定日常生产的四头配置。", mediaId: "hardware-dtf604", href: "/zh-CN/hardware/dtf604/" },
        { name: "DFG604", type: "白墨烫画 · 一体化烫金", description: "彩色与胶水同步打印，一台设备完成白墨烫画与烫金。", mediaId: "hardware-dtg604", href: "/zh-CN/hardware/dfg604/" },
        { name: "DTF608", type: "八头高速 DTF", description: "为更高吞吐量与连续生产扩展。", mediaId: "hardware-dtf608", href: "/zh-CN/hardware/dtf608/" },
        { name: "OVEN604", type: "撒粉与烘干系统", description: "连接撒粉、加热、冷却与收卷。", mediaId: "hardware-oven604", href: "/zh-CN/hardware/oven604/" }
      ]
    },
    download: {
      label: "下载",
      title: "MAIXON TOOL V6.3",
      body: "支持多种操作系统，请选择适合你的软件版本。",
      button: "下载软件",
      integrity: "查看文件校验"
    },
    support: {
      label: "支持",
      title: "从安装配置到稳定生产。",
      titleSegments: ["从安装配置到", "稳定生产。"],
      body: "获取软件操作指南、设备使用说明、授权服务与技术支持。",
      guide: "使用说明",
      contact: "联系支持",
      authorization: "获取授权"
    },
    footer: {
      statement: "MAIXON · PRINT PRODUCTION SUITE · PROFESSIONAL V6.3",
      legal: "产品规格与功能可能随版本更新而调整，详情请联系我们。"
    }
  },
  en: {
    meta: {
      title: "MAIXON TOOL V6.3 | Print Production Suite",
      description: "MAIXON TOOL V6.3 for DTF, DTG and sublimation production, with integrated workflows, MAIXON AI, software download and equipment."
    },
    header: {
      download: "Download V6.3",
      menu: "Open navigation"
    },
    hero: {
      title: "MAIXON TOOL",
      lead: "From artwork to production-ready output.",
      descriptor: "PRINT PRODUCTION SUITE · PROFESSIONAL V6.3",
      primary: "Download V6.3",
      secondary: "Watch the product demo",
      mediaId: "software-en-home",
      videoId: "software-zh-videos-demo-overall-zh-v59",
      posterId: "software-zh-posters-poster-overall-zh-v59"
    },
    softwareIntro: {
      label: "Software",
      title: "One suite for the complete print workflow.",
      body: "Import artwork, tune production parameters, process jobs and export production-ready files across DTF, DTG, sublimation and AI workflows."
    },
    workflows: [
      {
        id: "dtf",
        number: "01",
        title: "White-Ink DTF",
        eyebrow: "From one artwork to CMYK + W1",
        description: "Set artwork size, output resolution, W1 shrink and layout spacing, then prepare single or multi-artwork TIFF output for common RIP workflows.",
        steps: ["Choose artwork", "Set resolution and W1", "Build the layout", "Inspect CMYK / W1"],
        mediaId: "software-en-dtf",
        mediaChoices: [
          {
            label: "Multi-image layout",
            caption: "Set layout width, spacing and W1 parameters, then review the Photoshop layout output.",
            mediaId: "software-zh-runtime-update-dtf-multi-layout",
            posterId: "software-zh-runtime-update-posters-dtf-multi-layout"
          },
          {
            label: "Parameter setup",
            caption: "Review editable size, 300 PPI, W1 contraction and bleed controls.",
            mediaId: "software-zh-runtime-update-dtf-parameter-tour",
            posterId: "software-zh-runtime-update-posters-dtf-parameter-tour"
          },
          {
            label: "Single artwork",
            caption: "Set dimensions for one artwork and generate the matching Photoshop file.",
            mediaId: "software-zh-runtime-update-dtf-single-artwork",
            posterId: "software-zh-runtime-update-posters-dtf-single-artwork"
          },
          {
            label: "Row layout",
            caption: "Repeat one artwork across a row, review the layout and continue to output.",
            mediaId: "software-zh-runtime-update-dtf-single-row-layout",
            posterId: "software-zh-runtime-update-posters-dtf-single-row-layout"
          },
          {
            label: "One-meter layout",
            caption: "Automatically calculate artwork repeats within a one-meter layout.",
            mediaId: "software-zh-runtime-update-dtf-one-meter-layout",
            posterId: "software-zh-runtime-update-posters-dtf-one-meter-layout"
          }
        ],
        proofId: "proofs-proof-dtf-output-v59-preview",
        tone: "light"
      },
      {
        id: "dtg",
        number: "02",
        title: "White-Ink DTG",
        eyebrow: "Control light and dark fabric output",
        description: "The production path includes fabric mode, white-ink density, K-region white and CMYK + W1 TIFF output.",
        steps: ["Choose fabric", "Tune white ink", "Process artwork", "Export TIFF"],
        mediaId: "proofs-dtg-output",
        mediaChoices: [
          {
            label: "White-ink controls",
            caption: "Adjust white-ink density for normal areas and K-black regions according to the fabric.",
            mediaId: "software-zh-runtime-update-dtg-parameter-controls",
            posterId: "software-zh-runtime-update-posters-dtg-parameter-controls"
          }
        ],
        proofId: "proofs-dtg-output",
        tone: "light"
      },
      {
        id: "sublimation",
        number: "03",
        title: "Sublimation Layout",
        eyebrow: "Compare material-efficient layouts",
        description: "Recognize pieces, generate Quick, Balanced and Best plans, then select, split rolls and export PDF or TIFF.",
        steps: ["Import PDF", "Recognize pieces", "Compare three plans", "Select and export"],
        mediaId: "software-en-sublimation",
        mediaChoices: [
          {
            label: "Compare layouts",
            caption: "Generate Quick, Balanced and Best in sequence, then review the final nesting result.",
            mediaId: "software-zh-runtime-update-sublimation-layout-workflow",
            posterId: "software-zh-runtime-update-posters-sublimation-layout-workflow"
          }
        ],
        proofId: "proofs-proof-sublimation-balanced-v59",
        tone: "graphite"
      },
      {
        id: "ai-workbench",
        number: "AI 01",
        title: "MAIXON AI",
        eyebrow: "From import to a finished result",
        description: "Import an image, choose a processing tool and review the result in the MAIXON AI workspace.",
        steps: ["Import an image", "Choose a tool", "Run the task", "Review the result"],
        mediaId: "software-en-ai",
        tone: "light"
      },
      {
        id: "ai-results",
        number: "AI 02",
        title: "BEFORE / AFTER",
        eyebrow: "Inspect the processing result",
        description: "Compare the source and processed artwork at a useful working scale before continuing to production.",
        steps: ["View the source", "Process artwork", "Compare the result", "Inspect detail"],
        mediaId: "software-en-ai",
        mediaChoices: [
          {
            label: "Artwork extraction",
            caption: "Compare the garment image with the extracted artwork result.",
            mediaId: "software-zh-runtime-update-ai-artwork-extraction-compare",
            posterId: "software-zh-runtime-update-posters-ai-artwork-extraction-compare"
          },
          {
            label: "Background removal",
            caption: "Inspect background and edge changes before and after removal.",
            mediaId: "software-zh-runtime-update-ai-background-removal-compare",
            posterId: "software-zh-runtime-update-posters-ai-background-removal-compare"
          }
        ],
        tone: "graphite"
      },
      {
        id: "ai-production",
        number: "AI 03",
        title: "AI → PRODUCTION",
        eyebrow: "Continue in the print workflow",
        description: "Review the result alongside the DTF and DTG production modes available in the same suite.",
        steps: ["Confirm the result", "Choose a workflow", "Continue to DTF / DTG", "Prepare output"],
        mediaId: "software-en-ai",
        mediaChoices: [
          {
            label: "Continue to DTG",
            caption: "Send the current artwork into DTG and review the channel output in Photoshop.",
            mediaId: "software-zh-runtime-update-ai-continue-to-dtg",
            posterId: "software-zh-runtime-update-posters-ai-continue-to-dtg"
          }
        ],
        tone: "light"
      }
    ],
    hardware: {
      label: "Hardware",
      title: "Equipment designed around production.",
      body: "Explore DTF, integrated foil finishing, powdering, curing and take-up equipment for different production capacities.",
      products: [
        { name: "DTF604", type: "Four-head DTF system", description: "A production platform for dependable daily output.", mediaId: "hardware-dtf604", href: "/en/hardware/dtf604/" },
        { name: "DFG604", type: "DTF transfer · Integrated foil finishing", description: "Print color and adhesive together, then complete DTF transfer and foil finishing in one system.", mediaId: "hardware-dtg604", href: "/en/hardware/dfg604/" },
        { name: "DTF608", type: "Eight-head high-speed DTF", description: "Expanded throughput for continuous production.", mediaId: "hardware-dtf608", href: "/en/hardware/dtf608/" },
        { name: "OVEN604", type: "Powder and curing system", description: "Powdering, heating, cooling and take-up in one line.", mediaId: "hardware-oven604", href: "/en/hardware/oven604/" }
      ]
    },
    download: {
      label: "Download",
      title: "MAIXON TOOL V6.3",
      body: "Available for multiple operating systems. Choose the software version that fits your computer.",
      button: "Download software",
      integrity: "View file integrity"
    },
    support: {
      label: "Support",
      title: "Support from setup to production.",
      body: "Access software guides, equipment instructions, licensing services and technical support.",
      guide: "Usage guides",
      contact: "Contact support",
      authorization: "Get a license"
    },
    footer: {
      statement: "MAIXON · PRINT PRODUCTION SUITE · PROFESSIONAL V6.3",
      legal: "Product specifications and features may change with version updates. Contact us for current details."
    }
  }
};
