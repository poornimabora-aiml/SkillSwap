import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function Login({ setActivePage }) {
  const { login, quickSwitchUser, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      setActivePage('dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const demoAccounts = [
    { name: 'Alice Johnson', email: 'alice@skillswap.edu', note: 'Teaches Python, wants Design (Reciprocal Match with Bob)' },
    { name: 'Bob Smith', email: 'bob@skillswap.edu', note: 'Teaches Design, wants Python (100% Mutual Match)' },
    { name: 'Poornima Bora', email: 'poornima@skillswap.edu', note: 'Project Creator (Teaches AI & Database)' }
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Sign In to SkillSwap
        </h1>
        <p className="text-xs text-slate-400">
          Access your two-way skill exchange dashboard and proposals
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-slate-900/90 p-8 sm:p-9 rounded-3xl border border-white/[0.08] backdrop-blur-2xl shadow-2xl space-y-6">
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alice@skillswap.edu"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
                Password
              </label>
              <span className="text-[10px] text-indigo-400 font-semibold">
                Demo: password123
              </span>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Switcher Section */}
        <div className="pt-4 border-t border-white/[0.08] space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-black text-indigo-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Fast 1-Click Demo Profiles</span>
          </div>
          <div className="space-y-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                onClick={async () => {
                  setEmail(acc.email);
                  setPassword('password123');
                  await quickSwitchUser(acc.email);
                  setActivePage('dashboard');
                }}
                className="w-full p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-indigo-500/40 text-left transition-all text-xs flex flex-col group"
              >
                <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">{acc.name}</div>
                <div className="text-[10px] text-slate-400">{acc.note}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Register CTA */}
        <div className="text-center text-xs text-slate-400 pt-2">
          Don't have an account yet?{' '}
          <button
            onClick={() => setActivePage('register')}
            className="font-bold text-indigo-400 hover:underline"
          >
            Register Free
          </button>
        </div>
      </div>

    </div>
  );
}
