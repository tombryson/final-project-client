import React from 'react';
import plane1 from '../images/plane-img1.jpeg'
import plane2 from '../images/plane-img2.png'
import plane3 from '../images/plane-img3.jpeg'
import plane4 from '../images/plane-img4.jpeg'
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function CarouselHome() {
  return (
    <MDBCarousel>
      <MDBCarouselItem
        className='w-100 d-block display'
        itemId={1}
        src={plane2}
        alt='...'
      />
      <MDBCarouselItem
        className='w-100 d-block display'
        itemId={2}
        src={plane4}
        alt='...'
      />
      <MDBCarouselItem
        className='w-100 d-block display'
        itemId={3}
        src={plane3}
        alt='...'
      />
    </MDBCarousel>
  );
}