// src/components/Slide2/Slide2ContentTemplate.js

import React, { useState, useEffect } from 'react';
import ThumbnailCarousel from '../common/ThumbnailCarousel';
import Modal from '../common/Modal';
import Modal2 from '../common/Modal2';
import VideoPlayer from '../VideoPlayer';
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide2ContentTemplate = ({ data }) => {
  const { userId } = useUser();
  const [activeAccordion, setActiveAccordion] = useState('image');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeDemoUrl, setActiveDemoUrl] = useState("");
  const [isVideo, setIsVideo] = useState(false);

  const { title, description, videoUrl, slides, demos } = data || {};

  const openModal = (index, isVideoContent) => {
    setActiveImageIndex(index);
    setIsVideo(isVideoContent);
    setIsImageModalOpen(true);
    logEvent('open_modal', { userId, index, isVideoContent, slide: 2 });
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
    setIsVideo(false);
    logEvent('close_modal', { userId, slide: 2 });
  };

  const openDemoModal = (url) => {
    setActiveDemoUrl(url);
    setIsDemoModalOpen(true);
    logEvent('open_demo_modal', { userId, demoUrl: url, slide: 2 });
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    logEvent('close_demo_modal', { userId, slide: 2 });
  };

  const handleAccordionClick = (type) => {
    setActiveAccordion(type);
    logEvent('accordion_toggle', { userId, accordionType: type, slide: 2 });
  };

  const handleVideoPlay = () => {
    logEvent('view_video', { userId, videoTitle: title, slide: 2 });
  };

  useEffect(() => {
    logEvent('view_page', { userId, page: 'Slide 2 Content' });
  }, [userId]);

  if (!data) return <div className="text-center text-logo-blue">Loading...</div>;

  return (
    <div className="p-6 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-[90%] mx-auto mt-6 flex flex-col justify-center items-center h-[80vh]">
      
      <h2 className="text-3xl font-bold text-center text-soft-black dark:text-off-white mb-2 drop-shadow-lg">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-center text-text-dark dark:text-text-light mb-4">
          {description}
        </p>
      )}

      <div className="mb-6">
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} title={title} onPlay={handleVideoPlay} />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">No video available for this step.</p>
        )}
      </div>

      <div className="flex space-x-4 justify-center mb-4">
        <button
          onClick={() => handleAccordionClick("image")}
          className={`w-1/2 text-center font-bold p-2 rounded-lg shadow-lg 
            ${activeAccordion === "image" ? "bg-logo-blue text-soft-black" : "bg-light-grey dark:bg-dark-charcoal"}`}
        >
          Image Examples
        </button>
        <button
          onClick={() => handleAccordionClick("demo")}
          className={`w-1/2 text-center font-bold p-2 rounded-lg shadow-lg 
            ${activeAccordion === "demo" ? "bg-logo-blue text-soft-black" : "bg-light-grey dark:bg-dark-charcoal"}`}
        >
          Demo Examples
        </button>
      </div>

      <div className="w-full mb-4">
        {activeAccordion === "image" && slides?.length > 0 && (
          <ThumbnailCarousel
            thumbnails={slides}
            onThumbnailClick={(index, isVideo) => openModal(index, isVideo)}
          />
        )}

        {activeAccordion === "demo" && demos && Object.keys(demos).length > 0 && (
          <div className="w-full flex overflow-x-auto space-x-3">
            {Object.values(demos).map((demo, index) => (
              <div
                key={index}
                className="w-[180px] h-[135px] flex-shrink-0 border border-light-grey dark:border-dark-charcoal rounded-lg shadow-lg p-2 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
                onClick={() => openDemoModal(demo.websiteUrl)}
              >
                <img
                  src={demo.thumbnail}
                  alt={demo.alt || `Demo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {isImageModalOpen && (
        <Modal isOpen={isImageModalOpen} onClose={closeModal} slides={slides} activeIndex={activeImageIndex} />
      )}

      {isDemoModalOpen && (
        <Modal2 isOpen={isDemoModalOpen} onClose={closeDemoModal}>
          <iframe
            src={activeDemoUrl}
            title="Demo Site"
            className="w-full max-w-[1200px] h-[90vh] border-none rounded-lg shadow-lg"
            allowFullScreen
          />
        </Modal2>
      )}
    </div>
  );
};

export default withData(Slide2ContentTemplate, 'content.json', 2);
