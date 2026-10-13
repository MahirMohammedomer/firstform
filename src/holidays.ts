/* -------------------------------------------------------------------------
 * Holiday engine for Firstform
 * Discount offers are limited to:
 *   • Ramadan (the entire holy month)
 *   • Eid al-Fitr
 *   • Eid al-Adha
 *
 * Islamic dates use the tabular (arithmetic) Hijri calendar. Real dates
 * depend on moon sighting and may differ by ±1 day — well inside the window.
 * ---------------------------------------------------------------------- */

export type HolidayKind = "islamic";

export interface Holiday {
  id: string;
  kind: HolidayKind;
  /** Local midnight of the holiday (or start of Ramadan) */
  date: Date;
  name: { en: string; am: string };
  greeting: { en: string; am: string };
  /** Optional end date for multi-day periods (Ramadan) */
  endDate?: Date;
}

export const OFFER_DAYS_BEFORE = 3;
export const OFFER_DAYS_AFTER = 2;
export const OFFER_DISCOUNT = 0.2;

/* ------------------------- calendar arithmetic ------------------------- */

const floor = Math.floor;

/** Gregorian (proleptic) → Julian Day Number */
function gregorianToJdn(y: number, m: number, d: number) {
  const a = floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return d + floor((153 * mm + 2) / 5) + 365 * yy + floor(yy / 4) - floor(yy / 100) + floor(yy / 400) - 32045;
}

/** Julian Day Number → Gregorian [y, m, d] */
function jdnToGregorian(jdn: number): [number, number, number] {
  const a = jdn + 32044;
  const b = floor((4 * a + 3) / 146097);
  const c = a - floor((146097 * b) / 4);
  const d = floor((4 * c + 3) / 1461);
  const e = c - floor((1461 * d) / 4);
  const m = floor((5 * e + 2) / 153);
  const day = e - floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * floor(m / 10);
  const year = 100 * b + d - 4800 + floor(m / 10);
  return [year, month, day];
}

/** Tabular Islamic (Hijri) date → JDN (Kuwaiti algorithm) */
function hijriToJdn(y: number, m: number, d: number) {
  return floor((11 * y + 3) / 30) + 354 * y + 30 * m - floor((m - 1) / 2) + d + 1948440 - 385;
}

function jdnToLocalDate(jdn: number) {
  const [y, m, d] = jdnToGregorian(jdn);
  return new Date(y, m - 1, d);
}

/* ------------------------------ holidays -------------------------------- */

type Meta = Omit<Holiday, "date" | "endDate">;

const META: Record<string, Meta> = {
  ramadan: {
    id: "ramadan",
    kind: "islamic",
    name: { en: "Ramadan", am: "ረመዳን" },
    greeting: { en: "Ramadan Kareem!", am: "ረመዳን ከሪም!" },
  },
  eidfitr: {
    id: "eidfitr",
    kind: "islamic",
    name: { en: "Eid al-Fitr", am: "ኢድ አል ፈጥር" },
    greeting: { en: "Eid Mubarak!", am: "ኢድ ሙባረክ!" },
  },
  eidadha: {
    id: "eidadha",
    kind: "islamic",
    name: { en: "Eid al-Adha (Arefa)", am: "ኢድ አል አድሃ (አረፋ)" },
    greeting: { en: "Eid Mubarak!", am: "ኢድ ሙባረክ!" },
  },
};

const make = (id: string, jdn: number, endJdn?: number): Holiday => {
  const h: Holiday = { ...META[id], date: jdnToLocalDate(jdn) };
  if (endJdn !== undefined) h.endDate = jdnToLocalDate(endJdn);
  return h;
};

/** All tracked holidays whose Gregorian date falls within [fromYear, toYear]. */
export function holidaysForYears(fromYear: number, toYear: number): Holiday[] {
  const list: Holiday[] = [];
  const minJdn = gregorianToJdn(fromYear, 1, 1);
  const maxJdn = gregorianToJdn(toYear, 12, 31);
  const push = (id: string, jdn: number, endJdn?: number) => {
    if (jdn >= minJdn && jdn <= maxJdn) list.push(make(id, jdn, endJdn));
  };

  // Islamic holidays only: Ramadan, Eid al-Fitr, Eid al-Adha
  const hFrom = floor(((fromYear - 622) * 33) / 32) - 1;
  const hTo = floor(((toYear - 622) * 33) / 32) + 1;
  for (let h = hFrom; h <= hTo; h++) {
    // Ramadan: 1st to last day of month 9 (approx 29–30 days)
    const ramadanStart = hijriToJdn(h, 9, 1);
    const ramadanEnd = hijriToJdn(h, 9, 30); // conservative; actual length 29 or 30
    push("ramadan", ramadanStart, ramadanEnd);

    push("eidfitr", hijriToJdn(h, 10, 1));
    push("eidadha", hijriToJdn(h, 12, 10));
  }

  return list.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/* ------------------------------- offers --------------------------------- */

export interface ActiveOffer {
  holiday: Holiday;
  /** ms — first moment of the offer */
  start: number;
  /** ms — first moment AFTER the offer */
  end: number;
  /** "pre" = before the holiday itself, "during" = holiday day or after */
  phase: "pre" | "during";
  code: string;
}

const dayShift = (d: Date, days: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + days).getTime();

export function offerWindow(h: Holiday) {
  if (h.id === "ramadan" && h.endDate) {
    // Offer runs for the entire month of Ramadan (start of 1st → end of last day)
    return {
      start: dayShift(h.date, 0),
      end: dayShift(h.endDate, 1),
    };
  }
  // Eid: 3 days before → 2 days after
  return {
    start: dayShift(h.date, -OFFER_DAYS_BEFORE),
    end: dayShift(h.date, OFFER_DAYS_AFTER + 1),
  };
}

/**
 * Returns the active holiday offer at `nowMs`, or null.
 * Overlapping windows are merged: the headline holiday is the latest one,
 * and the offer runs until the latest window closes.
 */
export function getActiveOffer(nowMs: number): ActiveOffer | null {
  const y = new Date(nowMs).getFullYear();
  const candidates = holidaysForYears(y - 1, y + 1)
    .map((h) => ({ h, ...offerWindow(h) }))
    .filter((w) => nowMs >= w.start && nowMs < w.end);
  if (!candidates.length) return null;

  const headline = candidates.reduce((a, b) => (b.h.date > a.h.date ? b : a));
  const start = Math.min(...candidates.map((c) => c.start));
  const end = Math.max(...candidates.map((c) => c.end));
  const phase: ActiveOffer["phase"] = nowMs < headline.h.date.getTime() ? "pre" : "during";
  return { holiday: headline.h, start, end, phase, code: `${headline.h.id.toUpperCase()}20` };
}

/** Next upcoming holiday after nowMs (used for internal previews). */
export function getNextHoliday(nowMs: number): Holiday | null {
  const y = new Date(nowMs).getFullYear();
  return holidaysForYears(y, y + 1).find((h) => h.date.getTime() > nowMs) ?? null;
}
