import { useState } from 'react';
import { useOutletContext } from 'react-router-dom'
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
import Profile from './components/Profile.js';
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
import { ScrollSnapProvider, useScrollSnap } from './context/ScrollSnapContext.js';

const AppWrapper = ({ children }) => {
  const [authVisible, setAuthVisible] = useState(false);
  const { isScrollSnapEnabled } = useScrollSnap();
  const location = useLocation();

  const toggleAuthVisible = () => {
    setAuthVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className={`app-container ${isScrollSnapEnabled ? 'scroll-snap-enabled' : ''}`}>
      <div className={isScrollSnapEnabled ? 'scroll-section' : ''}>
        <SiteHead toggleAuth={toggleAuthVisible} authState={authVisible} />
        <Home />
        <div
          style={{
            opacity: authVisible ? 1 : 0,
            pointerEvents: authVisible ? 'auto' : 'none',
          }}
        >
          <Auth />
        </div>
        {location.pathname === '/' && <CarouselHome />}
        <Outlet context={{ toggleAuth: toggleAuthVisible }}/>
        <NavBar />
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
        <Route path="/book/flights/:id/confirmation" element={<Confirmation />} />
        <Route path="/book/flights/:id" element={<SeatMap />} />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<></>} />
      </Route>
    </Routes>
    </ScrollSnapProvider>
  </BrowserRouter>,
);
