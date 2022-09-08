import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const SeatMap = () => {

const [flightData, setFlightData] = useState([]);

useEffect(() => {
  axios.get(`http://localhost:3000/flights/:id`).then((response) => {
    console.log(response.data);
    setFlightData(response.data);
    })
  }, [flightData] 
)


  return (
    <>
    <h1 className='my-trips'>Seat Map </h1>
    <p>
      {flightData}
    </p>
    </>
  )
}

export default SeatMap;
