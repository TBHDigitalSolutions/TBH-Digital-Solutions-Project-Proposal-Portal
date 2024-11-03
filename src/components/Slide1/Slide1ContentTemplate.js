// src/components/Slide1/Slide1ContentTemplate.js

import React from 'react';
import VideoPlayer from '../VideoPlayer'; // Corrected path
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging'; // Import logging function

const Slide1ContentTemplate = ({ data }) => {
  const { videoUrl } = data || {};

  const handleVideoPlay = () => {
    logEvent('view_video', { videoTitle: 'Proposal Overview Video', slide: 1 });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-off-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold font-aldrich text-dark-charcoal text-center mb-4">
        Proposal Overview Video
      </h2>
      <div className="w-full max-w-3xl">
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} title="Proposal Overview Video" onPlay={handleVideoPlay} />
        ) : (
          <p className="text-center text-red-500">No video available for this step.</p>
        )}
      </div>
    </div>
  );
};

// Wrap Slide1ContentTemplate with HOC for data fetching from content.json
export default withData(Slide1ContentTemplate, 'content.json', 1);
