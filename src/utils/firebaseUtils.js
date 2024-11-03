// src/utils/firebaseUtils.js

import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure correct import of your Firebase config

/**
 * Function to track user actions in Firestore.
 * @param {string} userId - The ID of the user (could be their email or UID).
 * @param {string} action - The action taken by the user (e.g., "Clicked Next", "Clicked Previous").
 */
export const trackUserAction = async (userId, action) => {
  try {
    // Reference the document for the specific user in the 'logins' collection
    const userDocRef = doc(db, 'logins', userId);

    // Fetch the existing document for the user
    const userDocSnapshot = await getDoc(userDocRef);

    // If the document doesn't exist, initialize it with the action array
    if (!userDocSnapshot.exists()) {
      await setDoc(userDocRef, {
        actions: [
          {
            action: action,
            timestamp: new Date(),
          },
        ],
      });
      console.log(`User document created and action logged: ${action} for user: ${userId}`);
    } else {
      // Update the document by appending the new action using arrayUnion
      await updateDoc(userDocRef, {
        actions: arrayUnion({
          action: action,
          timestamp: new Date(),
        }),
      });
      console.log(`Action logged: ${action} for user: ${userId}`);
    }
  } catch (error) {
    console.error('Error logging user action: ', error);
  }
};
