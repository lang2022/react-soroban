import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { NumberGuideClientPage } from "@/components/number-guide-client-page"
import { isSupportedLocale, type Locale } from "@/lib/i18n/config"
import { getHomeMetadata } from "@/lib/i18n/seo-copy"
import { canonicalFor, hreflangFor } from "@/lib/seo"

type PageProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    return {}
  }

  return {
    ...getHomeMetadata(locale),
    alternates: {
      canonical: canonicalFor(locale, "/"),
      languages: hreflangFor("/"),
    },
  }
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <NumberGuideClientPage initialValue={0} isHomePage locale={locale as Locale} />
}
