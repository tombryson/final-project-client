import React from 'react';

const WelcomePage = () => {
  return (
    <div className="home-content header-section scroll-section">
      <div className="home-text p-4 object-center">
        <h1>Flight Specials Available Now</h1>
        <p>
          Hundreds of unique opportunities for flights across the globe.
          Available only at Burning Airlines.
        </p>
        <p>
          <strong>Book your next holiday, blazingly fast!</strong>
        </p>
      </div>
      <div className="home-image">
        <img src="http://www.placekitten.com/500/500" alt="young cat" />
      </div>
    </div>
  );
};

export default WelcomePage;
