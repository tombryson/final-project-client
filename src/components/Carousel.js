import React from 'react';
// import bootstrap from 'bootstrap';
import plane2 from '../images/plane-img2.png';
import plane3 from '../images/plane4.jpg';
import plane4 from '../images/plane-img4.jpeg';

export default function Carousel() {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-touch="false"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={plane2} className="d-block w-100" alt="..."></img>
        </div>
        <div className="carousel-item">
          <img src={plane3} className="d-block w-100" alt="..."></img>
        </div>
        <div className="carousel-item">
          <img src={plane4} className="d-block w-100" alt="..."></img>
        </div>
      </div>
    </div>
  );
}
