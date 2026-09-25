import type { Locale } from "@/lib/i18n/config";

export const BASE_URL = "https://www.abacussnap.com";

export function canonicalFor(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return `${BASE_URL}${clean}`;
  return `${BASE_URL}/${locale}${clean}`;
}

export function hreflangFor(path: string): Record<string, string> {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return {
    en: `${BASE_URL}${clean}`,
    de: `${BASE_URL}/de${clean}`,
    fr: `${BASE_URL}/fr${clean}`,
    "x-default": `${BASE_URL}${clean}`,
  };
}
