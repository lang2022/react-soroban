import type { Metadata } from "next"

import { NumberGuideClientPage } from "@/components/number-guide-client-page"
import { DEFAULT_LOCALE } from "@/lib/i18n/config"
import { getHomeMetadata } from "@/lib/i18n/seo-copy"

export const metadata: Metadata = getHomeMetadata(DEFAULT_LOCALE)

export default function Page() {
  return <NumberGuideClientPage initialValue={0} isHomePage locale={DEFAULT_LOCALE} />
}
