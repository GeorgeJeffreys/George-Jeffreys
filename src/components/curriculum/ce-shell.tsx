'use client';

import Link from 'next/link';
import { C, SANS, SCRIPT } from '@/lib/tokens';
import { Icon } from '@/components/icon';

export type CeMode = 'calendar' | 'journey' | 'content';

const YEAR_OPTIONS = [0, 1, 2, 3, 4, 5, 6];

interface CeTopBarProps {
  year: number;
  search: string;
  onYearChange: (y: number) => void;
  onSearchChange: (s: string) => void;
}

export function CeTopBar({ year, search, onYearChange, onSearchChange }: CeTopBarProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      height: 60, padding: '0 24px', flexShrink: 0,
      background: C.surface, borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        fontFamily: SCRIPT, fontSize: 30, color: C.pink,
        lineHeight: 1, letterSpacing: '-0.01em',
        display: 'inline-flex', alignItems: 'baseline', gap: 2,
      }}>
        Alsama
        <svg width={15} height={12} viewBox="0 0 20 16" fill="none" style={{ marginLeft: 2, marginBottom: 2 }}>
          <path d="M2 8 C2 4, 6 2, 8 6 C10 2, 14 4, 14 8 C14 11, 10 12, 8 9 C6 12, 2 11, 2 8 Z" fill={C.pink} opacity="0.85"/>
          <circle cx="16" cy="6" r="0.9" fill={C.pink}/>
          <circle cx="17.5" cy="9" r="0.7" fill={C.pink}/>
          <circle cx="18.5" cy="11.5" r="0.5" fill={C.pink}/>
        </svg>
      </div>

      <div style={{ width: 1, height: 24, background: C.border, margin: '0 4px' }} />

      <Link href="/plan/new" style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontFamily: SANS, fontSize: 12, fontWeight: 500, color: C.faint,
        textDecoration: 'none',
      }}>
        <Icon name="chevronLeft" size={13} color={C.faint} />
        Lesson Planner
      </Link>

      <div style={{ width: 1, height: 20, background: C.border, margin: '0 4px' }} />
      <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: C.ink }}>
        Curriculum Explorer
      </span>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        height: 34, padding: '0 10px',
        background: C.cream, border: `1px solid ${C.borderSoft}`,
        borderRadius: 8, width: 220,
      }}>
        <Icon name="search" size={13} color={C.faint2} />
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search lessons…"
          style={{
            flex: 1, border: 'none', outline: 'none',
            background: 'transparent',
            fontFamily: SANS, fontSize: 12, color: C.ink,
          }}
        />
      </div>

      {/* Year selector */}
      <select
        value={year}
        onChange={e => onYearChange(Number(e.target.value))}
        style={{
          height: 34, padding: '0 10px',
          fontFamily: SANS, fontSize: 12, fontWeight: 500,
          color: C.ink, background: C.surface,
          border: `1px solid ${C.border}`, borderRadius: 8,
          cursor: 'pointer', outline: 'none',
        }}
      >
        {YEAR_OPTIONS.map(y => (
          <option key={y} value={y}>Year {y}</option>
        ))}
      </select>
    </div>
  );
}

interface CeModeTabsProps {
  mode: CeMode;
  onModeChange: (m: CeMode) => void;
}

const MODES: { id: CeMode; label: string; icon: 'calendar' | 'target' | 'book' }[] = [
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'journey',  label: 'Journey',  icon: 'target' },
  { id: 'content',  label: 'Content',  icon: 'book' },
];

export function CeModeTabs({ mode, onModeChange }: CeModeTabsProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 0,
      height: 52, padding: '0 24px',
      background: C.surface,
      borderBottom: `1px solid ${C.border}`,
      flexShrink: 0,
    }}>
      {MODES.map(m => {
        const active = m.id === mode;
        return (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 52, padding: '0 18px',
              fontFamily: SANS, fontSize: 13, fontWeight: active ? 600 : 400,
              color: active ? C.pink : C.faint,
              background: 'none', border: 'none',
              borderBottom: active ? `2px solid ${C.pink}` : '2px solid transparent',
              cursor: 'pointer',
              transition: 'color 0.12s',
              marginBottom: -1,
            }}
          >
            <Icon name={m.icon} size={14} color={active ? C.pink : C.faint} />
            {m.label}
          </button>
        );
      })}
    </div>
  );
}

interface CeLeftPanelProps {
  children: React.ReactNode;
}

export function CeLeftPanel({ children }: CeLeftPanelProps) {
  return (
    <div style={{
      width: 256, flexShrink: 0,
      background: C.cream,
      borderRight: `1px solid ${C.border}`,
      overflowY: 'auto',
    }}>
      {children}
    </div>
  );
}

interface CeRightSidebarProps {
  children: React.ReactNode;
}

export function CeRightSidebar({ children }: CeRightSidebarProps) {
  return (
    <div style={{
      width: 296, flexShrink: 0,
      background: C.surface,
      borderLeft: `1px solid ${C.border}`,
      overflowY: 'auto',
      padding: '20px 18px',
    }}>
      {children}
    </div>
  );
}

interface CeShellProps {
  topBar: React.ReactNode;
  modeTabs: React.ReactNode;
  leftPanel: React.ReactNode;
  main: React.ReactNode;
  rightSidebar: React.ReactNode;
}

export function CeShell({ topBar, modeTabs, leftPanel, main, rightSidebar }: CeShellProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100vh', overflow: 'hidden',
      background: '#FAFAF9',
    }}>
      {topBar}
      {modeTabs}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {leftPanel}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {main}
        </div>
        {rightSidebar}
      </div>
    </div>
  );
}
