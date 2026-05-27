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

export interface SkillLO {
  ref: string;
  lo: string;
  skill: string;
  count: number;
}

export interface KnowledgeLO {
  ref: string;
  lo: string;
  count: number;
  weeks: number[];
}

// ── Left panel ────────────────────────────────────────────────────────────────

interface JourneyLeftProps {
  skillLOs: SkillLO[];
  focusedSkillRef: string | null;
  onFocusSkill: (ref: string | null) => void;
}

export function JourneyLeft({ skillLOs, focusedSkillRef, onFocusSkill }: JourneyLeftProps) {
  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{
        fontFamily: SANS, fontSize: 10, fontWeight: 700,
        color: C.faint2, textTransform: 'uppercase', letterSpacing: '0.1em',
        padding: '0 16px', marginBottom: 8,
      }}>
        Skill LOs
      </div>

      <button
        onClick={() => onFocusSkill(null)}
        style={{
          display: 'flex', alignItems: 'center', width: '100%',
          padding: '5px 16px',
          fontFamily: SANS, fontSize: 12,
          color: focusedSkillRef === null ? C.pink : C.faint,
          fontWeight: focusedSkillRef === null ? 600 : 400,
          background: focusedSkillRef === null ? C.pinkSoft : 'none',
          border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        All skill LOs
      </button>

      {skillLOs.map(s => {
        const sk = skillKey(s.skill);
        const col = SKILL_COLOR[sk];
        const active = focusedSkillRef === s.ref;
        return (
          <button
            key={s.ref}
            onClick={() => onFocusSkill(active ? null : s.ref)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, width: '100%',
              padding: '6px 16px',
              fontFamily: SANS, fontSize: 12,
              color: active ? col.fg : C.faint,
              fontWeight: active ? 600 : 400,
              background: active ? col.bg : 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <span style={{
              fontFamily: SANS, fontSize: 10, fontWeight: 700,
              color: col.fg, background: col.bg,
              padding: '1px 5px', borderRadius: 4, flexShrink: 0,
            }}>
              {s.ref}
            </span>
            <span style={{
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              flex: 1,
            }}>
              {s.lo || s.skill}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Cascade cards ─────────────────────────────────────────────────────────────

interface SkillLOCardProps {
  skillLO: SkillLO;
  knowledgeLOs: KnowledgeLO[] | null;
  expanded: boolean;
  onToggle: () => void;
  focusedKRef: string | null;
  onFocusKRef: (ref: string | null) => void;
  yearLessons: Map<string, CurriculumLesson[]>;
  onLessonClick: (lesson: CurriculumLesson) => void;
}

export function SkillLOCard({
  skillLO, knowledgeLOs, expanded, onToggle,
  focusedKRef, onFocusKRef, yearLessons, onLessonClick,
}: SkillLOCardProps) {
  const sk = skillKey(skillLO.skill);
  const col = SKILL_COLOR[sk];

  return (
    <div style={{
      border: `1px solid ${C.borderSoft}`,
      borderLeft: `3px solid ${col.fg}`,
      borderRadius: 10,
      background: C.surface,
      marginBottom: 10,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 10, width: '100%',
          padding: '12px 16px',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 700,
          color: col.fg, background: col.bg,
          padding: '2px 7px', borderRadius: 5, flexShrink: 0,
        }}>
          {skillLO.ref}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{
            fontFamily: SANS, fontSize: 13, fontWeight: 600, color: C.ink,
            display: 'block', lineHeight: 1.35,
          }}>
            {skillLO.lo || skillLO.skill}
          </span>
        </div>
        <span style={{ fontFamily: SANS, fontSize: 11, color: C.faint2, flexShrink: 0 }}>
          {skillLO.count} lessons
        </span>
        <Icon
          name={expanded ? 'chevronDown' : 'chevronRight'}
          size={14}
          color={C.faint2}
        />
      </button>

      {/* Expanded: Knowledge LOs */}
      {expanded && knowledgeLOs && (
        <div style={{
          borderTop: `1px solid ${C.borderSoft}`,
          padding: '12px 16px 16px',
          background: '#FAFAF9',
        }}>
          <div style={{
            fontFamily: SANS, fontSize: 10, fontWeight: 700,
            color: C.faint2, textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: 8,
          }}>
            Knowledge LOs
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {knowledgeLOs.map(k => {
              const kActive = focusedKRef === k.ref;
              return (
                <div key={k.ref}>
                  <button
                    onClick={() => onFocusKRef(kActive ? null : k.ref)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 8, width: '100%',
                      padding: '8px 10px',
                      background: kActive ? col.bg : C.cream,
                      border: `1px solid ${kActive ? col.fg : C.borderSoft}`,
                      borderRadius: 7, cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: SANS, fontSize: 10, fontWeight: 700,
                      color: col.fg, background: col.bg,
                      padding: '1px 5px', borderRadius: 4, flexShrink: 0, marginTop: 1,
                    }}>
                      {k.ref}
                    </span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: SANS, fontSize: 12, color: C.ink, lineHeight: 1.4 }}>
                        {k.lo}
                      </span>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                        {k.weeks.map(w => (
                          <span key={w} style={{
                            fontFamily: SANS, fontSize: 10, color: C.faint,
                            background: C.surface, border: `1px solid ${C.borderSoft}`,
                            padding: '1px 5px', borderRadius: 4,
                          }}>
                            Wk {w}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontFamily: SANS, fontSize: 11, color: C.faint2, flexShrink: 0 }}>
                      {k.count}
                    </span>
                    <Icon name={kActive ? 'chevronDown' : 'chevronRight'} size={12} color={C.faint2} />
                  </button>

                  {/* Daily lessons */}
                  {kActive && (
                    <div style={{
                      marginTop: 6, marginLeft: 16,
                      display: 'flex', flexDirection: 'column', gap: 4,
                    }}>
                      {(yearLessons.get(k.ref) ?? []).map(lesson => (
                        <DailyLessonChip
                          key={lesson.id}
                          lesson={lesson}
                          skillColor={col}
                          onClick={() => onLessonClick(lesson)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function DailyLessonChip({
  lesson, skillColor, onClick,
}: {
  lesson: CurriculumLesson;
  skillColor: { fg: string; bg: string };
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 10px',
        background: C.surface, border: `1px solid ${C.borderSoft}`,
        borderRadius: 6, cursor: 'pointer', textAlign: 'left',
        transition: 'border-color 0.1s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = skillColor.fg; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.borderSoft; }}
    >
      <span style={{
        fontFamily: SANS, fontSize: 10, fontWeight: 700, color: C.faint2,
        flexShrink: 0,
      }}>
        {lesson.id}
      </span>
      <span style={{
        fontFamily: SANS, fontSize: 11.5, color: C.ink, flex: 1,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {lesson.dailyLO}
      </span>
      <span style={{
        fontFamily: SANS, fontSize: 10, color: C.faint2, flexShrink: 0,
      }}>
        Wk {lesson.week} · P{lesson.periodNum}
      </span>
      <Icon name="arrowRight" size={11} color={skillColor.fg} />
    </button>
  );
}

// ── Journey main panel ────────────────────────────────────────────────────────

interface JourneyCascadeProps {
  skillLOs: SkillLO[];
  focusedSkillRef: string | null;
  expandedSkillRef: string | null;
  onExpandSkill: (ref: string | null) => void;
  focusedKRef: string | null;
  onFocusKRef: (ref: string | null) => void;
  knowledgeLOsBySkill: Map<string, KnowledgeLO[]>;
  lessonsByKRef: Map<string, CurriculumLesson[]>;
  onLessonClick: (lesson: CurriculumLesson) => void;
}

export function JourneyCascade({
  skillLOs, focusedSkillRef, expandedSkillRef, onExpandSkill,
  focusedKRef, onFocusKRef, knowledgeLOsBySkill, lessonsByKRef, onLessonClick,
}: JourneyCascadeProps) {
  const filtered = focusedSkillRef
    ? skillLOs.filter(s => s.ref === focusedSkillRef)
    : skillLOs;

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 700, color: C.ink, marginBottom: 20 }}>
        Learning Journey
      </div>
      <div style={{ fontFamily: SANS, fontSize: 13, color: C.faint, marginBottom: 24, lineHeight: 1.5 }}>
        Skill LOs → Knowledge LOs → Daily Lessons — click any card to expand.
      </div>

      {filtered.map(s => (
        <SkillLOCard
          key={s.ref}
          skillLO={s}
          knowledgeLOs={knowledgeLOsBySkill.get(s.ref) ?? null}
          expanded={expandedSkillRef === s.ref}
          onToggle={() => onExpandSkill(expandedSkillRef === s.ref ? null : s.ref)}
          focusedKRef={focusedKRef}
          onFocusKRef={onFocusKRef}
          yearLessons={lessonsByKRef}
          onLessonClick={onLessonClick}
        />
      ))}
    </div>
  );
}
