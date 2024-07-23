import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SeatMap = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [seat, setSeat] = useState('');
  const [flightData, setFlightData] = useState([]);
  const [planeData, setPlaneData] = useState([]);
  const location = useLocation();

  const siteURL = 'http://localhost:3000/';

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

  useEffect(() => {
    if (flightData.length === 0)
      axios.get(`${siteURL}${location.pathname}`).then((response) => {
        setFlightData(response.data[1]);
        setPlaneData(response.data[0]);
      });
    // eslint-disable-next-line
  }, [flightData]);

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
            // seatArr.push(<br />);
          }
          return seatArr;
        })()}
      </div>
    );
  };

  return (
    <>
      <h1 className="my-trips"> Seat Map </h1>
      <p className="flight-model">{planeData.model}</p>
      {seats()};
    </>
  );
};

export default SeatMap;
