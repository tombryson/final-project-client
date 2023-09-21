import React, { useEffect, useState } from 'react';
import logo from '../images/BA-transp.png';
import { Outlet } from 'react-router-dom';

const SiteHead = () => {
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
      <Outlet />
    </div>
  );
};

export default SiteHead;
