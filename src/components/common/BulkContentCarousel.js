// src/components/common/BulkContentCarousel.js

// src/components/common/BulkContentCarousel.js

import React, { useState, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BulkContentCarousel = ({ contentItems = [] }) => {
  const [activeContent, setActiveContent] = useState(null);

  useEffect(() => {
    // Set the first content item as active if contentItems is available
    if (contentItems.length > 0) {
      setActiveContent(contentItems[0]);
    }
  }, [contentItems]);

  const handleThumbnailClick = (item) => setActiveContent(item);

  // Determine content type
  const isVideo = activeContent && !!activeContent.videoUrl;
  const isPdf = activeContent && !!activeContent.pdfUrl;

  const videoAspectClass = isVideo
    ? activeContent.aspectRatio === '1x1'
      ? 'aspect-square'
      : 'aspect-video'
    : '';

  return (
    <div className="bulk-content-carousel flex flex-col space-y-4 h-full">
      {/* Main Content Display */}
      <div className="main-view max-h-[70vh] overflow-hidden rounded-lg p-4 bg-gray-900 flex justify-center items-center">
        {activeContent ? (
          isVideo ? (
            <div className={`video-container ${videoAspectClass} w-full h-full`}>
              <VideoPlayer videoUrl={activeContent.videoUrl} title={activeContent.alt || 'Video'} />
            </div>
          ) : isPdf ? (
            <div className="pdf-viewer overflow-auto w-full h-full rounded-lg">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <Viewer fileUrl={activeContent.pdfUrl} />
              </Worker>
            </div>
          ) : (
            <img
              src={activeContent.image || activeContent.thumbnail}
              alt={activeContent.alt || 'Image content'}
              className="object-contain w-full h-full rounded-lg"
            />
          )
        ) : (
          <p className="text-center text-white">No content available.</p>
        )}
      </div>

      {/* Unified Thumbnail Carousel for Videos and PDFs */}
      {contentItems.length > 0 ? (
        <div className="thumbnail-slider mt-4 px-2">
          <Swiper
            slidesPerView={Math.min(5, contentItems.length)}
            spaceBetween={10}
            centeredSlides={false}
            loop={false}
            modules={[Navigation, Pagination, Mousewheel]}
            navigation
            pagination={{ clickable: true }}
          >
            {contentItems.map((item, index) => (
              <SwiperSlide key={index} onClick={() => handleThumbnailClick(item)}>
                <img
                  src={item.thumbnail || '/path/to/default-thumbnail.png'}
                  alt={item.alt || `Content ${index + 1}`}
                  className="cursor-pointer rounded-lg object-cover w-[80px] h-[80px] shadow-md border border-gray-300"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-white mt-4">No thumbnails available.</p>
      )}
    </div>
  );
};

export default BulkContentCarousel;
