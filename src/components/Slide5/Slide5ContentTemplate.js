// src/components/Slide5/Slide5ContentTemplate.js

import React, { useState, useEffect } from 'react';
import ThumbnailCarousel from '../common/ThumbnailCarousel';
import Modal from '../common/Modal';
import VideoPlayer from '../VideoPlayer';
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide5ContentTemplate = ({ data }) => {
  const { userId } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlides, setModalSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { title, description, videoUrl, slides } = data || {};

  // Log initial page view
  useEffect(() => {
    if (userId) logEvent('view_page', { page: 'Slide 5 Content', userId });
  }, [userId]);

  // Log video play event
  const handleVideoPlay = () => logEvent('play_video', { videoTitle: title, userId });

  // Open modal for carousel items
  const openModal = (index) => {
    setModalSlides(slides);
    setActiveIndex(index);
    setIsModalOpen(true);
    logEvent('view_image_modal', { imageIndex: index, userId });
  };

  // Close modal and log event
  const closeModal = () => {
    setIsModalOpen(false);
    logEvent('close_image_modal', { userId });
  };

  // Log each slide view in modal carousel
  const handleSlideChange = (newIndex) => {
    setActiveIndex(newIndex);
    logEvent('view_carousel_slide', { slideIndex: newIndex, userId });
  };

  if (!data) return <div className="text-center text-logo-blue">Loading...</div>;

  return (
    <div className="p-6 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-[90%] mx-auto mt-6 flex flex-col items-center">
      
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-soft-black dark:text-off-white mb-2 drop-shadow-lg">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-lg text-center text-text-dark dark:text-text-light mb-6">
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
          <ThumbnailCarousel
            thumbnails={slides}
            onThumbnailClick={(index) => openModal(index)}
          />
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-500 dark:text-gray-300">No visuals available for this step.</p>
      )}

      {/* Modal for Enlarged Carousel View */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          slides={modalSlides}
          activeIndex={activeIndex}
          onSlideChange={handleSlideChange}
        />
      )}
    </div>
  );
};

export default withData(Slide5ContentTemplate, 'content.json', 5);
