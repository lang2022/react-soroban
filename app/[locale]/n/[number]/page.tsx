import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { NumberGuideClientPage } from "@/components/number-guide-client-page"
import { getCoreSorobanNumbers } from "@/lib/core-soroban-numbers"
import { isLaunchLocale, isSupportedLocale, type Locale } from "@/lib/i18n/config"
import { getNumberMetadata } from "@/lib/i18n/seo-copy"
import { parseSorobanNumber } from "@/lib/soroban-number"

type PageProps = {
  params: Promise<{
    locale: string
    number?: string
  }>
}

export function generateStaticParams() {
  return getCoreSorobanNumbers().flatMap((value) =>
    ["de"].map((locale) => ({
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
  return getNumberMetadata(locale as Locale, value)
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
