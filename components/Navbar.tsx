import React from 'react';
import { User } from '../types';
import Logo from './Logo';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onOpenAuth: (view: 'login' | 'signup') => void;
  onNavigate: (view: string) => void;
  currentView: string;
  onLogoClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onOpenAuth, onNavigate, currentView, onLogoClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand */}
          <div 
            onClick={() => {
              onNavigate('home');
              if (onLogoClick) onLogoClick();
            }} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Logo className="h-11 w-11 transition-transform group-hover:scale-105 shadow-md" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-800 tracking-tight leading-none group-hover:text-emerald-700 transition-colors font-sans">
                PetPlaza
              </span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] leading-none mt-1">
                Safe Haven
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${currentView === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'}`}
            >
              Home & Services
            </button>
            <button 
              onClick={() => onNavigate('feed')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${currentView === 'feed' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'}`}
            >
              Community
            </button>
          </div>

          {/* Auth Controls */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm text-gray-800 font-semibold leading-tight">{user.displayName}</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold">{user.role.replace('_', ' ')}</span>
                </div>
                <img
                  src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.displayName}`}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-emerald-100 p-0.5 shadow-sm"
                />
                <button
                  onClick={onLogout}
                  className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors ml-2"
                  title="Log out"
                >
                  <i className="fa-solid fa-right-from-bracket text-lg"></i>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-gray-600 hover:text-emerald-700 font-semibold text-sm px-4 py-2 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5"
                >
                  Join the Haven
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
