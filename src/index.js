import API_URL from './api.js';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';
import './components/index.css';
import Auth from './components/signIn/Auth.js';
import Home from './components/home/Home.js';
import Book from './components/booking/Book.js';
import MyFlights from './components/MyFlights.js';
import NavBar from './components/NavBar.js';
import SeatMap from './components/flight/SeatMap.js';
import Contact from './components/contact/contact.js';
import SiteHead from './components/SiteHead.js';
import WelcomePage from './components/home/WelcomePage.js';
import Confirmation from './components/confirmation/confirmation.js';
import CarouselHome from './components/home/CarouselHome.js';
import DealsCallout from './components/home/DealsCallout.js';
import Profile from './components/profile/UserProfile.js';
import {
  ScrollSnapProvider,
  useScrollSnap,
} from './context/ScrollSnapContext.js';

const AppWrapper = ({ children }) => {
  const [authVisible, setAuthVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(sessionStorage.getItem('currentUserId'));
  const [fontSize, setFontSize] = useState(4.4);
  const [isScrolling, setIsScrolling] = useState(true);
  const { isScrollSnapEnabled } = useScrollSnap();
  const location = useLocation();

  const handleLogin = (user) => {
    sessionStorage.setItem('currentUserId', user.id.toString());
    setCurrentUserId(user.id.toString());
    setAuthVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('currentUserId');
    setCurrentUserId(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      handleLogout();
      return;
    }
    fetch(`${API_URL}/auto_login`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const user = response.ok ? await response.json() : null;
        if (localStorage.getItem('token') !== token) return;
        if (response.status === 401) {
          handleLogout();
          return;
        }
        if (user) handleLogin(user);
      })
      .catch(() => {});
  }, []);

  const toggleAuthVisible = () => {
    setAuthVisible((prevVisible) => !prevVisible);
  };

  return (
    <div
      className={`app-container ${
        isScrollSnapEnabled ? 'scroll-snap-enabled' : ''
      }`}
    >
      <div className={isScrollSnapEnabled ? 'scroll-section' : ''}>
        <SiteHead toggleAuth={toggleAuthVisible} authState={authVisible} currentUserId={currentUserId} />
        <Home fontSize={fontSize} isScrolling={isScrolling} />
        {authVisible && location.pathname !== '/auth' && <Auth onLogin={handleLogin} />}
        {location.pathname === '/' && <CarouselHome />}
        <Outlet context={{ toggleAuth: toggleAuthVisible, setFontSize, currentUserId, onLogin: handleLogin, onLogout: handleLogout }} />
        <NavBar currentUserId={currentUserId} onLogout={handleLogout} />
        {location.pathname === '/' && <DealsCallout />}
      </div>
      {location.pathname === '/' && <WelcomePage />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollSnapProvider>
      <Routes>
        <Route path="/" element={<AppWrapper />}>
          <Route index element={<></>} />
          <Route path="profile" element={<Profile />} />
          <Route path="book" element={<Book />} />
          <Route path="myflights" element={<MyFlights />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="/book/flights/:id/confirmation"
            element={<Confirmation />}
          />
          <Route path="/book/flights/:id" element={<SeatMap />} />
          <Route path="auth" element={<Auth />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </ScrollSnapProvider>
  </BrowserRouter>,
);
