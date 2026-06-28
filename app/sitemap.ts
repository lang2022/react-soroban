import type { MetadataRoute } from "next"

const BASE_URL = "https://www.abacussnap.com"
const FOCUS_NUMBERS = [500, 1000, 2026, 888, 555, 999, 110, 170, 101, 2008, 10000, 9999999]

function getSitemapNumbers() {
  const sequentialNumbers = Array.from({ length: 200 }, (_, index) => index + 1)
  return [...new Set([...sequentialNumbers, ...FOCUS_NUMBERS])]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicRoutes = getSitemapNumbers().map((value) => ({
    url: `${BASE_URL}/n/${value}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...dynamicRoutes,
  ]
}
