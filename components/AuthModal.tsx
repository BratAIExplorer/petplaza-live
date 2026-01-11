import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { loginWithGoogle, registerUser, loginWithEmail, resetPassword } from '../services/authService';
import Logo from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
  initialView?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, initialView = 'login' }) => {
  const [isLoginView, setIsLoginView] = useState(initialView === 'login');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.PET_OWNER);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (isOpen) {
        setIsLoginView(initialView === 'login');
        setLoading(false);
        setPassword('');
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let user;
      if (isLoginView) {
        user = await loginWithEmail(email, password);
      } else {
        if (!termsAccepted) {
          alert("Please accept the terms and conditions.");
          setLoading(false);
          return;
        }
        user = await registerUser(email, password, role, name, role === UserRole.PET_OWNER ? petName : undefined, petType);
      }
      onLoginSuccess(user);
      onClose();
    } catch (error: any) {
      console.error("Auth Error:", error);
      if (error.code === 'auth/email-already-in-use') {
        alert("This email is already registered. Please log in or reset your password.");
        setIsLoginView(true);
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        alert("Invalid email or password. Please try again or click 'Forgot Password?'.");
      } else {
        alert("Authentication failed: " + (error.message || "An unknown error occurred."));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address in the field above first.");
      return;
    }
    
    setLoading(true);
    try {
      await resetPassword(email);
      alert(`Safe Haven Link Sent! Check ${email} (including spam) for instructions to reset your password.`);
    } catch (error: any) {
      console.error("Reset Error:", error);
      alert("We couldn't send the reset link: " + (error.message || "Please check your internet."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      onLoginSuccess(user);
      onClose();
    } catch (error: any) {
      console.error("Google Login Error:", error);
      alert("Google Login is restricted on local servers. This will work once we go live on Vercel!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div className="px-6 py-6 border-b border-gray-100 flex flex-col items-center bg-stone-50">
          <Logo className="h-12 w-12 mb-3 shadow-md" />
          <h2 className="text-xl font-bold text-gray-800">{isLoginView ? 'Welcome Back' : 'Join the Community'}</h2>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all mb-6">
            <i className="fa-brands fa-google text-red-500 text-lg"></i>
            {isLoginView ? 'Sign in with Google' : 'Sign up with Google'}
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button type="button" onClick={() => setRole(UserRole.PET_OWNER)} className={`py-3 rounded-lg border-2 font-bold text-sm ${role === UserRole.PET_OWNER ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-100 text-gray-600'}`}>🐶 Pet Owner</button>
                  <button type="button" onClick={() => setRole(UserRole.PET_LOVER)} className={`py-3 rounded-lg border-2 font-bold text-sm ${role === UserRole.PET_LOVER ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-100 text-gray-600'}`}>❤️ Pet Lover</button>
                </div>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Full Name" />
                {role === UserRole.PET_OWNER && <input type="text" required value={petName} onChange={(e) => setPetName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Pet Name" />}
              </>
            )}
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Email Address" />
            
            <div className="space-y-1">
              <input type="password" required={!loading} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Password" />
              {isLoginView && (
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={handleForgotPassword} 
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-800 p-1"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>

            {!isLoginView && (
              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 rounded text-emerald-600 focus:ring-emerald-500" />
                <label htmlFor="terms" className="text-[10px] text-gray-500 uppercase font-black tracking-wider">I agree to Pioneer Terms & Privacy</label>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]">
              {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : (isLoginView ? 'LOG IN' : 'CREATE ACCOUNT')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm font-bold text-emerald-600 hover:underline">
              {isLoginView ? "New here? Create an Account" : "Back to Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
