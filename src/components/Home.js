import React from "react"
import { Carousel } from "react-bootstrap";
import logo from "../images/BA-transp.png"
import NavBar from "./NavBar"
import CarouselHome from "./CarouselHome";


function Home(props){
    return(
        <><div>
            <h1 className="greeting"> Welcome </h1>
        </div>
        <CarouselHome />
        </>
    )
}

export default Home;