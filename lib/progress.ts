const KEY = "abacus-progress-v1";

export type Progress = { best: number; streak: number; lastDay: string; mastered: number[] };

const blank: Progress = { best: 0, streak: 0, lastDay: "", mastered: [] };

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank;
    return { ...blank, ...JSON.parse(raw) };
  } catch {
    return blank;
  }
}

export function recordWin(score: number, target: number): Progress {
  const p = loadProgress();
  const today = new Date().toISOString().slice(0, 10);
  const streak = p.lastDay === today ? p.streak : p.lastDay === yesterday() ? p.streak + 1 : 1;
  const next: Progress = {
    best: Math.max(p.best, score),
    streak,
    lastDay: today,
    mastered: [...new Set([...p.mastered, target])].slice(-50),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch { /* private mode */ }
  return next;
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
