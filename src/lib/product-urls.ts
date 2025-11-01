const delimiterPattern = /[\n\r,;]+/;

export const splitProductUrls = (value: string | null | undefined): string[] => {
  if (!value) return [];
  return value
    .split(delimiterPattern)
    .map((url) => url.trim())
    .filter((url) => url.length > 0);
};

export const normalizeProductUrlInput = (value: string): string[] => splitProductUrls(value);

export const joinProductUrlsForStorage = (urls: string[]): string | null => (urls.length > 0 ? urls.join('\n') : null);
