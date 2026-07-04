import { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area,
  LineChart,
  Line
} from 'recharts';
import { STUDY_PLAN } from '../data/plan';
import { DayProgressDoc } from '../types';
import { 
  CheckCircle, 
  Award, 
  Calendar, 
  BookOpen, 
  Percent, 
  Zap, 
  TrendingUp, 
  ChevronRight 
} from 'lucide-react';

interface DashboardProps {
  progress: Record<number, DayProgressDoc>;
}

export default function Dashboard({ progress }: DashboardProps) {
  // 1. Calculate Statistics
  const stats = useMemo(() => {
    let totalDSStudy = 0;
    let completedDSStudy = 0;
    let totalDSPractice = STUDY_PLAN.length;
    let completedDSPractice = 0;

    let totalMathsStudy = 0;
    let completedMathsStudy = 0;
    let totalMathsPractice = STUDY_PLAN.length;
    let completedMathsPractice = 0;

    let attendanceCount = 0;

    // Calculate phase-wise progress
    const phaseStats = {
      1: { name: "Foundations", total: 0, done: 0, days: 0 },
      2: { name: "Core Buildout", total: 0, done: 0, days: 0 },
      3: { name: "Heavy Topics", total: 0, done: 0, days: 0 },
      4: { name: "Final Push", total: 0, done: 0, days: 0 }
    };

    STUDY_PLAN.forEach((day) => {
      const dayProg = progress[day.dayNum];
      const dsStudyCount = day.dataStructures.studyItems.length;
      const mathsStudyCount = day.maths.studyItems.length;

      totalDSStudy += dsStudyCount;
      totalMathsStudy += mathsStudyCount;

      const pNum = day.phaseNum as 1 | 2 | 3 | 4;
      phaseStats[pNum].days += 1;
      
      // Data Structures study items completed for this day
      const dsStudyDoneThisDay = dayProg?.dataStructuresStudyDone?.length || 0;
      completedDSStudy += dsStudyDoneThisDay;

      // Maths study items completed for this day
      const mathsStudyDoneThisDay = dayProg?.mathsStudyDone?.length || 0;
      completedMathsStudy += mathsStudyDoneThisDay;

      // Practice tasks
      const dsPracticeDone = dayProg?.dataStructuresPracticeDone ? 1 : 0;
      completedDSPractice += dsPracticeDone;

      const mathsPracticeDone = dayProg?.mathsPracticeDone ? 1 : 0;
      completedMathsPractice += mathsPracticeDone;

      // Attendance
      if (dayProg?.attendanceChecked) {
        attendanceCount += 1;
      }

      // Phase totals: total checkable items (study topics + practice task)
      const totalItemsThisDay = dsStudyCount + 1 + mathsStudyCount + 1;
      const doneItemsThisDay = dsStudyDoneThisDay + dsPracticeDone + mathsStudyDoneThisDay + mathsPracticeDone;

      phaseStats[pNum].total += totalItemsThisDay;
      phaseStats[pNum].done += doneItemsThisDay;
    });

    const totalDSTasks = totalDSStudy + totalDSPractice;
    const completedDSTasks = completedDSStudy + completedDSPractice;

    const totalMathsTasks = totalMathsStudy + totalMathsPractice;
    const completedMathsTasks = completedMathsStudy + completedMathsPractice;

    const totalTasks = totalDSTasks + totalMathsTasks;
    const completedTasks = completedDSTasks + completedMathsTasks;

    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const dsProgress = totalDSTasks > 0 ? Math.round((completedDSTasks / totalDSTasks) * 100) : 0;
    const mathsProgress = totalMathsTasks > 0 ? Math.round((completedMathsTasks / totalMathsTasks) * 100) : 0;
    const attendanceProgress = Math.round((attendanceCount / STUDY_PLAN.length) * 100);

    return {
      overallProgress,
      dsProgress,
      mathsProgress,
      attendanceProgress,
      attendanceCount,
      completedDSStudy,
      totalDSStudy,
      completedDSPractice,
      totalDSPractice,
      completedMathsStudy,
      totalMathsStudy,
      completedMathsPractice,
      totalMathsPractice,
      phaseStats: Object.values(phaseStats),
    };
  }, [progress]);

  // 2. Prepare Data for Subject Comparison Chart
  const subjectChartData = useMemo(() => {
    const dsStudyPercent = stats.totalDSStudy > 0 ? Math.round((stats.completedDSStudy / stats.totalDSStudy) * 100) : 0;
    const mathsStudyPercent = stats.totalMathsStudy > 0 ? Math.round((stats.completedMathsStudy / stats.totalMathsStudy) * 100) : 0;

    const dsPracticePercent = stats.totalDSPractice > 0 ? Math.round((stats.completedDSPractice / stats.totalDSPractice) * 100) : 0;
    const mathsPracticePercent = stats.totalMathsPractice > 0 ? Math.round((stats.completedMathsPractice / stats.totalMathsPractice) * 100) : 0;

    return [
      {
        name: 'Study Topics',
        'Data Structures': dsStudyPercent,
        'Maths (LA & ODE)': mathsStudyPercent,
      },
      {
        name: 'Practice Tasks',
        'Data Structures': dsPracticePercent,
        'Maths (LA & ODE)': mathsPracticePercent,
      },
      {
        name: 'Overall Subject',
        'Data Structures': stats.dsProgress,
        'Maths (LA & ODE)': stats.mathsProgress,
      }
    ];
  }, [stats]);

  // 3. Prepare Data for Day-by-Day Burn-up Chart
  const burnUpChartData = useMemo(() => {
    let accumulatedTotal = 0;
    let accumulatedDone = 0;

    return STUDY_PLAN.map((day) => {
      const dayProg = progress[day.dayNum];
      const dsStudyCount = day.dataStructures.studyItems.length;
      const mathsStudyCount = day.maths.studyItems.length;

      const dsStudyDone = dayProg?.dataStructuresStudyDone?.length || 0;
      const mathsStudyDone = dayProg?.mathsStudyDone?.length || 0;
      const dsPracticeDone = dayProg?.dataStructuresPracticeDone ? 1 : 0;
      const mathsPracticeDone = dayProg?.mathsPracticeDone ? 1 : 0;

      const dailyTotal = dsStudyCount + 1 + mathsStudyCount + 1;
      const dailyDone = dsStudyDone + dsPracticeDone + mathsStudyDone + mathsPracticeDone;

      accumulatedTotal += dailyTotal;
      accumulatedDone += dailyDone;

      const percent = accumulatedTotal > 0 ? Math.round((accumulatedDone / accumulatedTotal) * 100) : 0;

      return {
        dayLabel: `Day ${day.dayNum}`,
        'Completion %': percent,
        'Checked Topics': dailyDone,
      };
    });
  }, [progress]);

  // Calculate study streak
  const streak = useMemo(() => {
    let currentStreak = 0;
    let maxStreak = 0;
    // Iterate from Day 1 to 19 to compute consecutive checkins
    for (let i = 1; i <= STUDY_PLAN.length; i++) {
      if (progress[i]?.attendanceChecked) {
        currentStreak++;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    }
    // Calculate current running streak looking backward from the plan progress
    let runningStreak = 0;
    // Let's assume today is Day 1 of July 4. Let's just find the last continuous streak of attendance
    // up to the latest checked day
    for (let i = STUDY_PLAN.length; i >= 1; i--) {
      if (progress[i]?.attendanceChecked) {
        runningStreak++;
      } else if (runningStreak > 0) {
        // Break once the streak ends
        break;
      }
    }
    return { runningStreak, maxStreak };
  }, [progress]);

  return (
    <div id="dashboard-container" className="space-y-6">
      {/* 1. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Completion */}
        <div id="stat-card-overall" className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-4 hover:border-slate-300 transition-all shadow-sm">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100/50">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Overall Plan Progress</p>
            <h3 className="text-2xl font-black text-slate-800 mt-0.5">{stats.overallProgress}%</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Study + Practice tasks</p>
          </div>
        </div>

        {/* Data Structures Progress */}
        <div id="stat-card-ds" className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-4 hover:border-slate-300 transition-all shadow-sm">
          <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl border border-cyan-100/50">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Data Structures</p>
            <h3 className="text-2xl font-black text-slate-800 mt-0.5">{stats.dsProgress}%</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {stats.completedDSStudy + stats.completedDSPractice} / {stats.totalDSStudy + stats.totalDSPractice} tasks
            </p>
          </div>
        </div>

        {/* Maths Progress */}
        <div id="stat-card-maths" className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-4 hover:border-slate-300 transition-all shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100/50">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Maths (LA & ODE)</p>
            <h3 className="text-2xl font-black text-slate-800 mt-0.5">{stats.mathsProgress}%</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {stats.completedMathsStudy + stats.completedMathsPractice} / {stats.totalMathsStudy + stats.totalMathsPractice} tasks
            </p>
          </div>
        </div>

        {/* Daily Login / Check-In Attendance */}
        <div id="stat-card-streak" className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-4 hover:border-slate-300 transition-all shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100/50">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Check-in Attendance</p>
            <h3 className="text-2xl font-black text-slate-800 mt-0.5">
              {stats.attendanceCount} <span className="text-sm font-semibold text-slate-500">/ 19 Days</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Streak: {streak.runningStreak} day{streak.runningStreak === 1 ? '' : 's'} (Max: {streak.maxStreak})
            </p>
          </div>
        </div>
      </div>

      {/* 2. Visual Charts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart A: Day-by-Day Progression Curve */}
        <div id="chart-card-progression" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                19-Day Progression Curve
              </h3>
              <p className="text-xs text-slate-400 font-medium">Cumulative plan completion rate day-over-day</p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100/50">Target: 100%</span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={burnUpChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '16px', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#475569', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="Completion %" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCompletion)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Subject Comparison (Data Structures vs Maths) */}
        <div id="chart-card-subject" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-600" />
                Data Structures vs Maths
              </h3>
              <p className="text-xs text-slate-400 font-medium">Breakdown of study topics and practical exercises</p>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" domain={[0, 100]} fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '16px', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600, color: '#475569' }} />
                <Bar dataKey="Data Structures" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Maths (LA & ODE)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Phase-wise Progress breakdown */}
      <div id="phases-progress-section" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          Study Plan Phases Progress
        </h3>

        <div className="space-y-4">
          {stats.phaseStats.map((phase, idx) => {
            const phasePercent = phase.total > 0 ? Math.round((phase.done / phase.total) * 100) : 0;
            return (
              <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/50 hover:bg-slate-100/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">Phase {idx + 1}</span>
                      {phase.name}
                    </h4>
                    <span className="text-xs font-bold text-slate-500">{phasePercent}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        idx === 0 ? 'bg-indigo-600' :
                        idx === 1 ? 'bg-cyan-600' :
                        idx === 2 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${phasePercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 text-xs text-slate-500 font-mono">
                  <div>
                    <span className="block text-slate-400 text-[10px] uppercase font-bold">Duration</span>
                    <span className="text-slate-700 font-bold">{phase.days} Days</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px] uppercase font-bold">Status</span>
                    <span className="text-slate-700 font-bold">{phase.done} / {phase.total} Tasks</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
