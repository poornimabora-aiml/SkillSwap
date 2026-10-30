import React from 'react';
import { 
  ArrowRightLeft, Sparkles, ShieldCheck, Database, 
  CheckCircle2, Users, Star, ArrowRight 
} from 'lucide-react';

export default function HowItWorks({ setActivePage, openDbeModal }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full inline-block">
          Skill Exchange Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          How SkillSwap Functions
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Knowledge is currency. Instead of paying monetary fees to traditional academies, SkillSwap pairs your unique expertise with learners who teach the subjects you seek.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-lg">
            1
          </div>
          <h3 className="text-xl font-bold text-white">Decentralized Knowledge Barter</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            No credit cards, subscriptions, or hidden paywalls. Every exchange is a mutual trade of time, attention, and practical knowledge between passionate individuals.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black text-lg">
            2
          </div>
          <h3 className="text-xl font-bold text-white">Relational Set Intersection</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Our PostgreSQL DBE matching algorithm evaluates bidirectional compatibility so you spend time connecting only with relevant peers who share mutual learning synergy.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-lg">
            3
          </div>
          <h3 className="text-xl font-bold text-white">Bilateral Exchange Contracts</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Proposals specify exactly which skill User A teaches and which skill User B teaches. When accepted, database triggers instantiate an active exchange record.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-lg">
            4
          </div>
          <h3 className="text-xl font-bold text-white">Verified Peer Reviews</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Upon session completion, participants submit ratings (1-5 stars) and comments to prevent bad actors and maintain a high-trust learning ecosystem.
          </p>
        </div>
      </div>

      {/* DBE Project Notice */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-indigo-500/30">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest">
            <Database className="w-4 h-4" />
            Database Engineering (DBE) Architectural Showcase
          </div>
          <h2 className="text-2xl font-black text-white">Curious about the technical implementation?</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Explore the 3NF normalized tables, foreign key constraints, cascading rules, and the mathematical matching query.
          </p>
        </div>
        <button
          onClick={openDbeModal}
          className="px-6 py-3 rounded-2xl text-xs font-bold text-indigo-950 bg-white hover:bg-slate-100 transition-colors shrink-0 shadow-xl"
        >
          View Database Schema & ER Diagram
        </button>
      </div>

    </div>
  );
}
