// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBUaXuSmlNK67s2H0cgwlZcpE4QZyzQK3Y",
  authDomain: "meiyarivu-4a8d9.firebaseapp.com",
  projectId: "meiyarivu-4a8d9",
  storageBucket: "meiyarivu-4a8d9.firebasestorage.app",
  messagingSenderId: "751462422529",
  appId: "1:751462422529:web:779d0685d4b1e03b3a0800",
  measurementId: "G-4Q1N1VS3YW"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Analytics (optional)
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

// ✅ Auth (REQUIRED)
export const auth = getAuth(app);

// ✅ Google Provider (REQUIRED)
export const googleProvider = new GoogleAuthProvider();