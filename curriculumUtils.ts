import curriculumData from "./curriculum.json";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  year: string;
  yearNum: number | null;
  month: string;
  week: number | null;
  period: string;
  periodNum: number | null;
  dailyLO: string;
  linguisticSkill: string;
  skillLORef: string;
  skillLO: string;
  knowledgeLORef: string;
  knowledgeLO: string;
  resources: string;
  vocabFocus: string;
  grammarFocus: string;
  theme: string;
}

type LessonEntry = Lesson | Lesson[];

interface CurriculumData {
  _meta: {
    totalLessons: number;
    uniqueIds: number;
    years: string[];
    generatedFrom: string;
  };
  _yearWeekIndex: Record<string, string[]>;
  _weeksByYear: Record<string, number[]>;
  lessons: Record<string, LessonEntry>;
}

const data = curriculumData as CurriculumData;

// ── Public helpers ────────────────────────────────────────────────────────────

/**
 * Look up a lesson by its unique identifier (e.g. "0.S1.K1.H3").
 *
 * Most IDs map to a single Lesson. A small number of special IDs (exam rows,
 * data anomalies) map to an array of Lesson objects — one per year they appear.
 * Returns null when the ID is not found.
 */
export function getLessonById(id: string): Lesson | Lesson[] | null {
  return data.lessons[id] ?? null;
}

/**
 * Return all lessons for a given year and calendar week number.
 *
 * `year` can be passed as a number (0–6) or as the label string ("Year 0"…"Year 6").
 * Returns an empty array when no lessons are found for that combination.
 */
export function getLessonsByWeek(year: number | string, week: number): Lesson[] {
  const yearNum = resolveYearNum(year);
  if (yearNum === null) return [];

  const ids = data._yearWeekIndex[`${yearNum}_${week}`] ?? [];
  return ids.flatMap((id) => {
    const entry = data.lessons[id];
    if (!entry) return [];
    // When an ID maps to multiple entries, return only the one(s) matching the requested year/week.
    if (Array.isArray(entry)) {
      return entry.filter((l) => l.yearNum === yearNum && l.week === week);
    }
    return [entry];
  });
}

/**
 * Return the sorted list of week numbers that have at least one lesson in the
 * given year. `year` can be a number (0–6) or label string ("Year 0"…"Year 6").
 */
export function getAllWeeks(year: number | string): number[] {
  const yearNum = resolveYearNum(year);
  if (yearNum === null) return [];
  return data._weeksByYear[String(yearNum)] ?? [];
}

// ── Convenience extras ────────────────────────────────────────────────────────

/** Return every lesson for a year, sorted by week then periodNum. */
export function getLessonsByYear(year: number | string): Lesson[] {
  const yearNum = resolveYearNum(year);
  if (yearNum === null) return [];

  const result: Lesson[] = [];
  for (const entry of Object.values(data.lessons)) {
    const items: Lesson[] = Array.isArray(entry) ? entry : [entry];
    for (const l of items) {
      if (l.yearNum === yearNum) result.push(l);
    }
  }
  result.sort((a, b) => {
    const wDiff = (a.week ?? 0) - (b.week ?? 0);
    return wDiff !== 0 ? wDiff : (a.periodNum ?? 0) - (b.periodNum ?? 0);
  });
  return result;
}

/** Curriculum-level metadata (total lessons, available years, etc.). */
export function getMeta() {
  return data._meta;
}

// ── Internal ──────────────────────────────────────────────────────────────────

function resolveYearNum(year: number | string): number | null {
  if (typeof year === "number") return year;
  const m = year.match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}
