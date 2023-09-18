import React, { useEffect, useState } from 'react';
import plane2 from '../images/plane-img2.png';
import plane3 from '../images/plane4.jpg';
import plane4 from '../images/plane-img4.jpeg';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

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
  // <MDBCarousel fade delay={200}>
  //   <MDBCarouselItem
  //     className="w-100 d-block display"
  //     itemId={1}
  //     src={plane2}
  //     alt="..."
  //   />
  //   <MDBCarouselItem
  //     className="w-100 d-block display"
  //     itemId={2}
  //     src={plane4}
  //     alt="..."
  //   />
  //   <MDBCarouselItem
  //     className="w-100 d-block display"
  //     itemId={3}
  //     src={plane3}
  //     alt="..."
  //   />
  // </MDBCarousel>
);
