import { User, UserRole } from '../types';
import { USE_MOCK_DATA, MOCK_USER } from '../constants';
import { auth, googleProvider, db } from '../firebase';
// Fix: Import Auth modular functions correctly from 'firebase/auth'
import { 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  signOut as firebaseSignOut, 
  sendPasswordResetEmail 
} from 'firebase/auth';
// Fix: Import Firestore modular functions correctly from 'firebase/firestore'
import { doc, setDoc, getDoc } from 'firebase/firestore';

const mapFirebaseUserToAppUser = async (firebaseUser: any, role?: UserRole): Promise<User> => {
  const fallbackUser: User = {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || 'Pet Plaza Member',
    role: role || UserRole.PET_LOVER,
    avatarUrl: firebaseUser.photoURL || undefined,
    createdAt: parseInt(firebaseUser.metadata.createdAt || '0')
  };

  try {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        ...fallbackUser,
        displayName: userData.displayName || fallbackUser.displayName,
        role: (userData.role as UserRole) || fallbackUser.role,
        petName: userData.petName,
        petType: userData.petType,
        createdAt: userData.createdAt || fallbackUser.createdAt
      };
    }
  } catch (error) {
    console.warn("Database offline. Logging in with basic profile.", error);
  }

  return fallbackUser;
};

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_USER), 800));
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return await mapFirebaseUserToAppUser(userCredential.user);
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const loginWithGoogle = async (
  desiredRole?: UserRole, 
  desiredPetName?: string, 
  desiredPetType?: string
): Promise<User> => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_USER), 800));
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    try {
      const userDocRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      // Only set data if NEW user
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          role: desiredRole || UserRole.PET_LOVER,
          petName: desiredPetName || null,
          petType: desiredPetType || null,
          createdAt: Date.now()
        });
      }
    } catch (dbError) {
      console.warn("Could not save Google user to DB:", dbError);
    }
    return await mapFirebaseUserToAppUser(result.user);
  } catch (error) {
    console.error("Google Auth Error:", error);
    throw error;
  }
};

export const registerUser = async (
  email: string, 
  password: string, 
  role: UserRole, 
  name: string, 
  petName?: string, 
  petType?: string
): Promise<User> => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({
      id: `user_${Date.now()}`,
      email,
      displayName: name,
      role,
      petName,
      petType,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    }), 1000));
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    try {
      await updateProfile(user, { displayName: name });
    } catch (e) {
      console.warn("Failed to update display name", e);
    }
    try {
      await setDoc(doc(db, 'users', user.uid), {
        email,
        displayName: name,
        role,
        petName: petName || null,
        petType: petType || null,
        createdAt: Date.now()
      });
    } catch (dbError) {
      console.warn("Could not save user profile to DB:", dbError);
    }
    return {
      id: user.uid,
      email: user.email || '',
      displayName: name,
      role,
      petName,
      petType,
      createdAt: Date.now()
    };
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  if (USE_MOCK_DATA) return new Promise(resolve => setTimeout(resolve, 800));
  await sendPasswordResetEmail(auth, email);
};

export const logoutUser = async (): Promise<void> => {
  if (USE_MOCK_DATA) return;
  await firebaseSignOut(auth);
};