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
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-600">Loading user profile from database...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
        <div className="flex items-center gap-6">
          <img
            src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name}`}
            alt={profile.full_name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-md"
          />
          <div className="space-y-1.5">
            <h1 className="text-2xl font-black text-slate-900">{profile.full_name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-500" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-800">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {profile.average_rating} ({profile.total_reviews} reviews)
              </span>
            </div>
            <p className="text-xs text-slate-600 italic pt-1 max-w-lg">
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
              all_partner_teaches: profile.teach_skills,
              all_partner_learns: profile.learn_skills
            })}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-2 self-start md:self-auto"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Propose Exchange</span>
          </button>
        )}
      </div>

      {/* Skills Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Teach Skills */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              Skills Offered (Teaches)
            </span>
            <span className="text-xs font-bold text-indigo-600">{profile.teach_skills.length} skills</span>
          </div>

          <div className="space-y-3">
            {profile.teach_skills.map((s) => (
              <div
                key={s.user_skill_id || s.skill_id}
                className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-indigo-950">{s.skill_name}</div>
                  <div className="text-[10px] text-indigo-600">{s.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-indigo-800 border border-indigo-200">
                    {s.proficiency_level}
                  </span>
                  {isMe && (
                    <button
                      onClick={() => handleRemoveSkill(s.skill_id, 'Teach')}
                      className="p-1 text-slate-600 hover:text-rose-600 rounded"
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
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              Desired Skills (Learns)
            </span>
            <span className="text-xs font-bold text-purple-600">{profile.learn_skills.length} skills</span>
          </div>

          <div className="space-y-3">
            {profile.learn_skills.map((s) => (
              <div
                key={s.user_skill_id || s.skill_id}
                className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-purple-950">{s.skill_name}</div>
                  <div className="text-[10px] text-purple-600">{s.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-purple-800 border border-purple-200">
                    Target: {s.proficiency_level}
                  </span>
                  {isMe && (
                    <button
                      onClick={() => handleRemoveSkill(s.skill_id, 'Learn')}
                      className="p-1 text-slate-600 hover:text-rose-600 rounded"
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
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-indigo-600" />
              Add Skill to Your Database Record
            </h3>
            <form onSubmit={handleAddSkill} className="space-y-3">
              <select
                required
                value={newSkillId}
                onChange={(e) => setNewSkillId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-800 outline-none"
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
                  className="p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-800 outline-none"
                >
                  <option value="Teach">I Can Teach This</option>
                  <option value="Learn">I Want to Learn This</option>
                </select>

                <select
                  value={newProficiency}
                  onChange={(e) => setNewProficiency(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-800 outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Insert User_Skills Entry
              </button>
            </form>
          </div>

          {/* Edit Basic Profile */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <User className="w-4 h-4 text-purple-600" />
              Edit Profile Details
            </h3>
            {saveSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Profile updated successfully!</span>
              </div>
            )}
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs outline-none"
              />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (City, Country)"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs outline-none"
              />
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short Bio..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Update Users Table Record
              </button>
            </form>
          </div>

        </div>
      )}

      {/* REVIEWS SECTION */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base">
            Verified Community Reviews ({profile.reviews?.length || 0})
          </h3>
          <span className="text-xs text-slate-600">Stored in Reviews Table</span>
        </div>

        {profile.reviews?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.reviews.map((rev) => (
              <div key={rev.review_id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={rev.reviewer_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${rev.reviewer_name}`}
                      alt={rev.reviewer_name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-slate-900">{rev.reviewer_name}</span>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">"{rev.comments}"</p>
                <div className="text-[10px] text-slate-600">
                  {new Date(rev.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-600 italic">No reviews received yet for completed exchanges.</p>
        )}
      </div>

    </div>
  );
}
