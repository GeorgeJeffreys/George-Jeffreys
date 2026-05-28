'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import {
  CeLeftPanel, NavRow, Chip, Label, HiBtn,
  ZoomControls, SKILL_COLOR, skillKey,
  type TierDef,
} from './ce-shell';
import type { CurriculumLesson } from '@/types/curriculum';

export interface SkillLO { ref: string; lo: string; skill: string; count: number }
export interface KnowledgeLO { ref: string; lo: string; count: number; weeks: number[] }

// ── Tier constants ────────────────────────────────────────────────────────────

const RAIL_W = 96;

const J_TIERS: TierDef[] = [
  { id: 'total',     label: 'Total LO',     sub: 'The whole-year outcome',   accent: '#8E1F49' },
  { id: 'skill',     label: 'Skill LO',     sub: 'Major skill outcomes',     accent: C.pink },
  { id: 'knowledge', label: 'Knowledge LO', sub: '~4 per skill',             accent: C.amber },
  { id: 'daily',     label: 'Daily LO',     sub: '5 per week · the lesson',  accent: C.faint },
];

// ── Tier row (Fix #3 — left rail tier labels) ─────────────────────────────────
// Not using TierBand from ce-shell because position:sticky breaks inside scale()

function TierRow({ tier, children, alignCenter = false, last = false }: {
  tier: TierDef;
  children: React.ReactNode;
  alignCenter?: boolean;
  last?: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      borderBottom: last ? 'none' : `1px solid ${C.borderSoft}`,
      background: 'transparent',
    }}>
      {/* Sticky-style left rail — scrolls with content when inside transform */}
      <div style={{
        width: RAIL_W, flexShrink: 0,
        padding: '14px 12px 14px 16px',
        display: 'flex', flexDirection: 'column', gap: 4,
        borderRight: `1px dashed ${C.borderSoft}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: tier.accent }} />
          <span style={{
            fontFamily: SANS, fontSize: 10, fontWeight: 700, color: C.ink,
            textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.1,
          }}>{tier.label}</span>
        </div>
        <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint, lineHeight: 1.4 }}>
          {tier.sub}
        </span>
      </div>
      {/* Content area */}
      <div style={{
        flex: 1, padding: '20px 24px',
        display: 'flex',
        alignItems: alignCenter ? 'center' : 'flex-start',
        justifyContent: alignCenter ? 'center' : 'flex-start',
      }}>
        {children}
      </div>
    </div>
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

function SkillCard({ s, focused, faded, onClick }: {
  s: SkillLO; focused?: boolean; faded?: boolean; onClick: () => void;
}) {
  const col = SKILL_COLOR[skillKey(s.skill)];
  return (
    <div
      onClick={onClick}
      style={{
        width: 200, maxHeight: 160, background: '#FFFFFF',
        border: `1px solid ${focused ? C.pinkBorder : '#E5DDD3'}`,
        borderRadius: 12, padding: 10,
        opacity: faded ? 0.6 : 1,
        boxShadow: focused
          ? `0 0 0 3px ${C.pinkSoft},0 6px 18px rgba(56,30,30,0.06)`
          : '0 1px 0 rgba(56,30,30,0.02)',
        display: 'flex', flexDirection: 'column', position: 'relative',
        cursor: 'pointer', overflow: 'hidden',
        transition: 'opacity 0.15s, box-shadow 0.15s',
        flexShrink: 0,
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

function KloCard({ k, focused, faded, onClick }: {
  k: KnowledgeLO; focused?: boolean; faded?: boolean; onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 180, maxHeight: 140,
        background: C.amberSoft, border: `1px solid ${focused ? '#E8A636' : '#EFD9A5'}`,
        borderRadius: 12, padding: '8px 10px',
        opacity: faded ? 0.6 : 1,
        boxShadow: focused ? '0 0 0 3px rgba(232,166,54,0.18)' : 'none',
        display: 'flex', flexDirection: 'column', gap: 3,
        position: 'relative', cursor: 'pointer', overflow: 'hidden',
        transition: 'opacity 0.15s',
        flexShrink: 0,
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

function DailyChip({ lesson, onClick }: {
  lesson: CurriculumLesson; onClick: () => void;
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
        width: 160, background: '#FFFFFF',
        border: `1px solid ${hover ? C.pink : '#E5DDD3'}`,
        borderRadius: 8, padding: '5px 8px',
        display: 'flex', flexDirection: 'column', gap: 2,
        boxShadow: hover ? '0 4px 12px rgba(56,30,30,0.1)' : '0 1px 0 rgba(56,30,30,0.02)',
        cursor: 'pointer', transition: 'all 0.12s',
        flexShrink: 0,
      }}
    >
      <span style={{
        fontFamily: SANS, fontSize: 9, fontWeight: 700,
        color: C.faint, fontVariantNumeric: 'tabular-nums',
      }}>{lesson.id}</span>
      <span style={{
        fontFamily: SANS, fontSize: 10.5, color: C.ink, lineHeight: 1.3,
        overflow: 'hidden', display: '-webkit-box',
        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        wordBreak: 'break-word',
      } as React.CSSProperties}>{preview}</span>
    </div>
  );
}

// ── Lesson Modal ──────────────────────────────────────────────────────────────

function LessonModal({ lesson, onClose }: { lesson: CurriculumLesson; onClose: () => void }) {
  const router = useRouter();
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100,
      }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 101, background: '#fff', borderRadius: 16,
        padding: '28px 28px 24px',
        width: 480, maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto',
        boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 12, right: 12,
          width: 28, height: 28, borderRadius: 999,
          border: `1px solid ${C.border}`, background: C.cream,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="x" size={14} color={C.faint} />
        </button>

        <Chip tone="pink" size="sm">{lesson.id}</Chip>

        <p style={{
          fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.ink,
          lineHeight: 1.5, margin: '12px 0 16px',
        }}>{lesson.dailyLO}</p>

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
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.ink, margin: '4px 0 0', lineHeight: 1.4 }}>
                  {lesson.grammarFocus}
                </p>
              </div>
            )}
            {lesson.vocabFocus && (
              <div style={{
                background: C.cream, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: '8px 10px',
              }}>
                <Label>Vocab</Label>
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.ink, margin: '4px 0 0', lineHeight: 1.4 }}>
                  {lesson.vocabFocus}
                </p>
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
          variant="primary" size="md"
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

// ── Journey Org Chart — Fixes #1 (always visible), #2 (wheel zoom), #3 (tier rails) ───

export function JourneyOrgChart({
  skillLOs, klosBySkill, allLessons, focusedSkillRef, focusedKRef,
  totalLessons, year, onFocusSkill, onFocusKRef,
}: {
  skillLOs: SkillLO[];
  klosBySkill: Map<string, KnowledgeLO[]>;
  allLessons: CurriculumLesson[];
  focusedSkillRef: string | null;
  focusedKRef: string | null;
  totalLessons: number;
  year: number;
  onFocusSkill: (ref: string | null) => void;
  onFocusKRef: (ref: string | null) => void;
}) {
  const [zoom, setZoom] = useState(1.0);
  const [modalLesson, setModalLesson] = useState<CurriculumLesson | null>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  // Group daily lessons by skill+klo key for O(1) lookup
  const dailyByKey = useMemo(() => {
    const m = new Map<string, CurriculumLesson[]>();
    allLessons.forEach(l => {
      if (!l.skillLORef || !l.knowledgeLORef) return;
      const key = `${l.skillLORef}|${l.knowledgeLORef}`;
      const arr = m.get(key) ?? [];
      arr.push(l);
      m.set(key, arr);
    });
    return m;
  }, [allLessons]);

  // Fix #2 — mouse wheel / trackpad pinch zoom
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(z => Math.min(1.5, Math.max(0.3, z + e.deltaY * -0.001)));
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <>
      {/* Outer: non-scrollable, position:relative keeps ZoomControls fixed (Fix #8) */}
      <div ref={outerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden', background: C.cream }}>
        {/* Scrollable inner */}
        <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'auto' }}>
          {/* Scaled canvas — Fix #2 zoom applied here */}
          <div style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            minWidth: 'max-content',
            paddingBottom: 80,
          }}>

            {/* ── Tier 1: Total LO ── */}
            <TierRow tier={J_TIERS[0]} alignCenter>
              <RootCard totalLessons={totalLessons} year={year} />
            </TierRow>

            {/* ── Tier 2: Skill LOs — always all visible ── */}
            <TierRow tier={J_TIERS[1]}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'nowrap' }}>
                {skillLOs.map(s => (
                  <SkillCard
                    key={s.ref}
                    s={s}
                    focused={s.ref === focusedSkillRef}
                    faded={!!focusedSkillRef && s.ref !== focusedSkillRef}
                    onClick={() => onFocusSkill(s.ref === focusedSkillRef ? null : s.ref)}
                  />
                ))}
              </div>
            </TierRow>

            {/* ── Tier 3: Knowledge LOs — always all visible, grouped by parent skill ── */}
            <TierRow tier={J_TIERS[2]}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                {skillLOs.map(s => {
                  const col = SKILL_COLOR[skillKey(s.skill)];
                  const klos = klosBySkill.get(s.ref) ?? [];
                  const isSkillFocused = s.ref === focusedSkillRef;
                  return (
                    <div key={s.ref} style={{
                      display: 'flex', flexDirection: 'column', gap: 6,
                      opacity: (focusedSkillRef && !isSkillFocused) ? 0.6 : 1,
                      transition: 'opacity 0.15s',
                    }}>
                      {/* Parent skill label */}
                      <span style={{
                        fontFamily: SANS, fontSize: 9, fontWeight: 700,
                        color: col.fg, background: col.bg,
                        padding: '1px 7px', borderRadius: 4, alignSelf: 'flex-start',
                        border: `1px solid ${col.bg}`,
                      }}>{s.ref}</span>
                      {/* KLO cards stacked */}
                      {klos.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {klos.map(k => (
                            <KloCard
                              key={k.ref}
                              k={k}
                              focused={isSkillFocused && k.ref === focusedKRef}
                              faded={isSkillFocused && !!focusedKRef && k.ref !== focusedKRef}
                              onClick={() => {
                                if (!isSkillFocused) onFocusSkill(s.ref);
                                onFocusKRef(k.ref === focusedKRef ? null : k.ref);
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div style={{
                          width: 180, padding: '10px 12px',
                          fontFamily: SANS, fontSize: 10, color: C.faint, fontStyle: 'italic',
                          background: 'rgba(255,255,255,0.4)', border: `1px dashed ${C.borderSoft}`,
                          borderRadius: 8,
                        }}>loading…</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TierRow>

            {/* ── Tier 4: Daily LOs — always all visible, grouped by parent KLO within each skill ── */}
            <TierRow tier={J_TIERS[3]} last>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                {skillLOs.map(s => {
                  const klos = klosBySkill.get(s.ref) ?? [];
                  const isSkillFocused = s.ref === focusedSkillRef;
                  return (
                    <div key={s.ref} style={{
                      display: 'flex', flexDirection: 'column', gap: 10,
                      width: 180, flexShrink: 0,
                      opacity: (focusedSkillRef && !isSkillFocused) ? 0.6 : 1,
                      transition: 'opacity 0.15s',
                    }}>
                      {klos.map(k => {
                        const lessons = dailyByKey.get(`${s.ref}|${k.ref}`) ?? [];
                        const isKloFocused = isSkillFocused && k.ref === focusedKRef;
                        return (
                          <div key={k.ref} style={{
                            display: 'flex', flexDirection: 'column', gap: 4,
                            opacity: (isSkillFocused && focusedKRef && !isKloFocused) ? 0.6 : 1,
                          }}>
                            {/* Parent KLO label */}
                            <span style={{
                              fontFamily: SANS, fontSize: 9, fontWeight: 700,
                              color: '#7A5A11', background: C.amberSoft,
                              padding: '1px 6px', borderRadius: 3, alignSelf: 'flex-start',
                            }}>{k.ref}</span>
                            {/* Daily chips */}
                            {lessons.length > 0 ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {lessons.map(l => (
                                  <DailyChip key={l.id} lesson={l} onClick={() => setModalLesson(l)} />
                                ))}
                              </div>
                            ) : klos.length > 0 ? (
                              <span style={{
                                fontFamily: SANS, fontSize: 10, color: C.faint2,
                                fontStyle: 'italic',
                              }}>—</span>
                            ) : null}
                          </div>
                        );
                      })}
                      {klos.length === 0 && (
                        <span style={{
                          fontFamily: SANS, fontSize: 10, color: C.faint2,
                          fontStyle: 'italic',
                        }}>loading…</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </TierRow>

          </div>
        </div>

        {/* Zoom controls — in outer non-scrollable wrapper, stays visible (Fix #8) */}
        <ZoomControls
          zoom={zoom}
          onZoomIn={() => setZoom(z => Math.min(1.5, parseFloat((z + 0.1).toFixed(1))))}
          onZoomOut={() => setZoom(z => Math.max(0.3, parseFloat((z - 0.1).toFixed(1))))}
          onFit={() => setZoom(1.0)}
          onFocus={() => setZoom(1.2)}
        />
      </div>

      {modalLesson && <LessonModal lesson={modalLesson} onClose={() => setModalLesson(null)} />}
    </>
  );
}
