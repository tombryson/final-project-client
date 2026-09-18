import API_URL from '../api.js';
import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

const MyFlights = () => {
  const [trips, setTrips] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelError, setCancelError] = useState('');
  const { currentUserId, toggleAuth } = useOutletContext();

  useEffect(() => {
    let isCurrent = true;
    setTrips([]);
    setMessage('');
    setBookingToCancel(null);
    setCancelError('');
    if (!currentUserId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    axios.get(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => { if (isCurrent) setTrips(response.data); })
      .catch((error) => {
        if (isCurrent) setMessage(error.response?.data?.error || 'Unable to load your flights.');
      })
      .finally(() => { if (isCurrent) setIsLoading(false); });
    return () => { isCurrent = false; };
  }, [currentUserId]);

  const handleCancelBooking = (trip) => {
    if (cancellingId) return;
    setCancellingId(trip.id);
    setCancelError('');
    axios.delete(`${API_URL}/bookings/${trip.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => {
        setTrips((bookings) => bookings.filter((booking) => booking.id !== trip.id));
        setBookingToCancel(null);
      })
      .catch((error) => setCancelError(error.response?.data?.error || 'Unable to cancel your booking. Please try again.'))
      .finally(() => setCancellingId(null));
  };

  return (
    <div className="my-flights-container">
      {!currentUserId && (
        <div className="my-flights-empty">
          <FontAwesomeIcon icon={faPlane} className="my-flights-icon" />
          <h2>Your bookings</h2>
          <button className="my-flights-action" type="button" onClick={toggleAuth}>Sign in to see your flights</button>
        </div>
      )}
      {isLoading && <p role="status">Loading your flights…</p>}
      {message && <p role="alert">{message}</p>}
      {currentUserId && !isLoading && !message && trips.length === 0 && (
        <div className="my-flights-empty">
          <FontAwesomeIcon icon={faPlane} className="my-flights-icon" />
          <h2>No bookings yet</h2>
          <p>Your booked flights will appear here.</p>
          <Link className="my-flights-action" to="/book">Find a flight</Link>
        </div>
      )}
      {trips.map((trip) => (
        <div className="flights" key={trip.id}>
          <h2>{trip.flight.carrier} {trip.flight.flight_number || `Flight ${trip.flight.id}`}</h2>
          <p>{trip.flight.from} to {trip.flight.to} · {trip.flight.date}</p>
          <p>Seat: {trip.rows}{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[trip.cols]} · Booking #{trip.id}</p>
          <button className="my-flights-action" type="button" onClick={() => { setCancelError(''); setBookingToCancel(trip); }} disabled={cancellingId !== null}>
            Cancel booking
          </button>
        </div>
      ))}
      <Modal
        show={bookingToCancel !== null}
        onHide={() => { if (!cancellingId) setBookingToCancel(null); }}
        centered
        className="cancel-booking-modal"
        aria-labelledby="cancel-booking-title"
        backdrop={cancellingId ? 'static' : true}
        keyboard={!cancellingId}
      >
        <Modal.Header closeButton={!cancellingId} closeVariant="white">
          <Modal.Title id="cancel-booking-title">Cancel this booking?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookingToCancel && (
            <>
              <p>{bookingToCancel.flight.carrier} {bookingToCancel.flight.flight_number} · {bookingToCancel.flight.from} to {bookingToCancel.flight.to}</p>
              <p>{bookingToCancel.flight.date} · Seat {bookingToCancel.rows}{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[bookingToCancel.cols]} · Booking #{bookingToCancel.id}</p>
            </>
          )}
          {cancelError && <p role="alert">{cancelError}</p>}
        </Modal.Body>
        <Modal.Footer>
          <button className="my-flights-action my-flights-keep" type="button" onClick={() => setBookingToCancel(null)} disabled={cancellingId !== null} autoFocus>Keep booking</button>
          <button className="my-flights-action" type="button" onClick={() => handleCancelBooking(bookingToCancel)} disabled={cancellingId !== null}>
            {cancellingId ? 'Cancelling…' : 'Cancel booking'}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyFlights;
