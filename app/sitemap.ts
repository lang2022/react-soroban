import type { MetadataRoute } from "next"

import { getCoreSorobanNumbers } from "@/lib/core-soroban-numbers"

const BASE_URL = "https://www.abacussnap.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const englishRoutes = getCoreSorobanNumbers().map((value) => ({
    url: `${BASE_URL}/n/${value}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const germanRoutes = getCoreSorobanNumbers().map((value) => ({
    url: `${BASE_URL}/de/n/${value}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/de`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...englishRoutes,
    ...germanRoutes,
  ]
}
