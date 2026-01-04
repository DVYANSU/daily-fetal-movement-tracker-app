export function formatDayName(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { weekday: "long" });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDurationMMSS(durationSec: number): string {
  const total = Math.max(0, Math.floor(durationSec));
  const m = Math.floor(total / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return `${mm}:${ss}`;
}