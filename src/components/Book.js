import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import departure from '../images/book-icon.png';
import arrival from '../images/icon-arrival.png';
import VideoBackground from './videoBackground.jsx';
import APIFlightTable from './FlightTable.js';
import './App2.css';
import './buttonStyles.css';

const Book = () => {
  const [AirportDeparture, setAirportDeparture] = useState('MEL');
  const [AirportArrival, setAirportArrival] = useState('SYD');
  const [CarrierCode, setCarrierCode] = useState('QF');
  const [DepartureDate, setDepartureDate] = useState('2024-06-30');
  const [ArrivalDate, setArrivalDate] = useState('2024-06-30');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleOnClick = (i) => {
    selectedItem === null ? setSelectedItem(i) : setSelectedItem(null);
  };

  const duration = 800;
  const delay = 100;
  const animStr = (i) =>
    `fadeIn ${duration}ms ease-out ${delay * i}ms forwards`;

  useEffect(() => {
    setIsVisible(true);
  }, []);



  const _handleSubmit = async (event) => {
    event.preventDefault();

    const apiURL = (`https://flight-info-api.p.rapidapi.com/schedules?version=v2&DepartureDateTime=${DepartureDate}&ArrivalDateTime=${ArrivalDate}&CarrierCode=${CarrierCode}&DepartureAirport=${AirportDeparture}&ArrivalAirport=${AirportArrival}&FlightType=Scheduled&CodeType=IATA&ServiceType=Passenger`)

    const flightData = {
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
    };

    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiURL }),
      });

      const data = await response.json();
      setMessage(`Success: ${JSON.stringify(data)}`);

    } catch (error) {
      setMessage(`Error: ${error.toString()}`);
    }
  };

  const _handleTo = (form) => {
    const result = form.target.value.replace(/[^a-z]/gi, '').toUpperCase();
    setToField(result);
    setTo(result);
  };

  const _handleFrom = (form) => {
    const result = form.target.value.replace(/[^a-z]/gi, '').toUpperCase();
    setFromField(result);
    setFrom(result);
  };

  const flight = flights.map((item) => {
    return item.flight_id !== undefined ? (
      <FlightTable key={item.flight_id} flights={item} />
    ) : (
      []
    );
  });

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
                  onChange={_handleFrom}
                  value={fromField}
                  placeholder="eg. MEL"
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
                  onChange={_handleTo}
                  value={toField}
                  placeholder="eg. SYD"
                />
              </div>
            </div>
            <div className="container__search">
              <button type="submit" onClick={} className="button__search--booking">
                {' '}
                Search
              </button>
            </div>
          </form>
          {hasSearched && getItems(flights)}
          <h1>Flight Information</h1>
          <APIFlightTable />
          {flight}
          {message}
        </div>
      </div>
    </>
  );
};

const FlightTable = (props) => {
  const path = `/flights/${props.flights.id}`;
  return (
    <div className="searched-flight">
      <Link to={path} state={{}} className="flights">
        Flight: from {props.flights.from} to {props.flights.to} departing on{' '}
        {props.flights.date}
      </Link>
    </div>
  );
};

export default Book;
