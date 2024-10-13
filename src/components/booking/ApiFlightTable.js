import { faCropSimple } from '@fortawesome/free-solid-svg-icons';
import {
  backgroundStyles,
  backgroundColors,
  airlineImages,
  borderImages,
} from './AirlineStyles.js';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import hashSum from 'hash-sum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';

const ApiFlightTable = ({ flights }) => {
  const [infoOpen, setInfoOpen] = useState({});
  const navigate = useNavigate();

  function convertTo12HourFormat(time24) {
    return moment(time24, 'HH:mm').format('h:mm A');
  }

  const formatElapsedTime = (elapsedTime) => {
    const hours = Math.floor(elapsedTime / 60);
    const minutes = elapsedTime % 60;
    return `${hours}h ${minutes}m`;
  };

  const _openInfo = (flightNumber) => {
    setInfoOpen(prevState => ({
      ...prevState,
      [flightNumber]: !prevState[flightNumber],
    }));
  }

  const getBackgroundStyle = (code) =>
    backgroundStyles[code] || backgroundStyles.default;
  const getBackgroundImage = (code) =>
    backgroundColors[code] || backgroundColors.default;
  const getAirlineImage = (code) =>
    airlineImages[code] || airlineImages.default;
  const getBorderImage = (code) => borderImages[code] || borderImages.default;

  function flightNumberToHash(flightNumber) {
    return hashSum(flightNumber).slice(0, 8);
  }

  function handleFlightSelect(flight) {
    navigate(`/book/flights/${flightNumberToHash(flight.flightNumber)}`, {
      state: { flight },
    });
  }

  const duration = 500;
  const delay = 80;
  const animStr = (i) =>
    `fadeIn ${duration}ms ease-out ${delay * i}ms forwards`;

  return (
    <table>
      <tbody>
        {flights.map((flight, index) => (
          <React.Fragment key={index}>
          <tr
            className="returned-flights"
            key={index}
            style={{
              animation: animStr(index),
              backgroundImage: getBackgroundStyle(flight.carrier.iata),
              borderImage: getBorderImage(flight.carrier.iata),
              paddingBottom: infoOpen[flight.flightNumber] ? "12px" : "3px",
            }}
          >
            <tr className='table-data-container extra-info-row open'>
            <td colSpan={6}>
              <img
                src={getAirlineImage(flight.carrier.iata)}
                alt={flight.carrier.iata}
                width="50"
                height="50"
                style={{
                  backgroundColor: getBackgroundImage(flight.carrier.iata),
                }}
              />
            </td>
            <th>Flight</th>
            <td>{flight.flightNumber}</td>
            <div className="flight-destination-groupings">
              <div style={{ height: 30 + 'px' }}>
                <td>Departing</td>
                <th>{flight.departure.airport.iata}</th>
              </div>
              <div>
                <td>Arriving</td>
                <th>{flight.arrival.airport.iata}</th>
              </div>
            </div>
            <div className="flight-time-groupings">
              <tr style={{whiteSpace:"nowrap"}}>
                <th>{convertTo12HourFormat(flight.departure.time.local)}</th>
                <td>&#x2192;</td>
                <th>{convertTo12HourFormat(flight.arrival.time.local)}</th>
              </tr>
              <tr>
                <td className='date-of-flight'>
                {format(parseISO(flight.departure.date.local), "do MMMM")}
                </td>
                <td></td>
                <td className='date-of-flight'>
                {format(parseISO(flight.arrival.date.local), "do MMMM")}
                </td>
              </tr>
            </div>
            <th className='flight-prices'><span style={{color: "white", fontSize: "small"}}>from</span> {` $${flight.price}`}</th>
            <td>
              <button
                className="booking-select-flight"
                onClick={() => handleFlightSelect(flight)}
              >
                Select flight
              </button>
            </td>
            <button type="button" className='extra-info' onClick={() => _openInfo(flight.flightNumber)}>
              <FontAwesomeIcon icon={faSquareCaretDown} />
            </button>
            </tr>
            {infoOpen[flight.flightNumber] && (
              <tr>
                <td colSpan="12"> est. duration</td>
            <th>{formatElapsedTime(flight.elapsedTime)}</th>
                </tr>
          )}
          </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ApiFlightTable;
