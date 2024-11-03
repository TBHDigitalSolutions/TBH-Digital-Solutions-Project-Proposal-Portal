// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwgfo-ccADpJJO-KcL761AxmToEuxskNk",
  authDomain: "tbh-project-proposal-portal.firebaseapp.com",
  projectId: "tbh-project-proposal-portal",
  storageBucket: "tbh-project-proposal-portal.firebasestorage.app",
  messagingSenderId: "632936397077",
  appId: "1:632936397077:web:0b60e234fbca1855cc511c",
  measurementId: "G-CX3LJQ3W2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const analytics = getAnalytics(app);

export { db, serverTimestamp, collection, addDoc, doc, updateDoc };