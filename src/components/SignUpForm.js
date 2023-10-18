import React, { useState } from 'react';

function SignUpForm(props) {
  ///////////////////All Props
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const siteURL = 'http://localhost:3000/';

  //////
  const handleSubmit = (evt) => {
    evt.preventDefault();
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
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt);
        props.handleLogin(data.user);
      });
    setFirst_name('');
    setLast_name('');
    setEmail('');
    setPassword('');
    setAdmin(false);
  };

  return (
    <div className="sign-up-form">
      <h1 className="sign-up">Sign Up</h1>
      <form className="ui-form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            value={first_name}
            onChange={handleFirstNameChange}
            type="text"
            placeholder="First Name"
          />
        </div>
        <div className="field">
          <input
            value={last_name}
            onChange={handleLastNameChange}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="field">
          <input
            value={email}
            onChange={handleEmailChange}
            type="text"
            placeholder="Email*"
            required
          />
        </div>
        <div className="field">
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password*"
            required
          />
        </div>
        <button className="ui-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
