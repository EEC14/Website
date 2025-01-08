import React, { createContext, useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth"
import {
  createUserProfile,
  getUserProfile,
  UserProfile,
} from "../services/firebase/firestore";
import {
  loginUser,
  logoutUser,
  onAuthChange,
  signupUser
} from "../services/firebase/auth";
import { auth } from "../config/firebase";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setUser(profile);
        } else {
          await createUserProfile(firebaseUser.uid, firebaseUser.email!);
          setUser({
            email: firebaseUser.email!,
            isPro: false,
            isDeluxe: false,
            createdAt: new Date(),
            uid: firebaseUser.uid,
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSocialLogin = async (firebaseUser: any) => {
    try {
      const profile = await getUserProfile(firebaseUser.uid);
      if (profile) {
        setUser(profile);
      } else {
        await createUserProfile(firebaseUser.uid, firebaseUser.email!);
        setUser({
          email: firebaseUser.email!,
          isPro: false,
          isDeluxe: false,
          createdAt: new Date(),
          uid: firebaseUser.uid,
        });
      }
    } catch (error) {
      console.error("Error handling social login:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleSocialLogin(result.user);
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    const firebaseUser = await loginUser(email, password);
    const profile = await getUserProfile(firebaseUser.uid);

    setUser(profile || null);
  };

  const signup = async (email: string, password: string) => {
    const firebaseUser = await signupUser(email, password);
    await createUserProfile(firebaseUser.uid, email);
    setUser({
      email,
      isPro: false,
      isDeluxe: false,
      createdAt: new Date(),
      uid: firebaseUser.uid,
    });
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, loginWithGoogle }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
