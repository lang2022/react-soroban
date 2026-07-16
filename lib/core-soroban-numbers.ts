const FOCUS_NUMBERS = [500, 1000, 2026, 888, 555, 999, 110, 170, 101, 2008, 10000, 9999999] as const

export function getCoreSorobanNumbers() {
  const sequentialNumbers = Array.from({ length: 200 }, (_, index) => index + 1)
  return [...new Set([...sequentialNumbers, ...FOCUS_NUMBERS])]
}
