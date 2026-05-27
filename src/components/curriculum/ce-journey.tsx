'use client';

import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import {
  CeLeftPanel, NavRow, HiBtn, Chip, Label,
  TierBand, CascadeCanvas, ZoomControls, Minimap, TopChrome,
  SKILL_COLOR, skillKey, TIER_RAIL_W,
  type TierDef,
} from './ce-shell';
import type { CurriculumLesson } from '@/types/curriculum';

export interface SkillLO { ref: string; lo: string; skill: string; count: number }
export interface KnowledgeLO { ref: string; lo: string; count: number; weeks: number[] }

const J_TIERS: TierDef[] = [
  { id: 'total',    label: 'Total LO',    sub: 'The whole-year outcome',   accent: '#8E1F49' },
  { id: 'skill',    label: 'Skill LO',    sub: 'Major skill outcomes',      accent: C.pink },
  { id: 'knowledge',label: 'Knowledge LO',sub: '~4 per skill',             accent: C.amber },
  { id: 'daily',    label: 'Daily LO',    sub: '5 per week · the lesson',  accent: C.faint },
];

// Band heights
const BAND_COLLAPSED = { total: 140, skill: 180, knowledge: 120, daily: 120 };
const BAND_EXPANDED  = { total: 120, skill: 180, knowledge: 140, daily: 180 };

// Card dimensions
const SKILL_CARD_H = 130;
const KLO_CARD_H   = 92;
const DAILY_CHIP_H = 32;

// Canvas content width (excluding rail)
const CW = 840;

// Card layout
const SKILL_W = 142;
const SKILL_GAP = 12;
const KLO_W = 168;
const KLO_GAP = 12;
const DAILY_W = 155;
const DAILY_GAP = 12;

function rowX(rowW: number, cardW: number, gap: number, i: number) {
  const startX = TIER_RAIL_W + (CW - rowW) / 2;
  return startX + i * (cardW + gap) + cardW / 2;
}

function bandTop(id: string, heights: Record<string, number>) {
  const order = ['total', 'skill', 'knowledge', 'daily'];
  let y = 0;
  for (const k of order) { if (k === id) return y; y += heights[k]; }
  return y;
}
function cardTop(id: string, heights: Record<string, number>, h: number) { return bandTop(id, heights) + (heights[id] - h) / 2; }
function cardBottom(id: string, heights: Record<string, number>, h: number) { return cardTop(id, heights, h) + h; }

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
        width: w, height: SKILL_CARD_H, background: C.surface,
        border: `1px solid ${focused ? C.pinkBorder : C.border}`,
        borderRadius: 10, padding: 10, opacity: faded ? 0.5 : 1,
        boxShadow: focused ? `0 0 0 3px ${C.pinkSoft},0 6px 18px rgba(56,30,30,0.06)` : '0 1px 0 rgba(56,30,30,0.02)',
        display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 3,
        cursor: 'pointer',
      }}
    >
      <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
        {s.skill || col.label}
      </span>
      <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: col.fg, background: col.bg, padding: '1px 5px', borderRadius: 4, alignSelf: 'flex-start', marginTop: 2 }}>
        {s.ref}
      </span>
      <span style={{ fontFamily: SANS, fontSize: 10.5, color: C.ink, lineHeight: 1.35, display: 'block', flex: 1, marginTop: 4, overflow: 'hidden' }}>
        {s.lo}
      </span>
      <div style={{ marginTop: 4, paddingTop: 6, borderTop: `1px dashed ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint }}>{s.count} lessons</span>
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
        borderRadius: 10, padding: '8px 10px', opacity: faded ? 0.45 : 1,
        boxShadow: focused ? '0 0 0 3px rgba(232,166,54,0.18)' : 'none',
        display: 'flex', flexDirection: 'column', gap: 3,
        position: 'relative', zIndex: 3, cursor: 'pointer',
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

function DailyChip({ lesson, hover, w, onClick }: { lesson: CurriculumLesson; hover?: boolean; w: number; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: w, height: DAILY_CHIP_H, background: C.surface,
        border: `1px solid ${hover ? C.pink : C.border}`,
        borderRadius: 8, padding: '6px 9px',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: hover ? '0 8px 24px rgba(56,30,30,0.12)' : '0 1px 0 rgba(56,30,30,0.02)',
        position: 'relative', cursor: 'pointer', zIndex: hover ? 6 : 3, transition: 'all 0.15s',
      }}
    >
      <div style={{ width: 4, height: 4, borderRadius: 999, background: C.faint, flexShrink: 0 }} />
      <span style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 700, color: C.faint, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{lesson.id}</span>
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
  const heights = BAND_COLLAPSED;
  const n = skillLOs.length;
  const skillRowW = n * SKILL_W + Math.max(0, n - 1) * SKILL_GAP;
  const totalHeight = Object.values(heights).reduce((a, b) => a + b, 0);

  const totalCx = TIER_RAIL_W + CW / 2;
  const totalBot = cardBottom('total', heights, 100);
  const skillCardTop = cardTop('skill', heights, SKILL_CARD_H);
  const skillCardBot = cardBottom('skill', heights, SKILL_CARD_H);
  const sCx = (i: number) => rowX(skillRowW, SKILL_W, SKILL_GAP, i);
  const spineY = skillCardTop - 18;
  const kloStubTop = bandTop('knowledge', heights) + 16;
  const kloStubBot = bandTop('knowledge', heights) + heights.knowledge - 16;
  const dailyStubTop = bandTop('daily', heights) + 16;

  const connectors = [
    { d: `M ${totalCx} ${totalBot} L ${totalCx} ${spineY}`, weight: 2, opacity: 0.5 },
    n > 1 ? { d: `M ${sCx(0)} ${spineY} L ${sCx(n - 1)} ${spineY}`, weight: 1.5, opacity: 0.4 } : null,
    ...skillLOs.map((_, i) => ({ d: `M ${sCx(i)} ${spineY} L ${sCx(i)} ${skillCardTop}`, weight: 1.5, opacity: 0.5 })),
    ...skillLOs.map((_, i) => ({ d: `M ${sCx(i)} ${skillCardBot} L ${sCx(i)} ${kloStubTop}`, weight: 1, opacity: 0.3, dashed: true })),
    ...skillLOs.map((_, i) => ({ d: `M ${sCx(i)} ${kloStubBot} L ${sCx(i)} ${dailyStubTop}`, weight: 1, opacity: 0.25, dashed: true })),
  ].filter(Boolean) as { d: string; weight: number; opacity: number; dashed?: boolean }[];

  return (
    <CascadeCanvas connectors={connectors} totalHeight={totalHeight}>
      <TopChrome label="Outcome tree · all branches collapsed" badge="click a skill to expand" />

      <TierBand tier={J_TIERS[0]} minHeight={heights.total}>
        <RootCard totalLessons={totalLessons} year={year} />
      </TierBand>

      <TierBand tier={J_TIERS[1]} minHeight={heights.skill} faded>
        <div style={{ display: 'flex', gap: SKILL_GAP }}>
          {skillLOs.map(s => (
            <SkillCard key={s.ref} s={s} w={SKILL_W} onClick={() => onFocusSkill(s.ref)} />
          ))}
        </div>
      </TierBand>

      <TierBand tier={J_TIERS[2]} minHeight={heights.knowledge}>
        <div style={{ display: 'flex', gap: SKILL_GAP }}>
          {skillLOs.map(s => <StubCard key={s.ref} label="Knowledge LOs" sub="expand" w={SKILL_W} />)}
        </div>
      </TierBand>

      <TierBand tier={J_TIERS[3]} minHeight={heights.daily} last>
        <div style={{ display: 'flex', gap: SKILL_GAP }}>
          {skillLOs.map(s => <StubCard key={s.ref} label={`${s.count} daily lessons`} sub="expand" w={SKILL_W} />)}
        </div>
      </TierBand>

      <Minimap viewport={{ x: 0.04, y: 0.04, w: 0.92, h: 0.92 }} tiers={J_TIERS} />
      <ZoomControls />
    </CascadeCanvas>
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
  const heights = BAND_EXPANDED;
  const ns = skillLOs.length;
  const nk = klos.length;
  const nd = dailyLessons.length;

  const skillRowW  = ns * SKILL_W  + Math.max(0, ns - 1) * SKILL_GAP;
  const kloRowW    = nk * KLO_W   + Math.max(0, nk - 1) * KLO_GAP;
  const dailyRowW  = nd * DAILY_W  + Math.max(0, nd - 1) * DAILY_GAP;

  const focusSkillIdx = skillLOs.findIndex(s => s.ref === focusedSkillRef);
  const focusKIdx     = klos.findIndex(k => k.ref === focusedKRef);

  const totalCx   = TIER_RAIL_W + CW / 2;
  const totalBot  = cardBottom('total', heights, 84);
  const sTop      = cardTop('skill', heights, SKILL_CARD_H);
  const sBot      = cardBottom('skill', heights, SKILL_CARD_H);
  const kTop      = cardTop('knowledge', heights, KLO_CARD_H);
  const kBot      = cardBottom('knowledge', heights, KLO_CARD_H);
  const dailyTop  = bandTop('daily', heights) + 20;

  const sCx = (i: number) => rowX(skillRowW, SKILL_W, SKILL_GAP, i);
  const kCx = (i: number) => rowX(kloRowW, KLO_W, KLO_GAP, i);
  const dCx = (i: number) => rowX(dailyRowW, DAILY_W, DAILY_GAP, i);

  const fSx = focusSkillIdx >= 0 ? sCx(focusSkillIdx) : totalCx;
  const fKx = focusKIdx >= 0 ? kCx(focusKIdx) : totalCx;
  const sSpine = sTop - 16;
  const kSpine = kTop - 16;
  const dSpine = dailyTop - 16;

  const connectors = [
    { d: `M ${totalCx} ${totalBot} L ${totalCx} ${sSpine}`, weight: 2, opacity: 0.5 },
    ns > 1 ? { d: `M ${sCx(0)} ${sSpine} L ${sCx(ns - 1)} ${sSpine}`, weight: 1.5, opacity: 0.35 } : null,
    ...skillLOs.map((_, i) => ({ d: `M ${sCx(i)} ${sSpine} L ${sCx(i)} ${sTop}`, weight: 1.5, opacity: i === focusSkillIdx ? 0.9 : 0.2 })),
    nk > 0 ? { d: `M ${fSx} ${sBot} C ${fSx} ${(sBot + kSpine) / 2}, ${totalCx} ${(sBot + kSpine) / 2}, ${totalCx} ${kSpine}`, weight: 2, color: C.pink, opacity: 0.55 } : null,
    nk > 1 ? { d: `M ${kCx(0)} ${kSpine} L ${kCx(nk - 1)} ${kSpine}`, weight: 1.5, color: C.pink, opacity: 0.3 } : null,
    ...klos.map((_, i) => ({ d: `M ${kCx(i)} ${kSpine} L ${kCx(i)} ${kTop}`, weight: 1.5, color: C.pink, opacity: i === focusKIdx ? 0.9 : 0.25 })),
    nd > 0 && focusKIdx >= 0 ? { d: `M ${fKx} ${kBot} C ${fKx} ${(kBot + dSpine) / 2}, ${totalCx} ${(kBot + dSpine) / 2}, ${totalCx} ${dSpine}`, weight: 2, color: C.teal, opacity: 0.55 } : null,
    nd > 1 && focusKIdx >= 0 ? { d: `M ${dCx(0)} ${dSpine} L ${dCx(nd - 1)} ${dSpine}`, weight: 1.5, color: C.teal, opacity: 0.3 } : null,
    ...dailyLessons.map((_, i) => ({ d: `M ${dCx(i)} ${dSpine} L ${dCx(i)} ${dailyTop}`, weight: 1.5, color: C.teal, opacity: 0.6 })),
  ].filter(Boolean) as { d: string; weight?: number; color?: string; opacity?: number }[];

  const totalHeight = Object.values(heights).reduce((a, b) => a + b, 0);
  const focused = skillLOs.find(s => s.ref === focusedSkillRef);

  return (
    <CascadeCanvas connectors={connectors} totalHeight={totalHeight}>
      <TopChrome label={`${focused?.ref ?? ''} · ${focused?.skill ?? ''}`} badge="expanded" />

      <TierBand tier={J_TIERS[0]} minHeight={heights.total}>
        <RootCard small totalLessons={totalLessons} year={year} />
      </TierBand>

      <TierBand tier={J_TIERS[1]} minHeight={heights.skill} faded>
        <div style={{ display: 'flex', gap: SKILL_GAP }}>
          {skillLOs.map((s, i) => (
            <SkillCard key={s.ref} s={s} w={SKILL_W}
              focused={i === focusSkillIdx} faded={i !== focusSkillIdx}
              onClick={() => onFocusSkill(i === focusSkillIdx ? null : s.ref)}
            />
          ))}
        </div>
      </TierBand>

      <TierBand tier={J_TIERS[2]} minHeight={heights.knowledge}>
        <div style={{ display: 'flex', gap: KLO_GAP }}>
          {klos.map((k, i) => (
            <KloCard key={k.ref} k={k} w={KLO_W}
              focused={i === focusKIdx}
              onClick={() => onFocusKRef(i === focusKIdx ? null : k.ref)}
            />
          ))}
          {klos.length === 0 && <StubCard label="Loading knowledge LOs…" w={KLO_W} />}
        </div>
      </TierBand>

      {/* Daily tier — align to top */}
      <div style={{ position: 'relative', minHeight: heights.daily, display: 'flex', background: 'transparent' }}>
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
        <div style={{ flex: 1, position: 'relative', zIndex: 3, padding: '20px 24px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          {focusedKRef ? (
            <div style={{ display: 'flex', gap: DAILY_GAP, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {dailyLessons.map(l => (
                <DailyChip key={l.id} lesson={l} w={DAILY_W} onClick={() => onLessonClick(l)} />
              ))}
            </div>
          ) : (
            <StubCard label="Select a Knowledge LO above to see daily lessons" w={400} />
          )}
        </div>
      </div>

      <Minimap viewport={{ x: 0.42, y: 0.06, w: 0.16, h: 0.88 }} tiers={J_TIERS} />
      <ZoomControls />
    </CascadeCanvas>
  );
}
