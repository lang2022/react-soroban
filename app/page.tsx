import type { Metadata } from "next"

import { NumberGuideClientPage } from "@/components/number-guide-client-page"

export const metadata: Metadata = {
  title: "AbacusSnap: See any number on an abacus, instantly",
  description:
    "Free interactive abacus tool. Type a whole number or click beads to see the soroban representation instantly. Perfect for kids, parents, and mental math practice. No signup required.",
}

export default function Page() {
  return <NumberGuideClientPage initialValue={0} isHomePage />
}
