'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import { Chip, Label, HiBtn, SKILL_COLOR, skillKey } from './ce-shell';
import type { CurriculumLesson } from '@/types/curriculum';

interface LessonCardProps {
  lesson: CurriculumLesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const col = SKILL_COLOR[skillKey(lesson.linguisticSkill)] ?? SKILL_COLOR.basic;
  const hasExtra = !!(lesson.grammarFocus || lesson.vocabFocus);
  const planUrl = `/plan/new?lessonId=${encodeURIComponent(lesson.id)}`;

  let displayLO = lesson.dailyLO;
  if (!displayLO) {
    console.warn(`[LessonCard] Missing dailyLO for lesson ${lesson.id}`);
    displayLO = lesson.id;
  }

  const weekPeriodBadge = [
    lesson.week != null ? `Wk ${lesson.week}` : null,
    lesson.periodNum != null ? `P${lesson.periodNum}` : null,
  ].filter(Boolean).join('·');

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: `1px solid #E5DDD3`,
        borderRadius: 12,
        position: 'relative', overflow: 'hidden',
        minHeight: 120,
        display: 'flex', flexDirection: 'column',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = C.pinkBorder;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 2px ${C.pinkSoft},0 4px 12px rgba(56,30,30,0.06)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#E5DDD3';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {/* Top row: lesson ID left, week·period badge right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontFamily: 'monospace', fontSize: 11, fontWeight: 600,
            color: C.faint2, letterSpacing: '0.02em',
          }}>{lesson.id}</span>
          <div style={{ flex: 1 }} />
          {weekPeriodBadge && (
            <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint2, opacity: 0.7 }}>
              {weekPeriodBadge}
            </span>
          )}
        </div>

        {/* Daily LO — always 2 lines visible */}
        <span style={{
          fontFamily: SANS, fontSize: 13, fontWeight: 500, color: C.ink, lineHeight: 1.4,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          minHeight: '2.8em',
        } as React.CSSProperties}>{displayLO}</span>

        {/* Skill chip + theme chip + optional expand chevron */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginTop: 'auto' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '2px 8px', background: col.bg, color: col.fg,
            borderRadius: 999,
            fontFamily: SANS, fontSize: 10, fontWeight: 600,
          }}>{col.label}</span>
          {lesson.theme && <Chip tone="amber" size="sm">{lesson.theme}</Chip>}
          {hasExtra && (
            <div
              style={{ marginLeft: 'auto', cursor: 'pointer' }}
              onClick={e => { e.stopPropagation(); setExpanded(x => !x); }}
            >
              <div style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <Icon name="chevronDown" size={13} color={C.faint2} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expanded: grammar / vocab focus */}
      {expanded && hasExtra && (
        <div style={{
          borderTop: `1px solid #E5DDD3`,
          padding: '10px 12px',
          background: '#FDFAF7',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {lesson.grammarFocus && (
            <div>
              <Label style={{ display: 'block', marginBottom: 3 }}>Grammar</Label>
              <span style={{ fontFamily: SANS, fontSize: 12, color: C.ink, lineHeight: 1.4 }}>{lesson.grammarFocus}</span>
            </div>
          )}
          {lesson.vocabFocus && (
            <div>
              <Label style={{ display: 'block', marginBottom: 3 }}>Vocab</Label>
              <span style={{ fontFamily: SANS, fontSize: 12, color: C.ink, lineHeight: 1.4 }}>{lesson.vocabFocus}</span>
            </div>
          )}
        </div>
      )}

      {/* Open lesson footer */}
      <div style={{
        padding: '8px 12px 10px',
        borderTop: `1px solid #E5DDD3`,
        display: 'flex', justifyContent: 'flex-end',
      }}>
        <HiBtn
          variant="primary" size="sm"
          icon={<Icon name="arrowRight" size={12} color="#fff" />}
          onClick={() => router.push(planUrl)}
        >
          Open lesson →
        </HiBtn>
      </div>

      {/* 4px skill colour bar at very bottom */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: col.line }} />
    </div>
  );
}
