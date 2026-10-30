import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Search, Filter, Star, ArrowRightLeft, User, MapPin, 
  Sparkles, CheckCircle2, ChevronRight, BookOpen, Layers, Zap
} from 'lucide-react';

export default function Explore({ setActivePage, onOpenExchange, setSelectedProfileUser }) {
  const { user } = useAuth();
  const [skillsList, setSkillsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');

  const categories = [
    'All',
    'Programming',
    'Web Development',
    'Database Management',
    'Graphic Design',
    'Communication',
    'Languages',
    'Photography',
    'Digital Marketing'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const fetchExplore = async () => {
    setLoading(true);
    try {
      const data = await api.exploreSkills({
        search: search.trim() || undefined,
        category: category !== 'All' ? category : undefined,
        level: level !== 'All' ? level : undefined
      });
      setSkillsList(data);
    } catch (err) {
      console.error('Error fetching explore skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExplore();
  }, [category, level]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchExplore();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full inline-block">
          Explore Skills Catalog
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Discover Teachable Skills & Mentors
        </h1>
        <p className="text-slate-400 text-sm">
          Browse offerings from verified members ready to trade knowledge. Filter by category, proficiency level, or search by keyword.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-5">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by skill, mentor name, city, or domain (e.g. Python, Figma, React)..."
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md"
          >
            Search
          </button>
        </form>

        {/* Category Pills Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
            Filter by Domain
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  category === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40'
                    : 'bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Proficiency:</span>
            <div className="flex gap-1.5">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    level === lvl
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-slate-400">
            Showing <strong className="text-white font-bold">{skillsList.length}</strong> available skills
          </div>
        </div>
      </div>

      {/* Skills Card Grid */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Retrieving catalog from database...</p>
        </div>
      ) : skillsList.length === 0 ? (
        <div className="p-14 text-center rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl space-y-3">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No skills match your filters</h3>
          <p className="text-xs text-slate-400">Try adjusting your keyword query or reset active filters.</p>
          <button
            onClick={() => { setSearch(''); setCategory('All'); setLevel('All'); }}
            className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsList.map((item) => {
            const isMe = user?.user_id === item.user_id;

            return (
              <div
                key={item.user_skill_id}
                className="bg-slate-900/80 rounded-3xl border border-white/[0.08] hover:border-indigo-500/40 backdrop-blur-xl glass-card-hover flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top */}
                <div className="p-6 space-y-4">
                  
                  {/* Category & Level Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                      {item.category}
                    </span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-black rounded-full ${
                      item.proficiency_level === 'Expert' || item.proficiency_level === 'Advanced'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.proficiency_level}
                    </span>
                  </div>

                  {/* Skill Name & Description */}
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-indigo-300 transition-colors">
                      {item.skill_name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description || 'Teachable skill available for bilateral barter with community peers.'}
                    </p>
                  </div>

                  {/* Wants to learn preview */}
                  {item.wants_to_learn?.length > 0 && (
                    <div className="pt-3 border-t border-white/[0.06]">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                        Wants in Return:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.wants_to_learn.map((wl, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-950/60 text-purple-300 border border-purple-500/30"
                          >
                            {wl}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer: Teacher Profile & Actions */}
                <div className="p-5 bg-slate-950/80 border-t border-white/[0.06] flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.user_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${item.user_name}`}
                        alt={item.user_name}
                        className="w-10 h-10 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{item.user_name}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-pink-400" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-[10px] text-slate-500">({item.total_reviews})</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        setSelectedProfileUser(item.user_id);
                        setActivePage('profile-view');
                      }}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-white/10 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => onOpenExchange(item)}
                      disabled={isMe}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        isMe
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      }`}
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>{isMe ? 'Your Skill' : 'Request Swap'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
