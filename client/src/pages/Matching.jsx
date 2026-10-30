import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  ArrowRightLeft, Sparkles, CheckCircle2, AlertCircle, 
  HelpCircle, Star, ArrowRight, ShieldCheck, MapPin, 
  Layers, Zap, Cpu, Compass
} from 'lucide-react';

export default function Matching({ setActivePage, onOpenExchange, setSelectedProfileUser }) {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'reciprocal' | 'oneway'

  const fetchMatches = async () => {
    if (!user?.user_id) return;
    setLoading(true);
    try {
      const data = await api.getMatchRecommendations(user.user_id);
      setRecommendations(data.matches || []);
    } catch (err) {
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [user?.user_id]);

  const filteredMatches = recommendations.filter((m) => {
    if (filterType === 'reciprocal') return m.is_reciprocal;
    if (filterType === 'oneway') return !m.is_reciprocal;
    return true;
  });

  const mutualCount = recommendations.filter(m => m.is_reciprocal).length;
  const oneWayCount = recommendations.filter(m => !m.is_reciprocal).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title & Engine Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-indigo-500/40 text-indigo-300 text-xs font-black shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Core DBE Relational Algorithm</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Two-Way Relational Matching Engine
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Our PostgreSQL DBE engine computes bidirectional set intersections between what you teach and what community partners seek, assigning verified compatibility scores.
        </p>
      </div>

      {/* MATCHING CRITERIA SPECIFICATION BOX (Mandated for DBE evaluation) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Mathematical Relational Matching Criteria
          </span>
          <span className="text-[11px] text-slate-500 font-mono">Algorithm v2.4 (Strict 3NF)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/40 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
              <CheckCircle2 className="w-4 h-4" />
              100% Perfect Mutual Match (Reciprocal)
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Condition:</strong> User A can teach at least one skill User B wants to learn <strong className="text-emerald-400">AND</strong> User B can teach at least one skill User A wants to learn.
            </p>
            <div className="font-mono text-[11px] text-emerald-300 bg-slate-900/80 p-2.5 rounded-xl border border-emerald-500/20">
              (Teaches(A) ∩ Learns(B) ≠ ∅) ∧ (Teaches(B) ∩ Learns(A) ≠ ∅)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/40 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
              <AlertCircle className="w-4 h-4" />
              50% One-Way Match (Non-Reciprocal)
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Condition:</strong> Only one direction intersects. You can teach them, but they do not teach what you currently need (or vice versa). Allowed but clearly marked as non-reciprocal.
            </p>
            <div className="font-mono text-[11px] text-amber-300 bg-slate-900/80 p-2.5 rounded-xl border border-amber-500/20">
              (Teaches(A) ∩ Learns(B) ≠ ∅) ⊕ (Teaches(B) ∩ Learns(A) ≠ ∅)
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/70 p-3.5 rounded-2xl border border-white/[0.08] backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            All Potential Pairings ({recommendations.length})
          </button>
          
          <button
            onClick={() => setFilterType('reciprocal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'reciprocal'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                : 'text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-500/30'
            }`}
          >
            100% Mutual Reciprocal ({mutualCount})
          </button>
          
          <button
            onClick={() => setFilterType('oneway')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'oneway'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/25'
                : 'text-amber-400 bg-amber-950/40 hover:bg-amber-950/80 border border-amber-500/30'
            }`}
          >
            50% One-Way Partial ({oneWayCount})
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Evaluated for: <strong className="text-indigo-400 font-bold">{user?.full_name}</strong>
        </div>
      </div>

      {/* Match Cards List */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Computing relational intersections in database...</p>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="p-14 text-center rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl space-y-4">
          <ArrowRightLeft className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No compatible exchange partners found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Broaden your barter graph by adding more skills to your profile's "Can Teach" and "Want to Learn" lists.
          </p>
          <button
            onClick={() => setActivePage('profile')}
            className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-colors shadow-lg"
          >
            Update Your Profile Skills
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredMatches.map((match) => (
            <div
              key={match.partner_id}
              className={`p-6 sm:p-8 rounded-3xl bg-slate-900/80 border backdrop-blur-xl transition-all duration-300 relative overflow-hidden ${
                match.is_reciprocal
                  ? 'border-emerald-500/40 shadow-xl shadow-emerald-950/30 hover:border-emerald-400'
                  : 'border-white/[0.08] hover:border-white/20'
              }`}
            >
              {/* Highlight ribbon for 100% */}
              {match.is_reciprocal && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  100% Perfect 2-Way Match
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Partner Info Column */}
                <div className="lg:col-span-4 flex items-center gap-4">
                  <img
                    src={match.partner_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${match.partner_name}`}
                    alt={match.partner_name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40"
                  />
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white">
                      {match.partner_name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      <span>{match.partner_location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{match.rating}</span>
                      <span className="text-[10px] text-slate-500">({match.total_reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Relational Intersections Flow Column */}
                <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-3">
                  
                  {/* Flow 1: You Teach Them */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      You Teach Them:
                    </span>
                    <span className="font-semibold text-white">
                      {match.you_teach_them?.length > 0 ? (
                        match.you_teach_them.map(s => s.skill_name).join(', ')
                      ) : (
                        <span className="text-slate-500 italic">None matched</span>
                      )}
                    </span>
                  </div>

                  {/* Flow 2: They Teach You */}
                  <div className="flex items-center justify-between text-xs pt-2.5 border-t border-white/[0.06]">
                    <span className="font-bold text-purple-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      They Teach You:
                    </span>
                    <span className="font-semibold text-white">
                      {match.they_teach_you?.length > 0 ? (
                        match.they_teach_you.map(s => s.skill_name).join(', ')
                      ) : (
                        <span className="text-slate-500 italic">None matched</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Score & Action Column */}
                <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center gap-3">
                  {/* Score Badge */}
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-black ${
                        match.is_reciprocal ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {match.match_percentage}%
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        match.is_reciprocal
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {match.compatibility_label}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setSelectedProfileUser(match.partner_id);
                        setActivePage('profile-view');
                      }}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      Profile
                    </button>
                    
                    <button
                      onClick={() => onOpenExchange({
                        ...match,
                        user_id: match.partner_id,
                        user_name: match.partner_name,
                        user_avatar: match.partner_avatar,
                        skill_id: match.they_teach_you?.[0]?.skill_id
                      })}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black text-white transition-all flex items-center gap-1.5 shadow-lg ${
                        match.is_reciprocal
                          ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25'
                          : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25'
                      }`}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                      <span>Request Swap</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
