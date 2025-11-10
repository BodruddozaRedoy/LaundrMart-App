# Quick Command Reference - LaundrMart Build

## Most Common Commands

### Build Release APK
```bash
cd android
.\gradlew.bat clean
.\gradlew.bat assembleRelease
```
**Output:** `android/app/build/outputs/apk/release/app-release.apk`

### Build Release AAB (for Google Play Store)
```bash
cd android
.\gradlew.bat clean
.\gradlew.bat bundleRelease
```
**Output:** `android/app/build/outputs/bundle/release/app-release.aab`

### Install APK on Connected Device
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### View App Logs
```bash
# All logs
adb logcat

# Filter for errors only
adb logcat *:E

# Filter for React/Expo
adb logcat | grep -i "react\|expo\|laundrmart"
```

### Check APK Information
```bash
aapt dump badging android/app/build/outputs/apk/release/app-release.apk
```

## File Locations

### Configuration Files
- Keystore: `laundrmart-release-key.keystore` (project root)
- Gradle Properties: `android/gradle.properties`
- Build Config: `android/app/build.gradle`
- ProGuard Rules: `android/app/proguard-rules.pro`
- Manifest: `android/app/src/main/AndroidManifest.xml`

### Build Outputs
- Release APK: `android/app/build/outputs/apk/release/app-release.apk`
- Release AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`

## Version Update Commands

### Update Version in build.gradle
Edit `android/app/build.gradle` lines 95-96:
```gradle
versionCode 2        // Increment by 1
versionName "1.0.1"  // Update version
```

## Troubleshooting Commands

### Clean Everything
```bash
cd android
.\gradlew.bat clean
cd ..
rm -rf node_modules
npm install
```

### Check Java Version
```bash
java -version  # Should be 17 or higher
```

### Check Android SDK
```bash
echo $ANDROID_HOME  # Windows: echo %ANDROID_HOME%
```

### List Connected Devices
```bash
adb devices
```

### Uninstall App from Device
```bash
adb uninstall com.bodruddozaredoy.LaundrMart
```

---

**For detailed instructions, see:** `ANDROID_BUILD_GUIDE.md`
**For quick checklist, see:** `BUILD_CHECKLIST.md`

