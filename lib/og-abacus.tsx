function beadStyle(active: boolean) {
  return {
    display: "flex" as const,
    width: 56,
    height: 26,
    borderRadius: 13,
    marginTop: 4,
    background: active ? "#ea580c" : "#fdba74",
    borderWidth: 3,
    borderStyle: "solid" as const,
    borderColor: "#7c2d12",
  };
}

function rodChildren(digit: number, prefix: string) {
  const upper = digit >= 5;
  const lower = digit % 5;
  const els = [
    <div
      key={`${prefix}-u`}
      style={{
        display: "flex",
        width: 56,
        height: 30,
        borderRadius: 15,
        marginTop: upper ? 78 : 6,
        background: upper ? "#ea580c" : "#fdba74",
        borderWidth: 3,
        borderStyle: "solid" as const,
        borderColor: "#7c2d12",
      }}
    />,
    <div
      key={`${prefix}-beam`}
      style={{ display: "flex", height: 12, width: 90, background: "#451a03", marginTop: 8, marginBottom: 8 }}
    />,
  ];
  for (let b = 0; b < 4; b++) {
    els.push(<div key={`${prefix}-l${b}`} style={beadStyle(b < lower)} />);
  }
  els.push(
    <div
      key={`${prefix}-d`}
      style={{ display: "flex", fontSize: 22, fontWeight: 800, color: "#57534e", marginTop: 6 }}
    >
      {String(digit)}
    </div>,
  );
  return els;
}

export function AbacusOgFigure({ value, title, subtitle }: { value: number; title: string; subtitle: string }) {
  const normalized = Math.max(0, Math.min(9999999, Math.trunc(value) || 0));
  const digits = normalized.toString().padStart(7, "0").split("").map(Number);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 1200,
        height: 630,
        background: "#fffbeb",
      }}
    >
      <div style={{ display: "flex", fontSize: 88, fontWeight: 800, color: "#1c1917" }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 24 }}>
        {digits.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 90,
              height: 300,
              marginLeft: i === 0 ? 0 : 18,
              background: "#fef3c7",
              borderWidth: 6,
              borderStyle: "solid" as const,
              borderColor: "#92400e",
              borderRadius: 12,
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            {rodChildren(d, `r${i}`)}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", fontSize: 32, color: "#b45309", marginTop: 22 }}>{subtitle}</div>
    </div>
  );
}
