import React from 'react'
import mainLogo from '../images/BA-logo.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';


function Header(props){
    return(
        <>
        <div className="headerStyle">
            <button className="ui button btn-dark" onClick={() => props.handleFormSwitch("signUp")}>Sign Up</button>
            <button className="ui button btn-dark" onClick={() => props.handleFormSwitch("login")}>Log In</button>
        </div>
        <div className="logo">
            <img className='logo-mid' src={mainLogo} alt="flying airplane over logo name" min-width="100px" width="20%" />
        </div>
        </>
    )
}

export default Header;