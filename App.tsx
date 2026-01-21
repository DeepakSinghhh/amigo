import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import BookingCalendar from './components/BookingCalendar';
import ResourceHub from './components/ResourceHub';
import PeerForum from './components/PeerForum';
import AdminDashboard from './components/AdminDashboard';
import WellnessArcade from './components/WellnessArcade';
import { ViewState } from './types';
import { Phone, X, MessageCircle, Binoculars, Heart } from 'lucide-react';

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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [resourceCategory, setResourceCategory] = useState<string>('All');
  const [selectedTechnique, setSelectedTechnique] = useState<typeof TECHNIQUES[0] | null>(null);

  const handleNavigateToResources = (category: string) => {
    setResourceCategory(category);
    setCurrentView(ViewState.RESOURCES);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.CHAT:
        return <Chatbot onNavigateToResources={handleNavigateToResources} />;
      case ViewState.BOOKING:
        return <BookingCalendar />;
      case ViewState.RESOURCES:
        return <ResourceHub activeCategory={resourceCategory} setActiveCategory={setResourceCategory} />;
      case ViewState.FORUM:
        return <PeerForum />;
      case ViewState.ADMIN:
        return <AdminDashboard />;
      case ViewState.GAMES:
        return <WellnessArcade />;
      case ViewState.HOME:
      default:
        return (
          <div className="space-y-0 pb-0">
            {/* Hero Section */}
            <section className="relative bg-[#F5F5F7] text-gray-900 py-32 px-4 overflow-hidden">
               {/* Minimalist Apple-style background blobs */}
               <div className="absolute top-0 left-0 w-full h-full opacity-60 pointer-events-none">
                  <div className="w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-[120px] absolute -top-96 -left-40 mix-blend-multiply"></div>
                  <div className="w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] absolute top-10 right-0 mix-blend-multiply"></div>
               </div>
               
               <div className="relative max-w-4xl mx-auto text-center space-y-8">
                 <h1 className="text-6xl md:text-7xl font-semibold leading-tight tracking-tight text-[#1d1d1f]">
                   You Are Not Alone. <br/> 
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                     We Are Here to Listen.
                   </span>
                 </h1>
                 <p className="text-2xl text-gray-500 max-w-2xl mx-auto font-normal leading-relaxed">
                   A confidential, judgment-free space for students. Professional support, AI tools, and community at your fingertips.
                 </p>
                 <div className="flex flex-wrap justify-center gap-5 pt-8">
                   <button 
                     onClick={() => setCurrentView(ViewState.CHAT)}
                     className="bg-[#0071e3] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0077ED] transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                   >
                     Chat with AI Support
                   </button>
                   <button 
                     onClick={() => setCurrentView(ViewState.BOOKING)}
                     className="bg-white text-[#1d1d1f] border border-gray-300 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
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
                  <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30 transform -translate-x-10 translate-y-10"></div>
                  
                  {/* CSS Phone Mockup */}
                  <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                    <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
                    <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                    <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative flex flex-col z-10">
                        {/* Status Bar */}
                        <div className="h-8 bg-gray-50 w-full"></div>
                        {/* Chat UI Mockup */}
                        <div className="bg-gray-50 flex-1 p-4 space-y-4 pt-8">
                             <div className="flex gap-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-xs text-white">Kiwi</div>
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-gray-600 max-w-[80%] border border-gray-100">
                                    Hi! I'm Kiwi. How are you feeling today?
                                </div>
                             </div>
                             <div className="flex gap-2 flex-row-reverse animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-sm text-xs text-white max-w-[80%]">
                                    I've been feeling really overwhelmed with exams coming up.
                                </div>
                             </div>
                             <div className="flex gap-2 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-xs text-white">Kiwi</div>
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-gray-600 max-w-[80%] border border-gray-100">
                                    I hear you. Exam stress is very common. Would you like to try a quick breathing exercise or talk about a study plan?
                                </div>
                             </div>
                             {/* Suggestion Chips */}
                             <div className="flex gap-2 mt-4 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
                                <div className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-semibold border border-blue-100">Breathing Exercise</div>
                                <div className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-semibold border border-blue-100">Study Tips</div>
                             </div>
                        </div>
                        {/* Floating Kiwi Logo overlay */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center rotate-12 hover:rotate-6 transition-all duration-500 cursor-pointer">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5c-5 0-9 4-9 9 0 4.5 3.5 8.5 8 9 4.5-.5 8-4.5 8-9" />
                                <path d="M19 14c2.5 0 3 2.5 3 2.5" />
                                <circle cx="16" cy="11" r="1.5" fill="white" stroke="none" />
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
            <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
              <div 
                onClick={() => setCurrentView(ViewState.RESOURCES)}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Self-Help Library</h3>
                <p className="text-gray-500 text-lg leading-relaxed">Access videos, audio guides, and articles curated for student life challenges.</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.FORUM)}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-500 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Peer Support</h3>
                <p className="text-gray-500 text-lg leading-relaxed">Connect anonymously with fellow students and trained volunteers.</p>
              </div>

              <div 
                 onClick={() => setCurrentView(ViewState.ADMIN)}
                 className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 text-teal-600 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Institution Insights</h3>
                <p className="text-gray-500 text-lg leading-relaxed">Data-driven dashboards for IQAC and Welfare departments to track trends.</p>
              </div>
            </section>

            {/* Evidence-Based Techniques Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">Evidence-Based Techniques</h2>
                <p className="text-gray-500 text-xl font-light">
                  Scientifically proven methods for managing panic and anxiety in under 10 minutes.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {TECHNIQUES.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedTechnique(item)}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className="h-48 overflow-hidden relative">
                         <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                         <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="p-6 text-center border-t border-gray-100">
                      <h4 className="text-gray-900 font-semibold tracking-tight text-lg">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Endorsed by Professionals Section */}
            <section className="bg-white py-24 px-4 border-y border-gray-100 mt-16 mb-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                   <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#C07E72]">Endorsed by professionals</h2>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                  <div className="flex-1 relative">
                     <span className="text-7xl text-[#C07E72]/20 font-serif absolute -top-8 -left-4 font-bold">“</span>
                     <div className="bg-[#fcfaf9] p-8 md:p-12 rounded-tr-[4rem] rounded-bl-[4rem] relative z-10 shadow-sm border border-[#C07E72]/10">
                        <p className="text-xl md:text-2xl text-gray-600 italic font-medium leading-relaxed">
                           I find <span className="text-[#C07E72]">AmiGo</span> very useful when working with students suffering from anxiety. It allows them to conveniently try different techniques inspired by the newest therapy approaches and pick the one that works best for them. I highly recommend it!
                        </p>
                        <span className="text-7xl text-[#C07E72]/20 font-serif absolute -bottom-10 right-4 leading-none font-bold">”</span>
                     </div>
                     
                     <div className="mt-8 text-center md:text-right px-4">
                        <h4 className="text-2xl font-bold text-[#C07E72] tracking-tight">Dr. Ewelina Tur</h4>
                        <p className="text-gray-500 font-medium mt-1">Psychologist, Psychotherapist</p>
                        <p className="text-gray-400 text-sm">European Association for Behavioural and Cognitive Therapy</p>
                     </div>
                  </div>
                  
                  <div className="shrink-0 relative">
                      <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gray-100 ring-1 ring-gray-100">
                         <img 
                           src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
                           alt="Professional" 
                           className="w-full h-full object-cover"
                         />
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#C07E72] rounded-full opacity-10 blur-2xl"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-white/50 p-8 md:p-16">
                        <h2 className="text-4xl font-semibold text-center text-gray-900 mb-16 tracking-tight">What students say</h2>
                        <div className="grid md:grid-cols-3 gap-10">
                            {/* Card 1 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="bg-[#F5F5F7] p-8 rounded-3xl relative mb-8 min-h-[200px] flex items-center justify-center transition-all group-hover:bg-blue-50/50">
                                    <p className="text-gray-600 text-lg font-medium leading-relaxed">
                                        "I love it! It's so great that it's free and accessible to everyone! I also really like the idea of an Explore page because there are so many ways to help yourself!"
                                    </p>
                                </div>
                                <h4 className="text-gray-900 font-bold text-lg">Sarah T.</h4>
                                <p className="text-gray-500 text-sm font-medium">In-app feedback</p>
                            </div>

                            {/* Card 2 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="bg-[#F5F5F7] p-8 rounded-3xl relative mb-8 min-h-[200px] flex items-center justify-center transition-all group-hover:bg-blue-50/50">
                                    <p className="text-gray-600 text-lg font-medium leading-relaxed">
                                        "The exercises are fantastic. Most of the time I can honestly see that I'm feeling better than I did prior to doing the exercise. It keeps me interested!"
                                    </p>
                                </div>
                                <h4 className="text-gray-900 font-bold text-lg">Godshot1966</h4>
                                <p className="text-gray-500 text-sm font-medium">App Store review</p>
                            </div>

                            {/* Card 3 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="bg-[#F5F5F7] p-8 rounded-3xl relative mb-8 min-h-[200px] flex items-center justify-center transition-all group-hover:bg-blue-50/50">
                                    <p className="text-gray-600 text-lg font-medium leading-relaxed">
                                        "I tend to be skeptical of a lot of self-help stuff I see online, however I gave this a go and was surprised that it actually helped."
                                    </p>
                                </div>
                                <h4 className="text-gray-900 font-bold text-lg">Mark S.</h4>
                                <p className="text-gray-500 text-sm font-medium">Study participant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Glassmorphism Detail Modal for Techniques */}
            {selectedTechnique && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
                style={{ zIndex: 100 }}
              >
                 <div 
                    className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" 
                    onClick={() => setSelectedTechnique(null)}
                 ></div>
                 
                 <div className="relative bg-white/85 backdrop-blur-2xl p-0 rounded-[32px] shadow-2xl max-w-lg w-full border border-white/60 overflow-hidden transform transition-all scale-100 animate-fade-in-up">
                    <div className="relative h-64 w-full">
                       <img 
                          src={selectedTechnique.img} 
                          alt={selectedTechnique.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <button 
                          onClick={() => setSelectedTechnique(null)} 
                          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-lg hover:bg-white/40 text-white rounded-full transition-colors border border-white/30"
                        >
                          <X size={20} />
                        </button>
                        <h3 className="absolute bottom-6 left-8 text-4xl font-bold text-white tracking-tight drop-shadow-md">
                          {selectedTechnique.title}
                        </h3>
                    </div>
                    
                    <div className="p-8 space-y-6">
                      <p className="text-gray-700 text-lg leading-relaxed font-medium">
                        {selectedTechnique.description}
                      </p>
                      
                      <div className="pt-2">
                        <button 
                           onClick={() => {
                             setSelectedTechnique(null);
                             handleNavigateToResources(selectedTechnique.title);
                           }}
                           className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-black transition-all shadow-lg active:scale-95"
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
    }
  };

  const isChatView = currentView === ViewState.CHAT;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] font-sans text-gray-900">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main 
        className={`flex-grow px-0 transition-all duration-300 ease-in-out ${
          isChatView 
            ? 'h-[calc(100vh-56px)] overflow-hidden pt-4 pb-0 px-4 sm:px-6' 
            : 'pt-0 pb-0'
        }`}
      >
        {renderContent()}
      </main>

      {/* Persistent Help Button - IOS Style */}
      <div className="fixed bottom-6 right-6 z-40">
        <a 
          href="#" 
          onClick={(e) => {
              e.preventDefault();
              alert("In a real deployment, this would dial the campus emergency line.");
          }}
          className="flex items-center gap-3 bg-[#FF3B30] text-white px-6 py-3.5 rounded-full shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all font-semibold active:scale-95 hover:shadow-xl"
        >
          <Phone size={20} fill="currentColor" />
          <span className="tracking-wide">Help Line</span>
        </a>
      </div>

      {!isChatView && <Footer />}
    </div>
  );
};

export default App;