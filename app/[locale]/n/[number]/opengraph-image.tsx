import { ImageResponse } from "next/og";

import { CURATED_SITEMAP_NUMBERS } from "@/lib/core-soroban-numbers";
import { LAUNCH_LOCALES } from "@/lib/i18n/config";
import { AbacusOgFigure } from "@/lib/og-abacus";
import { parseSorobanNumber } from "@/lib/soroban-number";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return CURATED_SITEMAP_NUMBERS.flatMap((value) =>
    LAUNCH_LOCALES.filter((locale) => locale !== "en").map((locale) => ({
      locale,
      number: String(value),
    })),
  );
}

const TITLES: Record<string, (v: string) => string> = {
  de: (v) => `${v} auf dem Abakus`,
  fr: (v) => `${v} sur un abaque`,
  en: (v) => `${v} on an abacus`,
};

export default async function LocaleNumberOgImage({
  params,
}: {
  params: Promise<{ locale: string; number?: string }>;
}) {
  const { locale, number } = await params;
  const { value } = parseSorobanNumber(number);
  const label = value.toLocaleString("en-US");
  const title = (TITLES[locale] ?? TITLES.en)(label);
  return new ImageResponse(<AbacusOgFigure value={value} title={title} subtitle="AbacusSnap" />, {
    ...size,
  });
}
