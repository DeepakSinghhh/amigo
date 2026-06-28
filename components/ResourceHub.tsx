import React, { useState } from 'react';
import { Resource } from '../types';
import { PlayCircle, FileText, Headphones, Search, Globe, ArrowRight } from 'lucide-react';

const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Managing Exam Anxiety',
    type: 'video',
    category: 'Academic Stress',
    description: 'A 5-minute breathing and grounding technique video.',
    language: 'English',
    imageUrl: 'https://picsum.photos/400/225?random=10'
  },
  {
    id: '2',
    title: 'Sleep Hygiene 101',
    type: 'guide',
    category: 'Wellness',
    description: 'PDF guide on establishing a healthy sleep schedule.',
    language: 'Regional',
    imageUrl: 'https://picsum.photos/400/225?random=11'
  },
  {
    id: '3',
    title: 'Mindfulness Meditation',
    type: 'audio',
    category: 'Anxiety',
    description: '20-minute guided audio track for relaxation.',
    language: 'English',
    imageUrl: 'https://picsum.photos/400/225?random=12'
  },
  {
    id: '4',
    title: 'Understanding Burnout',
    type: 'video',
    category: 'Depression',
    description: 'Expert talk on recognizing the signs of burnout early.',
    language: 'Regional',
    imageUrl: 'https://picsum.photos/400/225?random=13'
  },
  {
    id: '5',
    title: 'Social Confidence',
    type: 'guide',
    category: 'Social',
    description: 'Tips for overcoming social anxiety in college settings.',
    language: 'English',
    imageUrl: 'https://picsum.photos/400/225?random=14'
  },
];

interface ResourceHubProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ResourceHub: React.FC<ResourceHubProps> = ({ activeCategory, setActiveCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['All', 'Academic Stress', 'Anxiety', 'Depression', 'Wellness', 'Social'];

  const filteredResources = MOCK_RESOURCES.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6 animate-neo-fade-up">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Psychoeducational Hub</h2>
        <p className="text-gray-600 text-lg font-bold">Curated materials to support your mental wellness journey.</p>
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto mt-8 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 neo-input font-bold text-gray-900"
            />
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar justify-start md:justify-center px-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all border border-white/50 ${
                  activeCategory === cat 
                    ? 'bg-[var(--neo-sky)] text-blue-900 shadow-[var(--neo-shadow-in)]' 
                    : 'bg-white/60 text-gray-600 hover:bg-white shadow-[var(--neo-shadow-out-sm)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map(resource => (
          <div key={resource.id} className="group neo-card !p-0 overflow-hidden flex flex-col h-full hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={resource.imageUrl} 
                alt={resource.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[var(--neo-shadow-out-sm)] border border-white/50">
                 {resource.type === 'video' && <PlayCircle size={14} className="text-blue-600" />}
                 {resource.type === 'audio' && <Headphones size={14} className="text-purple-600" />}
                 {resource.type === 'guide' && <FileText size={14} className="text-orange-600" />}
                 <span className="capitalize">{resource.type}</span>
              </div>
              {resource.language !== 'English' && (
                <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold backdrop-blur-md border border-white/20">
                  <Globe size={12} />
                  {resource.language}
                </div>
              )}
            </div>
            <div className="p-7 flex flex-col flex-1 bg-[var(--neo-bg)]">
              <div className="mb-3">
                <span className="text-[11px] font-black text-blue-800 uppercase tracking-widest bg-blue-100/50 px-3 py-1.5 rounded-lg border border-white/60 shadow-[var(--neo-shadow-out-sm)]">{resource.category}</span>
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-3 leading-snug">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-6 flex-1 font-semibold leading-relaxed">{resource.description}</p>
              <button className="neo-button neo-button-primary w-full !py-3 flex items-center justify-center gap-2 group-hover:bg-[var(--neo-sky)] group-hover:text-blue-900">
                <span>View Resource</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceHub;