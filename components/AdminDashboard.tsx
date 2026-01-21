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
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Department Dashboard</h2>
          <p className="text-gray-500 mt-1">Real-time anonymized analytics for mental health policy planning.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-white border border-gray-200 text-gray-900 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { title: 'Active Users', value: '1,240', sub: '↑ 12% from last week', subColor: 'text-green-600' },
            { title: 'Chat Sessions', value: '856', sub: 'Avg duration: 12m', subColor: 'text-gray-500' },
            { title: 'Counseling Bookings', value: '42', sub: '98% Fulfillment rate', subColor: 'text-green-600' },
            { title: 'Crisis Alerts', value: '3', sub: 'Referred to helpline', subColor: 'text-orange-500' }
        ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">{stat.value}</p>
                <p className={`text-xs mt-1 font-medium ${stat.subColor}`}>{stat.sub}</p>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Trends Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Aggregated Mood Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#9ca3af" tick={{fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} stroke="#9ca3af" tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                />
                <Line type="monotone" dataKey="Anxiety" stroke="#ef4444" strokeWidth={3} dot={{r:4, fill: '#ef4444', strokeWidth: 0}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="Stress" stroke="#f59e0b" strokeWidth={3} dot={{r:4, fill: '#f59e0b', strokeWidth: 0}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="Calm" stroke="#0d9488" strokeWidth={3} dot={{r:4, fill: '#0d9488', strokeWidth: 0}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-6 text-sm font-medium text-gray-600">
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>Anxiety</div>
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>Stress</div>
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>Calm</div>
          </div>
        </div>

        {/* Resource Usage Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Resources</h3>
          <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData} layout="vertical">
                   <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={110} tick={{fontSize: 13, fill: '#4b5563', fontWeight: 500}} />
                   <Tooltip 
                      cursor={{fill: '#f9fafb'}}
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                   />
                   <Bar dataKey="value" fill="#0071e3" radius={[0, 6, 6, 0]} barSize={24} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;