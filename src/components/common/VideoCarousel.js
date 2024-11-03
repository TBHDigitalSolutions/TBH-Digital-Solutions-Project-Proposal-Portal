// src/components/common/VideoCarousel.js

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwipeable } from 'react-swipeable';
import Modal from './Modal';
import VideoPlayer from '../VideoPlayer';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { trackUserAction } from '../../utils/firebaseUtils';
import { useUser } from '../../UserContext';

const VideoCarousel = ({ videos = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const { userId } = useUser(); // Access userId from context

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isModalOpen]);

  const openModal = async (index) => {
    setActiveVideoIndex(index);
    setIsModalOpen(true);
    await trackUserAction(userId, `Opened video modal`, { videoIndex: index });
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    await trackUserAction(userId, `Closed video modal`, { videoIndex: activeVideoIndex });
  };

  const nextSlide = async () => {
    const newIndex = (activeVideoIndex + 1) % videos.length;
    setActiveVideoIndex(newIndex);
    await trackUserAction(userId, `Navigated to next video`, { videoIndex: newIndex });
  };

  const previousSlide = async () => {
    const newIndex = (activeVideoIndex - 1 + videos.length) % videos.length;
    setActiveVideoIndex(newIndex);
    await trackUserAction(userId, `Navigated to previous video`, { videoIndex: newIndex });
  };

  const handlePlayVideo = async () => {
    await trackUserAction(userId, `Played video`, { videoIndex: activeVideoIndex });
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: previousSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!videos.length) return null;

  return (
    <div className="carousel-container p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto">
      <Swiper className="w-full" slidesPerView={4} spaceBetween={10}>
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <img
              src={video.thumbnail}
              alt={video.alt || `Video ${index + 1}`}
              className="carousel-image w-[150px] h-[150px] object-cover rounded-lg cursor-pointer shadow-md transition-transform transform hover:scale-105 dark:bg-gray-700"
              onClick={() => openModal(index)}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for Video Playback */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col items-center w-full h-full p-4" {...swipeHandlers}>
            <button
              onClick={previousSlide}
              className="absolute left-4 text-logo-blue hover:text-darker-blue transition-colors"
              disabled={activeVideoIndex === 0}
            >
              &lt; {/* Previous Arrow */}
            </button>

            <VideoPlayer
              videoUrl={videos[activeVideoIndex].videoUrl}
              title={videos[activeVideoIndex].alt}
              onPlay={handlePlayVideo} // Track video play
            />
            <p className="mt-4 text-lg text-gray-900 dark:text-gray-100 text-center">
              {videos[activeVideoIndex].alt}
            </p>

            <button
              onClick={nextSlide}
              className="absolute right-4 text-logo-blue hover:text-darker-blue transition-colors"
              disabled={activeVideoIndex === videos.length - 1}
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

export default VideoCarousel;
