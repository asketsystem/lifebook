// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    HEALTH: '/health',
    AUTH: '/api/auth',
    CONTENT: '/api/content',
    COMMUNITY: '/api/community',
    USER: '/api/user',
  },
  TIMEOUT: 10000,
};

// Firebase Configuration
export const FIREBASE_CONFIG = {
  // These will be set from environment variables
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Theme Configuration
export const THEME = {
  colors: {
    primary: '#4A90E2',
    secondary: '#7F8C8D',
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
      light: '#BDC3C7',
    },
    mood: {
      happy: '#F1C40F',
      peaceful: '#3498DB',
      grateful: '#E67E22',
      hopeful: '#9B59B6',
      anxious: '#E74C3C',
      sad: '#34495E',
      angry: '#C0392B',
      lonely: '#95A5A6',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal',
    },
    small: {
      fontSize: 12,
      fontWeight: 'normal',
    },
  },
};

// App Configuration
export const APP_CONFIG = {
  name: 'LifeBook',
  version: '1.0.0',
  description: 'AI-powered Christian wellness app',
  features: {
    onboarding: true,
    moodTracking: true,
    aiContent: true,
    meditation: true,
    community: true,
    library: true,
    notifications: true,
  },
  limits: {
    freeTier: {
      dailyMeditations: 1,
      aiContentRequests: 5,
      libraryAccess: 'limited',
    },
    premiumTier: {
      dailyMeditations: 'unlimited',
      aiContentRequests: 'unlimited',
      libraryAccess: 'full',
    },
  },
};

// Meditation Configuration
export const MEDITATION_CONFIG = {
  durations: {
    short: 2,
    medium: 5,
    deep: 10,
  },
  breathingPatterns: {
    '4-7-8': { inhale: 4, hold: 7, exhale: 8 },
    'box': { inhale: 4, hold: 4, exhale: 4, holdAfterExhale: 4 },
    'triangle': { inhale: 4, hold: 4, exhale: 6 },
  },
};

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  types: {
    dailyReminder: 'daily-reminder',
    moodCheck: 'mood-check',
    communityActivity: 'community-activity',
    newContent: 'new-content',
  },
  defaultTime: '08:00',
}; 