import React from 'react';
import { Database, GitBranch, Layers, ShieldCheck, Sparkles, UserCheck, Globe, Code2 } from 'lucide-react';

export default function About({ openDbeModal }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full inline-block">
          Academic Capstone Project
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About SkillSwap
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Developed for the <strong className="text-white">Database Engineering (DBE)</strong> curriculum by <strong className="text-indigo-400">Poornima Bora</strong>. A full-stack demonstration of relational database design, query optimization, and bilateral barter matchmaking.
        </p>
      </div>

      {/* Author & Academic Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col items-center text-center space-y-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
            alt="Poornima Bora"
            className="w-28 h-28 rounded-3xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
          />
          <div>
            <h2 className="text-lg font-black text-white">Poornima Bora</h2>
            <div className="text-xs text-indigo-400 font-bold">Project Creator & Lead Architect</div>
            <div className="text-[11px] text-slate-400">AI / ML & Database Engineering</div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t md:border-t-0 md:border-l border-white/[0.08] pt-6 md:pt-0 md:pl-8">
          <h3 className="font-bold text-white text-base">Project Objectives & Vision</h3>
          <p>
            SkillSwap was engineered to tackle the isolation and prohibitive financial barriers of modern upskilling. While traditional learning platforms treat students as passive paying consumers, SkillSwap recognizes that nearly every individual holds mastery in at least one domain.
          </p>
          <p>
            By leveraging strict relational normalization (3NF) and bidirectional SQL joins, SkillSwap creates an equitable, high-trust ecosystem where knowledge is traded directly between learners.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={openDbeModal}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-lg"
            >
              <Database className="w-3.5 h-3.5" />
              View DBE ER Schema
            </button>
            <a
              href="https://github.com/poornimabora-aiml/SkillSwap.git"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
            >
              <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      {/* Production Architecture Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-white text-center">Production Architecture & Technology Stack</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-lg space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Frontend Tier</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              React 18, Vite, Tailwind CSS. Designed with glassmorphism, responsive viewports, and deployed to <strong>Cloudflare Pages</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-lg space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Backend API Tier</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Node.js, Express.js REST API with CORS, JWT session authentication, bcrypt hashing, deployed to <strong>Render</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-lg space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Database Tier</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Supabase PostgreSQL</strong> relational database with foreign key cascades, unique compound indexes, and event triggers.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-lg space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Normalization (3NF)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clean 6-table normalized schema (Users, Skills, User_Skills, Exchange_Requests, Exchanges, Reviews) satisfying 1NF, 2NF, 3NF, and BCNF.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
