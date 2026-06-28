import React from 'react';
import { ShieldAlert, Globe, Server, Link, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const policyData = [
  { name: 'National Helpline', value: 85 },
  { name: 'Campus Clinics', value: 65 },
  { name: 'Peer Support', value: 45 },
];

const SuperAdminPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 animate-neo-fade-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center neo-card-inset !rounded-[2rem] !p-8 bg-[var(--neo-amber)]">
        <div>
          <h2 className="text-3xl font-black text-[#7a2818] tracking-tight flex items-center gap-3">
             <ShieldAlert size={32} /> Super Admin Dashboard
          </h2>
          <p className="text-[#a32e1d] mt-2 font-bold text-lg">National oversight, policy creation, and helpline integrations.</p>
        </div>
        <div className="mt-4 md:mt-0 neo-badge bg-white text-orange-600 !px-6 !py-3 font-bold border border-white flex items-center gap-2 shadow-[var(--neo-shadow-out-sm)]">
          <Globe size={18} /> Region: National (India)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* API Integrations */}
        <div className="neo-card !p-8 border border-white/50 space-y-6 md:col-span-1">
          <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
             <Link className="text-[var(--neo-sky)]" /> API Integrations
          </h3>
          
          <div className="space-y-4">
              <div className="neo-card-inset !p-5 bg-white/40 border border-white/40">
                  <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">Kiran Helpline</span>
                      <span className="neo-badge bg-green-100 text-green-700 !px-2 !py-0.5 text-xs">Active</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500">Routing severe crisis alerts to national toll-free support.</p>
              </div>
              <div className="neo-card-inset !p-5 bg-white/40 border border-white/40">
                  <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">Tele-MANAS</span>
                      <span className="neo-badge bg-green-100 text-green-700 !px-2 !py-0.5 text-xs">Active</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500">Gov. mental health assistance integration.</p>
              </div>
              <div className="neo-card-inset !p-5 bg-white/40 border border-white/40 opacity-70">
                  <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">State NGOs</span>
                      <span className="neo-badge bg-yellow-100 text-yellow-700 !px-2 !py-0.5 text-xs">Pending</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500">Awaiting API keys.</p>
              </div>
          </div>
          <button className="neo-button neo-button-primary w-full !py-3">Add Integration</button>
        </div>

        {/* Global Stats & Policy */}
        <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-2 gap-6">
                <div className="neo-card !p-6 flex items-center ga!p-4 bg-[var(--neo-sky)]">
                    <div className="p-3 bg-white/60 rounded-2xl shadow-[var(--neo-shadow-out-sm)] border border-white"><Server size={28} className="text-blue-600"/></div>
                    <div>
                        <p className="text-xs font-black text-blue-800 uppercase tracking-widest">Active Campuses</p>
                        <p className="text-3xl font-black text-gray-900 mt-1">1,402</p>
                    </div>
                </div>
                <div className="neo-card !p-6 flex items-center ga!p-4 bg-[var(--neo-mint)]">
                    <div className="p-3 bg-white/60 rounded-2xl shadow-[var(--neo-shadow-out-sm)] border border-white"><Search size={28} className="text-green-700"/></div>
                    <div>
                        <p className="text-xs font-black text-green-900 uppercase tracking-widest">Total Audits</p>
                        <p className="text-3xl font-black text-gray-900 mt-1">24</p>
                    </div>
                </div>
            </div>

            <div className="neo-card !p-8">
              <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Support Channel Distribution (National)</h3>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={policyData} layout="vertical">
                       <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff" strokeOpacity={0.4} />
                       <XAxis type="number" hide />
                       <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 13, fill: '#4b5563', fontWeight: 800}} axisLine={false} tickLine={false} />
                       <Tooltip 
                          cursor={{fill: 'rgba(255,255,255,0.4)'}}
                          contentStyle={{ backgroundColor: 'var(--neo-bg)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: 'var(--neo-shadow-out-sm)', fontWeight: 800 }}
                       />
                       <Bar dataKey="value" fill="var(--neo-peach)" radius={[12, 12, 12, 12]} barSize={28} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminPortal;
