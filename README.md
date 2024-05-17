# Musico App Development

## Project Description

Musico is a social network app designed for musicians. It allows users to create profiles, connect with other musicians based on location and musical interests, form groups, create or join events, and upload music clips. The app features a real-time mood analysis tool to suggest matches based on the mood of the music being played. The goal is to facilitate collaboration and networking among musicians.

## Build Instructions

To build the Musico app for both iOS and Android using Expo Application Services (EAS), follow the steps below:

### Prerequisites

Ensure you have the following installed:

- Node.js
- Expo CLI
- EAS CLI
- Xcode (for iOS builds)
- Android Studio (for Android builds)

### Steps to Build the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aleruffo/MusicoReactNative.git
   cd MusicoReactNative
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Login to your Expo account:**

   ```bash
   eas login
   ```

4. **Configure EAS:**

   Make sure you have the `eas.json` configuration file set up in the root of your project. It should contain the build profiles for `development-simulator` and `development`.

   Example `eas.json`:

   ```json
   {
     "build": {
       "development-simulator": {
         "ios": {
           "buildType": "simulator"
         }
       },
       "development": {
         "android": {
           "buildType": "apk"
         },
         "ios": {
           "buildType": "development"
         }
       }
     }
   }
   ```

5. **Build for iOS:**

   To build the app for iOS (simulator), use the following command:

   ```bash
   eas build --profile development-simulator --platform ios --local
   ```

6. **Build for Android:**

   To build the app for Android, use the following command:

   ```bash
   eas build --profile development --platform android --local
   ```

7. **Run the Build:**

   After the build process completes, you will get a link to download the build. For iOS, you can run the app on an iOS simulator. For Android, you can install the APK on an Android device or emulator.

## Additional Notes

- Ensure your development environment is correctly set up for both iOS and Android builds.
- For any issues during the build process, refer to the [EAS Build Documentation](https://docs.expo.dev/build/introduction/).
