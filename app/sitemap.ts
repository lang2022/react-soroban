import type { MetadataRoute } from "next";

import { CURATED_SITEMAP_NUMBERS } from "@/lib/core-soroban-numbers";
import { BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["", "/de", "/fr"];
  const numberRoutes = locales.flatMap((prefix) =>
    CURATED_SITEMAP_NUMBERS.map((value) => ({
      url: `${BASE_URL}${prefix}/n/${value}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${BASE_URL}/de`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/fr`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    ...numberRoutes,
  ];
}
