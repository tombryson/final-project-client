import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './components/index.css';
import Auth from './components/Auth.js';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import Book from './components/Book.js';
import MyTrips from './components/MyTrips.js';
import NavBar from './components/NavBar.js';
import SeatMap from './components/SeatMap.js';
import SiteHead from './components/SiteHead.js';
import CarouselHome from './components/CarouselHome.js';
import ReactCarousel from './components/ReactCarousel.js';

const AppWrapper = ({ children }) => (
  <>
    <SiteHead />
    {/* <ReactCarousel /> */}
    <Outlet />
    <NavBar />
    {children}
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppWrapper />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="book" element={<Book />} />
        <Route path="mytrips" element={<MyTrips />} />
        <Route path="*" element={<Home />} />
        <Route path="flights/:id" element={<SeatMap />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
