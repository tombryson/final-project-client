import React from 'react';
import { Carousel } from 'react-bootstrap';
import plane2 from '../images/plane-img2.png';
import plane3 from '../images/plane4.jpg';
import plane4 from '../images/plane-img4.jpeg';

function ReactCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={plane2} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={plane3} alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={plane4} alt="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ReactCarousel;
