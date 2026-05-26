import type { LessonPlan } from '@/types/lesson';
import type { CurriculumLesson } from '@/types/curriculum';

export async function exportLessonZip(
  plan: LessonPlan,
  lesson: CurriculumLesson | null,
): Promise<void> {
  // Dynamic imports keep the PDF renderer out of the server bundle.
  const [
    { pdf },
    JSZip,
    { createElement },
    { LessonPlanPDF },
    { WorksheetPDF },
  ] = await Promise.all([
    import('@react-pdf/renderer'),
    import('jszip').then((m) => m.default),
    import('react'),
    import('./LessonPlanPDF'),
    import('./WorksheetPDF'),
  ]);

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  // pdf() expects ReactElement<DocumentProps>; our components render <Document>
  // internally, so the cast is safe — TypeScript can't see through the wrapper.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toDoc = (el: unknown) => el as Parameters<typeof pdf>[0];

  const [planBlob, wsBlob] = await Promise.all([
    pdf(toDoc(createElement(LessonPlanPDF, { plan, lesson, date: today }))).toBlob(),
    pdf(toDoc(createElement(WorksheetPDF,  { plan, lesson, date: today }))).toBlob(),
  ]);

  const zip = new JSZip();
  const slug = (lesson?.id ?? plan.lesson_id).replace(/\./g, '-');
  zip.file(`alsama-lesson-plan-${slug}.pdf`,  planBlob);
  zip.file(`alsama-worksheet-${slug}.pdf`, wsBlob);

  const zipBlob = await zip.generateAsync({ type: 'blob' });

  // Trigger browser download.
  const url = URL.createObjectURL(zipBlob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `alsama-${slug}.zip`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
