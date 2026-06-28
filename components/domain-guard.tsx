"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { isAuthorizedHostname, isDomainGuardEnabled, OFFICIAL_SITE_URL } from "@/lib/domain-guard"

type DomainGuardProps = {
  children: React.ReactNode
}

export function DomainGuard({ children }: DomainGuardProps) {
  const [isBlocked, setIsBlocked] = useState(false)
  const [hostname, setHostname] = useState("")

  useEffect(() => {
    if (!isDomainGuardEnabled()) {
      return
    }

    const currentHostname = window.location.hostname
    setHostname(currentHostname)

    if (!isAuthorizedHostname(currentHostname)) {
      console.warn("Unauthorized domain detected.")
      setIsBlocked(true)
    }
  }, [])

  if (isBlocked) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,251,235,0.98),_rgba(255,247,237,0.95)_35%,_rgba(245,245,244,0.94)_100%)] px-4 py-10">
        <section className="w-full max-w-2xl rounded-[2.5rem] border border-amber-100 bg-white/95 p-8 text-center shadow-[0_30px_80px_-30px_rgba(180,83,9,0.28)] backdrop-blur sm:p-10">
          <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-700">
            Official Access Required
          </span>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            AbacusSnap is only available on its official domain.
          </h1>
          <p className="mt-4 text-pretty text-sm leading-7 text-stone-600 sm:text-base">
            This interactive soroban experience has been disabled because it is being accessed from an unauthorized host.
            Please continue to the official AbacusSnap site to use the authentic simulator, bead guide, and classroom tools.
          </p>
          <p className="mt-3 text-sm text-stone-500">Detected host: {hostname}</p>
          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="rounded-full bg-amber-500 px-6 text-sm text-white hover:bg-amber-600 sm:text-base"
              onClick={() => {
                window.location.href = OFFICIAL_SITE_URL
              }}
            >
              Continue to Official Site
            </Button>
          </div>
        </section>
      </main>
    )
  }

  return <>{children}</>
}
