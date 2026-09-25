import { ImageResponse } from "next/og";

import { CURATED_SITEMAP_NUMBERS } from "@/lib/core-soroban-numbers";
import { AbacusOgFigure } from "@/lib/og-abacus";
import { parseSorobanNumber } from "@/lib/soroban-number";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return CURATED_SITEMAP_NUMBERS.map((value) => ({ number: String(value) }));
}

export default async function NumberOgImage({ params }: { params: Promise<{ number?: string }> }) {
  const { number } = await params;
  const { value } = parseSorobanNumber(number);
  const label = value.toLocaleString("en-US");
  return new ImageResponse(
    <AbacusOgFigure value={value} title={`${label} on an abacus`} subtitle="AbacusSnap — see any number instantly" />,
    { ...size },
  );
}
