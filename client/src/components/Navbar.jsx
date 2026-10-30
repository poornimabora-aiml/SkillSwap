import React, { useState } from 'react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, X, Sparkles, User, LogOut, ArrowRightLeft, 
  LayoutDashboard, Search, HelpCircle, Info, ChevronDown, CheckCircle2 
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, openDbeModal }) {
  const { user, logout, quickSwitchUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'explore', label: 'Explore Skills', icon: Search },
    { id: 'matching', label: 'Two-Way Match', icon: ArrowRightLeft, badge: 'Live AI' },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const handleNav = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  const demoUsers = [
    { name: 'Alice Johnson', email: 'alice@skillswap.edu', role: 'Python ➔ Graphic Design' },
    { name: 'Bob Smith', email: 'bob@skillswap.edu', role: 'Graphic Design ➔ Python (100% Match)' },
    { name: 'Carlos Mendoza', email: 'carlos@skillswap.edu', role: 'Spanish ➔ Database Management' },
    { name: 'Poornima Bora', email: 'poornima@skillswap.edu', role: 'AI & DBE Lead Architect' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => handleNav('home')}>
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-white/[0.06]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />}
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* DBE Project Showcase Button */}
            <button
              onClick={openDbeModal}
              className="ml-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
              title="Database Engineering (DBE) ER Schema & Relational Specifications"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              DBE Schema
            </button>
          </nav>

          {/* Right Section: Auth & User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {/* Switch Demo Account Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] transition-colors"
                    title="Quickly switch between pre-seeded users to test Two-Way Matching"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Switch User</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {demoDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3.5 py-1.5 text-[10px] font-black text-indigo-400 uppercase tracking-widest border-b border-white/[0.06]">
                        Fast 1-Click Demo Profiles
                      </div>
                      {demoUsers.map(u => (
                        <button
                          key={u.email}
                          onClick={() => {
                            quickSwitchUser(u.email);
                            setDemoDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-xs flex flex-col hover:bg-indigo-600/20 transition-colors ${
                            user.email === u.email ? 'bg-indigo-600/30 text-white font-bold border-l-2 border-indigo-500' : 'text-slate-300'
                          }`}
                        >
                          <span className="font-bold">{u.name}</span>
                          <span className="text-[10px] text-slate-400">{u.role}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dashboard Button */}
                <button
                  onClick={() => handleNav('dashboard')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activePage === 'dashboard'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08]'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </button>

                {/* My Exchanges Button */}
                <button
                  onClick={() => handleNav('exchanges')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activePage === 'exchanges'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08]'
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  Exchanges
                </button>

                {/* User Profile Avatar */}
                <button
                  onClick={() => handleNav('profile')}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-900/90 border border-white/[0.1] hover:border-indigo-400/50 transition-colors"
                >
                  <img
                    src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.full_name}`}
                    alt={user.full_name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/40"
                  />
                  <span className="text-xs font-bold text-white max-w-[100px] truncate">
                    {user.full_name.split(' ')[0]}
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openDbeModal}
              className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-900 text-indigo-300 border border-indigo-500/30 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              DBE
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:bg-white/[0.08]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                activePage === link.id ? 'bg-indigo-600 text-white font-extrabold' : 'text-slate-300 hover:bg-white/[0.06]'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-full">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          {user ? (
            <div className="pt-3 border-t border-white/[0.08] space-y-2">
              <div className="px-3 py-1 text-xs text-slate-400">
                Signed in as <strong className="text-white">{user.full_name}</strong>
              </div>
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Open Dashboard
              </button>
              <button
                onClick={() => handleNav('exchanges')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-200 border border-white/10 flex items-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                My Skill Exchanges
              </button>
              <button
                onClick={() => handleNav('profile')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/[0.06] flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Edit Profile & Skills
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-white/[0.08] grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNav('login')}
                className="w-full py-2.5 text-center text-xs font-bold text-slate-300 bg-slate-900 rounded-xl border border-white/10"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('register')}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-indigo-600 rounded-xl shadow-md"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
