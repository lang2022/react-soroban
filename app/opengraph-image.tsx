import { ImageResponse } from "next/og";

import { AbacusOgFigure } from "@/lib/og-abacus";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function HomeOgImage() {
  return new ImageResponse(
    <AbacusOgFigure value={888} title="888" subtitle="AbacusSnap — see any number instantly" />,
    { ...size },
  );
}
