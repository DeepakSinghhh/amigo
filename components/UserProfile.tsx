import React, { useState } from 'react';
import { User, Mail, Bell, Shield, LogOut, CheckCircle2 } from 'lucide-react';

interface UserProfileProps {
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 animate-neo-fade-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center ga!p-4 neo-card-inset !rounded-[2rem] !p-6">
        <div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tight">Profile Settings</h2>
           <p className="text-gray-500 text-sm mt-2 font-bold">Manage your account and preferences.</p>
        </div>
        <button 
          onClick={onLogout}
          className="neo-button !bg-red-100 !text-red-700 hover:!bg-red-200 border border-red-200 flex items-center gap-2"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column - Avatar & Info */}
        <div className="md:col-span-1 space-y-6">
            <div className="neo-card !p-8 text-center flex flex-col items-center">
                <div className="w-32 h-32 bg-white rounded-full mb-6 shadow-[var(--neo-shadow-out-sm)] border-4 border-white flex items-center justify-center text-[var(--neo-sky)] relative">
                    <User size={64} className="text-blue-600" />
                    <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-100 shadow-md text-gray-500 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </button>
                </div>
                <h3 className="text-xl font-black text-gray-900">Student_1042</h3>
                <p className="text-sm font-bold text-gray-500 mt-1">Computer Science Major</p>
                
                <div className="mt-6 w-full neo-card-inset !p-4 bg-white/40 flex justify-between items-center">
                    <div className="text-left">
                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Level</p>
                        <p className="text-lg font-black text-blue-800">4</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest">XP</p>
                        <p className="text-lg font-black text-green-700">1250</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column - Forms */}
        <div className="md:col-span-2 space-y-6">
            <div className="neo-card !p-8 space-y-6">
                <h4 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-6">
                    <User size={24} className="text-[var(--neo-sky)]" /> Personal Information
                </h4>
                
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Alias / Display Name</label>
                        <input type="text" defaultValue="Student_1042" className="neo-input w-full" />
                        <p className="text-xs text-gray-400 font-semibold mt-1">Visible on the Peer Forum.</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Real Name</label>
                        <input type="text" defaultValue="Deepak Singh" className="neo-input w-full" />
                        <p className="text-xs text-gray-400 font-semibold mt-1">Visible only to booked counselors.</p>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Mail size={14} /> Email Address
                        </label>
                        <input type="email" defaultValue="deepak.s@university.edu" className="neo-input w-full" />
                    </div>
                </div>
            </div>

            <div className="neo-card !p-8 space-y-6">
                <h4 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-6">
                    <Shield size={24} className="text-[var(--neo-peach)]" /> Privacy & Notifications
                </h4>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between neo-card-inset !p-4 bg-white/40">
                        <div>
                            <p className="font-black text-gray-800">Share Analytics Anonymously</p>
                            <p className="text-xs font-bold text-gray-500">Helps the institution track overall wellness trends.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--neo-sky)] shadow-inner"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between neo-card-inset !p-4 bg-white/40">
                        <div>
                            <p className="font-black text-gray-800 flex items-center gap-2"><Bell size={16}/> Daily Wellness Reminders</p>
                            <p className="text-xs font-bold text-gray-500">Receive notifications to log your mood.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--neo-sky)] shadow-inner"></div>
                        </label>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-4">
                    {showSaved && (
                        <span className="text-green-600 font-bold flex items-center gap-2 animate-fade-in">
                            <CheckCircle2 size={18} /> Saved successfully
                        </span>
                    )}
                    <button onClick={handleSave} className="neo-button neo-button-primary !px-8">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
