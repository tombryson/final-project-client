import API_URL from '../../api.js';
import React, { useState } from 'react';
import styles from './confirmation.module.css';
import { useLocation, useOutletContext, useParams, Link } from 'react-router-dom';
import { airlineNames } from '../booking/AirlineStyles.js';

const Confirmation = () => {
  const location = useLocation();
  const { id } = useParams();
  const { currentUserId, toggleAuth } = useOutletContext();
  const flight = location.state?.flight;
  const seat = location.state?.seat;
  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const _handleConfirmFlight = async () => {
    if (!currentUserId) {
      toggleAuth();
      return;
    }
    if (isSaving || booking) return;
    setIsSaving(true);
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ booking: {
          flight_token: flight.bookingToken,
          rows: seat.row,
          cols: seat.col,
        } }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) toggleAuth();
        throw new Error(data.error || 'Unable to save your booking.');
      }
      setBooking(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!flight || !seat) {
    return <div className={styles['confirmation-container']}><p>Select a flight and seat first.</p><Link to="/book">Return to search</Link></div>;
  }

  return (
    <div className={styles['confirmation-container']}>
      <h1>{booking ? 'Booking saved' : 'Flight Confirmation'}</h1>
      <div>
        <h2><i>{booking ? 'Your booking:' : 'You are booking:'}</i></h2>
        <br />
        <h3>{airlineNames[flight.carrier.iata]} Flight: {flight.flightNumber}</h3>
        <h3>{flight.departure.airport.iata} to {flight.arrival.airport.iata}</h3>
        <p>Departure: {flight.departure.date.local}</p>
        <h3>Seat: {seat.name}</h3>
        <p>Demo booking — no airline ticket is issued.</p>
      </div>
      {message && <p role="alert">{message}</p>}
      {booking ? (
        <div role="status">
          <p>Booking #{booking.id} has been saved to your account.</p>
          <Link to="/myflights">View My Flights</Link>
        </div>
      ) : (
        <div className={styles['confirmation-button']}>
          <button className={styles['ui-button']} onClick={_handleConfirmFlight} disabled={isSaving} type="button">
            {isSaving ? 'Saving…' : 'Book'}
          </button>
          <p><Link to={`/book/flights/${id}`} state={{ flight }}>Choose another seat</Link></p>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
