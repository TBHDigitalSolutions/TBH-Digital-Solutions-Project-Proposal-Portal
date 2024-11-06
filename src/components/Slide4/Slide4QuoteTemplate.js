// src/components/Slide4/Slide4QuoteTemplate.js

import React, { useState, useEffect } from 'react';
import TableView from '../TableView';
import Modal2 from '../common/Modal2'; // Use Modal2 for HTML content handling
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide4QuoteTemplate = ({ data }) => {
  const { userId } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [htmlError, setHtmlError] = useState(null);

  const { title, description, features = [], totals = {}, additionalNotes = [] } = data || {};

  useEffect(() => {
    if (userId) {
      logEvent('view_page', { page: 'Slide 4 Quote', userId });
    }
  }, [userId]);

  const fetchHtmlContent = async () => {
    try {
      const response = await fetch('/assets/html/contents-creation-services.html');
      if (!response.ok) throw new Error('Failed to load the HTML document.');
      const text = await response.text();
      setHtmlContent(text);
      setHtmlError(null);
      logEvent('view_content_services_modal', { userId });
    } catch (error) {
      console.error('Error loading HTML:', error);
      setHtmlError('Could not load the document. Please try again later.');
    }
  };

  const toggleModal = () => {
    if (!isModalOpen) {
      fetchHtmlContent();
    } else {
      logEvent('close_content_services_modal', { userId });
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
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white mb-4">Content Creation Features</h3>
        <TableView
          data={features.map(({ feature, description, setupFee, serviceFee, monthlyManagementFee }) => ({
            Feature: feature, // Removed the blue underline styling here
            Description: description,
            "Setup Fee": setupFee || "-",
            "Service Fee": serviceFee || "-",
            "Monthly Management Fee": monthlyManagementFee || "-"
          }))}
        />
      </div>

      {/* Totals Breakdown */}
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
        Available Content and Video Services
      </button>

      {/* Modal2 for Viewing HTML Content */}
      {isModalOpen && (
        <Modal2 isOpen={isModalOpen} onClose={toggleModal}>
          <div className="p-8 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
            <h3 className="text-3xl font-aldrich font-bold mb-6 text-soft-black dark:text-off-white">Available Content and Video Services</h3>
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

export default withData(Slide4QuoteTemplate, 'quotes.json', 4);
