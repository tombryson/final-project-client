import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const SeatMap = (props) => {
const [flightData, setFlightData] = useState([]);
const [planeData, setPlaneData] = useState([]);
const location = useLocation()

const _handleOnClick = (seat) => {
  console.log(seat)
  axios.post(`http://localhost:3000/bookings/`, {
    col: seat.col,
    flight_id: seat.flight_id,
    row: seat.row,
    user_id: seat.user_id,
  }
  ).then((response) => {
    console.log(response.data);
})
}

useEffect(() => {
  if (flightData.length === 0)
  axios.get(`http://localhost:3000${location.pathname}`).then((response) => {
    setFlightData(response.data[1]);
    setPlaneData(response.data[0]);
    })
  }, [flightData] 
)


const Seat = ({col, row}) => {
  const seatString = 'ABCDEF'
  const name = seatString[col] + row
  const flight_id = flightData.id
  const user_id = sessionStorage.getItem('currentUserId');
  return (
    <button id={name} onClick={() => _handleOnClick({col, row, user_id, flight_id})} className='seats'>{name}</button>
  )
}

const seats = () => {
  let rows = planeData.rows;
  let cols = planeData.cols;
  return (
    <div className='seat-container'>
    {(() => {
      const seatArr = [];
      for (let x=1; x<rows+1; x++) {
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
      {planeData.model}
    </p>
    {seats()};
    </>
  )
}

export default SeatMap;
