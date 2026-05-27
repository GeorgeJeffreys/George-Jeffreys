'use client';

import { useState } from 'react';
import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import type { CurriculumLesson } from '@/types/curriculum';

interface MetaHeaderProps {
  lesson: CurriculumLesson | null;
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
  color: C.faint, textTransform: 'uppercase', letterSpacing: '0.08em',
  marginBottom: 4,
};

function Chip({ children, tone = 'neutral' }: {
  children: React.ReactNode;
  tone?: 'pink' | 'neutral' | 'amber';
}) {
  const styles = {
    pink:    { background: C.pinkSoft,  color: C.pink,        border: `1px solid ${C.pinkBorder}` },
    neutral: { background: C.cream,     color: C.faint,       border: `1px solid ${C.borderSoft}` },
    amber:   { background: '#FBF1DD',   color: '#7A5A11',     border: '1px solid #EFD9A5' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      height: 20, padding: '0 7px',
      fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
      borderRadius: 999, whiteSpace: 'nowrap',
      ...styles[tone],
    }}>
      {children}
    </span>
  );
}

export function MetaHeader({ lesson }: MetaHeaderProps) {
  const [expanded, setExpanded] = useState(false);

  if (!lesson) return null;

  const truncatedLO = lesson.dailyLO.length > 72
    ? lesson.dailyLO.slice(0, 72) + '…'
    : lesson.dailyLO;

  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${C.pink}`,
      boxShadow: '0 1px 0 rgba(56,30,30,0.02)',
      background: C.surface,
    }}>
      {/* ── Collapsed bar ── */}
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          width: '100%', height: 48,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '0 14px',
          background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
          borderBottom: expanded ? `1px solid ${C.border}` : 'none',
          borderRadius: expanded ? '9px 9px 0 0' : 9,
        }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          height: 20, padding: '0 7px',
          fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
          color: C.pink, background: C.pinkSoft,
          border: `1px solid ${C.pinkBorder}`, borderRadius: 999,
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          <Icon name="lock" size={10} color={C.pink} /> From curriculum
        </span>
        <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: C.ink, flexShrink: 0 }}>
          {lesson.id}
        </span>
        <span style={{
          fontFamily: SANS, fontSize: 12, color: C.faint,
          flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {truncatedLO}
        </span>
        <Icon name={expanded ? 'chevronDown' : 'chevronRight'} size={14} color={C.faint} />
      </button>

      {/* ── Expanded body ── */}
      {expanded && (
        <>
          {/* Section 1 — cream, two-column meta grid */}
          <div style={{ background: C.cream, padding: '14px 18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20 }}>
              {/* Left: Lesson ID + chips */}
              <div>
                <div style={{ fontFamily: SANS, fontSize: 20, fontWeight: 700, color: C.ink, lineHeight: 1.1, marginBottom: 8 }}>
                  {lesson.id}
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  <Chip tone="pink">{lesson.year}</Chip>
                  {lesson.week !== null && <Chip tone="neutral">Week {lesson.week}</Chip>}
                  <Chip tone="neutral">{lesson.period}</Chip>
                </div>
              </div>

              {/* Right: label+value pairs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <div style={LABEL_STYLE}>Grammar / Vocab</div>
                  <span style={{ fontFamily: SANS, fontSize: 13, color: C.ink }}>
                    {lesson.grammarFocus || lesson.vocabFocus || '—'}
                  </span>
                </div>
                <div>
                  <div style={LABEL_STYLE}>Theme</div>
                  {lesson.theme
                    ? <Chip tone="amber">{lesson.theme}</Chip>
                    : <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint2 }}>—</span>
                  }
                </div>
                <div>
                  <div style={LABEL_STYLE}>Linguistic Skill</div>
                  <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint }}>
                    {lesson.linguisticSkill || '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: C.border }} />

          {/* Section 2 — white, three LO cards */}
          <div style={{ background: C.surface, padding: '12px 18px' }}>
            <div style={{ ...LABEL_STYLE, marginBottom: 8 }}>Learning Outcomes</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {([
                { label: 'Monthly LO',  value: lesson.skillLO },
                { label: 'Weekly LO',   value: lesson.knowledgeLO },
                { label: 'Daily LO',    value: lesson.dailyLO },
              ] as const).map(({ label, value }) => (
                <div key={label} style={{
                  background: C.pinkSoft, border: `1px solid ${C.pinkBorder}`,
                  borderRadius: 8, padding: 10,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                    <Icon name="lock" size={9} color={C.pink} />
                    <span style={{
                      fontFamily: SANS, fontSize: 10, fontWeight: 600,
                      color: C.pink, textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>
                      {label}
                    </span>
                  </div>
                  <span style={{ fontFamily: SANS, fontSize: 12, color: C.ink, lineHeight: 1.4 }}>
                    {value || <span style={{ color: C.faint2 }}>—</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
