import type { CurriculumLesson, CurriculumLookup } from "@/types/curriculum";

/** Strip the leading ". " prefix that curriculum.json uses on all LO fields. */
export function cleanLO(raw: string): string {
  return raw.replace(/^(\.\s*)+/, '').trim();
}

function withCleanLOs(lesson: CurriculumLesson): CurriculumLesson {
  return {
    ...lesson,
    dailyLO: cleanLO(lesson.dailyLO),
    skillLO: cleanLO(lesson.skillLO),
    knowledgeLO: cleanLO(lesson.knowledgeLO),
  };
}

// Import the JSON with an explicit cast to avoid TypeScript inferring
// the full shape of ~950 KB of nested data (which slows type-checking).
// eslint-disable-next-line @typescript-eslint/no-require-imports
const rawData = require("@/data/curriculum.json") as CurriculumLookup;

// ── Lazy indexes ──────────────────────────────────────────────────────────────
// Built once on first use; keyed as `${yearNum}_${week}` and `${yearNum}`.

type WeekKey = `${number}_${number}`;

let _byWeek: Map<WeekKey, CurriculumLesson[]> | null = null;
let _byYear: Map<number, CurriculumLesson[]> | null = null;

function buildIndexes(): void {
  if (_byWeek) return;
  _byWeek = new Map();
  _byYear = new Map();

  for (const entry of Object.values(rawData)) {
    const items: CurriculumLesson[] = Array.isArray(entry) ? entry : [entry];
    for (const lesson of items) {
      const { yearNum, week } = lesson;
      if (yearNum !== null && week !== null) {
        const wKey = `${yearNum}_${week}` as WeekKey;
        const wList = _byWeek.get(wKey) ?? [];
        wList.push(lesson);
        _byWeek.set(wKey, wList);
      }
      if (yearNum !== null) {
        const yList = _byYear!.get(yearNum) ?? [];
        yList.push(lesson);
        _byYear!.set(yearNum, yList);
      }
    }
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Look up a lesson by its identifier (e.g. `"0.S1.K1.H3"`).
 *
 * Returns a single `CurriculumLesson` for IDs that are unique across years.
 * Returns a `CurriculumLesson[]` for IDs that appear in multiple years
 * (exam-slot rows such as `"E.S0.K0.H1"`).
 * Returns `null` when the ID is not found.
 */
export function getLessonById(id: string): CurriculumLesson | CurriculumLesson[] | null {
  const entry = rawData[id] ?? null;
  if (!entry) return null;
  return Array.isArray(entry) ? entry.map(withCleanLOs) : withCleanLOs(entry);
}

/**
 * Return every lesson scheduled for a specific year and week, sorted by
 * period number ascending.
 *
 * `year` can be a number (0–6) or the label string `"Year 0"` … `"Year 6"`.
 */
export function getLessonsByWeek(
  year: number | string,
  week: number
): CurriculumLesson[] {
  buildIndexes();
  const yn = resolveYearNum(year);
  if (yn === null) return [];
  const key = `${yn}_${week}` as WeekKey;
  const lessons = _byWeek!.get(key) ?? [];
  return [...lessons].sort(byPeriod).map(withCleanLOs);
}

/**
 * Return a sorted list of all week numbers that have at least one lesson in
 * the given year.
 *
 * `year` can be a number (0–6) or the label string `"Year 0"` … `"Year 6"`.
 */
export function getAllWeeks(year: number | string): number[] {
  buildIndexes();
  const yn = resolveYearNum(year);
  if (yn === null) return [];

  const weeks = new Set<number>();
  for (const key of _byWeek!.keys()) {
    const [keyYear] = key.split("_").map(Number);
    if (keyYear === yn) weeks.add(Number(key.split("_")[1]));
  }
  return [...weeks].sort((a, b) => a - b);
}

/**
 * Return every lesson for the given year, sorted by week then period number.
 *
 * `year` can be a number (0–6) or the label string `"Year 0"` … `"Year 6"`.
 */
export function getLessonsByYear(year: number | string): CurriculumLesson[] {
  buildIndexes();
  const yn = resolveYearNum(year);
  if (yn === null) return [];
  const lessons = _byYear!.get(yn) ?? [];
  return [...lessons].sort(byWeekThenPeriod).map(withCleanLOs);
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function resolveYearNum(year: number | string): number | null {
  if (typeof year === "number") return year;
  const m = year.match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

function byPeriod(a: CurriculumLesson, b: CurriculumLesson): number {
  return (a.periodNum ?? 0) - (b.periodNum ?? 0);
}

function byWeekThenPeriod(a: CurriculumLesson, b: CurriculumLesson): number {
  const wDiff = (a.week ?? 0) - (b.week ?? 0);
  return wDiff !== 0 ? wDiff : byPeriod(a, b);
}
