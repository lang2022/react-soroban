import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function digitsOf(value: number): number[] {
  const n = Math.max(0, Math.min(9999999, Math.trunc(value) || 0));
  return n.toString().padStart(7, "0").split("").map(Number);
}

function AbacusFigure({ value, subtitle }: { value: number; subtitle: string }) {
  const digits = digitsOf(value);
  return (
    <div
      style={{
        width: 1200, height: 630, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", background: "#fffbeb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 92, fontWeight: 800, color: "#1c1917" }}>
        {value.toLocaleString("en-US")}
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: 24 }}>
        {digits.map((d, i) => {
          const upper = d >= 5;
          const lower = d % 5;
          return (
            <div
              key={i}
              style={{
                width: 90, height: 260, display: "flex", flexDirection: "column",
                alignItems: "center", background: "#fef3c7",
                border: "6px solid #92400e", borderRadius: 12, paddingTop: 8, paddingBottom: 8,
              }}
            >
              <div style={{
                width: 56, height: 30, borderRadius: 15, marginTop: upper ? 78 : 6,
                background: upper ? "#ea580c" : "#fdba74", border: "3px solid #7c2d12",
              }} />
              <div style={{ height: 12, width: 90, background: "#451a03", marginTop: 8, marginBottom: 8 }} />
              {[0, 1, 2, 3].map((b) => (
                <div key={b} style={{
                  width: 56, height: 26, borderRadius: 13, marginTop: 4,
                  background: b < lower ? "#ea580c" : "#fdba74",
                  border: "3px solid #7c2d12",
                  opacity: b < lower ? 1 : 0.85,
                }} />
              ))}
              <div style={{ fontSize: 22, fontWeight: 800, color: "#57534e", marginTop: 6 }}>{d}</div>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 32, color: "#b45309", marginTop: 22 }}>{subtitle}</div>
    </div>
  );
}

export default function HomeOgImage() {
  return new ImageResponse(
    <AbacusFigure value={888} subtitle="AbacusSnap — see any number instantly" />,
    { ...size },
  );
}
