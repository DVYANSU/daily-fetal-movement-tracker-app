# Daily Fetal Movement Tracker (Expo / React Native)

Two-screen offline tracker:
- **Home** shows saved sessions
- **Counter** records a session locally (timer + 10 kicks)
- **Info** modal explains how to count fetal kicks

## How to run

```bash
npm install
npx expo start
```
Libraries used
- expo-router
- @react-native-async-storage/async-storage
- react-native-safe-area-context
- react-native-svg
- @expo/vector-icons (Ionicons)
- expo-linear-gradient

Data structure
- Stored in AsyncStorage under key dfm_sessions_v1 as JSON array.

Assumptions
- Save is allowed only when user reaches 10 kicks
- Timer starts at 00:00 and begins on first kick press
- Home shows time taken as MM:SS (derived from durationSec)
- No backend; everything persists locally using AsyncStorage
- Info steps match the provided Figma text