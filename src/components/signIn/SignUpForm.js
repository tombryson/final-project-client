import API_URL from '../../api.js';
import React, { useState } from 'react';

function SignUpForm(props) {
  ///////////////////All Props
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [admin, setAdmin] = useState(false);

  ////////////////////////////////////////////////////////////////////////////
  const handleFirstNameChange = (evt) => {
    setFirst_name(evt.target.value);
  };
  const handleLastNameChange = (evt) => {
    setLast_name(evt.target.value);
  };
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const siteURL = API_URL;

  //////
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage('');
    fetch(`${siteURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        admin,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to sign in.');
        localStorage.setItem('token', data.jwt);
        props.handleLogin(data.user);
      })
      .catch((error) => setMessage(error.message))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="sign-up-form">
      <h1 className="sign-up">Sign up</h1>
      <form className="ui-form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            id="emailInput"
            value={email}
            onChange={handleEmailChange}
            type="email"
            placeholder="yours@example.com"
            required
          />
          <label htmlFor="emailInput">
            Email address
          </label>
        </div>
        <div className="field">
          <input
            id="firstName"
            value={first_name}
            onChange={handleFirstNameChange}
            type="text"
            placeholder="first name"
            required
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        <div className="field">
          <input
            id="lastName"
            value={last_name}
            onChange={handleLastNameChange}
            type="text"
            placeholder="last name"
            required
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
        <div className="field">
          <input
            id="password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        {message && <p role="alert">{message}</p>}
        <button className="ui-button" type="submit" disabled={isSubmitting}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
