# RealTimeFeed 📱

A real-time feed screen built with React Native + Expo for the Appmosphere dev task.

## ✨ Features

- Scrollable feed of posts (text, image, and video)
- Auto-play/pause videos based on visibility
- Engagement metrics: likes, comments, shares, and views
- View count increments after 2 seconds in view
- Real-time view sync via WebSockets
- Zustand for state management
- Infinite scroll with lazy loading
- Smooth transitions with Reanimated

## 🚀 Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/XKolz/realtime-feed.git
   cd realtime-feed
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Expo server:

   ```bash
   npx expo start
   ```

4. Run the WebSocket backend (optional):
   ```bash
   node realtime-server/index.js
   ```

## 🔧 Tech Stack

- React Native + Expo
- Zustand (state management)
- expo-av (video)
- socket.io-client (real-time)
- axios (API)
- DummyJSON (mock data)

## 📹 Demo

> Optional: Add a video link or Expo snack here
