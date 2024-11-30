import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { type User } from 'firebase/auth';
import { db } from '../../config/firebase';

export interface UserProfile {
  email: string;
  isPro: boolean;
  createdAt: Date;
  stripeCustomerId?: string;
  subscriptionId?: string;
}

export const createUserProfile = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    email: user.email,
    isPro: false,
    createdAt: serverTimestamp()
  });
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    return null;
  }

  return userSnap.data() as UserProfile;
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};