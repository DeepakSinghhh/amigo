import React, { useState } from 'react';
import { ClipboardList, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AssessmentResult } from '../types';

const QUESTIONS = [
    "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    "How often have you not been able to stop or control worrying?",
    "How often have you felt little interest or pleasure in doing things?",
    "How often have you felt down, depressed, or hopeless?",
    "How often do you feel overwhelmed by your academic workload?"
];

const OPTIONS = [
    { text: "Not at all", score: 0 },
    { text: "Several days", score: 1 },
    { text: "More than half the days", score: 2 },
    { text: "Nearly every day", score: 3 }
];

const MentalHealthAssessment: React.FC = () => {
    const [started, setStarted] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [result, setResult] = useState<AssessmentResult | null>(null);

    const handleAnswer = (score: number) => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);
        
        if (currentQ < QUESTIONS.length - 1) {
            setCurrentQ(curr => curr + 1);
        } else {
            // Calculate result
            const total = newAnswers.reduce((a, b) => a + b, 0);
            let severity = "Minimal";
            let rec = "Keep up your current wellness routine!";
            
            if (total > 10) {
                severity = "Moderate";
                rec = "Consider speaking to a counselor or exploring our self-help resources.";
            }
            if (total > 15) {
                severity = "Severe";
                rec = "We strongly recommend booking a session with a counselor today.";
            }

            const res: AssessmentResult = {
                date: new Date().toLocaleDateString(),
                type: 'General Wellness',
                score: total,
                severity,
                recommendation: rec
            };
            setResult(res);
            
            // Save to local storage
            const saved = localStorage.getItem('chaitanya_assessments');
            const history = saved ? JSON.parse(saved) : [];
            localStorage.setItem('chaitanya_assessments', JSON.stringify([res, ...history]));
        }
    };

    if (result) {
        return (
            <div className="neo-card !p-8 max-w-2xl mx-auto w-full text-center space-y-6 animate-neo-fade-up">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-[var(--neo-shadow-out-sm)] border-4 border-white">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Assessment Complete</h2>
                <div className="neo-card-inset !p-6 space-y-4 text-left">
                    <div className="flex justify-between items-end border-b border-white/50 pb-4">
                        <div>
                            <p className="text-gray-500 font-bold text-sm">Severity Level</p>
                            <h3 className={`text-2xl font-black ${result.score > 10 ? 'text-red-600' : 'text-green-600'}`}>
                                {result.severity}
                            </h3>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 font-bold text-sm">Score</p>
                            <h3 className="text-2xl font-black text-gray-800">{result.score} / 15</h3>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-700 font-bold leading-relaxed">{result.recommendation}</p>
                    </div>
                </div>
                <button 
                    onClick={() => {
                        setResult(null);
                        setStarted(false);
                        setCurrentQ(0);
                        setAnswers([]);
                    }}
                    className="neo-button w-full !py-4"
                >
                    Retake Assessment
                </button>
            </div>
        );
    }

    if (!started) {
        return (
            <div className="neo-card !p-8 max-w-2xl mx-auto w-full text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-[var(--neo-shadow-out-sm)] border-4 border-white">
                    <ClipboardList size={40} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Wellness Check-in</h2>
                <p className="text-gray-600 font-semibold text-lg leading-relaxed">
                    Take this quick 5-question assessment to check in on your mental well-being and get personalized recommendations.
                </p>
                <button 
                    onClick={() => setStarted(true)}
                    className="neo-button neo-button-primary w-full !py-4 flex justify-center items-center gap-2"
                >
                    Start Assessment <ArrowRight size={20} />
                </button>
            </div>
        );
    }

    return (
        <div className="neo-card !p-8 max-w-2xl mx-auto w-full space-y-8 animate-neo-fade-up">
            <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                <span className="neo-badge bg-white shadow-sm border border-white">Progress: {Math.round(((currentQ)/QUESTIONS.length)*100)}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden shadow-[var(--neo-shadow-in)]">
                <div 
                    className="h-full bg-[var(--neo-sky)] transition-all duration-500 ease-out"
                    style={{ width: `${((currentQ)/QUESTIONS.length)*100}%` }}
                ></div>
            </div>

            <h3 className="text-2xl font-black text-gray-900 leading-tight">
                {QUESTIONS[currentQ]}
            </h3>

            <div className="space-y-3">
                {OPTIONS.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(opt.score)}
                        className="w-full text-left neo-card-inset !p-4 hover:bg-white/60 transition-colors font-bold text-gray-700 text-lg border border-transparent hover:border-white/50"
                    >
                        {opt.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MentalHealthAssessment;
