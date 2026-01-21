import React, { useState, useRef, useEffect } from 'react';
import { ViewState } from '../types';
import { Menu, X, HeartPulse, BookOpen, MessageCircle, Users, BarChart, Settings, LogOut, ChevronDown, Gamepad2 } from 'lucide-react';

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
    <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => setView(ViewState.HOME)}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="font-semibold text-lg text-[#1d1d1f] tracking-tight">AmiGo</span>
            </div>
          </div>

          {/* Desktop Nav - Pill Style */}
          <nav className="hidden md:flex space-x-1 items-center bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-out ${
                  currentView === item.view
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-black hover:bg-gray-200/50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Profile Dropdown */}
            <div className="relative hidden md:block" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none group"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Profile"
                  className="h-8 w-8 rounded-full ring-2 ring-transparent group-hover:ring-gray-200 transition-all object-cover shadow-sm"
                />
                <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 py-1 ring-1 ring-black ring-opacity-5 transform opacity-100 scale-100 transition-all origin-top-right">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-900 font-semibold">Alex Student</p>
                    <p className="text-xs text-gray-500 truncate">alex@university.edu</p>
                  </div>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings size={14} /> Settings
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut size={14} /> Sign out
                  </a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setView(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  currentView === item.view
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-500 hover:text-black hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                </span>
              </button>
            ))}
             <div className="border-t border-gray-100 mt-4 pt-4 px-2 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-900 font-medium">Alex Student</p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;