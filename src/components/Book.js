import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import departure from '../images/book-icon.png';
import arrival from '../images/icon-arrival.png';
import './App2.css';

const Book = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [flights, setFlights] = useState([{}]);
  const [fromField, setFromField] = useState('');
  const [toField, setToField] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // let currentUserId = sessionStorage.getItem('currentUserId');

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

  const siteURL = 'http://localhost:3000/';

  const _handleSubmit = (event) => {
    event.preventDefault();
    axios(`${siteURL}/search/${from}/${to}.json`).then((response) => {
      setFlights(response.data);
    });
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
    return flights.length === 0 ? (
      <p>No items found</p>
    ) : (
      <ul className="list-group">
        {flights.map((flight, i) => (
          <li
            key={i}
            style={{ animation: animStr(i) }}
            className={
              i === selectedItem ? 'list-group-item active' : 'list-group-item'
            }
            onClick={() => handleOnClick(i)}
          >
            {flight.from} to {flight.to} - {flight.date}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    if (flights.length === 0) {
      setMessage(
        <div className="no-flight">
          Sorry, there are no flights available to your selected cities
        </div>,
      );
    } else {
      setMessage('');
    }
    setTimeout(() => {
      setMessage('');
    }, 12000);
  }, [flights]);

  return (
    <div className={`fade-in ${isVisible ? 'show' : ''}`}>
      <form className="book-form" onSubmit={_handleSubmit}>
        <div className="search-form">
          <label className="sr-only">Search</label>
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
          <button type="submit" className="btn btn-secondary mb-2" id="btn">
            Search
          </button>
        </div>
      </form>
      {getItems(flights)}
      {flight}
      {message}
    </div>
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
