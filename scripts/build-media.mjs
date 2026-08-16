import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputRoot = path.join(root, "public", "media");
const outputRoot = path.join(root, "public", "media-responsive");
const manifestPath = path.join(root, "src", "data", "media-manifest.json");
const publicManifestPath = path.join(root, "public", "media-manifest.json");
const widths = [640, 1024, 1600];

const videoMetadata = {
  "software/zh/videos/demo_ai_zh_v59.mp4": { width: 1920, height: 1216, duration: 23 },
  "software/zh/videos/demo_dtf_zh_v59.mp4": { width: 1920, height: 1216, duration: 21 },
  "software/zh/videos/demo_overall_zh_v59.mp4": { width: 1920, height: 1216, duration: 23 },
  "software/zh/videos/demo_sublimation_zh_v59.mp4": { width: 1920, height: 1216, duration: 38 }
};

const sourceHashes = {
  "hardware/dtf604.webp": "4d854045d27e9451a68020111dfbf412a10a090533327e22b3916ee8ae98a2db",
  "hardware/dtg604.webp": "599c673fc0e7d0f5dc7711feb9f30a45e79d5eb7e7f58635e20fbba467119db8",
  "hardware/dtf608.webp": "70e10955f7ebc37cb375524a012ee9f309fe1bba9506d95c4a763988da1a9a27",
  "hardware/oven604.webp": "40a231fccc9f402abc90bd99205cbeb3a8f0b09b9c0a230c1102c6ad357da6f7"
};

const altText = {
  "hardware/dtf604.webp": { "zh-CN": "MAIXON DTF604 设备占位图", en: "Provisional MAIXON DTF604 equipment image" },
  "hardware/dtg604.webp": { "zh-CN": "MAIXON DTG604 设备占位图", en: "Provisional MAIXON DTG604 equipment image" },
  "hardware/dtf608.webp": { "zh-CN": "MAIXON DTF608 设备占位图", en: "Provisional MAIXON DTF608 equipment image" },
  "hardware/oven604.webp": { "zh-CN": "MAIXON OVEN604 设备占位图", en: "Provisional MAIXON OVEN604 equipment image" },
  "hardware/wf7610.webp": { "zh-CN": "Epson WF7610 喷头占位图", en: "Provisional Epson WF7610 printhead image" },
  "software/en/home.png": { "zh-CN": "MAIXON V5.9 英文生产概览", en: "MAIXON V5.9 Production Overview" },
  "software/en/dtf.png": { "zh-CN": "MAIXON V5.9 英文 DTF 工作区", en: "MAIXON V5.9 DTF workspace" },
  "software/en/sublimation.png": { "zh-CN": "MAIXON V5.9 英文热升华工作区", en: "MAIXON V5.9 Sublimation workspace" },
  "software/en/ai.png": { "zh-CN": "MAIXON V5.9 英文 AI 工作区", en: "MAIXON V5.9 AI workspace" }
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
    return parts[2] ?? "software";
  }
  return "other";
}

function provenanceFor(relativePath) {
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
      id: slug(relativePath),
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
  }

  const fallbackRelative = relativePath.replace(/\.[^.]+$/, "-full.webp");
  const fallbackAbsolute = path.join(outputRoot, fallbackRelative);
  await mkdir(path.dirname(fallbackAbsolute), { recursive: true });
  await sharp(absolutePath).webp({ quality: 86, effort: 5 }).toFile(fallbackAbsolute);
  responsive.push({ src: `/media-responsive/${fallbackRelative}`, width: metadata.width });

  const originalHash = sourceHashes[relativePath];
  if (originalHash && originalHash !== sourceHash) {
    throw new Error(`Source hash changed for ${relativePath}`);
  }

  records.push({
    id: slug(relativePath),
    src: `/media-responsive/${fallbackRelative}`,
    original_src: `/media/${relativePath}`,
    srcset: responsive.sort((a, b) => a.width - b.width),
    kind: "image",
    locale: localeFor(relativePath),
    product_area: productAreaFor(relativePath),
    width: metadata.width,
    height: metadata.height,
    bytes: fileStat.size,
    sha256: sourceHash,
    ...provenance,
    ...frameFor(relativePath, metadata.width, metadata.height),
    layout_depends_on_image: false,
    alt: altText[relativePath] ?? null
  });
}

const manifest = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  policy: {
    generated_media: {
      required_source_type: "generated",
      required_status: "provisional",
      production_release_requires_review: true
    },
    layout: {
      media_frame_required: true,
      layout_depends_on_image_default: false
    }
  },
  assets: records
};

const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
await writeFile(manifestPath, serialized, "utf8");
await writeFile(publicManifestPath, serialized, "utf8");
console.log(`Built ${records.length} media records and responsive WebP variants.`);
