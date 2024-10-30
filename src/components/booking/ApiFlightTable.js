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
import { height } from '@fortawesome/free-solid-svg-icons/fa0';

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
            <button type="button" className='extra-info-button' onClick={() => _openInfo(flight.flightNumber)}>
              <FontAwesomeIcon icon={faSquareCaretDown} />
            </button>
            </tr>
            {infoOpen[flight.flightNumber] && (
              <tr className='extra-info-border'>
                <td className='extra-flight-details'>
                <td colSpan="12"> est. duration</td>
                <th>{formatElapsedTime(flight.elapsedTime)}</th>
            </td>
            <th>
              <td className='extra-flight-svg'>
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" aria-hidden="true" class="icon-module_icon__B4xp9 icon-module_size-300__BfBMR icon-module_color-brand__FKpvJ"><path fill="currentColor" fill-rule="evenodd" d="M20.126 6.259h-4.875V4.586a.83.83 0 0 0-.813-.836H9.563a.83.83 0 0 0-.814.836V6.26H3.874A1.654 1.654 0 0 0 2.25 7.93v10.875a1.654 1.654 0 0 0 1.624 1.673h16.252a1.654 1.654 0 0 0 1.624-1.669V7.935a1.654 1.654 0 0 0-1.624-1.672zM9.968 5.213a.416.416 0 0 1 .408-.42h3.248c.228.004.41.191.409.42v1.046H9.968zM7.125 18.81H5.5V7.935h1.624zm11.374 0h-1.624V7.935H18.5z" clip-rule="evenodd"></path>
              </svg>
              </td>
              </th>
              <td>
              20kg
              </td>
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
