// src/components/Slide2/Slide2QuoteTemplate.js

import React, { useState } from 'react';
import TableView from '../TableView';
import MarkdownView from '../MarkdownView';
import Modal from '../common/Modal';
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging'; // Import logging function
import { useUser } from '../../UserContext'; // Import user context

const Slide2QuoteTemplate = ({ data }) => {
  const { userId } = useUser(); // Retrieve the userId from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  // Destructure data properties
  const { title, description, categories = [], additionalServices = [], grandTotal } = data || {};

  // Toggle modal visibility and log the event
  const toggleModal = async () => {
    if (!isModalOpen) {
      try {
        const response = await fetch('/assets/html/Website-Overview Page.html');
        if (!response.ok) throw new Error('Failed to load the HTML document.');
        const text = await response.text();
        setHtmlContent(text);
        logEvent('open_modal', { userId, slide: 2, action: 'view_explanation' }); // Log modal open with userId
      } catch (error) {
        console.error('Error loading HTML:', error);
        alert('Could not load the document. Please try again later.');
      }
    } else {
      logEvent('close_modal', { userId, slide: 2, action: 'view_explanation' }); // Log modal close with userId
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleButtonClick = () => {
    logEvent('view_explanation_button_click', { userId, slide: 2 }); // Log button click with userId
    toggleModal();
  };

  return (
    <div className="p-8 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Title and Description */}
      <h2 className="text-3xl font-aldrich font-bold text-center text-soft-black dark:text-off-white mb-4 drop-shadow-lg">
        {title}
      </h2>
      <p className="text-lg font-newsreader text-text-dark dark:text-text-light mb-8">{description}</p>

      {/* Render categories and their items */}
      {categories.map((category, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-2xl font-semibold text-soft-black dark:text-off-white mb-4">
            {category.categoryTitle}
          </h3>
          <TableView data={category.items.map(({ label, price }) => ({ Item: label, Price: price }))} />
          <p className="text-lg text-text-dark dark:text-text-light mt-2 font-medium">
            Total for {category.categoryTitle}: {category.total}
          </p>
        </div>
      ))}

      {/* Render additional services */}
      {additionalServices.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-soft-black dark:text-off-white mb-4">Additional Services</h3>
          <MarkdownView content={additionalServices.map(service => `- ${service.service}: ${service.description}`).join("\n")} />
        </div>
      )}

      {/* Grand Total */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-soft-black dark:text-off-white">Overall Total: {grandTotal}</h3>
      </div>

      {/* Updated Button */}
      <button
        onClick={handleButtonClick}
        className="text-logo-blue text-xl text-underline mt-6 hover:text-hover-blue transition-colors"
      >
        Here is why you need these pages
      </button>

      {/* Modal for Viewing HTML Content */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <div className="p-8 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-2xl mx-auto">
            <h3 className="text-3xl font-aldrich font-bold mb-6 text-soft-black dark:text-off-white">Why You Need These Pages</h3>
            <div className="overflow-y-auto max-h-[80vh]">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            <button
              onClick={toggleModal}
              className="mt-6 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default withData(Slide2QuoteTemplate, 'quotes.json', 2);
