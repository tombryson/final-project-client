import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import departure from '../images/book-icon.png';
import arrival from '../images/icon-arrival.png';
import AusLandscape from '../images/australian_landscape.jpg';
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
  const [hasSearched, setHasSearched] = useState(false);

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

  const _handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axios.get(`${siteURL}/search/${from}/${to}.json`).then((response) => {
        setFlights(response.data);
        setHasSearched(true);
      });
    } catch (error) {
      console.log(error);
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
            <button
              type="submit"
              className="btn btn-secondary mb-2 button__search--booking"
              id="btn"
            >
              {' '}
              Search
            </button>
          </form>
          {hasSearched && getItems(flights)}
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
