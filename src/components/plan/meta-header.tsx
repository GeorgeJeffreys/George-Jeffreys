'use client';

import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import type { CurriculumLesson } from '@/types/curriculum';

interface MetaHeaderProps {
  lesson: CurriculumLesson | null;
}

function Chip({ children, tone = 'neutral', size = 'md' }: {
  children: React.ReactNode;
  tone?: 'neutral' | 'pink' | 'amber' | 'teal' | 'ghost';
  size?: 'sm' | 'md';
}) {
  const tones = {
    neutral: { bg: C.cream,     fg: C.ink,   br: C.borderSoft },
    pink:    { bg: C.pinkSoft,  fg: C.pink,  br: C.pinkBorder },
    amber:   { bg: C.amberSoft, fg: '#7A5A11', br: '#EFD9A5' },
    teal:    { bg: C.tealSoft,  fg: C.teal,  br: '#BCDED6' },
    ghost:   { bg: 'transparent', fg: C.faint, br: C.border },
  };
  const t = tones[tone];
  const sz = size === 'sm' ? { h: 20, fs: 10.5, px: 7 } : { h: 24, fs: 11.5, px: 9 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: sz.h, padding: `0 ${sz.px}px`,
      fontFamily: SANS, fontSize: sz.fs, fontWeight: 500,
      color: t.fg, background: t.bg,
      border: `1px solid ${t.br}`, borderRadius: 999,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
      color: C.faint, textTransform: 'uppercase', letterSpacing: '0.08em',
      ...style,
    }}>
      {children}
    </div>
  );
}

export function MetaHeader({ lesson }: MetaHeaderProps) {
  if (!lesson) return null;

  // Highlight key phrases in the daily LO
  const loText = lesson.dailyLO;

  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${C.pink}`,
      borderRadius: 12,
      padding: 18,
      boxShadow: '0 1px 0 rgba(56, 30, 30, 0.02)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <Chip tone="pink" size="sm">
          <Icon name="lock" size={10} /> From curriculum
        </Chip>
        <Label>Lesson overview</Label>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: SANS, fontSize: 11, color: C.faint }}>
          Auto-populated · edits happen at the curriculum level
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 240px', gap: 24 }}>
        {/* Lesson ID */}
        <div>
          <Label style={{ marginBottom: 4 }}>Lesson ID</Label>
          <div style={{
            fontFamily: SANS, fontSize: 20, fontWeight: 700, color: C.ink,
            fontFeatureSettings: '"tnum"', letterSpacing: '0.01em',
          }}>{lesson.id}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            <Chip tone="pink" size="sm">{lesson.year}</Chip>
            {lesson.week !== null && <Chip tone="neutral" size="sm">Week {lesson.week}</Chip>}
            <Chip tone="neutral" size="sm">{lesson.period}</Chip>
          </div>
        </div>

        {/* Daily LO */}
        <div>
          <Label style={{ marginBottom: 6 }}>Daily Learning Objective</Label>
          <div style={{
            fontFamily: SANS, fontSize: 14, fontWeight: 500,
            lineHeight: 1.45, color: C.ink,
          }}>
            {loText}
          </div>
        </div>

        {/* Focus & Theme */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <Label style={{ marginBottom: 4 }}>Grammar / Vocab</Label>
            <span style={{ fontFamily: SANS, fontSize: 13, color: C.ink }}>
              {lesson.grammarFocus || lesson.vocabFocus || '—'}
            </span>
          </div>
          <div>
            <Label style={{ marginBottom: 4 }}>Theme</Label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {lesson.theme
                ? <Chip tone="amber" size="sm">{lesson.theme}</Chip>
                : <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint2 }}>—</span>
              }
            </div>
          </div>
          <div>
            <Label style={{ marginBottom: 4 }}>Linguistic Skill</Label>
            <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint }}>
              {lesson.linguisticSkill || '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
