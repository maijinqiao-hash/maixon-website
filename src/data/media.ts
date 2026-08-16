import manifestJson from "./media-manifest.json";

export type Locale = "zh-CN" | "en";

export type MediaSource = {
  src: string;
  width: number;
};

export type MediaAsset = {
  id: string;
  src: string;
  original_src?: string;
  srcset: MediaSource[];
  kind: "image" | "video";
  locale: Locale | "shared";
  product_area: string;
  width: number;
  height: number;
  duration?: number;
  bytes: number;
  sha256: string;
  source_type: "official" | "runtime_capture" | "production_output" | "generated";
  status: "approved" | "provisional";
  source_package: string;
  replaceable: boolean;
  aspect_ratio: string;
  object_fit: "cover" | "contain";
  object_position: string;
  layout_depends_on_image: boolean;
  alt: Record<string, string> | null;
};

type MediaManifest = {
  schema_version: number;
  generated_at: string;
  policy: Record<string, unknown>;
  assets: MediaAsset[];
};

export const mediaManifest = manifestJson as MediaManifest;

export const mediaById = new Map(
  mediaManifest.assets.map((asset) => [asset.id, asset])
);

export function getMedia(id: string, locale?: Locale) {
  const media = mediaById.get(id);
  if (!media) throw new Error(`Unknown media id: ${id}`);
  if (locale && media.locale !== "shared" && media.locale !== locale) {
    throw new Error(
      `Locale mismatch: ${id} is ${media.locale}, requested by ${locale}`
    );
  }
  return media;
}
