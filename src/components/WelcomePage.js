import { React } from 'react';
import { Link } from 'react-router-dom';
import boraBora from '../images/boraBora.jpg';

const WelcomePage = () => {
  return (
    <div className="home-content header-section scroll-section">
      <div className="home-text p-4 object-center">
        <h1>
          Flight Specials Available <strong>Now</strong>
        </h1>
        <p>
          Hundreds of unique opportunities for flights across the globe.
          Available only at Burning Airlines.
        </p>
        <p>
          <strong>Book your next holiday, blazingly fast!</strong>
        </p>
        <Link to="book">
          <div>
            <button className="p-2 rounded w-4">Book now</button>
          </div>
        </Link>
      </div>
      <div className="home-image">
        <img src={boraBora} alt="desert oasis" />
      </div>
    </div>
  );
};

export default WelcomePage;
