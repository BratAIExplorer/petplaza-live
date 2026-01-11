
import { initializeApp } from 'firebase/app';
// Fix: Use correct modular imports for Auth and Firestore services
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase Configuration (Updated from Console)
const firebaseConfig = {
  apiKey: "AIzaSyC0faNTv-H_fShssnHYBP3XEXlGVMpzPLs",
  authDomain: "petplaza-pilot.firebaseapp.com",
  projectId: "petplaza-pilot",
  storageBucket: "petplaza-pilot.firebasestorage.app",
  messagingSenderId: "277425925504",
  appId: "1:277425925504:web:4549bfe54d4e8c0ae92565",
  measurementId: "G-5VB7F215QJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
