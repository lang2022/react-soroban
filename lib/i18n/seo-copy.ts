import type { Locale } from "@/lib/i18n/config"

export function getHomeMetadata(locale: Locale) {
  switch (locale) {
    case "de":
      return {
        title: "AbacusSnap: Jede Zahl sofort auf dem Abakus sehen",
        description:
          "Interaktives Abakus-Tool für Kinder, Eltern und Lehrkräfte. Gib eine Zahl ein oder bewege die Perlen, um die Darstellung sofort zu sehen.",
      }
    case "fr":
      return {
        title: "AbacusSnap : voir n'importe quel nombre sur un abaque, instantanément",
        description:
          "Outil interactif d'abaque pour enfants, parents et enseignants. Saisissez un nombre ou déplacez les perles pour voir instantanément sa représentation.",
      }
    case "en":
    default:
      return {
        title: "AbacusSnap: See any number on an abacus, instantly",
        description:
          "Free interactive abacus tool. Type a whole number or click beads to see the soroban representation instantly. Perfect for kids, parents, and mental math practice. No signup required.",
      }
  }
}

export function getNumberMetadata(locale: Locale, value: number) {
  switch (locale) {
    case "de":
      return {
        title: `Zahl ${value} auf dem Abakus | AbacusSnap`,
        description: `Sieh dir ${value} sofort auf einem Abakus an. Erkunde mit AbacusSnap die interaktive Soroban-Darstellung und die schrittweise Perlenführung.`,
      }
    case "fr":
      return {
        title: `${value} sur un abaque | AbacusSnap`,
        description: `Visualisez ${value} instantanément sur un abaque avec AbacusSnap. Découvrez le soroban interactif et le guidage pas à pas des perles.`,
      }
    case "en":
    default:
      return {
        title: `${value} on an abacus | AbacusSnap`,
        description: `See ${value} on an abacus instantly with AbacusSnap. Explore the interactive soroban, bead positioning guide, and number-specific practice flow in one place.`,
      }
  }
}
