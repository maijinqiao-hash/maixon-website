import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputRoot = path.join(root, "public", "media");
const outputRoot = path.join(root, "public", "media-responsive");
const manifestPath = path.join(root, "src", "data", "media-manifest.json");
const widths = [640, 1024, 1600];

const videoMetadata = {
  "software/zh/videos/demo_ai_zh_v59.mp4": { width: 1920, height: 1216, duration: 23 },
  "software/zh/videos/demo_dtf_zh_v59.mp4": { width: 1920, height: 1216, duration: 21 },
  "software/zh/videos/demo_overall_zh_v59.mp4": { width: 1920, height: 1216, duration: 23 },
  "software/zh/videos/demo_sublimation_zh_v59.mp4": { width: 1920, height: 1216, duration: 38 },
  "software/zh/runtime-update/dtf/multi-layout.mp4": { width: 1600, height: 1008, duration: 59.334 },
  "software/zh/runtime-update/dtf/one-meter-layout.mp4": { width: 1600, height: 1008, duration: 49.434 },
  "software/zh/runtime-update/dtf/parameter-tour.mp4": { width: 1600, height: 1008, duration: 12.667 },
  "software/zh/runtime-update/dtf/single-artwork.mp4": { width: 1600, height: 1010, duration: 25.467 },
  "software/zh/runtime-update/dtf/single-row-layout.mp4": { width: 1600, height: 1002, duration: 57.1 },
  "software/zh/runtime-update/dtg/parameter-controls.mp4": { width: 1600, height: 1008, duration: 20.1 },
  "software/zh/runtime-update/sublimation/layout-workflow.mp4": { width: 1600, height: 1010, duration: 54.7 },
  "software/zh/runtime-update/ai/artwork-extraction-compare.mp4": { width: 778, height: 990, duration: 10.3 },
  "software/zh/runtime-update/ai/background-removal-compare.mp4": { width: 1000, height: 1048, duration: 9.4 },
  "software/zh/runtime-update/ai/continue-to-dtg.mp4": { width: 1600, height: 1008, duration: 54.367 },
  "hardware/real/videos/dtf604-machine-operation.mp4": { width: 1080, height: 1440, duration: 11.216 },
  "hardware/real/videos/dtf608-print-closeup.mp4": { width: 720, height: 1280, duration: 25.65 },
  "hardware/real/videos/dtf608-production-wide.mp4": { width: 720, height: 1280, duration: 21.175 },
  "hardware/real/videos/dtf608-production-close.mp4": { width: 720, height: 1280, duration: 17.002 },
  "hardware/real/videos/shared-output-demo.mp4": { width: 1080, height: 1080, duration: 10.5 },
  "hardware/real/videos/shared-quality-demo.mp4": { width: 720, height: 1280, duration: 15.002 }
};

const hardwareRealMedia = {
  "hardware/real/images/dtf604-machine.webp": {
    id: "hw-real-dtf604-machine-overview", product_area: "hardware-dtf604", machine_model: "DTF604",
    media_role: "machine-overview", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "3 / 4", object_fit: "contain", object_position: "50% 50%"
  },
  "hardware/real/images/dtf608-machine.webp": {
    id: "hw-real-dtf608-machine-overview", product_area: "hardware-dtf608", machine_model: "DTF608",
    media_role: "machine-overview", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "37 / 27", object_fit: "contain", object_position: "50% 50%"
  },
  "hardware/real/images/garment-hoodie.webp": {
    id: "hw-real-garment-hoodie", product_area: "hardware-shared-garment", machine_model: "shared-dtf",
    media_role: "finished-garment", shared: true, public_safe: false, source_type: "production_output",
    aspect_ratio: "3 / 4", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/images/garment-sweatshirt.webp": {
    id: "hw-real-garment-sweatshirt", product_area: "hardware-shared-garment", machine_model: "shared-dtf",
    media_role: "finished-garment", shared: true, public_safe: false, source_type: "production_output",
    aspect_ratio: "800 / 869", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/posters/dtf604-machine-operation.webp": {
    id: "hw-real-dtf604-machine-operation-poster", product_area: "hardware-dtf604", machine_model: "DTF604",
    media_role: "video-poster", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "3 / 4", object_fit: "contain", object_position: "50% 50%"
  },
  "hardware/real/posters/dtf608-print-closeup.webp": {
    id: "hw-real-dtf608-print-closeup-poster", product_area: "hardware-dtf608", machine_model: "DTF608",
    media_role: "video-poster", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "9 / 16", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/posters/dtf608-production-wide.webp": {
    id: "hw-real-dtf608-production-wide-poster", product_area: "hardware-dtf608", machine_model: "DTF608",
    media_role: "video-poster", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "9 / 16", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/posters/dtf608-production-close.webp": {
    id: "hw-real-dtf608-production-close-poster", product_area: "hardware-dtf608", machine_model: "DTF608",
    media_role: "video-poster", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "9 / 16", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/posters/shared-output-demo.webp": {
    id: "hw-real-shared-output-demo-poster", product_area: "hardware-shared-quality", machine_model: "shared",
    media_role: "video-poster", shared: true, public_safe: false, source_type: "production_output",
    aspect_ratio: "1 / 1", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/posters/shared-quality-demo.webp": {
    id: "hw-real-shared-quality-demo-poster", product_area: "hardware-shared-quality", machine_model: "shared",
    media_role: "video-poster", shared: true, public_safe: false, source_type: "production_output",
    aspect_ratio: "9 / 16", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/videos/dtf608-print-closeup.mp4": {
    id: "hw-real-dtf608-print-closeup", product_area: "hardware-dtf608", machine_model: "DTF608",
    media_role: "printing-closeup", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "9 / 16", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/videos/dtf604-machine-operation.mp4": {
    id: "hw-real-dtf604-machine-operation", product_area: "hardware-dtf604", machine_model: "DTF604",
    media_role: "machine-operation", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "3 / 4", object_fit: "contain", object_position: "50% 50%"
  },
  "hardware/real/videos/dtf608-production-wide.mp4": {
    id: "hw-real-dtf608-production-wide", product_area: "hardware-dtf608", machine_model: "DTF608",
    media_role: "continuous-production", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "9 / 16", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/videos/dtf608-production-close.mp4": {
    id: "hw-real-dtf608-production-close", product_area: "hardware-dtf608", machine_model: "DTF608",
    media_role: "production-detail", shared: false, public_safe: false, source_type: "official",
    aspect_ratio: "9 / 16", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/videos/shared-output-demo.mp4": {
    id: "hw-real-shared-output-demo", product_area: "hardware-shared-quality", machine_model: "shared",
    media_role: "finished-output-detail", shared: true, public_safe: false, source_type: "production_output",
    aspect_ratio: "1 / 1", object_fit: "cover", object_position: "50% 50%"
  },
  "hardware/real/videos/shared-quality-demo.mp4": {
    id: "hw-real-shared-quality-demo", product_area: "hardware-shared-quality", machine_model: "shared",
    media_role: "color-and-detail", shared: true, public_safe: false, source_type: "production_output",
    aspect_ratio: "9 / 16", object_fit: "cover", object_position: "50% 50%"
  }
};

const sourceHashes = {
  "hardware/dtf604.webp": "4d854045d27e9451a68020111dfbf412a10a090533327e22b3916ee8ae98a2db",
  "hardware/dtg604.webp": "599c673fc0e7d0f5dc7711feb9f30a45e79d5eb7e7f58635e20fbba467119db8",
  "hardware/dtf608.webp": "70e10955f7ebc37cb375524a012ee9f309fe1bba9506d95c4a763988da1a9a27",
  "hardware/oven604.webp": "40a231fccc9f402abc90bd99205cbeb3a8f0b09b9c0a230c1102c6ad357da6f7"
};

const altText = {
  "hardware/dtf604.webp": { "zh-CN": "MAIXON DTF604 打印系统", en: "MAIXON DTF604 printing system" },
  "hardware/dtg604.webp": { "zh-CN": "MAIXON DFG604 白墨烫画烫金系统", en: "MAIXON DFG604 transfer and foil finishing system" },
  "hardware/dtf608.webp": { "zh-CN": "MAIXON DTF608 打印系统", en: "MAIXON DTF608 printing system" },
  "hardware/oven604.webp": { "zh-CN": "MAIXON OVEN604 撒粉烘干系统", en: "MAIXON OVEN604 powder and curing system" },
  "hardware/wf7610.webp": { "zh-CN": "Epson WF7610 喷头", en: "Epson WF7610 printhead" },
  "software/en/home.png": { "zh-CN": "MAIXON V5.9 英文生产概览", en: "MAIXON V5.9 Production Overview" },
  "software/en/dtf.png": { "zh-CN": "MAIXON V5.9 英文 DTF 工作区", en: "MAIXON V5.9 DTF workspace" },
  "software/en/sublimation.png": { "zh-CN": "MAIXON V5.9 英文热升华工作区", en: "MAIXON V5.9 Sublimation workspace" },
  "software/en/ai.png": { "zh-CN": "MAIXON V5.9 英文 AI 工作区", en: "MAIXON V5.9 AI workspace" },
  "software/zh/runtime-update/dtf/multi-layout.mp4": { "zh-CN": "DTF 多图自动排版演示" },
  "software/zh/runtime-update/dtf/one-meter-layout.mp4": { "zh-CN": "DTF 一米长度自动排版演示" },
  "software/zh/runtime-update/dtf/parameter-tour.mp4": { "zh-CN": "DTF 参数设置界面" },
  "software/zh/runtime-update/dtf/single-artwork.mp4": { "zh-CN": "DTF 单图制图演示" },
  "software/zh/runtime-update/dtf/single-row-layout.mp4": { "zh-CN": "DTF 单图按行排版演示" },
  "software/zh/runtime-update/dtf/artwork-source.webp": { "zh-CN": "Photoshop 中的 DTF 彩色图稿与通道面板" },
  "software/zh/runtime-update/dtf/white-channel-output.webp": { "zh-CN": "Photoshop 中的 DTF W1 白墨通道结果" },
  "software/zh/runtime-update/dtg/parameter-controls.mp4": { "zh-CN": "DTG 白墨参数控制演示" },
  "software/zh/runtime-update/dtg/photoshop-color-state.webp": { "zh-CN": "DTG 图稿的 CMYK 通道状态" },
  "software/zh/runtime-update/dtg/photoshop-white-channel.webp": { "zh-CN": "DTG 图稿的 W1 白墨通道状态" },
  "software/zh/runtime-update/sublimation/layout-workflow.mp4": { "zh-CN": "热升华 Quick、Balanced 与 Best 排版方案演示" },
  "software/zh/runtime-update/sublimation/garment-pieces-source.webp": { "zh-CN": "热升华球衣裁片输入图稿" },
  "software/zh/runtime-update/sublimation/layout-output.webp": { "zh-CN": "热升华裁片排版输出" },
  "software/zh/runtime-update/ai/workspace-source.webp": { "zh-CN": "MAIXON AI 图案处理工作区" },
  "software/zh/runtime-update/ai/extraction-progress.webp": { "zh-CN": "MAIXON AI 印花提取处理中" },
  "software/zh/runtime-update/ai/extraction-complete.webp": { "zh-CN": "MAIXON AI 印花提取完成提示" },
  "software/zh/runtime-update/ai/background-removal-progress.webp": { "zh-CN": "MAIXON AI 一键抠图处理中" },
  "software/zh/runtime-update/ai/workflow-routing.webp": { "zh-CN": "MAIXON AI 结果进入 DTF、DTG 或自动排版的操作入口" },
  "software/zh/runtime-update/ai/artwork-extraction-compare.mp4": { "zh-CN": "MAIXON AI 印花提取前后对比" },
  "software/zh/runtime-update/ai/background-removal-compare.mp4": { "zh-CN": "MAIXON AI 一键抠图前后对比" },
  "software/zh/runtime-update/ai/continue-to-dtg.mp4": { "zh-CN": "MAIXON AI 结果继续进入 DTG 的操作演示" },
  "hardware/real/images/dtf604-machine.webp": { "zh-CN": "DTF604 白墨烫画生产系统", en: "DTF604 DTF production system" },
  "hardware/real/images/dtf608-machine.webp": { "zh-CN": "DTF608 八头高速生产系统", en: "DTF608 eight-head high-speed production system" },
  "hardware/real/images/garment-hoodie.webp": { "zh-CN": "灰色连帽衫上的印花成品应用", en: "Finished print application on a grey hoodie" },
  "hardware/real/images/garment-sweatshirt.webp": { "zh-CN": "黑色卫衣上的大幅印花成品应用", en: "Large finished print application on a black sweatshirt" },
  "hardware/real/posters/dtf604-machine-operation.webp": { "zh-CN": "DTF604 标准生产视频封面", en: "DTF604 standard production video poster" },
  "hardware/real/posters/dtf608-print-closeup.webp": { "zh-CN": "DTF608 打印近景视频封面", en: "DTF608 printing close-up video poster" },
  "hardware/real/posters/dtf608-production-wide.webp": { "zh-CN": "DTF608 连续生产视频封面", en: "DTF608 continuous production video poster" },
  "hardware/real/posters/dtf608-production-close.webp": { "zh-CN": "DTF608 走料与打印视频封面", en: "DTF608 media travel and printing video poster" },
  "hardware/real/posters/shared-output-demo.webp": { "zh-CN": "印花成品细节视频封面", en: "Finished print detail video poster" },
  "hardware/real/posters/shared-quality-demo.webp": { "zh-CN": "色彩与图案细节视频封面", en: "Color and graphic detail video poster" },
  "hardware/real/videos/dtf604-machine-operation.mp4": { "zh-CN": "DTF604 标准生产系统运行与走料近景", en: "DTF604 standard production system operation and media travel" },
  "hardware/real/videos/dtf608-print-closeup.mp4": { "zh-CN": "DTF608 打印头连续工作的近景", en: "Close view of the DTF608 print carriage in continuous operation" },
  "hardware/real/videos/dtf608-production-wide.mp4": { "zh-CN": "DTF608 连续打印与走料过程", en: "DTF608 continuous printing and media travel" },
  "hardware/real/videos/dtf608-production-close.mp4": { "zh-CN": "DTF608 打印与输出路径近景", en: "Close view of DTF608 printing and the output path" },
  "hardware/real/videos/shared-output-demo.mp4": { "zh-CN": "印花成品表面的色彩与细节", en: "Color and detail across a finished print surface" },
  "hardware/real/videos/shared-quality-demo.mp4": { "zh-CN": "印花图案的颜色层次、边缘与表面细节", en: "Color layers, edges and surface detail in finished print graphics" }
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

function slug(relativePath) {
  return relativePath
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function localeFor(relativePath) {
  if (relativePath.includes("/zh/")) return "zh-CN";
  if (relativePath.includes("/en/")) return "en";
  return "shared";
}

function productAreaFor(relativePath) {
  if (hardwareRealMedia[relativePath]) return hardwareRealMedia[relativePath].product_area;
  if (relativePath.startsWith("hardware/")) return "hardware";
  if (relativePath.startsWith("brand/")) return "brand";
  if (relativePath.startsWith("proofs/")) return "production-proof";
  const parts = relativePath.split("/");
  if (parts[0] === "software") {
    const fileName = parts.at(-1) ?? "";
    if (parts[1] === "en") {
      const area = fileName.replace(/\.[^.]+$/, "");
      return area.startsWith("purchase") ? "purchase" : area;
    }
    if (parts[2] === "videos" || parts[2] === "posters") {
      if (fileName.includes("sublimation")) return "sublimation";
      if (fileName.includes("dtf")) return "dtf";
      if (fileName.includes("ai")) return "ai";
      return "home";
    }
    if (parts[2] === "runtime-update") {
      if (parts[3] === "posters") {
        if (fileName.startsWith("dtf-")) return "dtf";
        if (fileName.startsWith("dtg-")) return "dtg";
        if (fileName.startsWith("sublimation-")) return "sublimation";
        if (fileName.startsWith("ai-")) return "ai";
      }
      return parts[3] ?? "software";
    }
    return parts[2] ?? "software";
  }
  return "other";
}

function provenanceFor(relativePath) {
  if (hardwareRealMedia[relativePath]) {
    return {
      source_type: hardwareRealMedia[relativePath].source_type,
      status: "review_pending",
      source_package: "官网机器视频素材",
      replaceable: false,
      rights_clearance: "pending",
      ui_brand_consistency: hardwareRealMedia[relativePath].source_type === "official" ? "pending_review" : "not_applicable"
    };
  }
  if (relativePath.startsWith("software/zh/runtime-update/")) {
    const isArtworkSource = relativePath.endsWith("sublimation/garment-pieces-source.webp");
    const isProductionOutput = relativePath.endsWith("sublimation/layout-output.webp");
    return {
      source_type: isArtworkSource
        ? "artwork_source"
        : isProductionOutput
          ? "production_output"
          : "runtime_capture",
      status: "review_pending",
      source_package: "官网素材更新包 / 官网素材更新包_视频加速版",
      replaceable: true,
      rights_clearance: "pending",
      ui_brand_consistency: isArtworkSource || isProductionOutput ? "not_applicable" : "pending_review"
    };
  }
  if (relativePath.startsWith("hardware/")) {
    return {
      source_type: "generated",
      status: "provisional",
      source_package: "legacy-maixon-v59-production-reference",
      replaceable: true
    };
  }
  if (relativePath.startsWith("brand/")) {
    return {
      source_type: "official",
      status: "approved",
      source_package: "MAIXON_V5.9_WEBSITE_REAL_ASSETS_COMPLETE",
      replaceable: false
    };
  }
  if (relativePath.includes("/dtg/") || relativePath.endsWith("dtg-output.png")) {
    return {
      source_type: "runtime_capture",
      status: "approved",
      source_package: "MAIXON_V5.9_WEBSITE_DTG_MISSING_MEDIA_ADDON",
      replaceable: true
    };
  }
  return {
    source_type: relativePath.startsWith("proofs/") ? "production_output" : "runtime_capture",
    status: "approved",
    source_package: "MAIXON_V5.9_WEBSITE_MISSING_ASSETS_ONLY",
    replaceable: true
  };
}

function frameFor(relativePath, width, height) {
  if (hardwareRealMedia[relativePath]) {
    const { aspect_ratio, object_fit, object_position } = hardwareRealMedia[relativePath];
    return { aspect_ratio, object_fit, object_position };
  }
  if (relativePath.startsWith("software/zh/runtime-update/")) {
    return { aspect_ratio: "16 / 10", object_fit: "contain", object_position: "50% 50%" };
  }
  if (relativePath.startsWith("hardware/")) {
    return { aspect_ratio: "4 / 5", object_fit: "contain", object_position: "50% 52%" };
  }
  if (relativePath.includes("sublimation_") || relativePath.includes("sublimation-")) {
    return { aspect_ratio: "5 / 2", object_fit: "cover", object_position: "50% 50%" };
  }
  if (relativePath.startsWith("proofs/")) {
    return { aspect_ratio: width / height > 1.5 ? "5 / 2" : "1 / 1", object_fit: "contain", object_position: "50% 50%" };
  }
  if (relativePath.startsWith("brand/")) {
    return { aspect_ratio: "1 / 1", object_fit: "contain", object_position: "50% 50%" };
  }
  return { aspect_ratio: "16 / 10", object_fit: "cover", object_position: "50% 50%" };
}

async function sha256(filePath) {
  const bytes = await readFile(filePath);
  return createHash("sha256").update(bytes).digest("hex");
}

function mediaIdFor(relativePath) {
  return hardwareRealMedia[relativePath]?.id ?? slug(relativePath);
}

function hardwareRealFieldsFor(relativePath) {
  const media = hardwareRealMedia[relativePath];
  if (!media) return {};
  return {
    machine_model: media.machine_model,
    media_role: media.media_role,
    shared: media.shared,
    public_safe: media.public_safe
  };
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await mkdir(path.dirname(manifestPath), { recursive: true });

const inputFiles = (await walk(inputRoot)).sort();
const records = [];

for (const absolutePath of inputFiles) {
  const relativePath = path.relative(inputRoot, absolutePath).split(path.sep).join("/");
  const extension = path.extname(relativePath).toLowerCase();
  const fileStat = await stat(absolutePath);
  const provenance = provenanceFor(relativePath);
  const sourceHash = await sha256(absolutePath);

  if (extension === ".mp4") {
    const video = videoMetadata[relativePath];
    if (!video) throw new Error(`Missing video metadata for ${relativePath}`);
    records.push({
      id: mediaIdFor(relativePath),
      src: `/media/${relativePath}`,
      srcset: [],
      kind: "video",
      locale: localeFor(relativePath),
      product_area: productAreaFor(relativePath),
      width: video.width,
      height: video.height,
      duration: video.duration,
      bytes: fileStat.size,
      sha256: sourceHash,
      ...provenance,
      ...hardwareRealFieldsFor(relativePath),
      ...frameFor(relativePath, video.width, video.height),
      layout_depends_on_image: false,
      alt: altText[relativePath] ?? null
    });
    continue;
  }

  if (![".png", ".jpg", ".jpeg", ".webp"].includes(extension)) continue;

  const image = sharp(absolutePath, { failOn: "warning" });
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Missing dimensions for ${relativePath}`);
  const responsive = [];
  const responsiveAvif = [];
  const shouldBuildAvif = relativePath.startsWith("software/zh/runtime-update/") || relativePath.startsWith("hardware/real/");

  for (const targetWidth of widths.filter((value) => value < metadata.width)) {
    const targetRelative = relativePath.replace(/\.[^.]+$/, `-${targetWidth}.webp`);
    const targetAbsolute = path.join(outputRoot, targetRelative);
    await mkdir(path.dirname(targetAbsolute), { recursive: true });
    await sharp(absolutePath)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(targetAbsolute);
    responsive.push({
      src: `/media-responsive/${targetRelative}`,
      width: targetWidth
    });

    if (shouldBuildAvif) {
      const avifRelative = relativePath.replace(/\.[^.]+$/, `-${targetWidth}.avif`);
      const avifAbsolute = path.join(outputRoot, avifRelative);
      await mkdir(path.dirname(avifAbsolute), { recursive: true });
      await sharp(absolutePath)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .avif({ quality: 56, effort: 5 })
        .toFile(avifAbsolute);
      responsiveAvif.push({
        src: `/media-responsive/${avifRelative}`,
        width: targetWidth
      });
    }
  }

  const fallbackRelative = relativePath.replace(/\.[^.]+$/, "-full.webp");
  const fallbackAbsolute = path.join(outputRoot, fallbackRelative);
  await mkdir(path.dirname(fallbackAbsolute), { recursive: true });
  await sharp(absolutePath).webp({ quality: 86, effort: 5 }).toFile(fallbackAbsolute);
  responsive.push({ src: `/media-responsive/${fallbackRelative}`, width: metadata.width });

  if (shouldBuildAvif) {
    const avifFallbackRelative = relativePath.replace(/\.[^.]+$/, "-full.avif");
    const avifFallbackAbsolute = path.join(outputRoot, avifFallbackRelative);
    await mkdir(path.dirname(avifFallbackAbsolute), { recursive: true });
    await sharp(absolutePath).avif({ quality: 60, effort: 5 }).toFile(avifFallbackAbsolute);
    responsiveAvif.push({ src: `/media-responsive/${avifFallbackRelative}`, width: metadata.width });
  }

  const originalHash = sourceHashes[relativePath];
  if (originalHash && originalHash !== sourceHash) {
    throw new Error(`Source hash changed for ${relativePath}`);
  }

  records.push({
    id: mediaIdFor(relativePath),
    src: `/media-responsive/${fallbackRelative}`,
    original_src: `/media/${relativePath}`,
    srcset: responsive.sort((a, b) => a.width - b.width),
    srcset_avif: responsiveAvif.sort((a, b) => a.width - b.width),
    kind: "image",
    locale: localeFor(relativePath),
    product_area: productAreaFor(relativePath),
    width: metadata.width,
    height: metadata.height,
    bytes: fileStat.size,
    sha256: sourceHash,
    ...provenance,
    ...hardwareRealFieldsFor(relativePath),
    ...frameFor(relativePath, metadata.width, metadata.height),
    layout_depends_on_image: false,
    alt: altText[relativePath] ?? null
  });
}

const manifest = {
  schema_version: 1,
  policy: {
    generated_media: {
      required_source_type: "generated",
      required_status: "provisional",
      production_release_requires_review: true
    },
    layout: {
      media_frame_required: true,
      layout_depends_on_image_default: false
    },
    rights_clearance: {
      pending_blocks_production_release: true
    }
  },
  assets: records
};

const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
await writeFile(manifestPath, serialized, "utf8");
console.log(`Built ${records.length} media records and responsive AVIF/WebP variants.`);
