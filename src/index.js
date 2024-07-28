import { useState } from 'react';
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
import MyTrips from './components/MyTrips.js';
import NavBar from './components/NavBar.js';
import SeatMap from './components/flight/SeatMap.js';
import SiteHead from './components/SiteHead.js';
import WelcomePage from './components/home/WelcomePage.js';
import CarouselComponent from './components/home/CarouselComponent.js';
import CarouselHome from './components/home/CarouselHome.js';
import DealsCallout from './components/home/DealsCallout.js';

const AppWrapper = ({ children }) => {
  const [authVisible, setAuthVisible] = useState(false);
  const location = useLocation();

  const toggleAuthVisible = () => {
    setAuthVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="app-container">
      <div className="scroll-section">
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
        <Outlet />
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
    <Routes>
      <Route path="/" element={<AppWrapper />}>
        <Route index element={<></>} />
        <Route path="profile" element={<Profile />} />
        <Route path="book" element={<Book />} />
        <Route path="mytrips" element={<MyTrips />} />
        <Route path="/book/flights/:id" element={<SeatMap />} />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<></>} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
