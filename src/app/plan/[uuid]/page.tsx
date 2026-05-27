import { createServerClient } from '@/lib/supabase';
import { getLessonById } from '@/lib/curriculumUtils';
import type { LessonPlan } from '@/types/lesson';
import type { CurriculumLesson } from '@/types/curriculum';
import { PlanEditor } from './plan-editor';

function isUUID(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export default async function PlanPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  let initialPlan: LessonPlan | null = null;
  let initialLesson: CurriculumLesson | null = null;

  if (uuid !== 'new' && isUUID(uuid)) {
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from('lesson_plans')
        .select('*')
        .eq('id', uuid)
        .maybeSingle();

      if (!error && data) {
        initialPlan = data as LessonPlan;
      }
    } catch {
      // Supabase unavailable — client will hydrate from sessionStorage
    }
  }

  if (initialPlan?.lesson_id) {
    const raw = getLessonById(initialPlan.lesson_id);
    initialLesson = raw ? (Array.isArray(raw) ? raw[0] : raw) : null;
  }

  return (
    <PlanEditor
      uuid={uuid}
      initialPlan={initialPlan}
      initialLesson={initialLesson}
    />
  );
}
