import React from "react"
import { Carousel } from "react-bootstrap";
import logo from "../images/BA-transp.png"
import NavBar from "./NavBar"

function Home(props){
    return(
        <><div>
            <img className="title-img"src={logo} width="350" alt="plane flying over logo" />
            <h1 className="greeting"> Welcome </h1>
        
        </div>
        <h3 className="discover"> Discover </h3>
        <Carousel /></>
    )
}

export default Home;