import React from "react";
import { Navbar } from "react-bootstrap";
import Home from "./Home";
import { Link, Outlet } from 'react-router-dom';
import iconHome from '../images/home-icon.png'
import bookIcon from '../images/book-icon.png'
import myTrips from '../images/trips-icon.png'
import myProfile from '../images/profile-icon.png'
import book1 from '../images/book-icon1.png'
import book2 from '../images/book-icon2.png'


const logOut = () => {
    sessionStorage.removeItem('currentUserId');
    window.location.reload();
    <Link to="/"></Link>
}

const NavBar = () => {
    let currentUserId = sessionStorage.getItem('currentUserId'); 
    if (currentUserId === null) {
    return (
    <><div className="filler">
            <div className="buttons-nav">
                <ul>
                    <div className='icon-div'>
                    <Link to="/">
                        <img className="nav-icon" src={iconHome} alt="a house" width="50px"></img>
                    </Link>
                    <div className='icon-text'>Home</div>
                    </div>
                </ul>
                <ul>
                    <div className='icon-div'>
                    <Link to="/auth">
                    <img className="nav-icon" src={myProfile} alt="a portrait" width="50px"></img>
                    </Link>
                    <div className='icon-text'id='log-in'>Log in</div>
                    </div>
                </ul>
            </div>
        </div>
            <div>
                <Outlet />
            </div></>
    )

    } else {
    return (
        <><div className="filler">
                <div className="buttons-nav">
                    <ul>
                        <div className='icon-div'>
                        <Link to="/">
                            <img className="nav-icon" src={iconHome} alt="a house" width="50px"></img>
                        </Link>
                        <div className='icon-text'>Home</div>
                        </div>
                    </ul>
                    <ul>
                        <div className='icon-div'>
                        <img onClick={() => logOut()} className="nav-icon" src={myProfile} alt="a portrait" width="50px"></img>
                        <div className='icon-text'id='log-out'>Log out</div>
                        </div>
                    </ul>
                    <ul>
                        <div className='icon-div'>
                        <Link to="/book">
                        <img className="nav-icon" src={book2} alt="a plane" width="50px"></img>
                        </Link>
                        <div className='icon-text' id='book'>Book</div>
                        </div>
                    </ul>
                    <ul>
                        <div className='icon-div'>
                        <Link to="/mytrips">
                        <img className="nav-icon" src={myTrips} alt="luggage" width="50px"></img>
                        </Link>
                        <div className='icon-text' id='my-trips'>My Trips</div>
                        </div>
                    </ul>
                </div>
            </div>
                <div>
                    <Outlet />
                </div></>
    )}
};

export default NavBar;
