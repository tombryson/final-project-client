import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollSnap } from '../../context/ScrollSnapContext.js';

function Home({ fontSize, isScrolling }) {
  const location = useLocation();
  const showCarousel = location.pathname === '/';
  const { setIsScrollSnapEnabled } = useScrollSnap();
  let message = '';
  let showBanner = false;

  useEffect(() => {
    setIsScrollSnapEnabled(location.pathname === '/');
  }, [location.pathname, setIsScrollSnapEnabled]);

  if (location.pathname === '/auth' || location.pathname === '/') {
    message = 'Welcome';
    showBanner = true;
  } else if (location.pathname === '/profile') {
    message = 'Profile';
    showBanner = true;
  } else if (location.pathname === '/book') {
    message = 'Where to?';
    showBanner = true;
  } else if (location.pathname === '/mytrips') {
    message = 'My Flights';
    showBanner = true;
  }

  return (
    <>
      {showBanner && (
        <div
          className={
            message === 'Where to?' ? 'greeting greeting-opaque' : 'greeting'
          }
        >
          <h1
            className={`greeting-welcome ${
              isScrolling ? 'greeting-transition' : ''
            }`}
            style={{ fontSize: `${fontSize}rem` }}
          >
            {message}
          </h1>
        </div>
      )}
    </>
  );
}

export default Home;
