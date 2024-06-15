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
import CarouselComponent from './components/CarouselComponent.js';
import CarouselHome from './components/CarouselHome.js';

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
        {location.pathname !== '/book' && <CarouselHome />}
        <Outlet />
        <NavBar />
      </div>
      {location.pathname !== '/book' && <WelcomePage />}
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
        <Route path="flights/:id" element={<SeatMap />} />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<></>} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
