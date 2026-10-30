import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  User, MapPin, Mail, Calendar, ArrowRightLeft, CheckCircle2, 
  Clock, Check, X, Star, Sparkles, Plus, AlertCircle, ChevronRight 
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
        api.getUserExchanges(user.user_id).catch(() => ({ active: [], completed: [] }))
      ]);

      setRecommendations(matchesData.matches || []);
      setRequests(reqsData);
      setExchanges(exchsData);
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

  const pendingReceived = requests.received.filter(r => r.status === 'Pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome & Profile Summary Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-navy-950 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          {/* User Bio & Meta */}
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.full_name}`}
              alt={user?.full_name}
              className="w-20 h-20 rounded-3xl object-cover ring-4 ring-indigo-500/30 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome back, {user?.full_name}!
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  Active Exchanger
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  {user?.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  {user?.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  Joined {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-slate-400 max-w-xl pt-1 italic">
                "{user?.bio || 'Ready to share skills and learn from other members.'}"
              </p>
            </div>
          </div>

          {/* Quick Edit CTA */}
          <button
            onClick={() => setActivePage('profile')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors self-start md:self-auto"
          >
            Manage Skills & Profile
          </button>
        </div>

        {/* Dashboard Counter Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block">Pending Requests</span>
            <span className="text-2xl font-black text-amber-400">{pendingReceived.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block">Active Exchanges</span>
            <span className="text-2xl font-black text-indigo-400">{exchanges.active.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block">Completed Swaps</span>
            <span className="text-2xl font-black text-emerald-400">{exchanges.completed.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block">Mutual Matches</span>
            <span className="text-2xl font-black text-purple-400">
              {recommendations.filter(r => r.is_reciprocal).length}
            </span>
          </div>
        </div>
      </div>

      {/* Skills Showcase Grid (Teach & Learn) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Skills I Can Teach */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              Skills I Can Teach
            </h2>
            <button
              onClick={() => setActivePage('profile')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Skill
            </button>
          </div>

          {user?.teach_skills?.length > 0 ? (
            <div className="space-y-2.5">
              {user.teach_skills.map((s) => (
                <div
                  key={s.user_skill_id || s.skill_id}
                  className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-indigo-950">{s.skill_name}</div>
                    <div className="text-[10px] text-indigo-600">{s.category}</div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white text-indigo-700 border border-indigo-200">
                    {s.proficiency_level}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-600 bg-slate-50 rounded-2xl">
              No teaching skills added yet. Click "+ Add Skill" to start offering lessons.
            </div>
          )}
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              Skills I Want to Learn
            </h2>
            <button
              onClick={() => setActivePage('profile')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Target
            </button>
          </div>

          {user?.learn_skills?.length > 0 ? (
            <div className="space-y-2.5">
              {user.learn_skills.map((s) => (
                <div
                  key={s.user_skill_id || s.skill_id}
                  className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-purple-950">{s.skill_name}</div>
                    <div className="text-[10px] text-purple-600">{s.category}</div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white text-purple-700 border border-purple-200">
                    Target: {s.proficiency_level}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-600 bg-slate-50 rounded-2xl">
              No learning goals added yet. Add what you wish to learn!
            </div>
          )}
        </div>

      </div>

      {/* PENDING INCOMING EXCHANGE REQUESTS */}
      {pendingReceived.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Pending Exchange Proposals ({pendingReceived.length})</span>
            </div>
            <button
              onClick={() => setActivePage('exchanges')}
              className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
            >
              Manage all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingReceived.map((req) => (
              <div key={req.request_id} className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={req.requester_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${req.requester_name}`}
                      alt={req.requester_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{req.requester_name}</div>
                      <div className="text-[10px] text-slate-600">Sent on {new Date(req.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    Pending Approval
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] space-y-1">
                  <div>
                    <span className="font-bold text-indigo-700">They will teach: </span>
                    <span className="text-slate-800 font-semibold">{req.offered_skill_name}</span>
                  </div>
                  <div>
                    <span className="font-bold text-purple-700">They want you to teach: </span>
                    <span className="text-slate-800 font-semibold">{req.requested_skill_name}</span>
                  </div>
                  {req.message && (
                    <p className="text-[10px] text-slate-600 italic pt-1 border-t border-slate-200">
                      "{req.message}"
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleRequestStatus(req.request_id, 'Accepted')}
                    className="py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" /> Accept
                  </button>
                  <button
                    onClick={() => handleRequestStatus(req.request_id, 'Rejected')}
                    className="py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 flex items-center justify-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED SKILL EXCHANGE PARTNERS (Two-Way Relational Matches) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Recommended Skill Exchange Partners
            </h2>
            <p className="text-xs text-slate-600">
              Peers matched by our DBE compatibility engine based on your active skills.
            </p>
          </div>
          <button
            onClick={() => setActivePage('matching')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All Matches</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendations.slice(0, 3).map((match) => (
              <div
                key={match.partner_id}
                className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      match.is_reciprocal
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {match.match_percentage}% {match.is_reciprocal ? 'Mutual' : 'One-Way'}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{match.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={match.partner_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${match.partner_name}`}
                      alt={match.partner_name}
                      className="w-12 h-12 rounded-2xl object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{match.partner_name}</h3>
                      <div className="text-[10px] text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-600" />
                        <span>{match.partner_location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] space-y-1">
                    <div>
                      <span className="text-indigo-600 font-bold">You teach: </span>
                      <span className="text-slate-800 font-medium">
                        {match.you_teach_them?.map(s => s.skill_name).join(', ') || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-purple-600 font-bold">They teach: </span>
                      <span className="text-slate-800 font-medium">
                        {match.they_teach_you?.map(s => s.skill_name).join(', ') || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedProfileUser(match.partner_id);
                      setActivePage('profile-view');
                    }}
                    className="w-1/2 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
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
                    className="w-1/2 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm"
                  >
                    Swap
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-600">
            No recommendations currently. Make sure your profile lists skills you can teach and skills you want to learn.
          </div>
        )}
      </div>

    </div>
  );
}
