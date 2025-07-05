# LifeBook 📖✨

**LifeBook** is an AI-powered Christian wellness mobile application that delivers personalized mood-based Bible verses, guided meditations, prayer prompts, and community features. The project consists of a React Native frontend (Expo) and a Node.js/Express backend with AI and Firebase integration.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Usage Examples](#usage-examples)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Personalized Mood-Based Content:** Receive daily Bible verses, meditations, prayers, and reflection prompts tailored to your mood.
- **Guided Meditations:** Access spiritual meditation sessions with customizable durations and breathing patterns.
- **Prayer Prompts:** AI-generated prayers based on your emotional state.
- **Community:** Connect with fellow believers and share your spiritual journey.
- **Library:** Explore Christian books and resources.
- **Onboarding & Profile:** Smooth onboarding experience and personal profile management.
- **Notifications:** Stay engaged with reminders and daily encouragement.
- **AI Integration:** Uses OpenAI for content generation.
- **Firebase Integration:** Authentication, data storage, and analytics.

---

## Tech Stack
**Frontend:**
- React Native (Expo)
- React Navigation
- Firebase JS SDK
- TypeScript

**Backend:**
- Node.js
- Express
- Firebase Admin SDK
- OpenAI API
- Cloudinary (for media)
- TypeScript

---

## Project Structure
```
lifebook/
  backend/         # Node.js/Express backend API
    src/
      config/      # Configuration (Cloudinary, Firebase, etc.)
      controllers/ # API controllers (AI content, etc.)
      middleware/  # Auth, rate limiting, etc.
      routes/      # Express routes
      services/    # AI, utility services
      types/       # TypeScript types
      utils/       # Utility functions
  frontend/        # React Native (Expo) mobile app
    src/
      assets/      # Images and icons
      components/  # Reusable UI components
      config/      # App and theme config
      contexts/    # React contexts (e.g., Auth)
      navigation/  # Navigation setup
      screens/     # App screens (Home, Meditation, etc.)
      types/       # TypeScript types
      utils/       # Utility functions
```

---

## Getting Started

### Backend Setup
1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Configure environment variables:**
   - Copy `env.example` to `.env` and fill in your credentials.
3. **Run the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup
1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Configure environment variables:**
   - Copy `env.example` to `.env` and fill in your credentials.
3. **Start the Expo app:**
   ```bash
   npm start
   ```
   - Use the Expo Go app or an emulator to preview.

---

## Environment Variables

### Backend (`backend/.env`)
- `PORT`
- `NODE_ENV`
- `FRONTEND_URL`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `DATABASE_URL`
- `CLOUD_STORAGE_BUCKET`
- `MIXPANEL_TOKEN`

### Frontend (`frontend/.env`)
- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID`
- `EXPO_PUBLIC_APPLE_CLIENT_ID`
- `EXPO_PUBLIC_API_URL`

---

## Scripts

### Backend
- `npm run dev` — Start backend in development mode
- `npm run build` — Build TypeScript
- `npm start` — Start backend from build

### Frontend
- `npm start` — Start Expo app
- `npm run android` — Run on Android emulator/device
- `npm run ios` — Run on iOS simulator/device
- `npm run web` — Run as web app

---

## Usage Examples

### Frontend User Flow
- **Onboarding:** New users are guided through onboarding to set preferences and spiritual path.
- **Authentication:** Sign up or sign in with email/password, Google, or Apple.
- **Home:** Select your mood, receive a personalized Bible verse, and access quick actions (meditation, prayer, journal).
- **Meditation:** Start a guided meditation session tailored to your mood.
- **Community:** Connect with others (feature coming soon).
- **Library:** Browse Christian resources (feature coming soon).
- **Profile:** Manage your account and track your spiritual journey (feature coming soon).

### Example: Authentication (Frontend)
```tsx
import { useAuth } from '../contexts/AuthContext';

const { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithApple } = useAuth();

// Sign in
await signInWithEmail('user@example.com', 'password123');

// Sign up
await signUpWithEmail('user@example.com', 'password123', 'Your Name');
```

### Example: Fetch Daily Content (Frontend)
```ts
fetch(`${process.env.EXPO_PUBLIC_API_URL}/daily`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer <FIREBASE_ID_TOKEN>`
  },
  body: JSON.stringify({ mood: 'anxious', secondaryEmotions: ['overwhelmed'] })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## API Documentation

All endpoints require authentication via Firebase ID token in the `Authorization` header.

### POST `/daily`
Generate a complete daily content package (verse, meditation, prayer, reflection, action step).
- **Request Body:**
  ```json
  {
    "mood": "anxious",
    "secondaryEmotions": ["overwhelmed"]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "userId_2024-07-05",
      "userId": "userId",
      "date": "2024-07-05T00:00:00.000Z",
      "mood": { "primaryMood": "anxious", "secondaryEmotions": ["overwhelmed"], "timestamp": "2024-07-05T00:00:00.000Z" },
      "verse": { "verse": "For I know the plans...", "reference": "Jeremiah 29:11", "explanation": "This verse reminds..." },
      "meditation": { "title": "Finding Peace...", "script": "Begin by...", "breathingPattern": "4-7-8" },
      "prayer": { "title": "Prayer for Peace", "prayer": "Dear Heavenly Father...", "category": "comfort" },
      "reflection": { "id": "reflection_123456", "prompt": "How does this verse...", "response": null },
      "actionStep": { "title": "Take a moment...", "description": "Spend 5 minutes...", "category": "self-care" },
      "createdAt": "2024-07-05T00:00:00.000Z",
      "updatedAt": "2024-07-05T00:00:00.000Z"
    }
  }
  ```

### GET `/daily?date=YYYY-MM-DD`
Get daily content for a specific date.
- **Response:**
  ```json
  {
    "success": true,
    "data": { /* same as above */ }
  }
  ```

### POST `/meditation`
Generate a meditation script for a given mood and duration.
- **Request Body:**
  ```json
  {
    "mood": "peaceful",
    "duration": 5
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "title": "Finding Peace in God's Presence",
      "script": "Begin by finding a comfortable position...",
      "breathingPattern": "4-7-8"
    }
  }
  ```

### POST `/prayer`
Generate a prayer for a given mood (and optional context).
- **Request Body:**
  ```json
  {
    "mood": "grateful",
    "context": "family"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "title": "Prayer of Gratitude",
      "prayer": "Heavenly Father, thank you for...",
      "category": "gratitude"
    }
  }
  ```

---

## Data Structures

See `frontend/src/types/index.ts` for all TypeScript types used for users, content, and API responses.

---

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## License
This project is licensed under the ISC License.
