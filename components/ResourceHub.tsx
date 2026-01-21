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
    <div className="max-w-7xl mx-auto space-y-10 p-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">Psychoeducational Hub</h2>
        <p className="text-gray-500 text-lg">Curated materials to support your mental wellness journey.</p>
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto mt-8 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar justify-start md:justify-center px-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map(resource => (
          <div key={resource.id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={resource.imageUrl} 
                alt={resource.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                 {resource.type === 'video' && <PlayCircle size={14} className="text-blue-600" />}
                 {resource.type === 'audio' && <Headphones size={14} className="text-purple-600" />}
                 {resource.type === 'guide' && <FileText size={14} className="text-orange-600" />}
                 <span className="capitalize">{resource.type}</span>
              </div>
              {resource.language !== 'English' && (
                <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium backdrop-blur-md">
                  <Globe size={12} />
                  {resource.language}
                </div>
              )}
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="mb-3">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">{resource.category}</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3 leading-snug">{resource.title}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-1 leading-relaxed">{resource.description}</p>
              <button className="w-full py-3 bg-gray-50 text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white">
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