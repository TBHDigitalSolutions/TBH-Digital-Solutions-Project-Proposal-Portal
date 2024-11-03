// src/components/demos/DashBoardExample.js

import React, { useEffect } from 'react';
import { logEvent } from '../../firebaseLogging'; // Import logging function

const DashBoardExample = ({ isOpen, onClose, websiteUrl }) => {
  useEffect(() => {
    if (isOpen) {
      logEvent('view_demo', { demoName: 'Dashboard Example', action: 'open' });
    }
    return () => {
      if (isOpen) {
        logEvent('view_demo', { demoName: 'Dashboard Example', action: 'close' });
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-content w-[700px] h-[500px] bg-white rounded-lg shadow-lg p-4">
      <button
        onClick={() => {
          logEvent('view_demo', { demoName: 'Dashboard Example', action: 'close' });
          onClose();
        }}
        className="close-button text-gray-600 hover:text-gray-800"
      >
        &times;
      </button>
      <iframe
        src={websiteUrl}
        title="Dashboard Example"
        className="w-full h-full rounded-lg"
        onLoad={() => logEvent('view_demo', { demoName: 'Dashboard Example', action: 'iframe_load' })}
      ></iframe>
    </div>
  );
};

export default DashBoardExample;
