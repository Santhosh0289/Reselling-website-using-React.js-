import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";  // Added RecaptchaVerifier if using phone login
import { getAnalytics } from "firebase/analytics";  // Optional: For Firebase Analytics
import { getPerformance } from "firebase/performance";  // Optional: For Firebase Performance Monitoring

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

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const analytics = getAnalytics(app);  
export const performance = getPerformance(app); 


export const recaptchaVerifier = RecaptchaVerifier;


