// src/components/common/ButtonComponent.js
import React from 'react';

const ButtonComponent = ({ text = "Click Me", onClick }) => {
  return (
    <div className="flex justify-center items-center py-4">
      <button
        onClick={onClick}
        className="bg-logo-blue text-off-white font-newsreader font-semibold py-2 px-6 rounded-lg shadow-lg 
                   transition-transform duration-200 ease-in-out 
                   hover:bg-darker-blue dark:bg-logo-blue dark:hover:bg-gray-700 
                   focus:outline-none focus:ring-4 focus:ring-logo-blue focus:ring-opacity-50 
                   transform hover:scale-105"
        aria-label={text}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;
