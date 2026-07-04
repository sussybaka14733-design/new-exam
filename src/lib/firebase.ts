import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase project config. This is a public client identifier (not a
// secret) — access is controlled by the rules in firestore.rules, which
// restrict every read/write to the signed-in owner of that data.
const firebaseConfig = {
  apiKey: "AIzaSyBD1jmskPlsCYEXZYpgLyZqW_m_umEsA4Y",
  authDomain: "manifest-button-gdw25.firebaseapp.com",
  projectId: "manifest-button-gdw25",
  storageBucket: "manifest-button-gdw25.firebasestorage.app",
  messagingSenderId: "330790494649",
  appId: "1:330790494649:web:aa7d2b57bfb06985eb5668"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, "ai-studio-3189dffc-71bd-4100-b57c-c363d52e9acc");

export { app, auth, db };
