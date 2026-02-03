// firebase-setup.js (compat / v8-style)

// Assumes firebase-app-compat.js, firebase-auth-compat.js, firebase-firestore-compat.js
// are already loaded in index.html before this file runs.

(function () {
  if (!window.firebase) {
    console.error("Firebase not found. Make sure compat scripts load before firebase-setup.js");
    return;
  }

  // TODO: If you initialize Firebase in index.html already, DO NOT initialize again here.
  // If you DON'T initialize elsewhere, paste your firebaseConfig + initializeApp here.
  //
  // Example:
  // const firebaseConfig = { ... };
  // firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  async function ensureUserDoc(user) {
    const userRef = db.collection("users").doc(user.uid);

    // Merge keeps existing fields + subcollections safe
    await userRef.set(
      {
        email: user.email || null,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        provider: (user.providerData && user.providerData[0] && user.providerData[0].providerId) || "unknown",
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        // createdAt will be set on first login; merge prevents overwriting other fields
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  // Expose small helpers for your UI buttons (optional)
  window.HaradaAuth = {
    loginWithGoogle: async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      return result.user;
    },
    logout: async () => {
      await auth.signOut();
    },
    onAuth: (cb) => {
      return auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            await ensureUserDoc(user);
          } catch (e) {
            console.error("ensureUserDoc failed:", e);
          }
        }
        cb(user);
      });
    },
  };
})();
