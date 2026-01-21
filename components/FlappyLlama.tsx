import React, { useState, useRef, useEffect } from 'react';
import { X as XIcon, Loader2, Sparkles } from 'lucide-react';

interface FlappyLlamaProps {
    onClose: () => void;
    isThinking?: boolean;
    variant?: 'overlay' | 'arcade';
}

const FlappyLlama: React.FC<FlappyLlamaProps> = ({ onClose, isThinking = false, variant = 'overlay' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // UI State (Synced with Ref)
    const [gameState, setGameState] = useState<'READY' | 'PLAYING' | 'GAME_OVER'>('READY');
    const [score, setScore] = useState(0);

    // Physics Engine State (Mutable Ref to avoid re-renders resetting game)
    const physics = useRef({
        birdY: 240,
        birdVelocity: 0,
        pipes: [] as { x: number; y: number; passed: boolean }[],
        score: 0,
        mode: 'READY' as 'READY' | 'PLAYING' | 'GAME_OVER',
        lastTime: 0
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        
        // Constants
        const GRAVITY = 0.25;
        const JUMP = -6;
        const PIPE_SPEED = 2;
        const PIPE_SPAWN_RATE = 160; 
        const PIPE_GAP = 150; 
        const BIRD_X = 80;

        const init = () => {
             physics.current.birdY = canvas.height / 2;
             physics.current.birdVelocity = 0;
             physics.current.pipes = [];
             physics.current.score = 0;
             physics.current.mode = 'READY';
             setGameState('READY');
             setScore(0);
        };

        const update = () => {
             const state = physics.current;
             const { width, height } = canvas;

             if (state.mode === 'PLAYING') {
                 // Physics
                 state.birdVelocity += GRAVITY;
                 state.birdY += state.birdVelocity;

                 // Pipe Spawning
                 const lastPipe = state.pipes[state.pipes.length - 1];
                 if (!lastPipe || (width - lastPipe.x >= PIPE_SPAWN_RATE)) {
                     const minPipeH = 50;
                     const maxPipeH = height - 150 - PIPE_GAP;
                     const pipeH = Math.floor(Math.random() * (maxPipeH - minPipeH + 1)) + minPipeH;
                     state.pipes.push({ x: width, y: pipeH, passed: false });
                 }

                 // Pipe Movement & Collision
                 for (let i = state.pipes.length - 1; i >= 0; i--) {
                     const p = state.pipes[i];
                     p.x -= PIPE_SPEED;

                     // Cleanup
                     if (p.x + 60 < 0) {
                         state.pipes.splice(i, 1);
                         continue;
                     }

                     // Collision Detection
                     const birdLeft = BIRD_X - 15;
                     const birdRight = BIRD_X + 15;
                     const birdTop = state.birdY - 15;
                     const birdBottom = state.birdY + 15;

                     const pipeLeft = p.x;
                     const pipeRight = p.x + 52; // Pipe Width
                     const topPipeBottom = p.y;
                     const bottomPipeTop = p.y + PIPE_GAP;

                     // Hit Pipe Column
                     if (birdRight > pipeLeft && birdLeft < pipeRight) {
                         // Hit Top or Bottom Pipe
                         if (birdTop < topPipeBottom || birdBottom > bottomPipeTop) {
                             state.mode = 'GAME_OVER';
                             setGameState('GAME_OVER');
                         }
                     }

                     // Score
                     if (p.x + 52 < birdLeft && !p.passed) {
                         p.passed = true;
                         state.score += 1;
                         setScore(state.score);
                     }
                 }

                 // Ground/Ceiling Collision
                 if (state.birdY > height - 20 || state.birdY < 0) {
                     state.mode = 'GAME_OVER';
                     setGameState('GAME_OVER');
                 }

             } else if (state.mode === 'READY') {
                 // Float effect
                 state.birdY = (height / 2) + Math.sin(Date.now() / 300) * 10;
             } else if (state.mode === 'GAME_OVER') {
                 // Fall animation
                 if (state.birdY < height - 20) {
                     state.birdVelocity += GRAVITY;
                     state.birdY += state.birdVelocity;
                 }
             }
        };

        const draw = () => {
            const { width, height } = canvas;
            const state = physics.current;

            if (variant === 'arcade') {
                 // Sky Blue Background for Arcade
                 ctx.fillStyle = '#70c5ce';
                 ctx.fillRect(0, 0, width, height);
                 
                 // Simple Clouds
                 ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                 ctx.beginPath();
                 ctx.arc(100, 100, 30, 0, Math.PI * 2);
                 ctx.arc(140, 90, 40, 0, Math.PI * 2);
                 ctx.arc(180, 100, 30, 0, Math.PI * 2);
                 ctx.fill();

                 ctx.beginPath();
                 ctx.arc(240, 200, 25, 0, Math.PI * 2);
                 ctx.arc(270, 190, 35, 0, Math.PI * 2);
                 ctx.fill();
            } else {
                 // Clear for transparency in overlay mode
                 ctx.clearRect(0, 0, width, height);
            }

            // Pipes
            state.pipes.forEach(p => {
                const pipeW = 52;
                
                // Top Pipe
                ctx.fillStyle = '#22c55e'; // Green
                ctx.fillRect(p.x, 0, pipeW, p.y);
                // Top Cap
                ctx.fillStyle = '#16a34a'; // Darker detail
                ctx.fillRect(p.x - 4, p.y - 24, pipeW + 8, 24);
                // Borders
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, -2, pipeW, p.y); 
                ctx.strokeRect(p.x - 4, p.y - 24, pipeW + 8, 24);

                // Bottom Pipe
                const bottomY = p.y + PIPE_GAP;
                const bottomH = height - bottomY;
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(p.x, bottomY, pipeW, bottomH);
                // Bottom Cap
                ctx.fillStyle = '#16a34a';
                ctx.fillRect(p.x - 4, bottomY, pipeW + 8, 24);
                // Borders
                ctx.strokeRect(p.x, bottomY, pipeW, bottomH + 2);
                ctx.strokeRect(p.x - 4, bottomY, pipeW + 8, 24);
            });

            // Ground Scrolling
            const groundOffset = (state.mode === 'PLAYING' || state.mode === 'READY') ? (Date.now() / 5) % 20 : 0;
            ctx.fillStyle = '#dedede';
            ctx.fillRect(0, height - 20, width, 20);
            
            ctx.beginPath();
            ctx.strokeStyle = '#9ca3af';
            ctx.lineWidth = 2;
            for(let i = -20; i < width; i+=20) {
                ctx.moveTo(i - groundOffset, height - 20);
                ctx.lineTo(i - groundOffset + 10, height);
            }
            ctx.stroke();

            ctx.fillStyle = '#22c55e';
            ctx.fillRect(0, height - 22, width, 4);
            ctx.strokeRect(0, height - 22, width, 4);

            // Llama
            ctx.save();
            ctx.translate(BIRD_X, state.birdY);
            
            let rotation = 0;
            if (state.mode !== 'READY') {
                rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (state.birdVelocity * 0.1)));
                if (state.mode === 'GAME_OVER') rotation = Math.PI/2;
            }
            
            ctx.rotate(rotation);
            ctx.scale(-1, 1); // Face right
            ctx.font = "40px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("🦙", 0, 0);
            ctx.restore();
        };

        const loop = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(loop);
        };

        // Input Handler
        const handleInput = (e?: Event) => {
            if (e) e.preventDefault();
            
            if (physics.current.mode === 'READY') {
                physics.current.mode = 'PLAYING';
                setGameState('PLAYING');
                physics.current.birdVelocity = JUMP;
            } else if (physics.current.mode === 'PLAYING') {
                physics.current.birdVelocity = JUMP;
            }
        };

        // Init
        init();
        loop();

        // Listeners
        const canvasEl = canvasRef.current;
        if (canvasEl) {
             canvasEl.addEventListener('mousedown', handleInput);
             canvasEl.addEventListener('touchstart', handleInput, {passive: false});
        }
        
        const handleKey = (e: KeyboardEvent) => {
            if (e.code === 'Space') handleInput();
        };
        window.addEventListener('keydown', handleKey);

        return () => {
             cancelAnimationFrame(animationFrameId);
             if (canvasEl) {
                 canvasEl.removeEventListener('mousedown', handleInput);
                 canvasEl.removeEventListener('touchstart', handleInput);
             }
             window.removeEventListener('keydown', handleKey);
        };
    }, []); 

    const handleRestart = () => {
        if (physics.current.mode === 'GAME_OVER') {
            physics.current.birdY = 240; // Reset height
            physics.current.birdVelocity = 0;
            physics.current.pipes = [];
            physics.current.score = 0;
            physics.current.mode = 'READY';
            setScore(0);
            setGameState('READY');
        }
    };

    return (
        <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center p-4 rounded-3xl overflow-hidden animate-fade-in transition-all ${
            variant === 'overlay' ? 'bg-slate-900/60 backdrop-blur-sm' : 'bg-white'
        }`}>
            {/* Close Icon - Top Right */}
            <button 
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-[60] border ${
                    variant === 'overlay' ? 'bg-black/20 hover:bg-black/40 text-white border-white/10' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200'
                }`}
                title="Close Game"
            >
                <XIcon size={24} />
            </button>

            {/* Status Header (Only show if not playing to keep view clean) */}
            <div className={`mb-4 text-center z-10 pointer-events-none transition-opacity duration-300 ${gameState === 'PLAYING' ? 'opacity-0' : 'opacity-100'}`}>
                {isThinking ? (
                    <div className="flex flex-col items-center gap-2">
                         <div className="flex items-center gap-2 bg-blue-500/80 text-white px-4 py-1.5 rounded-full border border-blue-400/30 shadow-lg backdrop-blur-md">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-sm font-semibold tracking-wide">KIWI IS THINKING...</span>
                         </div>
                    </div>
                ) : (
                    <>
                        {isThinking === false && variant === 'overlay' && (
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2 bg-green-500/90 text-white px-4 py-1.5 rounded-full border border-green-400/30 animate-pulse shadow-lg backdrop-blur-md">
                                    <Sparkles size={16} />
                                    <span className="text-sm font-bold tracking-wide">RESPONSE READY!</span>
                                </div>
                            </div>
                        )}
                        {variant === 'arcade' && (
                             <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-800">Llama Leap</h2>
                                <p className="text-xs text-gray-500">Tap or Spacebar to fly</p>
                             </div>
                        )}
                    </>
                )}
            </div>

            <div className="relative">
                <canvas 
                    ref={canvasRef} 
                    width={320} 
                    height={480} 
                    className="rounded-xl shadow-2xl border-4 border-slate-700/50 cursor-pointer touch-none bg-transparent"
                />
                
                {gameState === 'READY' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none rounded-xl">
                        <div className="bg-white/90 text-black px-6 py-3 rounded-xl font-bold text-xl animate-bounce shadow-lg border-b-4 border-gray-300 backdrop-blur-sm">
                            Tap to Jump!
                        </div>
                    </div>
                )}
                
                {gameState === 'GAME_OVER' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm z-20">
                        <h3 className="text-4xl font-black text-white mb-2 tracking-wide drop-shadow-md">GAME OVER</h3>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/20 mb-6 text-center w-48">
                            <p className="text-sm text-gray-300 font-bold uppercase tracking-wider">Score</p>
                            <p className="text-5xl text-[#facc15] font-black drop-shadow-sm">{score}</p>
                        </div>
                        <div className="flex flex-col gap-3 w-full px-8">
                             <button 
                                onClick={handleRestart}
                                className="w-full bg-[#facc15] text-black px-6 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1"
                            >
                                Play Again
                            </button>
                            {variant === 'overlay' && !isThinking && (
                                <button 
                                    onClick={onClose}
                                    className="w-full bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1"
                                >
                                    Read Message
                                </button>
                            )}
                        </div>
                    </div>
                )}
                
                <div className="absolute top-4 left-0 w-full flex justify-center pointer-events-none">
                     <div className="bg-black/30 backdrop-blur-md text-white px-4 py-1 rounded-full font-mono font-bold text-3xl border border-white/10 shadow-sm z-10">
                        {score}
                     </div>
                </div>
            </div>
            
            <button 
                onClick={onClose}
                className={`mt-6 px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 border backdrop-blur-md ${
                    variant === 'overlay' 
                        ? 'bg-white/10 hover:bg-white/20 text-white border-white/10' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                }`}
            >
                <XIcon size={20} /> 
                {variant === 'overlay' ? (isThinking ? "Close Game" : "Close & Read Message") : "Exit Game"}
            </button>
        </div>
    );
};

export default FlappyLlama;