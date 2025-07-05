// User types
export interface User {
  id: string;
  email: string;
  name: string;
  spiritualPath?: SpiritualPath;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  notificationTime: string;
  spiritualHabits: string[];
  favoriteEmotions: string[];
  preferredBibleBooks: string[];
  preferredTone: 'encouraging' | 'challenging' | 'peaceful' | 'inspiring';
}

export type SpiritualPath = 'Peace Seeker' | 'Bible Learner' | 'Growth Focused' | 'Community Builder';

// Mood types
export interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  secondaryEmotions: string[];
}

export interface MoodSelection {
  primaryMood: string;
  secondaryEmotions: string[];
  timestamp: Date;
}

// Content types
export interface DailyContent {
  id: string;
  userId: string;
  date: Date;
  mood: MoodSelection;
  verse: BibleVerse;
  meditation: Meditation;
  prayer: Prayer;
  reflection: Reflection;
  actionStep: ActionStep;
}

export interface BibleVerse {
  text: string;
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  context?: string;
}

export interface Meditation {
  id: string;
  title: string;
  duration: number; // in minutes
  script: string;
  audioUrl?: string;
  type: 'short' | 'medium' | 'deep';
}

export interface Prayer {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface Reflection {
  id: string;
  prompt: string;
  response?: string;
}

export interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: string;
}

// Community types
export interface PrayerGroup {
  id: string;
  name: string;
  description: string;
  type: string;
  memberCount: number;
  isPrivate: boolean;
}

export interface PrayerRequest {
  id: string;
  userId: string;
  groupId?: string;
  title: string;
  content: string;
  isAnonymous: boolean;
  createdAt: Date;
  responses: PrayerResponse[];
}

export interface PrayerResponse {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Meditation: undefined;
  Community: undefined;
  Library: undefined;
  Profile: undefined;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Progress tracking types
export interface Streak {
  type: 'meditation' | 'prayer' | 'journaling';
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date;
}

export interface FaithBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  level: number;
} 