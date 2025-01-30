import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDr0XJrMdhP3-fMInYeFQFFDf5f3Hy4EJo",
  authDomain: "wedding-two-c726c.firebaseapp.com",
  projectId: "wedding-two-c726c",
  storageBucket: "wedding-two-c726c.firebasestorage.app",
  messagingSenderId: "767338761868",
  appId: "1:767338761868:web:98a40d3879fd1b6374f5a9",
  measurementId: "G-SW15QJ42GH",
});

export const analytics = getAnalytics(firebaseApp);
