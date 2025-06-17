// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF29KVzEC9uTx-pJWGgTRsb60M0vhsN9I",
  authDomain: "yousell-nextjs.firebaseapp.com",
  projectId: "yousell-nextjs",
  storageBucket: "yousell-nextjs.firebasestorage.app",
  messagingSenderId: "1036564649984",
  appId: "1:1036564649984:web:808aca357c3ab7d2dfa0e5",
  measurementId: "G-HBJP4NPCDF"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
