import { clampSorobanValue, formatSorobanValue } from "@/lib/soroban-number";

export type QuizLevel = "easy" | "medium" | "hard" | "expert";

export const QUIZ_RANGES: Record<QuizLevel, { min: number; max: number }> = {
  easy: { min: 1, max: 9 },
  medium: { min: 1, max: 99 },
  hard: { min: 1, max: 999 },
  expert: { min: 1000, max: 9999 },
};

export function randomQuizTarget(level: QuizLevel): number {
  const { min, max } = QUIZ_RANGES[level];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function renderAbacusShareBlob(value: number): Promise<Blob> {
  const normalized = clampSorobanValue(value);
  const digits = normalized
    .toString()
    .padStart(7, "0")
    .split("")
    .map(Number);

  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no ctx");

  ctx.fillStyle = "#fffbeb";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#1c1917";
  ctx.textAlign = "center";
  ctx.font = "bold 96px system-ui, sans-serif";
  ctx.fillText(formatSorobanValue(normalized), W / 2, 120);

  const frameX = 150;
  const frameY = 170;
  const frameW = W - 300;
  const frameH = 340;
  const rods = 7;
  const rodGap = frameW / rods;

  ctx.fillStyle = "#92400e";
  ctx.fillRect(frameX - 18, frameY - 18, frameW + 36, frameH + 36);
  ctx.fillStyle = "#fef3c7";
  ctx.fillRect(frameX, frameY, frameW, frameH);

  const beamY = frameY + 110;
  ctx.fillStyle = "#451a03";
  ctx.fillRect(frameX, beamY - 8, frameW, 16);

  digits.forEach((digit, i) => {
    const cx = frameX + rodGap * (i + 0.5);
    ctx.strokeStyle = "#a8a29e";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(cx, frameY + 8);
    ctx.lineTo(cx, frameY + frameH - 8);
    ctx.stroke();

    const upperActive = digit >= 5;
    const lowerActive = digit % 5;
    const beadW = 56;
    const beadH = 34;

    const drawBead = (x: number, y: number, active: boolean) => {
      ctx.beginPath();
      ctx.ellipse(x, y, beadW / 2, beadH / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = active ? "#ea580c" : "#fdba74";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#7c2d12";
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x - 8, y - 6, 8, 5, -0.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fill();
    };

    drawBead(cx, upperActive ? beamY - 34 : frameY + 36, upperActive);

    for (let b = 0; b < 4; b++) {
      const engaged = b < lowerActive;
      const y = engaged
        ? beamY + 30 + b * 40
        : frameY + frameH - 30 - (3 - b) * 40;
      drawBead(cx, y, engaged);
    }

    ctx.fillStyle = "#78716c";
    ctx.font = "bold 24px system-ui, sans-serif";
    ctx.fillText(String(digit), cx, frameY + frameH + 28);
  });

  ctx.fillStyle = "#b45309";
  ctx.font = "36px system-ui, sans-serif";
  ctx.fillText("AbacusSnap — see any number instantly", W / 2, H - 30);

  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
  if (!blob) throw new Error("no blob");
  return blob;
}
