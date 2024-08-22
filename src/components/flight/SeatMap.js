import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { airlineNames } from '../booking/AirlineStyles.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const SeatMap = () => {
  // eslint-disable-next-line no-unused-vars
  const [seat, setSeat] = useState('');
  const [flightData, setFlightData] = useState([]);
  const [planeData, setPlaneData] = useState([]);
  const location = useLocation();

  const siteURL = 'http://localhost:3000/';

  const flight = location.state?.flight; // Access the state

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

  const Seat = ({ col, row }) => {
    const seatString = 'ABCDEF';
    const name = row + seatString[col];
    const flight_id = flightData.id;
    const user_id = sessionStorage.getItem('currentUserId');
    return (
      <button
        id={name}
        onClick={() => _handleOnClick({ col, row, user_id, flight_id, name })}
        className="seats"
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
      <h1 className="my-trips"> Seat Map </h1>
      <div className="seat-map-container">
        <div className="flight-data-container">
          <div className="flight-data">
            <p>{airlineNames[String(location.state.flight.carrier.iata)]}</p>
            <p>Flight {String(location.state.flight.flightNumber)}</p>
            <p>{String(location.state.flight.departure.airport.iata)}</p>
          </div>
        </div>
        {seats()}
      </div>
    </>
  );
};

export default SeatMap;
