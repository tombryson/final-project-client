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
      <h1 className="sign-up">Sign In</h1>
      <form className="ui-form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            value={email}
            onChange={handleEmailChange}
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="field">
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
          />
        </div>

        <button className="ui-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
