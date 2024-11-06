// src/components/VideoPlayer.js

import React, { useRef, useEffect, useState } from 'react';
import { trackUserAction } from '../utils/firebaseUtils';
import { useUser } from '../UserContext';

const VideoPlayer = ({ videoUrl, title, aspectRatio = '16:9', autoPlay = true }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useUser();

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedData = () => {
      setIsLoaded(true);
      trackUserAction(userId, `Loaded video: ${title}`);
    };

    const handleError = () => {
      setError('Video failed to load.');
      trackUserAction(userId, `Error loading video: ${title}`);
    };

    const handlePlay = () => {
      trackUserAction(userId, `Played video: ${title}`);
    };

    const handlePause = () => {
      trackUserAction(userId, `Paused video: ${title}`);
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, [userId, title]);

  const aspectClass = aspectRatio === '1:1' ? 'w-[300px] h-[300px]' : 'w-full max-h-[70vh]';

  return (
    <div className={`video-player-container flex justify-center items-center ${aspectClass} bg-gray-900 p-4 rounded-lg shadow-lg`}>
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
          autoPlay={autoPlay}
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
