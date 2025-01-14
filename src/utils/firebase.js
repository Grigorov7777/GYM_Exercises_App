// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNGO9Ftlni2h5yg2V2dzBwSdd8xYNValY",
  authDomain: "gymexercise-100b2.firebaseapp.com",
  projectId: "gymexercise-100b2",
  storageBucket: "gymexercise-100b2.firebasestorage.app",
  messagingSenderId: "996881379943",
  appId: "1:996881379943:web:6434f0f0eec06133115ac2",
  measurementId: "G-D9DN2G0KDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Analytics
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app); // Initialize Firestore

// Export auth and db to be used in other parts of the app
export { auth, analytics, db };
