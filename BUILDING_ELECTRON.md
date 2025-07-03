# How to build your app as a Windows .exe

1. (Optional) Place your app icon as `public/icon.ico` for a custom .exe icon.
2. Run the following command to build and package your app:

    npm run dist

- This will build your Vite app and package it as a Windows .exe using Electron.
- The output .exe and installer will be in the `dist/` and `dist/win-unpacked/` folders.

## Development
- For live reload in development, run:

    npm run dev

This will start Vite and Electron together.

---

# How to build your app as an Android .apk (Capacitor)

1. Make sure your app is built for production:

    npm run build

2. Add/update your web build in the Android project:

    npx cap sync android

3. Open the Android project in Android Studio:

    npx cap open android

4. In Android Studio, let Gradle sync, then use:
   - **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - The generated `.apk` will be in `android/app/build/outputs/apk/`.

**Note:**
- You need Android Studio and the Android SDK installed.
- You can test the APK on an emulator or real device.
- For advanced features (push, camera, etc.), see Capacitor plugins.
