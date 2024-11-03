// src/components/Slide1/Slide1QuoteTemplate.js
import React from 'react';
import { logEvent } from '../firebaseLogging'; // Import logging function
import { useUser } from '../../UserContext'; // Import user context

const Slide1QuoteTemplate = ({ onStartProposal }) => {
  const { userId } = useUser(); // Retrieve the userId from context

  const handleStartClick = () => {
    logEvent('start_proposal_walkthrough', { slide: 1, userId }); // Log event with userId and slide number
    onStartProposal(); // Proceed to the next slide
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-gradient-to-br from-[#060512] to-[#0E1730] rounded-lg shadow-sm text-off-white p-8 space-y-8">
      {/* Welcome Message */}
      <h2 className="text-4xl font-bold text-center font-sovjet text-off-white shadow-lg" style={{ textShadow: '0px 0px 8px rgba(255, 255, 255, 0.5)' }}>
        Welcome to Your Proposal Overview
      </h2>
      <p className="text-lg text-center max-w-lg font-newsreader text-light-grey">
        Andover Eye Institute, thank you for considering our services. Explore the tailored proposal we've prepared to enhance your digital strategy.
      </p>

      {/* Start Proposal Walkthrough Button */}
      <button 
        onClick={handleStartClick} // Logs and triggers the next slide
        className="bg-logo-blue text-soft-black font-aldrich text-lg px-10 py-4 rounded-lg shadow-lg hover:bg-darker-blue hover:text-white transition duration-200 ease-in-out"
      >
        Start Proposal Walkthrough
      </button>
    </div> 
  );
};

export default Slide1QuoteTemplate;
