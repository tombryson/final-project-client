import React from 'react';
import './App.css';

const VideoBackground = () => {
  return (
    <video autoPlay muted loop className="background-video">
      <source
        src={require('../video/snow2-male-skier-skiing-downhill.webm')}
        type="video/webm"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
