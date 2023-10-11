import React, { useEffect, useState } from 'react';
import logo from '../images/BA-transp.png';
import { Outlet, useNavigate } from 'react-router-dom';

const SiteHead = () => {
  const navigate = useNavigate();
  const currentUserId = sessionStorage.getItem('currentUserId');

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
        <button>Home</button>
        {currentUserId ? (
          <>
            <button>Sign Out</button>
            <button>My Trips</button>
          </>
        ) : (
          <button>Sign In</button>
        )}
        <button>Contact</button>
      </div>
    </div>
  );
};

export default SiteHead;
