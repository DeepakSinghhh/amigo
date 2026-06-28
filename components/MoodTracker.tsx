import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MoodLog } from '../types';
import { SmilePlus, Smile, Meh, Frown, ThumbsDown } from 'lucide-react';

const MOODS = [
    { label: 'great', icon: <SmilePlus size={32} />, score: 5, color: 'text-green-600' },
    { label: 'good', icon: <Smile size={32} />, score: 4, color: 'text-teal-500' },
    { label: 'okay', icon: <Meh size={32} />, score: 3, color: 'text-blue-500' },
    { label: 'bad', icon: <Frown size={32} />, score: 2, color: 'text-orange-500' },
    { label: 'awful', icon: <ThumbsDown size={32} />, score: 1, color: 'text-red-600' }
];

const MoodTracker: React.FC = () => {
    const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
    
    useEffect(() => {
        const saved = localStorage.getItem('chaitanya_moods');
        if (saved) {
            setMoodLogs(JSON.parse(saved));
        } else {
            // Mock data for demo
            const mock: MoodLog[] = [];
            for (let i = 6; i >= 1; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                mock.push({
                    date: d.toLocaleDateString('en-US', { weekday: 'short' }),
                    mood: 'good',
                    score: Math.floor(Math.random() * 3) + 3
                });
            }
            setMoodLogs(mock);
            localStorage.setItem('chaitanya_moods', JSON.stringify(mock));
        }
    }, []);

    const handleLogMood = (mood: any) => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        
        // Remove today's existing log if exists
        const filtered = moodLogs.filter(m => m.date !== today);
        const newLogs = [...filtered, { date: today, mood: mood.label, score: mood.score }].slice(-7);
        
        setMoodLogs(newLogs);
        localStorage.setItem('chaitanya_moods', JSON.stringify(newLogs));
    };

    const hasLoggedToday = moodLogs.some(m => m.date === new Date().toLocaleDateString('en-US', { weekday: 'short' }));

    return (
        <div className="neo-card !p-6 w-full space-y-6">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">How are you feeling today?</h3>
            
            <div className="flex justify-between items-center bg-white/50 rounded-3xl p-2 border border-white">
                {MOODS.map(m => (
                    <button
                        key={m.label}
                        onClick={() => handleLogMood(m)}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all hover:scale-110 flex-1 ${hasLoggedToday && moodLogs[moodLogs.length-1].score === m.score ? 'bg-white shadow-[var(--neo-shadow-out-sm)]' : 'hover:bg-white/60'}`}
                    >
                        <span className={`mb-1 ${m.color}`}>{m.icon}</span>
                        <span className={`text-xs font-bold capitalize ${m.color}`}>{m.label}</span>
                    </button>
                ))}
            </div>

            <div className="neo-card-inset !p-4 h-64 mt-6">
                <h4 className="text-sm font-bold text-gray-500 mb-4 ml-2">Your 7-Day Mood Trend</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodLogs}>
                        <XAxis dataKey="date" stroke="#9ca3af" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                        <YAxis domain={[1, 5]} hide />
                        <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                            formatter={(value: number) => {
                                const m = MOODS.find(x => x.score === value);
                                return [m?.label || '', 'Mood'];
                            }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#0ea5e9" 
                            strokeWidth={4}
                            dot={{ r: 6, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MoodTracker;
