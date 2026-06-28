import React, { useState } from 'react';
import { UserRole } from '../types';
import { UserCircle, Shield, Key, ArrowRight, HeartPulse } from 'lucide-react';
import NeoLogo from './NeoLogo';

interface AuthScreenProps {
  onLogin: (role: UserRole) => void;
}

const ROLES: { id: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'student', label: 'Student', icon: <img src="/student_logo.png" alt="Student" className="w-8 h-8 object-contain" />, color: 'bg-white text-black' },
  { id: 'parent', label: 'Parent / Guardian', icon: <img src="/parent_logo.png" alt="Parent" className="w-8 h-8 object-contain" />, color: 'bg-white text-black' },
  { id: 'counselor', label: 'Counselor', icon: <img src="/counselor_logo.png" alt="Counselor" className="w-8 h-8 object-contain" />, color: 'bg-white text-black' },
  { id: 'institution_admin', label: 'Institution Admin', icon: <img src="/admin_logo.png" alt="Admin" className="w-8 h-8 object-contain" />, color: 'bg-white text-black' },
  { id: 'super_admin', label: 'Super Admin', icon: <img src="/admin_logo.png" alt="Super Admin" className="w-8 h-8 object-contain" />, color: 'bg-white text-black' },
];

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--neo-bg)] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--neo-sky)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--neo-peach)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[var(--neo-mint)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="neo-card !p-10 max-w-lg w-full relative z-10 animate-neo-fade-up">
        
        <div className="text-center mb-10 w-full flex justify-center">
          <NeoLogo size="lg" showText={true} />
        </div>

        {/* Role Selector */}
        <div className="space-y-4 mb-8">
            <p className="text-sm font-black text-gray-500 uppercase tracking-widest text-center">Select your role</p>
            <div className="grid grid-cols-2 gap-3">
                {ROLES.slice(0, 4).map(role => (
                    <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`flex flex-col items-center p-4 rounded-xl transition-all border-2 border-black ${
                            selectedRole === role.id 
                            ? 'bg-[var(--neo-sky)] shadow-[var(--neo-shadow-active)] translate-y-1 translate-x-1' 
                            : 'bg-white hover:bg-gray-50 shadow-[var(--neo-shadow)] hover:translate-y-[-2px] hover:translate-x-[-2px]'
                        }`}
                    >
                        <div className={`p-2 rounded-2xl mb-2 ${role.color}`}>{role.icon}</div>
                        <span className="text-xs font-bold text-gray-900">{role.label}</span>
                    </button>
                ))}
            </div>
            {/* Super Admin centered at bottom */}
            <div className="flex justify-center mt-4">
                 <button
                    onClick={() => setSelectedRole(ROLES[4].id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all border-2 border-black ${
                        selectedRole === ROLES[4].id 
                        ? 'bg-[var(--neo-sky)] shadow-[var(--neo-shadow-active)] translate-y-1 translate-x-1' 
                        : 'bg-white hover:bg-gray-50 shadow-[var(--neo-shadow)] hover:translate-y-[-2px] hover:translate-x-[-2px]'
                    }`}
                >
                    <div className={`p-1.5 rounded-xl ${ROLES[4].color}`}>{ROLES[4].icon}</div>
                    <span className="text-xs font-bold text-gray-900">{ROLES[4].label}</span>
                </button>
            </div>
        </div>

        {/* Login Form */}
        <div className="neo-card-inset !p-6 space-y-5 bg-white/30 border border-white/40">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" placeholder="you@university.edu" className="neo-input w-full !py-3" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <input type="password" placeholder="••••••••" className="neo-input w-full !py-3" />
            </div>
            <button 
                onClick={() => onLogin(selectedRole)}
                className="neo-button neo-button-primary w-full !py-4 flex justify-center items-center gap-2 mt-4"
            >
                {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
            </button>
        </div>

        <div className="text-center mt-6">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
