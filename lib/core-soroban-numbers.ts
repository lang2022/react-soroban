const FOCUS_NUMBERS = [500, 1000, 2026, 888, 555, 999, 110, 170, 101, 2008, 10000, 9999999] as const

export function getCoreSorobanNumbers() {
  const sequentialNumbers = Array.from({ length: 200 }, (_, index) => index + 1)
  return [...new Set([...sequentialNumbers, ...FOCUS_NUMBERS])]
}

// Single source of truth for sitemap + pre-render allowlist.
// Caps sequential coverage at 1-100 to avoid thin-content doorway penalty.
export const CURATED_SITEMAP_NUMBERS: number[] = [
  ...new Set([
    ...Array.from({ length: 100 }, (_, i) => i + 1),
    101, 110, 170, 555, 888, 999, 1000, 1234, 2008, 2026, 10000, 9999999,
  ]),
];
