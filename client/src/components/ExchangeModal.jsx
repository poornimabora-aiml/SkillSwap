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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Please Log In</h3>
          <p className="text-sm text-slate-600">You must be logged in to send a skill exchange request.</p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Calculate if the selected combination represents a reciprocal 100% match:
  // Requester teaches offeredSkill, and Partner wants to learn offeredSkill;
  // AND Partner teaches requestedSkill, and Requester wants to learn requestedSkill.
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-indigo-950 to-purple-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <img
              src={partnerAvatar}
              alt={partnerName}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-400"
            />
            <div>
              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                Two-Way Skill Proposal
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Exchange with {partnerName}
              </h3>
            </div>
          </div>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Compatibility Status Pill */}
          <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
            isReciprocal
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
              : 'bg-amber-50/80 border-amber-200 text-amber-800'
          }`}>
            <div className="flex items-center gap-2">
              {isReciprocal ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span className="font-semibold">
                {isReciprocal ? '100% Mutual Reciprocal Match' : '50% One-Way Request (Not Yet Reciprocal)'}
              </span>
            </div>
            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
              isReciprocal ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
            }`}>
              {isReciprocal ? '100%' : '50%'}
            </span>
          </div>

          {/* Skill Pair Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What You Teach */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
              <label className="text-xs font-bold text-indigo-950 uppercase tracking-wider block">
                Skill You Will Teach
              </label>
              <select
                value={offeredSkillId}
                onChange={(e) => setOfferedSkillId(e.target.value)}
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-indigo-200 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
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
              <p className="text-[10px] text-indigo-600">Offered from your profile</p>
            </div>

            {/* What They Teach */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
              <label className="text-xs font-bold text-purple-950 uppercase tracking-wider block">
                Skill You Want to Learn
              </label>
              <select
                value={requestedSkillId}
                onChange={(e) => setRequestedSkillId(e.target.value)}
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-purple-200 bg-white text-slate-800 focus:ring-2 focus:ring-purple-500 outline-none"
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
              <p className="text-[10px] text-purple-600">Taught by {partnerName}</p>
            </div>
          </div>

          {/* Proposal Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Message to {partnerName}
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              placeholder="Introduce yourself and propose your preferred meeting times or topics..."
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
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
