import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './components/index.css';
import Auth from './components/Auth'
import Home from './components/Home'
import Profile from './components/Profile'
import Book from './components/Book'
import MyTrips from './components/MyTrips'
import NavBar from './components/NavBar'
import SeatMap from './components/SeatMap'
import SiteHead from './components/SiteHead';

const handleAuth = () => {
  const token = localStorage.getItem("token")
  fetch(`http://localhost:3000/user_is_authed`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<><SiteHead /><NavBar /></>}>
      <Route index element={<Home />} />
      <Route path="auth" element={<Auth />} />
      <Route path="profile" element={<Profile />} />
      <Route path="book" element={<Book />} />
      <Route path="mytrips" element={<MyTrips />} />
      <Route path="*" element={<Home />} />
      <Route path="flights/:id" element={<SeatMap />} />
    </Route>
  </Routes>
</BrowserRouter>
);



