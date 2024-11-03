// src/components/common/Carousel.js

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useSwipeable } from 'react-swipeable';
import Modal from './Modal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { trackUserAction } from '../../utils/firebaseUtils';
import { useUser } from '../../UserContext';

const Carousel = ({ slides = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { userId } = useUser(); // Get the user ID from context

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
      trackUserAction(userId, 'Opened modal');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isModalOpen, userId]);

  const openModal = (index) => {
    setActiveSlideIndex(index);
    setIsModalOpen(true);
    trackUserAction(userId, `Opened modal for slide: ${slides[index].alt || `Slide ${index + 1}`}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    trackUserAction(userId, `Closed modal for slide: ${slides[activeSlideIndex].alt || `Slide ${activeSlideIndex + 1}`}`);
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
    <div className="carousel-container relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={4}
        spaceBetween={10}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.image}
              alt={slide.alt || `Slide ${index + 1}`}
              className="carousel-image w-[150px] h-[150px] object-cover rounded-lg cursor-pointer shadow-md transition-transform transform hover:scale-105 dark:bg-gray-700"
              onClick={() => openModal(index)}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for Enlarged Image View */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col items-center w-full h-full p-4" {...swipeHandlers}>
            <img
              src={slides[activeSlideIndex].image}
              alt={slides[activeSlideIndex].alt || `Slide ${activeSlideIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
            <p className="mt-4 text-lg text-gray-900 dark:text-gray-100 text-center">
              {slides[activeSlideIndex].alt}
            </p>
            {/* Navigation Buttons within the modal */}
            <div className="flex justify-between w-full mt-4">
              <button 
                onClick={previousSlide} 
                className="text-logo-blue hover:text-darker-blue" 
                aria-label="Previous Slide"
              >
                &lt; {/* Previous Arrow */}
              </button>
              <button 
                onClick={nextSlide} 
                className="text-logo-blue hover:text-darker-blue" 
                aria-label="Next Slide"
              >
                &gt; {/* Next Arrow */}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Carousel;
