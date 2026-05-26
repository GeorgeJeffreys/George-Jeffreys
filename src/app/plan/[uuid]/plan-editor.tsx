'use client';

import { useState, useRef, useCallback } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { MobilePlanEditor } from '@/components/plan/mobile/MobilePlanEditor';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { C, SANS, SECTION_CONFIG } from '@/lib/tokens';
import { Icon } from '@/components/icon';
import { TopBar } from '@/components/plan/top-bar';
import { MetaHeader } from '@/components/plan/meta-header';
import { SectionCard, DropIndicator } from '@/components/plan/section-card';
import { LibraryPanel } from '@/components/plan/library-panel';
import type { LibraryCard, RightTab } from '@/components/plan/library-panel';
import { AiPanel } from '@/components/plan/ai-panel';
import { ExamplesPanel } from '@/components/plan/examples-panel';
import { WorksheetView } from '@/components/plan/worksheet';
import { LessonSelector } from '@/components/plan/lesson-selector';
import { TimingPopover } from '@/components/plan/timing-popover';
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

const MIN_RIGHT_WIDTH = 280;
const MAX_RIGHT_WIDTH = 640;
const DEFAULT_RIGHT_WIDTH = 420;
const COLLAPSED_WIDTH = 48;

export function PlanEditor({ uuid, initialPlan, initialLesson }: PlanEditorProps) {
  const { isPhone, isTablet } = useBreakpoint();

  if (isPhone) {
    return (
      <MobilePlanEditor uuid={uuid} initialPlan={initialPlan} initialLesson={initialLesson} />
    );
  }

  return (
    <DesktopPlanEditor uuid={uuid} initialPlan={initialPlan} initialLesson={initialLesson} isTablet={isTablet} />
  );
}

function DesktopPlanEditor({ uuid, initialPlan, initialLesson, isTablet }: PlanEditorProps & { isTablet: boolean }) {
  const [plan, setPlan] = useState<LessonPlan | null>(initialPlan);
  const [lesson, setLesson] = useState<CurriculumLesson | null>(initialLesson);
  const [activeView, setActiveView] = useState<'plan' | 'worksheet'>('plan');
  const [rightTab, setRightTab] = useState<RightTab>('library');
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set([0]));
  const [focusedSection, setFocusedSection] = useState(0);
  const [showSelector, setShowSelector] = useState(uuid === 'new');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  // Fix 5: resize + collapse
  const [rightWidth, setRightWidth] = useState(DEFAULT_RIGHT_WIDTH);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  // Fix 7: timing popover
  const [timingOpen, setTimingOpen] = useState(false);
  const [timingAnchorRect, setTimingAnchorRect] = useState<DOMRect | null>(null);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sections: LessonSection[] = plan?.sections?.length === 6
    ? plan.sections.map((s, i) => ({ ...s, title: s.title || SECTION_CONFIG[i].title }))
    : buildDefaultSections();

  // ── Autosave ──────────────────────────────────────────────────────────────
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
        if (json.data) { setPlan(json.data as LessonPlan); setSaveStatus('saved'); }
      } catch { setSaveStatus('idle'); }
    }, 2000);
  }, []);

  function updateSection(index: number, changes: Partial<LessonSection>) {
    if (!plan) return;
    const updatedSections = sections.map((s, i) => i === index ? { ...s, ...changes } : s);
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

  // Fix 6: insert library card preview into focused section materials
  function insertLibraryCard(card: LibraryCard) {
    if (!plan) return;
    const current = sections[focusedSection].materials;
    updateSection(focusedSection, { materials: current ? `${current}, ${card.type}` : card.type });
  }

  // Fix 8: load example plan sections
  function loadExamplePlan(newSections: LessonSection[]) {
    if (!plan) return;
    const updatedPlan = { ...plan, sections: newSections };
    setPlan(updatedPlan);
    scheduleSave(updatedPlan);
    setRightTab('library');
  }

  // ── Export ────────────────────────────────────────────────────────────────
  async function handleExport() {
    if (!plan || exporting) return;
    setExporting(true);
    try {
      const { exportLessonZip } = await import('@/lib/pdf/export');
      await exportLessonZip(plan, lesson);
    } finally { setExporting(false); }
  }

  // ── Fix 5: resize handle ──────────────────────────────────────────────────
  function startResize(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startW = rightWidth;
    const onMove = (me: MouseEvent) => {
      setRightWidth(Math.max(MIN_RIGHT_WIDTH, Math.min(MAX_RIGHT_WIDTH, startW + startX - me.clientX)));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  // ── DnD ──────────────────────────────────────────────────────────────────
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function onDragStart(event: DragStartEvent) { setDraggingCardId(String(event.active.id)); }

  function onDragEnd(event: DragEndEvent) {
    const { over } = event;
    if (over && plan) {
      const sectionIdx = Number(String(over.id).replace('section-', ''));
      const card = event.active.data.current as LibraryCard | undefined;
      if (card && !isNaN(sectionIdx)) {
        const current = sections[sectionIdx].materials;
        updateSection(sectionIdx, { materials: current ? `${current}, ${card.type}` : card.type });
      }
    }
    setDraggingCardId(null);
    setDropTarget(null);
  }

  // ── Toggle section ────────────────────────────────────────────────────────
  function toggleSection(i: number) {
    setExpandedSet((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
    setFocusedSection(i);
  }

  function handleAiClick(i: number) {
    setFocusedSection(i);
    setRightTab('ai');
    if (panelCollapsed) setPanelCollapsed(false);
    if (!expandedSet.has(i)) setExpandedSet((prev) => new Set([...prev, i]));
  }

  const totalMin = sections.reduce((sum, s) => sum + (s.timing_minutes || 0), 0);
  const sectionName = sections[focusedSection]?.title ?? 'Section';
  // On tablet, left panel always takes full width (right panel overlays as fixed)
  const effectiveWidth = isTablet ? 0 : (panelCollapsed ? COLLAPSED_WIDTH : rightWidth);

  const ICON_TABS: Array<{ id: RightTab; icon: 'book' | 'sparkle' | 'copy'; label: string }> = [
    { id: 'library', icon: 'book', label: 'Library' },
    { id: 'ai', icon: 'sparkle', label: 'AI' },
    { id: 'examples', icon: 'copy', label: 'Examples' },
  ];

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        fontFamily: SANS, color: C.ink, overflow: 'hidden', background: C.cream,
      }}>
        <TopBar
          lesson={lesson}
          saveStatus={saveStatus === 'idle' ? 'saved' : saveStatus}
          onOpenSelector={() => setShowSelector(true)}
          onExport={handleExport}
          exporting={exporting}
        />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* ── Left panel ── */}
          <div style={{
            width: `calc(100% - ${effectiveWidth}px)`,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            transition: 'width 0.15s ease',
          }}>
            {/* View tabs */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '12px 24px 0', borderBottom: `1px solid ${C.border}`,
              background: C.surface, flexShrink: 0,
            }}>
              {([
                { id: 'plan' as const,      label: 'Lesson Plan',       icon: 'book' as const },
                { id: 'worksheet' as const, label: 'Student Worksheet', icon: 'edit' as const },
              ]).map((t) => {
                const isActive = t.id === activeView;
                return (
                  <button key={t.id} onClick={() => setActiveView(t.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '10px 14px 12px',
                    fontFamily: SANS, fontSize: 13, fontWeight: isActive ? 600 : 500,
                    color: isActive ? C.ink : C.faint,
                    borderBottom: `2px solid ${isActive ? C.pink : 'transparent'}`,
                    marginBottom: -1, background: 'transparent', border: 'none',
                    borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer',
                  }}>
                    <Icon name={t.icon} size={14} color={isActive ? C.pink : C.faint2} />
                    {t.label}
                  </button>
                );
              })}
              <div style={{ flex: 1 }} />
              <div style={{ paddingBottom: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, height: 20, padding: '0 7px',
                  fontFamily: SANS, fontSize: 10.5, fontWeight: 500, color: C.faint,
                  background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 999,
                }}>
                  <Icon name="users" size={11} /> 28 students
                </span>
              </div>
            </div>

            {/* Content */}
            {activeView === 'plan' ? (
              <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {plan ? (
                  <>
                    <MetaHeader lesson={lesson} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                      <h2 style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.ink, margin: 0 }}>
                        Lesson structure
                      </h2>
                      <span style={{ fontFamily: SANS, fontSize: 12, color: C.faint }}>· {totalMin} min · 6 sections</span>
                      <div style={{ flex: 1 }} />
                      {/* Fix 7: timing button */}
                      <button
                        onClick={(e) => { setTimingAnchorRect(e.currentTarget.getBoundingClientRect()); setTimingOpen(true); }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          height: 28, padding: '0 10px',
                          fontFamily: SANS, fontSize: 12, fontWeight: 500,
                          background: 'transparent', color: C.ink,
                          border: `1px solid ${C.border}`, borderRadius: 8, cursor: 'pointer',
                        }}
                      >
                        <Icon name="settings" size={13} />Adjust timing
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {sections.map((s, i) => (
                        <div key={i}>
                          <SectionCard
                            index={i} section={s}
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
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: C.pinkSoft, border: `1px solid ${C.pinkBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name="book" size={24} color={C.pink} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>No lesson selected</h2>
                      <p style={{ fontFamily: SANS, fontSize: 14, color: C.faint, margin: 0 }}>Choose a lesson from the curriculum to get started.</p>
                    </div>
                    <button
                      onClick={() => setShowSelector(true)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        height: 40, padding: '0 20px', fontFamily: SANS, fontSize: 14, fontWeight: 600,
                        background: C.pink, color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer',
                      }}
                    >
                      <Icon name="calendar" size={16} color="#fff" />Browse lessons
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Fix 2: Tiptap worksheet */
              <WorksheetView
                lesson={lesson}
                initialContent={plan?.worksheet?.instructions ?? ''}
                onSave={(html) => {
                  if (!plan) return;
                  const up = { ...plan, worksheet: { title: lesson?.dailyLO ?? 'Worksheet', instructions: html, questions: [] } };
                  setPlan(up);
                  scheduleSave(up);
                }}
              />
            )}
          </div>

          {/* ── Right panel ── */}
          {/* Tablet: backdrop to close overlay panel */}
          {isTablet && !panelCollapsed && (
            <div
              onClick={() => setPanelCollapsed(true)}
              style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(26,26,26,0.25)' }}
            />
          )}
          {/* Tablet: floating open-panel button when collapsed */}
          {isTablet && panelCollapsed && (
            <button
              onClick={() => setPanelCollapsed(false)}
              title="Open panel"
              style={{
                position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)',
                zIndex: 101, width: 28, height: 56,
                background: C.surface, border: `1px solid ${C.border}`,
                borderRight: 'none',
                borderTopLeftRadius: 8, borderBottomLeftRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '-2px 0 8px rgba(56,30,30,0.08)',
              }}
            >
              <Icon name="chevronLeft" size={14} color={C.faint} />
            </button>
          )}
          <div style={isTablet ? {
            position: 'fixed', top: 60, right: 0, bottom: 0, zIndex: 100,
            width: rightWidth, flexShrink: 0,
            borderLeft: `1px solid ${C.border}`,
            background: C.surface, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            transform: panelCollapsed ? 'translateX(100%)' : 'translateX(0)',
            transition: 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
            boxShadow: '-8px 0 32px rgba(56,30,30,0.12)',
          } : {
            width: effectiveWidth, flexShrink: 0,
            borderLeft: `1px solid ${C.border}`,
            background: C.surface, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
            transition: 'width 0.15s ease',
          }}>
            {!isTablet && panelCollapsed ? (
              /* Fix 5: collapsed icon bar — desktop only */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 4 }}>
                <button
                  onClick={() => setPanelCollapsed(false)} title="Expand"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 34, height: 34, borderRadius: 8,
                    background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: 4,
                  }}
                >
                  <Icon name="panelRight" size={18} color={C.faint} />
                </button>
                {ICON_TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setPanelCollapsed(false); setRightTab(t.id); }}
                    title={t.label}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 34, height: 34, borderRadius: 8,
                      background: rightTab === t.id ? C.pinkSoft : 'transparent',
                      border: rightTab === t.id ? `1px solid ${C.pinkBorder}` : '1px solid transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon name={t.icon} size={16} color={rightTab === t.id ? C.pink : C.faint2} />
                  </button>
                ))}
              </div>
            ) : (
              <>
                {/* Fix 5: resize handle */}
                <div
                  onMouseDown={startResize}
                  style={{
                    position: 'absolute', top: 0, left: 0, width: 5, bottom: 0,
                    cursor: 'col-resize', zIndex: 10, background: 'transparent',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = `${C.pink}28`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                />
                {/* Collapse button */}
                <button
                  onClick={() => setPanelCollapsed(true)} title="Collapse"
                  style={{
                    position: 'absolute', top: 10, right: 10, zIndex: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 22, height: 22, borderRadius: 6,
                    background: C.cream, border: `1px solid ${C.border}`, cursor: 'pointer',
                  }}
                >
                  <Icon name="chevronRight" size={13} color={C.faint2} />
                </button>

                {rightTab === 'library' ? (
                  <LibraryPanel
                    draggingId={draggingCardId}
                    activeTab={rightTab}
                    onTabChange={setRightTab}
                    onInsertCard={insertLibraryCard}
                  />
                ) : rightTab === 'ai' ? (
                  <AiPanel
                    lessonId={plan?.lesson_id ?? ''}
                    focusedSection={focusedSection}
                    sectionName={sectionName}
                    activeTab={rightTab}
                    onTabChange={setRightTab}
                    onInsert={insertAiContent}
                  />
                ) : (
                  <ExamplesPanel
                    activeTab={rightTab}
                    onTabChange={setRightTab}
                    onLoadPlan={loadExamplePlan}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Drag overlay */}
        <DragOverlay>
          {draggingCardId && (
            <div style={{ transform: 'rotate(-3deg)', filter: 'drop-shadow(0 16px 28px rgba(56,30,30,0.22))', pointerEvents: 'none', width: 220 }}>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, fontFamily: SANS, fontSize: 12, color: C.faint }}>
                Drag to drop on a section
              </div>
            </div>
          )}
        </DragOverlay>

        {/* Fix 7: timing popover */}
        {timingOpen && (
          <TimingPopover
            sections={sections}
            onUpdate={(i, min) => updateSection(i, { timing_minutes: min })}
            onClose={() => setTimingOpen(false)}
            anchorRect={timingAnchorRect}
          />
        )}

        {showSelector && <LessonSelector onClose={() => setShowSelector(false)} />}
      </div>
    </DndContext>
  );
}
