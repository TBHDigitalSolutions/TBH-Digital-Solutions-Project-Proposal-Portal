// src/components/common/Accordion.js

import React, { useState } from 'react';
import Carousel from './Carousel';
import Modal from './Modal';
import ModalCarousel from './ModalCarousel';

const Accordion = ({ title, contentType, slides }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeDemoUrl, setActiveDemoUrl] = useState("");

  const toggleAccordion = () => setIsOpen(!isOpen);

  // Handlers for modals
  const openImageModal = (index) => {
    setActiveSlideIndex(index);
    setIsModalOpen(true);
  };

  const openDemoIframe = (url) => {
    setActiveDemoUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveDemoUrl("");
  };

  return (
    <div className="accordion-container mb-4">
      {/* Accordion Toggle */}
      <button
        onClick={toggleAccordion}
        className="accordion-toggle w-full flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-lg"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="accordion-content mt-4">
          {contentType === 'main' ? (
            <Carousel
              slides={slides}
              onImageClick={openImageModal}
              thumbnailSize={{ width: '180px', height: '135px' }}
            />
          ) : contentType === 'demo-carousel' ? (
            <div className="flex overflow-x-auto space-x-3">
              {slides.map((demo, index) => (
                <div
                  key={index}
                  className="w-[180px] h-[135px] flex-shrink-0 border rounded-lg shadow-md p-2 cursor-pointer"
                  onClick={() => openDemoIframe(demo.websiteUrl)}
                >
                  <img
                    src={demo.thumbnail}
                    alt={demo.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {/* Modal for Image or Demo Iframe */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} contentClassName="w-[90vw] h-[90vh]">
          {contentType === 'main' ? (
            <Carousel slides={slides} activeIndex={activeSlideIndex} onClose={closeModal} />
          ) : (
            <iframe
              src={activeDemoUrl}
              title="Demo Site"
              className="w-full h-full border-none rounded-lg"
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Accordion;
