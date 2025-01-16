// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN_gTkpLU3g5utCj6n39E8Ky238vOvVFo",
  authDomain: "ken-lab-8f5f1.firebaseapp.com",
  projectId: "ken-lab-8f5f1",
  storageBucket: "ken-lab-8f5f1.firebasestorage.app",
  messagingSenderId: "1069252252540",
  appId: "1:1069252252540:web:122f504084fd3ed53acaf9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
