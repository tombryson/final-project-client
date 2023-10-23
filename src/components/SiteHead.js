import React, { useEffect, useState } from 'react';
import logo from '../images/BA-transp.png';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import buttonStyles from './buttonStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const SiteHead = () => {
  const navigate = useNavigate();
  const currentUserId = sessionStorage.getItem('currentUserId');
  const [directions, setDirections] = useState({});

  const handleMouseEnter = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let dir;

    if (e.clientX - rect.left < rect.width / 2) {
      dir = 'left-to-right';
    } else {
      dir = 'right-to-left';
    }

    setDirections((prevDirections) => ({
      ...prevDirections,
      [id]: dir,
    }));
  };

  const handleMouseLeave = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let dir;

    if (e.clientX - rect.left < rect.width / 2) {
      dir = 'left-to-right';
    } else {
      dir = 'right-to-left';
    }

    setDirections((prevDirections) => ({
      ...prevDirections,
      [id]: dir,
    }));
  };

  const logOut = () => {
    sessionStorage.removeItem('currentUserId');
    navigate('/');
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="title-img"
          src={logo}
          width="350"
          alt="plane flying over logo"
        />
      </div>
      <div className="button-container">
        <Link className="header-button" to="/">
          <button
            id="leftmost-button"
            className={`nav-button ${directions['home']}`}
            onMouseOver={(e) => handleMouseEnter(e, 'home')}
            onMouseOut={(e) => handleMouseLeave(e, 'home')}
          >
            Home
          </button>
        </Link>

        {currentUserId ? (
          <>
            <button>Sign Out</button>
            <button>My Trips</button>
          </>
        ) : (
          <Link className="header-button" to="book">
            <button
              className={`nav-button ${directions['sign-in']}`}
              onMouseOver={(e) => handleMouseEnter(e, 'sign-in')}
              onMouseOut={(e) => handleMouseLeave(e, 'sign-in')}
            >
              Book
            </button>
          </Link>
        )}
        <Link className="header-button" to="/">
          <button
            className={`nav-button ${directions['contact']}`}
            onMouseOver={(e) => handleMouseEnter(e, 'contact')}
            onMouseOut={(e) => handleMouseLeave(e, 'contact')}
          >
            Contact
          </button>
        </Link>
        <Link className="header-button profile-img" to="auth">
          <button
            className={`nav-button ${directions['O']}`}
            onMouseOver={(e) => handleMouseEnter(e, 'O')}
            onMouseOut={(e) => handleMouseLeave(e, 'O')}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SiteHead;
