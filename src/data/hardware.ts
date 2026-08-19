import type { Locale } from "@/data/media";

export type HardwareProductKey = "dfg604" | "dtf604" | "dtf608" | "oven604";
export type PrinterKey = Exclude<HardwareProductKey, "oven604">;

const zhHeading = (...phrases: string[]) =>
  phrases
    .map((phrase) => Array.from(phrase).join("\u2060"))
    .join("\u200b");

type LocalizedText = Record<Locale, string>;

export interface HardwareSpecRow {
  label: LocalizedText;
  value: string | LocalizedText;
  note?: LocalizedText;
}

export const getHardwareSpecValue = (spec: HardwareSpecRow, locale: Locale) =>
  typeof spec.value === "string" ? spec.value : spec.value[locale];

export interface HardwareProduct {
  key: HardwareProductKey;
  name: string;
  href: Record<Locale, string>;
  mediaId: string;
  type: LocalizedText;
  positioning: LocalizedText;
  heroTitle: LocalizedText;
  summary: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  metrics: Array<{ value: string; label: LocalizedText }>;
  specifications: HardwareSpecRow[];
}

export const commonPrinterFacts = {
  printhead: "Epson WF-7610",
  maxPrintWidth: "≤ 63 cm",
  voltage: "220 V / 110 V",
  packingSize: "2470 × 660 × 700 mm"
} as const;

const sharedPrinterSpecs = (): HardwareSpecRow[] => [
  {
    label: { "zh-CN": "喷头型号", en: "Printhead model" },
    value: commonPrinterFacts.printhead
  },
  {
    label: { "zh-CN": "最大打印宽度", en: "Maximum print width" },
    value: commonPrinterFacts.maxPrintWidth
  },
  {
    label: { "zh-CN": "电压", en: "Voltage" },
    value: commonPrinterFacts.voltage
  },
  {
    label: { "zh-CN": "打印机木箱尺寸", en: "Printer crate size" },
    value: commonPrinterFacts.packingSize,
    note: {
      "zh-CN": "运输木箱尺寸",
      en: "Shipping crate dimensions"
    }
  }
];

export const hardwareProducts: Record<HardwareProductKey, HardwareProduct> = {
  dfg604: {
    key: "dfg604",
    name: "DFG604",
    href: { "zh-CN": "/zh-CN/hardware/dfg604/", en: "/en/hardware/dfg604/" },
    mediaId: "hardware-dtg604",
    type: {
      "zh-CN": "特殊工艺扩展机型",
      en: "Specialty process platform"
    },
    positioning: {
      "zh-CN": "为胶水打印、烫金与特殊装饰热转印而设计。",
      en: "Designed for adhesive printing, foil finishing and specialty decorative transfers."
    },
    heroTitle: {
      "zh-CN": zhHeading("把特殊工艺，", "接进同一条", "生产流程。"),
      en: "Bring specialty finishes into one connected production flow."
    },
    summary: {
      "zh-CN": "以与 DTF604 同级的平台扩展胶水打印能力，为金属箔、锦旗和装饰性热转印提供更直接的生产路径。",
      en: "Built on the same class of platform as DTF604, DFG604 adds adhesive printing for metallic foil, banners and decorative heat-transfer applications."
    },
    seoTitle: {
      "zh-CN": "DFG604 胶水打印与烫金系统｜MAIXON",
      en: "DFG604 Adhesive Printing & Foil Finishing System | MAIXON"
    },
    seoDescription: {
      "zh-CN": "了解 MAIXON DFG604 特殊工艺平台：胶水打印、金属箔与锦旗应用，5 m²/h、USB、最大打印宽度 ≤63 cm。",
      en: "Explore the MAIXON DFG604 specialty process platform for adhesive printing, metallic foil and banner applications, with 5 m²/h output and USB connectivity."
    },
    metrics: [
      { value: "5 m²/h", label: { "zh-CN": "打印速度", en: "Print speed" } },
      { value: "USB", label: { "zh-CN": "数据接口", en: "Data interface" } },
      { value: "≤ 3 kW", label: { "zh-CN": "整机功率", en: "System power" } }
    ],
    specifications: [
      { label: { "zh-CN": "产品定位", en: "Positioning" }, value: { "zh-CN": "特殊工艺", en: "Specialty process" } },
      { label: { "zh-CN": "打印平台", en: "Print platform" }, value: { "zh-CN": "同级四头平台", en: "4-head class" } },
      { label: { "zh-CN": "打印速度", en: "Print speed" }, value: "5 m²/h" },
      { label: { "zh-CN": "胶水打印", en: "Adhesive printing" }, value: { "zh-CN": "支持", en: "Yes" } },
      { label: { "zh-CN": "数据接口", en: "Data interface" }, value: "USB" },
      { label: { "zh-CN": "整机功率", en: "System power" }, value: "≤ 3 kW" },
      { label: { "zh-CN": "打印机尺寸", en: "Printer dimensions" }, value: "1650 × 860 × 760 mm" },
      ...sharedPrinterSpecs()
    ]
  },
  dtf604: {
    key: "dtf604",
    name: "DTF604",
    href: { "zh-CN": "/zh-CN/hardware/dtf604/", en: "/en/hardware/dtf604/" },
    mediaId: "hardware-dtf604",
    type: {
      "zh-CN": "标准 DTF 生产主力机型",
      en: "Standard DTF production platform"
    },
    positioning: {
      "zh-CN": "稳定的标准 DTF 生产。",
      en: "Dependable standard DTF production."
    },
    heroTitle: {
      "zh-CN": zhHeading("为持续生产，", "保留", "恰到好处的效率。"),
      en: "The right balance for dependable, continuous production."
    },
    summary: {
      "zh-CN": "四头、8 m²/h 与紧凑的 60 cm 级平台，面向日常白墨烫画生产与稳定连续输出。",
      en: "A compact 60 cm-class, four-head platform delivering 8 m²/h for reliable day-to-day DTF production."
    },
    seoTitle: {
      "zh-CN": "DTF604 白墨烫画打印系统｜MAIXON",
      en: "DTF604 DTF Printing System | MAIXON"
    },
    seoDescription: {
      "zh-CN": "了解 MAIXON DTF604 四头白墨烫画打印系统：8 m²/h、USB、CMYK + White、最大打印宽度 ≤63 cm。",
      en: "Explore the MAIXON DTF604 four-head DTF printing system with 8 m²/h output, USB connectivity, CMYK + White and a maximum print width of 63 cm."
    },
    metrics: [
      { value: "8 m²/h", label: { "zh-CN": "打印速度", en: "Print speed" } },
      { value: "4", label: { "zh-CN": "打印头", en: "Printheads" } },
      { value: "USB", label: { "zh-CN": "数据接口", en: "Data interface" } }
    ],
    specifications: [
      { label: { "zh-CN": "产品定位", en: "Positioning" }, value: { "zh-CN": "标准生产", en: "Standard production" } },
      { label: { "zh-CN": "打印头数量", en: "Printheads" }, value: "4" },
      { label: { "zh-CN": "打印速度", en: "Print speed" }, value: "8 m²/h" },
      { label: { "zh-CN": "颜色配置", en: "Color configuration" }, value: "CMYK + White" },
      { label: { "zh-CN": "数据接口", en: "Data interface" }, value: "USB" },
      { label: { "zh-CN": "整机功率", en: "System power" }, value: "≤ 3 kW" },
      { label: { "zh-CN": "打印机尺寸", en: "Printer dimensions" }, value: "1650 × 860 × 760 mm" },
      { label: { "zh-CN": "烘干机尺寸", en: "Dryer dimensions" }, value: "1150 × 800 × 850 mm" },
      {
        label: { "zh-CN": "整套安装参考占地", en: "Installed system footprint" },
        value: "1900 × 1670 × 1650 mm",
        note: { "zh-CN": "安装后的整套空间尺寸", en: "Complete installed system dimensions" }
      },
      { label: { "zh-CN": "打印机包装重量", en: "Printer packed weight" }, value: "195 kg" },
      { label: { "zh-CN": "打印机包装体积", en: "Printer packing volume" }, value: "1.14 m³" },
      ...sharedPrinterSpecs()
    ]
  },
  dtf608: {
    key: "dtf608",
    name: "DTF608",
    href: { "zh-CN": "/zh-CN/hardware/dtf608/", en: "/en/hardware/dtf608/" },
    mediaId: "hardware-dtf608",
    type: {
      "zh-CN": "八头高速生产机型",
      en: "Eight-head high-speed production platform"
    },
    positioning: {
      "zh-CN": "面向高速批量生产。",
      en: "Built for high-speed volume production."
    },
    heroTitle: {
      "zh-CN": zhHeading("双组四头，", "把持续产能推到", "18 m²/h。"),
      en: "Two groups of four heads take continuous output to 18 m²/h."
    },
    summary: {
      "zh-CN": "8 头高速结构配合 Ethernet / LAN 数据传输，为大批量、连续 DTF 生产提供更高吞吐量。",
      en: "An eight-head architecture with Ethernet / LAN data transfer delivers greater throughput for continuous, high-volume DTF production."
    },
    seoTitle: {
      "zh-CN": "DTF608 八头高速 DTF 打印系统｜MAIXON",
      en: "DTF608 Eight-Head High-Speed DTF System | MAIXON"
    },
    seoDescription: {
      "zh-CN": "了解 MAIXON DTF608 八头高速 DTF 平台：18 m²/h、Ethernet / LAN、4200 W、最大打印宽度 ≤63 cm。",
      en: "Explore the MAIXON DTF608 eight-head high-speed DTF platform with 18 m²/h output, Ethernet / LAN connectivity and 4200 W power."
    },
    metrics: [
      { value: "18 m²/h", label: { "zh-CN": "打印速度", en: "Print speed" } },
      { value: "2 × 4", label: { "zh-CN": "打印头结构", en: "Head architecture" } },
      { value: "Ethernet / LAN", label: { "zh-CN": "数据接口", en: "Data interface" } }
    ],
    specifications: [
      { label: { "zh-CN": "产品定位", en: "Positioning" }, value: { "zh-CN": "高速生产", en: "High-speed production" } },
      { label: { "zh-CN": "打印头数量", en: "Printheads" }, value: "8 (2 × 4)" },
      { label: { "zh-CN": "打印速度", en: "Print speed" }, value: "18 m²/h" },
      { label: { "zh-CN": "胶水打印", en: "Adhesive printing" }, value: { "zh-CN": "不支持", en: "No" } },
      { label: { "zh-CN": "数据接口", en: "Data interface" }, value: "Ethernet / LAN" },
      { label: { "zh-CN": "整机功率", en: "System power" }, value: "4200 W" },
      {
        label: { "zh-CN": "机体横向尺寸", en: "Machine transverse dimension" },
        value: "≈ DTF604 + 200 mm",
        note: { "zh-CN": "最终绝对尺寸待确认", en: "Final absolute dimensions pending confirmation" }
      },
      ...sharedPrinterSpecs()
    ]
  },
  oven604: {
    key: "oven604",
    name: "OVEN604",
    href: { "zh-CN": "/zh-CN/hardware/oven604/", en: "/en/hardware/oven604/" },
    mediaId: "hardware-oven604",
    type: {
      "zh-CN": "高集成撒粉与烘干系统",
      en: "Integrated powdering and curing system"
    },
    positioning: {
      "zh-CN": "边生产，边收卷，边取用。",
      en: "Produce, wind and use finished sections continuously."
    },
    heroTitle: {
      "zh-CN": zhHeading("做完的部分，", "不必等整卷结束。"),
      en: "Use what is finished without waiting for the full roll."
    },
    summary: {
      "zh-CN": "从自动撒粉、多段烘烤到内置冷却与收料，把 DTF 后处理连接成一条连续流程。",
      en: "Automatic powdering, multi-stage curing, built-in cooling and take-up connect DTF post-processing into one continuous flow."
    },
    seoTitle: {
      "zh-CN": "OVEN604 随用随剪撒粉烘干系统｜MAIXON",
      en: "OVEN604 Continuous Cut-and-Use Powder & Curing System | MAIXON"
    },
    seoDescription: {
      "zh-CN": "了解 MAIXON OVEN604：随用随剪收纸、三段烘烤、重量感应自动补粉、弧形路径与内置冷却。",
      en: "Explore the MAIXON OVEN604 with cut-and-use take-up, three-stage curing, weight-sensing powder replenishment, a curved media path and built-in cooling."
    },
    metrics: [
      { value: "70 → 120 → 150°C", label: { "zh-CN": "典型工艺参考", en: "Typical process reference" } },
      { value: "2", label: { "zh-CN": "收料模式", en: "Take-up modes" } },
      { value: "0.873 m³", label: { "zh-CN": "包装体积", en: "Packing volume" } }
    ],
    specifications: [
      { label: { "zh-CN": "木箱尺寸", en: "Crate size" }, value: "810 × 930 × 1160 mm" },
      { label: { "zh-CN": "包装重量", en: "Packed weight" }, value: "139 kg" },
      { label: { "zh-CN": "包装体积", en: "Packing volume" }, value: "0.873 m³" },
      { label: { "zh-CN": "收料模式", en: "Take-up modes" }, value: { "zh-CN": "传统收卷 / 随用随剪", en: "Traditional / Cut-and-use" } },
      { label: { "zh-CN": "典型温度参考", en: "Typical temperature reference" }, value: "70°C → 120°C → 150°C" },
      { label: { "zh-CN": "冷却方式", en: "Cooling" }, value: { "zh-CN": "内置冷却风道", en: "Built-in cooling path" } }
    ]
  }
};

export const printerOrder: PrinterKey[] = ["dfg604", "dtf604", "dtf608"];
export const hardwareOrder: HardwareProductKey[] = [...printerOrder, "oven604"];

export const hardwareOverviewCopy = {
  "zh-CN": {
    label: "硬件",
    title: zhHeading("三台打印平台，", "清楚对应", "三种生产目标。"),
    body: "特殊工艺、标准生产与高速批量，各自使用准确的速度、接口和功率参数。烘干系统则负责把后处理连续衔接起来。",
    compareTitle: zhHeading("选对生产平台。"),
    compareBody: "先看工艺，再看速度与产能。所有核心差异集中在同一张表里。",
    ovenTitle: zhHeading("后处理，", "也应该连续发生。"),
    ovenBody: "OVEN604 把撒粉、烘烤、冷却与收料接进同一条流程，并让已完成的部分随时可取用。",
    viewProduct: "查看产品"
  },
  en: {
    label: "Hardware",
    title: "Three print platforms, each aligned to a clear production goal.",
    body: "Specialty processes, standard production and high-speed volume output each use accurate speed, interface and power specifications. The curing system connects post-processing into one continuous flow.",
    compareTitle: "Choose the right production platform.",
    compareBody: "Start with the process, then compare speed and throughput. The core differences are shown in one concise view.",
    ovenTitle: "Post-processing should stay continuous, too.",
    ovenBody: "OVEN604 connects powdering, curing, cooling and take-up while keeping finished sections available during production.",
    viewProduct: "View product"
  }
} as const;

export const printerComparison = [
  {
    key: "dfg604" as const,
    values: {
      positioning: { "zh-CN": "特殊工艺", en: "Specialty process" },
      heads: { "zh-CN": "同级四头平台", en: "4-head class" },
      speed: "5 m²/h",
      glue: { "zh-CN": "支持", en: "Yes" },
      interface: "USB",
      power: "≤ 3 kW"
    }
  },
  {
    key: "dtf604" as const,
    values: {
      positioning: { "zh-CN": "标准生产", en: "Standard production" },
      heads: { "zh-CN": "4 头", en: "4 heads" },
      speed: "8 m²/h",
      glue: { "zh-CN": "不支持", en: "No" },
      interface: "USB",
      power: "≤ 3 kW"
    }
  },
  {
    key: "dtf608" as const,
    values: {
      positioning: { "zh-CN": "高速生产", en: "High-speed production" },
      heads: { "zh-CN": "8 头（2 × 4）", en: "8 heads (2 × 4)" },
      speed: "18 m²/h",
      glue: { "zh-CN": "不支持", en: "No" },
      interface: "Ethernet / LAN",
      power: "4200 W"
    }
  }
] as const;

export const hardwareLabels = {
  "zh-CN": {
    model: "型号",
    positioning: "定位",
    heads: "打印头",
    speed: "速度",
    glue: "胶水打印",
    interface: "接口",
    power: "功率",
    specifications: "规格参数",
    specificationIntro: "把设备、安装与运输数据分开说明。",
    applications: "适用方向",
    details: "工程与生产重点"
  },
  en: {
    model: "Model",
    positioning: "Positioning",
    heads: "Printheads",
    speed: "Speed",
    glue: "Adhesive",
    interface: "Interface",
    power: "Power",
    specifications: "Specifications",
    specificationIntro: "Machine, installation and shipping figures are identified separately.",
    applications: "Applications",
    details: "Engineering and production focus"
  }
} as const;

export const dfg604ApplicationMedia = {
  foilDetail: {
    src: "/hardware-assets/dfg604/foil-detail-1200.webp",
    srcset: "/hardware-assets/dfg604/foil-detail-640.webp 640w, /hardware-assets/dfg604/foil-detail-1200.webp 1200w, /hardware-assets/dfg604/foil-detail-1800.webp 1800w",
    avifSrcset: "/hardware-assets/dfg604/foil-detail-640.avif 640w, /hardware-assets/dfg604/foil-detail-1200.avif 1200w, /hardware-assets/dfg604/foil-detail-1800.avif 1800w",
    width: 1800,
    height: 2400,
    alt: {
      "zh-CN": "锦旗金色烫金文字的表面与边缘细节",
      en: "Surface and edge detail of metallic gold lettering on a finished banner"
    },
    internal: { source_type: "production_output", status: "approved", replaceable: false }
  },
  finishedBanner: {
    src: "/hardware-assets/dfg604/banner-finished-1200.webp",
    srcset: "/hardware-assets/dfg604/banner-finished-640.webp 640w, /hardware-assets/dfg604/banner-finished-1200.webp 1200w, /hardware-assets/dfg604/banner-finished-1800.webp 1800w",
    avifSrcset: "/hardware-assets/dfg604/banner-finished-640.avif 640w, /hardware-assets/dfg604/banner-finished-1200.avif 1200w, /hardware-assets/dfg604/banner-finished-1800.avif 1800w",
    width: 1800,
    height: 2586,
    alt: {
      "zh-CN": "带金色装饰文字的完整锦旗成品",
      en: "Complete finished banner with metallic gold decorative lettering"
    },
    internal: { source_type: "production_output", status: "approved", replaceable: false }
  },
  shirtEye: {
    src: "/hardware-assets/dfg604/shirt-eye-1200.webp",
    srcset: "/hardware-assets/dfg604/shirt-eye-640.webp 640w, /hardware-assets/dfg604/shirt-eye-1200.webp 1200w",
    avifSrcset: "/hardware-assets/dfg604/shirt-eye-640.avif 640w, /hardware-assets/dfg604/shirt-eye-1200.avif 1200w",
    width: 1200,
    height: 1200,
    alt: { "zh-CN": "黑色 T 恤上的彩色眼睛与金色闪电图案应用示意", en: "Black T-shirt concept with a colorful eye and gold lightning accents" },
    internal: { source_type: "generated", status: "provisional", replaceable: true }
  },
  shirtFlower: {
    src: "/hardware-assets/dfg604/shirt-flower-1200.webp",
    srcset: "/hardware-assets/dfg604/shirt-flower-640.webp 640w, /hardware-assets/dfg604/shirt-flower-1200.webp 1200w",
    avifSrcset: "/hardware-assets/dfg604/shirt-flower-640.avif 640w, /hardware-assets/dfg604/shirt-flower-1200.avif 1200w",
    width: 1200,
    height: 1200,
    alt: { "zh-CN": "黑色 T 恤上的彩色花朵与金色线条图案应用示意", en: "Black T-shirt concept with a colorful flower and gold line accents" },
    internal: { source_type: "generated", status: "provisional", replaceable: true }
  }
} as const;

export const hardwareNarratives = {
  dtf604: {
    productionTitle: {
      "zh-CN": zhHeading("标准生产，", "需要稳定，", "也需要足够直接。"),
      en: "Standard production should be stable and straightforward."
    },
    productionBody: {
      "zh-CN": "四头打印结构、8 m²/h 速度与 CMYK + White 标准配置，面向持续的 PET DTF 热转印生产。",
      en: "A four-head architecture, 8 m²/h output and CMYK + White configuration support continuous PET DTF transfer production."
    },
    productionPoints: [
      { value: "4", label: { "zh-CN": "四头打印结构", en: "Four-head architecture" } },
      { value: "8 m²/h", label: { "zh-CN": "稳定日常效率", en: "Day-to-day throughput" } },
      { value: "CMYK + White", label: { "zh-CN": "标准 DTF 配置", en: "Standard DTF configuration" } }
    ],
    inkTitle: { "zh-CN": zhHeading("让白墨状态", "更适合", "连续生产。"), en: "Keep white ink ready for continuous production." },
    inkBody: {
      "zh-CN": "1200 ml 供墨系统结合白墨循环与磁力搅拌，帮助减少白墨沉淀，并支持更连续的生产节奏。",
      en: "A 1200 ml ink supply combines white-ink circulation and magnetic agitation to help reduce settling and support a more continuous production rhythm."
    },
    applications: {
      title: { "zh-CN": zhHeading("从服装到", "日常定制品。"), en: "From apparel to everyday custom products." },
      body: {
        "zh-CN": "适用于 T 恤、卫衣、帽子、箱包、手提袋与其他 PET DTF 热转印产品。",
        en: "Suitable for T-shirts, hoodies, caps, bags, tote bags and other PET DTF transfer products."
      },
      items: {
        "zh-CN": ["T 恤与服装", "卫衣", "帽子", "箱包与手提袋", "PET DTF 热转印"],
        en: ["T-shirts and apparel", "Hoodies", "Caps", "Bags and tote bags", "PET DTF transfers"]
      }
    }
  },
  dfg604: {
    processTitle: {
      "zh-CN": zhHeading("速度不是", "唯一目标。", "特殊工艺", "才是它的", "重点。"),
      en: "Its priority is specialty capability, not maximum speed."
    },
    processBody: {
      "zh-CN": "DFG604 提供特殊工艺所需的胶水打印能力，让白墨烫画进一步衔接金属箔与装饰性效果。",
      en: "DFG604 adds the adhesive-printing capability required to extend DTF transfers into metallic foil and decorative finishes."
    },
    processPoints: [
      { number: "01", title: { "zh-CN": "胶水打印", en: "Adhesive printing" }, body: { "zh-CN": "为后续特殊表面工艺建立可靠衔接。", en: "Creates a dependable connection to subsequent specialty finishing." } },
      { number: "02", title: { "zh-CN": "金属箔与烫金", en: "Metallic foil finishing" }, body: { "zh-CN": "进一步实现具有金属质感的装饰性热转印效果。", en: "Enables decorative heat-transfer finishes with a metallic surface character." } },
      { number: "03", title: { "zh-CN": "锦旗与礼仪产品", en: "Banners and ceremonial products" }, body: { "zh-CN": "适用于锦旗、装饰文字与特殊礼仪产品。", en: "Suited to banners, decorative lettering and specialty ceremonial products." } }
    ],
    foilTitle: { "zh-CN": zhHeading("金属质感，", "在近处", "依然清楚。"), en: "Metallic character that remains clear up close." },
    foilBody: {
      "zh-CN": "近距离查看金色表面的光泽、纹理与文字边缘，呈现特殊装饰工艺的细节表现。",
      en: "A close view of the gold surface reveals its sheen, texture and lettering edges in the finished decorative application."
    },
    bannerTitle: { "zh-CN": zhHeading("从细节，", "走到完整", "锦旗。"), en: "From surface detail to the complete finished banner." },
    bannerBody: {
      "zh-CN": "完整成品展示胶水打印与金属箔工艺可以服务的实际产品类型，而不只是单独的效果样片。",
      en: "The complete product shows how adhesive printing and metallic foil finishing translate into a real banner application, beyond a standalone effect sample."
    },
    apparelTitle: { "zh-CN": zhHeading("从锦旗，", "延伸到", "服装图案。"), en: "From banners to apparel graphics." },
    apparelBody: {
      "zh-CN": "黑色 T 恤上的金色线条与彩色图案，展示 DFG604 特殊工艺可延伸的服装设计方向。",
      en: "Gold accents and color graphics on black T-shirts illustrate apparel design directions enabled by the DFG604 specialty process."
    }
  },
  dtf608: {
    speedTitle: { "zh-CN": zhHeading("18 m²/h，", "是这一页", "最重要的", "数字。"), en: "18 m²/h is the number that defines this platform." },
    speedBody: {
      "zh-CN": "双组四头形成 8 头打印结构，面向大批量与持续生产，在相同 60 cm 级平台上提升吞吐量。",
      en: "Two groups of four form an eight-head architecture that raises throughput for continuous, high-volume work on the same 60 cm-class platform."
    },
    transportTitle: { "zh-CN": zhHeading("高速输出，", "也要让数据", "稳定跟上。"), en: "High-speed output needs data delivery that keeps pace." },
    transportBody: {
      "zh-CN": "Ethernet / LAN 网口为高速连续打印提供更稳定的数据传输；4200 W 功率配置对应更高产能平台。",
      en: "Ethernet / LAN provides stable data transfer for continuous high-speed printing, while the 4200 W power configuration supports the higher-throughput platform."
    },
    scaleTitle: { "zh-CN": zhHeading("更大的机体，", "仍使用", "统一木箱。"), en: "A larger machine, still packed in the common crate." },
    scaleBody: {
      "zh-CN": "机体横向尺寸较 DTF604 约增加 200 mm；运输装箱经过优化，打印机木箱仍为 2470 × 660 × 700 mm。最终绝对机身尺寸与重量仍待确认。",
      en: "The machine is approximately 200 mm larger transversely than DTF604. Optimized packing retains the 2470 × 660 × 700 mm printer crate. Final absolute dimensions and weights remain pending confirmation."
    }
  },
  oven604: {
    takeupTitle: { "zh-CN": zhHeading("边生产，", "边收卷，", "边取用。"), en: "Produce, wind and use finished sections continuously." },
    takeupBody: {
      "zh-CN": "前端继续打印与烘烤，后端持续收卷；已经完成的部分可以直接裁下进入下一道工序，不必等待整卷订单结束。",
      en: "Printing and curing continue at the front while the rear keeps winding. Finished sections can be cut and moved to the next process without waiting for the full roll."
    },
    takeupBenefits: {
      "zh-CN": ["减少整卷等待", "小订单更灵活", "成品可提前取用", "连续生产不中断"],
      en: ["Less full-roll waiting", "More flexible short runs", "Earlier access to finished work", "Continuous production"]
    },
    modesTitle: { "zh-CN": "两种收料方式，按订单切换。", en: "Two take-up modes, selected to suit the order." },
    modes: {
      "zh-CN": ["传统收卷模式", "随用随剪模式"],
      en: ["Traditional take-up", "Cut-and-use mode"]
    },
    stagesTitle: { "zh-CN": zhHeading("三段热处理，", "让温度变化", "更清楚。"), en: "Three thermal stages make the process easier to control." },
    stagesBody: {
      "zh-CN": "典型工艺参考为 70°C → 120°C → 150°C。实际温度根据材料、胶粉与生产工艺调整，并非固定值。",
      en: "A typical process reference is 70°C → 120°C → 150°C. Actual temperatures are adjusted for the material, powder and production process; they are not fixed settings."
    },
    stages: [
      { number: "01", temperature: "≈ 70°C", title: { "zh-CN": "前烘", en: "Preheat" } },
      { number: "02", temperature: "≈ 120°C", title: { "zh-CN": "主体烘烤", en: "Main heating" } },
      { number: "03", temperature: "≈ 150°C", title: { "zh-CN": "最终烘烤", en: "Final curing" } }
    ],
    engineeringTitle: { "zh-CN": zhHeading("让粉量与", "膜材路径", "持续保持", "节奏。"), en: "Keep powder delivery and media movement in rhythm." },
    engineering: [
      { title: { "zh-CN": "重量感应自动补粉", en: "Weight-sensing powder replenishment" }, body: { "zh-CN": "根据粉量状态自动控制补粉，达到设定状态后停止，减少人工干预。", en: "Controls powder replenishment according to powder state and stops at the set level, reducing manual intervention." } },
      { title: { "zh-CN": "弧形烘烤路径", en: "Curved curing path" }, body: { "zh-CN": "让膜材通过更连续的运行曲线进入烘烤区域，帮助获得更稳定的受热过程。", en: "Moves media into the curing area along a more continuous curve to support a stable heating process." } }
    ],
    compactTitle: { "zh-CN": zhHeading("把必要功能", "收进设备", "内部。"), en: "Keep essential functions within the machine." },
    compactPoints: [
      { title: { "zh-CN": "内置冷却风道", en: "Built-in cooling path" }, body: { "zh-CN": "材料在烘烤后直接进入机内冷却路径，保持流程连续并减少额外占地。", en: "Media enters an internal cooling path directly after curing, maintaining flow while reducing additional floor space." } },
      { title: { "zh-CN": "紧凑前烘设计", en: "Compact preheat design" }, body: { "zh-CN": "在进料区域完成必要预热，在保持前烘作用的同时减少无效结构体积。", en: "Provides the required preheat at the feed area while reducing unnecessary structural volume." } }
    ]
  }
} as const;
