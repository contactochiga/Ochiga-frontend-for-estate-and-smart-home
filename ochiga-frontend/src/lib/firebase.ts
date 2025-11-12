import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA6S8bITcmIteHZtQqT2ymprpvDWnyLDKU",
  authDomain: "ochiga-estate-and-smart-home.firebaseapp.com",
  projectId: "ochiga-estate-and-smart-home",
  storageBucket: "ochiga-estate-and-smart-home.firebasestorage.app",
  messagingSenderId: "75170521813",
  appId: "1:75170521813:web:1e61a95961a923c83cf85c",
  measurementId: "G-XL1GME509P",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Analytics (browser only)
let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, analytics };
