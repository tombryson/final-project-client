import React, {useState, useEffect, Fragment} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './Header'
import Auth from './Auth'
import Home from './Home'
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm'
import NavBar from './NavBar';
import Profile from './Profile';

function App() {
  return (
    <Fragment>
      <NavBar />
    </Fragment>
  )
};






export default App;