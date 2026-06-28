import React from 'react';
import { Calendar, Video, MessageSquare, ClipboardList, Clock } from 'lucide-react';

const MOCK_APPOINTMENTS = [
  { id: 1, student: 'Deepak Singh', time: '10:00 AM Today', type: 'Video Session', status: 'upcoming' },
  { id: 2, student: 'Anonymous_821', time: '2:00 PM Today', type: 'Chat Session', status: 'upcoming' },
  { id: 3, student: 'Sarah K.', time: '11:00 AM Yesterday', type: 'Video Session', status: 'completed' },
];

const CounselorPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 animate-neo-fade-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center neo-card-inset !rounded-[2rem] !p-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Counselor Portal</h2>
          <p className="text-gray-500 mt-2 font-bold text-lg">Manage your appointments and support students.</p>
        </div>
        <div className="mt-4 md:mt-0 neo-badge neo-bg-mint text-green-900 !px-6 !py-3 font-bold border border-white">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2 inline-block"></span>
          Status: Available
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="neo-card !p-8 h-full">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="text-[var(--neo-sky)]" /> Upcoming Appointments
            </h3>
            
            <div className="space-y-4">
              {MOCK_APPOINTMENTS.map(apt => (
                <div key={apt.id} className="neo-card-inset !p-5 flex items-center justify-between hover:bg-white/60 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl shadow-[var(--neo-shadow-out-sm)] border border-white ${apt.type.includes('Video') ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                      {apt.type.includes('Video') ? <Video size={24} /> : <MessageSquare size={24} />}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-lg">{apt.student}</h4>
                      <p className="text-sm font-bold text-gray-500 flex items-center gap-1"><Clock size={14} /> {apt.time}</p>
                    </div>
                  </div>
                  {apt.status === 'upcoming' ? (
                    <button className="neo-button neo-button-primary !py-2 !px-4">Join</button>
                  ) : (
                    <span className="neo-badge bg-gray-100 text-gray-500 border border-white">Completed</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="space-y-6">
          <div className="neo-card !p-8 bg-[var(--neo-amber)] border border-white/50">
            <h3 className="text-xl font-black text-[#7a2818] mb-6 flex items-center gap-2">
              <ClipboardList /> Quick Notes
            </h3>
            <textarea 
              className="neo-input w-full h-32 !p-4 font-bold text-gray-800 bg-white/60 focus:bg-white" 
              placeholder="Jot down notes between sessions..."
            ></textarea>
            <button className="neo-button bg-white/60 hover:bg-white text-[#7a2818] w-full mt-4">Save Note</button>
          </div>

          <div className="neo-card !p-8 border border-white/50">
             <h3 className="text-lg font-black text-gray-900 mb-4">Patient Insights</h3>
             <div className="space-y-3">
                 <div className="neo-card-inset !p-3 flex justify-between bg-white/40">
                     <span className="font-bold text-gray-600">Total Sessions</span>
                     <span className="font-black text-gray-900">124</span>
                 </div>
                 <div className="neo-card-inset !p-3 flex justify-between bg-white/40">
                     <span className="font-bold text-gray-600">Avg Rating</span>
                     <span className="font-black text-green-600">4.9/5</span>
                 </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CounselorPortal;
