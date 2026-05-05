import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDg5AU2INu2e86d2HClif7KULhZ4QFfBPA",
  authDomain: "gotsang2-29a54.firebaseapp.com",
  projectId: "gotsang2-29a54",
  storageBucket: "gotsang2-29a54.firebasestorage.app",
  messagingSenderId: "863417827825",
  appId: "1:863417827825:web:5626eb337d4e925dc34450",
  measurementId: "G-19HXBNZGFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
