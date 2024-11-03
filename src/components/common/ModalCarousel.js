// src/components/common/ModalCarousel.js

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwipeable } from 'react-swipeable';
import Modal from './Modal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { trackUserAction } from '../../utils/firebaseUtils';
import { useUser } from '../../UserContext';

const ModalCarousel = ({ slides = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { userId } = useUser(); // Get user ID from context

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
      trackUserAction(userId, `Opened modal for slide: ${slides[activeSlideIndex]?.alt || `Slide ${activeSlideIndex + 1}`}`);
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isModalOpen, activeSlideIndex, userId]);

  const openModal = (index) => {
    setActiveSlideIndex(index);
    setIsModalOpen(true);
    trackUserAction(userId, `Opened modal for slide: ${slides[index]?.alt || `Slide ${index + 1}`}`);
  };

  const closeModal = () => {
    trackUserAction(userId, `Closed modal for slide: ${slides[activeSlideIndex]?.alt || `Slide ${activeSlideIndex + 1}`}`);
    setIsModalOpen(false);
  };

  const nextSlide = () => {
    const newIndex = (activeSlideIndex + 1) % slides.length;
    setActiveSlideIndex(newIndex);
    trackUserAction(userId, `Navigated to next slide: ${newIndex + 1}`);
  };

  const previousSlide = () => {
    const newIndex = (activeSlideIndex - 1 + slides.length) % slides.length;
    setActiveSlideIndex(newIndex);
    trackUserAction(userId, `Navigated to previous slide: ${newIndex + 1}`);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: previousSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!slides.length) return null;

  return (
    <div className="carousel-container p-6 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl max-w-3xl mx-auto">
      <Swiper>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.thumbnail}
              alt={slide.alt || `Slide ${index + 1}`}
              className="carousel-image w-36 h-36 object-cover rounded-lg cursor-pointer shadow-md transform transition-transform hover:scale-105 dark:bg-gray-700"
              onClick={() => openModal(index)}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for Enlarged Image or Video */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} clickAway={true}>
          <div className="w-full h-full flex flex-col items-center p-4" {...swipeHandlers}>
            <button
              className="absolute top-4 left-4 text-logo-blue hover:text-darker-blue transition-colors duration-300"
              onClick={previousSlide}
              disabled={activeSlideIndex === 0}
            >
              &lt; {/* Previous Arrow */}
            </button>

            {slides[activeSlideIndex] && (
              <>
                {slides[activeSlideIndex].websiteUrl ? (
                  <iframe
                    src={slides[activeSlideIndex].websiteUrl}
                    title="Demo Site"
                    className="w-full max-w-[1200px] h-[90vh] border-none rounded-lg shadow-lg"
                  />
                ) : (
                  <img
                    src={slides[activeSlideIndex].thumbnail}
                    alt={slides[activeSlideIndex].alt || `Slide ${activeSlideIndex + 1}`}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
                  />
                )}
                <p className="mt-4 text-lg text-gray-900 dark:text-gray-100 text-center">
                  {slides[activeSlideIndex].alt}
                </p>
              </>
            )}

            <button
              className="absolute top-4 right-4 text-logo-blue hover:text-darker-blue transition-colors duration-300"
              onClick={nextSlide}
              disabled={activeSlideIndex === slides.length - 1}
            >
              &gt; {/* Next Arrow */}
            </button>

            <button
              onClick={closeModal}
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

export default ModalCarousel;
