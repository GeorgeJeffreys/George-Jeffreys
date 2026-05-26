'use client';

import { useState } from 'react';
import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import { useDraggable } from '@dnd-kit/core';

export interface LibraryCard {
  id: string;
  type: string;
  tone: 'pink' | 'amber' | 'teal';
  skill: string;
  level: string;
  preview: string;
  minutes: number;
  isNew?: boolean;
}

const CARDS: LibraryCard[] = [
  { id: 'fb-wh',      type: 'Fill in the blank', tone: 'pink',  skill: 'Wh-questions',    level: 'A1',  preview: 'What ___ your name?\nMy ___ is Layla.\nHow ___ are you?', minutes: 8, isNew: true },
  { id: 'match-fam',  type: 'Matching',          tone: 'amber', skill: 'Vocab · family',  level: 'A1',  preview: 'mother · father · sister · brother → 4 family photographs', minutes: 10 },
  { id: 'dialogue',   type: 'Dialogue',           tone: 'teal',  skill: 'Speaking · intros', level: 'A1', preview: "A: Hello! What's your name?\nB: ___\nA: How old are you?", minutes: 6 },
  { id: 'wordsearch', type: 'Word search',        tone: 'pink',  skill: 'Greetings vocab', level: 'A1',  preview: '8×8 grid: hello · hi · bye · name · age · meet', minutes: 5 },
  { id: 'sentord',    type: 'Sentence order',     tone: 'amber', skill: 'Syntax',          level: 'A1',  preview: 'name / is / What / your / ? → ____________?', minutes: 4 },
  { id: 'picture',    type: 'Picture prompt',     tone: 'teal',  skill: 'Production',      level: 'A1+', preview: '4 family scenes. Write 2 sentences for each.', minutes: 12 },
];

const CATS = ['All 124', 'Speaking 32', 'Writing 41', 'Reading 28', 'Vocab 23'];

function Chip({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: 20, padding: '0 7px',
      fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
      color: active ? C.pink : C.ink,
      background: active ? C.pinkSoft : C.cream,
      border: `1px solid ${active ? C.pinkBorder : C.borderSoft}`,
      borderRadius: 999, whiteSpace: 'nowrap', cursor: 'pointer',
    }}>{children}</span>
  );
}

function ToneChip({ tone, label, isNew }: { tone: 'pink'|'amber'|'teal'; label: string; isNew?: boolean }) {
  const tones = {
    pink:  { bg: C.pinkSoft,  fg: C.pink,     br: C.pinkBorder },
    amber: { bg: C.amberSoft, fg: '#7A5A11',  br: '#EFD9A5' },
    teal:  { bg: C.tealSoft,  fg: C.teal,     br: '#BCDED6' },
  };
  const t = tones[tone];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{
        height: 20, padding: '0 7px',
        fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
        color: t.fg, background: t.bg, border: `1px solid ${t.br}`,
        borderRadius: 999, display: 'inline-flex', alignItems: 'center',
      }}>{label}</span>
      {isNew && (
        <span style={{
          height: 20, padding: '0 7px',
          fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
          color: '#fff', background: C.pink, border: `1px solid ${C.pink}`,
          borderRadius: 999, display: 'inline-flex', alignItems: 'center',
        }}>New</span>
      )}
    </div>
  );
}

function DraggableCard({ card, isDragging }: { card: LibraryCard; isDragging: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: card.id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 12,
        display: 'flex', flexDirection: 'column', gap: 8,
        cursor: 'grab',
        opacity: isDragging ? 0.35 : 1,
        transform: transform ? `translate3d(${transform.x}px,${transform.y}px,0)` : undefined,
        transition: isDragging ? 'none' : 'opacity 0.15s',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <ToneChip tone={card.tone} label={card.type} isNew={card.isNew} />
        <div style={{ flex: 1 }} />
        <Icon name="grip" size={14} color={C.faint2} />
      </div>
      <div>
        <div style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: C.ink }}>{card.skill}</div>
        <div style={{ fontFamily: SANS, fontSize: 11, color: C.faint }}>Level {card.level} · ~{card.minutes} min</div>
      </div>
      <div style={{
        background: C.cream,
        border: `1px solid ${C.borderSoft}`,
        borderRadius: 8, padding: 8,
        fontFamily: SANS, fontSize: 11.5, color: C.faint,
        lineHeight: 1.4, whiteSpace: 'pre-line', minHeight: 56,
      }}>{card.preview}</div>
    </div>
  );
}

interface LibraryPanelProps {
  draggingId: string | null;
  activeTab: 'library' | 'ai';
  onTabChange: (tab: 'library' | 'ai') => void;
}

export function LibraryPanel({ draggingId, activeTab, onTabChange }: LibraryPanelProps) {
  const [activeCat, setActiveCat] = useState(0);
  const [query, setQuery] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 14, padding: '16px 18px' }}>
      {/* Tab switcher */}
      <RightTabs active={activeTab} onChange={onTabChange} />

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: 36, padding: '0 12px',
        background: C.surface,
        border: `1px solid ${C.border}`, borderRadius: 8,
      }}>
        <Icon name="search" size={15} color={C.faint2} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search exercises, skills, themes…"
          style={{
            flex: 1, border: 'none', outline: 'none',
            fontFamily: SANS, fontSize: 13, color: C.ink,
            background: 'transparent',
          }}
        />
        <span style={{
          height: 20, padding: '0 7px',
          fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
          color: C.ink, background: C.cream,
          border: `1px solid ${C.borderSoft}`, borderRadius: 999,
        }}>⌘K</span>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {CATS.map((c, i) => (
          <div key={c} onClick={() => setActiveCat(i)} style={{ cursor: 'pointer' }}>
            <Chip active={i === activeCat}>{c}</Chip>
          </div>
        ))}
      </div>

      {/* Card grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        overflow: 'auto', flex: 1, paddingRight: 2,
        alignContent: 'start',
      }}>
        {CARDS.map((c) => (
          <DraggableCard key={c.id} card={c} isDragging={draggingId === c.id} />
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: 10, background: C.cream, borderRadius: 10,
        display: 'flex', alignItems: 'center', gap: 8,
        flexShrink: 0,
      }}>
        <Icon name="sparkle" size={14} color={C.pink} />
        <span style={{ fontFamily: SANS, fontSize: 11.5, color: C.faint }}>Can&apos;t find what you need?</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => onTabChange('ai')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            height: 28, padding: '0 10px',
            fontFamily: SANS, fontSize: 12, fontWeight: 500,
            background: 'transparent', color: C.ink,
            border: `1px solid ${C.border}`, borderRadius: 8,
          }}
        >Ask AI to make one</button>
      </div>
    </div>
  );
}

export function RightTabs({ active, onChange }: { active: 'library'|'ai'; onChange: (t: 'library'|'ai') => void }) {
  const tabs: Array<{ id: 'library'|'ai'; label: string; icon: 'book'|'sparkle' }> = [
    { id: 'library', label: 'Library',      icon: 'book'    },
    { id: 'ai',      label: 'AI Assistant', icon: 'sparkle' },
  ];
  return (
    <div style={{ display: 'flex', padding: 4, background: C.cream, borderRadius: 10, gap: 2 }}>
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            height: 32, border: 'none', borderRadius: 7,
            background: isActive ? C.surface : 'transparent',
            boxShadow: isActive ? `0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px ${C.border}` : 'none',
            color: isActive ? C.ink : C.faint,
            fontFamily: SANS, fontSize: 12.5, fontWeight: isActive ? 600 : 500,
          }}>
            <Icon name={t.icon} size={13} color={isActive ? C.pink : C.faint2} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
