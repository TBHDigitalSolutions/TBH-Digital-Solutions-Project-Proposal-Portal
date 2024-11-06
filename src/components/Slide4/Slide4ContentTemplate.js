// src/components/Slide4/Slide4ContentTemplate.js

import React, { useState, useEffect, useCallback } from 'react';
import ThumbnailCarousel from '../common/ThumbnailCarousel';
import Modal from '../common/Modal';
import VideoPlayer from '../VideoPlayer';
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide4ContentTemplate = ({ data }) => {
  const { userId } = useUser();
  const [activeAccordion, setActiveAccordion] = useState('imageCarousel');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlides, setModalSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideo, setIsVideo] = useState(false); // Track if current slide is a video

  const { title, description, videoUrl, imageCarousel, videoCarousel } = data || {};

  // Lazy load and preloading adjacent slides
  const preloadSlides = useCallback((index, slides) => {
    if (slides && slides.length > 0) {
      [index - 1, index + 1].forEach(i => {
        if (slides[i]) {
          const img = new Image();
          img.src = slides[i].image || slides[i].thumbnail;
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isModalOpen && modalSlides.length > 0) {
      preloadSlides(activeIndex, modalSlides);
    }
  }, [isModalOpen, activeIndex, modalSlides, preloadSlides]);

  const toggleAccordion = (type) => {
    if (activeAccordion !== type) {
      logEvent('view_accordion', { userId, accordionType: type, slide: 4 });
    }
    setActiveAccordion((prev) => (prev === type ? '' : type));
  };

  const openModal = useCallback((index, mediaType) => {
    setModalSlides(mediaType === 'images' ? imageCarousel : videoCarousel);
    setActiveIndex(index);
    setIsVideo(mediaType === 'videos');
    setIsModalOpen(true);
    logEvent('open_modal', { userId, slide: 4, mediaType, index });
  }, [imageCarousel, videoCarousel, userId]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsVideo(false);
  }, []);

  useEffect(() => {
    logEvent('view_page', { userId, page: 'Slide 4' });
  }, [userId]);

  if (!data) return <div className="text-center text-logo-blue">Loading...</div>;

  return (
    <div className="p-6 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-[90%] mx-auto mt-6 flex flex-col justify-center items-center">
      
      {/* Title and Description */}
      <h2 className="text-3xl font-bold text-center mb-2 text-soft-black drop-shadow-lg">{title}</h2>
      {description && <p className="text-lg text-center mb-4">{description}</p>}

      {/* Main Video Player */}
      <div className="mb-6">
        {videoUrl ? (
          <VideoPlayer 
            videoUrl={videoUrl} 
            title={title} 
            onPlay={() => logEvent('play_main_video', { userId, slide: 4 })} 
          />
        ) : (
          <p className="text-center text-gray-500">No main video available.</p>
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
          Video Examples
        </button>
      </div>

      {/* Accordion Content */}
      <div className="w-full mb-4">
        {activeAccordion === 'imageCarousel' && imageCarousel?.length > 0 && (
          <ThumbnailCarousel
            thumbnails={imageCarousel}
            onThumbnailClick={(index) => openModal(index, 'images')}
          />
        )}
        {activeAccordion === 'videoCarousel' && videoCarousel?.length > 0 && (
          <ThumbnailCarousel
            thumbnails={videoCarousel}
            onThumbnailClick={(index) => openModal(index, 'videos')}
          />
        )}
      </div>

      {/* Modal for Selected Images or Videos */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} slides={modalSlides} activeIndex={activeIndex}>
          {isVideo ? (
            <VideoPlayer videoUrl={videoCarousel[activeIndex].videoUrl} />
          ) : (
            <img
              src={imageCarousel[activeIndex].image}
              alt={imageCarousel[activeIndex].alt || `Slide ${activeIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default withData(Slide4ContentTemplate, 'content.json', 4);
