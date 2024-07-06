import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import departure from '../../images/book-icon.png';
import arrival from '../../images/icon-arrival.png';
import VideoBackground from './videoBackground.jsx';
import ApiFlightTable from './ApiFlightTable.js';
import '../App2.css';
import '../buttonStyles.css';

const Book = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [flights, setFlights] = useState([]);
  const [flightTableVisible, setFlightTableVisible] = useState(false);

  const duration = 800;
  const delay = 100;
  const animStr = (i) =>
    `fadeIn ${duration}ms ease-out ${delay * i}ms forwards`;
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [formData, setFormData] = useState({
    departureDate: '2024-06-30',
    arrivalDate: '2024-06-30',
    carrierCode: 'QF',
    airportDeparture: 'MEL',
    airportArrival: 'SYD',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnClick = (i) => {
    selectedItem === null ? setSelectedItem(i) : setSelectedItem(null);
  };

  const _handleSubmit = async (event) => {
    event.preventDefault();

    const {
      departureDate,
      arrivalDate,
      carrierCode,
      airportDeparture,
      airportArrival,
    } = formData;

    const apiURL = `https://flight-info-api.p.rapidapi.com/schedules?version=v2&DepartureDateTime=${departureDate}&ArrivalDateTime=${arrivalDate}&CarrierCode=${carrierCode}&DepartureAirport=${airportDeparture}&ArrivalAirport=${airportArrival}&FlightType=Scheduled&CodeType=IATA&ServiceType=Passenger`;

    setFlightTableVisible(true);

    // try {
    //   const response = await fetch('http://localhost:3000/flights/submit', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ apiURL }),
    //   });

    //   const data = await response.json();
    // } catch (error) {
    //   setMessage(`Error: ${error.toString()}`);
    // }
    try {
      const response = await fetch('./data.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const JSONdata = await response.json();
      setFlights(JSONdata.data);
      setFlightTableVisible(true);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };

  /////////////////////

  // const _handleTo = (form) => {
  //   const result = form.target.value.replace(/[^a-z]/gi, '').toUpperCase();
  //   setToField(result);
  //   setTo(result);
  // };

  // const _handleFrom = (form) => {
  //   const result = form.target.value.replace(/[^a-z]/gi, '').toUpperCase();
  //   setFromField(result);
  //   setFrom(result);
  // };

  // const flight = flights.map((item) => {
  //   return item.flight_id !== undefined ? (
  //     <FlightTable key={item.flight_id} flights={item} />
  //   ) : (
  //     []
  //   );
  // });

  const getItems = (flights) => {
    return flights.length === 0 ||
      (flights.length === 1 && Object.keys(flights[0]).length === 0) ? (
      <p className="no-flight">
        Sorry, there are no flights available to your selected cities
      </p>
    ) : (
      <tbody className="list-group">
        {flights.map((flight, i) => (
          <tr
            key={i}
            style={{ animation: animStr(i) }}
            className={
              i === selectedItem ? 'list-group-item active' : 'list-group-item'
            }
            onClick={() => handleOnClick(i)}
          >
            <td>{flight.from}</td>
            <td>{flight.to}</td>
            <td>{flight.date}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <>
      <div className="book_background">
        <div className="video-container">
          <VideoBackground />
        </div>
        <div className="booking-container">
          <form className="form__container" onSubmit={_handleSubmit}>
            <div className="form__search">
              <div id="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <img
                      src={departure}
                      id="flight-icons"
                      alt="plane taking off"
                      width="30px"
                    ></img>
                    Departing
                  </div>
                </div>
                <input
                  type="text"
                  maxLength={3}
                  className="form-control"
                  id="form-control"
                  required
                  onChange={handleChange}
                  placeholder="Airport eg. MEL"
                />
              </div>
              <div id="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <img
                      src={arrival}
                      id="flight-icons"
                      alt="plane landing"
                      width="30px"
                    ></img>
                    Arriving
                  </div>
                </div>
                <input
                  type="text"
                  maxLength={3}
                  className="form-control"
                  id="form-control"
                  required
                  onChange={handleChange}
                  placeholder="Airport eg. SYD"
                />
              </div>
            </div>
            <div className="container__search">
              <button
                type="submit"
                onClick={_handleSubmit}
                className="button__search--booking"
              >
                {' '}
                Search
              </button>
            </div>
            {flightTableVisible && <ApiFlightTable flights={flights} />}
          </form>
          {message}
        </div>
      </div>
    </>
  );
};

// const FlightTable = (props) => {
//   const path = `/flights/${props.flights.id}`;
//   return (
//     <div className="searched-flight">
//       <Link to={path} state={{}} className="flights">
//         Flight: from {props.flights.from} to {props.flights.to} departing on{' '}
//         {props.flights.date}
//       </Link>
//     </div>
//   );
// };

export default Book;
