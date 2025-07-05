import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential,
  OAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';
import { firestore } from '../config/firebase';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

interface UserProfile {
  uid: string;
  email: string;
  name: string;
  spiritualPath?: 'Peace Seeker' | 'Bible Learner' | 'Growth Focused' | 'Community Builder';
  preferences: {
    notificationTime: string;
    spiritualHabits: string[];
    favoriteEmotions: string[];
    preferredBibleBooks: string[];
    preferredTone: 'encouraging' | 'challenging' | 'peaceful' | 'inspiring';
  };
  hasCompletedOnboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  localOnboardingCompleted: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  checkLocalOnboarding: () => Promise<void>;
  setLocalOnboarding: (completed: boolean) => Promise<void>;
  clearError: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localOnboardingCompleted, setLocalOnboardingCompleted] = useState<boolean>(false);

  // Google OAuth configuration
  const googleConfig = {
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
    scopes: ['openid', 'profile', 'email'],
  };

  // Apple OAuth configuration
  const appleConfig = {
    clientId: process.env.EXPO_PUBLIC_APPLE_CLIENT_ID || '',
    scopes: ['name', 'email'],
  };

  // Convert Firebase User to AuthUser
  const convertFirebaseUser = (firebaseUser: User): AuthUser => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
  });

  // Load user profile from Firestore
  const loadUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  };

  // Create default user profile
  const createDefaultProfile = (uid: string, email: string, name: string): UserProfile => ({
    uid,
    email,
    name,
    preferences: {
      notificationTime: '08:00',
      spiritualHabits: ['verse', 'prayer'],
      favoriteEmotions: ['peaceful', 'grateful'],
      preferredBibleBooks: ['Psalms', 'John'],
      preferredTone: 'encouraging',
    },
    hasCompletedOnboarding: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Save user profile to Firestore
  const saveUserProfile = async (userProfile: UserProfile): Promise<void> => {
    try {
      await setDoc(doc(firestore, 'users', userProfile.uid), {
        ...userProfile,
        createdAt: userProfile.createdAt,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!profile) throw new Error('No user profile found');

    try {
      console.log('Updating user profile with:', updates);
      const updatedProfile = { ...profile, ...updates, updatedAt: new Date() };
      await updateDoc(doc(firestore, 'users', profile.uid), {
        ...updates,
        updatedAt: new Date(),
      });
      setProfile(updatedProfile);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Email/Password Sign In
  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Load user profile
      const userProfile = await loadUserProfile(firebaseUser.uid);
      setProfile(userProfile);
      
      // Save auth state to AsyncStorage
      await AsyncStorage.setItem('authUser', JSON.stringify(convertFirebaseUser(firebaseUser)));
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign Up
  const signUpWithEmail = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update display name
      await updateProfile(firebaseUser, { displayName: name });
      
      // Check if user completed onboarding locally
      const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding') === 'true';
      
      // Create user profile with onboarding status
      const userProfile = createDefaultProfile(firebaseUser.uid, email, name);
      if (hasCompletedOnboarding) {
        userProfile.hasCompletedOnboarding = true;
        // Clear the local storage since it's now in the profile
        await AsyncStorage.removeItem('hasCompletedOnboarding');
      }
      
      await saveUserProfile(userProfile);
      setProfile(userProfile);
      
      // Save auth state to AsyncStorage
      await AsyncStorage.setItem('authUser', JSON.stringify(convertFirebaseUser(firebaseUser)));
    } catch (error: any) {
      setError(error.message || 'Failed to sign up');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const signInWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Request Google OAuth
      const request = new AuthSession.AuthRequest({
        clientId: googleConfig.clientId,
        scopes: googleConfig.scopes,
        redirectUri: AuthSession.makeRedirectUri(),
        responseType: AuthSession.ResponseType.IdToken,
      });
      
      const result = await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      });
      
      if (result.type === 'success' && result.params.id_token) {
        // Create credential and sign in
        const credential = GoogleAuthProvider.credential(result.params.id_token);
        const userCredential = await signInWithCredential(auth, credential);
        const firebaseUser = userCredential.user;
        
        // Check if user profile exists, create if not
        let userProfile = await loadUserProfile(firebaseUser.uid);
        if (!userProfile) {
          // Check if user completed onboarding locally
          const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding') === 'true';
          
          userProfile = createDefaultProfile(
            firebaseUser.uid,
            firebaseUser.email || '',
            firebaseUser.displayName || 'User'
          );
          
          if (hasCompletedOnboarding) {
            userProfile.hasCompletedOnboarding = true;
            // Clear the local storage since it's now in the profile
            await AsyncStorage.removeItem('hasCompletedOnboarding');
          }
          
          await saveUserProfile(userProfile);
        }
        
        setProfile(userProfile);
        await AsyncStorage.setItem('authUser', JSON.stringify(convertFirebaseUser(firebaseUser)));
      }
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Apple Sign In
  const signInWithApple = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      
      if (credential.identityToken) {
        // Create Firebase credential
        const provider = new OAuthProvider('apple.com');
        const firebaseCredential = provider.credential({
          idToken: credential.identityToken,
        });
        
        const userCredential = await signInWithCredential(auth, firebaseCredential);
        const firebaseUser = userCredential.user;
        
        // Check if user profile exists, create if not
        let userProfile = await loadUserProfile(firebaseUser.uid);
        if (!userProfile) {
          const name = credential.fullName?.givenName && credential.fullName?.familyName
            ? `${credential.fullName.givenName} ${credential.fullName.familyName}`
            : 'User';
          
          // Check if user completed onboarding locally
          const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding') === 'true';
          
          userProfile = createDefaultProfile(
            firebaseUser.uid,
            firebaseUser.email || '',
            name
          );
          
          if (hasCompletedOnboarding) {
            userProfile.hasCompletedOnboarding = true;
            // Clear the local storage since it's now in the profile
            await AsyncStorage.removeItem('hasCompletedOnboarding');
          }
          
          await saveUserProfile(userProfile);
        }
        
        setProfile(userProfile);
        await AsyncStorage.setItem('authUser', JSON.stringify(convertFirebaseUser(firebaseUser)));
      }
    } catch (error: any) {
      if (error.code === 'ERR_CANCELED') {
        // User cancelled Apple sign-in
        return;
      }
      setError(error.message || 'Failed to sign in with Apple');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await signOut(auth);
      setUser(null);
      setProfile(null);
      
      // Clear AsyncStorage
      await AsyncStorage.removeItem('authUser');
    } catch (error: any) {
      setError(error.message || 'Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      setError(error.message || 'Failed to send password reset email');
      throw error;
    }
  };

  // Clear Error
  const clearError = (): void => {
    setError(null);
  };

  // Check local onboarding completion
  const checkLocalOnboarding = async (): Promise<void> => {
    try {
      const hasCompleted = await AsyncStorage.getItem('hasCompletedOnboarding');
      setLocalOnboardingCompleted(hasCompleted === 'true');
    } catch (error) {
      console.error('Error checking local onboarding status:', error);
      setLocalOnboardingCompleted(false);
    }
  };

  // Set local onboarding completion
  const setLocalOnboarding = async (completed: boolean): Promise<void> => {
    try {
      if (completed) {
        await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      } else {
        await AsyncStorage.removeItem('hasCompletedOnboarding');
      }
      setLocalOnboardingCompleted(completed);
    } catch (error) {
      console.error('Error setting local onboarding status:', error);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const authUser = convertFirebaseUser(firebaseUser);
        setUser(authUser);
        
        // Load user profile
        const userProfile = await loadUserProfile(firebaseUser.uid);
        setProfile(userProfile);
        
        // Save to AsyncStorage
        await AsyncStorage.setItem('authUser', JSON.stringify(authUser));
      } else {
        setUser(null);
        setProfile(null);
        await AsyncStorage.removeItem('authUser');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Load cached user on app start
  useEffect(() => {
    const loadCachedUser = async () => {
      try {
        const cachedUser = await AsyncStorage.getItem('authUser');
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        }
      } catch (error) {
        console.error('Error loading cached user:', error);
      }
    };

    loadCachedUser();
  }, []);

  // Check local onboarding completion on mount
  useEffect(() => {
    checkLocalOnboarding();
  }, []);

  const value: AuthContextType = {
    user,
    profile,
    loading,
    error,
    localOnboardingCompleted,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    signOut: handleSignOut,
    resetPassword,
    updateUserProfile,
    checkLocalOnboarding,
    setLocalOnboarding,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 