'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  CeShell, CeTopBar, CeModeTabs, CeLeftPanel, CeRightSidebar,
  type CeMode,
} from '@/components/curriculum/ce-shell';
import { CalendarLeft, WeekGrid, MonthOverview } from '@/components/curriculum/ce-calendar';
import {
  JourneyLeft, JourneyCascade,
  type SkillLO, type KnowledgeLO,
} from '@/components/curriculum/ce-journey';
import {
  ContentLeft, ContentGrid,
  type SkillData, type ThemeData,
} from '@/components/curriculum/ce-content';
import { CeSidebar } from '@/components/curriculum/ce-sidebar';
import { CeLessonDrawer } from '@/components/curriculum/ce-lesson-drawer';
import type { CurriculumLesson } from '@/types/curriculum';
import type { CurriculumYearData } from '@/lib/curriculum-actions';
import {
  fetchCurriculumYearData,
  fetchLessonsForWeek,
  fetchKnowledgeLOs,
  fetchLessonById,
} from '@/lib/curriculum-actions';
import { getLessonsByYear } from '@/lib/curriculumUtils';

interface Props {
  initialYear: number;
  initialYearData: CurriculumYearData;
}

export function CurriculumExplorer({ initialYear, initialYearData }: Props) {
  const [year, setYear] = useState(initialYear);
  const [yearData, setYearData] = useState(initialYearData);
  const [mode, setMode] = useState<CeMode>('calendar');
  const [search, setSearch] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  // Calendar: cache of week → lessons
  const [weekLessons, setWeekLessons] = useState<Map<number, CurriculumLesson[]>>(new Map());

  // Journey state
  const [expandedSkillRef, setExpandedSkillRef] = useState<string | null>(null);
  const [focusedSkillRef, setFocusedSkillRef] = useState<string | null>(null);
  const [focusedKRef, setFocusedKRef] = useState<string | null>(null);
  const [knowledgeLOsBySkill, setKnowledgeLOsBySkill] = useState<Map<string, KnowledgeLO[]>>(new Map());

  // Content state
  const [focusedTheme, setFocusedTheme] = useState<string | null>(null);
  const [focusedContentSkill, setFocusedContentSkill] = useState<string | null>(null);

  // Lesson drawer
  const [drawerLesson, setDrawerLesson] = useState<CurriculumLesson | null>(null);

  // All lessons for current year (client-side, cached in module scope)
  const allYearLessons = useMemo<CurriculumLesson[]>(() => getLessonsByYear(year), [year]);

  // Lesson lookup for journey mode (knowledgeLORef → lessons)
  const lessonsByKRef = useMemo(() => {
    const m = new Map<string, CurriculumLesson[]>();
    for (const l of allYearLessons) {
      if (!l.knowledgeLORef) continue;
      const arr = m.get(l.knowledgeLORef) ?? [];
      arr.push(l);
      m.set(l.knowledgeLORef, arr);
    }
    return m;
  }, [allYearLessons]);

  // Reload year data when year changes
  useEffect(() => {
    if (year === initialYear) return;
    let cancelled = false;
    fetchCurriculumYearData(year).then(data => {
      if (!cancelled) {
        setYearData(data);
        setSelectedWeek(null);
        setWeekLessons(new Map());
        setExpandedSkillRef(null);
        setFocusedSkillRef(null);
        setFocusedKRef(null);
        setKnowledgeLOsBySkill(new Map());
        setFocusedTheme(null);
        setFocusedContentSkill(null);
      }
    });
    return () => { cancelled = true; };
  }, [year, initialYear]);

  // Load lessons for selected week
  useEffect(() => {
    if (selectedWeek === null) return;
    if (weekLessons.has(selectedWeek)) return;
    fetchLessonsForWeek(year, selectedWeek).then(lessons => {
      setWeekLessons(prev => {
        const next = new Map(prev);
        next.set(selectedWeek, lessons);
        return next;
      });
    });
  }, [selectedWeek, year, weekLessons]);

  // Load knowledge LOs when a skill ref is expanded
  useEffect(() => {
    if (!expandedSkillRef) return;
    if (knowledgeLOsBySkill.has(expandedSkillRef)) return;
    fetchKnowledgeLOs(year, expandedSkillRef).then(klos => {
      setKnowledgeLOsBySkill(prev => {
        const next = new Map(prev);
        next.set(expandedSkillRef, klos);
        return next;
      });
    });
  }, [expandedSkillRef, year, knowledgeLOsBySkill]);

  // Handlers
  function handleYearChange(y: number) {
    setYear(y);
  }

  function handleSelectWeek(w: number) {
    setSelectedWeek(w);
  }

  function handleLessonClick(lesson: CurriculumLesson) {
    setDrawerLesson(lesson);
  }

  // Render mode-specific panels
  function renderLeft() {
    if (mode === 'calendar') {
      return (
        <CalendarLeft
          months={yearData.months}
          selectedWeek={selectedWeek}
          onSelectWeek={handleSelectWeek}
        />
      );
    }
    if (mode === 'journey') {
      return (
        <JourneyLeft
          skillLOs={yearData.skillLOs as SkillLO[]}
          focusedSkillRef={focusedSkillRef}
          onFocusSkill={ref => { setFocusedSkillRef(ref); setFocusedKRef(null); }}
        />
      );
    }
    // content
    return (
      <ContentLeft
        themes={yearData.themes as ThemeData[]}
        focusedTheme={focusedTheme}
        onFocusTheme={setFocusedTheme}
        skillBreakdown={yearData.skillBreakdown as SkillData[]}
        focusedSkill={focusedContentSkill}
        onFocusSkill={setFocusedContentSkill}
      />
    );
  }

  function renderMain() {
    if (mode === 'calendar') {
      if (selectedWeek !== null) {
        return (
          <WeekGrid
            week={selectedWeek}
            lessons={weekLessons.get(selectedWeek) ?? []}
            onLessonClick={handleLessonClick}
          />
        );
      }
      return (
        <MonthOverview
          months={yearData.months}
          allLessons={weekLessons}
          onSelectWeek={w => {
            handleSelectWeek(w);
            // Trigger a load for overview — fetch all if not loaded
            for (const m of yearData.months) {
              for (const wk of m.weeks) {
                if (!weekLessons.has(wk)) {
                  fetchLessonsForWeek(year, wk).then(lessons => {
                    setWeekLessons(prev => {
                      const next = new Map(prev);
                      next.set(wk, lessons);
                      return next;
                    });
                  });
                }
              }
            }
          }}
        />
      );
    }

    if (mode === 'journey') {
      return (
        <JourneyCascade
          skillLOs={yearData.skillLOs as SkillLO[]}
          focusedSkillRef={focusedSkillRef}
          expandedSkillRef={expandedSkillRef}
          onExpandSkill={setExpandedSkillRef}
          focusedKRef={focusedKRef}
          onFocusKRef={setFocusedKRef}
          knowledgeLOsBySkill={knowledgeLOsBySkill}
          lessonsByKRef={lessonsByKRef}
          onLessonClick={handleLessonClick}
        />
      );
    }

    // content
    return (
      <ContentGrid
        lessons={allYearLessons}
        focusedSkill={focusedContentSkill}
        focusedTheme={focusedTheme}
        search={search}
        onLessonClick={handleLessonClick}
      />
    );
  }

  return (
    <>
      <CeShell
        topBar={
          <CeTopBar
            year={year}
            search={search}
            onYearChange={handleYearChange}
            onSearchChange={setSearch}
          />
        }
        modeTabs={
          <CeModeTabs mode={mode} onModeChange={m => { setMode(m); setSearch(''); }} />
        }
        leftPanel={<CeLeftPanel>{renderLeft()}</CeLeftPanel>}
        main={renderMain()}
        rightSidebar={
          <CeRightSidebar>
            <CeSidebar
              totalLessons={yearData.totalLessons}
              totalWeeks={yearData.totalWeeks}
              skillBreakdown={yearData.skillBreakdown as SkillData[]}
              themes={yearData.themes as ThemeData[]}
            />
          </CeRightSidebar>
        }
      />
      <CeLessonDrawer lesson={drawerLesson} onClose={() => setDrawerLesson(null)} />
    </>
  );
}
