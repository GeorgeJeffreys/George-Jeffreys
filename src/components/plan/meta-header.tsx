'use client';
import type { CurriculumLesson } from '@/types/curriculum';

interface MetaHeaderProps {
  lesson: CurriculumLesson | null;
}

export function MetaHeader({ lesson }: MetaHeaderProps) {
  if (!lesson) return <div style={{ background: 'blue', color: 'white', padding: 16 }}>MetaHeader: lesson is NULL</div>;
  return (
    <div style={{ background: 'green', color: 'white', padding: 16, marginBottom: 16 }}>
      MetaHeader working: {lesson.id} — {lesson.dailyLO}
    </div>
  );
}
