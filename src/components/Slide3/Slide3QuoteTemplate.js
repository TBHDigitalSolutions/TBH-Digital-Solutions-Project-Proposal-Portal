// src/components/Slide3/Slide3QuoteTemplate.js

import React, { useState, useEffect } from 'react';
import TableView from '../TableView';
import Modal2 from '../common/Modal2'; // Import Modal2
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide3QuoteTemplate = ({ data }) => {
  const { userId } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [htmlError, setHtmlError] = useState(null);

  const { title, description, features = [], totals = {}, additionalNotes = [] } = data || {};

  const fetchHtmlContent = async () => {
    try {
      const response = await fetch('/assets/html/contents-creation-services.html');
      if (!response.ok) throw new Error('Failed to load HTML document');
      const text = await response.text();
      setHtmlContent(text);
      setHtmlError(null);
      logEvent('view_full_stack_example', { userId, action: 'open', slide: 3 });
    } catch (error) {
      console.error('Error loading HTML:', error);
      setHtmlError('Could not load HTML content. Please try again later.');
    }
  };

  const toggleModal = () => {
    if (!isModalOpen) {
      fetchHtmlContent();
    } else {
      logEvent('view_full_stack_example', { userId, action: 'close', slide: 3 });
    }
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    logEvent('view_section', { userId, section: 'CRM Setup Features', slide: 3 });
    logEvent('view_section', { userId, section: 'Cost Breakdown', slide: 3 });
    logEvent('view_section', { userId, section: 'Additional Notes', slide: 3 });
  }, [userId]);

  return (
    <div className="p-8 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Title and Description */}
      <h2 className="text-3xl font-aldrich font-bold text-center text-soft-black dark:text-off-white mb-4 drop-shadow-lg">
        {title}
      </h2>
      <p className="text-lg font-newsreader text-text-dark dark:text-text-light mb-8">{description}</p>

      {/* Features Table */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-soft-black dark:text-off-white mb-4">CRM Setup Features</h3>
        <TableView
          data={features.map(({ feature, description, setupFee, monthlyManagementFee }) => ({
            Feature: feature,
            Description: description,
            "Setup Fee": setupFee || "N/A",
            "Monthly Management Fee": monthlyManagementFee || "N/A",
          }))}
        />
      </div>

      {/* Totals Breakdown */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-soft-black dark:text-off-white">Cost Breakdown</h3>
        <p className="text-lg text-text-dark dark:text-text-light mt-2">Setup Fee Range: {totals.setupFeeRange || "N/A"}</p>
        <p className="text-lg text-text-dark dark:text-text-light">Monthly Management Fee Range: {totals.monthlyManagementFeeRange || "N/A"}</p>
      </div>

      {/* Additional Notes */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-soft-black dark:text-off-white">Additional Notes</h3>
        {additionalNotes.length > 0 ? (
          additionalNotes.map((note, idx) => (
            <p key={idx} className="text-lg text-text-dark dark:text-text-light">- {note}</p>
          ))
        ) : (
          <p className="text-lg text-text-dark dark:text-text-light">No additional notes available.</p>
        )}
      </div>

      {/* Updated Button */}
      <button
        onClick={toggleModal}
        className="text-logo-blue text-xl underline mt-6 hover:text-hover-blue transition-colors"
      >
        See Full Stack CRM Setup Example
      </button>

      {/* Modal2 for Viewing HTML Content */}
      {isModalOpen && (
        <Modal2 isOpen={isModalOpen} onClose={toggleModal}>
          <div className="p-8 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
            <h3 className="text-3xl font-aldrich font-bold mb-6 text-soft-black dark:text-off-white">Full Stack CRM Setup Example</h3>
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

export default withData(Slide3QuoteTemplate, 'quotes.json', 3);
