# Quick Build Checklist - LaundrMart APK

Use this checklist before every release build to ensure the APK works correctly.

## Pre-Build Checklist

### 1. Version Update
- [ ] Update `versionCode` in `android/app/build.gradle` (line 95)
- [ ] Update `versionName` in `android/app/build.gradle` (line 96)
- [ ] Update `version` in `app.json` to match

### 2. Keystore Configuration
- [ ] Verify `laundrmart-release-key.keystore` exists in project root
- [ ] Verify `android/gradle.properties` has correct keystore credentials:
  - [ ] `MYAPP_RELEASE_STORE_PASSWORD` is set
  - [ ] `MYAPP_RELEASE_KEY_ALIAS` is set
  - [ ] `MYAPP_RELEASE_KEY_PASSWORD` is set

### 3. Critical Files Verification
- [ ] `MainActivity.kt` line 23: `super.onCreate(savedInstanceState)` (NOT null)
- [ ] `android/app/build.gradle` line 121: `signingConfig signingConfigs.release` (NOT debug)
- [ ] `AndroidManifest.xml` has all required permissions
- [ ] `proguard-rules.pro` has all required rules

## Build Commands

```bash
# 1. Navigate to project root
cd C:\App\Client_Project\LaundrMart

# 2. Clean previous builds
cd android
.\gradlew.bat clean

# 3. Build release APK
.\gradlew.bat assembleRelease

# 4. APK location
# android/app/build/outputs/apk/release/app-release.apk
```

## Post-Build Testing

### Installation Test
- [ ] Transfer APK to Android device
- [ ] Install APK (enable "Install from Unknown Sources" if needed)
- [ ] App installs successfully

### Functionality Test
- [ ] App launches without crashing
- [ ] Splash screen displays
- [ ] Navigation works (tabs, back button)
- [ ] Location permissions requested (if needed)
- [ ] Maps/Google Places work (if used)
- [ ] Images load correctly
- [ ] No immediate crashes

### Log Check (If Issues)
```bash
adb logcat | grep -i "error\|exception\|crash"
```

## Files to Update Manually

| File | Location | What to Change |
|-----|----------|----------------|
| `android/gradle.properties` | Lines 70-72 | Keystore passwords (first time only) |
| `android/app/build.gradle` | Lines 95-96 | Version code/name (each release) |
| `app.json` | `version` field | Version number (each release) |

## Common Issues Quick Fix

| Issue | Quick Fix |
|-------|-----------|
| App crashes on launch | Check `MainActivity.kt` line 23 |
| Build fails: wrong password | Update `gradle.properties` passwords |
| Build fails: keystore not found | Verify keystore path in `gradle.properties` |
| APK installs but crashes | Check logcat: `adb logcat \| grep -i error` |

## Build Output Location

**APK:** `android/app/build/outputs/apk/release/app-release.apk`

**AAB (for Play Store):** `android/app/build/outputs/bundle/release/app-release.aab`

---

**For detailed instructions, see:** `ANDROID_BUILD_GUIDE.md`

