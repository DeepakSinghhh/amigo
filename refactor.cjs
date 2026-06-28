const fs = require('fs');

const appContent = fs.readFileSync('App.tsx', 'utf-8');

// 1. Extract Home content
const homeStartStr = `          <div className="space-y-0 pb-0">
            {/* Hero Section */}`;
const homeEndStr = `            )}
          </div>
        );
    }
  };`;
const homeStart = appContent.indexOf(homeStartStr);
const homeEnd = appContent.indexOf(homeEndStr) + homeEndStr.length - 24; // approx, let's use regex

const match = appContent.match(/<div className="space-y-0 pb-0">([\s\S]*?)<\/div>\s*\);\s*\}\s*\};\s*const isChatView/);

if (match) {
  const homeJSX = '<div className="space-y-0 pb-0">' + match[1] + '</div>';
  
  // Extract TECHNIQUES
  const techniquesMatch = appContent.match(/const TECHNIQUES = \[[\s\S]*?\];/);
  const techniques = techniquesMatch ? techniquesMatch[0] : '';
  
  const homeComponent = `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, X, MessageCircle, Binoculars, Heart } from 'lucide-react';
import MoodTracker from './MoodTracker';
import MentalHealthAssessment from './MentalHealthAssessment';

${techniques}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState<typeof TECHNIQUES[0] | null>(null);

  const handleNavigateToResources = (category: string) => {
    navigate('/resources', { state: { category } });
  };

  return (
    ${homeJSX.replace(/setCurrentView\(ViewState\.CHAT\)/g, "navigate('/chat')")
             .replace(/setCurrentView\(ViewState\.BOOKING\)/g, "navigate('/counseling')")
             .replace(/setCurrentView\(ViewState\.RESOURCES\)/g, "navigate('/resources')")
             .replace(/setCurrentView\(ViewState\.FORUM\)/g, "navigate('/forum')")
             .replace(/setCurrentView\(ViewState\.ADMIN\)/g, "navigate('/admin')")
             .replace(/ViewState\.[A-Z_]+/g, "''")}
  );
};

export default Home;
`;
  fs.writeFileSync('components/Home.tsx', homeComponent);
  console.log('Created components/Home.tsx');
} else {
  console.log('Could not match Home JSX');
}

// 2. Rewrite App.tsx
const newAppContent = `import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import BookingCalendar from './components/BookingCalendar';
import ResourceHub from './components/ResourceHub';
import PeerForum from './components/PeerForum';
import AdminDashboard from './components/AdminDashboard';
import WellnessArcade from './components/WellnessArcade';
import AuthScreen from './components/AuthScreen';
import UserProfile from './components/UserProfile';
import CounselorPortal from './components/CounselorPortal';
import ParentPortal from './components/ParentPortal';
import SuperAdminPortal from './components/SuperAdminPortal';
import Home from './components/Home';
import { UserRole } from './types';
import { Phone } from 'lucide-react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleLogin = (role: UserRole) => {
      setCurrentUserRole(role);
      if (role === 'student') navigate('/home');
      else if (role === 'counselor') navigate('/counselor-portal');
      else if (role === 'parent') navigate('/parent-portal');
      else if (role === 'super_admin') navigate('/super-admin');
      else if (role === 'institution_admin') navigate('/admin');
  };

  const handleLogout = () => {
      setCurrentUserRole(null);
      navigate('/');
  };

  const isChatView = location.pathname === '/chat';
  const isAuthView = location.pathname === '/';
  const isHomeView = location.pathname === '/home';

  return (
    <div className="min-h-screen flex flex-col bg-transparent font-sans text-[var(--neo-text-dark)]">
      {!isAuthView && <Header />}
      
      <main 
        className={\`flex-grow px-0 transition-all duration-300 ease-in-out \${
          isChatView 
            ? 'h-[100dvh] overflow-hidden pt-28 pb-6 px-4 sm:px-6' 
            : isAuthView ? '' : isHomeView ? 'pt-0 pb-0' : 'pt-28 pb-12'
        }\`}
      >
        <Routes>
          <Route path="/" element={<AuthScreen onLogin={handleLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfile onLogout={handleLogout} />} />
          <Route path="/counselor-portal" element={<CounselorPortal />} />
          <Route path="/parent-portal" element={<ParentPortal />} />
          <Route path="/super-admin" element={<SuperAdminPortal />} />
          <Route path="/chat" element={<Chatbot onNavigateToResources={(cat) => navigate('/resources', { state: { category: cat } })} />} />
          <Route path="/counseling" element={<BookingCalendar />} />
          <Route path="/resources" element={<ResourceHub activeCategory={'All'} setActiveCategory={() => {}} />} />
          <Route path="/forum" element={<PeerForum />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/arcade" element={<WellnessArcade />} />
        </Routes>
      </main>

      {!isAuthView && (
      <div className="fixed bottom-6 right-6 z-40">
        <a 
          href="#" 
          onClick={(e) => {
              e.preventDefault();
              alert("In a real deployment, this would dial the campus emergency line.");
          }}
          className="neo-button neo-button-danger animate-neo-pulse !rounded-full !p-4 !h-14 !w-auto"
        >
          <Phone size={24} fill="currentColor" />
          <span className="tracking-wide">Help Line</span>
        </a>
      </div>
      )}

      {(!isChatView && !isAuthView) && <Footer />}
    </div>
  );
};

export default App;
`;
fs.writeFileSync('App.tsx', newAppContent);
console.log('Created new App.tsx');
