# EcoCollect - Expo Mobile App

This is a mobile-native application built with **React Native and the Expo Managed Workflow**. It contains NO web/HTML/CSS code and is designed to run on Android and iOS devices via the Expo Go app.

This project provides a seamless, high-performance user experience for waste collection and recycling, built on a modern, easy-to-maintain foundation.

### Why this stack?

- **React Native & Expo**: For building a cross-platform mobile application with a single TypeScript codebase while leveraging the simplified build process and development workflow of Expo.
- **React Navigation**: The community standard for navigation, providing a native look and feel for stack and tab-based routing on both Android and iOS.
- **React Native Maps**: For true native map components, offering the best performance and device integration compared to web-based map solutions.
- **Component-Based Design System**: To create a consistent, maintainable, and performant UI that adheres to mobile design principles.

---

## 1. Installation

First, ensure you have Node.js and the Expo CLI installed. It is also highly recommended to install the **Expo Go** app on your physical Android or iOS device for the best testing experience.

```bash
# Install Expo CLI globally
npm install -g expo-cli
```

Then, install the project dependencies:

```bash
npm install
# or
yarn install
```

---

## 2. Configuration

### Google Maps API Key (Optional for basic use)

This project uses `react-native-maps`. For basic map display in development, an API key might not be required. However, for production builds and to enable all map features (like directions), you must obtain an API key.

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project or select an existing one.
3.  Enable the **Maps SDK for Android** and **Maps SDK for iOS**.
4.  Go to "Credentials," create a new API key, and restrict it to your app's bundle ID (Android) and bundle identifier (iOS).

#### App Configuration

To add the API keys to your Expo project, you will need to configure `app.json` (or `app.config.js`):

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_ANDROID_GOOGLE_MAPS_API_KEY"
        }
      }
    },
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_IOS_GOOGLE_MAPS_API_KEY"
      }
    }
  }
}
```

**Note**: After adding API keys, you may need a custom development build. See the [Expo Docs](https://docs.expo.dev/guides/setup-native-project/) for more info.

---

## 3. Running the Application

This project is designed to run with the Expo Go app.

### Start the Development Server

```bash
npm start
# or
yarn start
```

This will start the Expo development server and display a QR code in your terminal.

### Run on Android Device/Emulator

1.  Ensure you have the **Expo Go** app installed on your Android device or emulator.
2.  Scan the QR code from the terminal using the Expo Go app.

### Run on iOS Device/Simulator

1.  Ensure you have the **Expo Go** app installed on your iOS device.
2.  Scan the QR code from the terminal using your device's Camera app.
3.  To run on a simulator, press `i` in the terminal after starting the server.

---

## 4. Scripts

- `npm start`: Starts the Expo development server.
- `npm run android`: Starts the server and attempts to launch the app on a connected Android device/emulator.
- `npm run ios`: Starts the server and attempts to launch the app on an iOS simulator.
