import React from 'react';
import { Database, GitBranch, Layers, ShieldCheck, Sparkles, UserCheck, Globe, Code2 } from 'lucide-react';

export default function About({ openDbeModal }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
          College Capstone Project
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About SkillSwap
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Developed for the <strong className="text-slate-900">Database Engineering (DBE)</strong> curriculum by <strong className="text-indigo-600">Poornima Bora</strong>. A full-stack demonstration of relational database design, query optimization, and bilateral barter matchmaking.
        </p>
      </div>

      {/* Author & Academic Card */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col items-center text-center space-y-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
            alt="Poornima Bora"
            className="w-28 h-28 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-md"
          />
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Poornima Bora</h2>
            <div className="text-xs text-indigo-600 font-semibold">Project Creator & Lead Architect</div>
            <div className="text-[11px] text-slate-600">AI / ML & Database Engineering</div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8">
          <h3 className="font-bold text-slate-900 text-base">Project Objectives & Vision</h3>
          <p>
            SkillSwap was engineered to tackle the isolation and prohibitive financial barriers of modern upskilling. While traditional learning platforms treat students as passive paying consumers, SkillSwap recognizes that nearly every individual holds mastery in at least one domain.
          </p>
          <p>
            By leveraging strict relational normalization (3NF) and bidirectional SQL joins, SkillSwap creates an equitable, high-trust ecosystem where knowledge is traded directly between learners.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={openDbeModal}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Database className="w-3.5 h-3.5" />
              View DBE ER Schema
            </button>
            <a
              href="https://github.com/poornimabora-aiml/SkillSwap.git"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <GitBranch className="w-3.5 h-3.5" />
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 text-center">Production Architecture & Technology Stack</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Frontend Tier</h4>
            <p className="text-xs text-slate-600">
              React 18, Vite, Tailwind CSS. Designed with glassmorphism, responsive viewports, and deployed to <strong>Cloudflare Pages</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Backend API Tier</h4>
            <p className="text-xs text-slate-600">
              Node.js, Express.js REST API with CORS, JWT session authentication, bcrypt hashing, deployed to <strong>Render</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Database Tier</h4>
            <p className="text-xs text-slate-600">
              <strong>Supabase PostgreSQL</strong> relational database with foreign key cascades, unique compound indexes, and event triggers.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Normalization (3NF)</h4>
            <p className="text-xs text-slate-600">
              Clean 6-table normalized schema (Users, Skills, User_Skills, Exchange_Requests, Exchanges, Reviews) satisfying 1NF, 2NF, 3NF, and BCNF.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
