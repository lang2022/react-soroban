import type { Metadata } from "next"

import { NumberGuideClientPage } from "@/components/number-guide-client-page"
import { parseSorobanNumber } from "@/lib/soroban-number"

type PageProps = {
  params: Promise<{
    number?: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params
  const { value } = parseSorobanNumber(number)

  return {
    title: `${value} on an abacus | AbacusSnap`,
    description: `See ${value} on an abacus instantly with AbacusSnap. Explore the interactive soroban, bead positioning guide, and number-specific practice flow in one place.`,
  }
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
    />
  )
}
