import API_URL from '../../api.js';
import React, { useState, useEffect } from 'react';
import './../App.css';
import Header from '../Header.js';
import SignUpForm from './SignUpForm.js';
import LoginForm from './LoginForm.js';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';

function Auth({ onLogin, onClose }) {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({});
  const [form, setForm] = useState('login');
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const context = useOutletContext();

  const siteURL = `${API_URL}/`;

  ///Fade In
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    (onLogin || context.onLogin)(user);
    if (location.pathname === '/auth') navigate('/book');
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
          <button className="auth-close" type="button" onClick={() => onClose ? onClose() : navigate('/')}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default Auth;
