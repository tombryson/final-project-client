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
import WelcomePage from './components/WelcomePage.js';
import TestComponent from './components/TestComponent.js';

const AppWrapper = () => (
  <div className="app-container">
    <div className="scroll-section">
      <SiteHead />
      <Outlet />
      <Home page={'Welcome'} />
      <NavBar />
    </div>
    <WelcomePage />
    {/* <TestComponent /> */}
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppWrapper />}>
        <Route index element={<></>} />
        <Route path="auth" element={<Auth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="book" element={<Book />} />
        <Route path="mytrips" element={<MyTrips />} />
        <Route path="*" element={<></>} />
        <Route path="flights/:id" element={<SeatMap />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
