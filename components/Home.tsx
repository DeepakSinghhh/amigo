import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, X, MessageCircle, Binoculars, Heart } from 'lucide-react';
import MoodTracker from './MoodTracker';
import MentalHealthAssessment from './MentalHealthAssessment';

const TECHNIQUES = [
  { 
    title: 'CBT', 
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
    description: 'Cognitive Behavioral Therapy (CBT) helps you identify and challenge negative thought patterns. By reframing how you view stressful situations, you can alter your emotional response and behavior.'
  },
  { 
    title: 'Mindfulness', 
    img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=400',
    description: 'Mindfulness involves staying present in the moment without judgment. It helps reduce anxiety about the future and regrets about the past, grounding you in the "now".'
  },
  { 
    title: 'Sleep', 
    img: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=400',
    description: 'Quality sleep is foundational to mental health. Techniques include establishing a regular schedule, reducing blue light exposure before bed, and creating a restful environment.'
  },
  { 
    title: 'Meditation', 
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
    description: 'Guided or unguided meditation practices that train attention and awareness, helping to achieve a mentally clear and emotionally calm and stable state.'
  },
  { 
    title: 'Gratitude', 
    img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400',
    description: 'Practicing gratitude by journaling three things you are thankful for each day can significantly increase happiness and reduce depression scores over time.'
  },
  { 
    title: 'Relaxation', 
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400',
    description: 'Techniques like Progressive Muscle Relaxation (PMR) involve tensing and then relaxing specific muscle groups to release physical tension and calm the mind.'
  },
  { 
    title: 'Writing', 
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400',
    description: 'Expressive writing allows you to process complex emotions. Spending 15 minutes writing freely about your thoughts can help structure feelings and reduce mental clutter.'
  },
  { 
    title: 'Relationships', 
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400',
    description: 'Building strong social connections is vital. This involves active listening, setting boundaries, and communicating needs clearly to foster supportive relationships.'
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState<typeof TECHNIQUES[0] | null>(null);

  const handleNavigateToResources = (category: string) => {
    navigate('/resources', { state: { category } });
  };

  return (
    <div className="space-y-0 pb-0">
            {/* Hero Section */}
            <section className="relative text-gray-900 pt-40 pb-32 px-4 overflow-hidden min-h-[90vh] flex flex-col justify-center">
               {/* 3D floating clay blobs (CSS-only) */}
               <div className="absolute top-0 left-0 w-full h-full opacity-60 pointer-events-none overflow-hidden">
                  <div className="w-[600px] h-[600px] bg-[var(--neo-lavender)] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] absolute -top-40 -left-20 mix-blend-multiply animate-neo-float" style={{animationDuration: '10s'}}></div>
                  <div className="w-[500px] h-[500px] bg-[var(--neo-peach)] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] absolute top-20 right-10 mix-blend-multiply animate-neo-float" style={{animationDuration: '14s', animationDelay: '1s'}}></div>
               </div>
               
               <div className="relative max-w-4xl mx-auto text-center space-y-10 z-10 animate-neo-fade-up">
                 <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight text-[var(--neo-text-dark)] drop-shadow-sm">
                   You Are Not Alone. <br/> 
                   <span className="text-blue-500">
                     We Are Here to Listen.
                   </span>
                 </h1>
                 <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-bold leading-relaxed">
                   A confidential, judgment-free space for students. Professional support, AI tools, and community at your fingertips.
                 </p>
                 <div className="flex flex-wrap justify-center gap-6 pt-8">
                   <button 
                     onClick={() => navigate('/chat')}
                     className="neo-button neo-button-primary !px-10 !py-5 !text-lg !rounded-[2rem]"
                   >
                     Chat with AI Support
                   </button>
                   <button 
                     onClick={() => navigate('/counseling')}
                     className="neo-button !px-10 !py-5 !text-lg !rounded-[2rem]"
                   >
                     Book Counselor
                   </button>
                 </div>
               </div>
            </section>

            {/* AI Coach Feature Section */}
            <section className="max-w-7xl mx-auto px-4 py-24">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Left: Phone Visual */}
                <div className="relative flex justify-center">
                  
                  {/* Clay Phone Mockup */}
                  <div className="neo-card !p-3 !rounded-[3rem] h-[600px] w-[300px] rotate-[-3deg] hover:rotate-0 transition-transform duration-500 bg-white">
                    <div className="rounded-[2.5rem] overflow-hidden w-full h-full bg-[var(--neo-bg)] relative flex flex-col z-10 shadow-[var(--neo-shadow-in-deep)]">
                        {/* Status Bar */}
                        <div className="h-8 w-full flex justify-center items-center">
                            <div className="w-1/3 h-4 bg-black/10 rounded-full mt-2"></div>
                        </div>
                        {/* Chat UI Mockup */}
                        <div className="flex-1 p-4 space-y-4 pt-4">
                             <div className="flex gap-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <div className="w-8 h-8 rounded-full bg-[var(--neo-sky)] flex items-center justify-center text-xs shadow-[var(--neo-shadow-out-sm)] border border-white/50 font-bold text-blue-900">Kiwi</div>
                                <div className="neo-card-inset !p-3 !rounded-2xl !rounded-tl-none text-xs text-gray-700 max-w-[80%] font-semibold">
                                    Hi! I'm Kiwi. How are you feeling today?
                                </div>
                             </div>
                             <div className="flex gap-2 flex-row-reverse animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <div className="neo-card neo-bg-coral !p-3 !rounded-2xl !rounded-tr-none text-xs text-[#7a2818] max-w-[80%] font-bold">
                                    I've been feeling really overwhelmed with exams coming up.
                                </div>
                             </div>
                             <div className="flex gap-2 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                                <div className="w-8 h-8 rounded-full bg-[var(--neo-sky)] flex items-center justify-center text-xs shadow-[var(--neo-shadow-out-sm)] border border-white/50 font-bold text-blue-900">Kiwi</div>
                                <div className="neo-card-inset !p-3 !rounded-2xl !rounded-tl-none text-xs text-gray-700 max-w-[80%] font-semibold">
                                    I hear you. Exam stress is very common. Would you like to try a quick breathing exercise or talk about a study plan?
                                </div>
                             </div>
                             {/* Suggestion Chips */}
                             <div className="flex gap-2 mt-4 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
                                <div className="neo-badge neo-bg-mint text-green-900">Breathing Exercise</div>
                                <div className="neo-badge neo-bg-lavender text-purple-900">Study Tips</div>
                             </div>
                        </div>
                        {/* Floating Kiwi Logo overlay */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-[var(--neo-sky)] rounded-full shadow-[var(--neo-shadow-out-hover)] flex items-center justify-center rotate-12 hover:rotate-6 transition-all duration-500 cursor-pointer border border-white">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1e4b6d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5c-5 0-9 4-9 9 0 4.5 3.5 8.5 8 9 4.5-.5 8-4.5 8-9" />
                                <path d="M19 14c2.5 0 3 2.5 3 2.5" />
                                <circle cx="16" cy="11" r="1.5" fill="#1e4b6d" stroke="none" />
                                <path d="M10 20l-1.5 3" />
                                <path d="M14 20l1.5 3" />
                            </svg>
                         </div>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
                    Talk it through with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">empathetic AI coach</span>
                  </h2>
                  <p className="text-xl text-gray-500 font-light leading-relaxed">
                    Sometimes you just need a listening ear. Experience the support of our empathetic AI coach, trained in psychological first aid techniques. Our coach listens, discusses your concerns, and recommends evidence-based activities from the app to help you feel better, fast.
                  </p>
                  
                  <div className="space-y-8 pt-4">
                    <div className="flex gap-5">
                      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 border border-red-100">
                         <Heart size={26} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Provides thoughtful support</h4>
                        <p className="text-gray-500 leading-relaxed mt-1">Personalized to your unique situation and feelings, available 24/7 without judgment.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-5">
                      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 border border-blue-100">
                         <Binoculars size={26} />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-gray-900">Experience tailored recommendations</h4>
                         <p className="text-gray-500 leading-relaxed mt-1">Discover exercises and resources that work best for you based on your conversation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Grid - Bento Box Style */}
            <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
              <div 
                onClick={() => navigate('/resources')}
                className="neo-card neo-bg-peach cursor-pointer group"
              >
                <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform shadow-[var(--neo-shadow-out-sm)] border border-white">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Self-Help Library</h3>
                <p className="text-gray-700 text-lg font-semibold leading-relaxed">Access videos, audio guides, and articles curated for student life challenges.</p>
              </div>

              <div 
                onClick={() => navigate('/forum')}
                className="neo-card neo-bg-lavender cursor-pointer group"
              >
                <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform shadow-[var(--neo-shadow-out-sm)] border border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Peer Support</h3>
                <p className="text-gray-700 text-lg font-semibold leading-relaxed">Connect anonymously with fellow students and trained volunteers.</p>
              </div>

              <div 
                 onClick={() => navigate('/admin')}
                 className="neo-card neo-bg-mint cursor-pointer group"
              >
                <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center mb-6 text-teal-700 group-hover:scale-110 transition-transform shadow-[var(--neo-shadow-out-sm)] border border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Institution Insights</h3>
                <p className="text-gray-700 text-lg font-semibold leading-relaxed">Data-driven dashboards for IQAC and Welfare departments to track trends.</p>
              </div>
            </section>

            {/* Mood and Assessment Section */}
            <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 relative z-10">
                <MoodTracker />
                <MentalHealthAssessment />
            </section>

            {/* Evidence-Based Techniques Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Evidence-Based Techniques</h2>
                <p className="text-gray-600 text-xl font-bold">
                  Scientifically proven methods for managing panic and anxiety in under 10 minutes.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {TECHNIQUES.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedTechnique(item)}
                    className="neo-card !p-4 group cursor-pointer"
                  >
                    <div className="h-48 overflow-hidden relative rounded-2xl shadow-[var(--neo-shadow-in)]">
                         <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                         <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="pt-6 pb-2 text-center">
                      <h4 className="text-gray-900 font-extrabold tracking-tight text-xl">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Endorsed by Professionals Section */}
            <section className="py-24 px-4 mt-16 mb-16 relative">
              <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                   <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#b87063]">Endorsed by professionals</h2>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                  <div className="flex-1 relative">
                     <span className="text-7xl text-[#C07E72]/20 font-serif absolute -top-8 -left-4 font-black">“</span>
                     <div className="neo-card neo-bg-coral relative z-10 !p-10 !rounded-[3rem]">
                        <p className="text-xl md:text-2xl text-[#7a2818] italic font-bold leading-relaxed">
                           I find <span className="text-[#a32e1d] font-black">Chaitanya</span> very useful when working with students suffering from anxiety. It allows them to conveniently try different techniques inspired by the newest therapy approaches and pick the one that works best for them. I highly recommend it!
                        </p>
                        <span className="text-7xl text-[#C07E72]/30 font-serif absolute -bottom-10 right-4 leading-none font-bold">”</span>
                     </div>
                     
                     <div className="mt-8 text-center md:text-right px-4">
                        <h4 className="text-2xl font-extrabold text-[#b87063] tracking-tight">Dr. Ewelina Tur</h4>
                        <p className="text-[#b87063] font-bold mt-1 opacity-80">Psychologist, Psychotherapist</p>
                        <p className="text-[#b87063] text-sm opacity-60 font-semibold">European Association for Behavioural and Cognitive Therapy</p>
                     </div>
                  </div>
                  
                  <div className="shrink-0 relative">
                      <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden neo-card !p-3">
                         <img 
                           src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
                           alt="Professional" 
                           className="w-full h-full object-cover rounded-full shadow-[var(--neo-shadow-in)]"
                         />
                      </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="neo-card !p-12 md:!p-16">
                        <h2 className="text-4xl font-black text-center text-gray-900 mb-16 tracking-tight">What students say</h2>
                        <div className="grid md:grid-cols-3 gap-10">
                            {/* Card 1 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="neo-card-inset !p-8 relative mb-8 min-h-[200px] flex items-center justify-center transition-all">
                                    <p className="text-gray-700 text-lg font-bold leading-relaxed">
                                        "I love it! It's so great that it's free and accessible to everyone! I also really like the idea of an Explore page because there are so many ways to help yourself!"
                                    </p>
                                </div>
                                <h4 className="text-gray-900 font-extrabold text-xl">Sarah T.</h4>
                                <p className="text-gray-500 text-sm font-bold">In-app feedback</p>
                            </div>

                            {/* Card 2 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="neo-card-inset !p-8 relative mb-8 min-h-[200px] flex items-center justify-center transition-all">
                                    <p className="text-gray-700 text-lg font-bold leading-relaxed">
                                        "The exercises are fantastic. Most of the time I can honestly see that I'm feeling better than I did prior to doing the exercise. It keeps me interested!"
                                    </p>
                                </div>
                                <h4 className="text-gray-900 font-extrabold text-xl">Godshot1966</h4>
                                <p className="text-gray-500 text-sm font-bold">App Store review</p>
                            </div>

                            {/* Card 3 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="neo-card-inset !p-8 relative mb-8 min-h-[200px] flex items-center justify-center transition-all">
                                    <p className="text-gray-700 text-lg font-bold leading-relaxed">
                                        "I tend to be skeptical of a lot of self-help stuff I see online, however I gave this a go and was surprised that it actually helped."
                                    </p>
                                </div>
                                <h4 className="text-gray-900 font-extrabold text-xl">Mark S.</h4>
                                <p className="text-gray-500 text-sm font-bold">Study participant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Glassmorphism/Claymorphism Detail Modal for Techniques */}
            {selectedTechnique && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
                style={{ zIndex: 100 }}
              >
                 <div 
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
                    onClick={() => setSelectedTechnique(null)}
                 ></div>
                 
                 <div className="relative neo-card !p-0 max-w-lg w-full overflow-hidden transform transition-all scale-100 animate-neo-fade-up">
                    <div className="relative h-64 w-full p-2">
                       <img 
                          src={selectedTechnique.img} 
                          alt={selectedTechnique.title} 
                          className="w-full h-full object-cover rounded-[20px] shadow-[var(--neo-shadow-in)]" 
                        />
                        <div className="absolute inset-2 rounded-[20px] bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                        <button 
                          onClick={() => setSelectedTechnique(null)} 
                          className="absolute top-6 right-6 p-2 bg-white/40 backdrop-blur-lg hover:bg-white/60 text-white rounded-full transition-colors border border-white/50 shadow-md"
                        >
                          <X size={20} />
                        </button>
                        <h3 className="absolute bottom-8 left-8 text-4xl font-black text-white tracking-tight drop-shadow-lg">
                          {selectedTechnique.title}
                        </h3>
                    </div>
                    
                    <div className="p-8 space-y-6">
                      <p className="text-gray-700 text-lg leading-relaxed font-bold">
                        {selectedTechnique.description}
                      </p>
                      
                      <div className="pt-2">
                        <button 
                           onClick={() => {
                             setSelectedTechnique(null);
                             handleNavigateToResources(selectedTechnique.title);
                           }}
                           className="neo-button neo-button-primary w-full !py-4"
                        >
                          Explore Related Resources
                        </button>
                      </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
  );
};

export default Home;
