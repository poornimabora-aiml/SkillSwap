import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  ArrowRightLeft, Sparkles, CheckCircle2, AlertCircle, 
  HelpCircle, Star, ArrowRight, ShieldCheck, MapPin 
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title & Engine Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-300 text-indigo-700 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Core DBE Relational Feature</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Two-Way Skill Matching Engine
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Our relational algorithm analyzes set intersections between what you teach and what prospective partners want to learn, computing strictly enforced compatibility scores.
        </p>
      </div>

      {/* MATCHING CRITERIA SPECIFICATION BOX (Mandated for DBE evaluation) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Mathematical Relational Matching Rules
          </span>
          <span className="text-[11px] text-slate-400 font-mono">DBE Rule Specification v2.4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              100% Perfect Mutual Match (Reciprocal)
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Condition:</strong> User A can teach at least one skill User B wants to learn <strong className="text-emerald-400">AND</strong> User B can teach at least one skill User A wants to learn.
            </p>
            <div className="font-mono text-[11px] text-indigo-300 bg-slate-950 p-2 rounded-lg">
              (Teaches(A) ∩ Learns(B) ≠ ∅) ∧ (Teaches(B) ∩ Learns(A) ≠ ∅)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              50% One-Way Match (Non-Reciprocal)
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Condition:</strong> Only one direction intersects. You can teach them, but they do not currently teach any skill you have listed (or vice versa). Requests are permitted but clearly labeled.
            </p>
            <div className="font-mono text-[11px] text-amber-300 bg-slate-950 p-2 rounded-lg">
              (Teaches(A) ∩ Learns(B) ≠ ∅) ⊕ (Teaches(B) ∩ Learns(A) ≠ ∅)
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Potential Matches ({recommendations.length})
          </button>
          <button
            onClick={() => setFilterType('reciprocal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'reciprocal'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            100% Mutual Reciprocal ({mutualCount})
          </button>
          <button
            onClick={() => setFilterType('oneway')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'oneway'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            50% One-Way Partial ({oneWayCount})
          </button>
        </div>

        <div className="text-xs text-slate-600">
          Showing pairings for: <strong className="text-indigo-600 font-bold">{user?.full_name}</strong>
        </div>
      </div>

      {/* Match Cards List */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-600">Evaluating relational set intersections...</p>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-4">
          <ArrowRightLeft className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No compatible exchange partners found</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Try adding more skills to your "Can Teach" or "Want to Learn" profile lists to broaden your match graph.
          </p>
          <button
            onClick={() => setActivePage('profile')}
            className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700"
          >
            Update Your Profile Skills
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredMatches.map((match) => (
            <div
              key={match.partner_id}
              className={`p-6 sm:p-8 rounded-3xl bg-white border shadow-sm transition-all duration-300 relative overflow-hidden ${
                match.is_reciprocal
                  ? 'border-emerald-300 hover:shadow-xl hover:border-emerald-400'
                  : 'border-slate-200 hover:shadow-md'
              }`}
            >
              {/* Highlight ribbon for 100% */}
              {match.is_reciprocal && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Perfect 2-Way Match
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Partner Info Column */}
                <div className="lg:col-span-4 flex items-center gap-4">
                  <img
                    src={match.partner_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${match.partner_name}`}
                    alt={match.partner_name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                  />
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {match.partner_name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-600" />
                      <span>{match.partner_location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{match.rating}</span>
                      <span className="text-[10px] text-slate-600">({match.total_reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Relational Intersections Flow Column */}
                <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  
                  {/* Flow 1: You Teach Them */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      You Teach Them:
                    </span>
                    <span className="font-bold text-slate-900">
                      {match.you_teach_them?.length > 0 ? (
                        match.you_teach_them.map(s => s.skill_name).join(', ')
                      ) : (
                        <span className="text-slate-600 italic">None matched</span>
                      )}
                    </span>
                  </div>

                  {/* Flow 2: They Teach You */}
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                    <span className="font-semibold text-purple-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      They Teach You:
                    </span>
                    <span className="font-bold text-slate-900">
                      {match.they_teach_you?.length > 0 ? (
                        match.they_teach_you.map(s => s.skill_name).join(', ')
                      ) : (
                        <span className="text-slate-600 italic">None matched</span>
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
                        match.is_reciprocal ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {match.match_percentage}%
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        match.is_reciprocal
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
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
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
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
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-md ${
                        match.is_reciprocal
                          ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                          : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
                      }`}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                      <span>Request Exchange</span>
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
