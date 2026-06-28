export const MAX_SOROBAN_VALUE = 9_999_999
const MAX_SOROBAN_VALUE_BIGINT = BigInt(MAX_SOROBAN_VALUE)

export type ParsedSorobanNumber = {
  value: number
  wasClamped: boolean
}

export function clampSorobanValue(value: number) {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(MAX_SOROBAN_VALUE, Math.round(value)))
}

export function sanitizeSorobanInput(input: string) {
  return input.replace(/\D+/g, "")
}

export function parseSorobanNumber(input?: string | null): ParsedSorobanNumber {
  const sanitized = sanitizeSorobanInput(input ?? "")

  if (!sanitized) {
    return { value: 0, wasClamped: false }
  }

  const parsed = BigInt(sanitized)

  if (parsed > MAX_SOROBAN_VALUE_BIGINT) {
    return { value: MAX_SOROBAN_VALUE, wasClamped: true }
  }

  return { value: Number(parsed), wasClamped: false }
}

export function formatSorobanValue(value: number) {
  return clampSorobanValue(value).toLocaleString("en-US")
}
