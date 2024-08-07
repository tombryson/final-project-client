import React from 'react';
import { useLocation } from 'react-router-dom';

function Home(authVisible) {
  const location = useLocation();
  const showCarousel = location.pathname === '/';
  let message = 'Welcome';

  if (location.pathname === '/auth' || location.pathname === '/') {
    message = 'Welcome';
  } else if (location.pathname === '/profile') {
    message = 'My Profile';
  } else if (location.pathname === '/book') {
    message = 'Where to?';
  } else if (location.pathname === '/mytrips') {
    message = 'My Trips';
  } else {
    message = '';
  }

  return (
    <>
      <div
        className={
          message === 'Where to?' ? 'greeting greeting-opaque' : 'greeting'
        }
      >
        <h1 className="greeting-welcome">{message}</h1>
      </div>
    </>
  );
}

export default Home;
