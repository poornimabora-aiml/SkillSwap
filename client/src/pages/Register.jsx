import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Logo from '../components/Logo';
import { DEFAULT_SKILLS, INDIAN_SAMPLE_PROFILES } from '../data/mockData';
import { 
  User, Mail, Lock, MapPin, BookOpen, ArrowRight, 
  AlertCircle, CheckCircle2, Plus, Trash2, Sparkles 
} from 'lucide-react';

export default function Register({ setActivePage }) {
  const { register, loading } = useAuth();
  const [catalogSkills, setCatalogSkills] = useState(DEFAULT_SKILLS);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  // Selected skills
  const [teachSkills, setTeachSkills] = useState([
    { skill_id: '', proficiency_level: 'Advanced' }
  ]);
  const [learnSkills, setLearnSkills] = useState([
    { skill_id: '', proficiency_level: 'Beginner' }
  ]);

  const [error, setError] = useState('');

  useEffect(() => {
    api.getSkills().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        setCatalogSkills(res);
      }
    }).catch(console.error);
  }, []);

  const prefillProfile = (profile) => {
    setFullName(profile.name);
    setEmail(profile.email);
    setPassword('password123');
    setLocation(profile.location);
    setBio(profile.bio);
    setTeachSkills([{ skill_id: profile.teachSkillId, proficiency_level: profile.teachLevel }]);
    setLearnSkills([{ skill_id: profile.learnSkillId, proficiency_level: profile.learnLevel }]);
  };

  const addTeachRow = () => {
    setTeachSkills([...teachSkills, { skill_id: '', proficiency_level: 'Intermediate' }]);
  };

  const removeTeachRow = (index) => {
    setTeachSkills(teachSkills.filter((_, i) => i !== index));
  };

  const addLearnRow = () => {
    setLearnSkills([...learnSkills, { skill_id: '', proficiency_level: 'Beginner' }]);
  };

  const removeLearnRow = (index) => {
    setLearnSkills(learnSkills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !location) {
      setError('Full name, email, password, and location are required.');
      return;
    }

    const validTeach = teachSkills.filter(s => !!s.skill_id);
    const validLearn = learnSkills.filter(s => !!s.skill_id);

    if (validTeach.length === 0 || validLearn.length === 0) {
      setError('Please configure at least one skill you can teach and one skill you want to learn.');
      return;
    }

    setError('');

    try {
      await register({
        full_name: fullName,
        email,
        password,
        location,
        bio: bio || 'Excited to swap skills and learn from others!',
        skills_teach: validTeach,
        skills_learn: validLearn
      });

      setActivePage('dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Create Your SkillSwap Account
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Join our decentralized barter community to teach what you know and learn what you want.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-slate-900/90 p-8 sm:p-10 rounded-3xl border border-white/[0.08] backdrop-blur-2xl shadow-2xl space-y-6">
        
        {/* Quick Fill Indian Demo Profiles */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Quick Fill Sample Indian Profile (1-Click Test):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {INDIAN_SAMPLE_PROFILES.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => prefillProfile(p)}
                className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-indigo-600/30 border border-white/[0.1] hover:border-indigo-400 text-slate-300 hover:text-white text-[11px] font-semibold transition-all duration-150 flex items-center gap-1.5"
              >
                <span>{p.name}</span>
                <span className="text-[10px] text-slate-400">({p.location.split(',')[0]})</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
                Full Name *
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Poornima Bora"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
                City / Location *
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bangalore, India"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
                Email Address *
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
                Password *
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Short Bio */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
              Short Bio / About You
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others what you are passionate about and your exchange availability..."
              className="w-full p-3 rounded-xl border border-white/[0.08] bg-slate-950 text-white text-xs outline-none resize-none focus:border-indigo-500"
            />
          </div>

          {/* SKILLS I CAN TEACH */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Skills I Can Teach (At least one)
              </span>
              <button
                type="button"
                onClick={addTeachRow}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another
              </button>
            </div>

            {teachSkills.map((ts, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <select
                  required
                  value={ts.skill_id}
                  onChange={(e) => {
                    const next = [...teachSkills];
                    next[idx].skill_id = e.target.value;
                    setTeachSkills(next);
                  }}
                  className="flex-1 p-3 rounded-xl border border-white/[0.08] text-xs bg-slate-900 text-white outline-none focus:border-indigo-500"
                >
                  <option value="">Select a Teachable Skill...</option>
                  {catalogSkills.map((s) => (
                    <option key={s.skill_id} value={s.skill_id}>
                      {s.skill_name} ({s.category})
                    </option>
                  ))}
                </select>

                <select
                  value={ts.proficiency_level}
                  onChange={(e) => {
                    const next = [...teachSkills];
                    next[idx].proficiency_level = e.target.value;
                    setTeachSkills(next);
                  }}
                  className="w-32 p-3 rounded-xl border border-white/[0.08] text-xs bg-slate-900 text-white outline-none focus:border-indigo-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>

                {teachSkills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTeachRow(idx)}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* SKILLS I WANT TO LEARN */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Skills I Want to Learn (At least one)
              </span>
              <button
                type="button"
                onClick={addLearnRow}
                className="text-[11px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another
              </button>
            </div>

            {learnSkills.map((ls, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <select
                  required
                  value={ls.skill_id}
                  onChange={(e) => {
                    const next = [...learnSkills];
                    next[idx].skill_id = e.target.value;
                    setLearnSkills(next);
                  }}
                  className="flex-1 p-3 rounded-xl border border-white/[0.08] text-xs bg-slate-900 text-white outline-none focus:border-indigo-500"
                >
                  <option value="">Select Target Skill...</option>
                  {catalogSkills.map((s) => (
                    <option key={s.skill_id} value={s.skill_id}>
                      {s.skill_name} ({s.category})
                    </option>
                  ))}
                </select>

                <select
                  value={ls.proficiency_level}
                  onChange={(e) => {
                    const next = [...learnSkills];
                    next[idx].proficiency_level = e.target.value;
                    setLearnSkills(next);
                  }}
                  className="w-32 p-3 rounded-xl border border-white/[0.08] text-xs bg-slate-900 text-white outline-none focus:border-indigo-500"
                >
                  <option value="Beginner">Beginner Goal</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced Goal</option>
                </select>

                {learnSkills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLearnRow(idx)}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account & Storing DBE Relations...' : 'Complete Registration & Start Swapping'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/[0.08]">
          Already registered?{' '}
          <button
            onClick={() => setActivePage('login')}
            className="font-bold text-indigo-400 hover:underline"
          >
            Sign In here
          </button>
        </div>
      </div>

    </div>
  );
}
