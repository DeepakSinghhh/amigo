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
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Peer Support Space</h2>
           <p className="text-gray-500 text-sm mt-1">A safe, moderated community to share and support.</p>
        </div>
        <button 
          onClick={() => setIsPostModalOpen(true)}
          className="bg-gray-900 text-white px-5 py-3 rounded-full font-medium hover:bg-black shadow-lg transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          Share Thoughts
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex gap-3">
        <div className="w-1 bg-blue-500 rounded-full h-auto"></div>
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong className="font-semibold block mb-1">Community Guidelines</strong> 
          Be kind, respectful, and supportive. This forum is moderated by trained student volunteers to ensure a safe environment for everyone.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-full ${post.isVerifiedPeer ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                   <UserCircle size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{post.authorAlias}</span>
                    {post.isVerifiedPeer && (
                      <BadgeCheck size={16} className="text-blue-500" fill="currentColor" color="white" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">2 hours ago</span>
                </div>
              </div>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-semibold bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-200">#{tag}</span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">{post.content}</p>
            
            <div className="flex items-center gap-8 text-gray-400 text-sm font-medium pt-4 border-t border-gray-50">
              <button className="flex items-center gap-2 hover:text-red-500 transition-colors group">
                <Heart size={20} className="group-hover:fill-red-500" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                <MessageSquare size={20} />
                <span>{post.replies} Replies</span>
              </button>
              <button className="flex items-center gap-2 hover:text-gray-900 transition-colors ml-auto">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

       {/* Modal */}
       {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Create a Post</h3>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind? (Posts are anonymous)"
              className="w-full h-40 p-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none resize-none mb-6 placeholder-gray-400"
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsPostModalOpen(false)}
                className="px-6 py-3 text-gray-500 hover:bg-gray-100 rounded-full font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreatePost}
                className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-colors"
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