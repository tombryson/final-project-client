import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { airlineNames } from '../booking/AirlineStyles.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const SeatMap = () => {
  // eslint-disable-next-line no-unused-vars
  const [seat, setSeat] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [flightData, setFlightData] = useState([]);
  const [planeData, setPlaneData] = useState([]);
  const location = useLocation();
  const siteURL = 'http://localhost:3000/';
  const flight = location.state?.flight;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (flight) {
      setFlightData(flight);
      setPlaneData({
        rows: 28,
        cols: 6,
      });
    }
  }, [flight]);

  const _handleOnSeatClick = (seat) => {
    setSeat(seat);
    setIsClicked(true);

    axios
      .post(`${siteURL}/bookings/`, {
        booking: {
          cols: seat.col,
          flight_id: seat.flight_id,
          rows: seat.row,
          user_id: seat.user_id,
        },
      })
      .then((reponse) => {
        const seatProp = document.getElementById(seat.name);
        seatProp.style.visibility.setProperty('visibility', 'hidden');
      });
  };

  const _handleOnConfirmClick = () => {
    navigate(`/book/flights/${flightData.id}/confirmation`);
  }

  const Seat = ({ col, row, onSeatClick }) => {
    const seatString = 'ABCDEF';
    const name = row + seatString[col];
    const flight_id = flightData.id;
    const user_id = sessionStorage.getItem('currentUserId');

    return (
      <button
        id={name}
        onClick={() =>
          _handleOnSeatClick({ col, row, user_id, flight_id, name }, onSeatClick)
        }
        className={`${name === seat.name ? 'selected-seat' : 'seats'}`}
      >
        {name}
      </button>
    );
  };

  const seats = () => {
    let rows = planeData.rows;
    let cols = planeData.cols;

    return (
      <div className="seat-container">
        {(() => {
          const seatArr = [];
          for (let x = 1; x < rows + 1; x++) {
            for (let y = 0; y < cols; y++) {
              seatArr.push(<Seat col={y} row={x} />);
            }
          }
          return seatArr;
        })()}
      </div>
    );
  };

  return (
    <>
      <h1 className="my-trips"> Choose your seats </h1>
      <div className="seat-map-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 120"
          className="plane-svg"
        >
          <rect x="90" y="30" width="20" height="100" fill="grey"></rect>
          <path d="M45,100 Q60,40 75,110 Q60,120 45,110 Z" fill="grey"></path>
          <path d="M125,100 Q140,40 155,110 Q140,120 125,110 Z" fill="grey"></path>
          <polygon points="90,60 30,100 30,120 90,100" fill="darkgrey"></polygon>
          <polygon points="110,60 170,100 170,120 110,100" fill="darkgrey"></polygon>
          <line x1="90" y1="80" x2="30" y2="110" stroke="#888" stroke-width="2"></line>
          <line x1="110" y1="80" x2="170" y2="110" stroke="#888" stroke-width="2"></line>
        </svg>
        <div className="flight-data-container">
          <div className="flight-data">
            <table className="flight-data-table">
              <tbody>
                <tr className="flight-info">
                  <td colSpan="2">
                    <th>
                    {airlineNames[String(location.state.flight.carrier.iata)]} Flight {String(location.state.flight.flightNumber)}
                    </th>
                  </td>
                </tr>
                <tr className="flight-info">
                  <td colSpan="2">
                    {String(location.state.flight.departure.airport.iata)} to {String(location.state.flight.arrival.airport.iata)}
                  </td>
                </tr>
                <tr className="seat-info">
                  <td>{`Seat:     `}
                  {isClicked ? String(seat.name) : <i style={{fontSize: '1rem'}}>Unselected</i>}</td>
                </tr>
                <tr className="flight-info">
                  <td colSpan="2">
                  ${flight.price}
                  </td>
                </tr>
                <tr>{isClicked ? 
                  <tr><button className='seat-confirm-button' onClick={_handleOnConfirmClick}>Select Seat</button></tr>
                : null}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {seats()}
      </div>
    </>
  );
};

export default SeatMap;
