import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, HeartPulse, BookOpen, MessageCircle, Users, BarChart, Settings, LogOut, ChevronDown, Gamepad2 } from 'lucide-react';
import NeoLogo from './NeoLogo';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    { path: '/home', label: 'Home', icon: null },
    { path: '/chat', label: 'AI Support', icon: <MessageCircle size={18} /> },
    { path: '/arcade', label: 'Arcade', icon: <Gamepad2 size={18} /> },
    { path: '/counseling', label: 'Counseling', icon: <HeartPulse size={18} /> },
    { path: '/resources', label: 'Resources', icon: <BookOpen size={18} /> },
    { path: '/forum', label: 'Peer Space', icon: <Users size={18} /> },
    { path: '/admin', label: 'Admin', icon: <BarChart size={18} /> },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="neo-card !py-3 !px-6 !rounded-full pointer-events-auto w-full max-w-6xl flex justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link to="/home" className="flex items-center cursor-pointer group">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                <NeoLogo size="sm" showText={false} />
              </div>
              <span className="font-extrabold text-2xl text-[var(--neo-text-dark)] tracking-tight ml-3">Chaitanya</span>
            </div>
          </Link>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:bg-gray-100 rounded-lg border-2 border-transparent hover:border-black transition-all focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex space-x-1 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all border-2 border-transparent whitespace-nowrap ${
                location.pathname === item.path
                  ? 'bg-[var(--neo-sky)] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] -translate-y-[2px] -translate-x-[2px]'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
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
                <button onClick={() => { navigate('/profile'); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-white/50 rounded-xl transition-colors">
                  <Settings size={16} /> Settings
                </button>
                <button onClick={() => { navigate('/'); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-1">
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 neo-card pointer-events-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  location.pathname === item.path
                    ? 'bg-white shadow-[var(--neo-shadow-in)] text-blue-700'
                    : 'text-gray-600 hover:text-black hover:bg-white/50'
                }`}
              >
                <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                </span>
              </Link>
            ))}
             <div 
                className="border-t border-gray-200/50 mt-4 pt-4 px-2 flex items-center gap-3 cursor-pointer"
                onClick={() => {
                   navigate('/profile');
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