import React, { useEffect, useState } from 'react';
import logo from '../images/BA-transp.png';
import { Outlet } from 'react-router-dom';

const SiteHead = () => {
  return (
    <div className="header">
      <img
        className="title-img"
        src={logo}
        width="350"
        alt="plane flying over logo"
      />
      <Outlet />
    </div>
  );
};

export default SiteHead;
