'use client';

import { C, SANS } from '@/lib/tokens';
import type { CurriculumLesson } from '@/types/curriculum';

export const SKILL_COLOR: Record<string, { fg: string; bg: string; label: string }> = {
  read:    { fg: '#1F7A6C', bg: '#E0F0EC', label: 'Reading' },
  write:   { fg: '#2952A3', bg: '#E3EBFB', label: 'Writing' },
  listen:  { fg: '#7A5A11', bg: '#FBF1DD', label: 'Listening' },
  speak:   { fg: '#6B2DA3', bg: '#F0E8FB', label: 'Speaking' },
  basic:   { fg: C.pink,   bg: C.pinkSoft, label: 'Basic Literacy' },
};

function skillKey(skill: string): string {
  const s = (skill ?? '').toLowerCase();
  if (s.includes('read')) return 'read';
  if (s.includes('writ')) return 'write';
  if (s.includes('listen')) return 'listen';
  if (s.includes('speak')) return 'speak';
  return 'basic';
}

// ── Left panel nav ────────────────────────────────────────────────────────────

interface CalendarLeftProps {
  months: { month: string; weeks: number[] }[];
  selectedWeek: number | null;
  onSelectWeek: (w: number) => void;
}

export function CalendarLeft({ months, selectedWeek, onSelectWeek }: CalendarLeftProps) {
  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{
        fontFamily: SANS, fontSize: 10, fontWeight: 700,
        color: C.faint2, textTransform: 'uppercase', letterSpacing: '0.1em',
        padding: '0 16px', marginBottom: 8,
      }}>
        Months & Weeks
      </div>
      {months.map(({ month, weeks }) => (
        <div key={month} style={{ marginBottom: 4 }}>
          <div style={{
            fontFamily: SANS, fontSize: 11.5, fontWeight: 600,
            color: C.ink, padding: '6px 16px 4px',
          }}>
            {month}
          </div>
          {weeks.map(w => (
            <button
              key={w}
              onClick={() => onSelectWeek(w)}
              style={{
                display: 'flex', alignItems: 'center', width: '100%',
                padding: '5px 16px 5px 28px',
                fontFamily: SANS, fontSize: 12,
                color: selectedWeek === w ? C.pink : C.faint,
                fontWeight: selectedWeek === w ? 600 : 400,
                background: selectedWeek === w ? C.pinkSoft : 'none',
                border: 'none', cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Week {w}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Week grid ────────────────────────────────────────────────────────────────

interface WeekGridProps {
  week: number;
  lessons: CurriculumLesson[];
  onLessonClick: (lesson: CurriculumLesson) => void;
}

export function WeekGrid({ week, lessons, onLessonClick }: WeekGridProps) {
  const month = lessons[0]?.month ?? '';
  const periods = [1, 2, 3, 4, 5];

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
        <span style={{ fontFamily: SANS, fontSize: 22, fontWeight: 700, color: C.ink }}>
          Week {week}
        </span>
        <span style={{ fontFamily: SANS, fontSize: 14, color: C.faint }}>{month}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 12,
      }}>
        {periods.map(p => {
          const lesson = lessons.find(l => l.periodNum === p);
          return (
            <div key={p} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{
                fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
                color: C.faint2, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: 6, textAlign: 'center',
              }}>
                Period {p}
              </div>
              {lesson ? (
                <LessonCell lesson={lesson} onClick={() => onLessonClick(lesson)} />
              ) : (
                <div style={{
                  minHeight: 140, borderRadius: 10,
                  background: C.cream, border: `1px dashed ${C.borderSoft}`,
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LessonCell({ lesson, onClick }: { lesson: CurriculumLesson; onClick: () => void }) {
  const sk = skillKey(lesson.linguisticSkill);
  const col = SKILL_COLOR[sk];

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        gap: 6, padding: '10px 12px',
        background: C.surface,
        border: `1px solid ${C.borderSoft}`,
        borderTop: `3px solid ${col.fg}`,
        borderRadius: 10,
        cursor: 'pointer', textAlign: 'left',
        minHeight: 140,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.12s, transform 0.1s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 3px 10px rgba(0,0,0,0.08)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Lesson ID + skill chip */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span style={{
          fontFamily: SANS, fontSize: 10, fontWeight: 700,
          color: C.faint2, letterSpacing: '0.04em',
        }}>
          {lesson.id}
        </span>
        <span style={{
          fontFamily: SANS, fontSize: 9.5, fontWeight: 600,
          color: col.fg, background: col.bg,
          padding: '1px 5px', borderRadius: 4,
        }}>
          {col.label}
        </span>
      </div>

      {/* Daily LO */}
      <span style={{
        fontFamily: SANS, fontSize: 11.5, fontWeight: 500,
        color: C.ink, lineHeight: 1.4,
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {lesson.dailyLO}
      </span>

      {/* Theme */}
      {lesson.theme && (
        <span style={{
          fontFamily: SANS, fontSize: 10, color: '#7A5A11',
          background: '#FBF1DD', border: '1px solid #EFD9A5',
          padding: '1px 6px', borderRadius: 4, marginTop: 'auto',
        }}>
          {lesson.theme}
        </span>
      )}
    </button>
  );
}

// ── Month overview ────────────────────────────────────────────────────────────

interface MonthOverviewProps {
  months: { month: string; weeks: number[] }[];
  allLessons: Map<number, CurriculumLesson[]>;
  onSelectWeek: (w: number) => void;
}

export function MonthOverview({ months, allLessons, onSelectWeek }: MonthOverviewProps) {
  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 700, color: C.ink, marginBottom: 24 }}>
        Full Year Overview
      </div>
      {months.map(({ month, weeks }) => (
        <div key={month} style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: SANS, fontSize: 14, fontWeight: 700,
            color: C.ink, marginBottom: 12,
            paddingBottom: 8, borderBottom: `1px solid ${C.borderSoft}`,
          }}>
            {month}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {weeks.map(w => {
              const wLessons = allLessons.get(w) ?? [];
              const skillCounts: Record<string, number> = {};
              wLessons.forEach(l => {
                const k = skillKey(l.linguisticSkill);
                skillCounts[k] = (skillCounts[k] ?? 0) + 1;
              });

              return (
                <button
                  key={w}
                  onClick={() => onSelectWeek(w)}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: 6,
                    padding: '10px 12px',
                    background: C.surface,
                    border: `1px solid ${C.borderSoft}`,
                    borderRadius: 8, cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'border-color 0.12s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.pink; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.borderSoft; }}
                >
                  <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: C.ink }}>
                    Week {w}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: 11, color: C.faint }}>
                    {wLessons.length} lessons
                  </span>
                  {/* skill bar */}
                  <div style={{ display: 'flex', height: 4, borderRadius: 2, overflow: 'hidden', gap: 1 }}>
                    {Object.entries(skillCounts).map(([sk, cnt]) => (
                      <div
                        key={sk}
                        style={{
                          flex: cnt,
                          background: SKILL_COLOR[sk]?.fg ?? C.faint2,
                          borderRadius: 2,
                        }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
