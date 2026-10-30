import React from 'react';
import Logo from './Logo';
import { Database, GitBranch, Heart, ShieldCheck, Sparkles, Globe } from 'lucide-react';

export default function Footer({ setActivePage, openDbeModal }) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo light={true} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              SkillSwap is a decentralized knowledge exchange platform where learners and mentors trade skills without money. Built as a comprehensive Database Engineering (DBE) relational architecture.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800/50 rounded-lg">
                React + Vite
              </span>
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-purple-950/80 text-purple-400 border border-purple-800/50 rounded-lg">
                Express.js
              </span>
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 rounded-lg">
                Supabase PostgreSQL
              </span>
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/50 rounded-lg">
                3NF Relational Schema
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-indigo-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('explore')} className="hover:text-indigo-400 transition-colors">
                  Explore Skills Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('matching')} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  Two-Way Match Engine
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('how-it-works')} className="hover:text-indigo-400 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-indigo-400 transition-colors">
                  About the Project
                </button>
              </li>
            </ul>
          </div>

          {/* DBE College Project Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Database Specs</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={openDbeModal} className="hover:text-indigo-400 text-left transition-colors flex items-center gap-1.5 text-indigo-300 font-medium">
                  <Database className="w-3.5 h-3.5" />
                  Interactive ER Diagram
                </button>
              </li>
              <li>
                <span className="text-slate-400">Users (1:N) User_Skills</span>
              </li>
              <li>
                <span className="text-slate-400">Skills (1:N) User_Skills</span>
              </li>
              <li>
                <span className="text-slate-400">Exchange_Requests (1:1) Exchanges</span>
              </li>
              <li>
                <span className="text-slate-400">Exchanges (1:N) Reviews</span>
              </li>
            </ul>
          </div>

          {/* Developer & Deployment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Deployment</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-1.5 text-xs">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                Frontend: <span className="text-slate-200">Cloudflare Pages</span>
              </p>
              <p className="flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Backend: <span className="text-slate-200">Render</span>
              </p>
              <div className="pt-2">
                <a
                  href="https://github.com/poornimabora-aiml/SkillSwap.git"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>© 2026 SkillSwap – Database Engineering (DBE) College Project. Designed & Developed by Poornima Bora.</p>
          <div className="flex items-center gap-1 text-slate-600">
            <span>Powered by Relational Matching Engine</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
