import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  ArrowRight, ArrowRightLeft, Sparkles, CheckCircle2, Shield, Users, 
  BookOpen, Star, Code, Palette, Database, Globe, MessageSquare, Camera, TrendingUp, Layers
} from 'lucide-react';

export default function Home({ setActivePage, onOpenExchange, openDbeModal }) {
  const { user } = useAuth();
  const [mutualMatches, setMutualMatches] = useState([]);
  const [stats, setStats] = useState({ tables: { users: 7, skills: 10, exchanges: 2 } });

  useEffect(() => {
    api.getAllMutualMatches().then(setMutualMatches).catch(console.error);
    api.getDbeStats().then(setStats).catch(console.error);
  }, []);

  const categories = [
    { name: 'Programming', icon: Code, count: 'Python, C++, Java', color: 'from-blue-500 to-indigo-600' },
    { name: 'Web Development', icon: Globe, count: 'React, Node, CSS', color: 'from-indigo-500 to-purple-600' },
    { name: 'Database Management', icon: Database, count: 'PostgreSQL, SQL, Normalization', color: 'from-purple-500 to-pink-600' },
    { name: 'Graphic Design', icon: Palette, count: 'Figma, UI/UX, Illustrator', color: 'from-pink-500 to-rose-600' },
    { name: 'Communication', icon: MessageSquare, count: 'Public Speaking, Pitching', color: 'from-amber-500 to-orange-600' },
    { name: 'Languages', icon: BookOpen, count: 'Spanish, French, Japanese', color: 'from-emerald-500 to-teal-600' },
    { name: 'Photography', icon: Camera, count: 'Lightroom, Studio, Manual Mode', color: 'from-cyan-500 to-blue-600' },
    { name: 'Digital Marketing', icon: TrendingUp, count: 'SEO, Growth, Content Ads', color: 'from-violet-500 to-purple-700' },
  ];

  const steps = [
    {
      num: '01',
      title: 'List Your Skills',
      desc: 'Declare the skills you can confidently teach, plus the skills you are passionate to learn.'
    },
    {
      num: '02',
      title: 'Relational 2-Way Matching',
      desc: 'Our DBE engine identifies reciprocal peers where what you teach matches what they want, and vice-versa.'
    },
    {
      num: '03',
      title: 'Send Bilateral Proposal',
      desc: 'Agree on the skill exchange terms, scheduled sessions, and learning milestones with no money involved.'
    },
    {
      num: '04',
      title: 'Learn & Review',
      desc: 'Complete interactive sessions and leave verified community reviews stored in the database.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/15 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Database Engineering (DBE) College Project</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span className="text-white/80 font-mono">Two-Way Barter Architecture</span>
          </div>

          {/* Headings */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              Share Your Skills.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                Learn Something New.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              A community where everyone has something to teach and something to learn.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActivePage(user ? 'dashboard' : 'register')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActivePage('explore')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 backdrop-blur-md transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Explore Skills</span>
            </button>
            <button
              onClick={() => setActivePage('matching')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-base font-bold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/40 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
              <span>Two-Way Match Engine</span>
            </button>
          </div>

          {/* Interactive Barter Visual Banner */}
          <div className="pt-10 max-w-3xl mx-auto">
            <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700/70 backdrop-blur-xl shadow-2xl text-left">
              <div className="flex items-center justify-between text-xs text-indigo-300 font-bold uppercase tracking-wider mb-4">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Live Relational Match Example
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% Reciprocal
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-center sm:text-left">
                {/* User A */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                    alt="Alice"
                    className="w-11 h-11 rounded-xl object-cover ring-2 ring-indigo-500"
                  />
                  <div>
                    <div className="font-bold text-white text-sm">Alice Johnson</div>
                    <div className="text-[11px] text-emerald-400 font-semibold">Teaches: Python</div>
                    <div className="text-[11px] text-indigo-300">Wants: Graphic Design</div>
                  </div>
                </div>

                {/* Central Exchange Loop */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
                    <ArrowRightLeft className="w-6 h-6 text-indigo-300" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-2">Zero Money Required</span>
                </div>

                {/* User B */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                    alt="Bob"
                    className="w-11 h-11 rounded-xl object-cover ring-2 ring-purple-500"
                  />
                  <div>
                    <div className="font-bold text-white text-sm">Bob Smith</div>
                    <div className="text-[11px] text-emerald-400 font-semibold">Teaches: Graphic Design</div>
                    <div className="text-[11px] text-indigo-300">Wants: Python</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-white">{stats.tables.users || 7}+</div>
              <div className="text-xs text-slate-400">Active Exchangers</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-indigo-400">{stats.tables.skills || 10}+</div>
              <div className="text-xs text-slate-400">Teachable Skills</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-purple-400">100%</div>
              <div className="text-xs text-slate-400">Barter Reciprocity</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-pink-400">3NF</div>
              <div className="text-xs text-slate-400">Normalized Database</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
            Seamless Knowledge Flow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SkillSwap Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            No subscription fees. No course costs. Connect directly with people who want to learn what you know.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 relative group"
            >
              <div className="text-4xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors mb-3">
                {st.num}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{st.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SKILL CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
              Skill Categories
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Available Domains
            </h2>
            <p className="text-sm text-slate-600">
              Discover verified mentors and eager learners across all core domains.
            </p>
          </div>
          <button
            onClick={() => setActivePage('explore')}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors self-start md:self-auto flex items-center gap-1.5"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => setActivePage('explore')}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${cat.color} text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1">{cat.count}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TWO-WAY MATCH ENGINE FEATURE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Core DBE Algorithmic Innovation
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Two-Way Skill Matching System
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Unlike ordinary directories, SkillSwap uses mathematical set intersections implemented in SQL joins to compare:
              <br />
              <strong className="text-white">What User A teaches</strong> against <strong className="text-white">What User B learns</strong>, and vice-versa.
              Compatibility percentages guarantee you only request trades that create mutual value.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActivePage('matching')}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Test Two-Way Match Engine</span>
              </button>
              <button
                onClick={openDbeModal}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors flex items-center gap-2"
              >
                <Database className="w-4 h-4 text-indigo-400" />
                <span>Inspect Database Schema & ER Diagram</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED COMMUNITY REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
            Member Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Real Exchanges, Real Growth
          </h2>
          <p className="text-slate-600 text-sm">
            Read transparent reviews written after completed skill swap sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "Alice is an incredible Python mentor! She broke down complex list comprehensions and functions with easy examples. In return, I taught her Figma design tokens. 10/10 exchange!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                alt="Bob Smith"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">Bob Smith</div>
                <div className="text-[11px] text-slate-600">Graphic Designer • New York, NY</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "Bob taught me Figma design systems and color palettes in just 3 sessions. Now I can design frontend mockups without feeling lost. Super patient and communicative."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                alt="Alice Johnson"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">Alice Johnson</div>
                <div className="text-[11px] text-slate-600">Full-Stack Developer • San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Share and Learn?
          </h2>
          <p className="text-slate-100 max-w-xl mx-auto text-sm sm:text-base">
            Create your account in under 60 seconds, configure what you can teach and what you want to learn, and discover your reciprocal matches today.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActivePage(user ? 'dashboard' : 'register')}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-white text-indigo-700 hover:bg-slate-100 shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
