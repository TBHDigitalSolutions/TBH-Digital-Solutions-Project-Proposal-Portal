// src/components/Navigation.js

import React from 'react';
import { logEvent } from './firebaseLogging'; // Firebase logging utility
import { trackUserAction } from '../utils/firebaseUtils';
import { useUser } from '../UserContext'; // User context to access userId

const Navigation = ({ step, setStep, maxSteps }) => {
  // Get the userId from context
  const { userId } = useUser();

  // Handle Next button click
  const handleNext = async () => {
    if (step < maxSteps) {
      const nextStep = step + 1;

      // Log the action in Firebase Analytics
      logEvent('navigate_step', { userId, direction: 'next', newStep: nextStep });

      // Track the action in Firestore
      await trackUserAction(userId, `Navigated to Step ${nextStep}`);

      // Update the step state
      setStep(nextStep);
    }
  };

  // Handle Previous button click
  const handlePrevious = async () => {
    if (step > 1) {
      const previousStep = step - 1;

      // Log the action in Firebase Analytics
      logEvent('navigate_step', { userId, direction: 'previous', newStep: previousStep });

      // Track the action in Firestore
      await trackUserAction(userId, `Navigated to Step ${previousStep}`);

      // Update the step state
      setStep(previousStep);
    }
  };

  return (
    <div className="relative flex justify-between w-full">
      {/* Previous Button - Anchored to the Bottom Left */}
      <button
        onClick={handlePrevious}
        disabled={step === 1}
        className={`absolute left-4 bottom-4 text-lg font-aldrich px-10 py-4 rounded-lg shadow-lg transition duration-200 ease-in-out
          ${step === 1
            ? 'bg-gray-400 text-gray-400 cursor-not-allowed'
            : 'bg-logo-blue text-soft-black hover:bg-darker-blue hover:text-white'}`}
        aria-label="Go to the previous step"
      >
        &#8592; Previous
      </button>

      {/* Next Button - Anchored to the Bottom Right */}
      <button
        onClick={handleNext}
        disabled={step === maxSteps}
        className={`absolute right-4 bottom-4 text-lg font-aldrich px-10 py-4 rounded-lg shadow-lg transition duration-200 ease-in-out
          ${step === maxSteps
            ? 'bg-gray-400 text-gray-400 cursor-not-allowed'
            : 'bg-logo-blue text-soft-black hover:bg-darker-blue hover:text-white'}`}
        aria-label="Go to the next step"
      >
        Next &#8594;
      </button>
    </div>
  );
};

export default Navigation;
