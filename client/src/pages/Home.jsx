import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  ArrowRight, ArrowRightLeft, Sparkles, CheckCircle2, Shield, Users, 
  BookOpen, Star, Code, Palette, Database, Globe, MessageSquare, Camera, 
  TrendingUp, Layers, Cpu, Zap, Compass, Check, ChevronRight
} from 'lucide-react';

export default function Home({ setActivePage, onOpenExchange, openDbeModal }) {
  const { user } = useAuth();
  const [mutualMatches, setMutualMatches] = useState([]);
  const [stats, setStats] = useState({ tables: { users: 7, skills: 10, exchanges: 2 } });

  // Interactive Hero Barter Simulator state
  const [simTeach, setSimTeach] = useState('Python Programming');
  const [simLearn, setSimLearn] = useState('Graphic Design & UI/UX');
  const [simPulse, setSimPulse] = useState(false);

  useEffect(() => {
    api.getAllMutualMatches().then(setMutualMatches).catch(console.error);
    api.getDbeStats().then(setStats).catch(console.error);
  }, []);

  const triggerSimulatorPulse = () => {
    setSimPulse(true);
    setTimeout(() => setSimPulse(false), 1200);
  };

  const categories = [
    { name: 'Programming', icon: Code, tags: ['Python', 'C++', 'Rust', 'Algorithms'], color: 'from-blue-600/30 to-indigo-600/40', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
    { name: 'Web Development', icon: Globe, tags: ['React 18', 'Node.js', 'Next.js', 'Tailwind'], color: 'from-indigo-600/30 to-purple-600/40', border: 'border-indigo-500/30', glow: 'shadow-indigo-500/20' },
    { name: 'Database Management', icon: Database, tags: ['PostgreSQL', 'SQL Joins', '3NF Normalization'], color: 'from-purple-600/30 to-pink-600/40', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
    { name: 'Graphic Design', icon: Palette, tags: ['Figma Prototyping', 'UI/UX', 'Design Systems'], color: 'from-pink-600/30 to-rose-600/40', border: 'border-pink-500/30', glow: 'shadow-pink-500/20' },
    { name: 'Communication', icon: MessageSquare, tags: ['Public Speaking', 'Executive Pitching', 'Debate'], color: 'from-amber-600/30 to-orange-600/40', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
    { name: 'Languages', icon: BookOpen, tags: ['Spanish Fluency', 'Japanese N3', 'French'], color: 'from-emerald-600/30 to-teal-600/40', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
    { name: 'Photography', icon: Camera, tags: ['Manual Exposure', 'Adobe Lightroom', 'Studio Light'], color: 'from-cyan-600/30 to-sky-600/40', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' },
    { name: 'Digital Marketing', icon: TrendingUp, tags: ['Technical SEO', 'Organic Growth', 'Analytics'], color: 'from-violet-600/30 to-fuchsia-600/40', border: 'border-violet-500/30', glow: 'shadow-violet-500/20' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Declare Your Knowledge Assets',
      desc: 'Catalog what skills you have mastered, alongside the specific subjects you are eager to learn next.',
      badge: 'Profile Mapping'
    },
    {
      num: '02',
      title: 'Relational Set Intersections',
      desc: 'Our PostgreSQL DBE matching algorithm evaluates Teaches(A) ∩ Learns(B) to pinpoint 100% reciprocal peers.',
      badge: 'DBE Relational Math'
    },
    {
      num: '03',
      title: 'Initiate Bilateral Barter',
      desc: 'Send a structured exchange proposal outlining the sessions each side will teach. No money ever required.',
      badge: 'Zero-Cost Trade'
    },
    {
      num: '04',
      title: 'Knowledge Transfer & Verified Ratings',
      desc: 'Meet for live interactive sessions, learn directly from experienced peers, and submit authentic ratings.',
      badge: 'Verified Community'
    }
  ];

  return (
    <div className="space-y-28 pb-24 aurora-bg">
      
      {/* ========================================================================= */}
      {/* HERO SECTION: SYNAPSE SKILL NEXUS */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Atmospheric mesh gradient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-pink-600/25 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/2 left-10 w-[350px] h-[350px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-pink-600/15 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
          
          {/* Top Project Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/40 text-indigo-300 text-xs font-bold backdrop-blur-xl shadow-lg shadow-indigo-500/20 hover:border-indigo-400 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Database Engineering (DBE) College Project</span>
            <span className="text-white/40">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
              Two-Way Barter Architecture
            </span>
          </div>

          {/* Hero Headings */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
              Share Your Skills.{' '}
              <span className="text-gradient-shimmer block sm:inline">
                Learn Something New.
              </span>
            </h1>
            <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              A community where everyone has something to teach and something to learn.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage(user ? 'dashboard' : 'register')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => setActivePage('explore')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-extrabold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/10 backdrop-blur-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Explore Skills</span>
            </button>
            
            <button
              onClick={() => setActivePage('matching')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-extrabold text-indigo-300 bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-500/40 backdrop-blur-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/50"
            >
              <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
              <span>Two-Way Match Engine</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE HERO BARTER NEXUS SIMULATOR */}
          {/* ========================================================================= */}
          <div className="pt-8 max-w-4xl mx-auto">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl shadow-indigo-950/50 text-left overflow-hidden">
              
              {/* Header Ticker */}
              <div className="flex items-center justify-between text-xs text-indigo-300 font-bold uppercase tracking-wider mb-6 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Interactive Relational Matching Simulator</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-black">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
                  100% Reciprocal Synergy
                </div>
              </div>

              {/* The Dual Node Exchange Flow */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                
                {/* Node 1: User A */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-3 relative group">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                      alt="Alice Johnson"
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500"
                    />
                    <div>
                      <div className="text-sm font-black text-white">Alice Johnson</div>
                      <div className="text-[11px] text-slate-400">San Francisco • Developer</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/[0.06] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Teaches:
                      </span>
                      <span className="text-white font-semibold">{simTeach}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        Wants:
                      </span>
                      <span className="text-white font-semibold">{simLearn}</span>
                    </div>
                  </div>
                </div>

                {/* Central Dual-Flux Beam */}
                <div className="md:col-span-3 flex flex-col items-center justify-center text-center py-2">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[1px] shadow-lg shadow-indigo-500/40 transition-transform ${simPulse ? 'scale-125' : 'scale-100'}`}>
                    <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                      <ArrowRightLeft className={`w-6 h-6 text-indigo-400 transition-transform duration-500 ${simPulse ? 'rotate-180 text-pink-400' : ''}`} />
                    </div>
                  </div>
                  
                  <div className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mt-2">
                    Bilateral Flux
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono">
                    Zero Currency
                  </div>
                </div>

                {/* Node 2: User B */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-slate-950/90 border border-purple-500/30 space-y-3 relative group">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                      alt="Bob Smith"
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-500"
                    />
                    <div>
                      <div className="text-sm font-black text-white">Bob Smith</div>
                      <div className="text-[11px] text-slate-400">New York • Brand Designer</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/[0.06] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Teaches:
                      </span>
                      <span className="text-white font-semibold">{simLearn}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        Wants:
                      </span>
                      <span className="text-white font-semibold">{simTeach}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Live Barter Switcher Controls */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400">
                  Try test pairs:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSimTeach('Python Programming');
                      setSimLearn('Graphic Design & UI/UX');
                      triggerSimulatorPulse();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-[11px] transition-colors"
                  >
                    Python ⇄ UI/UX (Alice & Bob)
                  </button>
                  <button
                    onClick={() => {
                      setSimTeach('Database Management');
                      setSimLearn('Spanish Language');
                      triggerSimulatorPulse();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-[11px] transition-colors"
                  >
                    Database ⇄ Spanish (Alice & Carlos)
                  </button>
                  <button
                    onClick={() => {
                      setSimTeach('Machine Learning & AI');
                      setSimLearn('Digital Photography');
                      triggerSimulatorPulse();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-pink-300 font-bold text-[11px] transition-colors"
                  >
                    AI ⇄ Photography (Poornima & Fiona)
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Metrics HUD */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl">
              <div className="text-3xl font-black text-white">{stats?.tables?.users || stats?.total_users || 12}</div>
              <div className="text-xs font-semibold text-slate-400 mt-1">Active Exchangers</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl">
              <div className="text-3xl font-black text-indigo-400">{(stats?.tables?.skills || stats?.total_skills || 16)}+</div>
              <div className="text-xs font-semibold text-slate-400 mt-1">Catalog Domains</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl">
              <div className="text-3xl font-black text-purple-400">100%</div>
              <div className="text-xs font-semibold text-slate-400 mt-1">Barter Reciprocity</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl">
              <div className="text-3xl font-black text-pink-400">3NF</div>
              <div className="text-xs font-semibold text-slate-400 mt-1">Relational Normalization</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4-STEP KNOWLEDGE ODYSSEY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="text-xs font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full inline-block">
            Bilateral Knowledge Flow
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How SkillSwap Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminate traditional financial friction. Connect directly with peers who need what you know and teach what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-7 rounded-3xl bg-slate-900/70 border border-white/[0.08] hover:border-indigo-500/40 backdrop-blur-xl glass-card-hover relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black text-indigo-500/40 group-hover:text-indigo-400 transition-colors">
                    {st.num}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {st.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-bold text-indigo-400">
                <span>Phase {st.num}</span>
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8 KNOWLEDGE SPHERES (CATEGORIES) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full inline-block">
              Explore Spheres of Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Curated Skill Categories
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Tap any domain to discover members actively offering lessons and requesting complementary knowledge.
            </p>
          </div>
          <button
            onClick={() => setActivePage('explore')}
            className="px-6 py-3 rounded-2xl font-bold text-xs text-white bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-400/30 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => setActivePage('explore')}
                className={`p-6 rounded-3xl bg-slate-900/70 border ${cat.border} hover:border-indigo-400 backdrop-blur-xl glass-card-hover cursor-pointer group flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${cat.color} border border-white/10 text-white flex items-center justify-center shadow-lg ${cat.glow} mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-extrabold text-base text-white group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {cat.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500 group-hover:text-indigo-400 transition-colors">
                  <span>Explore Mentors</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TWO-WAY MATCH SPOTLIGHT HERO */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white relative overflow-hidden border border-indigo-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black border border-indigo-500/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Core DBE Algorithmic Innovation
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Two-Way Relational Matching System
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Standard platforms leave users guessing who might want their skills. SkillSwap executes a multi-join SQL query comparing:
              <br />
              <strong className="text-white">What User A teaches</strong> against <strong className="text-white">What User B wants to learn</strong>, and vice-versa.
              Compatibility percentages guarantee you only request trades that create mutual value.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setActivePage('matching')}
                className="px-7 py-4 rounded-2xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Test Two-Way Match Engine</span>
              </button>
              
              <button
                onClick={openDbeModal}
                className="px-7 py-4 rounded-2xl font-extrabold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-indigo-300 border border-indigo-500/40 transition-all flex items-center gap-2 backdrop-blur-xl"
              >
                <Database className="w-4 h-4 text-indigo-400" />
                <span>Inspect Database Schema & ER Diagram</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VERIFIED COMMUNITY EXCHANGE TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full inline-block">
            Verified Community Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Real Barter Exchanges
          </h2>
          <p className="text-slate-400 text-sm">
            Read transparent ratings saved directly to the database <code className="text-indigo-400 font-mono">Reviews</code> table.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-3xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              "Alice is an incredible Python mentor! She broke down complex list comprehensions and functions with easy examples. In return, I taught her Figma design tokens. 10/10 exchange!"
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.08]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                alt="Bob Smith"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
              />
              <div>
                <div className="text-xs font-bold text-white">Bob Smith</div>
                <div className="text-[11px] text-slate-400">Graphic Designer • New York, NY</div>
              </div>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              "Bob taught me Figma design systems and color palettes in just 3 sessions. Now I can design frontend mockups without feeling lost. Super patient and communicative."
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.08]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                alt="Alice Johnson"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500"
              />
              <div>
                <div className="text-xs font-bold text-white">Alice Johnson</div>
                <div className="text-[11px] text-slate-400">Full-Stack Developer • San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white text-center space-y-6 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white relative z-10">
            Ready to Share and Learn?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base relative z-10">
            Create your account in under 60 seconds, configure what you can teach and what you want to learn, and discover your reciprocal matches today.
          </p>
          <div className="pt-2 relative z-10">
            <button
              onClick={() => setActivePage(user ? 'dashboard' : 'register')}
              className="px-9 py-4 rounded-2xl font-black text-xs sm:text-sm bg-white text-slate-950 hover:bg-slate-100 shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2"
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
