import type { Metadata } from "next"

import { NumberGuideClientPage } from "@/components/number-guide-client-page"
import { getCoreSorobanNumbers } from "@/lib/core-soroban-numbers"
import { DEFAULT_LOCALE } from "@/lib/i18n/config"
import { getNumberMetadata } from "@/lib/i18n/seo-copy"
import { parseSorobanNumber } from "@/lib/soroban-number"

type PageProps = {
  params: Promise<{
    number?: string
  }>
}

export function generateStaticParams() {
  return getCoreSorobanNumbers().map((value) => ({
    number: String(value),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params
  const { value } = parseSorobanNumber(number)

  return getNumberMetadata(DEFAULT_LOCALE, value)
}

export default async function NumberGuidePage({ params }: PageProps) {
  const { number } = await params
  const { value, wasClamped } = parseSorobanNumber(number)

  return (
    <NumberGuideClientPage
      initialValue={value}
      canonicalPath={`/n/${value}`}
      clampNotice={
        wasClamped
          ? `This soroban supports up to 9,999,999, so we loaded the closest supported value for ${number}.`
          : undefined
      }
      locale={DEFAULT_LOCALE}
    />
  )
}
