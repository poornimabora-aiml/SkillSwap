import React from 'react';

export default function Logo({ className = "h-9", showText = true, light = false }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon */}
      <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-500/20 group">
        <svg className="w-6 h-6 text-indigo-400 group-hover:rotate-180 transition-transform duration-700" viewBox="0 0 24 24" fill="none">
          {/* Top curve */}
          <path
            d="M4 10C4 6.5 7.5 4 12 4C15.5 4 18.5 5.5 19.5 8"
            stroke="url(#navLogoGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <polygon points="17,8 20.5,8.5 20,5" fill="#a855f7" />
          
          {/* Bottom curve */}
          <path
            d="M20 14C20 17.5 16.5 20 12 20C8.5 20 5.5 18.5 4.5 16"
            stroke="url(#navLogoGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <polygon points="7,16 3.5,15.5 4,19" fill="#6366f1" />

          {/* Center spark */}
          <circle cx="12" cy="12" r="2" fill="#ffffff" />
          
          <defs>
            <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold text-xl tracking-tight leading-none ${light ? 'text-white' : 'text-slate-900'}`}>
            Skill<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Swap</span>
          </span>
          <span className="text-[9px] font-bold tracking-widest uppercase text-slate-600">
            Two-Way Exchange
          </span>
        </div>
      )}
    </div>
  );
}
