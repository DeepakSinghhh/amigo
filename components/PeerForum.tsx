import React, { useState } from 'react';
import { ForumPost } from '../types';
import { MessageSquare, Heart, Share2, BadgeCheck, UserCircle, Plus } from 'lucide-react';

const MOCK_POSTS: ForumPost[] = [
  {
    id: '1',
    authorAlias: 'BlueSky22',
    content: 'Feeling extremely overwhelmed with finals coming up. Does anyone have tips for managing study schedules without burning out?',
    likes: 24,
    replies: 5,
    tags: ['Academic Stress', 'Advice Needed'],
    isVerifiedPeer: false,
  },
  {
    id: '2',
    authorAlias: 'CampusGuide_Amit',
    content: 'Remember that the library is open 24/7 this week. Also, take breaks! Your brain needs rest to retain info. We are in this together!',
    likes: 45,
    replies: 2,
    tags: ['Motivation', 'Support'],
    isVerifiedPeer: true,
  },
  {
    id: '3',
    authorAlias: 'QuietStorm',
    content: 'I feel very isolated lately, especially being from a rural background. It is hard to fit in.',
    likes: 18,
    replies: 8,
    tags: ['Loneliness', 'Social'],
    isVerifiedPeer: false,
  },
];

const PeerForum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(MOCK_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    
    const newPost: ForumPost = {
      id: Date.now().toString(),
      authorAlias: `Student_${Math.floor(Math.random() * 1000)}`, // Anonymized
      content: newPostContent,
      likes: 0,
      replies: 0,
      tags: ['General'],
      isVerifiedPeer: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsPostModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 animate-neo-fade-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center ga!p-4 neo-card-inset !rounded-[2rem] !p-6">
        <div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tight">Peer Support Space</h2>
           <p className="text-gray-500 text-sm mt-2 font-bold">A safe, moderated community to share and support.</p>
        </div>
        <button 
          onClick={() => setIsPostModalOpen(true)}
          className="neo-button neo-button-primary !py-3 flex items-center gap-2"
        >
          <Plus size={18} />
          Share Thoughts
        </button>
      </div>

      {/* Warning Banner */}
      <div className="neo-badge neo-bg-sky text-blue-900 p-5 !rounded-2xl flex gap-4 text-left shadow-[var(--neo-shadow-out-sm)] border border-white">
        <div className="w-1.5 bg-blue-500 rounded-full h-auto shadow-inner"></div>
        <p className="text-sm font-semibold leading-relaxed">
          <strong className="font-black block mb-1">Community Guidelines</strong> 
          Be kind, respectful, and supportive. This forum is moderated by trained student volunteers to ensure a safe environment for everyone.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="neo-card !p-8 hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl shadow-[var(--neo-shadow-out-sm)] border border-white ${post.isVerifiedPeer ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                   <UserCircle size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-900 text-lg">{post.authorAlias}</span>
                    {post.isVerifiedPeer && (
                      <BadgeCheck size={18} className="text-blue-500 drop-shadow-sm" fill="currentColor" color="white" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500 font-bold">2 hours ago</span>
                </div>
              </div>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-black uppercase tracking-widest bg-white/60 text-gray-600 px-3 py-1.5 rounded-lg border border-white/50 shadow-[var(--neo-shadow-out-sm)]">#{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="neo-card-inset !p-6 bg-white/40 mb-6 border border-white/40">
              <p className="text-gray-800 leading-relaxed text-lg font-bold">{post.content}</p>
            </div>
            
            <div className="flex items-center gap-8 text-gray-500 text-sm font-black pt-2">
              <button className="flex items-center gap-2 hover:text-red-500 transition-colors group">
                <Heart size={22} className="group-hover:fill-red-500" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <MessageSquare size={22} />
                <span>{post.replies} Replies</span>
              </button>
              <button className="flex items-center gap-2 hover:text-gray-900 transition-colors ml-auto">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

       {/* Modal */}
       {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" style={{zIndex: 100}}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsPostModalOpen(false)}></div>
          <div className="relative neo-card w-full max-w-lg !p-8 animate-neo-fade-up">
            <h3 className="text-2xl font-black mb-6 text-gray-900 tracking-tight">Create a Post</h3>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind? (Posts are anonymous)"
              className="w-full h-40 neo-input !p-4 mb-6 font-bold text-gray-800"
            />
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setIsPostModalOpen(false)}
                className="neo-button !bg-white/60 !text-gray-600 hover:!bg-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreatePost}
                className="neo-button neo-button-primary"
              >
                Post Anonymously
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerForum;