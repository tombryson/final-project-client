import React from 'react';
import { useLocation } from 'react-router-dom';
import CarouselHome from './CarouselHome.js';

function Home() {
  const location = useLocation();
  const showCarousel = location.pathname !== '/book';
  let message = 'Welcome';

  if (location.pathname === '/auth') {
    message = 'Welcome';
  } else if (location.pathname === '/profile') {
    message = 'My Profile';
  } else if (location.pathname === '/book') {
    message = 'Search';
  } else if (location.pathname === '/mytrips') {
    message = 'My Trips';
  }

  return (
    <>
      <div className="greeting">
        <h1 className="greeting-welcome">{message}</h1>
      </div>
      <div className="carousel__container">
        {showCarousel && <CarouselHome />}
      </div>
    </>
  );
}

export default Home;
