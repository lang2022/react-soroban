import type { Metadata } from "next"

import { NumberGuideClientPage } from "@/components/number-guide-client-page"
import { DEFAULT_LOCALE } from "@/lib/i18n/config"
import { getHomeMetadata } from "@/lib/i18n/seo-copy"
import { canonicalFor, hreflangFor } from "@/lib/seo"

export const metadata: Metadata = {
  ...getHomeMetadata(DEFAULT_LOCALE),
  alternates: { canonical: canonicalFor(DEFAULT_LOCALE, "/"), languages: hreflangFor("/") },
}

export default function Page() {
  return <NumberGuideClientPage initialValue={0} isHomePage locale={DEFAULT_LOCALE} />
}
