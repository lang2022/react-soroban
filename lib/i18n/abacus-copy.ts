import type { Locale } from "@/lib/i18n/config"

export type GuideGroup = {
  label: string
  values: number[]
}

export type NumberGuideCopy = {
  locale: Locale
  sloganPrefix: string
  sloganEmphasis: string
  currentValueLabel: string
  inputPlaceholder: string
  inputHelp: (maxValueLabel: string) => string
  applyLabel: string
  randomLabel: string
  resetLabel: string
  worksheetLabel: string
  shareLabel: string
  shareToast: string
  shareCopyTemplate: (valueLabel: string, href: string) => string
  worksheetToast: (valueLabel: string) => string
  backToSimulatorLabel: string
  popularGuidesTitle: string
  optionalGuideTitle: string
  privacyPolicyLabel: string
  termsOfServiceLabel: string
  guideGroups: GuideGroup[]
}

const sharedGuideGroups: GuideGroup[] = [
  { label: "Zero Trap", values: [0, 101, 170, 110, 2008] },
  { label: "Teen Confusion", values: [12, 14, 41, 19] },
  { label: "Visual Fatigue", values: [555, 999, 1234] },
  { label: "Big Numbers", values: [10000, 9999999] },
]

export function getNumberGuideCopy(locale: Locale): NumberGuideCopy {
  switch (locale) {
    case "de":
      return {
        locale,
        sloganPrefix: "Jede Zahl auf dem Abakus sehen,",
        sloganEmphasis: "sofort",
        currentValueLabel: "AKTUELLER WERT",
        inputPlaceholder: "Gib eine Zahl ein (z. B. 888)...",
        inputHelp: (maxValueLabel) => `Gib eine ganze Zahl von 0 bis ${maxValueLabel} ein.`,
        applyLabel: "Anwenden",
        randomLabel: "🎲 Zufall",
        resetLabel: "🔄 Zurücksetzen",
        worksheetLabel: "Kostenloses Arbeitsblatt erzeugen (PDF)",
        shareLabel: "🔗 Link kopieren",
        shareToast: "Freigabelink kopiert. Jetzt kannst du ihn teilen.",
        shareCopyTemplate: (valueLabel, href) => `🔢 ${valueLabel} auf dem Abakus: ${href} — AbacusSnap zeigt jede Zahl sofort.`,
        worksheetToast: (valueLabel) => `Dein kostenloses Arbeitsblatt für ${valueLabel} wird erstellt... In 3 Sekunden bereit!`,
        backToSimulatorLabel: "← Zurück zum Simulator",
        popularGuidesTitle: "Beliebte Zahlenführer",
        optionalGuideTitle: "📖 Schritt-für-Schritt-Anleitung zur Perlenstellung anzeigen (optional)",
        privacyPolicyLabel: "Datenschutz",
        termsOfServiceLabel: "Nutzungsbedingungen",
        guideGroups: sharedGuideGroups,
      }
    case "fr":
      return {
        locale,
        sloganPrefix: "Voir n'importe quel nombre sur un abaque,",
        sloganEmphasis: "instantanément",
        currentValueLabel: "VALEUR ACTUELLE",
        inputPlaceholder: "Saisissez un nombre (ex. 888)...",
        inputHelp: (maxValueLabel) => `Saisissez un nombre entier de 0 à ${maxValueLabel}.`,
        applyLabel: "Appliquer",
        randomLabel: "🎲 Aléatoire",
        resetLabel: "🔄 Réinitialiser",
        worksheetLabel: "Générer une fiche gratuite (PDF)",
        shareLabel: "🔗 Copier le lien",
        shareToast: "Lien copié. Vous pouvez maintenant le partager.",
        shareCopyTemplate: (valueLabel, href) => `🔢 ${valueLabel} sur un abaque : ${href} — AbacusSnap affiche chaque nombre instantanément.`,
        worksheetToast: (valueLabel) => `Votre fiche gratuite pour ${valueLabel} est en cours de génération... Prête dans 3 secondes !`,
        backToSimulatorLabel: "← Retour au simulateur",
        popularGuidesTitle: "Guides populaires",
        optionalGuideTitle: "📖 Voir le guide pas à pas du positionnement des perles (optionnel)",
        privacyPolicyLabel: "Politique de confidentialité",
        termsOfServiceLabel: "Conditions d'utilisation",
        guideGroups: sharedGuideGroups,
      }
    case "en":
    default:
      return {
        locale,
        sloganPrefix: "See any number on an abacus,",
        sloganEmphasis: "instantly",
        currentValueLabel: "CURRENT VALUE",
        inputPlaceholder: "Type any number (e.g., 888)...",
        inputHelp: (maxValueLabel) => `Enter any whole number from 0 to ${maxValueLabel}.`,
        applyLabel: "Apply",
        randomLabel: "🎲 Random",
        resetLabel: "🔄 Reset",
        worksheetLabel: "Generate Free Worksheet (PDF)",
        shareLabel: "🔗 Copy Share Link",
        shareToast: "Share copy ready. Paste it anywhere.",
        shareCopyTemplate: (valueLabel, href) => `🔢 ${valueLabel} on an abacus: ${href} — AbacusSnap, see any number instantly.`,
        worksheetToast: (valueLabel) => `Generating your free worksheet for ${valueLabel}... Ready in 3 seconds!`,
        backToSimulatorLabel: "← Back to Simulator",
        popularGuidesTitle: "Popular Guides",
        optionalGuideTitle: "📖 View Step-by-Step Bead Positioning Guide (Optional)",
        privacyPolicyLabel: "Privacy Policy",
        termsOfServiceLabel: "Terms of Service",
        guideGroups: sharedGuideGroups,
      }
  }
}
