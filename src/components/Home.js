import React from 'react';
import CarouselHome from './CarouselHome.js';

function Home(props) {
  return (
    <>
      <div className="greeting">
        <h1 className="greeting-welcome"> Welcome </h1>
      </div>
      <CarouselHome />
    </>
  );
}

export default Home;
