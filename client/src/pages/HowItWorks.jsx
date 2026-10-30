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
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
          Skill Exchange Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How SkillSwap Functions
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Knowledge is currency. Instead of paying monetary fees to traditional academies, SkillSwap pairs your unique expertise with learners who teach the subjects you seek.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">
            1
          </div>
          <h3 className="text-xl font-bold text-slate-900">Decentralized Knowledge Barter</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            No credit cards, subscriptions, or hidden paywalls. Every exchange is a mutual trade of time, attention, and practical knowledge between passionate individuals.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-black text-lg">
            2
          </div>
          <h3 className="text-xl font-bold text-slate-900">Relational Set Intersection</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our PostgreSQL DBE matching algorithm evaluates bidirectional compatibility so you spend time connecting only with relevant peers who share mutual learning synergy.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-black text-lg">
            3
          </div>
          <h3 className="text-xl font-bold text-slate-900">Bilateral Exchange Contracts</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Proposals specify exactly which skill User A teaches and which skill User B teaches. When accepted, database triggers instantiate an active exchange record.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 font-black text-lg">
            4
          </div>
          <h3 className="text-xl font-bold text-slate-900">Verified Peer Reviews</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Upon session completion, participants submit ratings (1-5 stars) and comments to prevent bad actors and maintain a high-trust learning ecosystem.
          </p>
        </div>
      </div>

      {/* DBE Project Notice */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-navy-950 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            Database Engineering (DBE) Architectural Showcase
          </div>
          <h2 className="text-2xl font-bold text-white">Curious about the technical implementation?</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Explore the 3NF normalized tables, foreign key constraints, cascading rules, and the mathematical matching query.
          </p>
        </div>
        <button
          onClick={openDbeModal}
          className="px-6 py-3 rounded-2xl text-xs font-bold text-indigo-950 bg-white hover:bg-slate-100 transition-colors shrink-0 shadow-md"
        >
          View Database Schema & ER Diagram
        </button>
      </div>

    </div>
  );
}
