'use server';

import { getAllWeeks, getLessonsByWeek } from '@/lib/curriculumUtils';
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
