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
import { format } from 'date-fns';

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
    departureDate: '2024-06-30',
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

  useEffect(() => {
    // Font size transition
    setIsVisible(true);
    setFontSize(4.6);
    const handleScroll = () => {
      const scrollableElement = document.querySelector('.booking-container');
      if (scrollableElement) {
        const scrollY = scrollableElement.scrollTop;

        if (scrollY > 30 && window.innerWidth <= 1600) {
          setFontSize(3.1);
        } else {
          setFontSize(4.4);
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
    console.log(formData);
  };

  const _handleSubmit = throttle(async (event) => {
    event.preventDefault();

    const { departureDate, airportDeparture, airportArrival } = formData;

    const apiURL =
      `https://flight-info-api.p.rapidapi.com/schedules?version=v2&DepartureDateTime=${departureDate}` +
      // `&ArrivalDateTime=${arrivalDate}` +
      // `&CarrierCode=${carrierCode}`+
      `&DepartureAirport=${airportDeparture}` +
      `&ArrivalAirport=${airportArrival}` +
      `&FlightType=Scheduled&CodeType=IATA&ServiceType=Passenger`;
    setFlightTableVisible(true);

    try {
      // const response = await fetch('./data.json'); // Placeholder values
      console.log(apiURL);
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'flight-info-api.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const JSONdata = await response.json();
      const flightData = JSONdata.data;
      const pricingResponse = await fetch(
        'http://localhost:3000/flights/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(flightData),
        },
      );

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
