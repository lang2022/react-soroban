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
  backToSimulatorLabel: string
  popularGuidesTitle: string
  optionalGuideTitle: string
  privacyPolicyLabel: string
  termsOfServiceLabel: string
  stepLabel: string
  closeLabel: string
  keyboardHint: string
  guideGroups: GuideGroup[]
  inputInvalidError: (maxValueLabel: string, shownLabel: string) => string
  inputClampedError: (maxValueLabel: string) => string
  clampToast: (maxValueLabel: string) => string
  quizStart: (target: number) => string
  quizSpeak: (target: number) => string
  quizCorrect: (score: number) => string
  quizMiss: (target: number, currentLabel: string) => string
  checkLabel: string
  exitLabel: string
  targetLabel: string
  scoreLabel: string
  bestLabel: string
  streakLabel: string
  imageDownloadedToast: string
  imageFailedToast: string
  worksheetOpenedToast: (valueLabel: string) => string
  popupBlockedToast: string
  copyFailedToast: string
  copyPromptLabel: string
  quizLevelLabel: string
  quizLevels: { id: "easy" | "medium" | "hard" | "expert"; label: string; hint: string }[]
  imageShareTitle: string
  numberH1: (valueLabel: string) => string
  breadcrumbHome: string
  breadcrumbNumbers: string
  prevLabel: string
  nextLabel: string
}

const GUIDE_GROUPS: Record<Locale, GuideGroup[]> = {
  de: [
    { label: "Nullen-Falle", values: [0, 101, 170, 110, 2008] },
    { label: "Zehner-Verwechslung", values: [12, 14, 41, 19] },
    { label: "Seh-Ermüdung", values: [555, 999, 1234] },
    { label: "Große Zahlen", values: [10000, 9999999] },
  ],
  fr: [
    { label: "Piège des zéros", values: [0, 101, 170, 110, 2008] },
    { label: "Confusion des ados", values: [12, 14, 41, 19] },
    { label: "Fatigue visuelle", values: [555, 999, 1234] },
    { label: "Grands nombres", values: [10000, 9999999] },
  ],
  en: [
    { label: "Zero Trap", values: [0, 101, 170, 110, 2008] },
    { label: "Teen Confusion", values: [12, 14, 41, 19] },
    { label: "Visual Fatigue", values: [555, 999, 1234] },
    { label: "Big Numbers", values: [10000, 9999999] },
  ],
}

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
        backToSimulatorLabel: "← Zurück zum Simulator",
        popularGuidesTitle: "Beliebte Zahlenführer",
        optionalGuideTitle: "📖 Schritt-für-Schritt-Anleitung zur Perlenstellung anzeigen (optional)",
        stepLabel: "Schritt",
        closeLabel: "Schließen",
        keyboardHint: "Tastatur: ↑/↓ ±1, ←/→ ±10, R Zufall, C zurücksetzen.",
        privacyPolicyLabel: "Datenschutz",
        termsOfServiceLabel: "Nutzungsbedingungen",
        guideGroups: GUIDE_GROUPS.de,
        inputInvalidError: (maxValueLabel, shownLabel) => `Bitte Ziffern 0–${maxValueLabel} eingeben. ${shownLabel} wird stattdessen gezeigt.`,
        inputClampedError: (maxValueLabel) => `Außerhalb des Bereichs — auf Maximum ${maxValueLabel} begrenzt.`,
        clampToast: (maxValueLabel) => `Außerhalb des Bereichs, auf ${maxValueLabel} begrenzt.`,
        quizStart: (target) => `Quiz: Stelle den Abakus auf ${target} und drücke Prüfen.`,
        quizSpeak: (target) => `Stelle ${target} ein`,
        quizCorrect: (score) => `Richtig! Punktestand ${score}.`,
        quizMiss: (target, currentLabel) => `Noch nicht — Ziel ist ${target}, der Abakus zeigt ${currentLabel}.`,
        checkLabel: "Prüfen",
        exitLabel: "Beenden",
        targetLabel: "Ziel",
        scoreLabel: "Punkte",
        bestLabel: "Beste",
        streakLabel: "Tage-Serie",
        imageDownloadedToast: "Bild heruntergeladen — teile es überall.",
        imageFailedToast: "Bildfreigabe in diesem Browser fehlgeschlagen.",
        worksheetOpenedToast: (valueLabel) => `Arbeitsblatt für ${valueLabel} geöffnet — als PDF drucken.`,
        popupBlockedToast: "Popup blockiert — erlaube Popups für das Arbeitsblatt.",
        copyFailedToast: "Kopieren fehlgeschlagen. Bitte kopiere die URL aus der Adressleiste.",
        copyPromptLabel: "Diesen Freigabelink kopieren:",
        quizLevelLabel: "Stufe",
        quizLevels: [
          { id: "easy", label: "Leicht 1–9", hint: "Einer" },
          { id: "medium", label: "Mittel 1–99", hint: "Zweistellig" },
          { id: "hard", label: "Schwer 1–999", hint: "Klassik" },
          { id: "expert", label: "Experte 1000–9999", hint: "Vierstellig" },
        ],
        imageShareTitle: "Abakus",
        numberH1: (valueLabel) => `${valueLabel} auf dem Abakus`,
        breadcrumbHome: "Start",
        breadcrumbNumbers: "Zahlen",
        prevLabel: "← Vorherige",
        nextLabel: "Nächste →",
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
        backToSimulatorLabel: "← Retour au simulateur",
        popularGuidesTitle: "Guides populaires",
        optionalGuideTitle: "📖 Voir le guide pas à pas du positionnement des perles (optionnel)",
        stepLabel: "Étape",
        closeLabel: "Fermer",
        keyboardHint: "Clavier : ↑/↓ ±1, ←/→ ±10, R aléatoire, C réinitialiser.",
        privacyPolicyLabel: "Politique de confidentialité",
        termsOfServiceLabel: "Conditions d'utilisation",
        guideGroups: GUIDE_GROUPS.fr,
        inputInvalidError: (maxValueLabel, shownLabel) => `Veuillez saisir des chiffres de 0 à ${maxValueLabel}. Affichage de ${shownLabel} à la place.`,
        inputClampedError: (maxValueLabel) => `Hors limites — plafonné au maximum ${maxValueLabel}.`,
        clampToast: (maxValueLabel) => `Hors limites, plafonné à ${maxValueLabel}.`,
        quizStart: (target) => `Quiz : réglez l'abaque sur ${target}, puis appuyez sur Vérifier.`,
        quizSpeak: (target) => `Réglez ${target}`,
        quizCorrect: (score) => `Correct ! Score ${score}.`,
        quizMiss: (target, currentLabel) => `Pas encore — la cible est ${target}, l'abaque affiche ${currentLabel}.`,
        checkLabel: "Vérifier",
        exitLabel: "Quitter",
        targetLabel: "Cible",
        scoreLabel: "Score",
        bestLabel: "Record",
        streakLabel: "série de jours",
        imageDownloadedToast: "Image téléchargée — partagez-la partout.",
        imageFailedToast: "Partage d'image impossible sur ce navigateur.",
        worksheetOpenedToast: (valueLabel) => `Fiche pour ${valueLabel} ouverte — imprimez en PDF.`,
        popupBlockedToast: "Popup bloquée — autorisez les popups pour la fiche.",
        copyFailedToast: "Échec de la copie. Copiez l'URL depuis la barre d'adresse.",
        copyPromptLabel: "Copiez ce lien de partage :",
        quizLevelLabel: "Niveau",
        quizLevels: [
          { id: "easy", label: "Facile 1–9", hint: "Unités" },
          { id: "medium", label: "Moyen 1–99", hint: "2 chiffres" },
          { id: "hard", label: "Difficile 1–999", hint: "Classique" },
          { id: "expert", label: "Expert 1000–9999", hint: "4 chiffres" },
        ],
        imageShareTitle: "Abaque",
        numberH1: (valueLabel) => `${valueLabel} sur un abaque`,
        breadcrumbHome: "Accueil",
        breadcrumbNumbers: "Nombres",
        prevLabel: "← Précédent",
        nextLabel: "Suivant →",
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
        backToSimulatorLabel: "← Back to Simulator",
        popularGuidesTitle: "Popular Guides",
        optionalGuideTitle: "📖 View Step-by-Step Bead Positioning Guide (Optional)",
        stepLabel: "Step",
        closeLabel: "Close",
        keyboardHint: "Keyboard: ↑/↓ ±1, ←/→ ±10, R random, C reset.",
        privacyPolicyLabel: "Privacy Policy",
        termsOfServiceLabel: "Terms of Service",
        guideGroups: GUIDE_GROUPS.en,
        inputInvalidError: (maxValueLabel, shownLabel) => `Please enter digits 0–${maxValueLabel}. Showing ${shownLabel} instead.`,
        inputClampedError: (maxValueLabel) => `Out of range — clamped to max ${maxValueLabel}.`,
        clampToast: (maxValueLabel) => `Out of range, clamped to ${maxValueLabel}.`,
        quizStart: (target) => `Quiz: set the abacus to ${target}, then press Check.`,
        quizSpeak: (target) => `Set ${target}`,
        quizCorrect: (score) => `Correct! Score ${score}.`,
        quizMiss: (target, currentLabel) => `Not yet — target is ${target}, abacus shows ${currentLabel}.`,
        checkLabel: "Check",
        exitLabel: "Exit",
        targetLabel: "Target",
        scoreLabel: "Score",
        bestLabel: "Best",
        streakLabel: "day streak",
        imageDownloadedToast: "Image downloaded — share it anywhere.",
        imageFailedToast: "Image share failed on this browser.",
        worksheetOpenedToast: (valueLabel) => `Worksheet for ${valueLabel} opened — print to PDF.`,
        popupBlockedToast: "Popup blocked — allow popups to get the worksheet.",
        copyFailedToast: "Copy failed. Please copy the URL from your browser address bar.",
        copyPromptLabel: "Copy this share link:",
        quizLevelLabel: "Level",
        quizLevels: [
          { id: "easy", label: "Easy 1–9", hint: "Ones" },
          { id: "medium", label: "Medium 1–99", hint: "2 digits" },
          { id: "hard", label: "Hard 1–999", hint: "Classic" },
          { id: "expert", label: "Expert 1000–9999", hint: "4 digits" },
        ],
        imageShareTitle: "Abacus",
        numberH1: (valueLabel) => `${valueLabel} on an abacus`,
        breadcrumbHome: "Home",
        breadcrumbNumbers: "Numbers",
        prevLabel: "← Prev",
        nextLabel: "Next →",
      }
  }
}
