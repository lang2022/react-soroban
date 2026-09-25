import { formatSorobanValue } from "@/lib/soroban-number";

export function buildWorksheetHTML(value: number): string {
  const seed = value * 7919 + 13;
  const rand = (i: number) => (seed * (i * 9301 + 49297)) % 100000 / 100000;
  const pick = (i: number, max: number) => Math.floor(rand(i) * max) + 1;
  const read = Array.from({ length: 5 }, (_, i) => pick(i + 1, 9999));
  const set = Array.from({ length: 5 }, (_, i) => pick(i + 11, 999));
  const listen = Array.from({ length: 10 }, (_, i) => pick(i + 21, 99));
  const row = (n: number, q: string) =>
    `<tr><td>${n}</td><td>${q}</td><td class="box"></td></tr>`;
  return `<!doctype html><html><head><meta charset="utf-8"><title>AbacusSnap Worksheet</title>
<style>body{font-family:system-ui,sans-serif;padding:32px;color:#111}h1{font-size:22px}table{width:100%;border-collapse:collapse;margin:12px 0 24px}td,th{border:1px solid #999;padding:8px;font-size:15px}.box{width:35%}@media print{.no-print{display:none}}</style>
</head><body>
<h1>AbacusSnap Practice Sheet — ${formatSorobanValue(value)}</h1>
<p>Read / set / listen-count. Answers at bottom. Print to PDF (Ctrl/Cmd+P).</p>
<button class="no-print" onclick="window.print()">Print / Save PDF</button>
<h2>A. Read the abacus (write the number)</h2><table>${read.map((v, i) => row(i + 1, `Set abacus to <b>${v.toLocaleString("en-US")}</b>, read it aloud`)).join("")}</table>
<h2>B. Set the number (draw the beads)</h2><table>${set.map((v, i) => row(i + 6, `Show <b>${v}</b> on the abacus`)).join("")}</table>
<h2>C. Mental listen-count (10 × +7 / −3 chains from 0)</h2><table>${listen.map((v, i) => row(i + 11, `Start ${v}, +7 −3 ×5, final = ?`)).join("")}</table>
<p style="color:#666;font-size:12px">Answers: A: ${read.join(", ")} · B: ${set.join(", ")} · Generated locally, no data leaves your browser. abacussnap.com</p>
</body></html>`;
}

export function openWorksheetPrint(value: number) {
  const w = window.open("", "_blank", "width=800,height=900");
  if (!w) return false;
  w.document.write(buildWorksheetHTML(value));
  w.document.close();
  return true;
}
