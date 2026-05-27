'use client';

import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import { SKILL_COLOR } from './ce-calendar';
import type { CurriculumLesson } from '@/types/curriculum';

function skillKey(skill: string): string {
  const s = (skill ?? '').toLowerCase();
  if (s.includes('read')) return 'read';
  if (s.includes('writ')) return 'write';
  if (s.includes('listen')) return 'listen';
  if (s.includes('speak')) return 'speak';
  return 'basic';
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface ThemeData {
  theme: string;
  count: number;
}

export interface SkillData {
  skill: string;
  skillKey: string;
  count: number;
  pct: number;
}

// ── Left panel ────────────────────────────────────────────────────────────────

interface ContentLeftProps {
  themes: ThemeData[];
  focusedTheme: string | null;
  onFocusTheme: (theme: string | null) => void;
  skillBreakdown: SkillData[];
  focusedSkill: string | null;
  onFocusSkill: (skill: string | null) => void;
}

export function ContentLeft({
  themes, focusedTheme, onFocusTheme,
  skillBreakdown, focusedSkill, onFocusSkill,
}: ContentLeftProps) {
  return (
    <div style={{ padding: '16px 0' }}>
      {/* Skills section */}
      <div style={{
        fontFamily: SANS, fontSize: 10, fontWeight: 700,
        color: C.faint2, textTransform: 'uppercase', letterSpacing: '0.1em',
        padding: '0 16px', marginBottom: 8,
      }}>
        Linguistic Skills
      </div>

      <button
        onClick={() => onFocusSkill(null)}
        style={{
          display: 'flex', alignItems: 'center', width: '100%',
          padding: '5px 16px',
          fontFamily: SANS, fontSize: 12,
          color: focusedSkill === null && focusedTheme === null ? C.pink : C.faint,
          fontWeight: focusedSkill === null && focusedTheme === null ? 600 : 400,
          background: focusedSkill === null && focusedTheme === null ? C.pinkSoft : 'none',
          border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        All skills
      </button>

      {skillBreakdown.map(s => {
        const col = SKILL_COLOR[s.skillKey];
        const active = focusedSkill === s.skill;
        return (
          <button
            key={s.skill}
            onClick={() => { onFocusSkill(active ? null : s.skill); onFocusTheme(null); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, width: '100%',
              padding: '5px 16px',
              fontFamily: SANS, fontSize: 12,
              color: active ? col.fg : C.faint,
              fontWeight: active ? 600 : 400,
              background: active ? col.bg : 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <span style={{
              display: 'inline-block', width: 8, height: 8,
              borderRadius: '50%', background: col.fg, flexShrink: 0,
            }} />
            <span style={{ flex: 1 }}>{col.label}</span>
            <span style={{ fontFamily: SANS, fontSize: 10.5, color: C.faint2 }}>{s.pct}%</span>
          </button>
        );
      })}

      <div style={{ height: 1, background: C.borderSoft, margin: '12px 16px' }} />

      {/* Themes section */}
      <div style={{
        fontFamily: SANS, fontSize: 10, fontWeight: 700,
        color: C.faint2, textTransform: 'uppercase', letterSpacing: '0.1em',
        padding: '0 16px', marginBottom: 8,
      }}>
        Themes
      </div>

      {themes.map(t => {
        const active = focusedTheme === t.theme;
        return (
          <button
            key={t.theme}
            onClick={() => { onFocusTheme(active ? null : t.theme); onFocusSkill(null); }}
            style={{
              display: 'flex', alignItems: 'center', width: '100%',
              padding: '5px 16px',
              fontFamily: SANS, fontSize: 12,
              color: active ? '#7A5A11' : C.faint,
              fontWeight: active ? 600 : 400,
              background: active ? '#FBF1DD' : 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {t.theme}
            </span>
            <span style={{ fontFamily: SANS, fontSize: 10.5, color: C.faint2, flexShrink: 0 }}>
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Content main panel ────────────────────────────────────────────────────────

interface ContentGridProps {
  lessons: CurriculumLesson[];
  focusedSkill: string | null;
  focusedTheme: string | null;
  search: string;
  onLessonClick: (lesson: CurriculumLesson) => void;
}

export function ContentGrid({
  lessons, focusedSkill, focusedTheme, search, onLessonClick,
}: ContentGridProps) {
  let filtered = lessons;

  if (focusedSkill) {
    filtered = filtered.filter(l => l.linguisticSkill === focusedSkill);
  }
  if (focusedTheme) {
    filtered = filtered.filter(l => l.theme === focusedTheme);
  }
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(l =>
      l.dailyLO.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q) ||
      (l.theme ?? '').toLowerCase().includes(q) ||
      (l.vocabFocus ?? '').toLowerCase().includes(q)
    );
  }

  const title = focusedTheme
    ? focusedTheme
    : focusedSkill
    ? (SKILL_COLOR[skillKey(focusedSkill)]?.label ?? focusedSkill)
    : 'All Lessons';

  // Group by theme (or skill if filtering by skill)
  const groups = new Map<string, CurriculumLesson[]>();
  for (const l of filtered) {
    const key = focusedSkill && !focusedTheme
      ? (l.theme || 'No Theme')
      : (l.linguisticSkill || 'Other');
    const arr = groups.get(key) ?? [];
    arr.push(l);
    groups.set(key, arr);
  }

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
        <span style={{ fontFamily: SANS, fontSize: 22, fontWeight: 700, color: C.ink }}>
          {title}
        </span>
        <span style={{ fontFamily: SANS, fontSize: 13, color: C.faint }}>
          {filtered.length} lessons
        </span>
      </div>

      {filtered.length === 0 && (
        <div style={{
          fontFamily: SANS, fontSize: 13, color: C.faint2,
          padding: '48px 0', textAlign: 'center',
        }}>
          No lessons match your filter.
        </div>
      )}

      {[...groups.entries()].map(([group, gLessons]) => (
        <div key={group} style={{ marginBottom: 28 }}>
          <div style={{
            fontFamily: SANS, fontSize: 13, fontWeight: 700, color: C.ink,
            marginBottom: 10,
            paddingBottom: 6, borderBottom: `1px solid ${C.borderSoft}`,
          }}>
            {group}
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 400, color: C.faint2, marginLeft: 8 }}>
              {gLessons.length}
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 10,
          }}>
            {gLessons.map(lesson => (
              <ContentLessonCard
                key={lesson.id}
                lesson={lesson}
                onClick={() => onLessonClick(lesson)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentLessonCard({ lesson, onClick }: { lesson: CurriculumLesson; onClick: () => void }) {
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
        borderLeft: `3px solid ${col.fg}`,
        borderRadius: 8, cursor: 'pointer', textAlign: 'left',
        transition: 'box-shadow 0.12s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: C.faint2 }}>
          {lesson.id}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {lesson.week !== null && (
            <span style={{
              fontFamily: SANS, fontSize: 9.5, color: C.faint2,
              background: C.cream, border: `1px solid ${C.borderSoft}`,
              padding: '1px 4px', borderRadius: 3,
            }}>
              Wk {lesson.week}
            </span>
          )}
          <span style={{
            fontFamily: SANS, fontSize: 9.5, fontWeight: 600,
            color: col.fg, background: col.bg,
            padding: '1px 5px', borderRadius: 4,
          }}>
            {col.label}
          </span>
        </div>
      </div>

      <span style={{
        fontFamily: SANS, fontSize: 12, fontWeight: 500, color: C.ink,
        lineHeight: 1.4,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {lesson.dailyLO}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 'auto' }}>
        {lesson.theme ? (
          <span style={{
            fontFamily: SANS, fontSize: 9.5, color: '#7A5A11',
            background: '#FBF1DD', border: '1px solid #EFD9A5',
            padding: '1px 5px', borderRadius: 4,
          }}>
            {lesson.theme}
          </span>
        ) : <span />}
        <Icon name="arrowRight" size={11} color={col.fg} />
      </div>
    </button>
  );
}
