import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  User, MapPin, Mail, Calendar, Star, Plus, 
  Trash2, ArrowRightLeft, ShieldCheck, Check, AlertCircle 
} from 'lucide-react';

export default function Profile({ targetUserId, setActivePage, onOpenExchange }) {
  const { user: currentUser, reloadUser } = useAuth();
  const userId = targetUserId || currentUser?.user_id;
  const isMe = currentUser?.user_id === userId;

  const [profile, setProfile] = useState(null);
  const [catalogSkills, setCatalogSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit fields for current user
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Add skill modal / popover state
  const [newSkillId, setNewSkillId] = useState('');
  const [newSkillType, setNewSkillType] = useState('Teach');
  const [newProficiency, setNewProficiency] = useState('Intermediate');

  const loadProfile = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [p, skills] = await Promise.all([
        api.getProfile(userId),
        api.getSkills()
      ]);
      setProfile(p);
      setCatalogSkills(skills);
      if (isMe) {
        setFullName(p.full_name);
        setLocation(p.location);
        setBio(p.bio || '');
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await api.updateProfile({
        user_id: currentUser.user_id,
        full_name: fullName,
        location,
        bio
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      await loadProfile();
      await reloadUser();
    } catch (err) {
      alert(err.message || 'Error updating profile');
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillId) return;
    try {
      await api.addUserSkill({
        user_id: currentUser.user_id,
        skill_id: newSkillId,
        skill_type: newSkillType,
        proficiency_level: newProficiency
      });
      setNewSkillId('');
      await loadProfile();
      await reloadUser();
    } catch (err) {
      alert(err.message || 'Error adding skill');
    }
  };

  const handleRemoveSkill = async (skillId, skillType) => {
    try {
      await api.removeUserSkill({
        user_id: currentUser.user_id,
        skill_id: skillId,
        skill_type: skillType
      });
      await loadProfile();
      await reloadUser();
    } catch (err) {
      alert(err.message || 'Error removing skill');
    }
  };

  if (loading || !profile) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading user profile from database...</p>
      </div>
    );
  }

  const teachSkills = Array.isArray(profile?.teach_skills)
    ? profile.teach_skills
    : (Array.isArray(profile?.skills_teach) ? profile.skills_teach : []);

  const learnSkills = Array.isArray(profile?.learn_skills)
    ? profile.learn_skills
    : (Array.isArray(profile?.skills_learn) ? profile.skills_learn : []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner Card */}
      <div className="bg-slate-900/90 p-8 sm:p-10 rounded-3xl border border-indigo-500/30 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-6 relative z-10">
          <img
            src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name}`}
            alt={profile.full_name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
          />
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">{profile.full_name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {profile.average_rating || '5.0'} ({profile.total_reviews || 0} reviews)
              </span>
            </div>
            <p className="text-xs text-slate-300 italic pt-1 max-w-lg">
              "{profile.bio || 'Community skill exchanger'}"
            </p>
          </div>
        </div>

        {!isMe && (
          <button
            onClick={() => onOpenExchange({
              partner_id: profile.user_id,
              partner_name: profile.full_name,
              partner_avatar: profile.avatar_url,
              all_partner_teaches: teachSkills,
              all_partner_learns: learnSkills
            })}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center gap-2 self-start md:self-auto relative z-10"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Propose Exchange</span>
          </button>
        )}
      </div>

      {/* Skills Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Teach Skills */}
        <div className="bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              Skills Offered (Teaches)
            </span>
            <span className="text-xs font-bold text-indigo-300">{teachSkills.length} skills</span>
          </div>

          <div className="space-y-3">
            {teachSkills.map((s) => (
              <div
                key={s.user_skill_id || s.skill_id}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-indigo-500/20 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{s.skill_name}</div>
                  <div className="text-[10px] text-indigo-400">{s.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {s.proficiency_level}
                  </span>
                  {isMe && (
                    <button
                      onClick={() => handleRemoveSkill(s.skill_id, 'Teach')}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learn Skills */}
        <div className="bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <span className="text-xs font-black uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              Desired Skills (Learns)
            </span>
            <span className="text-xs font-bold text-purple-300">{learnSkills.length} skills</span>
          </div>

          <div className="space-y-3">
            {learnSkills.map((s) => (
              <div
                key={s.user_skill_id || s.skill_id}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-purple-500/20 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{s.skill_name}</div>
                  <div className="text-[10px] text-purple-400">{s.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
                    Target: {s.proficiency_level}
                  </span>
                  {isMe && (
                    <button
                      onClick={() => handleRemoveSkill(s.skill_id, 'Learn')}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* IF IS ME: ADD SKILL & EDIT PROFILE FORM */}
      {isMe && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Add Skill to Profile */}
          <div className="bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              Add Skill to Your Database Record
            </h3>
            <form onSubmit={handleAddSkill} className="space-y-3.5">
              <select
                required
                value={newSkillId}
                onChange={(e) => setNewSkillId(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/[0.08] text-xs bg-slate-950 text-white outline-none focus:border-indigo-500"
              >
                <option value="">Select a skill from catalog...</option>
                {catalogSkills.map((s) => (
                  <option key={s.skill_id} value={s.skill_id}>
                    {s.skill_name} ({s.category})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newSkillType}
                  onChange={(e) => setNewSkillType(e.target.value)}
                  className="p-3 rounded-xl border border-white/[0.08] text-xs bg-slate-950 text-white outline-none focus:border-indigo-500"
                >
                  <option value="Teach">I Can Teach This</option>
                  <option value="Learn">I Want to Learn This</option>
                </select>

                <select
                  value={newProficiency}
                  onChange={(e) => setNewProficiency(e.target.value)}
                  className="p-3 rounded-xl border border-white/[0.08] text-xs bg-slate-950 text-white outline-none focus:border-indigo-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors shadow-lg"
              >
                Insert User_Skills Entry
              </button>
            </form>
          </div>

          {/* Edit Basic Profile */}
          <div className="bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              Edit Profile Details
            </h3>
            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Profile updated in Users table!</span>
              </div>
            )}
            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (City, Country)"
                className="w-full p-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none focus:border-indigo-500"
              />
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short Bio..."
                className="w-full p-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none resize-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors border border-white/10"
              >
                Update Users Table Record
              </button>
            </form>
          </div>

        </div>
      )}

      {/* REVIEWS SECTION */}
      <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <h3 className="font-black text-white text-base">
            Verified Community Reviews ({profile.reviews?.length || 0})
          </h3>
          <span className="text-xs text-slate-400 font-mono">Stored in Reviews Table</span>
        </div>

        {profile.reviews?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.reviews.map((rev) => (
              <div key={rev.review_id} className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.reviewer_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${rev.reviewer_name}`}
                      alt={rev.reviewer_name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                    />
                    <span className="text-xs font-bold text-white">{rev.reviewer_name}</span>
                  </div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-300 italic">"{rev.comments}"</p>
                <div className="text-[10px] text-slate-500 font-mono">
                  {new Date(rev.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No reviews received yet for completed exchanges.</p>
        )}
      </div>

    </div>
  );
}
