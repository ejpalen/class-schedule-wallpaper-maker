import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  authDomain: "class-schedule-wallpaper-maker.firebaseapp.com",
  projectId: "class-schedule-wallpaper-maker",
  storageBucket: "class-schedule-wallpaper-maker.appspot.com",
  measurementId: "G-3YCZEY0RKX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
