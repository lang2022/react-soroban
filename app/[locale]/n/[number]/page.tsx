import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { NumberGuideClientPage } from "@/components/number-guide-client-page"
import { CURATED_SITEMAP_NUMBERS } from "@/lib/core-soroban-numbers"
import { isLaunchLocale, isSupportedLocale, LAUNCH_LOCALES, type Locale } from "@/lib/i18n/config"
import { getNumberMetadata } from "@/lib/i18n/seo-copy"
import { canonicalFor, hreflangFor } from "@/lib/seo"
import { parseSorobanNumber } from "@/lib/soroban-number"

type PageProps = {
  params: Promise<{
    locale: string
    number?: string
  }>
}

export function generateStaticParams() {
  return CURATED_SITEMAP_NUMBERS.flatMap((value) =>
    LAUNCH_LOCALES.filter((locale) => locale !== "en").map((locale) => ({
      locale,
      number: String(value),
    })),
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, number } = await params

  if (!isSupportedLocale(locale)) {
    return {}
  }

  const { value } = parseSorobanNumber(number)
  return {
    ...getNumberMetadata(locale as Locale, value),
    alternates: {
      canonical: canonicalFor(locale as Locale, `/n/${value}`),
      languages: hreflangFor(`/n/${value}`),
    },
  }
}

export default async function LocalizedNumberGuidePage({ params }: PageProps) {
  const { locale, number } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  if (!isLaunchLocale(locale)) {
    notFound()
  }

  const { value, wasClamped } = parseSorobanNumber(number)
  const localeCode = locale as Locale

  return (
    <NumberGuideClientPage
      initialValue={value}
      canonicalPath={`/${localeCode}/n/${value}`}
      clampNotice={
        wasClamped
          ? `This soroban supports up to 9,999,999, so we loaded the closest supported value for ${number}.`
          : undefined
      }
      locale={localeCode}
    />
  )
}
