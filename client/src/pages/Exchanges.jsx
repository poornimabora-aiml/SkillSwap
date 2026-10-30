import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  ArrowRightLeft, Clock, CheckCircle2, XCircle, 
  Star, Check, X, MessageSquare, AlertCircle, Plus 
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
        api.getMyRequests(user.user_id),
        api.getUserExchanges(user.user_id)
      ]);
      setRequests(reqs);
      setExchanges(exchs);
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

  const pendingReceived = requests.received.filter(r => r.status === 'Pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-1">
            Exchange Management Hub
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Skill Exchanges & Requests
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Track active exchanges, respond to pending proposals, and leave verified ratings.
          </p>
        </div>

        <button
          onClick={() => setActivePage('explore')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Find New Partner</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        {[
          { id: 'active', label: 'Active Exchanges', count: exchanges.active.length, icon: ArrowRightLeft },
          { id: 'pending', label: 'Received Requests', count: pendingReceived.length, icon: Clock },
          { id: 'sent', label: 'Sent Requests', count: requests.sent.length, icon: MessageSquare },
          { id: 'completed', label: 'Completed History', count: exchanges.completed.length, icon: CheckCircle2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                active
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                active ? 'bg-indigo-100 text-indigo-800 font-extrabold' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-600">Retrieving exchange history...</p>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* TAB 1: ACTIVE EXCHANGES */}
          {activeTab === 'active' && (
            exchanges.active.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                <ArrowRightLeft className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No active exchanges in progress</h3>
                <p className="text-xs text-slate-600">
                  Send an exchange request or accept a pending proposal to start learning.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exchanges.active.map((ex) => (
                  <div key={ex.exchange_id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                        Active Exchange
                      </span>
                      <span className="text-[11px] text-slate-600">
                        Started {new Date(ex.start_date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={ex.partner.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${ex.partner.name}`}
                        alt={ex.partner.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                      />
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{ex.partner.name}</h3>
                        <div className="text-xs text-slate-600">{ex.partner.location} • {ex.partner.email}</div>
                      </div>
                    </div>

                    {/* Skill Breakdown */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-indigo-700">You Teach Them:</span>
                        <span className="font-bold text-slate-900">{ex.you_teach}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                        <span className="font-semibold text-purple-700">They Teach You:</span>
                        <span className="font-bold text-slate-900">{ex.they_teach}</span>
                      </div>
                    </div>

                    {/* Complete Exchange CTA */}
                    <button
                      onClick={() => handleCompleteExchange(ex.exchange_id)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
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
            requests.received.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
                <Clock className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No incoming proposals</h3>
                <p className="text-xs text-slate-600">When someone requests to exchange skills with you, they will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.received.map((req) => (
                  <div key={req.request_id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <img
                        src={req.requester_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${req.requester_name}`}
                        alt={req.requester_name}
                        className="w-12 h-12 rounded-2xl object-cover"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900">{req.requester_name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' :
                            req.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">
                          Offering: <strong className="text-indigo-600">{req.offered_skill_name}</strong> | Requesting: <strong className="text-purple-600">{req.requested_skill_name}</strong>
                        </div>
                        {req.message && (
                          <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg mt-1">
                            "{req.message}"
                          </p>
                        )}
                      </div>
                    </div>

                    {req.status === 'Pending' ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleStatusChange(req.request_id, 'Accepted')}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" /> Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(req.request_id, 'Rejected')}
                          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-600 font-medium self-end md:self-center">
                        Processed on {new Date(req.updated_at || req.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 3: SENT REQUESTS */}
          {activeTab === 'sent' && (
            requests.sent.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No sent proposals</h3>
                <p className="text-xs text-slate-600">Visit Explore Skills to initiate a trade with a member.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.sent.map((req) => (
                  <div key={req.request_id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">To: {req.receiver_name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' :
                          req.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        Offered: <strong className="text-indigo-600">{req.offered_skill_name}</strong> | Requested: <strong className="text-purple-600">{req.requested_skill_name}</strong>
                      </div>
                    </div>
                    <span className="text-xs text-slate-600">
                      Sent {new Date(req.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 4: COMPLETED HISTORY */}
          {activeTab === 'completed' && (
            exchanges.completed.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No completed exchanges yet</h3>
                <p className="text-xs text-slate-600">Once active swaps are marked as complete, they will be archived here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exchanges.completed.map((ex) => (
                  <div key={ex.exchange_id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                        Successfully Completed
                      </span>
                      <span className="text-[11px] text-slate-600">
                        {new Date(ex.completion_date || ex.start_date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={ex.partner.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${ex.partner.name}`}
                        alt={ex.partner.name}
                        className="w-11 h-11 rounded-2xl object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{ex.partner.name}</h4>
                        <div className="text-xs text-slate-600">Exchanged: {ex.you_teach} ⇄ {ex.they_teach}</div>
                      </div>
                    </div>

                    {/* Review status */}
                    <div className="pt-2 border-t border-slate-100">
                      {ex.has_reviewed ? (
                        <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-1">
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span>Your Rating: {ex.my_review.rating} / 5</span>
                          </div>
                          <p className="text-[11px] text-slate-700 italic">
                            "{ex.my_review.comments}"
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenReview(ex)}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
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
