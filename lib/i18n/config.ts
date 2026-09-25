export const DEFAULT_LOCALE = "en"
export const LAUNCH_LOCALES = ["en", "de", "fr"] as const
export const SUPPORTED_LOCALES = ["en", "de", "fr"] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

export function isLaunchLocale(value: string): value is (typeof LAUNCH_LOCALES)[number] {
  return LAUNCH_LOCALES.includes(value as (typeof LAUNCH_LOCALES)[number])
}
