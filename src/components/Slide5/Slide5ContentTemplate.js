// src/components/Slide5/Slide5ContentTemplate.js

import React, { useState, useEffect } from 'react';
import Carousel from '../common/Carousel';
import VideoPlayer from '../VideoPlayer';
import Modal from '../common/Modal';
import ModalCarousel from '../common/ModalCarousel';
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging'; // Import the logging function
import { useUser } from '../../UserContext'; // Import user context for userId

const Slide5ContentTemplate = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { userId } = useUser(); // Get userId from context

  const { title, description, videoUrl, slides } = data || {};

  // Log page view on component mount
  useEffect(() => {
    if (userId) {
      logEvent('view_page', { page: 'Slide 5 Content', userId });
    }
  }, [userId]);

  // Log video play event with userId
  const handleVideoPlay = () => {
    logEvent('play_video', { videoTitle: title, userId });
  };

  // Open modal and log the image click event
  const openModal = (index) => {
    setActiveSlideIndex(index);
    setIsModalOpen(true);
    logEvent('view_image_modal', { imageIndex: index, userId });
  };

  // Close modal and log event
  const closeModal = () => {
    setIsModalOpen(false);
    logEvent('close_image_modal', { userId });
  };

  // Log each slide view in the modal carousel with userId
  const handleSlideChange = (newIndex) => {
    setActiveSlideIndex(newIndex);
    logEvent('view_carousel_slide', { slideIndex: newIndex, userId });
  };

  if (!data) return <div className="text-center text-logo-blue">Loading...</div>;

  return (
    <div className="p-6 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-[90%] mx-auto mt-6 flex flex-col justify-center items-center">
      
      {/* Title */}
      <h2 className="text-3xl font-aldrich font-bold text-center text-soft-black dark:text-off-white mb-2 drop-shadow-lg">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-lg font-newsreader text-center text-text-dark dark:text-text-light mb-6">
          {description}
        </p>
      )}

      {/* Video Player */}
      <div className="mb-6 flex justify-center">
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} title={title} onPlay={handleVideoPlay} />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">No video available for this step.</p>
        )}
      </div>

      {/* Image Carousel */}
      {slides?.length > 0 ? (
        <div className="mt-6 w-full">
          <h3 className="text-xl font-semibold text-center text-soft-black dark:text-off-white mb-4">
            Feature Visuals
          </h3>
          <Carousel slides={slides} onImageClick={openModal} />
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-500 dark:text-gray-300">No visuals available for this step.</p>
      )}

      {/* Modal for Enlarged Carousel View */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalCarousel 
            slides={slides} 
            activeIndex={activeSlideIndex} 
            onClose={closeModal} 
            onSlideChange={handleSlideChange} 
          />
        </Modal>
      )}
    </div>
  );
};

export default withData(Slide5ContentTemplate, 'content.json', 5);
