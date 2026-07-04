import React, { useState, useEffect, useRef } from 'react';
import { DayPlan, STUDY_PLAN } from '../data/plan';
import { DayProgressDoc } from '../types';
import { 
  CheckSquare, 
  Square, 
  Lightbulb, 
  FileText, 
  Bookmark, 
  Check, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Info,
  Save,
  ArrowRight
} from 'lucide-react';

interface DailyBoardProps {
  progress: Record<number, DayProgressDoc>;
  onUpdateProgress: (dayNum: number, updated: Partial<DayProgressDoc>) => Promise<void>;
}

export default function DailyBoard({ progress, onUpdateProgress }: DailyBoardProps) {
  // Determine which day is "Today" based on the local system time of July 2026.
  // Day 1 starts on July 4, 2026.
  const todayDayNum = (() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed, July is 6
    const date = today.getDate();

    if (year === 2026 && month === 6) { // July 2026
      if (date >= 4 && date <= 22) {
        return date - 4 + 1; // July 4 is Day 1
      }
    }
    // Default to Day 1 if outside the specific period
    return 1;
  })();

  const [selectedDayNum, setSelectedDayNum] = useState<number>(todayDayNum);
  const selectedDay: DayPlan = STUDY_PLAN[selectedDayNum - 1];

  // Notes text local state with debounce
  const [notesText, setNotesText] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const notesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load progress notes when selected day changes
  const dayProg = progress[selectedDayNum] || {
    dayNum: selectedDayNum,
    attendanceChecked: false,
    dataStructuresStudyDone: [],
    dataStructuresPracticeDone: false,
    mathsStudyDone: [],
    mathsPracticeDone: false,
    notes: '',
  };

  useEffect(() => {
    setNotesText(dayProg.notes || '');
    setSaveSuccess(false);
  }, [selectedDayNum, dayProg.notes]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    };
  }, []);

  // Handle Notes Auto-Save
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNotesText(val);
    setSavingNotes(true);
    setSaveSuccess(false);

    if (notesTimeoutRef.current) {
      clearTimeout(notesTimeoutRef.current);
    }

    notesTimeoutRef.current = setTimeout(async () => {
      try {
        await onUpdateProgress(selectedDayNum, { notes: val });
        setSaveSuccess(true);
      } catch (err) {
        console.error("Auto-save failed", err);
      } finally {
        setSavingNotes(false);
      }
    }, 1500); // Debounce save for 1.5s
  };

  const forceSaveNotes = async () => {
    if (notesTimeoutRef.current) {
      clearTimeout(notesTimeoutRef.current);
    }
    setSavingNotes(true);
    setSaveSuccess(false);
    try {
      await onUpdateProgress(selectedDayNum, { notes: notesText });
      setSaveSuccess(true);
    } catch (err) {
      console.error("Manual save failed", err);
    } finally {
      setSavingNotes(false);
    }
  };

  // Toggle helper for arrays
  const toggleStudyItem = async (subject: 'ds' | 'maths', index: number) => {
    const isDS = subject === 'ds';
    const currentList = isDS ? dayProg.dataStructuresStudyDone : dayProg.mathsStudyDone;
    
    let newList: number[];
    if (currentList.includes(index)) {
      newList = currentList.filter(i => i !== index);
    } else {
      newList = [...currentList, index];
    }

    if (isDS) {
      await onUpdateProgress(selectedDayNum, { dataStructuresStudyDone: newList });
    } else {
      await onUpdateProgress(selectedDayNum, { mathsStudyDone: newList });
    }
  };

  const togglePractice = async (subject: 'ds' | 'maths') => {
    const isDS = subject === 'ds';
    const isDone = isDS ? dayProg.dataStructuresPracticeDone : dayProg.mathsPracticeDone;
    
    if (isDS) {
      await onUpdateProgress(selectedDayNum, { dataStructuresPracticeDone: !isDone });
    } else {
      await onUpdateProgress(selectedDayNum, { mathsPracticeDone: !isDone });
    }
  };

  const handleAttendanceCheck = async () => {
    await onUpdateProgress(selectedDayNum, { attendanceChecked: !dayProg.attendanceChecked });
  };

  // Calculate day completion status
  const getDayProgressStats = (dayNum: number) => {
    const day = STUDY_PLAN[dayNum - 1];
    const prog = progress[dayNum];
    if (!prog) return { percent: 0, checkedIn: false };

    const total = day.dataStructures.studyItems.length + 1 + day.maths.studyItems.length + 1;
    const done = prog.dataStructuresStudyDone.length + (prog.dataStructuresPracticeDone ? 1 : 0) +
                 prog.mathsStudyDone.length + (prog.mathsPracticeDone ? 1 : 0);
    return {
      percent: Math.round((done / total) * 100),
      checkedIn: prog.attendanceChecked
    };
  };

  return (
    <div id="daily-board" className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      
      {/* 1. Left Grid Sidebar - Days 1 to 19 Navigation */}
      <div id="days-sidebar" className="xl:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            19-Day Prep Plan
          </h3>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-md">
            Exams July 23
          </span>
        </div>

        {/* Days Board Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-7 xl:grid-cols-4 gap-2">
          {STUDY_PLAN.map((day) => {
            const { percent, checkedIn } = getDayProgressStats(day.dayNum);
            const isSelected = selectedDayNum === day.dayNum;
            const isToday = todayDayNum === day.dayNum;

            return (
              <button
                key={day.dayNum}
                id={`day-nav-btn-${day.dayNum}`}
                onClick={() => setSelectedDayNum(day.dayNum)}
                className={`relative flex flex-col items-center justify-between p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                    : isToday
                      ? 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100/70 text-indigo-700 font-semibold'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {/* Is Today indicator dot */}
                {isToday && !isSelected && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping"></span>
                )}
                
                <span className="text-[10px] font-mono opacity-70">D{day.dayNum}</span>
                <span className="text-sm font-extrabold mt-0.5">{day.dayNum}</span>
                
                {/* Progress bar or small check */}
                <div className="w-full mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${isSelected ? 'bg-white' : 'bg-indigo-600'}`} 
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                {checkedIn && (
                  <CheckCircle2 className={`w-3.5 h-3.5 absolute -top-1 -right-1 ${isSelected ? 'text-indigo-200' : 'text-emerald-600 bg-white rounded-full'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Phase Info card */}
        <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/80">
          <span className="text-[10px] uppercase font-black tracking-wider text-indigo-600 block mb-1">Active Stage</span>
          <h4 className="text-indigo-950 text-sm font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Phase {selectedDay.phaseNum}: {selectedDay.phaseName}
          </h4>
          <p className="text-indigo-900/80 text-xs mt-1.5 leading-relaxed font-medium">
            {selectedDay.phaseNum === 1 && "Foundations: Building the base — core definitions, basic operations, and first algorithms in both subjects."}
            {selectedDay.phaseNum === 2 && "Core Buildout: Searching, sorting, and higher-order differential equations — the algorithmic heart of both subjects."}
            {selectedDay.phaseNum === 3 && "Heavy Topics: AVL trees, heaps, graphs, and vector calculus — the most exam-heavy material. Take these slowly."}
            {selectedDay.phaseNum === 4 && "Final Push: Previous-year practice and light final revision — building exam speed and confidence."}
          </p>
        </div>
      </div>

      {/* 2. Right Workspace - Selected Day Details */}
      <div id="day-workspace" className="xl:col-span-8 space-y-6">
        
        {/* Day Workspace Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10">
            <div>
              <span className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-wider block">
                {selectedDay.dateStr}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
                Day {selectedDay.dayNum}: Study Goals
              </h2>
            </div>

            {/* Daily Login / Check-In Button */}
            <button
              id="attendance-checkin-btn"
              onClick={handleAttendanceCheck}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                dayProg.attendanceChecked
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100/80'
                  : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {dayProg.attendanceChecked ? (
                <>
                  <Check className="w-4 h-4 shrink-0" />
                  Checked In (Attendance Logged)
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 shrink-0" />
                  Daily Login & Check In
                </>
              )}
            </button>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
            <span className="font-bold text-slate-800">Goal of the day:</span> {selectedDay.goal}
          </p>
        </div>

        {/* Columns: Data Structures vs Maths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Data Structures Workspace Card */}
          <div id="ds-workspace-card" className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Subject 1</span>
                <h3 className="font-extrabold text-slate-800 text-base">Data Structures</h3>
              </div>
              <span className="text-xs font-bold text-slate-500 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200/50">
                {selectedDay.dataStructures.unit}
              </span>
            </div>

            {/* Study Items Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Study & Learn topics</h4>
              
              <div className="space-y-2.5">
                {selectedDay.dataStructures.studyItems.map((item, idx) => {
                  const isDone = dayProg.dataStructuresStudyDone.includes(idx);
                  return (
                    <button
                      key={idx}
                      id={`ds-study-item-${idx}`}
                      onClick={() => toggleStudyItem('ds', idx)}
                      className="w-full text-left flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/50 hover:border-slate-300 transition-all cursor-pointer group"
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckSquare className="w-5 h-5 text-cyan-600" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-all" />
                        )}
                      </div>
                      <span className={`text-xs leading-relaxed transition-all ${isDone ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Practical Task Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Practical Task</h4>
              
              <button
                id="ds-practice-toggle-btn"
                onClick={() => togglePractice('ds')}
                className={`w-full text-left flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                  dayProg.dataStructuresPracticeDone
                    ? 'bg-cyan-50 border-cyan-200/80 shadow-inner'
                    : 'bg-slate-50 border border-slate-200/50 hover:border-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {dayProg.dataStructuresPracticeDone ? (
                    <CheckSquare className="w-5 h-5 text-cyan-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-all" />
                  )}
                </div>
                <div>
                  <span className={`text-xs leading-relaxed font-bold block ${dayProg.dataStructuresPracticeDone ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    Practice Exercise
                  </span>
                  <span className={`text-xs mt-1 block leading-relaxed ${dayProg.dataStructuresPracticeDone ? 'text-slate-400' : 'text-slate-500'}`}>
                    {selectedDay.dataStructures.practice}
                  </span>
                </div>
              </button>
            </div>

            {/* Subject study tip */}
            {selectedDay.dataStructures.tip && (
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-[11px] text-amber-850 leading-relaxed font-medium">
                  <span className="font-bold text-amber-800">Exam Tip: </span>
                  {selectedDay.dataStructures.tip}
                </p>
              </div>
            )}
          </div>

          {/* Maths Workspace Card */}
          <div id="maths-workspace-card" className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Subject 2</span>
                <h3 className="font-extrabold text-slate-800 text-base">Linear Algebra & ODE</h3>
              </div>
              <span className="text-xs font-bold text-slate-500 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200/50">
                {selectedDay.maths.unit}
              </span>
            </div>

            {/* Study Items Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Study & Learn topics</h4>
              
              <div className="space-y-2.5">
                {selectedDay.maths.studyItems.map((item, idx) => {
                  const isDone = dayProg.mathsStudyDone.includes(idx);
                  return (
                    <button
                      key={idx}
                      id={`maths-study-item-${idx}`}
                      onClick={() => toggleStudyItem('maths', idx)}
                      className="w-full text-left flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/50 hover:border-slate-300 transition-all cursor-pointer group"
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-all" />
                        )}
                      </div>
                      <span className={`text-xs leading-relaxed transition-all ${isDone ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Practical Task Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Practical Task</h4>
              
              <button
                id="maths-practice-toggle-btn"
                onClick={() => togglePractice('maths')}
                className={`w-full text-left flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                  dayProg.mathsPracticeDone
                    ? 'bg-emerald-50 border-emerald-200/80 shadow-inner'
                    : 'bg-slate-50 border border-slate-200/50 hover:border-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {dayProg.mathsPracticeDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-all" />
                  )}
                </div>
                <div>
                  <span className={`text-xs leading-relaxed font-bold block ${dayProg.mathsPracticeDone ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    Practice Exercise
                  </span>
                  <span className={`text-xs mt-1 block leading-relaxed ${dayProg.mathsPracticeDone ? 'text-slate-400' : 'text-slate-500'}`}>
                    {selectedDay.maths.practice}
                  </span>
                </div>
              </button>
            </div>

            {/* Subject study tip */}
            {selectedDay.maths.tip && (
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-[11px] text-amber-850 leading-relaxed font-medium">
                  <span className="font-bold text-amber-800">Exam Tip: </span>
                  {selectedDay.maths.tip}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 4. Daily Cheat Sheet Scratchpad (Notes) */}
        <div id="notes-scratchpad-card" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Day {selectedDay.dayNum} - Formulas & Active Recall Draft
              </h3>
              <p className="text-xs text-slate-400 font-medium">Draft equations, definitions, or algorithms from memory</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Auto-save status indicator */}
              <span className="text-xs font-mono text-slate-400 font-bold">
                {savingNotes ? (
                  <span className="flex items-center gap-1.5 text-indigo-600">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
                    Auto-saving...
                  </span>
                ) : saveSuccess ? (
                  <span className="text-emerald-600 flex items-center gap-1 font-bold">
                    <Check className="w-3 h-3" /> Auto-saved
                  </span>
                ) : (
                  "Saved in Cloud"
                )}
              </span>

              <button
                id="save-notes-btn"
                onClick={forceSaveNotes}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-all cursor-pointer shadow-sm"
                title="Force Save Notes"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            id="notes-textarea"
            value={notesText}
            onChange={handleNotesChange}
            placeholder={`Draft your one-page cheat sheet for Day ${selectedDay.dayNum} here... (e.g. define Time Complexity, Big-O properties, Matrix Row Echelon algorithms, etc.)`}
            className="w-full h-44 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 text-slate-800 placeholder-slate-400 transition-all font-mono text-xs leading-relaxed resize-y"
          ></textarea>

          <div className="mt-2.5 flex items-start gap-1.5 text-[10px] text-slate-400 font-medium">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-indigo-600" />
            <span>This notepad auto-saves as you type and persists securely to your account so you can study across any device.</span>
          </div>
        </div>

        {/* 5. Navigation buttons for quick day progression */}
        <div className="flex justify-between items-center bg-slate-100/50 border border-slate-200/80 rounded-2xl p-4">
          <button
            id="prev-day-btn"
            disabled={selectedDayNum === 1}
            onClick={() => setSelectedDayNum(prev => prev - 1)}
            className="px-4 py-2 text-xs font-bold bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
          >
            ← Previous Day
          </button>
          
          <span className="text-xs font-mono text-slate-400 font-bold">Day {selectedDayNum} / 19</span>

          <button
            id="next-day-btn"
            disabled={selectedDayNum === STUDY_PLAN.length}
            onClick={() => setSelectedDayNum(prev => prev + 1)}
            className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 rounded-xl text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            Next Day
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
