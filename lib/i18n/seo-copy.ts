import type { Locale } from "@/lib/i18n/config"

export function getHomeMetadata(locale: Locale) {
  const ogImages = [{ url: "opengraph-image", width: 1200, height: 630 }];
  switch (locale) {
    case "de":
      return {
        title: "AbacusSnap: Jede Zahl sofort auf dem Abakus sehen",
        description:
          "Interaktives Abakus-Tool für Kinder, Eltern und Lehrkräfte. Gib eine Zahl ein oder bewege die Perlen, um die Darstellung sofort zu sehen.",
        openGraph: { title: "AbacusSnap: Jede Zahl sofort auf dem Abakus sehen", description: "Interaktiver Soroban-Simulator mit Schritt-für-Schritt-Perlenführung.", type: "website" as const, images: ogImages },
        twitter: { card: "summary_large_image" as const, title: "AbacusSnap: Jede Zahl sofort auf dem Abakus sehen", description: "Interaktiver Soroban-Simulator." },
      }
    case "fr":
      return {
        title: "AbacusSnap : voir n'importe quel nombre sur un abaque, instantanément",
        description:
          "Outil interactif d'abaque pour enfants, parents et enseignants. Saisissez un nombre ou déplacez les perles pour voir instantanément sa représentation.",
        openGraph: { title: "AbacusSnap : voir n'importe quel nombre sur un abaque", description: "Simulateur de soroban interactif avec guidage pas à pas.", type: "website" as const, images: ogImages },
        twitter: { card: "summary_large_image" as const, title: "AbacusSnap : voir n'importe quel nombre sur un abaque", description: "Simulateur de soroban interactif." },
      }
    case "en":
    default:
      return {
        title: "AbacusSnap: See any number on an abacus, instantly",
        description:
          "Free interactive abacus tool. Type a whole number or click beads to see the soroban representation instantly. Perfect for kids, parents, and mental math practice. No signup required.",
        openGraph: { title: "AbacusSnap: See any number on an abacus, instantly", description: "Free interactive soroban simulator with bead guide and practice tools.", type: "website" as const, images: ogImages },
        twitter: { card: "summary_large_image" as const, title: "AbacusSnap: See any number on an abacus, instantly", description: "Free interactive soroban simulator." },
      }
  }
}

export function getNumberMetadata(locale: Locale, value: number) {
  const label = value.toLocaleString("en-US");
  const ogImages = [{ url: "opengraph-image", width: 1200, height: 630 }];
  switch (locale) {
    case "de":
      return {
        title: `Zahl ${value} auf dem Abakus | AbacusSnap`,
        description: `Sieh dir ${value} sofort auf einem Abakus an. Erkunde mit AbacusSnap die interaktive Soroban-Darstellung und die schrittweise Perlenführung.`,
        openGraph: { title: `Zahl ${label} auf dem Abakus | AbacusSnap`, description: `Interaktive Soroban-Darstellung von ${label} mit Perlenführung.`, type: "article" as const, images: ogImages },
        twitter: { card: "summary_large_image" as const, title: `Zahl ${label} auf dem Abakus | AbacusSnap`, description: `Interaktive Soroban-Darstellung von ${label}.` },
      }
    case "fr":
      return {
        title: `${value} sur un abaque | AbacusSnap`,
        description: `Visualisez ${value} instantanément sur un abaque avec AbacusSnap. Découvrez le soroban interactif et le guidage pas à pas des perles.`,
        openGraph: { title: `${label} sur un abaque | AbacusSnap`, description: `Représentation soroban interactive de ${label} avec guidage des perles.`, type: "article" as const, images: ogImages },
        twitter: { card: "summary_large_image" as const, title: `${label} sur un abaque | AbacusSnap`, description: `Représentation soroban de ${label}.` },
      }
    case "en":
    default:
      return {
        title: `${value} on an abacus | AbacusSnap`,
        description: `See ${value} on an abacus instantly with AbacusSnap. Explore the interactive soroban, bead positioning guide, and number-specific practice flow in one place.`,
        openGraph: { title: `${label} on an abacus | AbacusSnap`, description: `Interactive soroban for ${label} with bead guide and practice flow.`, type: "article" as const, images: ogImages },
        twitter: { card: "summary_large_image" as const, title: `${label} on an abacus | AbacusSnap`, description: `Interactive soroban for ${label}.` },
      }
  }
}
