import React, { useState } from 'react';
import { saveFeedback } from '../services/dbService';
import { User } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, user }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'bug' | 'feature' | 'general'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Fallback ID if guest
    const userId = user ? user.id : 'guest_' + Date.now();

    await saveFeedback({
      userId,
      message,
      type,
      timestamp: Date.now()
    });

    setIsLoading(false);
    setIsSuccess(true);
    setMessage('');
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up relative overflow-hidden">
        
        {/* Success State ("PawYou") */}
        {isSuccess ? (
            <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <i className="fa-solid fa-paw text-4xl text-emerald-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">PawYou! 🐾</h3>
                <p className="text-gray-500 mb-8">
                    Thanks for being a Pioneer. Your feedback helps make this a better home for everyone.
                </p>
                <button 
                    onClick={handleClose}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-transform hover:scale-105"
                >
                    Close
                </button>
                
                {/* Confetti decoration */}
                <i className="fa-solid fa-star text-yellow-400 absolute top-10 left-10 text-xl animate-pulse"></i>
                <i className="fa-solid fa-heart text-red-400 absolute bottom-10 right-10 text-xl animate-pulse"></i>
            </div>
        ) : (
            /* Form State */
            <>
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Pioneer Feedback</h3>
                <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-gray-600"></i></button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div className="flex gap-2">
                    {(['general', 'feature', 'bug'] as const).map(t => (
                        <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg border ${type === t ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-500 border-gray-200'}`}
                        >
                        {t}
                        </button>
                    ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                    <textarea 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500"
                    rows={4}
                    placeholder="Tell us what you love or what we can improve..."
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                    {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Send Feedback'}
                </button>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
