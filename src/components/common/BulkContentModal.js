// src/components/BulkContentCarousel.js

import React, { useState } from 'react';
import VideoPlayer from '../VideoPlayer'; // Adjust if needed
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BulkContentCarousel = ({ contentItems }) => {
  const [activeContent, setActiveContent] = useState(contentItems[0]);
  
  const handleThumbnailClick = (item) => {
    setActiveContent(item);
  };

  const isVideo = !!activeContent.videoUrl;
  const isPdf = activeContent.pdfUrl || activeContent.endsWith('.pdf');

  return (
    <div className="bulk-content-carousel flex flex-col space-y-4">
      {/* Main Content View */}
      <div className="main-view flex-grow mb-4">
        {isVideo ? (
          <VideoPlayer videoUrl={activeContent.videoUrl} title={activeContent.alt || 'Video'} />
        ) : isPdf ? (
          <div className="pdf-viewer overflow-y-scroll" style={{ height: '500px' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
              <Viewer fileUrl={activeContent.pdfUrl || activeContent} />
            </Worker>
          </div>
        ) : (
          <img
            src={activeContent.image || activeContent.thumbnail}
            alt={activeContent.alt || 'Image content'}
            className="w-full h-auto object-contain rounded-lg"
          />
        )}
      </div>

      {/* Thumbnail Carousel */}
      <div className="thumbnail-slider mt-4">
        <Swiper slidesPerView={4} spaceBetween={10}>
          {contentItems.map((item, index) => (
            <SwiperSlide key={index} onClick={() => handleThumbnailClick(item)}>
              <img
                src={item.thumbnail || '/path/to/default-thumbnail.png'}
                alt={item.alt || `Content ${index + 1}`}
                className="cursor-pointer rounded-lg object-cover w-full h-[100px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BulkContentCarousel;
