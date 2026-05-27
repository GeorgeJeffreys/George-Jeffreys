'use server';

import { getAllWeeks, getLessonsByWeek, getLessonById } from '@/lib/curriculumUtils';
import type { CurriculumLesson } from '@/types/curriculum';

export async function fetchWeeksForYear(yearNum: number): Promise<number[]> {
  return getAllWeeks(yearNum);
}

export async function fetchLessonsForWeek(
  yearNum: number,
  week: number,
): Promise<CurriculumLesson[]> {
  return getLessonsByWeek(yearNum, week);
}

export async function fetchLessonById(id: string): Promise<CurriculumLesson | null> {
  const raw = getLessonById(id);
  if (!raw) return null;
  return Array.isArray(raw) ? raw[0] : raw;
}
