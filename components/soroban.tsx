"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { clampSorobanValue } from "@/lib/soroban-number";

const RODS = 7;

const BEAD_H = 26;
const HEAVEN_SLOTS = 2;
const EARTH_SLOTS = 5;
const HEAVEN_H = BEAD_H * HEAVEN_SLOTS;
const EARTH_H = BEAD_H * EARTH_SLOTS;

const PALETTE = {
  frame: "#6b4226",
  frameEdge: "#8a5a34",
  beam: "#4a2c1a",
  rod: "#a87b56",
  rodShadow: "#7c5a3d",
  beadFace: "#f5e7d0",
  beadEdge: "#d9c2a5",
  beadActive: "#d97706",
  beadActiveEdge: "#92400e",
};

const BEAD_CLIP =
  "polygon(0% 50%, 20% 10%, 80% 10%, 100% 50%, 80% 90%, 20% 90%)";
const spring = {
  type: "spring" as const,
  stiffness: 700,
  damping: 30,
  mass: 0.6,
};

type Digit = { heaven: boolean; earth: 0 | 1 | 2 | 3 | 4 };

export type SorobanProps = {
  value?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  highlightedColumnIndex?: number | null;
};

function digitToBeads(digit: number): Digit {
  const d = Math.max(0, Math.min(9, Math.trunc(digit)));

  switch (d) {
    case 0:
      return { heaven: false, earth: 0 };
    case 1:
      return { heaven: false, earth: 1 };
    case 2:
      return { heaven: false, earth: 2 };
    case 3:
      return { heaven: false, earth: 3 };
    case 4:
      return { heaven: false, earth: 4 };
    case 5:
      return { heaven: true, earth: 0 };
    case 6:
      return { heaven: true, earth: 1 };
    case 7:
      return { heaven: true, earth: 2 };
    case 8:
      return { heaven: true, earth: 3 };
    case 9:
      return { heaven: true, earth: 4 };
    default:
      return { heaven: false, earth: 0 };
  }
}

function valueToDigits(value: number): Digit[] {
  const clamped = clampSorobanValue(value);
  const digits: Digit[] = [];

  for (let i = 0; i < RODS; i++) {
    const place = 10 ** (RODS - 1 - i);
    const digit = Math.floor(clamped / place) % 10;
    digits.push(digitToBeads(digit));
  }

  return digits;
}

function digitsToValue(digits: Digit[]): number {
  return digits.reduce((acc, digit, index) => {
    const place = 10 ** (RODS - 1 - index);
    return acc + ((digit.heaven ? 5 : 0) + digit.earth) * place;
  }, 0);
}

function Bead({
  top,
  active,
  width,
  onClick,
  label,
}: {
  top: number;
  active: boolean;
  width: number;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="absolute left-1/2 cursor-pointer touch-manipulation select-none outline-none"
      style={{
        width,
        height: BEAD_H,
        x: "-50%",
        clipPath: BEAD_CLIP,
        background: active ? PALETTE.beadActive : PALETTE.beadFace,
        boxShadow: active
          ? `inset 0 0 0 1px ${PALETTE.beadActiveEdge}, inset 0 5px 7px rgba(255,235,160,0.7), inset 0 -6px 8px rgba(120,80,0,0.35)`
          : `inset 0 0 0 1px ${PALETTE.beadEdge}, inset 0 4px 5px rgba(255,255,255,0.55), inset 0 -5px 7px rgba(60,64,72,0.22)`,
        opacity: active ? 1 : 0.92,
      }}
      animate={{ top }}
      transition={spring}
      whileTap={{ scale: 0.92 }}
    />
  );
}

function RodLine() {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-0 h-full -translate-x-1/2 rounded-full"
      style={{
        width: 6,
        background: `linear-gradient(90deg, ${PALETTE.rodShadow}, ${PALETTE.rod}, ${PALETTE.rodShadow})`,
      }}
    />
  );
}

function Rod({
  index,
  digit,
  onChange,
  beadWidth,
  isHighlighted,
}: {
  index: number;
  digit: Digit;
  onChange: (digit: Digit) => void;
  beadWidth: number;
  isHighlighted: boolean;
}) {
  const place = 10 ** (RODS - 1 - index);
  const digitValue = (digit.heaven ? 5 : 0) + digit.earth;
  const heavenTop = digit.heaven ? HEAVEN_H - BEAD_H : 0;
  const earthTop = (i: number) =>
    i < digit.earth ? i * BEAD_H : EARTH_H - (4 - i) * BEAD_H;
  const hasUnitDot = index === RODS - 1 || index === RODS - 4;

  return (
    <div
      className={`relative flex flex-col items-center rounded-2xl px-1 py-2 transition ${
        isHighlighted ? "bg-orange-100/70 shadow-[0_0_0_1px_rgba(249,115,22,0.2)]" : ""
      }`}
      tabIndex={0}
      role="spinbutton"
      aria-valuemin={0}
      aria-valuemax={9}
      aria-valuenow={digitValue}
      aria-label={`Rod ${RODS - index}, value ${digitValue}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowRight") { e.preventDefault(); e.stopPropagation(); onChange({ heaven: digitValue + 1 >= 5 ? true : digit.heaven, earth: Math.min(4, ((digitValue + 1) % 5) >= 0 ? (digitValue + 1 >= 5 ? (digitValue + 1 - 5) : digitValue + 1) : digit.earth) as Digit["earth"] }) }
        else if (e.key === "ArrowDown" || e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); const v = Math.max(0, digitValue - 1); onChange({ heaven: v >= 5, earth: (v >= 5 ? v - 5 : v) as Digit["earth"] }) }
        else if (e.key >= "0" && e.key <= "9") { e.preventDefault(); e.stopPropagation(); const v = Number(e.key); onChange({ heaven: v >= 5, earth: (v >= 5 ? v - 5 : v) as Digit["earth"] }) }
      }}
    >
      <div
        className="relative"
        style={{ width: beadWidth + 16, height: HEAVEN_H }}
      >
        <RodLine />
        <Bead
          top={heavenTop}
          active={digit.heaven}
          width={beadWidth}
          label={`Rod ${RODS - index} heaven bead, worth 5, ${digit.heaven ? "counted" : "not counted"}`}
          onClick={() => onChange({ ...digit, heaven: !digit.heaven })}
        />
      </div>

      <div
        className="relative z-10 w-full"
        style={{
          height: 12,
          background: PALETTE.beam,
          boxShadow: isHighlighted
            ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(249,115,22,0.35)"
            : "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {hasUnitDot && (
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-300" />
        )}
      </div>

      <div
        className="relative"
        style={{ width: beadWidth + 16, height: EARTH_H }}
      >
        <RodLine />
        {[0, 1, 2, 3].map((i) => {
          const active = i < digit.earth;

          return (
            <Bead
              key={i}
              top={earthTop(i)}
              active={active}
              width={beadWidth}
              label={`Rod ${RODS - index} earth bead ${i + 1}, ${active ? "counted" : "not counted"}`}
              onClick={() => {
                const nextEarth = (active ? i : i + 1) as Digit["earth"];
                onChange({ ...digit, earth: nextEarth });
              }}
            />
          );
        })}
      </div>

      <div className="mt-2 font-mono text-sm font-semibold tabular-nums text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {digitValue}
        <span className="ml-0.5 text-[10px] font-medium text-amber-200/90">
          {place >= 1000
            ? `×${place.toLocaleString()}`
            : place > 1
              ? `×${place}`
              : ""}
        </span>
      </div>
    </div>
  );
}

export function Soroban({
  value,
  initialValue = 0,
  onChange,
  className,
  highlightedColumnIndex = null,
}: SorobanProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(() =>
    clampSorobanValue(initialValue),
  );
  const currentValue = isControlled ? clampSorobanValue(value) : internalValue;
  const digits = useMemo(() => valueToDigits(currentValue), [currentValue]);
  const [beadWidth, setBeadWidth] = useState(40);
  useEffect(() => {
    const update = () => setBeadWidth(window.innerWidth < 400 ? 30 : window.innerWidth < 640 ? 34 : 40);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(clampSorobanValue(initialValue));
    }
  }, [initialValue, isControlled]);

  const commitValue = useCallback(
    (nextValue: number) => {
      const clamped = clampSorobanValue(nextValue);

      if (!isControlled) {
        setInternalValue(clamped);
      }

      onChange?.(clamped);
    },
    [isControlled, onChange],
  );

  const handleRodChange = useCallback(
    (rodIndex: number, nextDigit: Digit) => {
      const nextDigits = digits.map((digit, index) =>
        index === rodIndex ? nextDigit : digit,
      );
      commitValue(digitsToValue(nextDigits));
    },
    [commitValue, digits],
  );

  return (
    <div className={className} style={{ touchAction: "manipulation" }}>
      <div className="overflow-x-auto pb-2">
        <div
          className="mx-auto inline-flex rounded-[2rem] p-4 sm:p-6"
          style={{
            background: `linear-gradient(180deg, ${PALETTE.frameEdge}, ${PALETTE.frame})`,
            boxShadow:
              "0 20px 40px -16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(58,35,20,0.55)",
          }}
        >
          <div className="flex gap-1 sm:gap-3">
            {digits.map((digit, index) => (
              <Rod
                key={index}
                index={index}
                digit={digit}
                beadWidth={beadWidth}
                isHighlighted={highlightedColumnIndex === index}
                onChange={(nextDigit) => handleRodChange(index, nextDigit)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
