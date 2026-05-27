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
  const result = getLessonById(id);
  console.log('fetchLessonById called with:', id, 'result:', result ? (Array.isArray(result) ? result[0]?.id : result.id) : null);
  if (!result) return null;
  return Array.isArray(result) ? result[0] : result;
}
