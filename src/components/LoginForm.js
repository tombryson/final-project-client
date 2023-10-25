import React, { useState } from 'react';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const siteURL = 'http://localhost:3000/';

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(`${siteURL}/users`, {
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
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt);
        props.handleLogin(data.user);
      });
    setEmail('');
    setPassword('');
  };
  return (
    <div className="sign-up-form">
      <h1 className="sign-up">Sign in</h1>
      <form className="ui-form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            id="emailInput"
            value={email}
            onChange={handleEmailChange}
            type="text"
            placeholder="yours@example.com"
          />
          <label id="emailInput" htmlFor="emailInput">
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
          />
          <label htmlFor="passwordInput">Password</label>
        </div>
        <button className="ui-button" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
