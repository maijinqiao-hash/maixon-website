import delivery from '../../deployment/public-assets.json';

export const publicAssetsBase = delivery.baseUrl.replace(/\/$/, '');

export function assetUrl(path: string) {
  return /^\/(media\/|media-responsive\/|media-web\/|hardware-assets\/|support\/)/.test(path)
    ? `${publicAssetsBase}${path}`
    : path;
}
