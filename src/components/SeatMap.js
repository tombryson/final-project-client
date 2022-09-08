import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const SeatMap = (props) => {
  console.log(props);
const [flightData, setFlightData] = useState([]);
const location = useLocation()
console.log(location)

useEffect(() => {
  console.log(location.pathname)
  if (flightData.length === 0)
  axios.get(`http://localhost:3000${location.pathname}`).then((response) => {
    console.log(response.data);
    setFlightData(response.data);
    })
  }, [flightData] 
)


  return (
    <>
    <h1 className='my-trips'> Seat Map </h1>
    <p>
      {flightData}
    </p>
    </>
  )
}

export default SeatMap;
