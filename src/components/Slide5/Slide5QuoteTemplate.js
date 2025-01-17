// src/components/Slide5/Slide5QuoteTemplate.js

import React, { useState, useEffect } from 'react';
import TableView from '../TableView'; // For table display
import Modal2 from '../common/Modal2'; // Using Modal2 for handling HTML content
import withData from '../../hoc/withData'; // Higher-order component for data fetching
import { logEvent } from '../firebaseLogging'; // Import the logging function
import { useUser } from '../../UserContext'; // Import user context for userId

const Slide5QuoteTemplate = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [htmlError, setHtmlError] = useState(null);
  const { userId } = useUser(); // Get userId from context

  const { title, description, features = [], totals = {}, additionalNotes = [] } = data || {};

  useEffect(() => {
    if (userId) {
      logEvent('view_page', { page: 'Slide 5 Quote', userId });
    }
  }, [userId]);

  const fetchHtmlContent = async () => {
    try {
      const response = await fetch('/assets/html/Digital Marketing Services.html'); // Path to HTML file
      if (!response.ok) throw new Error('Failed to load the HTML document.');
      const text = await response.text();
      setHtmlContent(text);
      setHtmlError(null);
      logEvent('open_modal', { modal: 'Digital Marketing Services', userId }); // Log modal open event
    } catch (error) {
      console.error('Error loading HTML:', error);
      setHtmlError('Could not load the document. Please try again later.');
    }
  };

  const toggleModal = () => {
    if (!isModalOpen) {
      fetchHtmlContent();
    } else {
      logEvent('close_modal', { modal: 'Digital Marketing Services', userId }); // Log modal close event
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-8 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      {/* Title and Description */}
      <h2 className="text-3xl font-aldrich font-bold text-center text-soft-black dark:text-off-white mb-4 drop-shadow-lg">
        {title}
      </h2>
      <p className="text-lg font-newsreader text-center text-text-dark dark:text-text-light mb-8">{description}</p>

      {/* Features Table */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white mb-4">Digital Marketing Features</h3>
        <TableView
          data={features.map((feature) => ({
            Feature: feature.feature, // Removed underline styling
            Description: feature.description,
            "Setup Fee": feature.setupFee,
            "Service Fee": feature.serviceFee || "-",
            "Monthly Management Fee": feature.monthlyManagementFee || "-",
          }))}
        />
      </div>

      {/* Totals Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white">Cost Breakdown</h3>
        <p className="text-lg text-text-dark dark:text-text-light mt-2">Total Setup Fees: {totals.setupFees || "N/A"}</p>
        <p className="text-lg text-text-dark dark:text-text-light">Monthly Management Fees: {totals.monthlyManagementFees || "N/A"}</p>
      </div>

      {/* Additional Notes */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white mb-4">Additional Notes</h3>
        {additionalNotes.length > 0 ? (
          additionalNotes.map((note, index) => (
            <p key={index} className="text-lg text-text-dark dark:text-text-light">- {note}</p>
          ))
        ) : (
          <p className="text-lg text-text-dark dark:text-text-light">No additional notes available.</p>
        )}
      </div>

      {/* Button to Open Modal */}
      <button
        onClick={toggleModal}
        className="text-logo-blue dark:text-off-white font-semibold underline mt-4 hover:text-hover-blue dark:hover:text-logo-blue transition-colors"
      >
        Digital Marketing Services Available
      </button>

      {/* Modal2 for Viewing HTML Content */}
      {isModalOpen && (
        <Modal2 isOpen={isModalOpen} onClose={toggleModal}>
          <div className="p-8 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
            <h3 className="text-3xl font-aldrich font-bold mb-6 text-soft-black dark:text-off-white">Digital Marketing Services</h3>
            {htmlError ? (
              <p className="text-red-500 dark:text-red-400">{htmlError}</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            )}
            <button
              onClick={toggleModal}
              className="mt-6 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              Close
            </button>
          </div>
        </Modal2>
      )}
    </div>
  );
};

// Wrap Slide5QuoteTemplate with HOC for data fetching from quotes.json with ID 5
export default withData(Slide5QuoteTemplate, 'quotes.json', 5);
