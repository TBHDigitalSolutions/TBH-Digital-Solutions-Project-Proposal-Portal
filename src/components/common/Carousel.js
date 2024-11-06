// src/components/common/Carousel.js

import React, { useState, useCallback, useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from './Modal';
import { CustomPrevArrow, CustomNextArrow } from './CustomArrows';

const Carousel = React.memo(({ slides = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const openModal = useCallback((index) => {
    setActiveSlideIndex(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const carouselSettings = useMemo(() => ({
    lazyLoad: 'ondemand',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }), []);

  return (
    <div className="carousel-container relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto">
      <Slider {...carouselSettings}>
        {slides.map((slide, index) => (
          <div key={index} className="p-2">
            <img
              src={slide.image || slide.thumbnail}  // Ensure fallback if `image` is not provided
              alt={slide.alt || `Slide ${index + 1}`}
              className="carousel-image w-full h-[150px] object-cover rounded-lg cursor-pointer shadow-md transition-transform transform hover:scale-105"
              onClick={() => openModal(index)}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          slides={slides}
          activeIndex={activeSlideIndex}
        />
      )}
    </div>
  );
});

export default Carousel;
