import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const SeatMap = (props) => {
const [flightData, setFlightData] = useState([]);
const [planeData, setPlaneData] = useState([]);
const location = useLocation()

useEffect(() => {
  if (flightData.length === 0)
  axios.get(`http://localhost:3000${location.pathname}`).then((response) => {
    console.log(response.data);
    setFlightData(response.data[1]);
    setPlaneData(response.data[0]);
    })
  }, [flightData] 
)
const Seat = ({col, row}) => {
  const seatString = 'ABCDEF'
  const name = seatString[col] + row
  console.log(name);
  return (
    <button id={name} className='seats'>{name}</button>
  )
}

const seats = () => {
  let rows = planeData.rows;
  let cols = planeData.cols;
  return (
    <div className='seat-container'>
    {(() => {
      const seatArr = [];
      for (let x=0; x<rows; x++) {
      for (let y=0; y<cols; y++) {
        seatArr.push(<Seat col={y} row={x} />)
      }
      seatArr.push(<br/>)
    }
    return seatArr;
    }
    )()}
    </div>
  )
}


  return (
    <>
    <h1 className='my-trips'> Seat Map </h1>
    <p className='flight-model'>
      {console.log(flightData)}
      {console.log(flightData.model)}
    </p>
    {seats()};
    </>
  )
}

export default SeatMap;
