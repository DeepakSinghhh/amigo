import React from 'react';
import { HeartPulse, Bell, Activity, Brain, Trophy, Smile } from 'lucide-react';

const ParentPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 animate-neo-fade-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center neo-card-inset !rounded-[2rem] !p-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Parent Portal</h2>
          <p className="text-gray-500 mt-2 font-bold text-lg">Stay connected with your child's well-being.</p>
        </div>
        <div className="mt-4 md:mt-0 neo-badge neo-bg-peach text-[#7a2818] !px-6 !py-3 font-bold border border-white flex items-center gap-2">
          <HeartPulse size={18} /> Linked to: Deepak Singh
        </div>
      </div>

      <div className="neo-badge neo-bg-sky text-blue-900 p-5 !rounded-2xl flex gap-4 text-left shadow-[var(--neo-shadow-out-sm)] border border-white">
        <div className="w-1.5 bg-blue-500 rounded-full h-auto shadow-inner"></div>
        <p className="text-sm font-semibold leading-relaxed">
          <strong className="font-black block mb-1">Privacy Notice</strong> 
          To respect your child's autonomy, specific chat logs and journal entries remain strictly confidential. You are viewing high-level wellness summaries and safety alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Wellness Summary */}
        <div className="neo-card !p-8 border border-white/50 lg:col-span-2">
          <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
             <Activity className="text-[var(--neo-mint)] text-green-700" /> Weekly Wellness Summary
          </h3>
          <div className="grid grid-cols-2 gap-6">
              <div className="neo-card-inset !p-6 bg-white/40">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Average Mood</p>
                  <p className="text-3xl font-black text-blue-800 flex items-center gap-2">Good <Smile size={28} className="text-blue-500" /></p>
              </div>
              <div className="neo-card-inset !p-6 bg-white/40">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Platform Activity</p>
                  <p className="text-3xl font-black text-green-800">Active</p>
              </div>
              <div className="neo-card-inset !p-6 bg-white/40 col-span-2">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Recent Achievement</p>
                  <p className="text-lg font-bold text-gray-800 flex items-center gap-2"><Trophy size={20} className="text-yellow-500" /> Completed a 7-day Gratitude Journal Streak!</p>
              </div>
          </div>
        </div>

        {/* Alerts & Resources */}
        <div className="space-y-6">
          <div className="neo-card !p-8 bg-[var(--neo-peach)] border border-white/50">
            <h3 className="text-xl font-black text-[#7a2818] mb-6 flex items-center gap-2">
              <Bell /> Safety Alerts
            </h3>
            <div className="neo-card-inset !p-5 bg-white/40 border border-white/40 flex items-start ga!p-3">
                <CheckCircleIcon />
                <div>
                    <p className="font-bold text-gray-800">All Clear</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">No crisis patterns detected.</p>
                </div>
            </div>
          </div>

          <div className="neo-card !p-8 border border-white/50">
             <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                 <Brain className="text-[var(--neo-sky)]" /> Parent Resources
             </h3>
             <ul className="space-y-3 text-sm font-bold text-blue-600">
                 <li className="cursor-pointer hover:underline">How to talk about exam stress</li>
                 <li className="cursor-pointer hover:underline">Recognizing signs of burnout</li>
                 <li className="cursor-pointer hover:underline">Campus mental health policies</li>
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

const CheckCircleIcon = () => (
    <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

export default ParentPortal;
