import React, { useState, useRef, useEffect } from 'react';
import { ViewState } from '../types';
import { Menu, X, HeartPulse, BookOpen, MessageCircle, Users, BarChart, Settings, LogOut, ChevronDown, Gamepad2 } from 'lucide-react';
import NeoLogo from './NeoLogo';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { view: ViewState.HOME, label: 'Home', icon: null },
    { view: ViewState.CHAT, label: 'AI Support', icon: <MessageCircle size={18} /> },
    { view: ViewState.GAMES, label: 'Arcade', icon: <Gamepad2 size={18} /> },
    { view: ViewState.BOOKING, label: 'Counseling', icon: <HeartPulse size={18} /> },
    { view: ViewState.RESOURCES, label: 'Resources', icon: <BookOpen size={18} /> },
    { view: ViewState.FORUM, label: 'Peer Space', icon: <Users size={18} /> },
    { view: ViewState.ADMIN, label: 'Admin', icon: <BarChart size={18} /> },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="neo-card !py-3 !px-6 !rounded-full pointer-events-auto w-full max-w-6xl flex justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="flex items-center cursor-pointer group" onClick={() => setView(ViewState.HOME)}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                <NeoLogo size="sm" showText={false} />
              </div>
              <span className="font-extrabold text-2xl text-[var(--neo-text-dark)] tracking-tight ml-3">Chaitanya</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:bg-gray-100 rounded-lg border-2 border-transparent hover:border-black transition-all focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-1 items-center">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all border-2 border-transparent whitespace-nowrap ${
                currentView === item.view
                  ? 'bg-[var(--neo-sky)] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] -translate-y-[2px] -translate-x-[2px]'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="border-2 border-transparent hover:border-black rounded-full p-1 flex items-center transition-all focus:outline-none hover:-translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover border border-black"
              />
              <ChevronDown size={16} className={`text-black transition-transform duration-200 ml-1 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-4 w-48 neo-card !p-2 !rounded-2xl transform opacity-100 scale-100 transition-all origin-top-right">
                <div className="px-3 py-3 border-b border-gray-200/50 mb-2">
                  <p className="text-sm text-gray-900 font-bold">Alex Student</p>
                  <p className="text-xs text-gray-500 truncate">alex@university.edu</p>
                </div>
                <button onClick={() => { setView(ViewState.PROFILE); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-white/50 rounded-xl transition-colors">
                  <Settings size={16} /> Settings
                </button>
                <button onClick={() => { setView(ViewState.LOGIN); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-1">
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute to!p-20 left-4 right-4 neo-card pointer-events-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setView(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  currentView === item.view
                    ? 'bg-white shadow-[var(--neo-shadow-in)] text-blue-700'
                    : 'text-gray-600 hover:text-black hover:bg-white/50'
                }`}
              >
                <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                </span>
              </button>
            ))}
             <div 
                className="border-t border-gray-200/50 mt-4 pt-4 px-2 flex items-center gap-3 cursor-pointer"
                onClick={() => {
                   setView(ViewState.PROFILE);
                   setIsMobileMenuOpen(false);
                }}
             >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Profile"
                  className="h-12 w-12 rounded-full object-cover shadow-[var(--neo-shadow-out-sm)]"
                />
                <div>
                  <p className="text-gray-900 font-bold">Alex Student</p>
                  <p className="text-xs text-gray-500 font-semibold text-blue-600 hover:underline">View Profile</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;