import React from 'react';
import styles from './confirmation.module.css';
import { useLocation } from 'react-router-dom';
import { airlineNames } from '../booking/AirlineStyles.js';

const Confirmation = () => {
  const location = useLocation();
  const flight = location.state?.flight;
  const seat = location.state?.seat;

  const _handleConfirmFlight = async () => {
    const saveFlight = await fetch(
      `http://localhost:3000/flights/${flight.flightNumber}/confirmation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flight: {
            flightNumber: flight.flightNumber,
            departureDate: flight.departureDate,
            airportDeparture: flight.departure.airport.iata,
            airportArrival: flight.arrival.airport.iata,
            seatId: seat.name,
          },
        }),
      },
    );
    console.log(`Sending off confirmation to the backend!}`);
  };

  return (
    <div className={styles['confirmation-container']}>
      <h1>Flight Confirmation</h1>
      <div>
        <h2>
          <i>You are booking:</i>
        </h2>
        <br></br>
        <h3>
          {airlineNames[String(flight.carrier.iata)]} Flight:{' '}
          {String(flight.flightNumber)}
        </h3>
        <h3>
          {String(flight.departure.airport.iata)} to{' '}
          {String(flight.arrival.airport.iata)}
        </h3>
        <h3>Seat: {String(seat.name)}</h3>
      </div>
      <div className={styles['confirmation-button']}>
        <button
          className={styles['ui-button']}
          onClick={_handleConfirmFlight}
          type="submit"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
