import type { DayKey, Therapist } from "./data/staff";

export interface Slot {
  iso: string;
  label: string;
  evening: boolean;
}

export interface DaySlots {
  iso: string;
  weekday: string;
  dayNum: number;
  month: string;
  slots: Slot[];
}

const dayKeys: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat"];

/**
 * Builds a plausible fortnight of openings for a clinician.
 *
 * Deterministic on purpose — the same clinician yields the same grid on every
 * render, so the page does not reshuffle under the user between paints. A real
 * deployment swaps this for the practice-management API; the component contract
 * stays identical.
 */
export function slotsFor(t: Therapist, from: Date, days = 14): DaySlots[] {
  const out: DaySlots[] = [];
  const seed = hash(t.slug);

  for (let i = 1; i <= days; i++) {
    const d = new Date(from);
    d.setDate(d.getDate() + i);

    const jsDay = d.getDay(); // 0 = Sunday
    if (jsDay === 0) continue;
    const key = dayKeys[jsDay - 1];
    if (!t.availableDays.includes(key)) continue;

    const isSat = key === "sat";
    if (isSat && !t.saturdays) continue;

    const times: Slot[] = [];
    const base = ["9:00 am", "10:00 am", "11:00 am", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm"];
    const evening = ["5:30 pm", "6:30 pm", "7:30 pm"];
    const satTimes = ["8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm"];

    const pool = isSat ? satTimes : t.evenings ? [...base, ...evening] : base;

    pool.forEach((label, j) => {
      // A pseudo-random but stable open/closed decision per clinician per slot.
      const open = (seed + i * 31 + j * 17) % 10 > (t.availability === "accepting" ? 4 : 6);
      if (open) {
        times.push({
          iso: `${d.toISOString().slice(0, 10)}T${j}`,
          label,
          evening: evening.includes(label),
        });
      }
    });

    if (times.length) {
      out.push({
        iso: d.toISOString().slice(0, 10),
        weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
        slots: times,
      });
    }
  }
  return out;
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 1000;
}
