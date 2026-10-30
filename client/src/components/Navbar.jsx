import React, { useState } from 'react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, X, Sparkles, User, LogOut, ArrowRightLeft, 
  LayoutDashboard, Search, HelpCircle, Info, ChevronDown 
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, openDbeModal }) {
  const { user, logout, quickSwitchUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'explore', label: 'Explore Skills', icon: Search },
    { id: 'matching', label: 'Two-Way Match', icon: ArrowRightLeft, badge: 'Key Feature' },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const handleNav = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  const demoUsers = [
    { name: 'Alice Johnson', email: 'alice@skillswap.edu', role: 'Python ➔ Design' },
    { name: 'Bob Smith', email: 'bob@skillswap.edu', role: 'Design ➔ Python (100% Match)' },
    { name: 'Carlos Mendoza', email: 'carlos@skillswap.edu', role: 'Spanish ➔ Database' },
    { name: 'Poornima Bora', email: 'poornima@skillswap.edu', role: 'AI & DBE Creator' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => handleNav('home')}>
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-600'}`} />}
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* DBE Project Showcase Button */}
            <button
              onClick={openDbeModal}
              className="ml-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
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
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    title="Quickly switch between pre-seeded users to test Two-Way Matching"
                  >
                    <span>Switch User</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {demoDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100">
                        Demo Test Profiles
                      </div>
                      {demoUsers.map(u => (
                        <button
                          key={u.email}
                          onClick={() => {
                            quickSwitchUser(u.email);
                            setDemoDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-indigo-50/70 transition-colors ${
                            user.email === u.email ? 'bg-indigo-50 font-bold text-indigo-700' : 'text-slate-700'
                          }`}
                        >
                          <span className="font-semibold">{u.name}</span>
                          <span className="text-[10px] text-slate-600">{u.role}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dashboard Button */}
                <button
                  onClick={() => handleNav('dashboard')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
                    activePage === 'dashboard'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>

                {/* My Exchanges Button */}
                <button
                  onClick={() => handleNav('exchanges')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
                    activePage === 'exchanges'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Exchanges
                </button>

                {/* User Profile Avatar */}
                <button
                  onClick={() => handleNav('profile')}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-slate-200 hover:border-indigo-300 transition-colors"
                >
                  <img
                    src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.full_name}`}
                    alt={user.full_name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {user.full_name.split(' ')[0]}
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openDbeModal}
              className="px-2 py-1 rounded-md text-[11px] font-bold bg-slate-900 text-indigo-300 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              DBE
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                activePage === link.id ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500 text-white rounded-full">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          {user ? (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="px-3 py-1 text-xs text-slate-600">
                Logged in as <strong className="text-slate-800">{user.full_name}</strong>
              </div>
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </button>
              <button
                onClick={() => handleNav('exchanges')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-800 flex items-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                My Skill Exchanges
              </button>
              <button
                onClick={() => handleNav('profile')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Edit Profile & Skills
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNav('login')}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
              >
                Log In
              </button>
              <button
                onClick={() => handleNav('register')}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-indigo-600 rounded-xl shadow-md"
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
