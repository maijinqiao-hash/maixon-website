import type { Locale } from "@/data/media";

export type GuideMedia = {
  id: string;
  posterId?: string;
  alt: string;
  caption: string;
};

export type GuideSection = {
  title: string;
  body: string;
  steps?: string[];
  notes?: string[];
  media?: GuideMedia;
};

export type GuideTopic = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  sections: GuideSection[];
};

type GuideIndexCopy = {
  label: string;
  title: string;
  description: string;
  open: string;
  back: string;
  topics: GuideTopic[];
};

const zhTopics: GuideTopic[] = [
  {
    slug: "install",
    number: "01",
    title: "安装与首次启动",
    summary: "完成软件下载、安装与首次启动前的基础检查。",
    description: "从官方安装包开始，完成首次启动、账号登录与工作环境确认。",
    sections: [
      {
        title: "下载安装包",
        body: "前往 MAIXON 下载页获取适用于 Windows 10 / 11 的安装包。",
        steps: ["完成下载后运行安装程序。", "按安装向导完成安装。", "首次启动前确认电脑已连接网络。"]
      },
      {
        title: "首次启动",
        body: "打开 MAIXON TOOL V6.2，进入账号入口并确认软件界面能够正常显示。",
        notes: ["如安装或启动遇到问题，请记录提示内容与软件版本，再联系技术支持。"]
      }
    ]
  },
  {
    slug: "account",
    number: "02",
    title: "账号与登录",
    summary: "注册、登录并在“我的账号”中查看当前状态。",
    description: "账号用于管理授权、AI 点数与软件使用状态。",
    sections: [
      {
        title: "注册与登录",
        body: "使用常用邮箱注册账号，并妥善保存登录信息。购买授权时，请向客服提供同一个注册邮箱。",
        steps: ["输入注册邮箱并完成账号创建。", "登录后进入“我的账号”。", "确认邮箱和当前授权状态。"]
      },
      {
        title: "账号状态",
        body: "授权或 AI 点数开通后，在“我的账号”中刷新状态即可查看最新结果。",
        notes: ["不要向他人发送账号密码；客服只需要核对注册邮箱。"]
      }
    ]
  },
  {
    slug: "authorization",
    number: "03",
    title: "授权与开通",
    summary: "了解授权方案、购买资料与开通后的状态刷新。",
    description: "按实际生产模块选择授权，并使用注册邮箱完成开通。",
    sections: [
      {
        title: "选择授权",
        body: "可选择完整功能时长授权，或购买 DTF、DTG、热升华永久模块。MAIXON AI 点数单独购买。",
        steps: ["确认需要的模块与使用期限。", "在获取授权页核对价格。", "联系客服并提供注册邮箱。"]
      },
      {
        title: "完成开通",
        body: "支付后向客服发送付款截图与注册邮箱。收到开通确认后，回到“我的账号”刷新状态。",
        notes: ["付款前请再次确认收款二维码标题，避免将联系二维码误作收款二维码。"]
      }
    ]
  },
  {
    slug: "dtf",
    number: "04",
    title: "DTF 白墨烫画",
    summary: "设置图稿、白墨通道与排版参数，衔接后续输出。",
    description: "从尺寸与 300 PPI 设置开始，完成单图、多图或一米排版，并检查 CMYK / W1 通道。",
    sections: [
      {
        title: "设置参数",
        body: "导入图稿后设置尺寸、300 PPI、W1 收缩和排版间距，再选择对应的排版方式。",
        steps: ["导入并确认图稿尺寸。", "设置 300 PPI 与 W1 参数。", "根据生产任务选择单图、多图、按行或一米排版。"],
        media: {
          id: "software-zh-runtime-update-dtf-parameter-tour",
          posterId: "software-zh-runtime-update-posters-dtf-parameter-tour",
          alt: "DTF 参数设置与界面操作",
          caption: "设置尺寸、分辨率、W1 与排版参数。",
        }
      },
      {
        title: "检查输出",
        body: "完成处理后，在 Photoshop 中检查 CMYK 与 W1 通道，确认白墨区域与图稿对应。",
        steps: ["检查彩色图稿状态。", "切换到 W1 通道查看白墨覆盖范围。", "确认结果后进入后续生产环节。"],
        media: {
          id: "software-zh-runtime-update-dtf-white-channel-output",
          alt: "Photoshop 中的 DTF W1 白墨通道",
          caption: "检查白墨专色通道的输出状态。"
        }
      }
    ]
  },
  {
    slug: "dtg",
    number: "05",
    title: "DTG 白墨直喷",
    summary: "按面料调整白墨、收缩与扩边，并检查输出通道。",
    description: "针对普通区域与 K 黑区域设置白墨参数，生成包含 W1 通道的生产文件。",
    sections: [
      {
        title: "调整白墨",
        body: "根据面料与图稿情况设置普通区域白墨、K 黑区域白墨、收缩与扩边。",
        steps: ["选择面料与图稿。", "调整普通区域与 K 黑区域白墨量。", "设置收缩或扩边并生成文件。"],
        media: {
          id: "software-zh-runtime-update-dtg-parameter-controls",
          posterId: "software-zh-runtime-update-posters-dtg-parameter-controls",
          alt: "DTG 白墨参数调整过程",
          caption: "按面料与图稿控制白墨覆盖。",
        }
      },
      {
        title: "检查通道",
        body: "在 Photoshop 中分别查看彩色状态与 W1 通道，确认白墨层覆盖范围。",
        media: {
          id: "software-zh-runtime-update-dtg-photoshop-white-channel",
          alt: "Photoshop 中的 DTG W1 白墨通道",
          caption: "切换至 W1 通道检查白墨层。"
        }
      }
    ]
  },
  {
    slug: "sublimation",
    number: "06",
    title: "热升华智能排版",
    summary: "比较 Quick、Balanced 与 Best，选择适合任务的排版方案。",
    description: "导入 PDF、识别裁片、比较三种排版结果，再分卷并导出 PDF 或 TIFF。",
    sections: [
      {
        title: "生成并比较方案",
        body: "Quick 适合快速预览，Balanced 兼顾准备效率与材料利用，Best 在允许更多计算时间时优先争取更高的材料利用率。",
        steps: ["导入 PDF 并识别裁片。", "依次查看 Quick、Balanced 与 Best。", "结合时间与材料需求选择方案。"],
        media: {
          id: "software-zh-runtime-update-sublimation-layout-workflow",
          posterId: "software-zh-runtime-update-posters-sublimation-layout-workflow",
          alt: "热升华三种排版方案演示",
          caption: "比较 Quick、Balanced 与 Best 的排版结果。",
        }
      },
      {
        title: "分卷与导出",
        body: "确认排版后按生产需要分卷，并导出 PDF 或 TIFF 文件。",
        steps: ["检查裁片方向与间距。", "确认分卷范围。", "导出并检查最终排版文件。"],
        media: {
          id: "software-zh-runtime-update-sublimation-layout-output",
          alt: "热升华裁片排版输出",
          caption: "确认最终裁片排版结果。"
        }
      }
    ]
  },
  {
    slug: "ai",
    number: "07",
    title: "MAIXON AI 工作台",
    summary: "完成印花提取、抠图与结果检查，再进入 DTF 或 DTG。",
    description: "在 MAIXON AI 中导入服装图像，处理印花与背景，并把结果送入后续生产流程。",
    sections: [
      {
        title: "导入与处理",
        body: "导入图像后选择可用的处理功能。MAIXON Lite 与 Pro 的具体入口以账号当前权益为准。",
        steps: ["导入需要处理的图像。", "选择印花提取、抠图或可用的高清修复功能。", "等待处理完成并查看结果。"],
        media: {
          id: "software-zh-runtime-update-ai-workspace-source",
          alt: "MAIXON AI 工作台图像导入界面",
          caption: "从工作台导入需要处理的图像。"
        }
      },
      {
        title: "比较与继续生产",
        body: "通过对比视图检查图案、背景和边缘处理，再将确认后的图稿送入 DTF 或 DTG。",
        steps: ["对比处理前后结果。", "放大检查边缘与细节。", "确认后选择进入 DTF 或 DTG。"],
        media: {
          id: "software-zh-runtime-update-ai-artwork-extraction-compare",
          posterId: "software-zh-runtime-update-posters-ai-artwork-extraction-compare",
          alt: "MAIXON AI 印花提取前后对比",
          caption: "使用对比视图检查处理结果。",
        }
      }
    ]
  },
  {
    slug: "ai-credits",
    number: "08",
    title: "AI 点数",
    summary: "查看点数用途、余额与单独购买方式。",
    description: "MAIXON AI 点数与软件授权分开计算，可按实际处理需求单独购买。",
    sections: [
      {
        title: "查看与使用",
        body: "登录后可在账号相关页面查看 AI 点数余额。每次处理前请确认当前功能与点数状态。",
        steps: ["登录账号。", "查看可用 AI 点数。", "确认处理完成后再次核对余额。"]
      },
      {
        title: "购买点数",
        body: "AI 点数提供 100、300 与 1000 点方案。购买后使用注册邮箱完成入账。",
        notes: ["完整功能授权不包含 AI 点数；点数价格请以获取授权页面为准。"]
      }
    ]
  },
  {
    slug: "files",
    number: "09",
    title: "文件与输出",
    summary: "按 DTF、DTG 与热升华流程准备和检查文件。",
    description: "不同生产流程使用不同的导入、通道与输出方式，导出前应完成对应检查。",
    sections: [
      {
        title: "DTF / DTG",
        body: "DTF 与 DTG 重点检查彩色内容和 W1 白墨通道。DTF 参数界面可设置 300 PPI。",
        steps: ["核对尺寸与图稿方向。", "检查 CMYK / W1 通道。", "确认文件能够继续进入生产流程。"]
      },
      {
        title: "热升华",
        body: "热升华流程可导入 PDF，完成裁片排版与分卷后导出 PDF 或 TIFF。",
        notes: ["导出后请重新打开文件，检查裁片、页面与分卷范围。"]
      }
    ]
  },
  {
    slug: "appearance",
    number: "10",
    title: "外观与显示",
    summary: "根据工作环境切换浅色或深色显示。",
    description: "选择更适合当前屏幕与环境光线的界面外观，功能与文件不会因此改变。",
    sections: [
      {
        title: "切换外观",
        body: "在软件外观入口选择浅色或深色模式。",
        steps: ["打开外观设置。", "选择浅色或深色。", "返回工作区检查文字、预览与参数是否清晰。"]
      },
      {
        title: "显示建议",
        body: "长时间查看深色图稿时可尝试深色界面；明亮环境下可使用浅色界面。以读数清晰和操作准确为优先。"
      }
    ]
  },
  {
    slug: "purchase",
    number: "11",
    title: "购买与付款",
    summary: "确认方案、扫码付款并提交注册邮箱完成开通。",
    description: "购买前先核对授权或 AI 点数方案，再按四个步骤完成开通。",
    sections: [
      {
        title: "购买流程",
        body: "联系客服确认方案后，使用获取授权页中的支付宝或微信收款二维码付款。",
        steps: ["联系客服确认所需方案。", "扫描明确标注的收款二维码付款。", "发送付款截图与注册邮箱。", "在“我的账号”中刷新状态。"]
      },
      {
        title: "付款前确认",
        body: "联系二维码只用于发起对话，收款二维码只用于付款。扫码前请核对页面标题与二维码用途。"
      }
    ]
  },
  {
    slug: "faq",
    number: "12",
    title: "常见问题",
    summary: "快速处理登录、授权、点数、文件与联系问题。",
    description: "以下答案适用于常见操作；如仍未解决，请携带必要信息联系支持。",
    sections: [
      {
        title: "授权没有更新怎么办？",
        body: "确认登录的是购买时提供的注册邮箱，然后进入“我的账号”刷新状态。若仍未更新，请发送付款截图与注册邮箱给客服。"
      },
      {
        title: "AI 点数包含在软件授权里吗？",
        body: "不包含。AI 点数与完整功能授权、永久模块授权分开购买。"
      },
      {
        title: "为什么要检查 W1 通道？",
        body: "W1 用于查看白墨层的输出范围。导出前检查彩色内容与 W1，可以更早发现覆盖范围是否符合图稿。"
      },
      {
        title: "联系支持前准备什么？",
        body: "请准备软件版本、注册邮箱、问题发生步骤、提示内容，以及必要的界面截图。不要发送账号密码。"
      }
    ]
  }
];

const enTopics: GuideTopic[] = [
  {
    slug: "install",
    number: "01",
    title: "Install and first launch",
    summary: "Download, install and complete the essential first-launch checks.",
    description: "Start with the official installer, then verify first launch, sign-in and the working environment.",
    sections: [
      { title: "Get the installer", body: "Open the MAIXON Download page for the Windows 10 / 11 installer.", steps: ["Run the installer after download.", "Follow the installation prompts.", "Confirm that the computer is online before first launch."] },
      { title: "First launch", body: "Open MAIXON TOOL V6.2, enter the account area and confirm that the interface loads correctly.", notes: ["If installation or launch fails, record the on-screen message and software version before contacting support."] }
    ]
  },
  {
    slug: "account",
    number: "02",
    title: "Account and sign-in",
    summary: "Register, sign in and review the current status under My Account.",
    description: "Your account connects software licensing, AI credits and current access status.",
    sections: [
      { title: "Register and sign in", body: "Register with an email address you can access. Use that same registered email when purchasing a license.", steps: ["Create the account with your email.", "Sign in and open My Account.", "Check the email and current license status."] },
      { title: "Account status", body: "After a license or AI credits are activated, refresh My Account to load the latest status.", notes: ["Never send your password. Support only needs the registered email for account matching."] }
    ]
  },
  {
    slug: "authorization",
    number: "03",
    title: "Licensing and activation",
    summary: "Choose a license, submit the purchase details and refresh activation.",
    description: "Select the modules needed for production and activate them with the registered email.",
    sections: [
      { title: "Choose a license", body: "Choose a timed full-function license or permanent DTF, DTG and Sublimation modules. MAIXON AI credits are purchased separately.", steps: ["Confirm the modules and duration you need.", "Verify the price on the Get a license page.", "Contact support and provide the registered email."] },
      { title: "Complete activation", body: "After payment, send the payment screenshot and registered email to support. Refresh My Account after activation is confirmed.", notes: ["Before payment, confirm that you are scanning a payment QR code, not a contact QR code."] }
    ]
  },
  {
    slug: "dtf",
    number: "04",
    title: "DTF workflow",
    summary: "Set artwork, white-ink and layout parameters before output.",
    description: "Prepare artwork size, resolution, W1 settings and layout, then verify the color and white-ink output.",
    sections: [
      { title: "Prepare the job", body: "Import the artwork, set its size, resolution, W1 controls and spacing, then choose the layout needed for the job.", steps: ["Confirm artwork size and orientation.", "Set the required resolution and W1 controls.", "Choose a single-artwork or multi-artwork layout."], media: { id: "software-zh-runtime-update-dtf-parameter-tour", posterId: "software-zh-runtime-update-posters-dtf-parameter-tour", alt: "DTF parameter and interface walkthrough", caption: "Set size, resolution, W1 and layout parameters." } },
      { title: "Verify output", body: "Check the color artwork and white-ink channel before handing the file to the next production step.", steps: ["Review color content.", "Inspect the W1 white-ink coverage.", "Confirm the file is ready for the next stage."] }
    ]
  },
  {
    slug: "dtg",
    number: "05",
    title: "DTG workflow",
    summary: "Adjust white ink for the fabric and verify the output channels.",
    description: "Control white-ink coverage for normal and dark areas, then check the production file.",
    sections: [
      { title: "Adjust white ink", body: "Choose the artwork and fabric condition, then adjust white-ink coverage, contraction or expansion as required.", steps: ["Select the artwork and fabric condition.", "Adjust white ink for normal and dark areas.", "Generate the production file."], media: { id: "software-zh-runtime-update-dtg-parameter-controls", posterId: "software-zh-runtime-update-posters-dtg-parameter-controls", alt: "DTG white-ink parameter controls", caption: "Control white-ink coverage for the fabric and artwork." } },
      { title: "Check channels", body: "Review the color state and W1 channel separately to confirm the intended white-ink coverage." }
    ]
  },
  {
    slug: "sublimation",
    number: "06",
    title: "Sublimation nesting",
    summary: "Compare Quick, Balanced and Best before selecting an export.",
    description: "Import a PDF, identify pieces, compare three nesting options, then split rolls and export PDF or TIFF.",
    sections: [
      { title: "Compare options", body: "Quick supports fast evaluation, Balanced balances preparation speed and material use, and Best prioritizes material utilization when more calculation time is acceptable.", steps: ["Import the PDF and identify pieces.", "Review Quick, Balanced and Best.", "Choose an option based on time and material priorities."], media: { id: "software-zh-runtime-update-sublimation-layout-workflow", posterId: "software-zh-runtime-update-posters-sublimation-layout-workflow", alt: "Sublimation layout comparison", caption: "Compare Quick, Balanced and Best layout results." } },
      { title: "Split and export", body: "Inspect orientation and spacing, set the roll split, then export the selected result as PDF or TIFF." }
    ]
  },
  {
    slug: "ai",
    number: "07",
    title: "MAIXON AI workspace",
    summary: "Extract artwork, remove backgrounds and route approved results to DTF or DTG.",
    description: "Bring a garment image into MAIXON AI, process the artwork and continue into production after review.",
    sections: [
      { title: "Import and process", body: "Import an image and choose an available extraction, background-removal or enhancement function. MAIXON Lite and Pro entries depend on current account access.", steps: ["Import the source image.", "Choose an available processing function.", "Wait for completion and review the result."], media: { id: "software-en-ai", alt: "MAIXON AI workspace in English", caption: "Work with artwork in the English MAIXON AI interface." } },
      { title: "Review and continue", body: "Compare the result, inspect edges and details, then send the approved artwork into DTF or DTG.", steps: ["Compare the original and result.", "Zoom in to inspect edges.", "Continue to DTF or DTG."], media: { id: "software-zh-runtime-update-ai-artwork-extraction-compare", posterId: "software-zh-runtime-update-posters-ai-artwork-extraction-compare", alt: "MAIXON AI artwork extraction comparison", caption: "Use the comparison view to inspect the processed result." } }
    ]
  },
  {
    slug: "ai-credits",
    number: "08",
    title: "AI credits",
    summary: "Understand credit usage, balance checks and separate purchases.",
    description: "MAIXON AI credits are separate from the software license and can be purchased for actual processing needs.",
    sections: [
      { title: "Check and use credits", body: "Sign in and review the current AI credit balance before processing.", steps: ["Sign in to the account.", "Check available AI credits.", "Review the balance after processing."] },
      { title: "Buy credits", body: "AI credits are available in 100, 300 and 1,000 credit packages and are added using the registered email.", notes: ["Full-function licenses do not include AI credits. See the Get a license page for current CNY pricing."] }
    ]
  },
  {
    slug: "files",
    number: "09",
    title: "Files and output",
    summary: "Prepare and verify files for DTF, DTG and Sublimation workflows.",
    description: "Each workflow has its own input, channel and output checks before production.",
    sections: [
      { title: "DTF and DTG", body: "Review color content and the W1 white-ink channel. DTF resolution can be set in the workflow parameters.", steps: ["Check size and orientation.", "Inspect color and W1 output.", "Confirm the file can continue into production."] },
      { title: "Sublimation", body: "Import PDF artwork, complete nesting and roll splitting, then export PDF or TIFF.", notes: ["Reopen the exported file and inspect pieces, pages and roll boundaries."] }
    ]
  },
  {
    slug: "appearance",
    number: "10",
    title: "Appearance and display",
    summary: "Choose a light or dark interface for the working environment.",
    description: "Interface appearance can change for viewing comfort without changing files or functions.",
    sections: [
      { title: "Switch appearance", body: "Open appearance settings and select the light or dark interface.", steps: ["Open appearance settings.", "Choose light or dark.", "Return to the workspace and verify that text, previews and parameters are clear."] },
      { title: "Display guidance", body: "Try dark mode for extended work with dark artwork, or light mode in a bright room. Prioritize readable values and accurate operation." }
    ]
  },
  {
    slug: "purchase",
    number: "11",
    title: "Purchase and payment",
    summary: "Confirm a plan, make payment and submit the registered email.",
    description: "Verify the license or AI credit package before completing the four activation steps.",
    sections: [
      { title: "Purchase steps", body: "Confirm the plan with support, then use the clearly labelled Alipay or WeChat Pay QR code on the Get a license page.", steps: ["Contact support and confirm the plan.", "Scan a payment QR code.", "Send the payment screenshot and registered email.", "Refresh the status in My Account."] },
      { title: "Before you pay", body: "Contact QR codes start a conversation. Payment QR codes accept payment. Always verify the page heading and QR purpose before scanning." }
    ]
  },
  {
    slug: "faq",
    number: "12",
    title: "Frequently asked questions",
    summary: "Resolve common account, license, credit, file and support questions.",
    description: "Use these quick answers first, then contact support with the required details if the issue remains.",
    sections: [
      { title: "My license has not updated. What should I do?", body: "Confirm that you are signed in with the registered email used for purchase, then refresh My Account. If it still does not update, send the payment screenshot and registered email to support." },
      { title: "Are AI credits included in a software license?", body: "No. AI credits are purchased separately from full-function and permanent module licenses." },
      { title: "Why should I check the W1 channel?", body: "W1 shows the intended white-ink coverage. Reviewing color and W1 output before export helps identify coverage issues earlier." },
      { title: "What should I prepare before contacting support?", body: "Prepare the software version, registered email, steps that produced the issue, the on-screen message and relevant screenshots. Never send your password." }
    ]
  }
];

export const guideCopy: Record<Locale, GuideIndexCopy> = {
  "zh-CN": {
    label: "使用说明",
    title: "找到任务，直接开始。",
    description: "从安装、账号与授权，到 DTF、DTG、热升华和 MAIXON AI 的完整操作入口。",
    open: "查看说明",
    back: "返回使用说明",
    topics: zhTopics
  },
  en: {
    label: "Usage guides",
    title: "Find the task. Start clearly.",
    description: "Guidance for setup, accounts, licensing, DTF, DTG, Sublimation and MAIXON AI workflows.",
    open: "Open guide",
    back: "Back to guides",
    topics: enTopics
  }
};

export const contactCopy = {
  "zh-CN": {
    label: "联系支持",
    title: "直接联系 MAIXON。",
    description: "安装、账号、软件操作或授权问题，可通过电话、微信或 WhatsApp 联系我们。",
    phoneLabel: "电话",
    phoneDisplay: "+86 15954870827",
    phoneHref: "tel:+8615954870827",
    qrTitle: "联系二维码",
    qrDescription: "以下二维码只用于联系，不用于付款。",
    wechat: "微信联系",
    whatsapp: "WhatsApp 联系",
    prepareTitle: "联系前请准备",
    prepare: ["MAIXON TOOL 版本号", "注册邮箱", "问题发生的操作步骤", "提示内容或必要的界面截图"],
    privacy: "请勿发送账号密码。"
  },
  en: {
    label: "Contact support",
    title: "Talk directly with MAIXON.",
    description: "For installation, account, workflow or licensing questions, contact us by phone, WeChat or WhatsApp.",
    phoneLabel: "Phone",
    phoneDisplay: "+86 15954870827",
    phoneHref: "tel:+8615954870827",
    qrTitle: "Contact QR codes",
    qrDescription: "These QR codes are for contacting support only. They do not accept payment.",
    wechat: "WeChat contact",
    whatsapp: "WhatsApp contact",
    prepareTitle: "Please prepare",
    prepare: ["MAIXON TOOL version", "Registered email", "Steps that produced the issue", "On-screen message or relevant screenshots"],
    privacy: "Never send your account password."
  }
} as const;

export const authorizationCopy = {
  "zh-CN": {
    label: "获取授权",
    title: "选择适合生产的授权。",
    description: "软件授权与 MAIXON AI 点数分开购买。以下金额均为人民币。",
    currencyNote: "人民币 / ¥",
    fullTitle: "完整功能授权",
    fullDescription: "包含 DTF、DTG 与热升华；不包含 AI 点数。",
    fullPlans: [
      ["月付", "¥159"], ["季付", "¥459"], ["年付", "¥1,699"], ["永久", "¥2,899"]
    ],
    modulesTitle: "永久模块授权",
    modulePlans: [
      ["DTF", "¥1,299"], ["DTG", "¥1,299"], ["热升华", "¥1,699"], ["任意两个模块", "¥2,388"], ["三个模块", "¥2,899"]
    ],
    aiTitle: "MAIXON AI 点数",
    aiDescription: "AI 点数单独购买，不包含在软件授权中。",
    aiPlans: [["100 点", "¥29"], ["300 点", "¥79"], ["1,000 点", "¥229"]],
    processLabel: "开通流程",
    processTitle: "四步完成购买与开通。",
    steps: [
      ["联系确认", "通过电话、微信或 WhatsApp 联系我们，确认授权或点数方案。"],
      ["扫码付款", "扫描下方明确标注的支付宝或微信收款二维码。"],
      ["提交资料", "向客服发送付款截图和 MAIXON 注册邮箱。"],
      ["刷新状态", "开通后进入“我的账号”，刷新授权或点数状态。"]
    ],
    paymentTitle: "付款二维码",
    paymentDescription: "以下二维码只用于付款。扫码前请核对支付平台与金额。",
    alipay: "支付宝收款",
    wechatPay: "微信收款",
    registeredEmail: "必须提供软件注册邮箱，才能将授权或点数添加到正确账号。",
    contactLink: "先联系支持"
  },
  en: {
    label: "Get a license",
    title: "Choose access for your production.",
    description: "Software licenses and MAIXON AI credits are purchased separately. All prices are in CNY.",
    currencyNote: "CNY / ¥",
    fullTitle: "Full-function license",
    fullDescription: "Includes DTF, DTG and Sublimation. AI credits are not included.",
    fullPlans: [
      ["Monthly", "¥159"], ["Quarterly", "¥459"], ["Yearly", "¥1,699"], ["Permanent", "¥2,899"]
    ],
    modulesTitle: "Permanent module licenses",
    modulePlans: [
      ["DTF", "¥1,299"], ["DTG", "¥1,299"], ["Sublimation", "¥1,699"], ["Any two modules", "¥2,388"], ["All three modules", "¥2,899"]
    ],
    aiTitle: "MAIXON AI credits",
    aiDescription: "AI credits are purchased separately and are not included in software licenses.",
    aiPlans: [["100 credits", "¥29"], ["300 credits", "¥79"], ["1,000 credits", "¥229"]],
    processLabel: "Activation process",
    processTitle: "Purchase and activate in four steps.",
    steps: [
      ["Confirm with support", "Contact us by phone, WeChat or WhatsApp and confirm the license or credit package."],
      ["Pay by QR code", "Scan the clearly labelled Alipay or WeChat Pay QR code below."],
      ["Send purchase details", "Send the payment screenshot and your MAIXON registered email to support."],
      ["Refresh status", "After activation, open My Account and refresh the license or credit status."]
    ],
    paymentTitle: "Payment QR codes",
    paymentDescription: "These QR codes accept payment only. Confirm the payment service and amount before scanning.",
    alipay: "Alipay payment",
    wechatPay: "WeChat Pay",
    registeredEmail: "Your software registration email is required so the license or credits are added to the correct account.",
    contactLink: "Contact support first"
  }
} as const;

export const qrAssets = {
  wechatContact: {
    src: "/support/qr/wechat-contact.jpg",
    width: 643,
    height: 629
  },
  whatsappContact: {
    src: "/support/qr/whatsapp-contact.jpg",
    width: 574,
    height: 554
  },
  alipayPayment: {
    src: "/support/qr/alipay-payment.jpg",
    width: 828,
    height: 831
  },
  wechatPayment: {
    src: "/support/qr/wechat-payment.jpg",
    width: 376,
    height: 383
  }
} as const;
