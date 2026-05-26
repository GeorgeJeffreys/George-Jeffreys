'use client';

import { C, SANS, SCRIPT } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import type { CurriculumLesson } from '@/types/curriculum';

interface WorksheetProps {
  lesson: CurriculumLesson | null;
}

function AlsamaMark() {
  return (
    <span style={{ fontFamily: SCRIPT, fontSize: 20, color: C.pink, lineHeight: 1 }}>Alsama</span>
  );
}

export function WorksheetView({ lesson }: WorksheetProps) {
  const title  = lesson?.dailyLO ?? 'Lesson';
  const yearLabel = lesson?.year ?? 'Year';
  const weekLabel = lesson?.week != null ? `Week ${lesson.week}` : '';
  const periodLabel = lesson?.period ?? '';
  const lessonId = lesson?.id ?? '';

  return (
    <div style={{
      flex: 1, overflow: 'auto',
      backgroundColor: C.creamDeep,
      backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.018) 0 1px, transparent 1px 14px)',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      padding: '28px 0 40px',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 12px', background: C.surface,
          border: `1px solid ${C.border}`, borderRadius: 999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <span style={{ fontFamily: SANS, fontSize: 11.5, color: C.faint }}>A4 · Portrait</span>
          <div style={{ width: 1, height: 14, background: C.border }} />
          <button style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: C.ink, fontFamily: SANS, fontSize: 12 }}>
            <Icon name="chevronLeft" size={12} /> Page 1 of 1
          </button>
          <div style={{ width: 1, height: 14, background: C.border }} />
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            height: 28, padding: '0 10px',
            fontFamily: SANS, fontSize: 12, fontWeight: 500,
            background: 'transparent', color: C.ink,
            border: `1px solid ${C.border}`, borderRadius: 8,
          }}>
            <Icon name="plus" size={12} />Add page
          </button>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            height: 28, padding: '0 10px',
            fontFamily: SANS, fontSize: 12, fontWeight: 500,
            background: C.pink, color: '#fff', border: 'none', borderRadius: 8,
          }}>
            <Icon name="download" size={12} color="#fff" />Export PDF
          </button>
        </div>

        {/* A4 Paper */}
        <div style={{
          width: 560, minHeight: 800,
          background: '#FFFFFF',
          border: `1px solid ${C.border}`,
          borderRadius: 4,
          padding: 44,
          boxShadow: '0 18px 60px rgba(82, 50, 30, 0.10), 0 2px 8px rgba(82, 50, 30, 0.06)',
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 16,
            paddingBottom: 14, borderBottom: `2px solid ${C.ink}`,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <AlsamaMark />
                <span style={{ fontFamily: SANS, fontSize: 11, color: C.faint }}>· {yearLabel} English</span>
              </div>
              <h1 style={{ fontFamily: SANS, fontSize: 22, fontWeight: 700, color: C.ink, margin: 0, letterSpacing: '-0.01em' }}>
                {title}
              </h1>
              <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint }}>
                {[weekLabel, periodLabel, lessonId].filter(Boolean).join(' · ')}
              </span>
            </div>
            <div style={{
              border: `1px solid ${C.border}`, padding: 8, borderRadius: 6,
              fontFamily: SANS, fontSize: 11, color: C.faint, minWidth: 150,
            }}>
              <div style={{ marginBottom: 6 }}>Name: <span style={{ borderBottom: `1px solid ${C.ink}`, display: 'inline-block', minWidth: 90 }}>&nbsp;</span></div>
              <div>Date: <span style={{ borderBottom: `1px solid ${C.ink}`, display: 'inline-block', minWidth: 90 }}>&nbsp;</span></div>
            </div>
          </div>

          {/* Exercise 1 — Matching */}
          <ExerciseSection number={1} title="Match the question with the answer." hint="Draw a line ➝">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 24px 1fr', gap: 0, alignItems: 'stretch' }}>
              {[
                ['What is your name?', 'My name is Layla.'],
                ['How old are you?', "I'm fine, thank you."],
                ['Where are you from?', "I'm 12 years old."],
                ['How are you?', "I'm from Aleppo."],
              ].map(([q, a], i) => (
                <>
                  <div key={`q${i}`} style={{ border: `1px solid ${C.ink}`, padding: '10px 12px', fontFamily: SANS, fontSize: 13 }}>{q}</div>
                  <div key={`dot${i}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 6, height: 6, borderRadius: 999, background: C.ink }} />
                  </div>
                  <div key={`a${i}`} style={{ border: `1px solid ${C.ink}`, padding: '10px 12px', fontFamily: SANS, fontSize: 13, color: C.faint }}>{a}</div>
                </>
              ))}
            </div>
          </ExerciseSection>

          {/* Exercise 2 — Fill in the blanks */}
          <ExerciseSection number={2} title="Complete the sentences.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: SANS, fontSize: 13.5, lineHeight: 1.8 }}>
              {([['Hello, ', ' name is Layla.'], ['I ', ' from Syria.'], ['How ', ' you? I am fine.'], ['What ', ' your name?']] as [string, string][]).map(([a, b], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ width: 14 }}>{i + 1}.</span>
                  <span>{a}</span>
                  <span style={{ borderBottom: `1.5px solid ${C.ink}`, minWidth: 80, display: 'inline-block', height: 18 }} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, border: `1.5px dashed ${C.pink}`, borderRadius: 8, padding: 10, background: C.pinkSoft + '60' }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Word bank</div>
              <span style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 500, letterSpacing: '0.04em' }}>am · my · are · is · how</span>
            </div>
          </ExerciseSection>

          {/* Exercise 3 — Free writing */}
          <ExerciseSection number={3} title="Introduce yourself. Write 3 sentences.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ borderBottom: `1px solid ${C.ink}`, height: 18 }} />
              ))}
            </div>
          </ExerciseSection>

          {/* Footer */}
          <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint }}>Alsama · {yearLabel} Eng · {weekLabel}</span>
            <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint }}>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExerciseSection({ number, title, hint, children }: {
  number: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 22, height: 22, borderRadius: 999, background: C.pink, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: SANS, fontSize: 12, fontWeight: 700,
        }}>{number}</div>
        <h2 style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.ink, margin: 0 }}>{title}</h2>
        {hint && <><div style={{ flex: 1 }} /><span style={{ fontFamily: SANS, fontSize: 11, color: C.faint }}>{hint}</span></>}
      </div>
      {children}
    </div>
  );
}
