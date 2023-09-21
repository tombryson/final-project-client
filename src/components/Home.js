import React from 'react';
import { useLocation } from 'react-router-dom';
import CarouselHome from './CarouselHome.js';

function Home() {
  const location = useLocation();
  let message = 'Welcome';

  if (location.pathname === '/auth') {
    message = 'Welcome';
  } else if (location.pathname === '/profile') {
    message = 'My Profile';
  } else if (location.pathname === '/book') {
    message = 'Book';
  } else if (location.pathname === '/mytrips') {
    message = 'My Trips';
  }

  return (
    <>
      <div className="greeting">
        <h1 className="greeting-welcome">{message}</h1>
      </div>
      <CarouselHome />
    </>
  );
}

export default Home;
