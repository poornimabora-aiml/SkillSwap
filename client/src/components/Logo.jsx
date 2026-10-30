import React from 'react';

export default function Logo({ className = "h-9", showText = true, light = true }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Synapse Knowledge Node */}
      <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 flex items-center justify-center shadow-lg shadow-indigo-500/25 group overflow-hidden">
        {/* Ambient background bloom */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-600/30 opacity-60 group-hover:opacity-100 transition-opacity" />
        
        <svg className="w-6 h-6 relative z-10 text-indigo-400 group-hover:rotate-180 transition-transform duration-700 ease-out" viewBox="0 0 24 24" fill="none">
          {/* Top curve (Teaches) */}
          <path
            d="M4 10C4 6.2 7.5 3.5 12 3.5C15.8 3.5 19 5.2 20 8"
            stroke="url(#synapseGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polygon points="17.5,7.8 21,8.5 20.2,5" fill="#c084fc" />
          
          {/* Bottom curve (Learns) */}
          <path
            d="M20 14C20 17.8 16.5 20.5 12 20.5C8.2 20.5 5 18.8 4 16"
            stroke="url(#synapseGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polygon points="6.5,16.2 3,15.5 3.8,19" fill="#818cf8" />

          {/* Central Knowledge Spark */}
          <circle cx="12" cy="12" r="2.2" fill="#ffffff" className="animate-ping opacity-75" />
          <circle cx="12" cy="12" r="2.2" fill="#ffffff" />
          
          <defs>
            <linearGradient id="synapseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-black text-2xl tracking-tight text-white">
              Skill<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Swap</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80 animate-pulse" />
          </div>
          <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase text-indigo-300/80 mt-1">
            Two-Way Skill Exchange
          </span>
        </div>
      )}
    </div>
  );
}
