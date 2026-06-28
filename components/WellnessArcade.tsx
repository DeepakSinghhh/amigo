import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Wind, Activity, X, PenTool } from 'lucide-react';
import FlappyLlama from './FlappyLlama';
import GratitudeJournal from './GratitudeJournal';

const WellnessArcade: React.FC = () => {
    const [activeGame, setActiveGame] = useState<'llama' | 'breathing' | 'bubble' | 'journal' | null>(null);
    const [xp, setXp] = useState(1250);
    const [streak, setStreak] = useState(5);

    // --- Bubble Pop Game Components ---
    const BubbleGame = () => {
        const [score, setScore] = useState(0);
        const [bubbles, setBubbles] = useState<{id: number, x: number, y: number, color: string, speed: number}[]>([]);
        const canvasRef = useRef<HTMLDivElement>(null);
        const frameRef = useRef<number>(0);

        const colors = ['bg-blue-400', 'bg-pink-400', 'bg-purple-400', 'bg-green-400', 'bg-orange-400'];

        useEffect(() => {
            const spawnBubble = () => {
                const id = Date.now();
                const x = Math.random() * 80 + 10; // % position
                const color = colors[Math.floor(Math.random() * colors.length)];
                const speed = Math.random() * 0.5 + 0.2;
                
                setBubbles(prev => [...prev, { id, x, y: 100, color, speed }]);
            };

            const interval = setInterval(spawnBubble, 800);

            const loop = () => {
                setBubbles(prev => 
                    prev
                        .map(b => ({ ...b, y: b.y - b.speed }))
                        .filter(b => b.y > -20)
                );
                frameRef.current = requestAnimationFrame(loop);
            };
            loop();

            return () => {
                clearInterval(interval);
                cancelAnimationFrame(frameRef.current);
            };
        }, []);

        const popBubble = (id: number) => {
            setScore(s => s + 10);
            setBubbles(prev => prev.filter(b => b.id !== id));
            // Optional: Play sound here
        };

        return (
            <div className="relative w-full h-full bg-gradient-to-b from-blue-50 to-white overflow-hidden rounded-2xl border-4 border-white shadow-inner" ref={canvasRef}>
                 {/* Score moved to left to avoid close button overlap */}
                 <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full font-bold text-blue-600 shadow-sm z-10">
                    Score: {score}
                 </div>
                 {bubbles.map(b => (
                     <button
                        key={b.id}
                        onClick={() => popBubble(b.id)}
                        className={`absolute w-16 h-16 rounded-full ${b.color} opacity-80 backdrop-blur-sm shadow-lg transform transition-transform active:scale-95 flex items-center justify-center border-2 border-white/50`}
                        style={{ left: `${b.x}%`, top: `${b.y}%` }}
                     >
                        <div className="w-4 h-2 bg-white/40 rounded-full absolute top-3 left-3 transform -rotate-45"></div>
                     </button>
                 ))}
                 <div className="absolute bottom-4 left-0 w-full text-center text-gray-400 text-sm pointer-events-none">
                    Pop the bubbles to relieve stress!
                 </div>
            </div>
        );
    };

    // --- Breathing Exercise Component ---
    const BreathingGame = () => {
        const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
        
        useEffect(() => {
            const cycle = async () => {
                while(true) {
                    setPhase('Inhale');
                    await new Promise(r => setTimeout(r, 4000));
                    setPhase('Hold');
                    await new Promise(r => setTimeout(r, 4000));
                    setPhase('Exhale');
                    await new Promise(r => setTimeout(r, 4000));
                    setPhase('Hold');
                    await new Promise(r => setTimeout(r, 2000)); // Shorter hold after exhale
                }
            };
            cycle();
        }, []);

        return (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl">
                <div className="relative flex items-center justify-center">
                    {/* Expanding Circle */}
                    <div 
                        className={`w-48 h-48 rounded-full bg-teal-400/20 absolute transition-all duration-[4000ms] ease-in-out ${
                            phase === 'Inhale' ? 'scale-150 opacity-50' : phase === 'Exhale' ? 'scale-75 opacity-20' : 'scale-125 opacity-40'
                        }`}
                    ></div>
                    <div 
                        className={`w-32 h-32 rounded-full bg-teal-500/30 absolute transition-all duration-[4000ms] ease-in-out ${
                            phase === 'Inhale' ? 'scale-125' : phase === 'Exhale' ? 'scale-90' : 'scale-110'
                        }`}
                    ></div>
                    
                    <div className="z-10 text-center">
                        <h3 className="text-3xl font-bold text-teal-800 transition-all duration-500">{phase}</h3>
                        <p className="text-teal-600 mt-2 font-medium">
                            {phase === 'Inhale' && "Breathe in deeply..."}
                            {phase === 'Hold' && "Hold..."}
                            {phase === 'Exhale' && "Release slowly..."}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 min-h-screen">
            {/* Gamification Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center neo-card-inset !rounded-[2rem] !p-6 mb-8 ga!p-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white shadow-[var(--neo-shadow-out-sm)] flex items-center justify-center text-2xl border border-white/50">
                        🏆
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Wellness Champion</h3>
                        <p className="text-sm font-bold text-gray-500">Level 4</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="neo-badge neo-bg-coral text-[#7a2818] flex items-center gap-2 !px-4 !py-2 !text-sm">
                        <span>🔥</span> {streak} Day Streak
                    </div>
                    <div className="neo-badge neo-bg-mint text-green-900 flex items-center gap-2 !px-4 !py-2 !text-sm">
                        <span>⭐</span> {xp} XP
                    </div>
                </div>
            </div>

            <div className="text-center space-y-4 py-8 animate-neo-fade-up">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto text-purple-600 mb-4 shadow-[var(--neo-shadow-out-sm)] border border-white">
                    <Gamepad2 size={32} />
                </div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Wellness Arcade</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg font-bold">
                    Take a mental break with these simple, stress-relieving activities.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Game Card 1: Llama Leap */}
                <div 
                    onClick={() => setActiveGame('llama')}
                    className="neo-card neo-bg-sky cursor-pointer group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition-transform shadow-[var(--neo-shadow-out-sm)] border border-white">
                             <span className="text-3xl">🦙</span>
                        </div>
                        <h3 className="text-2xl font-black text-blue-900 mb-2 tracking-tight">Llama Leap</h3>
                        <p className="text-blue-800 font-semibold leading-relaxed">Focus your mind with this rhythmic jumping game. How far can you go?</p>
                        <div className="mt-6 flex items-center text-blue-900 font-black gap-2">
                            Play Now <Activity size={18} />
                        </div>
                    </div>
                </div>

                {/* Game Card 2: Bubble Pop */}
                <div 
                    onClick={() => setActiveGame('bubble')}
                    className="neo-card neo-bg-peach cursor-pointer group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform shadow-[var(--neo-shadow-out-sm)] border border-white">
                             <div className="w-8 h-8 rounded-full border-4 border-pink-400"></div>
                        </div>
                        <h3 className="text-2xl font-black text-[#7a2818] mb-2 tracking-tight">Bubble Pop</h3>
                        <p className="text-[#a32e1d] font-semibold leading-relaxed">Satisfying stress relief. Pop the floating bubbles to clear your mind.</p>
                         <div className="mt-6 flex items-center text-[#7a2818] font-black gap-2">
                            Start Popping <Activity size={18} />
                        </div>
                    </div>
                </div>

                {/* Game Card 3: Zen Breath */}
                <div 
                    onClick={() => setActiveGame('breathing')}
                    className="neo-card neo-bg-mint cursor-pointer group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center text-teal-700 mb-6 group-hover:scale-110 transition-transform shadow-[var(--neo-shadow-out-sm)] border border-white">
                             <Wind size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-green-900 mb-2 tracking-tight">Zen Breath</h3>
                        <p className="text-green-800 font-semibold leading-relaxed">A guided 4-7-8 breathing exercise to lower cortisol and anxiety.</p>
                         <div className="mt-6 flex items-center text-green-900 font-black gap-2">
                            Begin Exercise <Activity size={18} />
                        </div>
                    </div>
                </div>

                {/* Game Card 4: Gratitude Journal */}
                <div 
                    onClick={() => setActiveGame('journal')}
                    className="neo-card neo-bg-amber cursor-pointer group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-[var(--neo-shadow-out-sm)] border border-white">
                             <PenTool size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-[#7a2818] mb-2 tracking-tight">Gratitude Journal</h3>
                        <p className="text-[#a32e1d] font-semibold leading-relaxed">Reflect on the good things in your day. Earn XP for daily entries.</p>
                         <div className="mt-6 flex items-center text-[#7a2818] font-black gap-2">
                            Start Writing <Activity size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Modal Overlay */}
            {activeGame && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" style={{zIndex: 100}}>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setActiveGame(null)}></div>
                    <div className="relative w-full max-w-lg h-[600px] neo-card !p-0 overflow-hidden animate-neo-fade-up">
                         
                         <div className="h-full w-full bg-[var(--neo-bg)]">
                             {activeGame === 'llama' && <FlappyLlama onClose={() => setActiveGame(null)} variant="arcade" />}
                             {activeGame === 'bubble' && <BubbleGame />}
                             {activeGame === 'breathing' && <BreathingGame />}
                             {activeGame === 'journal' && <GratitudeJournal />}
                         </div>

                        {/* Moved button to end of container to ensure it's on top of game content */}
                        {activeGame !== 'llama' && (
                             <button 
                                onClick={() => setActiveGame(null)}
                                className="absolute top-4 right-4 z-50 p-2 bg-white/40 hover:bg-white/60 backdrop-blur-lg rounded-full text-gray-800 transition-colors border border-white/50 shadow-md"
                                title="Close Activity"
                             >
                                <X size={24} />
                             </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WellnessArcade;