import React from 'react';
import CarouselHome from './CarouselHome.js';

const MemoizedCarouselHome = React.memo(CarouselHome);

function CarouselComponent() {
  return (
    <div className="carousel__container">
      <MemoizedCarouselHome />
    </div>
  );
}

export default CarouselComponent;
