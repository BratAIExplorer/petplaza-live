import React, { useState } from 'react';
import { User } from '../types';
import { uploadPostImage } from '../services/dbService';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (caption: string, imageFile: File | null, type: 'media' | 'question' | 'lost-pet') => void;
  user: User;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit, user }) => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [type, setType] = useState<'media' | 'question' | 'lost-pet'>('media');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB Limit
        setError('Image file is too large. Max 5MB allowed.');
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        // Upload logic is now passed to parent or handled here?
        // To keep the interface consistent with the parent Feed.tsx which expects file object:
        // We will pass the data up, but let the Feed.tsx handle the async upload call to dbService
        
        await onSubmit(caption, imageFile, type);
        
        setCaption('');
        setImageFile(null);
        setPreviewUrl(null);
        onClose();
    } catch (err) {
        console.error(err);
        setError('Failed to post. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800">Create New Post</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-6">
          {/* Type Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setType('media')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${type === 'media' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <i className="fa-regular fa-image mr-2"></i>Photo
            </button>
            <button
              type="button"
              onClick={() => setType('question')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${type === 'question' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <i className="fa-solid fa-question mr-2"></i>Ask
            </button>
            <button
              type="button"
              onClick={() => setType('lost-pet')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${type === 'lost-pet' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-500 hover:text-red-500'}`}
            >
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>Lost Pet
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <img src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.displayName}`} className="w-10 h-10 rounded-full" alt="" />
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={type === 'lost-pet' ? "URGENT: Pet Name, Description, Last Seen Location..." : (type === 'question' ? "What's your question for the community?" : "Write a caption...")}
                className={`w-full border-none focus:ring-0 text-gray-700 text-lg resize-none h-24 p-0 ${type === 'lost-pet' ? 'placeholder-red-300' : ''}`}
                required
              />
            </div>

            {/* Image Upload Area */}
            {(type === 'media' || type === 'lost-pet') && (
              <div className="relative">
                {previewUrl ? (
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={previewUrl} alt="Preview" className="w-full max-h-64 object-contain" />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setPreviewUrl(null); }}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ) : (
                  <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${type === 'lost-pet' ? 'border-red-200 hover:bg-red-50 hover:border-red-400' : 'border-gray-200 hover:bg-emerald-50 hover:border-emerald-400'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <i className={`fa-solid fa-cloud-arrow-up text-2xl mb-2 transition-colors ${type === 'lost-pet' ? 'text-red-300 group-hover:text-red-500' : 'text-gray-400 group-hover:text-emerald-500'}`}></i>
                      <p className={`text-sm ${type === 'lost-pet' ? 'text-red-400' : 'text-gray-500'}`}>Click to upload image (Max 5MB)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isLoading || ((type === 'media' || type === 'lost-pet') && !imageFile)}
                className={`${type === 'lost-pet' ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'} text-white font-bold py-2 px-6 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2`}
              >
                {isLoading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                {type === 'lost-pet' ? 'Post Alert' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
