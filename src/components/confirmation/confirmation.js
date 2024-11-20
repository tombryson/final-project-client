import React from 'react';
import styles from './confirmation.module.css'
import { useLocation } from 'react-router-dom';
import { airlineNames } from '../booking/AirlineStyles.js';

const Confirmation = () => {
  const location = useLocation();
  const flight = location.state?.flight;
  const seat = location.state?.seat;

  return (
    <div className={styles["confirmation-container"]}>
      <h1>Flight Confirmation</h1>
      <div>
        <h2><i>You are booking:</i></h2>
        <br></br>
      <h3>{airlineNames[String(flight.carrier.iata)]} Flight: {String(flight.flightNumber)}</h3>
      <h3>{String(flight.departure.airport.iata)} to {String(flight.arrival.airport.iata)}</h3>
      <h3>Seat: {String(seat.name)}</h3>
      </div>
    </div>
  );
};

export default Confirmation;