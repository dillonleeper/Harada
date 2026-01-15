# Firebase Setup for Cross-Device Sync

Your Harada app now supports **automatic cross-device syncing** using Firebase! 🎉

## Quick Setup (5 minutes)

### 1. Create a Free Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "harada-tracker" (or anything you like)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Set Up Firestore Database

1. In your Firebase project, click "Firestore Database" in the left menu
2. Click "Create database"
3. Choose "Start in **test mode**" (we'll secure it next)
4. Select a Cloud Firestore location close to you
5. Click "Enable"

### 3. Set Up Security Rules

1. Go to the "Rules" tab in Firestore
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

### 4. Enable Authentication

1. Click "Authentication" in the left menu
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable **"Email/Password"** - toggle it ON
5. Also enable **"Anonymous"** (for fallback)
6. Click "Save"

### 5. Get Your Firebase Config

1. Click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>`
5. Register your app with nickname "Harada Web App"
6. Copy the `firebaseConfig` object

### 6. Update Your index.html

1. Open `index.html`
2. Find the `firebaseConfig` section (around line 2123)
3. Replace the placeholder values with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## How It Works

✅ **Email/Password Auth**: Sign in with the same account on any device
✅ **Automatic Sync**: Any changes you make instantly sync to the cloud
✅ **Real-time Updates**: Changes on one device appear on other devices immediately
✅ **Offline Support**: Works offline and syncs when you're back online
✅ **Anonymous Option**: Can use without account (data stays on one browser)
✅ **LocalStorage Backup**: Data is saved locally AND in the cloud

## What Gets Synced

- ✅ Today's completed tasks
- ✅ All-time statistics
- ✅ Daily history
- ✅ Streaks
- ✅ Badges
- ✅ Settings
- ✅ Pillar streaks
- ✅ Goal metrics

## Using On Multiple Devices

Once you've set up Firebase:

### Easy Way: Sign In with Email

1. Click the 👤 (Account) button in the app
2. Create an account with your email and password
3. Sign in with the same email on all your devices
4. Your data syncs automatically across all devices! ✨

### Without Account (Anonymous)

- Click "Continue without account"
- Each browser gets a unique anonymous ID
- Data only syncs on that specific browser/device

**Recommendation**: Use email/password to sync across all devices easily!

## Advanced: Sharing Data Across Browsers

**New!** This is now super easy:

1. Click the 👤 (Account) button
2. Sign in with your email on any device
3. All your data syncs automatically!

No need for complicated workarounds anymore! 🎉

## Troubleshooting

**"Firebase not ready"**: Check your firebaseConfig values are correct

**Data not syncing**: 
- Check browser console for errors
- Verify Firestore rules are set up correctly
- Make sure you're online

**Starting fresh**:
- Clear localStorage in browser dev tools
- Data will reload from Firebase on next page load

## Free Tier Limits

Firebase's free "Spark" plan includes:
- ✅ 1GB storage
- ✅ 50K reads/day
- ✅ 20K writes/day
- ✅ 20K deletes/day

This is **more than enough** for personal use! 🎉

---

Need help? The Firebase setup is already coded - you just need to add your config!
