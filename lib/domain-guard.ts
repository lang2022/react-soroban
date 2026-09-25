export const OFFICIAL_SITE_URL = "https://www.abacussnap.com/?utm_source=mirror_defense"

const ALLOWED_EXACT_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "abacussnap.com",
  "www.abacussnap.com",
])

const ALLOWED_SUFFIXES = [".abacussnap.com", ".vercel.app"]

function normalizeHostname(hostname: string) {
  return hostname.trim().toLowerCase()
}

export function isDomainGuardEnabled() {
  return process.env.NODE_ENV === "production"
}

export function isAuthorizedHostname(hostname: string) {
  const normalized = normalizeHostname(hostname)

  if (ALLOWED_EXACT_HOSTS.has(normalized)) {
    return true
  }

  return ALLOWED_SUFFIXES.some((suffix) => normalized.endsWith(suffix))
}
