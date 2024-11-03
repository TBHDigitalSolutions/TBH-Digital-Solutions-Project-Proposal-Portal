// src/components/Slide7/Slide7DownloadTemplate.js

import React, { useState } from 'react';
import { trackUserAction } from '../../utils/firebaseUtils';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide7DownloadTemplate = () => {
  const { userId } = useUser(); // Retrieve userId from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  // Handle the proposal download and log event with userId
  const handleDownload = async () => {
    await trackUserAction(userId, 'Downloaded Proposal');
    logEvent('download_proposal', { userId });
    window.location.href = '/assets/proposals/Andover_Eye_Institute_Proposal.pdf';
  };

  // Open modal, fetch HTML content, and log view proposal event
  const openModal = async () => {
    try {
      const response = await fetch('/assets/html/example2proposal.html');
      if (!response.ok) throw new Error('Failed to load proposal.');
      const text = await response.text();
      setHtmlContent(text);
      setIsModalOpen(true);
      logEvent('view_proposal', { userId });
    } catch (error) {
      console.error('Error loading proposal:', error);
      alert('Could not load the proposal document. Please try again later.');
    }
  };

  // Close modal and log close event
  const closeModal = () => {
    setIsModalOpen(false);
    setHtmlContent('');
    logEvent('close_proposal', { userId });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-gradient-to-br from-[#060512] to-[#0E1730] rounded-lg shadow-sm text-off-white p-8 space-y-8">
      {/* Thank You Message */}
      <h2 className="text-5xl font-bold font-sovjet text-center text-off-white shadow-lg">
        Thank You, Andover Eye Institute!
      </h2>
      <p className="text-lg font-newsreader text-center max-w-xl text-off-white">
        Your proposal is ready for download. Click the button below to save your personalized quote and details for future reference.
      </p>

      {/* Download Button */}
      <button 
        onClick={handleDownload}
        className="bg-logo-blue text-soft-black font-aldrich text-lg px-10 py-4 rounded-lg shadow-lg hover:bg-darker-blue hover:text-white transition duration-200 ease-in-out"
      >
        Download Proposal PDF
      </button>

      {/* View Proposal Button */}
      <button 
        onClick={openModal}
        className="bg-logo-blue text-soft-black font-aldrich text-lg px-10 py-4 rounded-lg shadow-lg hover:bg-darker-blue hover:text-white transition duration-200 ease-in-out"
      >
        View Proposal
      </button>

      {/* Modal for Viewing Proposal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full">
            <button onClick={closeModal} className="absolute top-4 right-4 text-2xl text-red-500 hover:text-red-700">&times;</button>
            <div className="overflow-y-auto max-h-[80vh]">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div>
        </div>
      )}
    </div> 
  );
};

export default Slide7DownloadTemplate;
