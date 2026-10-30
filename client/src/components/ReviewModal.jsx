import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { X, Star, AlertCircle, Sparkles } from 'lucide-react';

export default function ReviewModal({ exchange, onClose, onSuccess }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setError('Please select a star rating between 1 and 5.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.submitReview({
        exchange_id: exchange.exchange_id,
        reviewer_id: user.user_id,
        rating,
        comments
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  const partnerName = exchange?.partner?.name || 'Partner';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-indigo-500/30 overflow-hidden relative text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 to-indigo-950 p-6 relative border-b border-white/[0.08]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Exchange Evaluation
          </div>
          <h3 className="text-lg font-black text-white">
            Rate Your Exchange with {partnerName}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Your feedback updates their community rating in the Reviews table.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Star Rating Picker */}
          <div className="text-center space-y-2 py-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
              Overall Rating
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1.5 focus:outline-none transition-transform hover:scale-125"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-700'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-indigo-400">
              {rating === 5 && 'Outstanding Experience!'}
              {rating === 4 && 'Great Exchange!'}
              {rating === 3 && 'Average / Good'}
              {rating === 2 && 'Needs Improvement'}
              {rating === 1 && 'Unsatisfactory'}
            </p>
          </div>

          {/* Comments */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
              Written Feedback & Testimonial
            </label>
            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="What did you learn? How clear was their teaching style?"
              className="w-full p-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
