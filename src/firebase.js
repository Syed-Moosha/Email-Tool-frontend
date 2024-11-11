// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "project1-c9c86.firebaseapp.com",
  projectId: "project1-c9c86",
  storageBucket: "project1-c9c86.firebasestorage.app",
  messagingSenderId: "125673954394",
  appId: "1:125673954394:web:5738b121e57553ad03cc63"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);