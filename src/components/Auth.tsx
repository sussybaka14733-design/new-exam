import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously,
  updateProfile 
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { LogIn, UserPlus, Sparkles, BookOpen, AlertCircle, ShieldAlert } from 'lucide-react';

interface AuthProps {
  onOfflineLogin?: (offlineUser: { uid: string; displayName: string; email?: string; isOffline: boolean }) => void;
}

export default function Auth({ onOfflineLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        if (!fullName.trim()) {
          setError('Please enter your name.');
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;
        
        await updateProfile(user, {
          displayName: fullName.trim(),
        });

        // Initialize user profile document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email || '',
          displayName: fullName.trim(),
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      console.error(err);
      let friendlyMessage = 'Authentication failed. Please check your details.';
      if (err.code === 'auth/email-already-in-use') {
        friendlyMessage = 'This email is already registered. Try logging in instead.';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        friendlyMessage = 'Invalid email or password. Please try again.';
      } else if (err.code === 'auth/weak-password') {
        friendlyMessage = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        friendlyMessage = 'Please enter a valid email address.';
      }
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = async () => {
    setError('');
    setLoading(true);
    try {
      // Attempt Firebase Anonymous Login first
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      
      await updateProfile(user, {
        displayName: 'Abhisekh (Guest)',
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: 'guest@example.com',
        displayName: 'Abhisekh (Guest)',
        createdAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.warn("Firebase guest sign-in failed, launching with ultra-reliable local/offline fallback mode:", err);
      // Local/Offline guest fallback mode
      const offlineUser = {
        uid: 'guest_abhisekh',
        displayName: 'Abhisekh (Guest)',
        email: 'guest@example.com',
        isOffline: true
      };
      localStorage.setItem('offline_user', JSON.stringify(offlineUser));
      if (onOfflineLogin) {
        onOfflineLogin(offlineUser);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-container" className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 p-4 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 border border-indigo-100">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 id="auth-title" className="text-2xl font-bold tracking-tight text-slate-800 mb-2 text-center">
            KNU Exam Prep Board
          </h1>
          <p className="text-slate-500 text-sm text-center">
            19-Day Intensive Study Planner & Progress Tracker
          </p>
        </div>

        {error && (
          <div id="auth-error" className="flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl mb-6 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                id="auth-input-fullname"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-900 transition-all text-sm"
                placeholder="Abhisekh"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              id="auth-input-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-900 transition-all text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              id="auth-input-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-900 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition-all shadow-sm disabled:opacity-50 text-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : isLogin ? (
              <>
                <LogIn className="w-4 h-4" />
                Sign In to My Plan
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Create Account & Start
              </>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-400 font-semibold">Or quick launch</span>
          </div>
        </div>

        <button
          id="auth-guest-btn"
          onClick={handleGuestAccess}
          disabled={loading}
          className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl border border-slate-200 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          Access as Abhisekh (Demo Account)
        </button>

        <div className="mt-6 text-center">
          <button
            id="auth-toggle-mode"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-all"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
