import { faCropSimple } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import qantas from '../images/qantas.jpeg';
import jetstar from '../images/jetstar.png';
import airnewzealand from '../images/airnewzealand.png';
import unknown from '../images/unknown-carrier.png';
import moment from 'moment';

const ApiFlightTable = ({ flights }) => {
  function convertTo12HourFormat(time24) {
    return moment(time24, 'HH:mm').format('h:mm A');
  }

  const getBackgroundStyle = (code) => {
    const backgroundStyles = {
      QF: `linear-gradient(8deg, transparent 15px, #08090a 46px), 
           linear-gradient(#cccccc 45%, #f6bbbb9c 26%, #830808f7 70%)`,
      JQ: `linear-gradient(8deg, transparent 15px, rgb(8, 9, 10) 46px), 
          linear-gradient(rgb(204, 204, 204) 45%, rgba(246, 187, 187, 0.61) 26%, rgb(229 79 15 / 80%) 70%)`,
      ANZ: `linear-gradient(8deg, transparent 15px, rgb(8, 9, 10) 46px), linear-gradient(rgb(204, 204, 204) 45%, 
          rgba(246, 187, 187, 0.61) 26%, rgb(161 161 161 / 80%) 70%)`,
    };

    const style =
      backgroundStyles[code] ||
      `linear-gradient(8deg, transparent 15px, #08090a 46px), 
           linear-gradient(#cccccc 45%, #f6bbbb9c 26%, #830808f7 70%)`;
    console.log(code);
    console.log(style);
    return style;
  };

  const getBackgroundImage = (code) => {
    const backgroundColors = {
      QF: '#080808;',
      JQ: '#131314',
      ANZ: '#feffff',
    };

    return backgroundColors[code] || 'white';
  };

  const getAirlineImage = (code) => {
    const airlineImages = {
      QF: qantas,
      JQ: jetstar,
      ANZ: airnewzealand,
    };

    const image = airlineImages[code] || unknown;
    return image;
  };

  const duration = 500;
  const delay = 80;
  const animStr = (i) =>
    `fadeIn ${duration}ms ease-out ${delay * i}ms forwards`;

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
            <th>{Math.round((flight.elapsedTime * 100) / 60) / 100}h</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApiFlightTable;
