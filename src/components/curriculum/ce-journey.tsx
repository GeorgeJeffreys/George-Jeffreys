'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import {
  CeLeftPanel, NavRow, Chip, Label, HiBtn,
  ZoomControls, SKILL_COLOR, skillKey,
} from './ce-shell';
import type { CurriculumLesson } from '@/types/curriculum';

export interface SkillLO { ref: string; lo: string; skill: string; count: number }
export interface KnowledgeLO { ref: string; lo: string; count: number; weeks: number[] }

// ── Connector ─────────────────────────────────────────────────────────────────

function VertConnector() {
  return (
    <div style={{
      width: 1, height: 28, margin: '4px auto',
      background: 'repeating-linear-gradient(to bottom, #E5DDD3 0px, #E5DDD3 4px, transparent 4px, transparent 8px)',
    }} />
  );
}

// ── Cards ─────────────────────────────────────────────────────────────────────

function RootCard({ totalLessons, year }: { totalLessons: number; year: number }) {
  const lo = `By the end of Year ${year}, students will communicate confidently, read and write short familiar texts, and recognise themselves as learners.`;
  return (
    <div style={{
      width: 540,
      background: `linear-gradient(135deg, ${C.pink}, #8E1F49)`,
      color: '#fff', borderRadius: 14,
      padding: '14px 22px',
      boxShadow: '0 12px 28px rgba(182,42,92,0.24),0 4px 8px rgba(182,42,92,0.14)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '3px 8px', borderRadius: 999,
        background: 'rgba(255,255,255,0.18)',
        fontFamily: SANS, fontSize: 10, fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff',
      }}>
        <Icon name="target" size={11} color="#fff" /> Total LO · Year {year}
      </div>
      <p style={{
        fontFamily: SANS, fontSize: 14.5, color: '#fff', marginTop: 6, lineHeight: 1.4,
        fontWeight: 600, letterSpacing: '-0.005em',
        overflow: 'hidden', wordBreak: 'break-word',
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
      } as React.CSSProperties}>
        {lo}
      </p>
    </div>
  );
}

function SkillCard({ s, focused, faded, w, onClick }: {
  s: SkillLO; focused?: boolean; faded?: boolean; w: number; onClick: () => void;
}) {
  const col = SKILL_COLOR[skillKey(s.skill)];
  return (
    <div
      onClick={onClick}
      style={{
        width: w, maxHeight: 160, background: '#FFFFFF',
        border: `1px solid ${focused ? C.pinkBorder : '#E5DDD3'}`,
        borderRadius: 12, padding: 10, opacity: faded ? 0.5 : 1,
        boxShadow: focused
          ? `0 0 0 3px ${C.pinkSoft},0 6px 18px rgba(56,30,30,0.06)`
          : '0 1px 0 rgba(56,30,30,0.02)',
        display: 'flex', flexDirection: 'column', position: 'relative',
        cursor: 'pointer', overflow: 'hidden',
        transition: 'opacity 0.15s',
      }}
    >
      <span style={{
        fontFamily: SANS, fontSize: 9, fontWeight: 700, color: '#6E6863',
        textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block',
      }}>
        {s.skill || col.label}
      </span>
      <span style={{
        fontFamily: SANS, fontSize: 10, fontWeight: 700,
        color: col.fg, background: col.bg,
        padding: '1px 5px', borderRadius: 4,
        alignSelf: 'flex-start', marginTop: 2,
      }}>
        {s.ref}
      </span>
      <span style={{
        fontFamily: SANS, fontSize: 10.5, color: C.ink, lineHeight: 1.35,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
        overflow: 'hidden', wordBreak: 'break-word',
        flex: 1, marginTop: 4,
      } as React.CSSProperties}>
        {s.lo}
      </span>
      <div style={{
        marginTop: 4, paddingTop: 6, borderTop: `1px dashed ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: SANS, fontSize: 10, color: '#6E6863' }}>{s.count} lessons</span>
        {focused
          ? <Chip tone="pink" size="sm" style={{ height: 16, fontSize: 9.5 }}>Focus</Chip>
          : <Icon name="chevronDown" size={11} color={C.faint2} />
        }
      </div>
    </div>
  );
}

function KloCard({ k, focused, faded, w, onClick }: {
  k: KnowledgeLO; focused?: boolean; faded?: boolean; w: number; onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        width: w, maxHeight: 140,
        background: C.amberSoft, border: `1px solid ${focused ? '#E8A636' : '#EFD9A5'}`,
        borderRadius: 12, padding: '8px 10px', opacity: faded ? 0.45 : 1,
        boxShadow: focused ? '0 0 0 3px rgba(232,166,54,0.18)' : 'none',
        display: 'flex', flexDirection: 'column', gap: 3,
        position: 'relative', cursor: 'pointer', overflow: 'hidden',
        transition: 'opacity 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Chip tone="amber" size="sm" style={{ height: 16, fontSize: 9.5 }}>{k.ref}</Chip>
        {focused && (
          <span style={{
            fontFamily: SANS, fontSize: 9, color: '#7A5A11',
            fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>Focus</span>
        )}
      </div>
      <span style={{
        fontFamily: SANS, fontSize: 11, fontWeight: 600, lineHeight: 1.25,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
        overflow: 'hidden', wordBreak: 'break-word',
      } as React.CSSProperties}>
        {k.lo}
      </span>
      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginTop: 'auto' }}>
        {k.weeks.slice(0, 4).map(wk => (
          <span key={wk} style={{
            fontFamily: SANS, fontSize: 9.5, color: C.faint,
            background: 'rgba(255,255,255,0.6)', padding: '0 4px', borderRadius: 3,
          }}>Wk {wk}</span>
        ))}
      </div>
    </div>
  );
}

function DailyChip({ lesson, w, onClick }: {
  lesson: CurriculumLesson; w: number; onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const words = lesson.dailyLO.split(/\s+/);
  const preview = words.slice(0, 6).join(' ') + (words.length > 6 ? '…' : '');
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: w, background: '#FFFFFF',
        border: `1px solid ${hover ? C.pink : '#E5DDD3'}`,
        borderRadius: 8, padding: '6px 9px',
        display: 'flex', flexDirection: 'column', gap: 3,
        boxShadow: hover ? '0 8px 24px rgba(56,30,30,0.12)' : '0 1px 0 rgba(56,30,30,0.02)',
        cursor: 'pointer', transition: 'all 0.15s',
      }}
    >
      <span style={{
        fontFamily: SANS, fontSize: 9.5, fontWeight: 700,
        color: C.faint, fontVariantNumeric: 'tabular-nums',
      }}>{lesson.id}</span>
      <span style={{
        fontFamily: SANS, fontSize: 11, color: C.ink, lineHeight: 1.3,
        overflow: 'hidden', wordBreak: 'break-word',
      }}>{preview}</span>
    </div>
  );
}

// ── Lesson Modal (Fix #7) ─────────────────────────────────────────────────────

function LessonModal({ lesson, onClose }: { lesson: CurriculumLesson; onClose: () => void }) {
  const router = useRouter();
  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100 }}
      />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 101, background: '#fff', borderRadius: 16,
        padding: '28px 28px 24px',
        width: 480, maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto',
        boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 28, height: 28, borderRadius: 999,
            border: `1px solid ${C.border}`, background: C.cream,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon name="x" size={14} color={C.faint} />
        </button>

        <Chip tone="pink" size="sm">{lesson.id}</Chip>

        <p style={{
          fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.ink,
          lineHeight: 1.5, margin: '12px 0 16px',
        }}>
          {lesson.dailyLO}
        </p>

        {lesson.knowledgeLO && (
          <div style={{ marginBottom: 12 }}>
            <Label>Knowledge LO</Label>
            <p style={{
              fontFamily: SANS, fontSize: 12.5, color: C.ink,
              margin: '4px 0 0', lineHeight: 1.45,
            }}>{lesson.knowledgeLO}</p>
          </div>
        )}

        {(lesson.grammarFocus || lesson.vocabFocus) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {lesson.grammarFocus && (
              <div style={{
                background: C.cream, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: '8px 10px',
              }}>
                <Label>Grammar</Label>
                <p style={{
                  fontFamily: SANS, fontSize: 12.5, color: C.ink,
                  margin: '4px 0 0', lineHeight: 1.4,
                }}>{lesson.grammarFocus}</p>
              </div>
            )}
            {lesson.vocabFocus && (
              <div style={{
                background: C.cream, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: '8px 10px',
              }}>
                <Label>Vocab</Label>
                <p style={{
                  fontFamily: SANS, fontSize: 12.5, color: C.ink,
                  margin: '4px 0 0', lineHeight: 1.4,
                }}>{lesson.vocabFocus}</p>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {lesson.theme && <Chip tone="neutral" size="sm">{lesson.theme}</Chip>}
          {lesson.week != null && <Chip tone="neutral" size="sm">Week {lesson.week}</Chip>}
          {lesson.periodNum != null && <Chip tone="neutral" size="sm">Period {lesson.periodNum}</Chip>}
        </div>

        <HiBtn
          variant="primary"
          size="md"
          icon={<Icon name="arrowRight" size={14} color="#fff" />}
          onClick={() => router.push(`/plan/new?lessonId=${encodeURIComponent(lesson.id)}`)}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Plan this lesson →
        </HiBtn>
      </div>
    </>
  );
}

// ── Left navigator ────────────────────────────────────────────────────────────

interface JourneyLeftProps {
  year: number;
  totalLessons: number;
  skillLOs: SkillLO[];
  focusedSkillRef: string | null;
  expandedSkillRef: string | null;
  focusedKRef: string | null;
  klosBySkill: Map<string, KnowledgeLO[]>;
  onFocusSkill: (ref: string | null) => void;
  onFocusKRef: (ref: string | null) => void;
}

export function JourneyLeft({
  year, totalLessons, skillLOs, focusedSkillRef, expandedSkillRef,
  focusedKRef, klosBySkill, onFocusSkill, onFocusKRef,
}: JourneyLeftProps) {
  return (
    <CeLeftPanel
      title="Outcome hierarchy"
      sublabel="Total → Skill → Knowledge → Daily"
      footerHint="Outcomes subdivide by grain. The day is the smallest LO — one lesson."
    >
      <div style={{
        margin: '6px 12px 8px', padding: '8px 10px', borderRadius: 8,
        background: `linear-gradient(135deg, ${C.pink}, #8E1F49)`,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Icon name="target" size={12} color="#fff" />
        <span style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 700, color: '#fff',
          textTransform: 'uppercase', letterSpacing: '0.08em', flex: 1,
        }}>Total LO</span>
        <span style={{ fontFamily: SANS, fontSize: 10, color: '#fff', opacity: 0.7 }}>Year {year}</span>
      </div>

      <div style={{ padding: '2px 16px 4px' }}>
        <span style={{
          fontFamily: SANS, fontSize: 9.5, fontWeight: 700, color: C.faint,
          textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          Skill LOs · {skillLOs.length}
        </span>
      </div>

      {skillLOs.map(s => {
        const isFocus = s.ref === focusedSkillRef;
        const klos = klosBySkill.get(s.ref) ?? [];
        return (
          <div key={s.ref}>
            <NavRow
              depth={0}
              label={`${s.ref} · ${s.lo || s.skill}`}
              count={s.count}
              active={isFocus}
              expanded={isFocus}
              onClick={() => onFocusSkill(isFocus ? null : s.ref)}
            />
            {isFocus && klos.length > 0 && (
              <>
                <div style={{ padding: '4px 16px 2px 36px' }}>
                  <span style={{
                    fontFamily: SANS, fontSize: 9, fontWeight: 700, color: C.amber,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    Knowledge · {klos.length}
                  </span>
                </div>
                {klos.map(k => (
                  <NavRow
                    key={k.ref}
                    depth={1}
                    label={`${k.ref} · ${k.lo}`}
                    count={k.count}
                    active={focusedKRef === k.ref}
                    expanded={focusedKRef === k.ref}
                    leaf={focusedKRef !== k.ref}
                    dot={C.amber}
                    onClick={() => onFocusKRef(focusedKRef === k.ref ? null : k.ref)}
                  />
                ))}
              </>
            )}
          </div>
        );
      })}
    </CeLeftPanel>
  );
}

// ── Journey Org Chart (Fixes #5, #6, #7, #8) ─────────────────────────────────

export function JourneyOrgChart({
  skillLOs, klos, dailyLessons, focusedSkillRef, focusedKRef,
  totalLessons, year, onFocusSkill, onFocusKRef,
}: {
  skillLOs: SkillLO[];
  klos: KnowledgeLO[];
  dailyLessons: CurriculumLesson[];
  focusedSkillRef: string | null;
  focusedKRef: string | null;
  totalLessons: number;
  year: number;
  onFocusSkill: (ref: string | null) => void;
  onFocusKRef: (ref: string | null) => void;
}) {
  const [zoom, setZoom] = useState(1.0);
  const [modalLesson, setModalLesson] = useState<CurriculumLesson | null>(null);

  return (
    <>
      {/* Outer wrapper: non-scrollable, position: relative so ZoomControls stays visible */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: C.cream }}>
        {/* Scrollable inner */}
        <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'auto' }}>
          <div style={{
            transform: `scale(${zoom})`, transformOrigin: 'top center',
            minWidth: 900, padding: '32px 32px 80px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>

            {/* Total LO */}
            <RootCard totalLessons={totalLessons} year={year} />

            <VertConnector />

            {/* Skill LO row */}
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', maxWidth: '100%' }}>
              {skillLOs.map(s => (
                <SkillCard
                  key={s.ref}
                  s={s}
                  w={200}
                  focused={s.ref === focusedSkillRef}
                  faded={!!focusedSkillRef && s.ref !== focusedSkillRef}
                  onClick={() => onFocusSkill(s.ref === focusedSkillRef ? null : s.ref)}
                />
              ))}
            </div>

            {/* KLO tier — only shown when a skill is focused */}
            {focusedSkillRef && (
              <>
                <VertConnector />
                {klos.length > 0 ? (
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', maxWidth: '100%' }}>
                    {klos.map(k => (
                      <KloCard
                        key={k.ref}
                        k={k}
                        w={180}
                        focused={k.ref === focusedKRef}
                        faded={!!focusedKRef && k.ref !== focusedKRef}
                        onClick={() => onFocusKRef(k.ref === focusedKRef ? null : k.ref)}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '20px 0', textAlign: 'center' }}>
                    <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint }}>Loading knowledge outcomes…</span>
                  </div>
                )}
              </>
            )}

            {/* Daily tier — only shown when a KLO is focused */}
            {focusedKRef && (
              <>
                <VertConnector />
                {dailyLessons.length > 0 ? (
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', maxWidth: '100%' }}>
                    {dailyLessons.map(l => (
                      <DailyChip key={l.id} lesson={l} w={160} onClick={() => setModalLesson(l)} />
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '20px 0', textAlign: 'center' }}>
                    <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint }}>No lessons found for this knowledge outcome.</span>
                  </div>
                )}
              </>
            )}

          </div>
        </div>

        {/* Zoom controls — absolutely positioned in outer (non-scrollable) wrapper, Fix #8 */}
        <ZoomControls
          zoom={zoom}
          onZoomIn={() => setZoom(z => Math.min(1.5, parseFloat((z + 0.1).toFixed(1))))}
          onZoomOut={() => setZoom(z => Math.max(0.4, parseFloat((z - 0.1).toFixed(1))))}
          onFit={() => setZoom(1.0)}
          onFocus={() => setZoom(1.2)}
        />
      </div>

      {modalLesson && <LessonModal lesson={modalLesson} onClose={() => setModalLesson(null)} />}
    </>
  );
}
