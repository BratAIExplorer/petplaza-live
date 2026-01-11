import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole } from './types';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Home from './components/Home';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import FeedbackButton from './components/FeedbackButton';
import Logo from './components/Logo';
import AdminDashboard from './components/AdminDashboard';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};
          
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || userData.displayName || 'Pet Plaza Member',
            role: (userData.role as UserRole) || UserRole.PET_LOVER,
            avatarUrl: firebaseUser.photoURL || undefined,
            petName: userData.petName,
            petType: userData.petType
          });
          setIsAuthModalOpen(false);
        } catch (e) {
          console.error("Profile Fetch Error:", e);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Pet Plaza Member',
            role: UserRole.PET_LOVER,
            avatarUrl: firebaseUser.photoURL || undefined
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickTime.current > 2000) {
      clickCount.current = 0;
    }
    clickCount.current += 1;
    lastClickTime.current = now;
    if (clickCount.current >= 5) {
      setIsAdminOpen(true);
      clickCount.current = 0;
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setCurrentView('home');
  };

  const openAuth = (view: 'login' | 'signup') => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 gap-4">
        <Logo className="h-16 w-16 animate-bounce" />
        <p className="text-emerald-600 font-medium animate-pulse uppercase tracking-[0.2em] text-[10px]">Loading Safe Haven...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-0 font-sans flex flex-col">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onOpenAuth={openAuth}
        onNavigate={setCurrentView}
        currentView={currentView}
        onLogoClick={handleLogoClick}
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <Home 
            user={user} 
            onNavigate={setCurrentView} 
            onOpenAuth={openAuth} 
          />
        )}
        
        {currentView === 'feed' && (
          <Feed 
            user={user} 
            onOpenAuth={openAuth}
          />
        )}
      </main>

      <Footer />

      <FeedbackButton user={user} />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
        initialView={authView}
      />

      {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
}

export default App;