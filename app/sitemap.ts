import type { MetadataRoute } from "next";
import { getSiteUrl, pageUrl } from "@/lib/site";

export const dynamic = "force-static";

const paths = ["/", "/confidentialitate"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return paths.map((path) => ({
    url: pageUrl(path, siteUrl),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.3,
  }));
}
