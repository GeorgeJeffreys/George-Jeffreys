'use client';

import { C, SANS } from '@/lib/tokens';
import { SKILL_COLOR } from './ce-calendar';
import type { SkillData, ThemeData } from './ce-content';

const LABEL: React.CSSProperties = {
  fontFamily: SANS, fontSize: 10, fontWeight: 700,
  color: C.faint2, textTransform: 'uppercase', letterSpacing: '0.08em',
  marginBottom: 10,
};

const STAT: React.CSSProperties = {
  fontFamily: SANS, fontSize: 24, fontWeight: 700, color: C.ink, lineHeight: 1,
};

interface CeSidebarProps {
  totalLessons: number;
  totalWeeks: number;
  skillBreakdown: SkillData[];
  themes: ThemeData[];
}

export function CeSidebar({ totalLessons, totalWeeks, skillBreakdown, themes }: CeSidebarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Summary stats */}
      <div>
        <div style={LABEL}>Year Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <StatCard label="Lessons" value={totalLessons} />
          <StatCard label="Weeks" value={totalWeeks} />
        </div>
      </div>

      {/* Skill breakdown */}
      <div>
        <div style={LABEL}>Linguistic Skills</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {skillBreakdown.map(s => {
            const col = SKILL_COLOR[s.skillKey];
            return (
              <div key={s.skill}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontFamily: SANS, fontSize: 11.5, color: C.ink, fontWeight: 500 }}>
                    {col.label}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: 11, color: C.faint2 }}>
                    {s.count} · {s.pct}%
                  </span>
                </div>
                <div style={{
                  height: 5, background: C.cream, borderRadius: 999, overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', borderRadius: 999,
                    background: col.fg,
                    width: `${s.pct}%`,
                    transition: 'width 0.3s ease',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top themes */}
      <div>
        <div style={LABEL}>Themes</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {themes.slice(0, 8).map(t => (
            <div key={t.theme} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '4px 8px', borderRadius: 6,
              background: C.cream,
            }}>
              <span style={{
                fontFamily: SANS, fontSize: 11.5, color: C.ink,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                flex: 1, marginRight: 6,
              }}>
                {t.theme}
              </span>
              <span style={{
                fontFamily: SANS, fontSize: 10.5, color: C.faint2,
                background: C.surface, border: `1px solid ${C.borderSoft}`,
                padding: '1px 5px', borderRadius: 4, flexShrink: 0,
              }}>
                {t.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={{
      padding: '10px 12px',
      background: C.cream,
      border: `1px solid ${C.borderSoft}`,
      borderRadius: 8,
    }}>
      <div style={STAT}>{value}</div>
      <div style={{ fontFamily: SANS, fontSize: 10.5, color: C.faint, marginTop: 3 }}>{label}</div>
    </div>
  );
}
