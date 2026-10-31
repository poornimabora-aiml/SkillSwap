import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  ArrowRightLeft, Clock, CheckCircle2, XCircle, 
  Star, Check, X, MessageSquare, AlertCircle, Plus, Sparkles 
} from 'lucide-react';

export default function Exchanges({ onOpenReview, setActivePage }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'pending' | 'completed' | 'sent'
  const [requests, setRequests] = useState({ received: [], sent: [] });
  const [exchanges, setExchanges] = useState({ active: [], completed: [], all: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.user_id) return;
    setLoading(true);
    try {
      const [reqs, exchs] = await Promise.all([
        api.getMyRequests(user.user_id).catch(() => ({ received: [], sent: [] })),
        api.getUserExchanges(user.user_id).catch(() => ({ active: [], completed: [], all: [] }))
      ]);
      setRequests({
        received: Array.isArray(reqs?.received) ? reqs.received : [],
        sent: Array.isArray(reqs?.sent) ? reqs.sent : []
      });
      setExchanges({
        active: Array.isArray(exchs?.active) ? exchs.active : [],
        completed: Array.isArray(exchs?.completed) ? exchs.completed : [],
        all: Array.isArray(exchs?.all) ? exchs.all : []
      });
    } catch (err) {
      console.error('Error fetching exchanges data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.user_id]);

  const handleStatusChange = async (requestId, status) => {
    try {
      await api.updateRequestStatus(requestId, status);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Error updating status');
    }
  };

  const handleCompleteExchange = async (exchangeId) => {
    const feedback = prompt('Add optional completion feedback/notes for the database:') || 'Completed all scheduled exchange sessions.';
    try {
      await api.completeExchange(exchangeId, feedback);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Error completing exchange');
    }
  };

  const pendingReceived = Array.isArray(requests?.received)
    ? requests.received.filter(r => r && r.status === 'Pending')
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full inline-block mb-2">
            Exchange Management Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            My Skill Exchanges & Requests
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Track active exchanges, respond to pending proposals, and leave verified ratings.
          </p>
        </div>

        <button
          onClick={() => setActivePage('explore')}
          className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Find New Partner</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.08] gap-2 overflow-x-auto pb-1">
        {[
          { id: 'active', label: 'Active Exchanges', count: exchanges?.active?.length || 0, icon: ArrowRightLeft },
          { id: 'pending', label: 'Received Requests', count: pendingReceived.length, icon: Clock },
          { id: 'sent', label: 'Sent Requests', count: requests?.sent?.length || 0, icon: MessageSquare },
          { id: 'completed', label: 'Completed History', count: exchanges?.completed?.length || 0, icon: CheckCircle2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                active
                  ? 'border-indigo-500 text-indigo-400 font-black'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                active ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'bg-slate-900 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Retrieving exchange history...</p>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* TAB 1: ACTIVE EXCHANGES */}
          {activeTab === 'active' && (
            (!Array.isArray(exchanges?.active) || exchanges.active.length === 0) ? (
              <div className="p-14 text-center bg-slate-900/60 rounded-3xl border border-white/[0.08] backdrop-blur-xl space-y-3">
                <ArrowRightLeft className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No active exchanges in progress</h3>
                <p className="text-xs text-slate-400">
                  Send an exchange request or accept a pending proposal to start learning.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exchanges.active.map((ex) => (
                  <div key={ex.exchange_id || Math.random()} className="p-7 rounded-3xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-xl shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase tracking-widest">
                        Active Exchange
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Started {new Date(ex.start_date || Date.now()).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={ex.partner?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${ex.partner?.name || 'Partner'}`}
                        alt={ex.partner?.name || 'Partner'}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
                      />
                      <div>
                        <h3 className="text-base font-bold text-white">{ex.partner?.name || 'Skill Exchange Partner'}</h3>
                        <div className="text-xs text-slate-400">{ex.partner?.location || 'India'} • {ex.partner?.email || ''}</div>
                      </div>
                    </div>

                    {/* Skill Breakdown */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-400">You Teach Them:</span>
                        <span className="font-semibold text-white">{ex.you_teach || 'Specialty'}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                        <span className="font-bold text-purple-400">They Teach You:</span>
                        <span className="font-semibold text-white">{ex.they_teach || 'Specialty'}</span>
                      </div>
                    </div>

                    {/* Complete Exchange CTA */}
                    <button
                      onClick={() => handleCompleteExchange(ex.exchange_id)}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition-colors shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark as Completed & Leave Review
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 2: RECEIVED REQUESTS */}
          {activeTab === 'pending' && (
            (!Array.isArray(requests?.received) || requests.received.length === 0) ? (
              <div className="p-14 text-center bg-slate-900/60 rounded-3xl border border-white/[0.08] backdrop-blur-xl space-y-2">
                <Clock className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No incoming proposals</h3>
                <p className="text-xs text-slate-400">When someone requests to exchange skills with you, they will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.received.map((req) => (
                  <div key={req.request_id || Math.random()} className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <img
                        src={req.requester_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${req.requester_name || 'User'}`}
                        alt={req.requester_name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-white">{req.requester_name || 'Student'}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            req.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                            req.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Offering: <strong className="text-indigo-400">{req.offered_skill_name || 'Skill'}</strong> | Requesting: <strong className="text-purple-400">{req.requested_skill_name || 'Skill'}</strong>
                        </div>
                        {req.message && (
                          <p className="text-xs text-slate-300 italic bg-slate-950 p-2.5 rounded-xl border border-white/[0.04] mt-2">
                            "{req.message}"
                          </p>
                        )}
                      </div>
                    </div>

                    {req.status === 'Pending' ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleStatusChange(req.request_id, 'Accepted')}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                        >
                          <Check className="w-3.5 h-3.5" /> Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(req.request_id, 'Rejected')}
                          className="px-5 py-2.5 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 font-bold text-xs rounded-xl flex items-center gap-1.5"
                        >
                          <X className="w-3.5 h-3.5" /> Decline
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium self-end md:self-center font-mono">
                        Processed on {new Date(req.updated_at || req.created_at || Date.now()).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 3: SENT REQUESTS */}
          {activeTab === 'sent' && (
            (!Array.isArray(requests?.sent) || requests.sent.length === 0) ? (
              <div className="p-14 text-center bg-slate-900/60 rounded-3xl border border-white/[0.08] backdrop-blur-xl space-y-2">
                <MessageSquare className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No sent proposals</h3>
                <p className="text-xs text-slate-400">Visit Explore Skills to initiate a trade with a member.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.sent.map((req) => (
                  <div key={req.request_id || Math.random()} className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-lg flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">To: {req.receiver_name || 'Member'}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          req.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                          req.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Offered: <strong className="text-indigo-400">{req.offered_skill_name || 'Skill'}</strong> | Requested: <strong className="text-purple-400">{req.requested_skill_name || 'Skill'}</strong>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      Sent {new Date(req.created_at || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 4: COMPLETED HISTORY */}
          {activeTab === 'completed' && (
            (!Array.isArray(exchanges?.completed) || exchanges.completed.length === 0) ? (
              <div className="p-14 text-center bg-slate-900/60 rounded-3xl border border-white/[0.08] backdrop-blur-xl space-y-2">
                <CheckCircle2 className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No completed exchanges yet</h3>
                <p className="text-xs text-slate-400">Once active swaps are marked as complete, they will be archived here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exchanges.completed.map((ex) => (
                  <div key={ex.exchange_id || Math.random()} className="p-7 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-widest">
                        Completed Exchange
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(ex.completion_date || ex.start_date || Date.now()).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={ex.partner?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${ex.partner?.name || 'Partner'}`}
                        alt={ex.partner?.name || 'Partner'}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{ex.partner?.name || 'Partner'}</h4>
                        <div className="text-xs text-slate-400">Exchanged: {ex.you_teach || 'Skill'} ⇄ {ex.they_teach || 'Skill'}</div>
                      </div>
                    </div>

                    {/* Review status */}
                    <div className="pt-2 border-t border-white/[0.06]">
                      {ex.has_reviewed ? (
                        <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/[0.06] text-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>Your Rating: {ex.my_review?.rating || 5} / 5</span>
                          </div>
                          <p className="text-[11px] text-slate-300 italic">
                            "{ex.my_review?.comments || 'Great session!'}"
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenReview(ex)}
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <Star className="w-3.5 h-3.5" />
                          Leave Review & Star Rating
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}
