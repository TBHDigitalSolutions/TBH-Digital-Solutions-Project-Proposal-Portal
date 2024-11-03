// src/components/VideoPlayer.js

import React, { useRef, useEffect, useState } from 'react';
import { trackUserAction } from '../utils/firebaseUtils';
import { useUser } from '../UserContext';

const VideoPlayer = ({ videoUrl, title }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useUser(); // Access userId from UserContext

  useEffect(() => {
    const videoElement = videoRef.current;

    // Track when video is successfully loaded
    const handleLoadedData = () => {
      setIsLoaded(true);
      trackUserAction(userId, `Loaded video: ${title}`);
    };

    // Track errors during video loading
    const handleError = () => {
      setError('Video failed to load.');
      trackUserAction(userId, `Error loading video: ${title}`);
    };

    // Track when video starts playing
    const handlePlay = () => {
      trackUserAction(userId, `Played video: ${title}`);
    };

    // Track when video is paused
    const handlePause = () => {
      trackUserAction(userId, `Paused video: ${title}`);
    };

    // Attach event listeners to the video element
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    // Cleanup event listeners on component unmount
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, [userId, title]);

  return (
    <div className="video-player-container flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg shadow-lg">
      {error ? (
        <div className="video-error-message text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          title={title}
          controls
          autoPlay
          muted
          loop
          playsInline
          className="video-player w-full h-auto rounded-lg shadow-md"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
