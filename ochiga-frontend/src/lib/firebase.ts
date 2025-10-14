// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// ✅ Your Firebase web app configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6S8bITcmIteHZtQqT2ymprpvDWnyLDKU",
  authDomain: "ochiga-estate-and-smart-home.firebaseapp.com",
  projectId: "ochiga-estate-and-smart-home",
  storageBucket: "ochiga-estate-and-smart-home.firebasestorage.app",
  messagingSenderId: "75170521813",
  appId: "1:75170521813:web:1e61a95961a923c83cf85c",
  measurementId: "G-XL1GME509P",
};

// ✅ Avoid re-initializing Firebase if it's already been done
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Analytics only if supported (browser)
let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, analytics };
