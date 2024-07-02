import { React } from 'react';
import { Link } from 'react-router-dom';
import boraBora from '../images/boraBora.jpg';

const WelcomePage = () => {
  return (
    <div className="home-content header-section scroll-section">
      <div className="home-text pad-3 object-center">
        <h1>
          Flight Specials Available <strong>Now</strong>
        </h1>
        <p>
          <em>Hundreds</em> of unique opportunities for flights across the
          globe.
          <br />
          Available only at Burning Airlines.
        </p>
        <p>
          <strong>Book your next holiday, blazingly fast!</strong>
        </p>
        <div>
          <Link to="book" className="booknow-link">
            <button className="p-2 rounded w-4 btn-book-home animate">
              Book now
            </button>
          </Link>
        </div>
      </div>
      <div className="home-image">
        <img src={boraBora} alt="desert oasis" />
      </div>
    </div>
  );
};

export default WelcomePage;
