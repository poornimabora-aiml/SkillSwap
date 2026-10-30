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
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign In to SkillSwap
        </h1>
        <p className="text-xs text-slate-600">
          Access your two-way skill exchange dashboard and proposals
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {error && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-600 absolute left-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alice@skillswap.edu"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Password
              </label>
              <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer">
                Demo: password123
              </span>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-600 absolute left-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Switcher Section */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
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
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all text-xs flex flex-col"
              >
                <div className="font-bold text-slate-900">{acc.name}</div>
                <div className="text-[10px] text-slate-600">{acc.note}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Register CTA */}
        <div className="text-center text-xs text-slate-600 pt-2">
          Don't have an account yet?{' '}
          <button
            onClick={() => setActivePage('register')}
            className="font-bold text-indigo-600 hover:underline"
          >
            Register Free
          </button>
        </div>
      </div>

    </div>
  );
}
