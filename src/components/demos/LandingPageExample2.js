// src/components/demos/LandingPageExample2.js

import React, { useEffect } from 'react';
import { logEvent } from '../../firebaseLogging'; // Import logging function

const LandingPageExample2 = ({ isOpen, onClose, websiteUrl }) => {
  useEffect(() => {
    if (isOpen) {
      logEvent('view_demo', { demoName: 'Landing Page Example 2', action: 'open' });
    }
    return () => {
      if (isOpen) {
        logEvent('view_demo', { demoName: 'Landing Page Example 2', action: 'close' });
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-4xl w-full h-3/4 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            logEvent('view_demo', { demoName: 'Landing Page Example 2', action: 'close' });
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>

        {/* iframe to display example website */}
        <iframe
          src={websiteUrl}
          title="Landing Page Example 2"
          className="w-full h-full border-0 rounded-lg"
          onLoad={() => logEvent('view_demo', { demoName: 'Landing Page Example 2', action: 'iframe_load' })}
        />
      </div>
    </div>
  );
};

export default LandingPageExample2;
