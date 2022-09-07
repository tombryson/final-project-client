import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header'
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [user, setUser] = useState({})
  const [form, setForm] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
        console.log(data)
      })
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
    console.log('getting to login');
    navigate(`/`);
  }

  const handleFormSwitch = (input) => {
    setForm(input)
  }

  const handleAuthClick = () => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/user_is_authed`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  console.log(user)

  const renderForm = () => {
    switch(form){
      case "login":
        return <LoginForm handleLogin={handleLogin}/>
      default:
        return <SignUpForm handleLogin={handleLogin}/>
    }
  }
  return (
    <div className="auth-form">
    <div className="auth">
        <Header handleFormSwitch={handleFormSwitch}/>
        {
          renderForm()
        }
    </div>
    </div>
  );
}

export default Auth;