import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import departure from '../../images/book-icon.png';
import arrival from '../../images/icon-arrival.png';
import VideoBackground from './videoBackground.jsx';
import ApiFlightTable from './ApiFlightTable.js';
import { throttle, toUpper } from 'lodash';
import '../App2.css';
import '../buttonStyles.css';
import * as RDP from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { endOfToday, format, isToday, startOfToday } from 'date-fns';

const Book = () => {
  const [departDate, setDepartDate] = useState(new Date());
  // const [arriveDate, setArriveDate] = useState(new Date()); // Use for return flights
  const { setFontSize } = useOutletContext();
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [flights, setFlights] = useState([]);
  const [flightTableVisible, setFlightTableVisible] = useState(false);
  const [formData, setFormData] = useState({
    departureDate: format(startOfToday(), 'yyyy-MM-dd'),
    airportDeparture: 'MEL',
    airportArrival: 'SYD',
  });

  const RDPC = RDP.default?.default || RDP.default || RDP;

  const handleDateChange = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setFormData({ ...formData, departureDate: formattedDate });
    setDepartDate(date);
  };

  const duration = 800;
  const delay = 100;
  const animStr = (i) =>
    `fadeIn ${duration}ms ease-out ${delay * i}ms forwards`;
  useEffect(() => {
    setIsVisible(true);
  }, []);

  /// Font size transition
  useEffect(() => {
    setIsVisible(true);
    setFontSize(4.3);
    const handleScroll = () => {
      const scrollableElement = document.querySelector('.booking-container');
      if (scrollableElement) {
        const scrollY = scrollableElement.scrollTop;

        if (scrollY > 30 && window.innerWidth <= 1600) {
          setFontSize(2.9);
        } else {
          setFontSize(4.3);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toUpperCase() });
  };

  /// GET request for data
  const _handleSubmit = throttle(async (event) => {
    event.preventDefault();

    const { departureDate, airportDeparture, airportArrival } = formData;

    const apiURL =
      `https://flight-info-api.p.rapidapi.com/schedules?version=v2&DepartureDateTime=${departureDate}` +
      `&CarrierCode=QF,JQ,ANZ,VA` +
      `&DepartureAirport=${airportDeparture}` +
      `&ArrivalAirport=${airportArrival}` +
      `&FlightType=Scheduled&CodeType=IATA&ServiceType=Passenger`;

    setFlightTableVisible(true);

    try {
      // const response = await fetch('./data2.json'); // Placeholder values

      const response = await fetch('http://localhost:3000/flights/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flight: {
            departureDate,
            airportDeparture,
            airportArrival,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const JSONdata = await response.json();
      const flightData = JSONdata;
      setFlights(flightData);
      setFlightTableVisible(true);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  }, 1000);

  return (
    <>
      <div className="book_background">
        <div className="video-container">
          <VideoBackground />
        </div>
        <div className="booking-container">
          <form className="results__container" onSubmit={_handleSubmit}>
            <div className="booking-margin">
              <div className="search__container">
                <div className="destination__container">
                  <div id="input-group">
                    <div className="input-group-text">
                      <img
                        src={departure}
                        id="flight-icons"
                        alt="plane taking off"
                        width="30px"
                      ></img>
                      Departing
                    </div>
                    <input
                      type="text"
                      maxLength={3}
                      className="form-control"
                      id="form-control"
                      name="airportDeparture"
                      required
                      onChange={handleChange}
                      placeholder="Airport code eg. MEL"
                    />
                  </div>
                  <div id="input-group">
                    <div className="input-group-text">
                      <img
                        src={arrival}
                        id="flight-icons"
                        alt="plane landing"
                        width="30px"
                      ></img>
                      Arriving
                    </div>
                    <input
                      type="text"
                      maxLength={3}
                      className="form-control"
                      id="form-control"
                      name="airportArrival"
                      required
                      onChange={handleChange}
                      placeholder="Airport code eg. SYD"
                    />
                  </div>
                </div>
                <div className="datepicker__container">
                  <div id="input-group">
                    <div className="input-group-text">
                      <img
                        src={departure}
                        id="flight-icons"
                        alt="plane taking off"
                        width="30px"
                      ></img>
                      Departure Date
                    </div>
                    <div className="date-picker">
                      <RDPC
                        showIcon
                        selected={departDate}
                        name="departureDate"
                        onChange={handleDateChange}
                        placeholder="today"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                  {/* <div id="input-group">
                                        <div className="input-group-text">
                                            <img
                                                src={arrival}
                                                id="flight-icons"
                                                alt="plane landing"
                                                width="30px"
                                            ></img>
                                            Return Date
                                        </div>
                                        <div className="date-picker">
                                            <RDPC
                                                showIcon
                                                selected={arriveDate}
                                                onChange={(date) => setArriveDate(date)}
                                                placeholder="one-way"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </div> */}
                </div>
              </div>
              <div className="search-button__container">
                <button
                  type="submit"
                  onClick={_handleSubmit}
                  className="button__search--booking"
                >
                  {' '}
                  Search
                </button>
              </div>
            </div>
            {flightTableVisible && (
              <ApiFlightTable flights={flights} setFontSize={setFontSize} />
            )}
          </form>
          {message}
        </div>
      </div>
    </>
  );
};

export default Book;
