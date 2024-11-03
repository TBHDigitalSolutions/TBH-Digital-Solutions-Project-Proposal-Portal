// src/components/Slide2/Slide2ContentTemplate.js

import React, { useState } from 'react';
import Carousel from '../common/Carousel';
import VideoPlayer from '../VideoPlayer';
import Modal from '../common/Modal';
import withData from '../../hoc/withData';
import swiperConfig from '../../config/swiperConfig';
import { logEvent } from '../firebaseLogging'; // Import logging function
import { useUser } from '../../UserContext'; // Import user context

const Slide2ContentTemplate = ({ data }) => {
  const { userId } = useUser(); // Retrieve the userId from context
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeDemoUrl, setActiveDemoUrl] = useState("");
  const [activeAccordion, setActiveAccordion] = useState("image");

  const { title, description, videoUrl, slides, demos } = data || {};

  const openImageModal = (index) => {
    setActiveImageIndex(index);
    setIsImageModalOpen(true);
    logEvent('open_image_modal', { userId, imageIndex: index, slide: 2 }); // Log image modal open with userId
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    logEvent('close_image_modal', { userId, slide: 2 }); // Log image modal close with userId
  };

  const openDemoModal = (url) => {
    setActiveDemoUrl(url);
    setIsDemoModalOpen(true);
    logEvent('open_demo_modal', { userId, demoUrl: url, slide: 2 }); // Log demo modal open with userId
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    logEvent('close_demo_modal', { userId, slide: 2 }); // Log demo modal close with userId
  };

  const handleAccordionClick = (type) => {
    setActiveAccordion(type);
    logEvent('accordion_toggle', { userId, accordionType: type, slide: 2 }); // Log accordion toggle with userId
  };

  const handleVideoPlay = () => {
    logEvent('view_video', { userId, videoTitle: title, slide: 2 }); // Log video play with userId
  };

  if (!data) return <div className="text-center text-logo-blue">Loading...</div>;

  return (
    <div className="bg-off-white dark:bg-soft-black p-6 mx-auto mt-4 mb-4 rounded-lg shadow-lg flex flex-col justify-center items-center h-[80vh] max-w-[95%]">
      <div className="flex-grow flex flex-col justify-between w-full">
        
        {/* Title and Description */}
        <h2 className="text-3xl font-aldrich font-bold text-center text-soft-black mb-2 drop-shadow-lg">{title}</h2>
        {description && <p className="text-lg font-newsreader text-center text-text-dark dark:text-text-light mb-4">{description}</p>}

        {/* Video Player */}
        <div className="mb-[6.25%] flex justify-center">
          {videoUrl ? (
            <VideoPlayer videoUrl={videoUrl} title={title} onPlay={handleVideoPlay} />
          ) : (
            <p className="text-center text-gray-500">No video available for this step.</p>
          )}
        </div>

        {/* Accordion Toggles Side by Side */}
        <div className="flex space-x-4 justify-center mb-4">
          <button
            onClick={() => handleAccordionClick("image")}
            className={`w-1/2 text-center font-aldrich font-bold p-2 rounded-lg shadow-lg transition duration-200 ease-in-out 
              ${activeAccordion === "image" ? "bg-logo-blue text-soft-black" : "bg-light-grey text-soft-black dark:bg-dark-charcoal dark:text-off-white"}`}
          >
            Image Examples
          </button>
          <button
            onClick={() => handleAccordionClick("demo")}
            className={`w-1/2 text-center font-aldrich font-bold p-2 rounded-lg transition duration-200 ease-in-out 
              ${activeAccordion === "demo" ? "bg-logo-blue text-soft-black" : "bg-light-grey text-soft-black dark:bg-dark-charcoal dark:text-off-white"}`}
          >
            Demo Examples
          </button>
        </div>

        {/* Accordion Content */}
        <div className="w-full mb-[3.75%]">
          {activeAccordion === "image" && slides?.length > 0 && (
            <div className="w-full flex justify-center">
              <Carousel
                slides={slides}
                swiperConfig={swiperConfig}
                onImageClick={openImageModal}
                thumbnailSize={{ width: '100%', height: 'auto' }}
              />
            </div>
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

        {/* Modal for Image Carousel */}
        {isImageModalOpen && (
          <Modal isOpen={isImageModalOpen} onClose={closeImageModal}>
            <Carousel slides={slides} swiperConfig={swiperConfig} activeIndex={activeImageIndex} onClose={closeImageModal} />
          </Modal>
        )}

        {/* Modal for Demo Iframe */}
        {isDemoModalOpen && (
          <Modal isOpen={isDemoModalOpen} onClose={closeDemoModal}>
            <div className="demo-modal relative bg-off-white dark:bg-soft-black rounded-lg shadow-lg p-6">
              <button onClick={closeDemoModal} className="absolute top-4 right-4 text-2xl text-red-500 hover:text-red-700">&times;</button>
              <iframe
                src={activeDemoUrl}
                title="Demo Site"
                className="w-full max-w-[1200px] h-[90vh] border-none rounded-lg shadow-lg"
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

// Wrap Slide2ContentTemplate with HOC for data fetching
export default withData(Slide2ContentTemplate, 'content.json', 2);
