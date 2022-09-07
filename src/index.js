import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './components/index.css';
import App from './components/App';
import Auth from './components/Auth'
import Home from './components/Home'
import Profile from './components/Profile'
import Book from './components/Book'
import MyTrips from './components/MyTrips'
import NavBar from './components/NavBar'
import axios from 'axios'
import SeatMap from './components/SeatMap'

// Access value associated with the key
var item_value = sessionStorage.getItem("item_key");

// Assign value to a key
sessionStorage.setItem("item_key", item_value);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<NavBar />}>
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



