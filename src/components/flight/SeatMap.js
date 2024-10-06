import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

  useEffect(() => {
    if (flight) {
      setFlightData(flight);
      setPlaneData({
        rows: 28,
        cols: 6,
      });
    }
  }, [flight]);

  const _handleOnClick = (seat) => {
    setSeat(seat);
    setIsClicked(true);
    console.log(`seat clicked ${JSON.stringify(seat)}`);

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

  // useEffect(() => {
  //   if (flightData.length === 0) {
  //     axios.get(`${siteURL}${location.pathname}`).then((response) => {
  //       setFlightData(response.data[1]);
  //       setPlaneData(response.data[0]);
  //     });
  //   } else {
  //     console.log(`flight: ${flight.flightNumber}`);
  //     setFlightData(flight);
  //     setPlaneData({
  //       cols: 6,
  //       rows: 40,
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [flight]);

  const Seat = ({ col, row, onSeatClick }) => {
    const seatString = 'ABCDEF';
    const name = row + seatString[col];
    const flight_id = flightData.id;
    const user_id = sessionStorage.getItem('currentUserId');

    return (
      <button
        id={name}
        onClick={() =>
          _handleOnClick({ col, row, user_id, flight_id, name }, onSeatClick)
        }
        // className="seats"
        // style={{
        //   backgroundColor:
        //     name === seat.name ? 'hsl(0 90% 39% / 1)' : 'revert-layer'
        // }}
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
            <p>
              <strong>
                {airlineNames[String(location.state.flight.carrier.iata)]}
              </strong>
            </p>
            <p>
              <strong>Flight</strong>{' '}
              {String(location.state.flight.flightNumber)}
            </p>
            <p>{String(location.state.flight.departure.airport.iata)}</p>
            <p>
              Seat:
              {isClicked ? ` ${String(seat.name)}` : ''}
            </p>
          </div>
        </div>
        {seats()}
      </div>
    </>
  );
};

export default SeatMap;
