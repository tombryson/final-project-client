import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import iconHome from '../images/home-icon.png';
import myTrips from '../images/trips-icon.png';
import myProfile from '../images/profile-icon.png';
import book2 from '../images/book-icon2.png';

const NavBar = () => {
  const navigate = useNavigate();
  const currentUserId = sessionStorage.getItem('currentUserId');

  const logOut = () => {
    sessionStorage.removeItem('currentUserId');
    navigate('/');
  };

  return (
    <div className="nav-bar">
      <div className="buttons-nav">
        <ul className="nav-bar-icons">
          <li className="nav-bar-icons">
            <div className="icon-text">
              Home
              <Link to="/">
                <img
                  className="nav-icon"
                  src={iconHome}
                  alt="a house"
                  width="50px"
                />
              </Link>
            </div>
          </li>
          {currentUserId ? (
            <>
              <li className="nav-bar-icons">
                <div className="icon-text" id="log-out" onClick={logOut}>
                  Log Out
                  <Link to="/">
                    <img
                      className="nav-icon"
                      src={myProfile}
                      alt="a portrait"
                      width="50px"
                    />
                  </Link>
                </div>
              </li>
              <li className="nav-bar-icons">
                <div className="icon-text">
                  Book
                  <Link to="/book">
                    <img
                      className="nav-icon"
                      src={book2}
                      alt="a plane"
                      width="50px"
                    />
                  </Link>
                </div>
              </li>
              <li className="nav-bar-icons">
                <div className="icon-text" id="my-trips">
                  Trips
                  <Link to="/mytrips">
                    <img
                      className="nav-icon"
                      src={myTrips}
                      alt="luggage"
                      width="50px"
                    />
                  </Link>
                </div>
              </li>
            </>
          ) : (
            <li className="nav-bar-icons">
              <div className="icon-text">
                Sign In
                <Link to="/auth">
                  <img
                    className="nav-icon"
                    src={myProfile}
                    alt="a portrait"
                    width="50px"
                  />
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
