import React, { useState, useEffect } from 'react';
import './../App.css';
import Header from '../Header.js';
import SignUpForm from './SignUpForm.js';
import LoginForm from './LoginForm.js';
import { useNavigate } from 'react-router-dom';

function Auth() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({});
  const [form, setForm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const siteURL = 'http://localhost:3000/';

  ///Fade In
  useEffect(() => {
    setIsVisible(true);
  }, []);

  ///Authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${siteURL}/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    sessionStorage.setItem('currentUserId', user.id.toString());
    navigate(`/`);
    window.location.reload();
  };

  const handleFormSwitch = (input) => {
    setForm(input);
  };

  const renderForm = () => {
    switch (form) {
      case 'login':
        return <LoginForm handleLogin={handleLogin} />;
      default:
        return <SignUpForm handleLogin={handleLogin} />;
    }
  };
  return (
    <>
      <div className="screen-dim"></div>
      <div className={`auth-form fade-in ${isVisible ? 'show' : ''}`}>
        <div className="auth">
          <Header handleFormSwitch={handleFormSwitch} />
          <div className="auth-container">{renderForm()}</div>
        </div>
      </div>
    </>
  );
}

export default Auth;
