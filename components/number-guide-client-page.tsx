"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState } from "react"

import { DomainGuard } from "@/components/domain-guard"
import { Soroban } from "@/components/soroban"
import { Button } from "@/components/ui/button"
import {
  clampSorobanValue,
  formatSorobanValue,
  MAX_SOROBAN_VALUE,
  parseSorobanNumber,
} from "@/lib/soroban-number"

const GUIDE_GROUPS = [
  { label: "Zero Trap", values: [0, 101, 170, 110, 2008] },
  { label: "Teen Confusion", values: [12, 14, 41, 19] },
  { label: "Visual Fatigue", values: [555, 999, 1234] },
  { label: "Big Numbers", values: [10000, 9999999] },
] as const

const COLUMN_NAMES = [
  "millions",
  "hundred-thousands",
  "ten-thousands",
  "thousands",
  "hundreds",
  "tens",
  "ones",
] as const

type LegalModalType = "privacy" | "terms" | null

type NumberGuideClientPageProps = {
  initialValue: number
  canonicalPath?: string
  clampNotice?: string
  isHomePage?: boolean
}

function getDigits(value: number) {
  return clampSorobanValue(value)
    .toString()
    .padStart(COLUMN_NAMES.length, "0")
    .split("")
    .map((digit) => Number(digit))
}

function pickVariant(options: readonly string[], seed: number) {
  return options[Math.abs(seed) % options.length]
}

function buildColumnSeed(value: number, index: number, digit: number) {
  return clampSorobanValue(value) * 17 + index * 31 + digit * 13
}

function describeColumn(value: number, column: string, digit: number, index: number) {
  const seed = buildColumnSeed(value, index, digit)
  const lowerBeadLabel = `${digit} lower bead${digit === 1 ? "" : "s"}`
  const raisedLowerBeads = `${digit - 5} lower bead${digit - 5 === 1 ? "" : "s"}`
  const zeroPhrases = [
    `the ${column} column is clear with no active beads`,
    `the ${column} column remains empty on this column`,
    `the ${column} column has no beads moved to the beam`,
    `the ${column} column is set to zero`,
  ] as const
  const upwardVerbs = ["pushed up", "moved upward", "slid up", "raised"] as const
  const activeFivePhrases = [
    `the ${column} column engages the upper bead while the lower deck stays clear`,
    `the ${column} column uses the five-bead alone and leaves every lower bead at rest`,
    `the ${column} column keeps the upper bead active with all four lower beads reset`,
    `the ${column} column relies on the upper bead only, with the lower section left at zero`,
  ] as const

  if (digit === 0) {
    return pickVariant(zeroPhrases, seed)
  }

  if (digit < 5) {
    const action = pickVariant(upwardVerbs, seed)
    const templates = [
      `the ${column} column shows ${digit} with the upper bead inactive and ${lowerBeadLabel} ${action}`,
      `the ${column} column represents ${digit} by keeping the upper bead away from the beam and ${action} ${lowerBeadLabel}`,
      `the ${column} column reads ${digit} because the top bead stays clear while ${lowerBeadLabel} are ${action}`,
      `the ${column} column marks ${digit} with no upper-bead contact and ${lowerBeadLabel} ${action}`,
    ] as const
    return pickVariant(templates, seed)
  }

  if (digit === 5) {
    return pickVariant(activeFivePhrases, seed)
  }

  const action = pickVariant(upwardVerbs, seed)
  const templates = [
    `the ${column} column shows ${digit} with the upper bead active and ${raisedLowerBeads} ${action}`,
    `the ${column} column represents ${digit} by combining the five-bead with ${raisedLowerBeads} ${action}`,
    `the ${column} column reads ${digit} because the upper bead is engaged and ${raisedLowerBeads} are ${action}`,
    `the ${column} column marks ${digit} with the top bead touching the beam and ${raisedLowerBeads} ${action}`,
  ] as const
  return pickVariant(templates, seed)
}

function buildTeachingText(value: number) {
  const normalized = clampSorobanValue(value)
  const digits = getDigits(normalized)
  const segments = digits.map((digit, index) => describeColumn(normalized, COLUMN_NAMES[index], digit, index))
  const leadIn = pickVariant(
    [
      `To show ${normalized} on a soroban, read the rods from left to right:`,
      `This soroban layout for ${normalized} can be understood rod by rod:`,
      `Reading the abacus from the highest place value to the units column, ${normalized} appears as follows:`,
      `On a soroban, the number ${normalized} is built with these column positions:`,
    ],
    normalized,
  )

  return `${leadIn} ${segments.join("; ")}.`
}

function buildHowToSteps(value: number) {
  const normalized = clampSorobanValue(value)
  const digits = getDigits(normalized)
  const opening = pickVariant(
    [
      "Start from a cleared soroban with every upper bead away from the beam and every lower bead resting at the bottom.",
      "Begin with a reset soroban: upper beads released and all lower beads resting below the beam.",
      "First clear the frame so no rod is counting: top beads off the beam and lower beads fully lowered.",
      "Set the soroban to zero before you begin, keeping the upper beads separated from the beam and the lower beads at rest.",
    ],
    normalized,
  )
  const closing = pickVariant(
    [
      `Read the rods from left to right to confirm that the soroban now represents ${normalized}.`,
      `Check each place value in order to verify that the abacus now shows ${normalized}.`,
      `Finish by scanning the rods from the highest place to the units column and confirm the result is ${normalized}.`,
      `Once every column is set, the soroban should read ${normalized} across the full frame.`,
    ],
    normalized + 7,
  )

  return [
    opening,
    ...digits.map((digit, index) => {
      const column = COLUMN_NAMES[index]
      const seed = buildColumnSeed(normalized, index, digit)
      const templates = [
        `Adjust the ${column} column to ${digit}. ${describeColumn(normalized, column, digit, index)}.`,
        `Set the ${column} column for ${digit}. Here, ${describeColumn(normalized, column, digit, index)}.`,
        `On the ${column} column, show ${digit}. In practice, ${describeColumn(normalized, column, digit, index)}.`,
        `Configure the ${column} rod for ${digit}. That means ${describeColumn(normalized, column, digit, index)}.`,
      ] as const
      return pickVariant(templates, seed)
    }),
    closing,
  ]
}

function buildHowToSchema(value: number) {
  const steps = buildHowToSteps(value)

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to represent ${value} on a soroban abacus`,
    description: `A step-by-step guide for showing ${value} on a virtual soroban with correct upper and lower bead positions.`,
    totalTime: "PT3S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Virtual soroban abacus",
      },
    ],
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text,
    })),
  }
}

function buildAbacusAriaLabel(value: number) {
  const normalized = clampSorobanValue(value)
  const digits = getDigits(normalized)
  const placeLabels = [
    { singular: "million", plural: "millions" },
    { singular: "hundred-thousand", plural: "hundred-thousands" },
    { singular: "ten-thousand", plural: "ten-thousands" },
    { singular: "thousand", plural: "thousands" },
    { singular: "hundred", plural: "hundreds" },
    { singular: "ten", plural: "tens" },
    { singular: "one", plural: "ones" },
  ] as const

  if (normalized < 10) {
    const ones = digits[digits.length - 1]
    return `Interactive abacus showing ${ones} ones on the units column.`
  }

  const firstNonZeroIndex = digits.findIndex((digit) => digit !== 0)
  const startIndex = firstNonZeroIndex === -1 ? digits.length - 1 : firstNonZeroIndex
  const fragments = digits.slice(startIndex).map((digit, index) => {
    const labels = placeLabels[startIndex + index]
    return `${digit} ${digit === 1 ? labels.singular : labels.plural}`
  })

  if (fragments.length === 1) {
    return `Interactive abacus visualizing ${normalized}, featuring ${fragments[0]}.`
  }

  const summary = `${fragments.slice(0, -1).join(", ")}, and ${fragments[fragments.length - 1]}`
  return `Interactive abacus visualizing ${normalized}, featuring ${summary}.`
}

function getRouteValueFromLocation() {
  const segments = window.location.pathname.split("/")
  const candidate = segments[segments.length - 1]
  return parseSorobanNumber(candidate).value
}

export function NumberGuideClientPage({
  initialValue,
  canonicalPath,
  clampNotice,
  isHomePage = false,
}: NumberGuideClientPageProps) {
  const [currentValue, setCurrentValue] = useState(() => clampSorobanValue(initialValue))
  const [inputValue, setInputValue] = useState(() => String(clampSorobanValue(initialValue)))
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [legalModal, setLegalModal] = useState<LegalModalType>(null)

  const commitValue = useCallback((nextValue: number) => {
    const value = clampSorobanValue(nextValue)
    setCurrentValue(value)
    setInputValue(String(value))
    window.history.replaceState(null, "", `/n/${value}`)
  }, [])

  useEffect(() => {
    const value = clampSorobanValue(initialValue)
    setCurrentValue(value)
    setInputValue(String(value))
  }, [initialValue])

  useEffect(() => {
    if (canonicalPath && window.location.pathname !== canonicalPath) {
      window.history.replaceState(null, "", canonicalPath)
    }
  }, [canonicalPath])

  useEffect(() => {
    const handlePopState = () => {
      const value = getRouteValueFromLocation()
      setCurrentValue(value)
      setInputValue(String(value))
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    if (!toastMessage) return

    const timeoutId = window.setTimeout(() => {
      setToastMessage(null)
    }, 2600)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  const teachingText = useMemo(() => buildTeachingText(currentValue), [currentValue])
  const howToSteps = useMemo(() => buildHowToSteps(currentValue), [currentValue])
  const howToSchema = useMemo(() => buildHowToSchema(currentValue), [currentValue])
  const abacusAriaLabel = useMemo(() => buildAbacusAriaLabel(currentValue), [currentValue])

  const handleWorksheetClick = useCallback(() => {
    setToastMessage(`Generating your free worksheet for ${formatSorobanValue(currentValue)}... Ready in 3 seconds!`)
  }, [currentValue])

  const handleCopyShareLink = useCallback(async () => {
    try {
      const shareText = `🔢 ${formatSorobanValue(currentValue)} on an abacus: ${window.location.href} — AbacusSnap, see any number instantly.`
      await navigator.clipboard.writeText(shareText)
      setToastMessage("Share copy ready. Paste it anywhere.")
    } catch {
      setToastMessage("Copy failed. Please copy the URL from your browser address bar.")
    }
  }, [currentValue])

  const handleApplyInput = useCallback(() => {
    const { value } = parseSorobanNumber(inputValue)
    commitValue(value)
  }, [commitValue, inputValue])

  const handleRandom = useCallback(() => {
    const value = Math.floor(Math.random() * MAX_SOROBAN_VALUE) + 1
    commitValue(value)
  }, [commitValue])

  const handleReset = useCallback(() => {
    commitValue(0)
  }, [commitValue])

  const handleGuideClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, value: number) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      event.preventDefault()
      commitValue(value)

      const topElement = document.getElementById("app-header")
      if (topElement) {
        topElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    },
    [commitValue],
  )

  const legalCopy =
    legalModal === "privacy"
      ? {
          title: "Privacy Policy",
          body: `This website provides an interactive soroban (abacus) simulator. We are committed to protecting your privacy.

Data Collection & Processing
- We do not collect, store, or share any personal information or identifiable data.
- The numbers you enter, random calculations, or the beads you click are processed entirely inside your local browser client-side. They are never sent to or stored on any server.
- No personal tracking cookies are used. No behavioral analytics or user tracking scripts are installed.
- We do not use localStorage or any browser storage for persistent user profiling.

Third-Party Infrastructure
- This site is hosted on cloud infrastructure which may collect standard server logs (e.g., IP address, request time, user agent) strictly for security and performance purposes. Those logs are handled temporarily by the provider and are not accessible or used by us.

Children’s Privacy (COPPA Compliant)
- This website is designed for general educational audiences, including children under 13. Since we absolutely do not collect, request, or store any personal information, no parental consent is required to use this learning tool.

Changes to This Policy
- If we ever add features that involve user registration or data collection, we will update this policy prominently on the homepage.

Contact Information
- For any privacy inquiries, you can contact the support team at info@abacussnap.com.`,
        }
      : {
          title: "Terms of Service",
          body: `Acceptable Use
- This virtual soroban is provided strictly for personal, educational, classroom, and non‑commercial practice use.
- You may not use automated scripts, bots, web-scrapers, or programmatic crawlers to abuse or reverse-engineer the interactive canvas engine.
- You are solely responsible for how you apply the visual information generated by this simulator.

Disclaimer of Warranties
- The tool is provided “as is” and “as available” without any warranties of absolute accuracy, reliability, or fitness for a particular academic purpose.
- While we strive for absolute mathematical correctness, bead positions and numeric-to-visual conversions may contain minor edge-case layout errors. You use the tool entirely at your own risk.

Limitation of Liability
- To the fullest extent permitted by applicable law, the authors and website owners shall not be liable for any indirect, incidental, or consequential damages or grading losses arising from your use of this educational website.

Governing Law
- This tool is provided globally and is operated as a static educational resource under standard international digital tool provisions. The tool is available "as is" regardless of the jurisdiction of the end-user.

Modifications
- We reserve the right to update these terms from time to time. Continued use of the site constitutes your full acceptance of the updated terms.

Contact Information
- For any inquiries regarding these terms, please contact us at info@abacussnap.com.`,
        }

  return (
    <DomainGuard>
      <main className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(255,251,235,0.98),_rgba(255,247,237,0.95)_35%,_rgba(245,245,244,0.94)_100%)] px-4 py-8 sm:px-6 lg:px-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2.5rem] border border-amber-100 bg-white/90 p-5 shadow-[0_30px_80px_-30px_rgba(180,83,9,0.28)] backdrop-blur sm:p-8 lg:p-10">
          <div id="app-header" className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {!isHomePage && (
              <div className="mb-4 w-full text-left">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-orange-700 transition hover:border-amber-300 hover:bg-amber-100 hover:text-orange-800"
                >
                  ← Back to Simulator
                </Link>
              </div>
            )}
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              AbacusSnap
            </h1>
            <p className="mt-1 mb-6 text-center text-lg font-medium tracking-tight text-amber-800/80 md:text-xl">
              See any number on an abacus, <strong className="font-bold text-orange-600">instantly</strong>.
            </p>
          </div>

          {clampNotice && (
            <div className="mx-auto mt-2 max-w-3xl rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              {clampNotice}
            </div>
          )}

          <div className="mt-4 flex flex-col items-center">
            <div
              role="img"
              aria-label={abacusAriaLabel}
              className="w-full overflow-x-auto rounded-[2rem] border border-amber-100 bg-[linear-gradient(180deg,rgba(255,251,235,0.9),rgba(255,247,237,0.8))] p-3 shadow-inner sm:p-6"
            >
              <div className="mx-auto w-fit min-w-max origin-top scale-[0.92] sm:scale-100">
                <Soroban value={currentValue} onChange={commitValue} />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
                CURRENT VALUE: {formatSorobanValue(currentValue)}
              </p>
            </div>

            <div className="mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    handleApplyInput()
                  }
                }}
                placeholder="Type any number (e.g., 888)..."
                aria-label="Type a soroban number"
                className="h-14 w-full rounded-full border border-amber-200 bg-white px-5 text-base text-stone-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
              />
              <Button
                size="lg"
                className="h-14 rounded-full bg-stone-900 px-6 text-sm text-white hover:bg-stone-800 sm:text-base"
                onClick={handleApplyInput}
              >
                Apply
              </Button>
            </div>
            <p className="mt-3 text-sm text-stone-500">
              Enter any whole number from 0 to {MAX_SOROBAN_VALUE.toLocaleString("en-US")}.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border border-amber-200 bg-amber-50/80 px-4 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                onClick={handleRandom}
              >
                🎲 Random
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border border-amber-200 bg-white px-4 text-stone-700 hover:bg-amber-50 hover:text-stone-900"
                onClick={handleReset}
              >
                🔄 Reset
              </Button>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-amber-500 px-6 text-sm text-white hover:bg-amber-600 sm:text-base"
                onClick={handleWorksheetClick}
              >
                Generate Free Worksheet (PDF)
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border border-zinc-200 bg-transparent px-6 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 sm:text-base"
                onClick={handleCopyShareLink}
              >
                🔗 Copy Share Link
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_1.95fr]">
          <aside className="rounded-[2rem] border border-amber-100 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(180,83,9,0.24)] backdrop-blur">
            <div className="text-lg font-semibold tracking-tight text-stone-900">Popular Guides</div>
            <div className="mt-5 space-y-5">
              {GUIDE_GROUPS.map((group) => (
                <section key={group.label}>
                  <h2 className="text-sm font-semibold tracking-wide text-orange-700">{group.label}</h2>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                    {group.values.map((value) => (
                      <Link
                        key={value}
                        href={`/n/${value}`}
                        onClick={(event) => handleGuideClick(event, value)}
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm font-medium text-orange-700 transition hover:border-amber-300 hover:bg-amber-100 hover:text-orange-800"
                      >
                        {value.toLocaleString("en-US")}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </aside>

          <article className="rounded-[2rem] border border-amber-100 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(180,83,9,0.24)] backdrop-blur">
            <details className="group rounded-[1.5rem] border border-amber-100 bg-amber-50/40 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-lg font-semibold tracking-tight text-stone-900">
                <span>📖 View Step-by-Step Bead Positioning Guide (Optional)</span>
                <span className="text-sm text-orange-600 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-5 space-y-5">
                <p className="text-pretty leading-8 text-stone-700">{teachingText}</p>
                <ol className="space-y-3 text-sm leading-7 text-stone-600 sm:text-[15px]">
                  {howToSteps.map((step, index) => (
                    <li key={index} className="rounded-2xl border border-amber-100 bg-white/80 px-4 py-3">
                      <span className="font-medium text-stone-900">Step {index + 1}.</span> {step}
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          </article>
        </section>

        <footer className="flex flex-wrap items-center justify-center gap-3 pb-4 text-xs text-stone-500">
          <Button variant="link" className="h-auto px-0 text-xs text-stone-500" onClick={() => setLegalModal("privacy")}>
            Privacy Policy
          </Button>
          <span>•</span>
          <Button variant="link" className="h-auto px-0 text-xs text-stone-500" onClick={() => setLegalModal("terms")}>
            Terms of Service
          </Button>
        </footer>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
          >
            <div className="rounded-full bg-stone-950 px-5 py-3 text-center text-sm font-medium text-stone-50 shadow-2xl shadow-stone-950/30">
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {legalModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLegalModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="w-full max-w-lg rounded-[1.75rem] border border-white/60 bg-white p-6 shadow-[0_30px_80px_-24px_rgba(28,25,23,0.45)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-stone-900">{legalCopy.title}</h2>
                  <p className="mt-3 text-sm leading-7 whitespace-pre-line text-stone-600">{legalCopy.body}</p>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setLegalModal(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </main>
    </DomainGuard>
  )
}
