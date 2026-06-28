import React, { useState, useEffect } from 'react';
import { PenTool, CheckCircle, Heart, Star, Trophy } from 'lucide-react';

const GratitudeJournal: React.FC = () => {
    const [entries, setEntries] = useState<string[]>([]);
    const [newEntry, setNewEntry] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('chaitanya_gratitude');
        if (saved) {
            setEntries(JSON.parse(saved));
        }
    }, []);

    const handleSave = () => {
        if (!newEntry.trim()) return;
        const updated = [newEntry, ...entries].slice(0, 50); // Keep last 50
        setEntries(updated);
        localStorage.setItem('chaitanya_gratitude', JSON.stringify(updated));
        setNewEntry('');
        
        // Show celebration
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
    };

    return (
        <div className="flex flex-col h-full bg-[var(--neo-bg)] relative">
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
                    <div className="animate-ping absolute w-full h-full text-center flex items-center justify-center">
                        <Star className="text-yellow-400 h-32 w-32 opacity-50" />
                    </div>
                    <div className="animate-bounce text-4xl flex items-center gap-2 font-black text-yellow-600">
                        <Trophy size={40} className="text-yellow-500" /> +50 XP!
                    </div>
                </div>
            )}

            <div className="p-6 border-b border-white/60 shadow-[var(--neo-shadow-out-sm)] flex items-center gap-4 bg-[var(--neo-amber)]">
                <div className="w-12 h-12 rounded-full neo-card flex items-center justify-center text-orange-600 bg-white">
                    <PenTool size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-[#7a2818] tracking-tight">Daily Gratitude</h3>
                    <p className="text-[#a32e1d] font-bold text-sm">Write down one good thing today.</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto !p-6 space-y-6 neo-card-inset !rounded-none shadow-[inset_0_4px_12px_rgba(0,0,0,0.02)]">
                <div className="neo-card bg-white border border-white/50 space-y-4">
                    <textarea 
                        value={newEntry}
                        onChange={(e) => setNewEntry(e.target.value)}
                        placeholder="I am grateful for..."
                        className="w-full neo-input !p-4 min-h-[100px] text-gray-800 font-semibold"
                    ></textarea>
                    <button 
                        onClick={handleSave}
                        disabled={!newEntry.trim()}
                        className="neo-button neo-button-primary w-full !py-3 flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={18} /> Save Entry
                    </button>
                </div>

                <div className="space-y-4 mt-8">
                    <h4 className="font-extrabold text-gray-700 tracking-tight flex items-center gap-2">
                        <Heart size={18} className="text-[var(--neo-coral)]" /> Past Entries
                    </h4>
                    {entries.length === 0 ? (
                        <p className="text-gray-500 font-semibold text-center py-8">Your journal is empty. Start writing!</p>
                    ) : (
                        <div className="space-y-3">
                            {entries.map((entry, idx) => (
                                <div key={idx} className="neo-card-inset !p-4 bg-white/50 border border-white/30 text-gray-700 font-bold">
                                    {entry}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GratitudeJournal;
