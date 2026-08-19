import manifestJson from "./media-manifest.json";
import fallbackJson from "./media-locale-fallbacks.json";

export type Locale = "zh-CN" | "en";

export type MediaSource = {
  src: string;
  width: number;
};

export type MediaAsset = {
  id: string;
  src: string;
  original_src?: string;
  source_media?: string;
  derived_media?: string | null;
  srcset: MediaSource[];
  srcset_avif?: MediaSource[];
  kind: "image" | "video";
  locale: Locale | "shared";
  product_area: string;
  width: number;
  height: number;
  duration?: number;
  bytes: number;
  sha256: string;
  source_bytes?: number;
  source_sha256?: string;
  source_type: "official" | "runtime_capture" | "artwork_source" | "production_output" | "generated";
  status: "approved" | "provisional" | "review_pending";
  source_package: string;
  replaceable: boolean;
  rights_clearance?: "approved" | "pending" | "not_required";
  ui_brand_consistency?: "approved" | "pending_review" | "not_applicable";
  aspect_ratio: string;
  object_fit: "cover" | "contain";
  object_position: string;
  layout_depends_on_image: boolean;
  alt: Record<string, string> | null;
};

type MediaManifest = {
  schema_version: number;
  policy: Record<string, unknown>;
  assets: MediaAsset[];
};

export const mediaManifest = manifestJson as MediaManifest;

export const mediaById = new Map(
  mediaManifest.assets.map((asset) => [asset.id, asset])
);

type LocaleFallbackPolicy = {
  requested_locale: Locale;
  source_locale: Locale;
  media_ids: string[];
};

const localeFallbacks = fallbackJson.fallbacks as LocaleFallbackPolicy[];

export function isApprovedLocaleFallback(id: string, requestedLocale: Locale, sourceLocale: Locale) {
  return localeFallbacks.some(
    (fallback) =>
      fallback.requested_locale === requestedLocale &&
      fallback.source_locale === sourceLocale &&
      fallback.media_ids.includes(id)
  );
}

export function getMedia(id: string, locale?: Locale) {
  const media = mediaById.get(id);
  if (!media) throw new Error(`Unknown media id: ${id}`);
  if (
    locale &&
    media.locale !== "shared" &&
    media.locale !== locale &&
    !isApprovedLocaleFallback(id, locale, media.locale)
  ) {
    throw new Error(
      `Locale mismatch: ${id} is ${media.locale}, requested by ${locale}`
    );
  }
  return media;
}
