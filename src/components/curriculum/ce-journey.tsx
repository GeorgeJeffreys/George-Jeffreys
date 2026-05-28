'use client';

import { useState, useRef, useEffect } from 'react';
import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import {
  CeLeftPanel, NavRow, Chip, Label,
  TierBand, ZoomControls, TopChrome,
  SKILL_COLOR, skillKey, TIER_RAIL_W,
  type TierDef,
} from './ce-shell';
import type { CurriculumLesson } from '@/types/curriculum';

export interface SkillLO { ref: string; lo: string; skill: string; count: number }
export interface KnowledgeLO { ref: string; lo: string; count: number; weeks: number[] }

const J_TIERS: TierDef[] = [
  { id: 'total',     label: 'Total LO',     sub: 'The whole-year outcome',   accent: '#8E1F49' },
  { id: 'skill',     label: 'Skill LO',     sub: 'Major skill outcomes',     accent: C.pink },
  { id: 'knowledge', label: 'Knowledge LO', sub: '~4 per skill',             accent: C.amber },
  { id: 'daily',     label: 'Daily LO',     sub: '5 per week · the lesson',  accent: C.faint },
];

const BAND_COLLAPSED = { total: 140, skill: 180, knowledge: 120, daily: 120 };
const BAND_EXPANDED  = { total: 120, skill: 180, knowledge: 140, daily: 180 };

const SKILL_CARD_H = 130;
const KLO_CARD_H   = 92;

const SKILL_W  = 142;
const SKILL_GAP = 12;
const KLO_W    = 168;
const KLO_GAP  = 12;
const DAILY_W  = 155;
const DAILY_GAP = 12;

type ConnLine = { x1: number; y1: number; x2: number; y2: number; color?: string; opacity?: number };

function relPos(el: HTMLDivElement | null, container: HTMLDivElement): { top: number; bot: number; cx: number } | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const cr = container.getBoundingClientRect();
  const st = container.scrollTop;
  return {
    top: r.top - cr.top + st,
    bot: r.top - cr.top + st + r.height,
    cx: r.left - cr.left + r.width / 2,
  };
}

// ── Cards ─────────────────────────────────────────────────────────────────────

function RootCard({ small, totalLessons, year }: { small?: boolean; totalLessons: number; year: number }) {
  const lo = `By the end of Year ${year}, students will communicate confidently, read and write short familiar texts, and recognise themselves as learners.`;
  return (
    <div style={{
      width: small ? 460 : 540,
      background: `linear-gradient(135deg, ${C.pink}, #8E1F49)`,
      color: '#fff', borderRadius: 14,
      padding: small ? '12px 18px' : '14px 22px',
      boxShadow: '0 12px 28px rgba(182,42,92,0.24),0 4px 8px rgba(182,42,92,0.14)',
      position: 'relative', overflow: 'hidden', zIndex: 2,
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
      <p style={{ fontFamily: SANS, fontSize: small ? 13 : 14.5, color: '#fff', marginTop: 6, lineHeight: 1.4, fontWeight: 600, letterSpacing: '-0.005em' }}>
        {lo}
      </p>
    </div>
  );
}

function SkillCard({ s, focused, faded, w, onClick }: { s: SkillLO; focused?: boolean; faded?: boolean; w: number; onClick: () => void }) {
  const col = SKILL_COLOR[skillKey(s.skill)];
  return (
    <div
      onClick={onClick}
      style={{
        width: w, height: SKILL_CARD_H, background: '#FFFFFF',
        border: `1px solid ${focused ? C.pinkBorder : '#E5DDD3'}`,
        borderRadius: 12, padding: 10, opacity: faded ? 0.5 : 1,
        boxShadow: focused ? `0 0 0 3px ${C.pinkSoft},0 6px 18px rgba(56,30,30,0.06)` : '0 1px 0 rgba(56,30,30,0.02)',
        display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2,
        cursor: 'pointer',
      }}
    >
      <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 700, color: '#6E6863', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
        {s.skill || col.label}
      </span>
      <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: col.fg, background: col.bg, padding: '1px 5px', borderRadius: 4, alignSelf: 'flex-start', marginTop: 2 }}>
        {s.ref}
      </span>
      <span style={{ fontFamily: SANS, fontSize: 10.5, color: C.ink, lineHeight: 1.35, display: 'block', flex: 1, marginTop: 4, overflow: 'hidden' }}>
        {s.lo}
      </span>
      <div style={{ marginTop: 4, paddingTop: 6, borderTop: `1px dashed ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: SANS, fontSize: 10, color: '#6E6863' }}>{s.count} lessons</span>
        {focused
          ? <Chip tone="pink" size="sm" style={{ height: 16, fontSize: 9.5 }}>Focus</Chip>
          : <Icon name="chevronDown" size={11} color={C.faint2} />
        }
      </div>
    </div>
  );
}

function KloCard({ k, focused, faded, w, onClick }: { k: KnowledgeLO; focused?: boolean; faded?: boolean; w: number; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: w, height: KLO_CARD_H,
        background: C.amberSoft, border: `1px solid ${focused ? '#E8A636' : '#EFD9A5'}`,
        borderRadius: 12, padding: '8px 10px', opacity: faded ? 0.45 : 1,
        boxShadow: focused ? '0 0 0 3px rgba(232,166,54,0.18)' : 'none',
        display: 'flex', flexDirection: 'column', gap: 3,
        position: 'relative', zIndex: 2, cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Chip tone="amber" size="sm" style={{ height: 16, fontSize: 9.5 }}>{k.ref}</Chip>
        {focused && <span style={{ fontFamily: SANS, fontSize: 9, color: '#7A5A11', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Focus</span>}
      </div>
      <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, lineHeight: 1.25, display: 'block' }}>{k.lo}</span>
      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginTop: 'auto' }}>
        {k.weeks.slice(0, 4).map(w => (
          <span key={w} style={{ fontFamily: SANS, fontSize: 9.5, color: C.faint, background: 'rgba(255,255,255,0.6)', padding: '0 4px', borderRadius: 3 }}>Wk {w}</span>
        ))}
      </div>
    </div>
  );
}

function DailyChip({ lesson, w, onClick }: { lesson: CurriculumLesson; w: number; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: w, background: '#FFFFFF',
        border: `1px solid ${hover ? C.pink : '#E5DDD3'}`,
        borderRadius: 8, padding: '6px 9px',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: hover ? '0 8px 24px rgba(56,30,30,0.12)' : '0 1px 0 rgba(56,30,30,0.02)',
        position: 'relative', cursor: 'pointer', zIndex: hover ? 5 : 2, transition: 'all 0.15s',
      }}
    >
      <div style={{ width: 4, height: 4, borderRadius: 999, background: C.faint, flexShrink: 0 }} />
      <span style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 700, color: '#6E6863', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{lesson.id}</span>
      <span style={{ fontFamily: SANS, fontSize: 11, flex: 1, lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lesson.dailyLO}</span>
    </div>
  );
}

function StubCard({ label, sub, w }: { label: string; sub?: string; w: number }) {
  return (
    <div style={{
      width: w, background: 'rgba(255,255,255,0.5)', border: `1px dashed ${C.faint2}`,
      borderRadius: 8, padding: '6px 10px', textAlign: 'center',
    }}>
      <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint, display: 'block' }}>{label}</span>
      {sub && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 3,
          padding: '1px 7px', borderRadius: 999, background: C.cream, border: `1px solid ${C.borderSoft}`,
          fontFamily: SANS, fontSize: 9.5, fontWeight: 600, color: C.faint,
        }}>
          <Icon name="chevronDown" size={9} color={C.faint} /> {sub}
        </div>
      )}
    </div>
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
      {/* Total LO row */}
      <div style={{
        margin: '6px 12px 8px', padding: '8px 10px', borderRadius: 8,
        background: `linear-gradient(135deg, ${C.pink}, #8E1F49)`,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Icon name="target" size={12} color="#fff" />
        <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', flex: 1 }}>Total LO</span>
        <span style={{ fontFamily: SANS, fontSize: 10, color: '#fff', opacity: 0.7 }}>Year {year}</span>
      </div>

      <div style={{ padding: '2px 16px 4px' }}>
        <span style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
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
                  <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 700, color: C.amber, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
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

// ── Collapsed cascade (Journey A) ─────────────────────────────────────────────

export function JourneyCascadeCollapsed({ skillLOs, totalLessons, year, onFocusSkill }: {
  skillLOs: SkillLO[]; totalLessons: number; year: number; onFocusSkill: (ref: string) => void;
}) {
  const [zoom, setZoom] = useState(1.0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef      = useRef<HTMLDivElement>(null);
  const skillRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<ConnLine[]>([]);

  skillRefs.current.length = skillLOs.length;

  const totalH = Object.values(BAND_COLLAPSED).reduce((a, b) => a + b, 0);

  useEffect(() => {
    function compute() {
      const c = containerRef.current;
      if (!c) return;
      const nl: ConnLine[] = [];
      const root = relPos(rootRef.current, c);
      if (root) {
        skillRefs.current.forEach(ref => {
          const sk = relPos(ref, c);
          if (sk) nl.push({ x1: root.cx, y1: root.bot, x2: sk.cx, y2: sk.top, opacity: 0.4 });
        });
      }
      setLines(nl);
    }
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    compute();
    return () => ro.disconnect();
  }, [skillLOs, zoom]);

  return (
    <div ref={containerRef} style={{ flex: 1, position: 'relative', overflowY: 'auto', background: C.cream }}>
      {/* Connector SVG — behind all content */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: totalH, pointerEvents: 'none', zIndex: 0 }}>
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={C.faint2} strokeWidth={1.5} opacity={l.opacity ?? 0.4} strokeLinecap="round"
          />
        ))}
      </svg>

      <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
        <TopChrome label="Outcome tree · all branches collapsed" badge="click a skill to expand" />

        <TierBand tier={J_TIERS[0]} minHeight={BAND_COLLAPSED.total}>
          <div ref={rootRef}>
            <RootCard totalLessons={totalLessons} year={year} />
          </div>
        </TierBand>

        <TierBand tier={J_TIERS[1]} minHeight={BAND_COLLAPSED.skill} faded>
          <div style={{ display: 'flex', gap: SKILL_GAP }}>
            {skillLOs.map((s, i) => (
              <div key={s.ref} ref={el => { skillRefs.current[i] = el; }}>
                <SkillCard s={s} w={SKILL_W} onClick={() => onFocusSkill(s.ref)} />
              </div>
            ))}
          </div>
        </TierBand>

        <TierBand tier={J_TIERS[2]} minHeight={BAND_COLLAPSED.knowledge}>
          <div style={{ display: 'flex', gap: SKILL_GAP }}>
            {skillLOs.map(s => <StubCard key={s.ref} label="Knowledge LOs" sub="expand" w={SKILL_W} />)}
          </div>
        </TierBand>

        <TierBand tier={J_TIERS[3]} minHeight={BAND_COLLAPSED.daily} last>
          <div style={{ display: 'flex', gap: SKILL_GAP }}>
            {skillLOs.map(s => <StubCard key={s.ref} label={`${s.count} daily lessons`} sub="expand" w={SKILL_W} />)}
          </div>
        </TierBand>
      </div>

      <ZoomControls
        zoom={zoom}
        onZoomIn={() => setZoom(z => Math.min(1.5, parseFloat((z + 0.1).toFixed(1))))}
        onZoomOut={() => setZoom(z => Math.max(0.4, parseFloat((z - 0.1).toFixed(1))))}
        onFit={() => setZoom(1.0)}
        onFocus={() => setZoom(1.2)}
      />
    </div>
  );
}

// ── Expanded cascade (Journey B) ──────────────────────────────────────────────

export function JourneyCascadeExpanded({ skillLOs, klos, dailyLessons, focusedSkillRef, focusedKRef, totalLessons, year, onFocusSkill, onFocusKRef, onLessonClick }: {
  skillLOs: SkillLO[];
  klos: KnowledgeLO[];
  dailyLessons: CurriculumLesson[];
  focusedSkillRef: string;
  focusedKRef: string | null;
  totalLessons: number;
  year: number;
  onFocusSkill: (ref: string | null) => void;
  onFocusKRef: (ref: string | null) => void;
  onLessonClick: (l: CurriculumLesson) => void;
}) {
  const [zoom, setZoom] = useState(1.0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef      = useRef<HTMLDivElement>(null);
  const skillRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const kloRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const dailyRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<ConnLine[]>([]);

  skillRefs.current.length = skillLOs.length;
  kloRefs.current.length   = klos.length;
  dailyRefs.current.length = dailyLessons.length;

  const focusSkillIdx = skillLOs.findIndex(s => s.ref === focusedSkillRef);
  const focusKIdx     = klos.findIndex(k => k.ref === focusedKRef);

  const totalH = Object.values(BAND_EXPANDED).reduce((a, b) => a + b, 0);

  useEffect(() => {
    function compute() {
      const c = containerRef.current;
      if (!c) return;
      const nl: ConnLine[] = [];

      const root         = relPos(rootRef.current, c);
      const focusedSkill = focusSkillIdx >= 0 ? relPos(skillRefs.current[focusSkillIdx], c) : null;

      // Root → focused skill card
      if (root && focusedSkill) {
        nl.push({ x1: root.cx, y1: root.bot, x2: focusedSkill.cx, y2: focusedSkill.top, color: C.pink, opacity: 0.55 });
      }

      // Focused skill → each KLO card
      if (focusedSkill) {
        kloRefs.current.forEach(ref => {
          const k = relPos(ref, c);
          if (k) nl.push({ x1: focusedSkill.cx, y1: focusedSkill.bot, x2: k.cx, y2: k.top, color: C.pink, opacity: 0.35 });
        });
      }

      // Focused KLO → each daily chip
      if (focusKIdx >= 0) {
        const focusedKlo = relPos(kloRefs.current[focusKIdx], c);
        if (focusedKlo) {
          dailyRefs.current.forEach(ref => {
            const d = relPos(ref, c);
            if (d) nl.push({ x1: focusedKlo.cx, y1: focusedKlo.bot, x2: d.cx, y2: d.top, color: C.teal, opacity: 0.5 });
          });
        }
      }

      setLines(nl);
    }
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    compute();
    return () => ro.disconnect();
  }, [skillLOs, klos, dailyLessons, focusedSkillRef, focusedKRef, zoom, focusSkillIdx, focusKIdx]);

  const focused      = skillLOs.find(s => s.ref === focusedSkillRef);
  const focusedKLoObj = klos.find(k => k.ref === focusedKRef);

  return (
    <div ref={containerRef} style={{ flex: 1, position: 'relative', overflowY: 'auto', background: C.cream }}>
      {/* Connector SVG — behind all content */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: totalH, pointerEvents: 'none', zIndex: 0 }}>
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={l.color ?? C.faint2} strokeWidth={1.5} opacity={l.opacity ?? 0.5} strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Breadcrumb — replaces minimap */}
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Label style={{ marginRight: 2 }}>You are viewing</Label>
        <Chip tone="pink" size="sm" style={{ fontWeight: 600 }}>{focused?.ref ?? ''} · {focused?.skill ?? ''}</Chip>
        {focusedKRef && (
          <>
            <Icon name="chevronRight" size={11} color={C.faint2} />
            <Chip tone="amber" size="sm">{focusedKRef} · {focusedKLoObj?.lo?.slice(0, 30) ?? ''}{(focusedKLoObj?.lo?.length ?? 0) > 30 ? '…' : ''}</Chip>
          </>
        )}
      </div>

      <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
        <TierBand tier={J_TIERS[0]} minHeight={BAND_EXPANDED.total}>
          <div ref={rootRef}>
            <RootCard small totalLessons={totalLessons} year={year} />
          </div>
        </TierBand>

        <TierBand tier={J_TIERS[1]} minHeight={BAND_EXPANDED.skill} faded>
          <div style={{ display: 'flex', gap: SKILL_GAP }}>
            {skillLOs.map((s, i) => (
              <div key={s.ref} ref={el => { skillRefs.current[i] = el; }}>
                <SkillCard s={s} w={SKILL_W}
                  focused={i === focusSkillIdx} faded={i !== focusSkillIdx}
                  onClick={() => onFocusSkill(i === focusSkillIdx ? null : s.ref)}
                />
              </div>
            ))}
          </div>
        </TierBand>

        <TierBand tier={J_TIERS[2]} minHeight={BAND_EXPANDED.knowledge}>
          <div style={{ display: 'flex', gap: KLO_GAP }}>
            {klos.map((k, i) => (
              <div key={k.ref} ref={el => { kloRefs.current[i] = el; }}>
                <KloCard k={k} w={KLO_W}
                  focused={i === focusKIdx}
                  onClick={() => onFocusKRef(i === focusKIdx ? null : k.ref)}
                />
              </div>
            ))}
            {klos.length === 0 && <StubCard label="Loading knowledge LOs…" w={KLO_W} />}
          </div>
        </TierBand>

        {/* Daily tier */}
        <div style={{ position: 'relative', minHeight: BAND_EXPANDED.daily, display: 'flex', background: 'transparent' }}>
          <div style={{
            width: TIER_RAIL_W, flexShrink: 0, padding: '14px 12px 14px 16px',
            display: 'flex', flexDirection: 'column', gap: 4, background: 'transparent',
            borderRight: `1px dashed ${C.borderSoft}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 3, height: 14, borderRadius: 2, background: J_TIERS[3].accent }} />
              <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.1, color: C.ink }}>{J_TIERS[3].label}</span>
            </div>
            <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint, lineHeight: 1.4 }}>{J_TIERS[3].sub}</span>
          </div>
          <div style={{ flex: 1, position: 'relative', zIndex: 2, padding: '20px 24px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            {focusedKRef ? (
              <div style={{ display: 'flex', gap: DAILY_GAP, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {dailyLessons.map((l, i) => (
                  <div key={l.id} ref={el => { dailyRefs.current[i] = el; }}>
                    <DailyChip lesson={l} w={DAILY_W} onClick={() => onLessonClick(l)} />
                  </div>
                ))}
              </div>
            ) : (
              <StubCard label="Select a Knowledge LO above to see daily lessons" w={400} />
            )}
          </div>
        </div>
      </div>

      <ZoomControls
        zoom={zoom}
        onZoomIn={() => setZoom(z => Math.min(1.5, parseFloat((z + 0.1).toFixed(1))))}
        onZoomOut={() => setZoom(z => Math.max(0.4, parseFloat((z - 0.1).toFixed(1))))}
        onFit={() => setZoom(1.0)}
        onFocus={() => {
          setZoom(1.2);
          // Scroll focused skill card into view
          const el = skillRefs.current[focusSkillIdx];
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      />
    </div>
  );
}
