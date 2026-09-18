import API_URL from '../../api.js';
import React, { useState } from 'react';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const siteURL = API_URL;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage('');
    fetch(`${siteURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
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
      <h1 className="sign-up">Sign in</h1>
      <p className="demo-login">
        Try the demo: <strong>demo@burningairlines.test</strong><br />
        Password: <strong>demo1234</strong>
      </p>
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
            id="passwordInput"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="******"
            required
          />
          <label htmlFor="passwordInput">Password</label>
        </div>
        {message && <p role="alert">{message}</p>}
        <button className="ui-button" type="submit" disabled={isSubmitting}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
