import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import departure from '../../images/book-icon.png';
import arrival from '../../images/icon-arrival.png';
import VideoBackground from './videoBackground.jsx';
import ApiFlightTable from './ApiFlightTable.js';
import { throttle } from 'lodash';
import '../App2.css';
import '../buttonStyles.css';
import * as RDP from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Book = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { setFontSize } = useOutletContext();
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [flights, setFlights] = useState([]);
  const [flightTableVisible, setFlightTableVisible] = useState(false);
  const { setIsScrolling } = useOutletContext();

  const RDPC =
  (RDP.default?.default || // Handle nested default export
   RDP.default ||          // Handle default export
   RDP);  
  
  const duration = 800;
  const delay = 100;
  const animStr = (i) =>
    `fadeIn ${duration}ms ease-out ${delay * i}ms forwards`;
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setFontSize(4.6);

    const handleScroll = () => {
      const scrollableElement = document.querySelector('.booking-container');
      if (scrollableElement) {
        const scrollY = scrollableElement.scrollTop;

        if (scrollY > 30) {
          setFontSize(3.1);
          setIsScrolling(true);
        } else {
          setFontSize(4.4);
          setIsScrolling(false);
        }
      }
    };

    const scrollableElement = document.querySelector('.booking-container');
    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [setFontSize]);

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

  const _handleSubmit = throttle (async (event) => {
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

    try {
      const response = await fetch('./data.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const JSONdata = await response.json();
      const flightData = JSONdata.data;
      const pricingResponse = await fetch('http://localhost:3000/flights/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      });
  
      if (!pricingResponse.ok) {
        throw new Error('Failed to fetch pricing data');
      }
  
      const pricingData = await pricingResponse.json();
      const flightsWithPricing = flightData.map((flight, index) => ({
        ...flight,
        price: pricingData[index]?.price || 'N/A',
      }));
  
      setFlights(flightsWithPricing);
      setFlightTableVisible(true);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  },1000)

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
          <form className="results__container" onSubmit={_handleSubmit}>
          <div className="search__container">
            <div className="destination__container">
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
            <div className='datepicker__container'>
            <div className="input-group-text">
                    <img
                      src={departure}
                      id="flight-icons"
                      alt="plane taking off"
                      width="30px"
                    ></img>
                    Departing Date
                  </div>
              <div className="date-picker">
                <RDPC 
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)} 
                />
              </div>
              <div className="input-group-text">
                    <img
                      src={arrival}
                      id="flight-icons"
                      alt="plane landing"
                      width="30px"
                    ></img>
                    Arriving Date
                  </div>
                  <div className="date-picker">
                <RDPC 
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)} 
                />
              </div>
              </div>
            </div>
            <div className='search-button__container'>
              <button
                type="submit"
                onClick={_handleSubmit}
                className="button__search--booking"
              >
                {' '}
                Search
              </button>
              </div>
            {flightTableVisible && <ApiFlightTable flights={flights} setFontSize={setFontSize} />}
          </form>
          {message}
        </div>
      </div>
    </>
  );
};

export default Book;
