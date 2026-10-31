import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  User, MapPin, Mail, Calendar, ArrowRightLeft, CheckCircle2, 
  Clock, Check, X, Star, Sparkles, Plus, AlertCircle, ChevronRight, Zap 
} from 'lucide-react';

export default function Dashboard({ setActivePage, onOpenExchange, setSelectedProfileUser }) {
  const { user, reloadUser } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [requests, setRequests] = useState({ received: [], sent: [] });
  const [exchanges, setExchanges] = useState({ active: [], completed: [] });
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    if (!user?.user_id) return;
    setLoading(true);
    try {
      const [matchesData, reqsData, exchsData] = await Promise.all([
        api.getMatchRecommendations(user.user_id).catch(() => ({ matches: [] })),
        api.getMyRequests(user.user_id).catch(() => ({ received: [], sent: [] })),
        api.getUserExchanges(user.user_id).catch(() => ({ active: [], completed: [], all: [] }))
      ]);

      const safeMatches = Array.isArray(matchesData?.matches)
        ? matchesData.matches
        : (Array.isArray(matchesData) ? matchesData : []);
      setRecommendations(safeMatches);

      setRequests({
        received: Array.isArray(reqsData?.received) ? reqsData.received : [],
        sent: Array.isArray(reqsData?.sent) ? reqsData.sent : []
      });

      setExchanges({
        active: Array.isArray(exchsData?.active) ? exchsData.active : [],
        completed: Array.isArray(exchsData?.completed) ? exchsData.completed : [],
        all: Array.isArray(exchsData?.all) ? exchsData.all : []
      });
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user?.user_id]);

  const handleRequestStatus = async (requestId, status) => {
    try {
      await api.updateRequestStatus(requestId, status);
      await loadDashboardData();
      await reloadUser();
    } catch (err) {
      alert(err.message || 'Error updating request');
    }
  };

  const pendingReceived = Array.isArray(requests?.received)
    ? requests.received.filter(r => r && r.status === 'Pending')
    : [];

  const teachSkills = Array.isArray(user?.teach_skills) && user.teach_skills.length > 0
    ? user.teach_skills
    : (Array.isArray(user?.skills_teach) ? user.skills_teach : []);

  const learnSkills = Array.isArray(user?.learn_skills) && user.learn_skills.length > 0
    ? user.learn_skills
    : (Array.isArray(user?.skills_learn) ? user.skills_learn : []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome & Profile Summary Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          {/* User Bio & Meta */}
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.full_name}`}
              alt={user?.full_name}
              className="w-20 h-20 rounded-3xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Welcome back, {user?.full_name}!
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider">
                  Active Exchanger
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  {user?.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  {user?.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-slate-300 max-w-xl pt-1 italic">
                "{user?.bio || 'Passionate about sharing knowledge and mastering new domains.'}"
              </p>
            </div>
          </div>

          {/* Quick Edit CTA */}
          <button
            onClick={() => setActivePage('profile')}
            className="px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors shadow-lg self-start md:self-auto"
          >
            Manage Skills & Profile
          </button>
        </div>

        {/* Dashboard Counter Metrics HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/[0.08]">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Pending Requests</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">{pendingReceived.length}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Exchanges</span>
            <span className="text-2xl font-black text-indigo-400 mt-1 block">
              {Array.isArray(exchanges?.active) ? exchanges.active.length : 0}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Completed Swaps</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">
              {Array.isArray(exchanges?.completed) ? exchanges.completed.length : 0}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Mutual Matches</span>
            <span className="text-2xl font-black text-purple-400 mt-1 block">
              {Array.isArray(recommendations) ? recommendations.filter(r => r && (r.is_reciprocal || r.match_percentage === 100)).length : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Skills Showcase Grid (Teach & Learn) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Skills I Can Teach */}
        <div className="bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500"></span>
              Skills I Can Teach (Offerings)
            </h2>
            <button
              onClick={() => setActivePage('profile')}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Skill
            </button>
          </div>

          {teachSkills.length > 0 ? (
            <div className="space-y-2.5">
              {teachSkills.map((s, idx) => (
                <div
                  key={s.user_skill_id || s.skill_id || idx}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-indigo-500/20 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{s.skill_name || 'Skill'}</div>
                    <div className="text-[10px] text-indigo-400">{s.category || 'Domain'}</div>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {s.proficiency_level || 'Proficient'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/40 rounded-2xl border border-white/[0.04]">
              No teaching skills added yet. Click "+ Add Skill" to start offering lessons.
            </div>
          )}
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500"></span>
              Skills I Want to Learn (Targets)
            </h2>
            <button
              onClick={() => setActivePage('profile')}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Target
            </button>
          </div>

          {learnSkills.length > 0 ? (
            <div className="space-y-2.5">
              {learnSkills.map((s, idx) => (
                <div
                  key={s.user_skill_id || s.skill_id || idx}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-purple-500/20 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{s.skill_name || 'Skill'}</div>
                    <div className="text-[10px] text-purple-400">{s.category || 'Domain'}</div>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                    Target: {s.proficiency_level || 'Beginner'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/40 rounded-2xl border border-white/[0.04]">
              No learning goals added yet. Add what you wish to learn!
            </div>
          )}
        </div>

      </div>

      {/* PENDING INCOMING EXCHANGE PROPOSALS */}
      {pendingReceived.length > 0 && (
        <div className="bg-amber-950/30 border border-amber-500/40 p-6 sm:p-7 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>Pending Exchange Proposals ({pendingReceived.length})</span>
            </div>
            <button
              onClick={() => setActivePage('exchanges')}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              Manage all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingReceived.map((req) => (
              <div key={req.request_id} className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.requester_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${req.requester_name}`}
                      alt={req.requester_name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{req.requester_name}</div>
                      <div className="text-[10px] text-slate-400">Received {new Date(req.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Pending
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 text-xs space-y-1.5 border border-white/[0.04]">
                  <div>
                    <span className="font-bold text-indigo-400">They will teach: </span>
                    <span className="text-white font-semibold">{req.offered_skill_name}</span>
                  </div>
                  <div>
                    <span className="font-bold text-purple-400">They want you to teach: </span>
                    <span className="text-white font-semibold">{req.requested_skill_name}</span>
                  </div>
                  {req.message && (
                    <p className="text-[11px] text-slate-400 italic pt-1.5 border-t border-white/[0.06]">
                      "{req.message}"
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleRequestStatus(req.request_id, 'Accepted')}
                    className="py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <Check className="w-3.5 h-3.5" /> Accept
                  </button>
                  <button
                    onClick={() => handleRequestStatus(req.request_id, 'Rejected')}
                    className="py-2.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/30 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED SKILL EXCHANGE PARTNERS */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Recommended Skill Exchange Partners
            </h2>
            <p className="text-xs text-slate-400">
              Peers matched by our DBE compatibility engine based on your active skills.
            </p>
          </div>
          <button
            onClick={() => setActivePage('matching')}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View All Matches</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {Array.isArray(recommendations) && recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 3).map((match) => {
              const youTeachText = Array.isArray(match.you_teach_them)
                ? match.you_teach_them.map(s => typeof s === 'string' ? s : s?.skill_name || 'Skill').join(', ')
                : (typeof match.you_teach_them === 'string' ? match.you_teach_them : 'Your Specialty');

              const theyTeachText = Array.isArray(match.they_teach_you)
                ? match.they_teach_you.map(s => typeof s === 'string' ? s : s?.skill_name || 'Skill').join(', ')
                : (typeof match.they_teach_you === 'string' ? match.they_teach_you : 'Their Specialty');

              return (
                <div
                  key={match.partner_id || Math.random()}
                  className="bg-slate-900/80 p-6 rounded-3xl border border-white/[0.08] hover:border-indigo-500/40 backdrop-blur-xl shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        match.is_reciprocal
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {match.match_percentage || 50}% {match.is_reciprocal ? 'Mutual' : 'One-Way'}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{match.rating || '5.0'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={match.partner_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${match.partner_name}`}
                        alt={match.partner_name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white">{match.partner_name || 'Peer Exchanger'}</h3>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-pink-400" />
                          <span>{match.partner_location || 'India'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950/80 text-xs space-y-1.5 border border-white/[0.04]">
                      <div>
                        <span className="text-indigo-400 font-bold">You teach: </span>
                        <span className="text-white font-medium">
                          {youTeachText || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-purple-400 font-bold">They teach: </span>
                        <span className="text-white font-medium">
                          {theyTeachText || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedProfileUser(match.partner_id);
                        setActivePage('profile-view');
                      }}
                      className="w-1/2 py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => onOpenExchange({
                        ...match,
                        user_id: match.partner_id,
                        user_name: match.partner_name,
                        user_avatar: match.partner_avatar
                      })}
                      className="w-1/2 py-2 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg transition-colors"
                    >
                      Swap
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-white/[0.08] text-xs text-slate-400">
            No recommendations currently. Make sure your profile lists skills you can teach and skills you want to learn.
          </div>
        )}
      </div>

    </div>
  );
}
