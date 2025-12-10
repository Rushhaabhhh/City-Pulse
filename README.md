# City Pulse - Complete Production Setup Guide

> A modern React Native news aggregation app with real-time emergency alerts and smart city features.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Configuration](#configuration)

## 🎯 Project Overview

**City Pulse** is a feature-rich React Native application that delivers:
- 🌍 City-based news filtering
- 📰 Real-time news feed with WebView integration
- 🔖 Persistent bookmark system
- 🚨 Emergency alerts framework
- 🔄 Pull-to-refresh functionality
- 📱 Responsive design
- ⚡ TypeScript type safety

**Tech Stack:**
- React Native + Expo
- TypeScript
- AsyncStorage for persistence
- React Navigation
- Axios for API calls
- NewsAPI integration

## 🚀 Quick Start (5 Minutes)

### 1. Prerequisites
```bash
node --version
npm --version

# Install Expo CLI globally
npm install -g expo-cli
```

### 2. Clone & Setup
```bash
npx create-expo-app city-pulse
cd city-pulse
# Install dependencies
```

Configure Environment
```bash
cp .env.example .env
#Edit .env and add your NewsAPI key
```

### 4. Run
```bash
npx expo start

# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Press 'w' for web
```

## 5. Project Structure

```
city-pulse/
├── App.tsx                              # Main entry point
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript config
├── babel.config.js                      # Babel config
├── app.json                             # Expo config
├── .env                                 # Environment variables
│
├── src/
│   ├── config/
│   │   ├── api.ts                       # Axios client with interceptors
│   │   ├── constants.ts                 # App-wide constants
│   │   └── storage.ts                   # (reference only)
│   │
│   ├── services/
│   │   ├── newsService.ts               # NewsAPI client
│   │   └── storageService.ts            # AsyncStorage wrapper
│   │
│   ├── context/
│   │   └── BookmarkContext.tsx          # Global bookmark state
│   │
│   ├── types/
│   │   └── index.ts                     # TypeScript interfaces
│   │
│   ├── screens/
│   │   ├── CitySelectionScreen.tsx      # City picker (initial)
│   │   ├── NewsFeedScreen.tsx           # Main feed with search
│   │   ├── NewsWebViewScreen.tsx        # Article viewer
│   │   ├── BookmarksScreen.tsx          # Saved articles
│   │   └── EmergencyAlertsScreen.tsx    # Alert feed
│   │
│   ├── components/
│   │   ├── NewsCard.tsx                 # Article card
│   │   ├── AlertCard.tsx                # Emergency alert card
│   │   ├── LoadingSpinner.tsx           # Loading indicator
│   │   ├── EmptyState.tsx               # Empty list state
│   │   └── ErrorBoundary.tsx            # (optional)
│   │
│   ├── navigation/
│   │   └── RootNavigator.tsx            # Tab + Stack navigation
│   │
│   └── utils/
│       ├── themes.ts                    # Color system
│       └── helpers.ts                   # Utility functions
│
└── assets/                              # Icons, images, etc.
```

## Architecture

### State Management
- **Context API** for bookmarks (lightweight, no Redux)
- **useState/useReducer** for local screen state
- **AsyncStorage** for persistence

### Data Flow
```
API (NewsAPI)
    ↓
newsService (Axios client)
    ↓
Screen Components (useState)
    ↓
UI (FlatList rendering)
    ↓
User Interactions (AsyncStorage)
```

### Navigation Structure
```
RootNavigator
├── CitySelectionScreen (initial)
└── MainApp (TabNavigator)
    ├── News Stack
    │   ├── NewsFeedScreen
    │   └── NewsWebViewScreen
    ├── Bookmarks Stack
    │   ├── BookmarksScreen
    │   └── NewsWebViewScreen
    └── Alerts Stack
        └── EmergencyAlertsScreen
```

## Key Features

### 1. City Selection
- Pre-configured 10 major cities
- Persistent selection in AsyncStorage
- Quick toggle between cities

### 2. News Feed
- Real-time articles from NewsAPI
- Pagination (20 articles per page)
- Search functionality (client-side)
- Pull-to-refresh
- Loading states and error handling

### 3. Bookmarking
- Add/remove articles instantly
- Persistent storage with AsyncStorage
- Deduplicated by URL
- Visual bookmark indicator

### 4. Emergency Alerts
- Mock data (ready for API integration)
- Severity-based color coding
- Type-based emojis
- Time formatting

### 5. Article Viewing
- WebView for original article content
- Share functionality
- Bookmark toggle
- Back navigation

## Configuration

### API Setup
1. Go to [newsapi.org](https://newsapi.org) or [GNews API](https://gnews.io)
2. Sign up
3. Copy API key
4. Add to `.env`:
   ```
   EXPO_PUBLIC_NEWS_API_KEY=your_key_here
   ```
