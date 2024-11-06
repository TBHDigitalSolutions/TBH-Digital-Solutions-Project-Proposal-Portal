// src/components/Slide3/Slide3ContentTemplate.js

import React, { useState, useEffect, useCallback } from 'react';
import ThumbnailCarousel from '../common/ThumbnailCarousel';
import Modal from '../common/Modal';
import VideoPlayer from '../VideoPlayer';
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide3ContentTemplate = ({ data }) => {
  const { userId } = useUser();
  const [activeAccordion, setActiveAccordion] = useState('imageCarousel');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlides, setModalSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { title, description, videoUrl, slides = [], crmVideos = [] } = data || {};

  // Toggle accordion functionality with event logging
  const toggleAccordion = useCallback(
    (type) => {
      if (activeAccordion !== type) {
        logEvent('toggle_accordion', { userId, slide: 3, accordionType: type });
      }
      setActiveAccordion((prev) => (prev === type ? '' : type));
    },
    [activeAccordion, userId]
  );

  // Open modal for image or video slides
  const openModal = useCallback((index, mediaType) => {
    setModalSlides(mediaType === 'images' ? slides : crmVideos);
    setActiveIndex(index);
    setIsModalOpen(true);
    logEvent('open_modal', { userId, slide: 3, mediaType, index });
  }, [slides, crmVideos, userId]);

  // Close modal
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Log initial page view
  useEffect(() => {
    logEvent('view_page', { userId, page: 'Slide 3 Content' });
  }, [userId]);

  if (!data) return <div className="text-center text-logo-blue">Loading...</div>;

  return (
    <div className="p-6 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-[90%] mx-auto mt-6 flex flex-col items-center">
      {/* Title and Description */}
      <h2 className="text-3xl font-bold text-center text-soft-black dark:text-off-white mb-2 drop-shadow-lg">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-center text-text-dark dark:text-text-light mb-4">
          {description}
        </p>
      )}

      {/* Main Video Player */}
      <div className="mb-6">
        {videoUrl ? (
          <VideoPlayer
            videoUrl={videoUrl}
            title={title}
            onPlay={() => logEvent('play_main_video', { userId, slide: 3, videoTitle: title })}
          />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">No main video available.</p>
        )}
      </div>

      {/* Accordion Toggle Buttons */}
      <div className="flex space-x-4 mb-4 justify-center">
        <button
          onClick={() => toggleAccordion('imageCarousel')}
          className={`w-40 text-center font-bold p-2 rounded-lg shadow-lg 
            ${activeAccordion === 'imageCarousel' ? 'bg-logo-blue text-soft-black' : 'bg-light-grey dark:bg-dark-charcoal'}`}
        >
          Image Carousel
        </button>
        <button
          onClick={() => toggleAccordion('videoCarousel')}
          className={`w-40 text-center font-bold p-2 rounded-lg shadow-lg 
            ${activeAccordion === 'videoCarousel' ? 'bg-logo-blue text-soft-black' : 'bg-light-grey dark:bg-dark-charcoal'}`}
        >
          CRM Video Examples
        </button>
      </div>

      {/* Accordion Content */}
      <div className="w-full mb-4">
        {activeAccordion === 'imageCarousel' && slides.length > 0 && (
          <ThumbnailCarousel
            thumbnails={slides}
            onThumbnailClick={(index) => openModal(index, 'images')}
          />
        )}
        {activeAccordion === 'videoCarousel' && crmVideos.length > 0 && (
          <ThumbnailCarousel
            thumbnails={crmVideos}
            onThumbnailClick={(index) => openModal(index, 'videos')}
          />
        )}
      </div>

      {/* Modal for Selected Images or Videos */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          slides={modalSlides}
          activeIndex={activeIndex}
        />
      )}
    </div>
  );
};

export default withData(Slide3ContentTemplate, 'content.json', 3);
