// src/components/Slide4/Slide4ContentTemplate.js

import React, { useState, useEffect } from 'react';
import Carousel from '../common/Carousel';
import VideoPlayer from '../VideoPlayer';
import VideoCarousel from '../common/VideoCarousel';
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide4ContentTemplate = ({ data }) => {
  const { userId } = useUser(); // Retrieve userId from context
  const [activeAccordion, setActiveAccordion] = useState('imageCarousel');

  // Destructure data properties
  const { title, description, videoUrl, imageCarousel, videoCarousel } = data || {};

  // Toggle accordion and log which accordion is viewed
  const toggleAccordion = (type) => {
    if (activeAccordion !== type) {
      logEvent('view_accordion', { userId, accordionType: type, slide: 4 });
    }
    setActiveAccordion((prev) => (prev === type ? '' : type));
  };

  // Log main video play event
  const handleVideoPlay = () => {
    logEvent('play_main_video', { userId, title, slide: 4 });
  };

  // Log image carousel and video carousel interactions
  const handleImageCarouselClick = (index) => {
    logEvent('view_image_carousel_slide', { userId, slide: 4, imageIndex: index });
  };

  const handleVideoCarouselPlay = (index) => {
    logEvent('play_video_carousel_slide', { userId, slide: 4, videoIndex: index });
  };

  // Log page load event for analytics
  useEffect(() => {
    logEvent('view_page', { userId, page: 'Slide 4' });
  }, [userId]);

  if (!data) return <div className="text-center text-logo-blue">Loading...</div>;

  return (
    <div className="p-6 bg-off-white dark:bg-soft-black rounded-lg shadow-lg max-w-[90%] mx-auto mt-6 flex flex-col justify-center items-center">
      
      {/* Title and Description */}
      <h2 className="text-3xl font-aldrich font-bold text-center text-soft-black mb-2 drop-shadow-lg">{title}</h2>
      {description && <p className="text-lg font-newsreader text-center text-text-dark dark:text-text-light mb-4">{description}</p>}

      {/* Main Video Player */}
      <div className="mb-6 flex justify-center">
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} title={title} onPlay={handleVideoPlay} />
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
            ${activeAccordion === 'videoCarousel' ? 'bg-logo-blue text-soft-black' : "bg-light-grey text-soft-black dark:bg-dark-charcoal dark:text-off-white"}`}
        >
          Video Examples
        </button>
      </div>

      {/* Accordion Content */}
      <div className="w-full mb-[3.75%]">
        {activeAccordion === 'imageCarousel' && imageCarousel?.length > 0 && (
          <div className="w-full flex justify-center">
            <Carousel
              slides={imageCarousel}
              onImageClick={handleImageCarouselClick} // Log each image click in the carousel
            />
          </div>
        )}

        {activeAccordion === 'videoCarousel' && videoCarousel?.length > 0 && (
          <div className="w-full mt-4">
            <VideoCarousel
              videos={videoCarousel}
              onVideoPlay={handleVideoCarouselPlay} // Log each video play in the carousel
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap Slide4ContentTemplate with HOC for data fetching from content.json
export default withData(Slide4ContentTemplate, 'content.json', 4);
