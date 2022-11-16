import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header'
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm'
import { useNavigate } from 'react-router-dom';

function Auth() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({})
  const [form, setForm] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`https://burning-airlines-143.herokuapp.com/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
      })
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
    sessionStorage.setItem('currentUserId', user.id.toString());
    navigate(`/`);
    window.location.reload();
  }

  const handleFormSwitch = (input) => {
    setForm(input)
  }

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