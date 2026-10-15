import type { MetadataRoute } from "next";
import { getSiteUrl, pageUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(siteUrl ? { sitemap: pageUrl("/sitemap.xml", siteUrl) } : {}),
  };
}
