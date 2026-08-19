import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist");
const manifest = JSON.parse(
  await readFile(path.join(projectRoot, "src/data/media-manifest.json"), "utf8")
);
const fallbackConfig = JSON.parse(
  await readFile(path.join(projectRoot, "src/data/media-locale-fallbacks.json"), "utf8")
);

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? htmlFiles(target) : target.endsWith(".html") ? [target] : [];
    })
  );
  return files.flat();
}

function mediaPathsFor(locale) {
  return manifest.assets
    .filter((asset) => asset.locale === locale)
    .flatMap((asset) => [
      asset.src,
      ...(asset.srcset ?? []).map((source) => source.src),
      ...(asset.srcset_avif ?? []).map((source) => source.src)
    ]);
}

function approvedFallbackPaths(pageLocale, sourceLocale) {
  const mediaIds = fallbackConfig.fallbacks
    .filter(
      (fallback) =>
        fallback.requested_locale === pageLocale &&
        fallback.source_locale === sourceLocale
    )
    .flatMap((fallback) => fallback.media_ids);

  return mediaIds.flatMap((id) => {
    const asset = manifest.assets.find((candidate) => candidate.id === id);
    if (!asset) {
      violations.push(`Approved locale fallback references unknown media id ${id}`);
      return [];
    }
    if (asset.locale !== sourceLocale) {
      violations.push(`Approved locale fallback ${id} is ${asset.locale}, expected ${sourceLocale}`);
      return [];
    }
    return [
      asset.src,
      ...(asset.srcset ?? []).map((source) => source.src),
      ...(asset.srcset_avif ?? []).map((source) => source.src)
    ];
  });
}

const localeChecks = [
  { pageLocale: "en", forbiddenLocale: "zh-CN" },
  { pageLocale: "zh-CN", forbiddenLocale: "en" }
];

const violations = [];

for (const check of localeChecks) {
  const pages = await htmlFiles(path.join(distRoot, check.pageLocale));
  const allowedFallbackPaths = new Set(
    approvedFallbackPaths(check.pageLocale, check.forbiddenLocale)
  );
  const forbiddenPaths = mediaPathsFor(check.forbiddenLocale).filter(
    (mediaPath) => !allowedFallbackPaths.has(mediaPath)
  );

  for (const file of pages) {
    const html = await readFile(file, "utf8");
    const found = forbiddenPaths.find((mediaPath) => html.includes(mediaPath));
    if (found) violations.push(`${path.relative(projectRoot, file)} references ${found}`);

    if (!html.includes(`<html lang="${check.pageLocale}">`)) {
      violations.push(`${path.relative(projectRoot, file)} has incorrect html lang`);
    }
    if (!html.includes('hreflang="zh-CN"') || !html.includes('hreflang="en"')) {
      violations.push(`${path.relative(projectRoot, file)} is missing bilingual hreflang links`);
    }
  }
}

if (violations.length) {
  throw new Error(`Bilingual validation failed:\n${violations.join("\n")}`);
}

console.log("Bilingual validation passed: only approved zh-CN runtime fallbacks appear in /en/, and no en media appears in /zh-CN/.");
