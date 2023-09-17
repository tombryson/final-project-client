import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyTrips = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState([]);
  const [trips, setTrips] = useState([]);
  const [flight, setFlight] = useState([]);

  useEffect(() => {
    showTrips();
  }, [trips.length]);

  const siteURL = 'http://localhost:3000/';

  const showTrips = () => {
    let currentUserId = sessionStorage.getItem('currentUserId');
    axios.get(`${siteURL}/users/${currentUserId}`).then((response) => {
      setTrips(response.data[1]);
      setUser(response.data[0]);
    });
  };

  const getFlight = (flight_id) => {
    axios.get(`${siteURL}/flights/${flight_id}`).then((response) => {
      setFlight(response.data[1]);
    });
  };

  const TripsTable = (props) => {
    console.log(props);
    console.log(props.trips.cols);
    console.log(props.trips.rows);
    let seatString = 'ABCDEF';
    let name = seatString[props.trips.cols] + props.trips.rows;
    console.log(name);
    return (
      <div className="searched-flight">
        Flight: from {props.flight.from} to {props.flight.to}. Seat ID: {name}
      </div>
    );
  };

  const booking = trips.map((item) => {
    if (flight.id !== item.flight_id) {
      getFlight(item.flight_id);
    }
    return item.user_id !== undefined ? (
      <TripsTable key={item.id} trips={item} flight={flight} />
    ) : (
      []
    );
  });

  return (
    <>
      <h1 className="my-trips">My Trips</h1>
      <div className="flights">{booking}</div>
    </>
  );
};

export default MyTrips;
