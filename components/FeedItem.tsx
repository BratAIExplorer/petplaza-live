import React, { useState } from 'react';
import { Post, User } from '../types';

interface FeedItemProps {
  post: Post;
  currentUser: User | null;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  onEdit: (postId: string, newCaption: string) => void;
  onComment: (postId: string, text: string) => void;
}

const FeedItem: React.FC<FeedItemProps> = ({ post, currentUser, onLike, onDelete, onEdit, onComment }) => {
  const [isLiked, setIsLiked] = useState(post.likedByCurrentUser);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCaption, setEditCaption] = useState(post.caption);
  const [showMenu, setShowMenu] = useState(false);
  
  // Comment State
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Rules
  const isOwner = currentUser?.id === post.userId;
  const hasInteractions = post.likes > 0 || post.comments.length > 0;
  const canEdit = isOwner && !hasInteractions;
  const canDelete = isOwner;

  const handleLike = () => {
    setIsAnimating(true);
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike(post.id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleSaveEdit = () => {
    onEdit(post.id, editCaption);
    setIsEditing(false);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
        onComment(post.id, commentText);
        setCommentText('');
        // Auto-show comments if hidden
        if (!showComments) setShowComments(true);
    }
  };

  const isLostPet = post.type === 'lost-pet';

  return (
    <div className={`bg-white border rounded-2xl mb-8 shadow-sm overflow-hidden relative transition-all hover:shadow-md duration-300 ${isLostPet ? 'border-red-100 ring-4 ring-red-50/50' : 'border-gray-100'}`}>
      
      {/* Lost Pet Header Banner */}
      {isLostPet && (
        <div className="bg-red-500 text-white text-xs font-bold px-4 py-1.5 flex items-center justify-between">
            <span className="flex items-center gap-2"><i className="fa-solid fa-triangle-exclamation animate-pulse"></i> LOST PET ALERT</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">Please Help</span>
        </div>
      )}

      {/* Post Header */}
      <div className="flex items-center px-5 py-4">
        <img 
          src={post.userAvatar || `https://ui-avatars.com/api/?name=${post.userName}`} 
          alt={post.userName} 
          className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-gray-100"
        />
        <div className="ml-3">
          <p className="text-sm font-bold text-gray-900 leading-tight">{post.userName}</p>
          <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
        
        {(isOwner) && (
          <div className="ml-auto relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <i className="fa-solid fa-ellipsis"></i>
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-8 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in-up">
                
                {/* Edit Option */}
                <div className="group relative">
                  <button 
                    onClick={() => { 
                      if (canEdit) {
                        setIsEditing(true); 
                        setShowMenu(false); 
                      }
                    }}
                    disabled={!canEdit}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${canEdit ? 'text-gray-700 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed bg-gray-50/50'}`}
                  >
                    <i className="fa-solid fa-pen text-xs"></i> 
                    <span>Edit Caption</span>
                    {!canEdit && <i className="fa-solid fa-lock text-xs ml-auto text-gray-300"></i>}
                  </button>
                  
                  {/* Tooltip for Disabled Edit */}
                  {!canEdit && (
                    <div className="hidden group-hover:block absolute right-full top-0 mr-2 w-48 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-50">
                      Cannot edit posts that have likes or comments to preserve context.
                    </div>
                  )}
                </div>

                {/* Delete Option */}
                {canDelete && (
                  <button 
                    onClick={() => { if(window.confirm('Delete post?')) onDelete(post.id); }}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 border-t border-gray-50"
                  >
                    <i className="fa-solid fa-trash text-xs"></i> Delete Post
                  </button>
                )}
              </div>
            )}
            {showMenu && <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)}></div>}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="px-5 pb-4">
         {isEditing ? (
            <div className="bg-gray-50 p-3 rounded-xl border border-emerald-100">
              <label className="text-xs font-bold text-emerald-600 uppercase mb-1 block">Editing Caption</label>
              <textarea 
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                rows={3}
              />
              <div className="flex justify-end gap-2 mt-3">
                <button onClick={() => setIsEditing(false)} className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 font-medium">Cancel</button>
                <button onClick={handleSaveEdit} className="text-xs bg-emerald-600 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-700 font-bold shadow-sm">Save Changes</button>
              </div>
            </div>
         ) : (
            <div className={`text-gray-800 leading-relaxed ${post.type === 'question' ? 'text-xl font-medium px-2' : 'text-sm'} ${isLostPet ? 'text-red-900 font-medium' : ''}`}>
              {post.caption}
            </div>
         )}
      </div>

      {/* Post Image */}
      {(post.type === 'media' || post.type === 'lost-pet') && post.imageUrl && (
        <div className="relative w-full bg-gray-50 group cursor-pointer" onDoubleClick={handleLike}>
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full h-auto object-cover max-h-[600px]"
            loading="lazy"
          />
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
             <i className="fa-solid fa-heart text-white text-9xl drop-shadow-2xl opacity-90 animate-bounce"></i>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-6 text-xl text-gray-500">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 group transition-colors ${isLiked ? 'text-red-500' : 'hover:text-gray-800'}`}
          >
            <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart transition-transform group-active:scale-90`}></i>
          </button>
          
          <button 
             onClick={() => setShowComments(!showComments)}
             className="flex items-center gap-2 group hover:text-emerald-600 transition-colors"
          >
            <i className="fa-regular fa-comment transition-transform group-active:scale-90"></i>
          </button>
          
           <button className="flex items-center gap-2 group hover:text-gray-800 transition-colors ml-auto">
             <i className="fa-regular fa-share-from-square transition-transform group-active:scale-90"></i>
          </button>
        </div>
        
        {/* Likes Count */}
        <div className="mt-3">
          <p className="text-sm font-bold text-gray-900">{likeCount > 0 ? `${likeCount} likes` : 'Be the first to like'}</p>
        </div>

        {/* Comment Section */}
        {showComments && (
            <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in-up">
                {post.comments.length > 0 ? (
                    <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {post.comments.map(c => (
                            <div key={c.id} className="flex gap-3">
                                <img src={c.userAvatar || `https://ui-avatars.com/api/?name=${c.userName}`} className="w-8 h-8 rounded-full mt-0.5 border border-gray-100" alt="" />
                                <div className="bg-gray-50 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm flex-1">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className="font-bold text-gray-900 text-xs">{c.userName}</span>
                                        <span className="text-[10px] text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-700 leading-snug">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-gray-400 text-sm">No comments yet. Start the conversation!</div>
                )}
                
                {currentUser ? (
                    <form onSubmit={handleSubmitComment} className="flex gap-3 items-center">
                        <img src={currentUser.avatarUrl || `https://ui-avatars.com/api/?name=${currentUser.displayName}`} className="w-8 h-8 rounded-full" alt="Me" />
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                value={commentText} 
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..." 
                                className="w-full bg-gray-50 border-gray-200 rounded-full pl-4 pr-12 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            />
                            <button 
                                type="submit" 
                                disabled={!commentText.trim()} 
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-xs uppercase px-2 py-1 hover:bg-emerald-50 rounded disabled:opacity-50 disabled:hover:bg-transparent"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500">Log in to like and comment on this post.</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default FeedItem;
