# Android APK Build Guide - LaundrMart

This guide provides step-by-step instructions for building a release APK that can be installed on any Android device without crashing.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Keystore Configuration](#keystore-configuration)
4. [Build Configuration Files](#build-configuration-files)
5. [Building the APK](#building-the-apk)
6. [Testing the APK](#testing-the-apk)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before building, ensure you have:

- ✅ Node.js installed (v18 or higher)
- ✅ Java JDK 17 or higher installed
- ✅ Android Studio with Android SDK installed
- ✅ Environment variables set:
  - `ANDROID_HOME` or `ANDROID_SDK_ROOT` pointing to your Android SDK
  - `JAVA_HOME` pointing to your JDK installation
- ✅ All npm dependencies installed: `npm install`

---

## Initial Setup

### 1. Install Dependencies

```bash
# Navigate to project root
cd C:\App\Client_Project\LaundrMart

# Install npm dependencies
npm install
```

### 2. Verify Project Structure

Ensure these files exist:
- ✅ `android/app/src/main/java/com/bodruddozaredoy/LaundrMart/MainActivity.kt`
- ✅ `android/app/src/main/java/com/bodruddozaredoy/LaundrMart/MainApplication.kt`
- ✅ `android/app/build.gradle`
- ✅ `android/gradle.properties`
- ✅ `laundrmart-release-key.keystore` (in project root)

---

## Keystore Configuration

### Option A: Using Existing Keystore (Current Setup)

Your keystore is already configured. The file `laundrmart-release-key.keystore` is in the project root.

**File to Update:** `android/gradle.properties`

Update these lines (around line 69-72):

```properties
MYAPP_RELEASE_STORE_FILE=../../laundrmart-release-key.keystore
MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
MYAPP_RELEASE_KEY_ALIAS=your_key_alias
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

**⚠️ Important:** 
- Replace `your_keystore_password` with your actual keystore password
- Replace `your_key_alias` with your key alias (e.g., "laundrmart")
- Replace `your_key_password` with your key password (may be same as keystore password)

### Option B: Creating a New Keystore (If Needed)

If you need to create a new keystore:

```bash
# Navigate to project root
cd C:\App\Client_Project\LaundrMart

# Create keystore (replace values as needed)
keytool -genkeypair -v -storetype PKCS12 -keystore laundrmart-release-key.keystore -alias laundrmart -keyalg RSA -keysize 2048 -validity 10000

# You'll be prompted for:
# - Keystore password (remember this!)
# - Key password (can be same as keystore password)
# - Your name, organization, etc.
```

**⚠️ CRITICAL:** 
- **BACKUP YOUR KEYSTORE FILE** - If you lose it, you cannot update your app on Google Play Store
- Store the password securely - you'll need it for every build
- Never commit the keystore file or passwords to version control

---

## Build Configuration Files

### Files That Should Already Be Configured (Verify These)

#### 1. `android/app/src/main/java/com/bodruddozaredoy/LaundrMart/MainActivity.kt`

**Critical Fix:** Ensure line 23 has:
```kotlin
super.onCreate(savedInstanceState)  // NOT super.onCreate(null)
```

**Status:** ✅ Already fixed

#### 2. `android/app/src/main/AndroidManifest.xml`

**Verify these permissions exist:**
```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.VIBRATE"/>
```

**Status:** ✅ Already configured

#### 3. `android/app/proguard-rules.pro`

**Verify it contains ProGuard rules for:**
- Expo modules
- React Native core
- Google Maps
- AsyncStorage
- React Native Gesture Handler
- React Native Screens

**Status:** ✅ Already configured

#### 4. `android/app/build.gradle`

**Verify these sections:**

**a) Signing Configs (around line 100-114):**
```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
```

**b) Release Build Type (around line 120-126):**
```gradle
release {
    signingConfig signingConfigs.release  // NOT signingConfigs.debug
    def enableShrinkResources = findProperty('android.enableShrinkResourcesInReleaseBuilds') ?: 'false'
    shrinkResources enableShrinkResources.toBoolean()
    minifyEnabled enableMinifyInReleaseBuilds
    proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    def enablePngCrunchInRelease = findProperty('android.enablePngCrunchInReleaseBuilds') ?: 'true'
    crunchPngs enablePngCrunchInRelease.toBoolean()
}
```

**Status:** ✅ Already configured

#### 5. `android/gradle.properties`

**Verify these properties exist (around line 67-72):**
```properties
# Release keystore configuration
MYAPP_RELEASE_STORE_FILE=../../laundrmart-release-key.keystore
MYAPP_RELEASE_STORE_PASSWORD=your_actual_password
MYAPP_RELEASE_KEY_ALIAS=your_actual_alias
MYAPP_RELEASE_KEY_PASSWORD=your_actual_password
```

**⚠️ Manual Action Required:** Update the password and alias values with your actual keystore credentials.

**Status:** ⚠️ You need to update passwords manually

---

## Building the APK

### Step-by-Step Build Process

#### Step 1: Clean Previous Builds

```bash
# Navigate to android directory
cd android

# Clean build artifacts
./gradlew clean

# Or on Windows PowerShell:
.\gradlew.bat clean
```

#### Step 2: Verify Configuration

Before building, double-check:
- ✅ Keystore file exists: `laundrmart-release-key.keystore` in project root
- ✅ `android/gradle.properties` has correct keystore credentials
- ✅ `MainActivity.kt` has `super.onCreate(savedInstanceState)` (not null)

#### Step 3: Build Release APK

**Option A: Using Gradle (Recommended)**

```bash
# From android directory
cd android
./gradlew assembleRelease

# Or on Windows:
.\gradlew.bat assembleRelease
```

**Option B: Using Expo CLI**

```bash
# From project root
npx expo run:android --variant release
```

#### Step 4: Locate the APK

After successful build, find your APK at:

```
android/app/build/outputs/apk/release/app-release.apk
```

**File size:** Typically 30-80 MB depending on assets and dependencies.

---

## Testing the APK

### Before Distribution Testing

#### 1. Install on Physical Device

```bash
# Connect device via USB with USB debugging enabled
# Then install:
adb install android/app/build/outputs/apk/release/app-release.apk

# Or transfer APK to device and install manually
```

#### 2. Test Checklist

After installation, verify:

- ✅ App launches without crashing
- ✅ Splash screen displays correctly
- ✅ Navigation works (tabs, screens)
- ✅ Location permissions requested (if needed)
- ✅ Maps/Google Places work (if used)
- ✅ Images load correctly
- ✅ No console errors in logcat

#### 3. Check Logs (If Issues Occur)

```bash
# View device logs
adb logcat | grep -i "react\|expo\|laundrmart"

# Or filter for errors only
adb logcat *:E
```

### Common Issues and Fixes

#### Issue: App crashes immediately on launch

**Possible Causes:**
1. ❌ `MainActivity.kt` has `super.onCreate(null)` instead of `super.onCreate(savedInstanceState)`
   - **Fix:** Verify line 23 in `MainActivity.kt`

2. ❌ Missing ProGuard rules
   - **Fix:** Check `android/app/proguard-rules.pro` has all required rules

3. ❌ Incorrect keystore configuration
   - **Fix:** Verify `android/gradle.properties` has correct credentials

#### Issue: Build fails with "keystore not found"

**Fix:**
- Verify keystore path in `android/gradle.properties`:
  - Should be: `MYAPP_RELEASE_STORE_FILE=../../laundrmart-release-key.keystore`
  - Keystore file must be in project root directory

#### Issue: Build fails with "wrong password"

**Fix:**
- Update `MYAPP_RELEASE_STORE_PASSWORD` and `MYAPP_RELEASE_KEY_PASSWORD` in `android/gradle.properties`
- Ensure no extra spaces or quotes around the password

#### Issue: App works in debug but crashes in release

**Possible Causes:**
1. ProGuard removing required classes
   - **Fix:** Add missing ProGuard rules to `android/app/proguard-rules.pro`

2. Missing permissions
   - **Fix:** Check `AndroidManifest.xml` has all required permissions

3. Native module issues
   - **Fix:** Ensure all native modules are properly linked

---

## Complete Build Sequence Summary

### Quick Reference Checklist

**Before Every Build:**

1. ✅ Update version code/name in `android/app/build.gradle` (if needed):
   ```gradle
   versionCode 2  // Increment for each release
   versionName "1.0.1"  // Update version
   ```

2. ✅ Verify keystore credentials in `android/gradle.properties`

3. ✅ Clean previous builds: `cd android && ./gradlew clean`

4. ✅ Build APK: `./gradlew assembleRelease`

5. ✅ Test APK on device before distribution

### Files You Need to Manually Update

| File | What to Update | When |
|-----|---------------|------|
| `android/gradle.properties` | Keystore passwords (lines 70-72) | First time setup, or if password changes |
| `android/app/build.gradle` | `versionCode` and `versionName` (lines 95-96) | Before each new release |
| `app.json` | `version` field | Before each new release |

### Files That Should NOT Be Changed (Already Configured)

- ✅ `android/app/src/main/java/.../MainActivity.kt` - Already fixed
- ✅ `android/app/src/main/AndroidManifest.xml` - Already configured
- ✅ `android/app/proguard-rules.pro` - Already configured
- ✅ `android/app/build.gradle` - Signing config already set up

---

## Distribution

### For Google Play Store

1. Build AAB (Android App Bundle) instead of APK:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
   Output: `android/app/build/outputs/bundle/release/app-release.aab`

2. Upload AAB to Google Play Console

### For Direct Distribution (APK)

1. Build APK as described above
2. Share APK file with users
3. Users need to enable "Install from Unknown Sources" on their device

---

## Version Management

### Updating Version for New Release

**File:** `android/app/build.gradle`

Update these lines (around line 95-96):
```gradle
versionCode 2  // Increment by 1 for each release
versionName "1.0.1"  // Update semantic version
```

**Also update:** `app.json` version field to match

---

## Security Notes

⚠️ **IMPORTANT SECURITY PRACTICES:**

1. **Never commit these files to Git:**
   - `laundrmart-release-key.keystore`
   - `android/gradle.properties` (or use environment variables)
   - Add to `.gitignore`:
     ```
     *.keystore
     android/gradle.properties
     ```

2. **Use Environment Variables (Optional, More Secure):**

   Instead of hardcoding in `gradle.properties`, you can use environment variables:
   
   ```gradle
   // In build.gradle
   storePassword System.getenv("KEYSTORE_PASSWORD") ?: ""
   keyPassword System.getenv("KEY_PASSWORD") ?: ""
   ```

3. **Backup Your Keystore:**
   - Store in secure location (password manager, encrypted drive)
   - If lost, you cannot update your app on Play Store

---

## Troubleshooting

### Build Fails: "Execution failed for task ':app:mergeReleaseResources'"

**Solution:**
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

### Build Fails: "SDK location not found"

**Solution:**
Set environment variable:
```bash
# Windows PowerShell
$env:ANDROID_HOME = "C:\Users\YourName\AppData\Local\Android\Sdk"

# Or add to gradle.properties:
android.dir=C\:\\Users\\YourName\\AppData\\Local\\Android\\Sdk
```

### APK Installs But Crashes Immediately

**Check:**
1. Verify `MainActivity.kt` line 23: `super.onCreate(savedInstanceState)`
2. Check logcat: `adb logcat | grep -i error`
3. Verify ProGuard rules are complete
4. Test with debug build first: `./gradlew assembleDebug`

### "INSTALL_PARSE_FAILED_NO_CERTIFICATES" Error

**Solution:**
- APK is not signed properly
- Rebuild with correct keystore configuration
- Verify `signingConfig signingConfigs.release` in build.gradle

---

## Quick Command Reference

```bash
# Navigate to project
cd C:\App\Client_Project\LaundrMart

# Clean build
cd android && ./gradlew clean

# Build release APK
cd android && ./gradlew assembleRelease

# Build release AAB (for Play Store)
cd android && ./gradlew bundleRelease

# Install on connected device
adb install android/app/build/outputs/apk/release/app-release.apk

# View logs
adb logcat | grep -i "react\|expo\|error"

# Check APK info
aapt dump badging android/app/build/outputs/apk/release/app-release.apk
```

---

## Support

If you encounter issues not covered here:

1. Check Android Studio logcat for detailed error messages
2. Verify all configuration files match this guide
3. Ensure all dependencies are up to date: `npm install`
4. Try building debug version first: `./gradlew assembleDebug`

---

**Last Updated:** Based on Expo SDK 54, React Native 0.81.5
**Project:** LaundrMart
**Package:** com.bodruddozaredoy.LaundrMart

