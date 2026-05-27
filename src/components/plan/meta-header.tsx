'use client';

import { useState } from 'react';
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
  const [expanded, setExpanded] = useState(true);

  if (!lesson) return null;

  const truncatedLO = lesson.dailyLO.length > 80
    ? lesson.dailyLO.slice(0, 80) + '…'
    : lesson.dailyLO;

  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${C.pink}`,
      borderRadius: 12,
      boxShadow: '0 1px 0 rgba(56, 30, 30, 0.02)',
    }}>
      {/* Collapsed bar — always visible */}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px',
          background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <Chip tone="pink" size="sm">
          <Icon name="lock" size={10} /> From curriculum
        </Chip>
        <span style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: C.ink }}>
          {lesson.id}
        </span>
        <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {truncatedLO}
        </span>
        <Icon name={expanded ? 'chevronDown' : 'chevronRight'} size={14} color={C.faint} />
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ paddingTop: 14, display: 'grid', gridTemplateColumns: '160px 240px', gap: 24, marginBottom: 14 }}>
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

          {/* LO hierarchy */}
          <div style={{
            paddingTop: 14,
            borderTop: `1px solid ${C.border}`,
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12,
          }}>
            {[
              { label: 'Monthly LO', value: lesson.skillLO },
              { label: 'Weekly LO', value: lesson.knowledgeLO },
              { label: 'Daily LO', value: lesson.dailyLO },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background: C.pinkSoft, border: `1px solid ${C.pinkBorder}`,
                borderRadius: 8, padding: '8px 10px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <Icon name="lock" size={9} color={C.pink} />
                  <Label style={{ color: C.pink, margin: 0 }}>{label}</Label>
                </div>
                <span style={{ fontFamily: SANS, fontSize: 12, color: C.ink, lineHeight: 1.4, display: 'block' }}>
                  {value || '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
