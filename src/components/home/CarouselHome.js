import React, { useEffect, useState } from 'react';
import plane5 from '../../images/plane-img5.png';
import plane3 from '../../images/plane4.jpg';
import plane2 from '../../images/plane-img2.png';
import { Carousel } from 'react-bootstrap';

export default function CarouselHome() {
  return (
    <Carousel controls={false} pause={false} indicators={false} fade>
      <Carousel.Item interval={8000}>
        <img
          className="d-block w-100 display"
          itemID={1}
          src={plane2}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={8000}>
        <img
          className="d-block w-100 display"
          itemID={2}
          src={plane5}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={8000}>
        <img
          className="d-block w-100 display"
          itemID={3}
          src={plane3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
