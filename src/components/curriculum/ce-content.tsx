'use client';

import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import {
  CeLeftPanel, NavRow, Chip, Label, HiBtn,
  TierBand, CascadeCanvas, ZoomControls, Minimap, TopChrome,
  SKILL_COLOR, skillKey, TIER_RAIL_W,
  type TierDef,
} from './ce-shell';
import type { CurriculumLesson } from '@/types/curriculum';

export interface ThemeData  { theme: string; count: number }
export interface SkillData  { skill: string; skillKey: string; count: number; pct: number }

const C_TIERS: TierDef[] = [
  { id: 'total',  label: 'Total',   sub: 'Year English',          accent: '#8E1F49' },
  { id: 'skill',  label: 'Skill',   sub: '5 linguistic skills',   accent: C.pink },
  { id: 'theme',  label: 'Theme',   sub: '~4 themes per skill',   accent: C.amber },
  { id: 'lesson', label: 'Lesson',  sub: 'Lessons that cover it', accent: C.faint },
];

const BAND_COLLAPSED = { total: 140, skill: 178, theme: 130, lesson: 134 };
const BAND_EXPANDED  = { total: 120, skill: 168, theme: 138, lesson: 224 };

const SKILL_CARD_H  = 132;
const THEME_CARD_H  = 92;
const LESSON_CARD_H = 168;

const CW = 840;
const SKILL_W = 142;   const SKILL_GAP = 12;
const THEME_W = 168;   const THEME_GAP = 12;
const LESSON_W = 240;  const LESSON_GAP = 14;

function rowX(rowW: number, cardW: number, gap: number, i: number) {
  const startX = TIER_RAIL_W + (CW - rowW) / 2;
  return startX + i * (cardW + gap) + cardW / 2;
}
function bandTop(id: string, h: Record<string, number>) {
  const order = ['total', 'skill', 'theme', 'lesson'];
  let y = 0; for (const k of order) { if (k === id) return y; y += h[k]; } return y;
}
function cardTop(id: string, h: Record<string, number>, ch: number) { return bandTop(id, h) + (h[id] - ch) / 2; }
function cardBottom(id: string, h: Record<string, number>, ch: number) { return cardTop(id, h, ch) + ch; }

// ── Cards ─────────────────────────────────────────────────────────────────────

function TotalCard({ small, totalLessons, year }: { small?: boolean; totalLessons: number; year: number }) {
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
        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px', borderRadius: 999,
        background: 'rgba(255,255,255,0.18)', fontFamily: SANS, fontSize: 10, fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff',
      }}>
        <Icon name="book" size={11} color="#fff" /> Year {year} · English
      </div>
      <p style={{ fontFamily: SANS, fontSize: small ? 13 : 14.5, color: '#fff', marginTop: 6, lineHeight: 1.4, fontWeight: 600, letterSpacing: '-0.005em' }}>
        Year {year} English — {totalLessons} lessons across 20 weeks.
      </p>
    </div>
  );
}

function SkillCardC({ s, focused, faded, w, onClick }: { s: SkillData; focused?: boolean; faded?: boolean; w: number; onClick: () => void }) {
  const col = SKILL_COLOR[s.skillKey] ?? SKILL_COLOR.basic;
  return (
    <div onClick={onClick} style={{
      width: w, height: SKILL_CARD_H, background: C.surface,
      border: `1px solid ${focused ? C.pinkBorder : C.border}`,
      borderTop: `4px solid ${col.line}`,
      borderRadius: 12, padding: 10, opacity: faded ? 0.5 : 1,
      boxShadow: focused ? `0 0 0 3px ${C.pinkSoft},0 6px 18px rgba(56,30,30,0.06)` : '0 1px 0 rgba(56,30,30,0.02)',
      display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: col.bg, color: col.fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="book" size={12} color={col.fg} />
        </div>
        <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: C.ink }}>{col.label}</span>
      </div>
      <span style={{ fontFamily: SANS, fontSize: 10.5, color: C.faint, display: 'block', marginTop: 8, lineHeight: 1.4, flex: 1 }}>
        {s.pct}% of Year {/* themes count not in SkillData */} lessons this year.
      </span>
      <div style={{ paddingTop: 6, borderTop: `1px dashed ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint }}>{s.count} lessons</span>
        {focused
          ? <Chip tone="pink" size="sm" style={{ height: 16, fontSize: 9.5 }}>Focus</Chip>
          : <Icon name="chevronDown" size={11} color={C.faint2} />
        }
      </div>
    </div>
  );
}

function ThemeCardC({ theme, count, focused, faded, w, onClick }: { theme: string; count: number; focused?: boolean; faded?: boolean; w: number; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{
      width: w, height: THEME_CARD_H,
      background: C.amberSoft, border: `1px solid ${focused ? '#E8A636' : '#EFD9A5'}`,
      borderRadius: 12, padding: '10px 12px', opacity: faded ? 0.45 : 1,
      boxShadow: focused ? '0 0 0 3px rgba(232,166,54,0.18)' : 'none',
      display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 700, color: '#7A5A11', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Theme</span>
        {focused && <span style={{ fontFamily: SANS, fontSize: 9, color: '#7A5A11', fontWeight: 700, textTransform: 'uppercase' }}>· Focus</span>}
      </div>
      <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: C.ink, marginTop: 4 }}>{theme}</span>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint }}>{count} lessons</span>
    </div>
  );
}

function LessonCardC({ lesson, hover, w, onClick }: { lesson: CurriculumLesson; hover?: boolean; w: number; onClick: () => void }) {
  const col = SKILL_COLOR[skillKey(lesson.linguisticSkill)];
  return (
    <div onClick={onClick} style={{
      width: w, height: LESSON_CARD_H, background: C.surface,
      border: `1px solid ${hover ? C.pinkBorder : C.border}`,
      borderRadius: 12, padding: 12,
      boxShadow: hover ? `0 0 0 3px ${C.pinkSoft},0 8px 24px rgba(56,30,30,0.08)` : '0 1px 0 rgba(56,30,30,0.02)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', gap: 6,
      zIndex: hover ? 5 : 2, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: C.faint, fontVariantNumeric: 'tabular-nums' }}>{lesson.id}</span>
        <Chip tone="neutral" size="sm">{lesson.month} · Wk{lesson.week} · P{lesson.periodNum}</Chip>
        <div style={{ flex: 1 }} />
      </div>
      <div>
        <Label style={{ display: 'block', marginBottom: 3 }}>Daily LO</Label>
        <span style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 500, color: C.ink, lineHeight: 1.4, display: 'block' }}>{lesson.dailyLO}</span>
      </div>
      <div style={{ flex: 1 }} />
      {(lesson.grammarFocus || lesson.vocabFocus) && (
        <span style={{ fontFamily: SANS, fontSize: 10.5, color: C.faint, lineHeight: 1.4 }}>
          <span style={{ fontWeight: 600 }}>Vocab/Grammar</span> — {lesson.grammarFocus || lesson.vocabFocus}
        </span>
      )}
      <div style={{ paddingTop: 8, borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
        <HiBtn variant="ghost" size="sm">Preview</HiBtn>
        <div style={{ flex: 1 }} />
        <HiBtn variant="primary" size="sm" icon={<Icon name="arrowRight" size={12} color="#fff" />} onClick={onClick}>Open</HiBtn>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: col.line }} />
    </div>
  );
}

function StubCard({ label, sub, w }: { label: string; sub?: string; w: number }) {
  return (
    <div style={{ width: w, background: 'rgba(255,255,255,0.5)', border: `1px dashed ${C.faint2}`, borderRadius: 8, padding: '6px 10px', textAlign: 'center' }}>
      <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint, display: 'block' }}>{label}</span>
      {sub && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 3, padding: '1px 7px', borderRadius: 999, background: C.cream, border: `1px solid ${C.borderSoft}`, fontFamily: SANS, fontSize: 9.5, fontWeight: 600, color: C.faint }}>
          <Icon name="chevronDown" size={9} color={C.faint} /> {sub}
        </div>
      )}
    </div>
  );
}

// ── Left navigator ────────────────────────────────────────────────────────────

interface ContentLeftProps {
  year: number;
  totalLessons: number;
  skillBreakdown: SkillData[];
  themes: ThemeData[];
  focusedSkill: string | null;
  focusedTheme: string | null;
  themesBySkill: Map<string, ThemeData[]>;
  onFocusSkill: (s: string | null) => void;
  onFocusTheme: (t: string | null) => void;
}

export function ContentLeft({
  year, totalLessons, skillBreakdown, themes,
  focusedSkill, focusedTheme, themesBySkill,
  onFocusSkill, onFocusTheme,
}: ContentLeftProps) {
  return (
    <CeLeftPanel
      title="Content hierarchy"
      sublabel="Total → Skill → Theme"
      footerHint="Content is organised by skill and theme — independent of when it appears in the year."
    >
      {/* Total row */}
      <div style={{ margin: '6px 12px 8px', padding: '8px 10px', borderRadius: 8, background: `linear-gradient(135deg, ${C.pink}, #8E1F49)`, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="book" size={12} color="#fff" />
        <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', flex: 1 }}>Year {year} · English</span>
        <span style={{ fontFamily: SANS, fontSize: 10, color: '#fff', opacity: 0.7 }}>{totalLessons}</span>
      </div>

      <div style={{ padding: '2px 16px 4px' }}>
        <span style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Skills · {skillBreakdown.length}
        </span>
      </div>

      {skillBreakdown.map(s => {
        const isFocus = s.skill === focusedSkill;
        const col = SKILL_COLOR[s.skillKey] ?? SKILL_COLOR.basic;
        const skillThemes = themesBySkill.get(s.skill) ?? themes;
        return (
          <div key={s.skill}>
            <NavRow depth={0} label={col.label} count={s.count} active={isFocus} expanded={isFocus} onClick={() => onFocusSkill(isFocus ? null : s.skill)} />
            {isFocus && (
              <>
                <div style={{ padding: '4px 16px 2px 36px' }}>
                  <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 700, color: C.amber, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Themes · {skillThemes.length}
                  </span>
                </div>
                {skillThemes.map(t => (
                  <NavRow
                    key={t.theme}
                    depth={1}
                    label={t.theme}
                    count={t.count}
                    active={focusedTheme === t.theme}
                    leaf={focusedTheme !== t.theme}
                    dot={C.amber}
                    onClick={() => onFocusTheme(focusedTheme === t.theme ? null : t.theme)}
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

// ── Collapsed cascade (Content A) ─────────────────────────────────────────────

export function ContentCascadeCollapsed({ skillBreakdown, totalLessons, year, onFocusSkill }: {
  skillBreakdown: SkillData[]; totalLessons: number; year: number; onFocusSkill: (s: string) => void;
}) {
  const h = BAND_COLLAPSED;
  const n = skillBreakdown.length;
  const skillRowW = n * SKILL_W + Math.max(0, n - 1) * SKILL_GAP;
  const totalHeight = Object.values(h).reduce((a, b) => a + b, 0);
  const totalCx = TIER_RAIL_W + CW / 2;
  const totalBot = cardBottom('total', h, 84);
  const sTop = cardTop('skill', h, SKILL_CARD_H);
  const sBot = cardBottom('skill', h, SKILL_CARD_H);
  const tStubTop = bandTop('theme', h) + 18;
  const tStubBot = bandTop('theme', h) + h.theme - 18;
  const lStubTop = bandTop('lesson', h) + 18;
  const sCx = (i: number) => rowX(skillRowW, SKILL_W, SKILL_GAP, i);
  const spineY = sTop - 18;

  const connectors = [
    { d: `M ${totalCx} ${totalBot} L ${totalCx} ${spineY}`, weight: 2, opacity: 0.5 },
    n > 1 ? { d: `M ${sCx(0)} ${spineY} L ${sCx(n - 1)} ${spineY}`, weight: 1.5, opacity: 0.4 } : null,
    ...skillBreakdown.map((_, i) => ({ d: `M ${sCx(i)} ${spineY} L ${sCx(i)} ${sTop}`, weight: 1.5, opacity: 0.5 })),
    ...skillBreakdown.map((_, i) => ({ d: `M ${sCx(i)} ${sBot} L ${sCx(i)} ${tStubTop}`, weight: 1, opacity: 0.3, dashed: true })),
    ...skillBreakdown.map((_, i) => ({ d: `M ${sCx(i)} ${tStubBot} L ${sCx(i)} ${lStubTop}`, weight: 1, opacity: 0.25, dashed: true })),
  ].filter(Boolean) as { d: string; weight: number; opacity: number; dashed?: boolean }[];

  return (
    <CascadeCanvas connectors={connectors} totalHeight={totalHeight}>
      <TopChrome label="Content tree · all branches collapsed" badge="click a skill to expand" />

      <TierBand tier={C_TIERS[0]} minHeight={h.total}>
        <TotalCard totalLessons={totalLessons} year={year} />
      </TierBand>

      <TierBand tier={C_TIERS[1]} minHeight={h.skill} faded>
        <div style={{ display: 'flex', gap: SKILL_GAP }}>
          {skillBreakdown.map(s => <SkillCardC key={s.skill} s={s} w={SKILL_W} onClick={() => onFocusSkill(s.skill)} />)}
        </div>
      </TierBand>

      <TierBand tier={C_TIERS[2]} minHeight={h.theme}>
        <div style={{ display: 'flex', gap: SKILL_GAP }}>
          {skillBreakdown.map(s => <StubCard key={s.skill} label={`themes`} sub="expand" w={SKILL_W} />)}
        </div>
      </TierBand>

      <TierBand tier={C_TIERS[3]} minHeight={h.lesson} last>
        <div style={{ display: 'flex', gap: SKILL_GAP }}>
          {skillBreakdown.map(s => <StubCard key={s.skill} label={`${s.count} lessons`} sub="expand" w={SKILL_W} />)}
        </div>
      </TierBand>

      <Minimap viewport={{ x: 0.04, y: 0.04, w: 0.92, h: 0.92 }} tiers={C_TIERS} />
      <ZoomControls />
    </CascadeCanvas>
  );
}

// ── Expanded cascade (Content B) ─────────────────────────────────────────────

export function ContentCascadeExpanded({ skillBreakdown, themes, lessons, focusedSkill, focusedTheme, totalLessons, year, onFocusSkill, onFocusTheme, onLessonClick }: {
  skillBreakdown: SkillData[];
  themes: ThemeData[];
  lessons: CurriculumLesson[];
  focusedSkill: string;
  focusedTheme: string | null;
  totalLessons: number;
  year: number;
  onFocusSkill: (s: string | null) => void;
  onFocusTheme: (t: string | null) => void;
  onLessonClick: (l: CurriculumLesson) => void;
}) {
  const h = BAND_EXPANDED;
  const ns = skillBreakdown.length;
  const nt = themes.length;
  const nl = lessons.length;

  const skillRowW  = ns * SKILL_W  + Math.max(0, ns - 1) * SKILL_GAP;
  const themeRowW  = nt * THEME_W  + Math.max(0, nt - 1) * THEME_GAP;
  const lessonRowW = nl * LESSON_W + Math.max(0, nl - 1) * LESSON_GAP;

  const focusSkillIdx = skillBreakdown.findIndex(s => s.skill === focusedSkill);
  const focusThemeIdx = themes.findIndex(t => t.theme === focusedTheme);

  const totalCx  = TIER_RAIL_W + CW / 2;
  const totalBot = cardBottom('total', h, 84);
  const sTop     = cardTop('skill', h, SKILL_CARD_H);
  const sBot     = cardBottom('skill', h, SKILL_CARD_H);
  const tTop     = cardTop('theme', h, THEME_CARD_H);
  const tBot     = cardBottom('theme', h, THEME_CARD_H);
  const lessonTop = bandTop('lesson', h) + 20;

  const sCx = (i: number) => rowX(skillRowW, SKILL_W, SKILL_GAP, i);
  const tCx = (i: number) => rowX(themeRowW, THEME_W, THEME_GAP, i);
  const lCx = (i: number) => rowX(lessonRowW, LESSON_W, LESSON_GAP, i);

  const fSx = focusSkillIdx >= 0 ? sCx(focusSkillIdx) : totalCx;
  const fTx = focusThemeIdx >= 0 ? tCx(focusThemeIdx) : totalCx;
  const sSpine = sTop - 16;
  const tSpine = tTop - 16;
  const lSpine = lessonTop - 16;

  const connectors = [
    { d: `M ${totalCx} ${totalBot} L ${totalCx} ${sSpine}`, weight: 2, opacity: 0.5 },
    ns > 1 ? { d: `M ${sCx(0)} ${sSpine} L ${sCx(ns - 1)} ${sSpine}`, weight: 1.5, opacity: 0.35 } : null,
    ...skillBreakdown.map((_, i) => ({ d: `M ${sCx(i)} ${sSpine} L ${sCx(i)} ${sTop}`, weight: 1.5, opacity: i === focusSkillIdx ? 0.9 : 0.2 })),
    nt > 0 ? { d: `M ${fSx} ${sBot} C ${fSx} ${(sBot + tSpine) / 2}, ${totalCx} ${(sBot + tSpine) / 2}, ${totalCx} ${tSpine}`, weight: 2, color: C.pink, opacity: 0.55 } : null,
    nt > 1 ? { d: `M ${tCx(0)} ${tSpine} L ${tCx(nt - 1)} ${tSpine}`, weight: 1.5, color: C.pink, opacity: 0.3 } : null,
    ...themes.map((_, i) => ({ d: `M ${tCx(i)} ${tSpine} L ${tCx(i)} ${tTop}`, weight: 1.5, color: C.pink, opacity: i === focusThemeIdx ? 0.9 : 0.25 })),
    nl > 0 && focusThemeIdx >= 0 ? { d: `M ${fTx} ${tBot} C ${fTx} ${(tBot + lSpine) / 2}, ${totalCx} ${(tBot + lSpine) / 2}, ${totalCx} ${lSpine}`, weight: 2, color: C.teal, opacity: 0.55 } : null,
    nl > 1 && focusThemeIdx >= 0 ? { d: `M ${lCx(0)} ${lSpine} L ${lCx(nl - 1)} ${lSpine}`, weight: 1.5, color: C.teal, opacity: 0.3 } : null,
    ...lessons.map((_, i) => ({ d: `M ${lCx(i)} ${lSpine} L ${lCx(i)} ${lessonTop}`, weight: 1.5, color: C.teal, opacity: 0.5 })),
  ].filter(Boolean) as { d: string; weight?: number; color?: string; opacity?: number }[];

  const totalH = Object.values(h).reduce((a, b) => a + b, 0);
  const focused = skillBreakdown.find(s => s.skill === focusedSkill);
  const col = focused ? (SKILL_COLOR[focused.skillKey] ?? SKILL_COLOR.basic) : SKILL_COLOR.basic;

  return (
    <CascadeCanvas connectors={connectors} totalHeight={totalH}>
      <TopChrome label={`${col.label}${focusedTheme ? ` → ${focusedTheme}` : ''}`} badge="expanded" />

      <TierBand tier={C_TIERS[0]} minHeight={h.total}>
        <TotalCard small totalLessons={totalLessons} year={year} />
      </TierBand>

      <TierBand tier={C_TIERS[1]} minHeight={h.skill} faded>
        <div style={{ display: 'flex', gap: SKILL_GAP }}>
          {skillBreakdown.map((s, i) => (
            <SkillCardC key={s.skill} s={s} w={SKILL_W}
              focused={i === focusSkillIdx} faded={i !== focusSkillIdx}
              onClick={() => onFocusSkill(i === focusSkillIdx ? null : s.skill)}
            />
          ))}
        </div>
      </TierBand>

      <TierBand tier={C_TIERS[2]} minHeight={h.theme}>
        <div style={{ display: 'flex', gap: THEME_GAP }}>
          {themes.map((t, i) => (
            <ThemeCardC key={t.theme} theme={t.theme} count={t.count} w={THEME_W}
              focused={i === focusThemeIdx}
              onClick={() => onFocusTheme(i === focusThemeIdx ? null : t.theme)}
            />
          ))}
        </div>
      </TierBand>

      {/* Lesson tier */}
      <div style={{ position: 'relative', minHeight: h.lesson, display: 'flex', background: 'transparent' }}>
        <div style={{ width: TIER_RAIL_W, flexShrink: 0, padding: '14px 12px 14px 16px', display: 'flex', flexDirection: 'column', gap: 4, borderRight: `1px dashed ${C.borderSoft}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 3, height: 14, borderRadius: 2, background: C_TIERS[3].accent }} />
            <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.1, color: C.ink }}>Lesson</span>
          </div>
          <span style={{ fontFamily: SANS, fontSize: 10, color: C.faint, lineHeight: 1.4 }}>Lessons that cover it</span>
        </div>
        <div style={{ flex: 1, position: 'relative', zIndex: 3, padding: '20px 24px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          {focusedTheme ? (
            <div style={{ display: 'flex', gap: LESSON_GAP, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {lessons.map(l => (
                <LessonCardC key={l.id} lesson={l} w={LESSON_W} onClick={() => onLessonClick(l)} />
              ))}
            </div>
          ) : (
            <StubCard label="Select a theme above to see lessons" w={400} />
          )}
        </div>
      </div>

      <Minimap viewport={{ x: 0.42, y: 0.06, w: 0.16, h: 0.88 }} tiers={C_TIERS} />
      <ZoomControls />
    </CascadeCanvas>
  );
}
