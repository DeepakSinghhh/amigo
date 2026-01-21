import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Wind, Activity, X } from 'lucide-react';
import FlappyLlama from './FlappyLlama';

const WellnessArcade: React.FC = () => {
    const [activeGame, setActiveGame] = useState<'llama' | 'breathing' | 'bubble' | null>(null);

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
            <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto text-purple-600 mb-4 shadow-sm">
                    <Gamepad2 size={32} />
                </div>
                <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">Wellness Arcade</h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    Take a mental break with these simple, stress-relieving activities.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Game Card 1: Llama Leap */}
                <div 
                    onClick={() => setActiveGame('llama')}
                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-bl-[100px] -mr-8 -mt-8 z-0"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition-transform">
                             <span className="text-2xl">🦙</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Llama Leap</h3>
                        <p className="text-gray-500 leading-relaxed">Focus your mind with this rhythmic jumping game. How far can you go?</p>
                        <div className="mt-6 flex items-center text-sky-600 font-semibold gap-2">
                            Play Now <Activity size={16} />
                        </div>
                    </div>
                </div>

                {/* Game Card 2: Bubble Pop */}
                <div 
                    onClick={() => setActiveGame('bubble')}
                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-[100px] -mr-8 -mt-8 z-0"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                             <div className="w-6 h-6 rounded-full border-2 border-pink-500"></div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Bubble Pop</h3>
                        <p className="text-gray-500 leading-relaxed">Satisfying stress relief. Pop the floating bubbles to clear your mind.</p>
                         <div className="mt-6 flex items-center text-pink-600 font-semibold gap-2">
                            Start Popping <Activity size={16} />
                        </div>
                    </div>
                </div>

                {/* Game Card 3: Zen Breath */}
                <div 
                    onClick={() => setActiveGame('breathing')}
                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-bl-[100px] -mr-8 -mt-8 z-0"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                             <Wind size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Zen Breath</h3>
                        <p className="text-gray-500 leading-relaxed">A guided 4-7-8 breathing exercise to lower cortisol and anxiety.</p>
                         <div className="mt-6 flex items-center text-teal-600 font-semibold gap-2">
                            Begin Exercise <Activity size={16} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Modal Overlay */}
            {activeGame && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-lg h-[600px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-fade-in-up">
                         
                         <div className="h-full w-full">
                             {activeGame === 'llama' && <FlappyLlama onClose={() => setActiveGame(null)} variant="arcade" />}
                             {activeGame === 'bubble' && <BubbleGame />}
                             {activeGame === 'breathing' && <BreathingGame />}
                         </div>

                        {/* Moved button to end of container to ensure it's on top of game content */}
                        {activeGame !== 'llama' && (
                             <button 
                                onClick={() => setActiveGame(null)}
                                className="absolute top-4 right-4 z-50 p-2.5 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-gray-800 transition-colors border border-gray-200 shadow-md"
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