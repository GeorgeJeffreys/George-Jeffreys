'use client';

import { useState } from 'react';
import { C, SANS } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import type { LessonSection } from '@/types/lesson';
import { useDroppable } from '@dnd-kit/core';

interface SectionCardProps {
  index: number;
  section: LessonSection;
  expanded: boolean;
  focused: boolean;
  dimmed?: boolean;
  droppable?: boolean;
  onToggle: () => void;
  onAiClick: () => void;
  onUpdate: (changes: Partial<LessonSection>) => void;
}

function Chip({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'pink' | 'ghost' }) {
  const tones = {
    neutral: { bg: C.cream,    fg: C.ink,  br: C.borderSoft },
    pink:    { bg: C.pinkSoft, fg: C.pink, br: C.pinkBorder },
    ghost:   { bg: 'transparent', fg: C.faint, br: C.border },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: 20, padding: '0 7px',
      fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
      color: t.fg, background: t.bg, border: `1px solid ${t.br}`,
      borderRadius: 999, whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

function AiBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 28, padding: '0 10px',
      fontFamily: SANS, fontSize: 12, fontWeight: 500,
      color: C.pink, background: C.pinkSoft,
      border: `1px solid ${C.pinkBorder}`,
      borderRadius: 999, whiteSpace: 'nowrap',
    }}>
      <Icon name="sparkle" size={13} color={C.pink} />Ask AI
    </button>
  );
}

function EditableField({
  value, placeholder, multiline, onSave,
}: {
  value: string;
  placeholder: string;
  multiline?: boolean;
  onSave: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (editing) {
    const Tag = multiline ? 'textarea' : 'input';
    return (
      <Tag
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => { setEditing(false); onSave(draft); }}
        onKeyDown={(e) => {
          if (!multiline && e.key === 'Enter') { e.preventDefault(); setEditing(false); onSave(draft); }
          if (e.key === 'Escape') { setEditing(false); setDraft(value); }
        }}
        style={{
          width: '100%', fontFamily: SANS, fontSize: 13.5,
          color: C.ink, lineHeight: 1.5,
          border: `1px solid ${C.pink}`, borderRadius: 6,
          padding: '4px 8px', outline: 'none',
          background: C.pinkSoft + '55',
          resize: 'vertical',
          minHeight: multiline ? 60 : 'auto',
        }}
        rows={multiline ? 3 : undefined}
      />
    );
  }

  return (
    <div
      onClick={() => { setDraft(value); setEditing(true); }}
      style={{
        fontFamily: SANS, fontSize: 13.5, color: value ? C.ink : C.faint2,
        padding: '2px 4px', borderRadius: 4, cursor: 'text',
        lineHeight: 1.5, minHeight: 20,
        border: '1px solid transparent',
      }}
    >
      {value || placeholder}
    </div>
  );
}

function BulletList({ text, color }: { text: string; color: string }) {
  const lines = text.split('\n').filter(Boolean);
  if (!lines.length) return <span style={{ fontFamily: SANS, fontSize: 13, color: C.faint2 }}>—</span>;
  return (
    <ul style={{ margin: 0, paddingLeft: 16, fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: C.ink }}>
      {lines.map((l, i) => <li key={i} style={{ marginBottom: 3, color }}>{l}</li>)}
    </ul>
  );
}

function timingLabel(min: number) {
  if (min === 0) return 'Take-home';
  return `${min} min`;
}

export function SectionCard({
  index, section, expanded, focused, dimmed, droppable,
  onToggle, onAiClick, onUpdate,
}: SectionCardProps) {
  const { setNodeRef, isOver } = useDroppable({ id: `section-${index}` });
  const materials = section.materials ? section.materials.split(',').map(m => m.trim()).filter(Boolean) : [];

  return (
    <div
      ref={droppable ? setNodeRef : undefined}
      style={{
        background: C.surface,
        border: `1px solid ${isOver ? C.pink : focused ? C.pink : C.border}`,
        borderRadius: 12,
        boxShadow: focused ? `0 0 0 3px ${C.pinkSoft}` : isOver ? `0 0 0 3px ${C.pinkSoft}` : 'none',
        opacity: dimmed ? 0.65 : 1,
        overflow: 'hidden',
        transition: 'border-color 0.15s, box-shadow 0.15s, opacity 0.15s',
      }}
    >
      {/* Header row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px',
        borderBottom: expanded ? `1px solid ${C.border}` : 'none',
        cursor: 'pointer',
      }} onClick={onToggle}>
        <div style={{
          width: 26, height: 26, borderRadius: 8,
          background: C.cream, color: C.faint,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: SANS, fontSize: 11, fontWeight: 600,
          flexShrink: 0,
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.ink, flex: 1 }}>
          {section.title}
        </span>
        <Chip tone="neutral">
          <Icon name="clock" size={11} />{timingLabel(section.timing_minutes)}
        </Chip>
        <div onClick={(e) => e.stopPropagation()}>
          <AiBtn onClick={onAiClick} />
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={expanded ? 'chevronDown' : 'chevronRight'} size={16} color={C.faint} />
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Task */}
          <div>
            <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              Task
            </div>
            <EditableField
              value={section.task}
              placeholder="Describe the activity…"
              onSave={(v) => onUpdate({ task: v })}
            />
          </div>

          {/* Materials */}
          <div>
            <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Materials
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              {materials.map((m) => <Chip key={m} tone="neutral">{m}</Chip>)}
              <button
                onClick={() => {
                  const added = prompt('Add material:');
                  if (added?.trim()) {
                    const updated = materials.concat(added.trim()).join(', ');
                    onUpdate({ materials: updated });
                  }
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  height: 20, padding: '0 7px',
                  fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
                  color: C.faint, background: 'transparent',
                  border: `1px dashed ${C.border}`, borderRadius: 999,
                }}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Teacher / Students columns */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 0,
            border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden',
          }}>
            {/* Teacher */}
            <div style={{ padding: 12, borderRight: `1px solid ${C.border}`, background: C.creamDeep + '40' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Icon name="user" size={12} color={C.pink} />
                <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Teacher does</span>
              </div>
              {section.teacher_instructions ? (
                <BulletList text={section.teacher_instructions} color={C.ink} />
              ) : (
                <div
                  style={{ fontFamily: SANS, fontSize: 12, color: C.faint2, cursor: 'text', padding: '2px 4px' }}
                  onClick={() => {
                    const v = prompt('Teacher instructions (one per line):', section.teacher_instructions);
                    if (v !== null) onUpdate({ teacher_instructions: v });
                  }}
                >Click to add teacher steps…</div>
              )}
              {section.teacher_instructions && (
                <button
                  onClick={() => {
                    const v = prompt('Teacher instructions (one per line):', section.teacher_instructions);
                    if (v !== null) onUpdate({ teacher_instructions: v });
                  }}
                  style={{ marginTop: 8, fontFamily: SANS, fontSize: 10.5, color: C.faint, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Edit…
                </button>
              )}
            </div>
            {/* Students */}
            <div style={{ padding: 12, background: C.tealSoft + '50' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Icon name="users" size={12} color={C.teal} />
                <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, color: C.teal, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Students do</span>
              </div>
              {section.student_instructions ? (
                <BulletList text={section.student_instructions} color={C.ink} />
              ) : (
                <div
                  style={{ fontFamily: SANS, fontSize: 12, color: C.faint2, cursor: 'text', padding: '2px 4px' }}
                  onClick={() => {
                    const v = prompt('Student instructions (one per line):', section.student_instructions);
                    if (v !== null) onUpdate({ student_instructions: v });
                  }}
                >Click to add student steps…</div>
              )}
              {section.student_instructions && (
                <button
                  onClick={() => {
                    const v = prompt('Student instructions (one per line):', section.student_instructions);
                    if (v !== null) onUpdate({ student_instructions: v });
                  }}
                  style={{ marginTop: 8, fontFamily: SANS, fontSize: 10.5, color: C.faint, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Edit…
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Collapsed preview */}
      {!expanded && (
        <div style={{ padding: '6px 16px 12px 54px' }}>
          <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint }}>
            {section.task || 'No task yet — expand to add content'}
          </span>
        </div>
      )}
    </div>
  );
}

/* Drop indicator shown between sections during drag */
export function DropIndicator({ label }: { label: string }) {
  return (
    <div style={{
      padding: 16,
      border: `2px dashed ${C.pink}`,
      background: C.pinkSoft + 'AA',
      borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      <Icon name="plus" size={14} color={C.pink} />
      <span style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: C.pink }}>{label}</span>
    </div>
  );
}
