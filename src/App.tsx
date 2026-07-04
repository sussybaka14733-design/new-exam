import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { DayProgressDoc } from './types';
import Auth from './components/Auth';
import DailyBoard from './components/DailyBoard';
import Dashboard from './components/Dashboard';
import { STUDY_PLAN } from './data/plan';
import { 
  LogOut, 
  Calendar, 
  Clock, 
  LayoutDashboard, 
  BookOpen, 
  Zap, 
  Percent, 
  ChevronRight, 
  Sparkles,
  BookMarked
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [progress, setProgress] = useState<Record<number, DayProgressDoc>>({});
  const [activeTab, setActiveTab] = useState<'board' | 'dashboard'>('board');

  // 1. Listen for user authentication state changes & local session fallbacks
  useEffect(() => {
    // Check if there is an active offline session
    const storedOfflineUser = localStorage.getItem('offline_user');
    if (storedOfflineUser) {
      try {
        setUser(JSON.parse(storedOfflineUser));
        setAuthLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('offline_user');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!localStorage.getItem('offline_user')) {
        setUser(firebaseUser);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Listen to real-time progress updates from Firestore (or LocalStorage)
  useEffect(() => {
    if (!user) {
      setProgress({});
      return;
    }

    // Load from LocalStorage immediately for responsive, instant loading & offline support
    const localDataStr = localStorage.getItem(`progress_${user.uid}`);
    if (localDataStr) {
      try {
        setProgress(JSON.parse(localDataStr));
      } catch (e) {
        console.error("Failed to parse cached local progress", e);
      }
    }

    if (user.isOffline) {
      return;
    }

    const q = collection(db, 'users', user.uid, 'progress');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedProgress: Record<number, DayProgressDoc> = {};
      snapshot.forEach((doc) => {
        const data = doc.data() as DayProgressDoc;
        fetchedProgress[data.dayNum] = data;
      });
      setProgress(fetchedProgress);
      // Cache progress to LocalStorage for offline capability
      localStorage.setItem(`progress_${user.uid}`, JSON.stringify(fetchedProgress));
    }, (error) => {
      console.error("Firestore snapshot listener error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // 3. Callback to update progress in Firestore & LocalStorage
  const handleUpdateProgress = async (dayNum: number, updatedFields: Partial<DayProgressDoc>) => {
    if (!user) return;

    const existingProgress = progress[dayNum] || {
      dayNum,
      attendanceChecked: false,
      dataStructuresStudyDone: [],
      dataStructuresPracticeDone: false,
      mathsStudyDone: [],
      mathsPracticeDone: false,
      notes: '',
    };

    const mergedData = {
      ...existingProgress,
      ...updatedFields,
      updatedAt: new Date().toISOString()
    };

    // Update state instantly so the UI is extremely snappy and doesn't lag
    const nextProgress = {
      ...progress,
      [dayNum]: mergedData
    };
    setProgress(nextProgress);
    localStorage.setItem(`progress_${user.uid}`, JSON.stringify(nextProgress));

    if (user.isOffline) {
      return;
    }

    const docId = `day_${dayNum}`;
    const docRef = doc(db, 'users', user.uid, 'progress', docId);

    try {
      await setDoc(docRef, mergedData);
    } catch (error) {
      console.error("Error saving progress to Firestore:", error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('offline_user');
      setUser(null);
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Calculate high-level progress statistics for header HUD
  const overallPercentage = (() => {
    let totalItems = 0;
    let completedItems = 0;

    STUDY_PLAN.forEach((day) => {
      const dayProg = progress[day.dayNum];
      const totalDS = day.dataStructures.studyItems.length + 1; // study + practice
      const totalMaths = day.maths.studyItems.length + 1; // study + practice

      totalItems += totalDS + totalMaths;

      if (dayProg) {
        completedItems += (dayProg.dataStructuresStudyDone?.length || 0) +
                           (dayProg.dataStructuresPracticeDone ? 1 : 0) +
                           (dayProg.mathsStudyDone?.length || 0) +
                           (dayProg.mathsPracticeDone ? 1 : 0);
      }
    });

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  })();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-sm font-semibold tracking-wide text-slate-600">Syncing study schedules...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onOfflineLogin={(offlineUser) => setUser(offlineUser)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Upper Brand Indicator / Subtle Info Header */}
      <div className="border-b border-indigo-100 py-1.5 px-4 text-center text-[10px] sm:text-xs text-indigo-700 font-semibold tracking-wide flex items-center justify-center gap-1.5 bg-indigo-50/55">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse animate-duration-1000" />
        <span>Banwarilal Bhalotia College (KNU) • Semester 2 Exam Prep Dashboard</span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo / Student Greetings */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                {user.displayName || 'Abhisekh'}'s Exam Board
              </h1>
              <p className="text-xs text-slate-500 font-medium">19-Day Intensive Roadmap • July 4 – July 22</p>
            </div>
          </div>

          {/* HUD Progress & Controls */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            
            {/* Overall HUD Progress Circle / bar */}
            <div className="flex items-center gap-3 bg-slate-100/50 px-4 py-2 border border-slate-200/80 rounded-2xl">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Overall Done</span>
                <span className="text-sm font-bold text-indigo-600">{overallPercentage}%</span>
              </div>
              <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Logout Trigger */}
            <button
              id="logout-btn"
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>

          </div>
        </div>
      </header>

      {/* Primary Dashboard Layout / Controls */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80 max-w-md shadow-sm">
          <button
            id="tab-board-btn"
            onClick={() => setActiveTab('board')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'board'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Daily Study Board
          </button>
          
          <button
            id="tab-dashboard-btn"
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Visual Progress Charts
          </button>
        </div>

        {/* Dynamic View Panel */}
        <div className="transition-all duration-300">
          {activeTab === 'board' ? (
            <DailyBoard 
              progress={progress} 
              onUpdateProgress={handleUpdateProgress} 
            />
          ) : (
            <Dashboard 
              progress={progress} 
            />
          )}
        </div>

      </main>

      {/* Footer Branding */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white relative z-10 mt-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Abhisekh Exam Prep Portal. Prepared for B.Sc CS Semester 2.</p>
          <div className="flex gap-4 text-slate-600 font-semibold">
            <span>Data Structures</span>
            <span>•</span>
            <span>Linear Algebra & ODE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
