// src/components/Slide7/Slide7VideoTemplate.js

import React from 'react';
import VideoPlayer from '../VideoPlayer';
import withData from '../../hoc/withData';
import { logEvent } from '../firebaseLogging';
import { useUser } from '../../UserContext';

const Slide7VideoTemplate = ({ data }) => {
  const { userId } = useUser(); // Retrieve userId from context
  const { videoUrl } = data || {}; // Destructure videoUrl from data

  // Handle video play and log event with userId
  const handleVideoPlay = () => {
    logEvent('play_video', { step: 7, videoUrl, userId });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-off-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold font-aldrich text-dark-charcoal text-center mb-4">
        Download Proposal PDF: Andover Eye Institute
      </h2>
      <div className="w-full max-w-3xl">
        {videoUrl ? (
          <VideoPlayer 
            videoUrl={videoUrl} 
            title="Download Proposal PDF: Andover Eye Institute" 
            onPlay={handleVideoPlay} 
          />
        ) : (
          <p className="text-center text-red-500">No video available for this step.</p>
        )}
      </div>
    </div>
  );
};

// Wrap Slide7VideoTemplate with HOC for data fetching from content.json
export default withData(Slide7VideoTemplate, 'content.json', 7);
