// src/components/common/VideoCarousel.js

import React, { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from './Modal';
import VideoPlayer from '../VideoPlayer';
import { CustomPrevArrow, CustomNextArrow } from './CustomArrows';
import 'swiper/css';
import 'swiper/css/navigation';
import { useSwipeable } from 'react-swipeable';
import { trackUserAction } from '../../utils/firebaseUtils';
import { useUser } from '../../UserContext';

const VideoCarousel = ({ videos = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const { userId } = useUser();

  const preloadAdjacentVideos = useCallback(() => {
    const preloadVideo = (index) => {
      const video = videos[index];
      if (video && video.videoUrl) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = video.videoUrl;
        link.as = 'video';
        document.head.appendChild(link);
      }
    };
    preloadVideo((activeVideoIndex + 1) % videos.length);
    preloadVideo((activeVideoIndex - 1 + videos.length) % videos.length);
  }, [activeVideoIndex, videos]);

  useEffect(() => {
    preloadAdjacentVideos();
  }, [activeVideoIndex, preloadAdjacentVideos]);

  const openModal = (index) => {
    setActiveVideoIndex(index);
    setIsModalOpen(true);
    trackUserAction(userId, `Opened video modal for video index: ${index}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    trackUserAction(userId, `Closed video modal for video index: ${activeVideoIndex}`);
  };

  const nextSlide = useCallback(() => {
    setActiveVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    trackUserAction(userId, `Navigated to next video: ${(activeVideoIndex + 1) % videos.length}`);
  }, [userId, activeVideoIndex, videos.length]);

  const previousSlide = useCallback(() => {
    setActiveVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    trackUserAction(userId, `Navigated to previous video: ${(activeVideoIndex - 1 + videos.length) % videos.length}`);
  }, [userId, activeVideoIndex, videos.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: previousSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!videos.length) return null;

  return (
    <div className="carousel-container p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto">
      <Swiper
        className="w-full"
        slidesPerView={3}
        spaceBetween={20}
        navigation={{
          nextEl: '.custom-arrow.slick-next',
          prevEl: '.custom-arrow.slick-prev',
        }}
        lazy={{ loadOnTransitionStart: true }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <img
              src={video.thumbnail}
              alt={video.alt || `Video ${index + 1}`}
              className="carousel-image aspect-w-16 aspect-h-9 object-cover rounded-md cursor-pointer shadow-md transform transition-transform hover:scale-105 dark:bg-gray-700"
              onClick={() => openModal(index)}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col items-center w-full h-full p-4" {...swipeHandlers}>
            <CustomPrevArrow onClick={previousSlide} />
            <VideoPlayer videoUrl={videos[activeVideoIndex].videoUrl} title={videos[activeVideoIndex].alt} className="w-full max-h-[80vh] object-contain" />
            <p className="mt-4 text-lg text-gray-900 dark:text-gray-100 text-center">
              {videos[activeVideoIndex].alt}
            </p>
            <CustomNextArrow onClick={nextSlide} />
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

export default VideoCarousel;
