import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Search, Filter, Star, ArrowRightLeft, User, MapPin, 
  Sparkles, CheckCircle2, ChevronRight, BookOpen, Layers
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
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
          Explore Skills Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Discover Teachable Skills & Mentors
        </h1>
        <p className="text-slate-600 text-sm">
          Browse offerings from members ready to trade knowledge. Filter by category, proficiency level, or search by keyword.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-600 absolute left-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by skill name, teacher, location, or keyword (e.g. Python, Figma, React)..."
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-600 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Category Pills Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  category === cat
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Proficiency Level:</span>
            <div className="flex gap-1.5">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    level === lvl
                      ? 'bg-purple-100 text-purple-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-slate-600">
            Showing <strong className="text-slate-900">{skillsList.length}</strong> available skills
          </div>
        </div>
      </div>

      {/* Skills Card Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-600">Loading skill directory from database...</p>
        </div>
      ) : skillsList.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No skills match your filters</h3>
          <p className="text-xs text-slate-600">Try adjusting your search query or reset categories.</p>
          <button
            onClick={() => { setSearch(''); setCategory('All'); setLevel('All'); }}
            className="px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsList.map((item) => {
            // Check if current user wants to learn what this person teaches,
            // or if current user teaches what this person wants to learn!
            const isMe = user?.user_id === item.user_id;

            return (
              <div
                key={item.user_skill_id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top Banner */}
                <div className="p-6 space-y-4">
                  {/* Category & Level Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-50 text-indigo-700">
                      {item.category}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      item.proficiency_level === 'Expert' || item.proficiency_level === 'Advanced'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.proficiency_level}
                    </span>
                  </div>

                  {/* Skill Name & Description */}
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.skill_name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description || 'Teachable skill available for exchange with community peers.'}
                    </p>
                  </div>

                  {/* Wants to learn preview */}
                  {item.wants_to_learn?.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                        Wants in Return:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.wants_to_learn.map((wl, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-100"
                          >
                            {wl}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer: Teacher Profile & Actions */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.user_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${item.user_name}`}
                        alt={item.user_name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.user_name}</div>
                        <div className="text-[10px] text-slate-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-600" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{item.rating}</span>
                      <span className="text-[10px] text-slate-600">({item.total_reviews})</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        setSelectedProfileUser(item.user_id);
                        setActivePage('profile-view');
                      }}
                      className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <User className="w-3.5 h-3.5 text-slate-600" />
                      <span>View Profile</span>
                    </button>

                    <button
                      onClick={() => onOpenExchange(item)}
                      disabled={isMe}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        isMe
                          ? 'bg-slate-200 text-slate-600 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                      }`}
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>{isMe ? 'Your Skill' : 'Request Exchange'}</span>
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
