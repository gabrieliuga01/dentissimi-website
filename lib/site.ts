export function getSiteUrl(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;

  const url = new URL(raw);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an http(s) URL.");
  }

  return url;
}

export function pageUrl(path: string, siteUrl: URL): string {
  const base = siteUrl.href.endsWith("/") ? siteUrl.href : `${siteUrl.href}/`;
  return new URL(path.replace(/^\//, ""), base).href;
}
