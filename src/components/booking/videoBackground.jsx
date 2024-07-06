import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './../App.css';

const VideoBackground = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    require('../../video/snow2-male-skier-skiing-downhill.webm'),
    require('../../video/snow3-slow-motion-cinematic-ski-slopes.webm'),
    require('../../video/beach1-tropical-ocean.webm'),
  ];

  useEffect(() => {
    function randomiseVideo(videos) {
      setSelectedVideo(videos[Math.floor(Math.random() * videos.length)]);
    }

    randomiseVideo(videos);
  }, [videos]);

  return (
    <div>
      {selectedVideo && (
        <video autoPlay muted loop className="background-video">
          <source src={selectedVideo} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoBackground;
