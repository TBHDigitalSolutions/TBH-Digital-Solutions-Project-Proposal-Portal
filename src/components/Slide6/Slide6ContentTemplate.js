// src/components/Slide6/Slide6ContentTemplate.js

import React, { useEffect } from 'react';
import VideoPlayer from '../VideoPlayer';
import withData from '../../hoc/withData'; // Higher-order component for data fetching
import { logEvent } from '../firebaseLogging'; // Import the logging function
import { useUser } from '../../UserContext'; // Import useUser for userId

const Slide6ContentTemplate = ({ data }) => {
  const { userId } = useUser(); // Retrieve userId from context

  // Destructure videoUrl from the fetched data
  const { videoUrl } = data || {};

  // Log page view on component mount
  useEffect(() => {
    if (userId) {
      logEvent('view_page', { page: 'Slide 6 Content', userId });
    }
  }, [userId]);

  // Handle video play logging
  const handleVideoPlay = () => {
    logEvent('play_video', { page: 'Slide 6 Content', videoTitle: 'Project Overview Video', userId });
  };

  // Log missing video if videoUrl is absent
  useEffect(() => {
    if (!videoUrl && userId) {
      logEvent('missing_video', { page: 'Slide 6 Content', message: 'No video available for this step.', userId });
    }
  }, [videoUrl, userId]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-off-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold font-aldrich text-dark-charcoal text-center mb-4">
        Project Overview Video
      </h2>
      <div className="w-full max-w-3xl">
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} title="Project Overview Video" onPlay={handleVideoPlay} />
        ) : (
          <p className="text-center text-red-500">No video available for this step.</p>
        )}
      </div>
    </div>
  );
};

// Wrap Slide6ContentTemplate with HOC for data fetching from content.json
export default withData(Slide6ContentTemplate, 'content.json', 6);
