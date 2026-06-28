import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const moodData = [
  { name: 'Jan', Anxiety: 40, Stress: 24, Calm: 24 },
  { name: 'Feb', Anxiety: 30, Stress: 13, Calm: 22 },
  { name: 'Mar', Anxiety: 60, Stress: 58, Calm: 15 }, // Exam season
  { name: 'Apr', Anxiety: 50, Stress: 45, Calm: 20 },
  { name: 'May', Anxiety: 30, Stress: 20, Calm: 40 },
];

const resourceData = [
  { name: 'Anxiety Guide', value: 400 },
  { name: 'Meditation Audio', value: 300 },
  { name: 'Sleep Video', value: 300 },
  { name: 'Exam Tips', value: 200 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-neo-fade-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center neo-card-inset !rounded-[2rem] !p-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Department Dashboard</h2>
          <p className="text-gray-500 mt-2 font-bold text-lg">Real-time anonymized analytics for mental health policy planning.</p>
        </div>
        <button className="mt-4 md:mt-0 neo-button neo-button-primary !px-6 !py-3">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { title: 'Active Users', value: '1,240', sub: '↑ 12% from last week', subColor: 'text-green-600' },
            { title: 'Chat Sessions', value: '856', sub: 'Avg duration: 12m', subColor: 'text-gray-500' },
            { title: 'Counseling Bookings', value: '42', sub: '98% Fulfillment rate', subColor: 'text-green-600' },
            { title: 'Crisis Alerts', value: '3', sub: 'Referred to helpline', subColor: 'text-red-500' }
        ].map((stat, idx) => (
            <div key={idx} className="neo-card !p-6 flex flex-col justify-between">
                <p className="text-sm text-gray-500 font-extrabold uppercase tracking-wide">{stat.title}</p>
                <p className="text-4xl font-black text-gray-900 mt-4 tracking-tight drop-shadow-sm">{stat.value}</p>
                <p className={`text-sm mt-3 font-bold ${stat.subColor}`}>{stat.sub}</p>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Trends Chart */}
        <div className="neo-card !p-8">
          <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Aggregated Mood Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" strokeOpacity={0.4} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#9ca3af" tick={{fontSize: 12, fontWeight: 'bold'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} stroke="#9ca3af" tick={{fontSize: 12, fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--neo-bg)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: 'var(--neo-shadow-out-sm)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 800 }}
                />
                <Line type="monotone" dataKey="Anxiety" stroke="#ef4444" strokeWidth={4} dot={{r:6, fill: '#ef4444', stroke: '#fff', strokeWidth: 2}} activeDot={{r: 8}} />
                <Line type="monotone" dataKey="Stress" stroke="#f59e0b" strokeWidth={4} dot={{r:6, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2}} activeDot={{r: 8}} />
                <Line type="monotone" dataKey="Calm" stroke="#0d9488" strokeWidth={4} dot={{r:6, fill: '#0d9488', stroke: '#fff', strokeWidth: 2}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-8 text-sm font-bold text-gray-600">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[var(--neo-shadow-out-sm)]"></div>Anxiety</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500 shadow-[var(--neo-shadow-out-sm)]"></div>Stress</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-teal-600 shadow-[var(--neo-shadow-out-sm)]"></div>Calm</div>
          </div>
        </div>

        {/* Resource Usage Chart */}
        <div className="neo-card !p-8">
          <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Popular Resources</h3>
          <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData} layout="vertical">
                   <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff" strokeOpacity={0.4} />
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 13, fill: '#4b5563', fontWeight: 800}} axisLine={false} tickLine={false} />
                   <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.4)'}}
                      contentStyle={{ backgroundColor: 'var(--neo-bg)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: 'var(--neo-shadow-out-sm)', fontWeight: 800 }}
                   />
                   <Bar dataKey="value" fill="var(--neo-sky)" radius={[12, 12, 12, 12]} barSize={28} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;