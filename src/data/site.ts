import type { Locale } from "./media";

export const installer = {
  version: "5.9.0",
  displayVersion: "V5.9",
  os: "Windows 10/11",
  size: "68.3 MB",
  sha256: "2528235A8E95CAAB8FAD0BCABFD4D1523B189EEEB61759464B53E6427E7550D7",
  url: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V5.9_Windows10_11_Setup.exe"
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
  id: "dtf" | "dtg" | "sublimation" | "ai";
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  steps: string[];
  mediaId: string;
  videoId?: string;
  posterId?: string;
  proofId?: string;
  tone: "light" | "graphite";
  mediaNote?: string;
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
    body: string;
  };
  workflows: WorkflowContent[];
  hardware: {
    label: string;
    title: string;
    body: string;
    provisional: string;
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
      title: "MAIXON TOOL V5.9｜印花生产套件",
      description: "面向 DTF、DTG 与热升华生产的 MAIXON TOOL V5.9，包含真实工作流程、MAIXON AI、软件下载与硬件生态。"
    },
    header: {
      download: "下载 V5.9",
      menu: "打开导航"
    },
    hero: {
      title: "MAIXON TOOL",
      lead: "从图稿到可生产文件。",
      descriptor: "PRINT PRODUCTION SUITE · PROFESSIONAL V5.9",
      primary: "下载 V5.9",
      secondary: "观看实际工作流程",
      mediaId: "software-zh-home-overview",
      videoId: "software-zh-videos-demo-overall-zh-v59",
      posterId: "software-zh-posters-poster-overall-zh-v59"
    },
    softwareIntro: {
      label: "软件",
      title: "一套工具，连接完整印花生产流程。",
      body: "真实导入、真实参数、真实处理、真实输出。每个核心模块都来自最终 V5.9 运行界面。"
    },
    workflows: [
      {
        id: "dtf",
        number: "01",
        title: "DTF 白墨烫画",
        eyebrow: "从单图到 CMYK + W1",
        description: "完成图稿准备、白墨专色、排版与生产 TIFF 输出，并连接常用 RIP 工作流程。",
        steps: ["导入图稿", "设置参数", "生成 W1", "导出 TIFF"],
        mediaId: "software-zh-dtf-zh-dtf-03-parameters",
        videoId: "software-zh-videos-demo-dtf-zh-v59",
        posterId: "software-zh-posters-poster-dtf-zh-v59",
        proofId: "proofs-proof-dtf-output-v59-preview",
        tone: "light"
      },
      {
        id: "dtg",
        number: "02",
        title: "DTG 白墨直喷",
        eyebrow: "控制深色与浅色面料",
        description: "按面料设置普通区域白墨、K 黑区域白墨、收缩与扩边，生成带 W1 通道的真实生产 TIFF。",
        steps: ["选择面料", "调整白墨量", "处理去黑/抠白", "导出 TIFF"],
        mediaId: "software-zh-dtg-zh-dtg-02-parameters",
        proofId: "proofs-dtg-output",
        tone: "light"
      },
      {
        id: "sublimation",
        number: "03",
        title: "热升华智能排版",
        eyebrow: "把材料利用率变成可比较的方案",
        description: "识别裁片，生成 Quick、Balanced 与 Best 三种真实方案，再选择、分卷并导出 PDF 或 TIFF。",
        steps: ["导入 PDF", "识别裁片", "比较三种方案", "选择并导出"],
        mediaId: "software-zh-sublimation-zh-sub-06-compare",
        videoId: "software-zh-videos-demo-sublimation-zh-v59",
        posterId: "software-zh-posters-poster-sublimation-zh-v59",
        proofId: "proofs-proof-sublimation-balanced-v59",
        tone: "graphite"
      },
      {
        id: "ai",
        number: "04",
        title: "MAIXON AI",
        eyebrow: "从输入到可继续生产的结果",
        description: "完成图案提取、增强、抠图、无缝花型、矢量化、提示词编辑与扩图，并把结果送入 DTF 或 DTG。",
        steps: ["选择任务", "真实云端处理", "检查结果", "进入 DTF / DTG"],
        mediaId: "software-zh-ai-zh-ai-03-result",
        videoId: "software-zh-videos-demo-ai-zh-v59",
        posterId: "software-zh-posters-poster-ai-zh-v59",
        tone: "light"
      }
    ],
    hardware: {
      label: "硬件",
      title: "为生产流程而设计的设备生态。",
      body: "当前设备图作为可替换视觉占位。后续真实摄影只需更新 Media Manifest，不改变页面结构。",
      provisional: "临时设备图",
      products: [
        { name: "DTF604", type: "四头 DTF 打印系统", description: "面向稳定日常生产的四头配置。", mediaId: "hardware-dtf604", href: "/zh-CN/hardware/dtf604/" },
        { name: "DTG604", type: "四头 DTG 打印系统", description: "为深色与浅色面料工作流准备。", mediaId: "hardware-dtg604", href: "/zh-CN/hardware/dtg604/" },
        { name: "DTF608", type: "八头高速 DTF", description: "为更高吞吐量与连续生产扩展。", mediaId: "hardware-dtf608", href: "/zh-CN/hardware/dtf608/" },
        { name: "OVEN604", type: "撒粉与烘干系统", description: "连接撒粉、加热、冷却与收卷。", mediaId: "hardware-oven604", href: "/zh-CN/hardware/oven604/" }
      ]
    },
    download: {
      label: "下载",
      title: "MAIXON TOOL V5.9",
      body: "Windows 10/11 · 真实正式安装包 · 由阿里云 OSS 独立提供。",
      button: "下载 Windows 安装包",
      integrity: "查看文件校验"
    },
    support: {
      label: "支持",
      title: "从安装到生产，保持清楚。",
      body: "软件说明、设备指南、授权与人工联系入口集中在同一处。",
      guide: "使用说明",
      contact: "联系支持",
      authorization: "获取授权"
    },
    footer: {
      statement: "MAIXON · PRINT PRODUCTION SUITE · PROFESSIONAL V5.9",
      legal: "所有产品信息以最终软件、正式设备与商业确认版本为准。"
    }
  },
  en: {
    meta: {
      title: "MAIXON TOOL V5.9 | Print Production Suite",
      description: "MAIXON TOOL V5.9 for DTF, DTG and sublimation production, with verified workflows, MAIXON AI, software download and hardware."
    },
    header: {
      download: "Download V5.9",
      menu: "Open navigation"
    },
    hero: {
      title: "MAIXON TOOL",
      lead: "From artwork to production-ready output.",
      descriptor: "PRINT PRODUCTION SUITE · PROFESSIONAL V5.9",
      primary: "Download V5.9",
      secondary: "Watch the real workflow",
      mediaId: "software-en-home"
    },
    softwareIntro: {
      label: "Software",
      title: "One suite for the complete print workflow.",
      body: "Real input, real parameters, real processing and real output. Every core module is shown with final V5.9 media."
    },
    workflows: [
      {
        id: "dtf",
        number: "01",
        title: "White-Ink DTF",
        eyebrow: "From one artwork to CMYK + W1",
        description: "Prepare artwork, build the white-ink spot channel, lay out production and export TIFF files for common RIP workflows.",
        steps: ["Import artwork", "Set parameters", "Build W1", "Export TIFF"],
        mediaId: "software-en-dtf",
        proofId: "proofs-proof-dtf-output-v59-preview",
        tone: "light"
      },
      {
        id: "dtg",
        number: "02",
        title: "White-Ink DTG",
        eyebrow: "Control light and dark fabric output",
        description: "The production path includes fabric mode, white-ink density, K-region white and a real CMYK + W1 TIFF.",
        steps: ["Choose fabric", "Tune white ink", "Process artwork", "Export TIFF"],
        mediaId: "proofs-dtg-output",
        proofId: "proofs-dtg-output",
        tone: "light",
        mediaNote: "The current English page uses a verified, language-neutral production output while the final English DTG interface capture is pending."
      },
      {
        id: "sublimation",
        number: "03",
        title: "Sublimation Layout",
        eyebrow: "Compare material-efficient layouts",
        description: "Recognize pieces, generate Quick, Balanced and Best plans, then select, split rolls and export PDF or TIFF.",
        steps: ["Import PDF", "Recognize pieces", "Compare three plans", "Select and export"],
        mediaId: "software-en-sublimation",
        proofId: "proofs-proof-sublimation-balanced-v59",
        tone: "graphite"
      },
      {
        id: "ai",
        number: "04",
        title: "MAIXON AI",
        eyebrow: "From input to a production-ready result",
        description: "Extract, enhance, remove backgrounds, build seamless patterns, vectorize, edit and outpaint, then continue in DTF or DTG.",
        steps: ["Choose a task", "Process in the cloud", "Inspect the result", "Continue to DTF / DTG"],
        mediaId: "software-en-ai",
        tone: "light"
      }
    ],
    hardware: {
      label: "Hardware",
      title: "Equipment designed around production.",
      body: "Current equipment renders are replaceable visual media. Future photography will update the manifest without rebuilding the layout.",
      provisional: "Provisional equipment media",
      products: [
        { name: "DTF604", type: "Four-head DTF system", description: "A production platform for dependable daily output.", mediaId: "hardware-dtf604", href: "/en/hardware/dtf604/" },
        { name: "DTG604", type: "Four-head DTG system", description: "Prepared for light and dark fabric workflows.", mediaId: "hardware-dtg604", href: "/en/hardware/dtg604/" },
        { name: "DTF608", type: "Eight-head high-speed DTF", description: "Expanded throughput for continuous production.", mediaId: "hardware-dtf608", href: "/en/hardware/dtf608/" },
        { name: "OVEN604", type: "Powder and curing system", description: "Powdering, heating, cooling and take-up in one line.", mediaId: "hardware-oven604", href: "/en/hardware/oven604/" }
      ]
    },
    download: {
      label: "Download",
      title: "MAIXON TOOL V5.9",
      body: "Windows 10/11 · Verified release installer · Delivered independently through Alibaba Cloud OSS.",
      button: "Download for Windows",
      integrity: "View file integrity"
    },
    support: {
      label: "Support",
      title: "Clear guidance from setup to production.",
      body: "Software guides, equipment instructions, licensing and direct support are brought together in one place.",
      guide: "Usage guides",
      contact: "Contact support",
      authorization: "Get a license"
    },
    footer: {
      statement: "MAIXON · PRINT PRODUCTION SUITE · PROFESSIONAL V5.9",
      legal: "Product information is subject to the final software, verified equipment and confirmed commercial terms."
    }
  }
};
