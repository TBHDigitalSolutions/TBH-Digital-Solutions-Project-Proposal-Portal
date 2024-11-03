// src/components/Slide3/Slide3ContentTemplate.js

import React, { useState } from 'react';
import Carousel from '../common/Carousel';
import VideoPlayer from '../VideoPlayer';
import VideoCarousel from '../common/VideoCarousel';
import swiperConfig from '../../config/swiperConfig';
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide3ContentTemplate = ({ data }) => {
  const { userId } = useUser(); // Retrieve userId from context
  const [activeAccordion, setActiveAccordion] = useState('imageCarousel');

  // Destructuring data
  const { title, description, videoUrl, slides, crmVideos } = data || {};

  // Toggle accordion functionality with logging
  const toggleAccordion = (type) => {
    setActiveAccordion((prev) => {
      const newType = prev === type ? '' : type;
      logEvent('toggle_accordion', { userId, slide: 3, accordionType: newType }); // Log accordion toggle with userId
      return newType;
    });
  };

  // Main video play logging
  const handleMainVideoPlay = () => {
    logEvent('play_main_video', { userId, slide: 3, videoTitle: title }); // Log main video play with userId
  };

  if (!data) return <div className="text-center text-logo-blue">Loading...</div>;

  return (
    <div className="p-6 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-[90%] mx-auto mt-6 flex flex-col justify-center items-center">
      
      {/* Title and Description */}
      <h2 className="text-3xl font-aldrich font-bold text-center text-soft-black mb-2 drop-shadow-lg">{title}</h2>
      {description && <p className="text-lg font-newsreader text-center text-text-dark dark:text-text-light mb-4">{description}</p>}

      {/* Main Video Player */}
      <div className="mb-6 flex justify-center">
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} title={title} onPlay={handleMainVideoPlay} />
        ) : (
          <p className="text-center text-gray-500">No main video available for this step.</p>
        )}
      </div>

      {/* Accordion Toggles */}
      <div className="flex space-x-4 justify-center mb-4">
        <button
          onClick={() => toggleAccordion('imageCarousel')}
          className={`w-[200px] text-center font-aldrich font-bold p-2 rounded-lg shadow-lg transition duration-200 ease-in-out  
            ${activeAccordion === "imageCarousel" ? "bg-logo-blue text-soft-black" : "bg-light-grey text-soft-black dark:bg-dark-charcoal dark:text-off-white"}`}
        >
          Image Carousel
        </button>
        <button
          onClick={() => toggleAccordion('videoCarousel')}
          className={`w-[200px] text-center font-aldrich font-bold p-2 rounded-lg shadow-lg transition duration-200 ease-in-out 
            ${activeAccordion === 'videoCarousel' ? 'bg-logo-blue text-soft-black' : 'bg-light-grey text-soft-black dark:bg-dark-charcoal dark:text-off-white'}`}
        >
          CRM Video Examples
        </button>
      </div>

      {/* Accordion Content */}
      <div className="w-full mb-[3.75%]">
        {activeAccordion === "imageCarousel" && slides?.length > 0 && (
          <div className="w-full shadow-lg flex justify-center">
            <Carousel
              slides={slides}
              swiperConfig={swiperConfig}
              thumbnailSize={{ width: '100%', height: 'auto' }}
              onImageClick={(index) => logEvent('view_image_carousel', { userId, slide: 3, imageIndex: index })} // Log image carousel interactions with userId
            />
          </div>
        )}

        {activeAccordion === 'videoCarousel' && crmVideos?.length > 0 && (
          <div className="w-full shadow-lg mt-4">
            <VideoCarousel 
              videos={crmVideos} 
              logEvent={(index) => logEvent('view_video_carousel', { userId, slide: 3, videoIndex: index })} // Log video carousel interactions with userId
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap Slide3ContentTemplate with HOC for data fetching from content.json
export default withData(Slide3ContentTemplate, 'content.json', 3);
