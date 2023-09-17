import React, { useEffect, useState } from 'react';
import plane2 from '../images/plane-img2.png';
import plane3 from '../images/plane4.jpg';
import plane4 from '../images/plane-img4.jpeg';
import { Carousel } from 'react-bootstrap';

export default function CarouselHome() {
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);

  useEffect(() => {
    if (document.querySelector('.carousel')) {
      setIsCarouselVisible(true);
    }
  }, []);

  return (
    <div className="carousel">{isCarouselVisible && deployCarousel()}</div>
  );
}

const deployCarousel = () => (
  <Carousel controls={false} pause={false} indicators={false} fade>
    <Carousel.Item interval={6000}>
      <img
        className="d-block w-100 display"
        itemID={1}
        src={plane2}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item interval={6000}>
      <img
        className="d-block w-100 display"
        itemID={2}
        src={plane4}
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item interval={6000}>
      <img
        className="d-block w-100 display"
        itemID={3}
        src={plane3}
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
);
