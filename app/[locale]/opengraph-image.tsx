import { ImageResponse } from "next/og";

import type { Locale } from "@/lib/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SUBTITLES: Record<Locale, string> = {
  en: "AbacusSnap — see any number instantly",
  de: "AbacusSnap — jede Zahl sofort sehen",
  fr: "AbacusSnap — voir tout nombre instantanément",
};

export default async function LocaleOgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sub = (SUBTITLES as Record<string, string>)[locale] ?? SUBTITLES.en;
  return new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", background: "#fffbeb",
        fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{ fontSize: 110, fontWeight: 800, color: "#1c1917" }}>AbacusSnap</div>
        <div style={{ fontSize: 36, color: "#b45309", marginTop: 20 }}>{sub}</div>
      </div>
    ),
    { ...size },
  );
}
