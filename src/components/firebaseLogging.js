// src/utils/firebaseLogging.js

import { analytics, db } from '../firebase'; // Adjust path if necessary
import { logEvent as firebaseLogEvent } from 'firebase/analytics';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

/**
 * Log a custom event to Firebase Analytics.
 * @param {string} eventName - The name of the event.
 * @param {object} [eventParams={}] - Additional parameters for the event.
 */
export const logEvent = (eventName, eventParams = {}) => {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, eventParams);
    console.log(`Event logged: ${eventName}`, eventParams);
  } else {
    console.warn('Firebase Analytics is not initialized.');
  }
};

/**
 * Log a login event to Firestore.
 * @param {string} email - The email of the user logging in.
 */
export const logLoginEvent = async (email) => {
  try {
    await addDoc(collection(db, 'loginEvents'), {
      email,
      timestamp: serverTimestamp(),
    });
    console.log(`Login event logged for ${email}`);
  } catch (error) {
    console.error('Error logging login event:', error);
  }
};
