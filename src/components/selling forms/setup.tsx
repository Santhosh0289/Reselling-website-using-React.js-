import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4xD_80Sm5WRZSiSGy9PDYuI2_-ZoqhM0",
  authDomain: "jeevan-5a866.firebaseapp.com",
  projectId: "jeevan-5a866",
  storageBucket: "jeevan-5a866.appspot.com",
  messagingSenderId: "1058764569554",
  appId: "1:1058764569554:web:7b631fe82bc51724daa60b",
  measurementId: "G-9WYE84GCT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

