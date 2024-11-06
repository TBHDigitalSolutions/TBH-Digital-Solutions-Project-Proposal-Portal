// src/components/Slide6/Slide6QuoteTemplate.js

import React, { useState, useEffect } from 'react';
import Modal2 from '../common/Modal2'; // Updated to use Modal2
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

// Define the path to the Gantt chart image
const ganttChartImagePath = '/assets/timeline_chart/ProjectTimeline-AEI.png';

const Slide6QuoteTemplate = ({ data }) => {
  const { userId } = useUser(); // Retrieve userId from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [htmlError, setHtmlError] = useState(null);

  const {
    title,
    description,
    KeyFocusAreas = [],
    CoreProjectServices = [],
    ProjectTimeline = [],
    ContractTerms = [],
    buildPlan = [],
    adsCommitment,
  } = data || {};

  // Log page view on component mount
  useEffect(() => {
    if (userId) {
      logEvent('view_page', { page: 'Slide 6 Quote', userId });
    }
  }, [userId]);

  const fetchHtmlContent = async () => {
    try {
      const response = await fetch('/assets/html/milestones.html');
      if (!response.ok) throw new Error('Failed to load the HTML document.');
      const text = await response.text();
      setHtmlContent(text);
      setHtmlError(null);
      logEvent('view_milestones_modal', { page: 'Slide 6 Quote', action: 'open', userId });
    } catch (error) {
      console.error('Error loading HTML:', error);
      setHtmlError('Could not load the document. Please try again later.');
    }
  };

  const toggleHtmlModal = () => {
    if (!isModalOpen) {
      fetchHtmlContent();
    } else {
      logEvent('view_milestones_modal', { page: 'Slide 6 Quote', action: 'close', userId });
    }
    setIsModalOpen(!isModalOpen);
  };

  const logSectionView = (section) => {
    logEvent('view_section', { page: 'Slide 6 Quote', section, userId });
  };

  return (
    <div className="p-8 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      {/* Title and Description */}
      <h2 className="text-3xl font-aldrich font-bold text-center text-soft-black dark:text-off-white mb-4 drop-shadow-lg">{title}</h2>
      <p className="text-lg font-newsreader text-center text-text-dark dark:text-text-light mb-8">{description}</p>

      {/* Key Focus Areas */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white mb-4">Key Focus Areas</h3>
        {KeyFocusAreas.map((item, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold text-text-dark dark:text-text-light">{item.term}</h4>
            <p className="text-text-dark dark:text-text-light">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Core Project Services */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white mb-4">Core Project Services</h3>
        {CoreProjectServices.map((service, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold text-text-dark dark:text-text-light">{service.service}</h4>
            <p className="text-text-dark dark:text-text-light">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Project Timeline */}
      <div className="mb-8" onMouseEnter={() => logSectionView('Project Timeline')}>
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white">Project Timeline</h3>
        {ProjectTimeline.map((phase, index) => (
          <p key={index} className="text-text-dark dark:text-text-light mt-2">
            <strong>{phase.phase} ({phase.duration})</strong>: {phase.tasks}
          </p>
        ))}
      </div>

      {/* Gantt Chart */}
      <div className="mb-8" onMouseEnter={() => logSectionView('Gantt Chart')}>
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white">Gantt Chart</h3>
        <img src={ganttChartImagePath} alt="Gantt chart for project phases" className="w-full h-auto rounded-lg shadow-lg mt-4" />
      </div>

      {/* Contract Terms */}
      <div className="mb-8" onMouseEnter={() => logSectionView('Contract Terms')}>
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white">Contract Terms</h3>
        {ContractTerms.map((term, index) => (
          <p key={index} className="text-text-dark dark:text-text-light mt-2">- {term}</p>
        ))}
      </div>

      {/* Build Plan */}
      <div className="mb-8" onMouseEnter={() => logSectionView('Build Plan')}>
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white">60-90 Day Build Plan</h3>
        {buildPlan.map((item, index) => (
          <p key={index} className="text-text-dark dark:text-text-light mt-2">
            <strong>{item.duration}</strong>: {item.tasks}
          </p>
        ))}
      </div>

      {/* Ads Commitment */}
      <div className="mb-8" onMouseEnter={() => logSectionView('Ads Commitment')}>
        <h3 className="text-2xl font-semibold font-aldrich text-soft-black dark:text-off-white">90-Day Ads/Digital Marketing Commitment</h3>
        <p className="text-text-dark dark:text-text-light mt-2">{adsCommitment}</p>
      </div>

      {/* View Project Milestones Button */}
      <button
        onClick={toggleHtmlModal}
        className="text-logo-blue dark:text-off-white font-semibold underline mt-4 hover:text-darker-blue dark:hover:text-logo-blue transition-colors"
      >
        See Project Milestones Details
      </button>

      {/* Modal2 for Viewing HTML Content */}
      {isModalOpen && (
        <Modal2 isOpen={isModalOpen} onClose={toggleHtmlModal}>
          <div className="p-8 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
            <h3 className="text-3xl font-aldrich font-bold mb-6 text-soft-black dark:text-off-white">Project Milestones</h3>
            {htmlError ? (
              <p className="text-red-500 dark:text-red-400">{htmlError}</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            )}
            <button
              onClick={toggleHtmlModal}
              className="mt-6 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </Modal2>
      )}
    </div>
  );
};

// Wrap Slide6QuoteTemplate with HOC for data fetching from quotes.json with ID 6
export default withData(Slide6QuoteTemplate, 'quotes.json', 6);
