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

const ApiFlightTable = ({ flights }) => {
  const navigate = useNavigate();

  function convertTo12HourFormat(time24) {
    return moment(time24, 'HH:mm').format('h:mm A');
  }

  const formatElapsedTime = (elapsedTime) => {
    const hours = Math.floor(elapsedTime / 60);
    const minutes = elapsedTime % 60;
    return `${hours}h ${minutes}m`;
  };

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

  return (
    <table>
      <tbody>
        {flights.map((flight, index) => (
          <tr
            className="returned-flights"
            key={index}
            style={{
              animation: animStr(index),
              backgroundImage: getBackgroundStyle(flight.carrier.iata),
              borderImage: getBorderImage(flight.carrier.iata),
            }}
          >
            <td>
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
            <div className="test">
              <div style={{ height: 30 + 'px' }}>
                <td>Departing</td>
                <th>{flight.departure.airport.iata}</th>
              </div>
              <div>
                <td>Arriving</td>
                <th>{flight.arrival.airport.iata}</th>
              </div>
            </div>
            <div className="test">
              <th>{convertTo12HourFormat(flight.departure.time.local)}</th>
              <td>&#x2192;</td>
              <th>{convertTo12HourFormat(flight.arrival.time.local)}</th>
            </div>
            <td>est. duration</td>
            <th>{formatElapsedTime(flight.elapsedTime)}</th>
            <td>
              <button
                className="booking-select-flight"
                onClick={() => handleFlightSelect(flight)}
              >
                Select flight
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApiFlightTable;
