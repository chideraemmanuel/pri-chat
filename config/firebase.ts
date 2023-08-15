// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIPFzBl4-fmE3SYtBwiSQZ0EnhfGOypHE",
  authDomain: "prichat-b1888.firebaseapp.com",
  projectId: "prichat-b1888",
  storageBucket: "prichat-b1888.appspot.com",
  messagingSenderId: "42027669705",
  appId: "1:42027669705:web:8e9f288b5b7e4718fcd518",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Storage
export const storage = getStorage(app);
