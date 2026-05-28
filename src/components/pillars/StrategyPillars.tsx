'use client';

import { useState } from 'react';

type RAG = 'R' | 'A' | 'G';

interface KPI {
  label: string;
  status: RAG;
}

interface Pillar {
  number: number;
  name: string;
  ceoLever: string;
  tactics: string[];
  kpis: KPI[];
  detail: string;
}

const INITIAL_PILLARS: Pillar[] = [
  {
    number: 1,
    name: 'Revenue Recovery',
    ceoLever: 'Selective price increase of 3–8% across fabric and wallpaper collections, prioritising archive and premium ranges.',
    tactics: [
      'Complete ASP and elasticity analysis by SKU (Q1)',
      'Launch SS25 collection at revised price points',
      'Reactivate 600+ dormant trade accounts via inside-sales',
      'Introduce tiered loyalty incentives for high-value accounts',
    ],
    kpis: [
      { label: 'Trade revenue growth', status: 'A' },
      { label: 'ASP vs prior year', status: 'R' },
      { label: 'Active account count', status: 'R' },
      { label: 'Account churn rate', status: 'A' },
    ],
    detail: 'Revenue recovery is the primary lever to close the EBITDA gap in the near term. The 3–8% price increase alone adds £1.5–2.5m if executed on premium and archive lines with minimal volume impact. Combined with dormant account reactivation (target: 120 accounts in 12 months at £8k avg spend), total revenue uplift could reach £2.5–4m in Year 1.',
  },
  {
    number: 2,
    name: 'Channel Expansion',
    ceoLever: 'Hire two senior A&D specification sales executives and double US wholesale distribution to 24 showroom partners.',
    tactics: [
      'Hire A&D sales leads (NYC + LA) within 90 days',
      'Sign 12 new US wholesale showroom agreements in H1',
      'Pilot DTC subscription sampling programme',
      'Appoint dedicated contract specification coordinator',
    ],
    kpis: [
      { label: 'US revenue', status: 'A' },
      { label: 'A&D pipeline value', status: 'G' },
      { label: 'New wholesale partners', status: 'A' },
      { label: 'Contract wins (£)', status: 'R' },
    ],
    detail: 'Channel expansion targets the two highest-growth vectors: US luxury wholesale (market growing 8% p.a.) and A&D contract specification. US revenue at £5.4m is underpenetrated given brand recognition. The A&D contract channel is currently absent — two senior hires targeting £500k+ specification projects each could add £1.5–2m revenue in Year 1.',
  },
  {
    number: 3,
    name: 'Cost Efficiency',
    ceoLever: 'Exercise Latimer Place lease break in Q2 and consolidate EU legal entities into single subsidiary.',
    tactics: [
      'Serve Latimer Place break notice by 31 March 2025',
      'Complete dilapidations and exit by 30 June 2025',
      'Appoint advisors for FR+DE entity consolidation',
      'Retender logistics and carrier contracts (2 providers)',
    ],
    kpis: [
      { label: 'Property cost (£m)', status: 'A' },
      { label: 'EU overhead (£m)', status: 'G' },
      { label: 'Logistics cost/unit', status: 'A' },
      { label: 'Overhead / revenue %', status: 'R' },
    ],
    detail: 'Cost efficiency removes £1.3–2.1m from the cost base without revenue impact. Latimer Place is the most material action: £1.1m cost for £0.4m revenue equals a deeply negative contribution. The 2025 break clause is a one-time opportunity. EU consolidation (£0.5–0.9m saving) is a 12-month programme requiring legal and HR lead time.',
  },
  {
    number: 4,
    name: 'Operational Excellence',
    ceoLever: 'Redesign management structure to improve IC-to-manager ratio from 1:3 to 1:4.5, releasing £0.8–1.4m in headcount cost.',
    tactics: [
      'Commission management structure review (Q1)',
      'Identify 8–12 voluntary / natural attrition departures',
      'Implement bi-weekly commercial performance cadence',
      'Deploy CRM with account health scoring for 1,840 accounts',
    ],
    kpis: [
      { label: 'Headcount cost (£m)', status: 'R' },
      { label: 'Revenue per head (£k)', status: 'R' },
      { label: 'IC:manager ratio', status: 'A' },
      { label: 'CRM coverage %', status: 'A' },
    ],
    detail: 'Operational excellence addresses structural inefficiencies that suppress productivity. At £180k/head, DG is 15% above sector benchmark. The management-to-IC ratio of 1:3 creates overhead without front-line commercial impact. Restructuring to 1:4.5 removes 8–12 management roles (£0.8–1.4m) while front-line sales headcount is maintained and supplemented by the A&D hires.',
  },
  {
    number: 5,
    name: 'Exit Readiness',
    ceoLever: 'Prepare DG for a premium exit at 8–10× EBITDA multiple (target £40–60m valuation) by Month 24.',
    tactics: [
      'Appoint M&A advisor by Month 18',
      'Commission commercial due diligence preparation pack',
      'Normalise EBITDA reporting for exit (£5–7m run-rate)',
      'Build 5-year financial model for buyer information memorandum',
    ],
    kpis: [
      { label: 'EBITDA run-rate (£m)', status: 'R' },
      { label: 'EBITDA margin %', status: 'R' },
      { label: 'Exit readiness score', status: 'A' },
      { label: 'Months to exit-ready', status: 'A' },
    ],
    detail: 'Exit readiness crystallises the value created by pillars 1–4. A 8–10× EBITDA multiple on £5–7m normalised EBITDA implies a £40–70m enterprise value, versus an estimated current value of £15–20m on negative EBITDA. Strategic buyers (luxury conglomerates, private equity with portfolio brands) will pay premium for a profitable brand with DG\'s heritage and IP. Preparation begins Month 18 to allow 6 months of process.',
  },
];

const RAG_COLOURS: Record<RAG, { bg: string; text: string }> = {
  R: { bg: '#B84A2E', text: '#fff' },
  A: { bg: '#8B6914', text: '#fff' },
  G: { bg: '#1A4A3A', text: '#fff' },
};

export default function StrategyPillars() {
  const [headline, setHeadline] = useState(
    'Maximise EBITDA from -£2m to +£5-7m and position Designers Guild for a premium exit at 8-10× in 24-30 months through revenue recovery, channel expansion, and structural cost efficiency.'
  );
  const [editingHeadline, setEditingHeadline] = useState(false);
  const [pillars, setPillars] = useState<Pillar[]>(INITIAL_PILLARS);
  const [expanded, setExpanded] = useState<number | null>(null);

  const cycleRAG = (pillarIdx: number, kpiIdx: number) => {
    const next: Record<RAG, RAG> = { R: 'A', A: 'G', G: 'R' };
    setPillars(prev => prev.map((p, pi) =>
      pi !== pillarIdx ? p : {
        ...p,
        kpis: p.kpis.map((k, ki) =>
          ki !== kpiIdx ? k : { ...k, status: next[k.status] }
        ),
      }
    ));
  };

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
          Strategy Pillars
        </h1>
        <span style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '2px 6px', borderRadius: 3,
          background: 'var(--color-gold-soft)', color: 'var(--color-gold)',
          fontFamily: 'var(--font-mono)',
        }}>client</span>
      </div>

      {/* Umbrella statement */}
      <div style={{
        background: 'var(--color-accent)', color: '#fff',
        borderRadius: 10, padding: '20px 24px', marginBottom: 28,
        position: 'relative',
      }}>
        {editingHeadline ? (
          <textarea
            autoFocus
            value={headline}
            onChange={e => setHeadline(e.target.value)}
            onBlur={() => setEditingHeadline(false)}
            style={{
              width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 6, color: '#fff', fontSize: 15, fontWeight: 500, lineHeight: 1.6,
              padding: '8px 10px', resize: 'none', outline: 'none', fontFamily: 'inherit',
            }}
            rows={3}
          />
        ) : (
          <p
            style={{ margin: 0, fontSize: 15, fontWeight: 500, lineHeight: 1.6, cursor: 'text' }}
            onClick={() => setEditingHeadline(true)}
            title="Click to edit"
          >
            {headline}
          </p>
        )}
        <div style={{ fontSize: 11, opacity: 0.6, marginTop: 8, fontFamily: 'var(--font-mono)' }}>
          Umbrella strategy — click to edit
        </div>
      </div>

      {/* Pillar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
        {pillars.map((pillar, pi) => (
          <PillarCard
            key={pillar.number}
            pillar={pillar}
            isExpanded={expanded === pillar.number}
            onToggle={() => setExpanded(e => e === pillar.number ? null : pillar.number)}
            onCycleRAG={(ki) => cycleRAG(pi, ki)}
          />
        ))}
      </div>
    </div>
  );
}

function PillarCard({
  pillar, isExpanded, onToggle, onCycleRAG
}: {
  pillar: Pillar;
  isExpanded: boolean;
  onToggle: () => void;
  onCycleRAG: (kpiIdx: number) => void;
}) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 10,
      overflow: 'hidden',
      transition: 'box-shadow 0.15s',
    }}>
      {/* Pillar header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left', padding: '16px 18px', background: 'none', border: 'none',
          display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer',
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'var(--color-accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-mono)',
        }}>
          {pillar.number}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 2 }}>
            {pillar.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
            {pillar.tactics.length} tactics · {pillar.kpis.length} KPIs
          </div>
        </div>
        <span style={{ fontSize: 16, color: 'var(--color-text-tertiary)', transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
      </button>

      {/* CEO lever */}
      <div style={{
        margin: '0 18px 12px',
        borderLeft: '3px solid var(--color-gold)',
        padding: '8px 12px',
        background: 'var(--color-gold-soft)',
        borderRadius: '0 6px 6px 0',
        fontSize: 12,
        color: 'var(--color-gold)',
        fontWeight: 500,
        lineHeight: 1.5,
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>CEO Lever · </span>
        {pillar.ceoLever}
      </div>

      {/* Tactics */}
      <div style={{ padding: '0 18px 12px' }}>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {pillar.tactics.map((t, i) => (
            <li key={i} style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-accent)', marginTop: 2, flexShrink: 0 }}>·</span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* KPIs */}
      <div style={{ padding: '0 18px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {pillar.kpis.map((kpi, ki) => {
          const col = RAG_COLOURS[kpi.status];
          return (
            <button
              key={ki}
              onClick={() => onCycleRAG(ki)}
              title="Click to cycle status"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '3px 8px', borderRadius: 20,
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface-2)',
                cursor: 'pointer',
                fontSize: 11, color: 'var(--color-text-secondary)',
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: col.bg, flexShrink: 0,
              }} />
              {kpi.label}
            </button>
          );
        })}
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div style={{
          borderTop: '1px solid var(--color-border)',
          padding: '14px 18px',
          fontSize: 13,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          background: 'var(--color-surface-2)',
        }}>
          {pillar.detail}
        </div>
      )}
    </div>
  );
}
