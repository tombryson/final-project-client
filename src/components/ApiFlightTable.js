import { faCropSimple } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import qantas from '../images/qantas.jpeg';
import moment from 'moment';

const ApiFlightTable = ({ flights }) => {
  const airlineImages = {
    QF: { qantas },
  };

  function convertTo12HourFormat(time24) {
    return moment(time24, 'HH:mm').format('h:mm A');
  }

  const getAirlineImage = (code) => {
    return airlineImages[code] || 'path/to/default-image.png';
  };

  return (
    <table>
      <tbody>
        {flights.map((flight, index) => (
          <tr className="returned-flights" key={index}>
            <td>
              <img
                // src={getAirlineImage(flight.carrier.iata)}
                src={qantas}
                alt={flight.carrier.iata}
                width="50"
                height="50"
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
