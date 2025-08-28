# EcoCollect - React Native Mobile App

This is a mobile-native React Native + TypeScript app. It contains NO web/HTML/CSS code. Test it on a physical device or an emulator/simulator.

This project is a mobile-only application for Android and iOS, built to provide a seamless, high-performance user experience for waste collection and recycling.

### Why this stack?

- **React Native & TypeScript**: For building a cross-platform mobile application with a single codebase while ensuring type safety and code quality.
- **React Navigation**: The community standard for navigation, providing a native look and feel for stack and tab-based routing on both Android and iOS.
- **React Native Maps**: For true native map components, offering the best performance and device integration (e.g., gestures, GPS) compared to web-based map solutions.
- **StyleSheet & Design System**: To create a consistent, maintainable, and performant UI that adheres to mobile design principles, avoiding the pitfalls of web-based styling.

---

## 1. Installation

First, ensure you have a React Native development environment set up. Follow the official guide for **React Native CLI Quickstart** (not Expo CLI): [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)

Then, install the project dependencies:

```bash
npm install
# or
yarn install
```

For iOS, you also need to install the Pods:
```bash
npx pod-install
```

---

## 2. Configuration

### Google Maps API Key

This project uses `react-native-maps` with the Google Maps provider. You must obtain an API key and configure it for both Android and iOS.

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project or select an existing one.
3.  Enable the **Maps SDK for Android** and **Maps SDK for iOS**.
4.  Go to "Credentials," create a new API key, and restrict it to your app's bundle ID (Android) and bundle identifier (iOS).

#### Android Setup

Add your API key to `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest ...>
  <application ...>
    ...
    <meta-data
      android:name="com.google.android.geo.API_KEY"
      android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
    ...
  </application>
</manifest>
```

#### iOS Setup

Add your API key to `ios/EcoCollect/AppDelegate.mm` (or `AppDelegate.swift`):

```objc
#import <GoogleMaps/GoogleMaps.h>

...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  [GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY"]; // Add this line
  ...
  return YES;
}
```

---

## 3. Running the Application

### Run on Android Emulator/Device

```bash
npm run android
# or
yarn android
```

### Run on iOS Simulator/Device

```bash
npm run ios
# or
yarn ios
```

---

## 4. Scripts

- `npm start`: Starts the Metro bundler.
- `npm run lint`: Runs the ESLint linter to check for code style issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
- `npm run test`: Runs the Jest test suite.
