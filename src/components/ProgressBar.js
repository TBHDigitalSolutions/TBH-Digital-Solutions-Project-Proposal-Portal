// src/components/ProgressBar.js
import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ step, maxSteps }) => {
  const progressPercentage = (step / maxSteps) * 100;

  return (
    <div className="w-full bg-light-grey dark:bg-gray-800 h-4 rounded-full shadow-inner overflow-hidden">
      <div
        className="bg-logo-blue h-full rounded-full transition-all duration-300 ease-in-out shadow-lg"
        style={{ width: `${progressPercentage}%` }}
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin="0"
        aria-valuemax={maxSteps}
        aria-label={`Progress: Step ${step} of ${maxSteps}`}
      >
        {/* Optional: Step number indicator */}
        <span className="block text-center text-xs font-semibold text-white">{step} / {maxSteps}</span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
  maxSteps: PropTypes.number.isRequired,
};

export default ProgressBar;
