// src/components/common/Modal.js

import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomPrevArrow, CustomNextArrow } from './CustomArrows';
import VideoPlayer from '../VideoPlayer';

const Modal = ({ isOpen, onClose, slides = [], activeIndex }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current.focus();
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sliderSettings = {
    lazyLoad: 'ondemand',
    initialSlide: activeIndex,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-content bg-white rounded-lg shadow-lg p-6 relative max-w-[600px] max-h-[90vh] w-full">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="modal-close-btn absolute top-4 right-4 text-3xl text-gray-700 hover:text-gray-900"
          aria-label="Close modal"
        >
          &times;
        </button>

        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index} className="flex justify-center items-center h-full">
              {slide.videoUrl ? (
                <div
                  className={`${
                    slide.aspectRatio === '1:1'
                      ? 'w-[300px] h-[300px]'
                      : 'w-full h-[60vh]'
                  } flex items-center justify-center`}
                >
                  <VideoPlayer videoUrl={slide.videoUrl} />
                </div>
              ) : (
                <img
                  src={slide.image || slide.thumbnail}
                  alt={slide.alt || `Slide ${index + 1}`}
                  className="w-auto max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg mx-auto"
                />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Modal;
