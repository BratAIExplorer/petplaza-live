import React, { useEffect, useState } from 'react';
import { Post, User } from '../types';
import { getPosts, createPost, deletePost, updatePost, addComment, uploadPostImage, likePost } from '../services/dbService';
import FeedItem from './FeedItem';
import CreatePostModal from './CreatePostModal';
import AIAssistant from './AIAssistant';

interface FeedProps {
  user: User | null;
  onOpenAuth: (view: 'login' | 'signup') => void;
}

const Feed: React.FC<FeedProps> = ({ user, onOpenAuth }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'media' | 'question' | 'lost-pet'>('all');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts([...data]); 
  };

  const handleCreatePost = async (caption: string, imageFile: File | null, type: 'media' | 'question' | 'lost-pet') => {
    if (!user) return;
    const imageUrl = await uploadPostImage(imageFile);
    const newPost: Post = {
      id: `post_${Date.now()}`,
      userId: user.id,
      userName: user.displayName,
      userAvatar: user.avatarUrl,
      caption,
      imageUrl: imageUrl, 
      type,
      likes: 0,
      comments: [],
      createdAt: Date.now(),
      likedByCurrentUser: false
    };
    await createPost(newPost);
    await loadPosts();
    if (type === 'lost-pet') setFilter('lost-pet');
  };

  const handleDelete = async (postId: string) => {
    await deletePost(postId);
    await loadPosts();
  };

  const handleEdit = async (postId: string, newCaption: string) => {
    try {
        await updatePost(postId, newCaption);
        await loadPosts();
    } catch (e: any) {
        alert(e.message);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
        onOpenAuth('login');
        return;
    }
    const post = posts.find(p => p.id === postId);
    const isLiked = post?.likedByCurrentUser; 
    await likePost(postId, !isLiked);
  }

  const handleComment = async (postId: string, text: string) => {
    if (!user) return;
    const newComment = {
        id: `c_${Date.now()}`,
        userId: user.id,
        userName: user.displayName,
        userAvatar: user.avatarUrl,
        text,
        createdAt: Date.now()
    };
    await addComment(postId, newComment);
    await loadPosts();
  };

  const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.type === filter);

  const FilterButton = ({ type, label, icon }: { type: typeof filter, label: string, icon?: string }) => (
    <button 
        onClick={() => setFilter(type)} 
        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 mb-2 ${filter === type ? 'bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
    >
        {icon && <i className={`${icon} w-5 text-center`}></i>}
        {label}
        {filter === type && <i className="fa-solid fa-chevron-right ml-auto text-xs opacity-50"></i>}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
            {user ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="h-24 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
                    <div className="px-6 pb-6 text-center -mt-10">
                        <img 
                            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                            alt="Me" 
                            className="w-20 h-20 rounded-full border-4 border-white mx-auto shadow-md"
                        />
                        <h3 className="font-bold text-gray-900 mt-2 text-lg">{user.displayName}</h3>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4">{user.role.replace('_', ' ')}</p>
                    </div>
                </div>
            ) : (
                <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100 mb-6">
                    <h3 className="font-bold text-gray-900 mb-2">Join PetPlaza</h3>
                    <button onClick={() => onOpenAuth('signup')} className="bg-emerald-600 text-white w-full py-2 rounded-lg font-bold text-sm">Sign Up</button>
                </div>
            )}
            
            {/* AI ASSISTANT PANEL */}
            <AIAssistant />

            <div className="text-[10px] text-gray-400 text-center mt-6 leading-relaxed">
                &copy; 2026 PetPlaza Inc.<br/>
                Safe Haven Pilot v1.0.7
             </div>
        </div>

        <div className="lg:col-span-6">
            <div 
                onClick={() => user ? setIsCreateModalOpen(true) : onOpenAuth('signup')}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
            >
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                    {user ? <img src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Me" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><i className="fa-solid fa-user"></i></div>}
                </div>
                <div className="flex-1 bg-gray-50 hover:bg-gray-100 rounded-full px-5 py-3 text-gray-500 text-sm font-medium">
                    {user ? `What's on your mind, ${user.displayName.split(' ')[0]}?` : "Join to post..."}
                </div>
            </div>

            <div className="space-y-6">
                {filteredPosts.map(post => (
                    <FeedItem key={post.id} post={post} currentUser={user} onLike={handleLike} onDelete={handleDelete} onEdit={handleEdit} onComment={handleComment} />
                ))}
            </div>
        </div>

        <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Feed Filters</h4>
                <FilterButton type="all" label="All Posts" icon="fa-solid fa-layer-group" />
                <FilterButton type="lost-pet" label="Lost & Found" icon="fa-solid fa-triangle-exclamation text-red-500" />
                <FilterButton type="question" label="Questions" icon="fa-solid fa-circle-question text-emerald-500" />
            </div>
        </div>
      </div>
      
      {user && <CreatePostModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSubmit={handleCreatePost} user={user} />}
    </div>
  );
};

export default Feed;
