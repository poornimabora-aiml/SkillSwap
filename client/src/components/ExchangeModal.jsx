import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { X, ArrowRightLeft, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export default function ExchangeModal({ partner, onClose, onSuccess, initialOfferedId, initialRequestedId }) {
  const { user } = useAuth();

  const [offeredSkillId, setOfferedSkillId] = useState(initialOfferedId || (user?.teach_skills?.[0]?.skill_id || ''));
  const [requestedSkillId, setRequestedSkillId] = useState(initialRequestedId || (partner?.all_partner_teaches?.[0]?.skill_id || partner?.skill_id || ''));
  const [message, setMessage] = useState(`Hi ${partner?.user_name || partner?.partner_name}! I would love to exchange skills with you on SkillSwap.`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Please Sign In</h3>
          <p className="text-xs text-slate-400">You must be logged in to send a skill exchange proposal.</p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const partnerWantsOffered = partner?.all_partner_learns?.some(s => s.skill_id === offeredSkillId) ||
    partner?.wants_to_learn?.some(name => {
      const off = user.teach_skills?.find(s => s.skill_id === offeredSkillId);
      return off && off.skill_name === name;
    });

  const partnerTeachesRequested = partner?.all_partner_teaches?.some(s => s.skill_id === requestedSkillId) ||
    (partner?.skill_id === requestedSkillId);

  const isReciprocal = partnerWantsOffered && partnerTeachesRequested;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!offeredSkillId || !requestedSkillId) {
      setError('Please select both a skill you will teach and a skill you want to learn.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        requester_id: user.user_id,
        receiver_id: partner.partner_id || partner.user_id,
        offered_skill_id: offeredSkillId,
        requested_skill_id: requestedSkillId,
        message
      };

      await api.sendExchangeRequest(payload);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to send exchange request.');
    } finally {
      setLoading(false);
    }
  };

  const partnerName = partner?.partner_name || partner?.user_name || 'Partner';
  const partnerAvatar = partner?.partner_avatar || partner?.user_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${partnerName}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-indigo-500/30 overflow-hidden relative text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-indigo-950 p-6 relative border-b border-white/[0.08]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3.5">
            <img
              src={partnerAvatar}
              alt={partnerName}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-400"
            />
            <div>
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                Two-Way Barter Proposal
              </div>
              <h3 className="text-xl font-black text-white">
                Exchange with {partnerName}
              </h3>
            </div>
          </div>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Compatibility Status Pill */}
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
            isReciprocal
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
          }`}>
            <div className="flex items-center gap-2">
              {isReciprocal ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className="font-bold">
                {isReciprocal ? '100% Mutual Reciprocal Match' : '50% One-Way Request (Not Yet Reciprocal)'}
              </span>
            </div>
            <span className={`px-2 py-0.5 rounded-full font-black text-[10px] ${
              isReciprocal ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {isReciprocal ? '100%' : '50%'}
            </span>
          </div>

          {/* Skill Pair Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What You Teach */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
              <label className="text-[11px] font-black text-indigo-400 uppercase tracking-widest block">
                Skill You Will Teach
              </label>
              <select
                value={offeredSkillId}
                onChange={(e) => setOfferedSkillId(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-white/[0.08] bg-slate-900 text-white outline-none focus:border-indigo-500"
              >
                {user.teach_skills?.length > 0 ? (
                  user.teach_skills.map((s) => (
                    <option key={s.skill_id} value={s.skill_id}>
                      {s.skill_name} ({s.proficiency_level})
                    </option>
                  ))
                ) : (
                  <option value="">No teaching skills configured</option>
                )}
              </select>
              <p className="text-[10px] text-slate-500">From your teaching profile</p>
            </div>

            {/* What They Teach */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/20 space-y-2">
              <label className="text-[11px] font-black text-purple-400 uppercase tracking-widest block">
                Skill You Want to Learn
              </label>
              <select
                value={requestedSkillId}
                onChange={(e) => setRequestedSkillId(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-white/[0.08] bg-slate-900 text-white outline-none focus:border-purple-500"
              >
                {partner.all_partner_teaches?.length > 0 ? (
                  partner.all_partner_teaches.map((s) => (
                    <option key={s.skill_id} value={s.skill_id}>
                      {s.skill_name} ({s.proficiency_level})
                    </option>
                  ))
                ) : partner.skill_name ? (
                  <option value={partner.skill_id}>{partner.skill_name}</option>
                ) : (
                  <option value="">Select partner skill</option>
                )}
              </select>
              <p className="text-[10px] text-slate-500">Taught by {partnerName}</p>
            </div>
          </div>

          {/* Proposal Message */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
              Message to {partnerName}
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none focus:border-indigo-500 resize-none"
              placeholder="Introduce yourself and propose your preferred meeting times or topics..."
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <ArrowRightLeft className="w-4 h-4" />
              {loading ? 'Sending Request...' : 'Send Exchange Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
