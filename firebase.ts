import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC0faNTv-H_fShssnHYBP3XEXlGVMpzPLs",
  authDomain: "petplaza-pilot.firebaseapp.com",
  projectId: "petplaza-pilot",
  storageBucket: "petplaza-pilot.firebasestorage.app",
  messagingSenderId: "277425925504",
  appId: "1:277425925504:web:4549bfe54d4e8c0ae92565",
  measurementId: "G-5VB7F215QJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
