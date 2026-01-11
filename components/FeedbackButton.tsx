import React, { useState } from 'react';
import FeedbackModal from './FeedbackModal';
import { User } from '../types';

interface FeedbackButtonProps {
  user: User | null;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 transition-all hover:scale-105 group"
      >
        <i className="fa-solid fa-message"></i>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
          Beta Feedback
        </span>
      </button>
      <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} user={user} />
    </>
  );
};

export default FeedbackButton;
