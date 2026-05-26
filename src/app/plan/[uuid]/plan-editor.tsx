'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { C, SANS, SECTION_CONFIG } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import { TopBar } from '@/components/plan/top-bar';
import { MetaHeader } from '@/components/plan/meta-header';
import { SectionCard, DropIndicator } from '@/components/plan/section-card';
import { LibraryPanel, LibraryCard, RightTabs } from '@/components/plan/library-panel';
import { AiPanel } from '@/components/plan/ai-panel';
import { WorksheetView } from '@/components/plan/worksheet';
import { LessonSelector } from '@/components/plan/lesson-selector';
import type { LessonPlan, LessonSection } from '@/types/lesson';
import type { CurriculumLesson } from '@/types/curriculum';
import { emptySection } from '@/types/lesson';

interface PlanEditorProps {
  uuid: string;
  initialPlan: LessonPlan | null;
  initialLesson: CurriculumLesson | null;
}

function buildDefaultSections(): LessonSection[] {
  return SECTION_CONFIG.map((cfg, i) => ({
    ...emptySection(i),
    title: cfg.title,
    timing_minutes: cfg.timing_minutes,
  }));
}

export function PlanEditor({ uuid, initialPlan, initialLesson }: PlanEditorProps) {
  const [plan, setPlan] = useState<LessonPlan | null>(initialPlan);
  const [lesson, setLesson] = useState<CurriculumLesson | null>(initialLesson);
  const [activeView, setActiveView] = useState<'plan' | 'worksheet'>('plan');
  const [rightTab, setRightTab] = useState<'library' | 'ai'>('library');
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set([0]));
  const [focusedSection, setFocusedSection] = useState(0);
  const [showSelector, setShowSelector] = useState(uuid === 'new');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<number | null>(null);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ensure sections always have design-matching titles when plan has blank ones
  const sections: LessonSection[] = plan?.sections?.length === 6
    ? plan.sections.map((s, i) => ({
        ...s,
        title: s.title || SECTION_CONFIG[i].title,
      }))
    : buildDefaultSections();

  // ── Autosave ────────────────────────────────────────────────────────────────
  const scheduleSave = useCallback((updatedPlan: LessonPlan) => {
    setSaveStatus('saving');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/lesson/${updatedPlan.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lesson_id: updatedPlan.lesson_id,
            sections: updatedPlan.sections,
            worksheet: updatedPlan.worksheet,
          }),
        });
        const json = await res.json();
        if (json.data) {
          setPlan(json.data as LessonPlan);
          setSaveStatus('saved');
        }
      } catch {
        setSaveStatus('idle');
      }
    }, 2000);
  }, []);

  function updateSection(index: number, changes: Partial<LessonSection>) {
    if (!plan) return;
    const updatedSections = sections.map((s, i) =>
      i === index ? { ...s, ...changes } : s
    );
    const updatedPlan = { ...plan, sections: updatedSections };
    setPlan(updatedPlan);
    scheduleSave(updatedPlan);
  }

  function insertAiContent(sectionIndex: number, data: { teacherInstructions: string; studentInstructions: string }) {
    updateSection(sectionIndex, {
      teacher_instructions: data.teacherInstructions,
      student_instructions: data.studentInstructions,
    });
  }

  // ── DnD ─────────────────────────────────────────────────────────────────────
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function onDragStart(event: DragStartEvent) {
    setDraggingCardId(String(event.active.id));
  }

  function onDragEnd(event: DragEndEvent) {
    const { over } = event;
    if (over && plan) {
      const sectionIdx = Number(String(over.id).replace('section-', ''));
      const card = event.active.data.current as LibraryCard | undefined;
      if (card && !isNaN(sectionIdx)) {
        // Append card preview content to the section's materials
        const current = sections[sectionIdx].materials;
        const updated = current ? `${current}, ${card.type}` : card.type;
        updateSection(sectionIdx, { materials: updated });
      }
    }
    setDraggingCardId(null);
    setDropTarget(null);
  }

  // ── Toggle section ───────────────────────────────────────────────────────
  function toggleSection(i: number) {
    setExpandedSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
    setFocusedSection(i);
  }

  function handleAiClick(i: number) {
    setFocusedSection(i);
    setRightTab('ai');
    if (!expandedSet.has(i)) {
      setExpandedSet((prev) => new Set([...prev, i]));
    }
  }

  // ── Total time ──────────────────────────────────────────────────────────
  const totalMin = sections.reduce((sum, s) => sum + (s.timing_minutes || 0), 0);
  const sectionName = sections[focusedSection]?.title ?? 'Section';

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        fontFamily: SANS, color: C.ink, overflow: 'hidden',
        background: C.cream,
      }}>
        {/* Top bar */}
        <TopBar
          lesson={lesson}
          saveStatus={saveStatus === 'idle' ? 'saved' : saveStatus}
          onOpenSelector={() => setShowSelector(true)}
        />

        {/* Two-panel content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* ── Left panel ── */}
          <div style={{ width: '62%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* View tabs */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '12px 24px 0',
              borderBottom: `1px solid ${C.border}`,
              background: C.surface, flexShrink: 0,
            }}>
              {([
                { id: 'plan' as const, label: 'Lesson Plan', icon: 'book' as const },
                { id: 'worksheet' as const, label: 'Student Worksheet', icon: 'edit' as const },
              ]).map((t) => {
                const isActive = t.id === activeView;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveView(t.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      padding: '10px 14px 12px',
                      fontFamily: SANS, fontSize: 13, fontWeight: isActive ? 600 : 500,
                      color: isActive ? C.ink : C.faint,
                      borderBottom: `2px solid ${isActive ? C.pink : 'transparent'}`,
                      marginBottom: -1, background: 'transparent', border: 'none',
                      borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                    }}
                  >
                    <Icon name={t.icon} size={14} color={isActive ? C.pink : C.faint2} />
                    {t.label}
                  </button>
                );
              })}
              <div style={{ flex: 1 }} />
              <div style={{ paddingBottom: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  height: 20, padding: '0 7px',
                  fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
                  color: C.faint, background: 'transparent',
                  border: `1px solid ${C.border}`, borderRadius: 999,
                }}>
                  <Icon name="users" size={11} /> 28 students
                </span>
              </div>
            </div>

            {/* Content area */}
            {activeView === 'plan' ? (
              <div style={{
                flex: 1, overflow: 'auto', padding: '20px 24px 32px',
                display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                {plan ? (
                  <>
                    <MetaHeader lesson={lesson} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                      <h2 style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.ink, margin: 0 }}>
                        Lesson structure
                      </h2>
                      <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint }}>
                        · {totalMin} min · 6 sections
                      </span>
                      <div style={{ flex: 1 }} />
                      <button style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        height: 28, padding: '0 10px',
                        fontFamily: SANS, fontSize: 12, fontWeight: 500,
                        background: 'transparent', color: C.ink,
                        border: `1px solid ${C.border}`, borderRadius: 8,
                      }}>
                        <Icon name="settings" size={13} />Adjust timing
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {sections.map((s, i) => (
                        <div key={i}>
                          <SectionCard
                            index={i}
                            section={s}
                            expanded={expandedSet.has(i)}
                            focused={focusedSection === i && rightTab === 'ai'}
                            dimmed={draggingCardId !== null && focusedSection !== i}
                            droppable
                            onToggle={() => toggleSection(i)}
                            onAiClick={() => handleAiClick(i)}
                            onUpdate={(changes) => updateSection(i, changes)}
                          />
                          {draggingCardId !== null && dropTarget === i && (
                            <DropIndicator label={`Drop here to add to §${i + 1} ${s.title}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* No plan loaded — prompt to select a lesson */
                  <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 16,
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: C.pinkSoft, border: `1px solid ${C.pinkBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name="book" size={24} color={C.pink} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>
                        No lesson selected
                      </h2>
                      <p style={{ fontFamily: SANS, fontSize: 14, color: C.faint, margin: 0 }}>
                        Choose a lesson from the curriculum to get started.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSelector(true)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        height: 40, padding: '0 20px',
                        fontFamily: SANS, fontSize: 14, fontWeight: 600,
                        background: C.pink, color: '#fff', border: 'none', borderRadius: 10,
                      }}
                    >
                      <Icon name="calendar" size={16} color="#fff" />Browse lessons
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <WorksheetView lesson={lesson} />
            )}
          </div>

          {/* ── Right panel ── */}
          <div style={{
            width: '38%',
            borderLeft: `1px solid ${C.border}`,
            background: C.surface,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            {rightTab === 'library' ? (
              <LibraryPanel
                draggingId={draggingCardId}
                activeTab={rightTab}
                onTabChange={setRightTab}
              />
            ) : (
              <AiPanel
                lessonId={plan?.lesson_id ?? ''}
                focusedSection={focusedSection}
                sectionName={sectionName}
                activeTab={rightTab}
                onTabChange={setRightTab}
                onInsert={insertAiContent}
              />
            )}
          </div>
        </div>

        {/* Drag overlay */}
        <DragOverlay>
          {draggingCardId && (
            <div style={{
              transform: 'rotate(-3deg)',
              filter: 'drop-shadow(0 16px 28px rgba(56,30,30,0.22))',
              pointerEvents: 'none',
              width: 220,
            }}>
              <div style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: 12,
                fontFamily: SANS, fontSize: 12, color: C.faint,
              }}>
                Drag to drop on a section
              </div>
            </div>
          )}
        </DragOverlay>

        {/* Lesson selector modal */}
        {showSelector && (
          <LessonSelector onClose={() => setShowSelector(false)} />
        )}
      </div>
    </DndContext>
  );
}
