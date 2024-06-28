import React, { useEffect, useState } from 'react';

const FlightTable = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/flights')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFlights(data.data);
      })
      .catch((error) => console.error('Error fetching flight data:', error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Flight Number</th>
          <th>Departure Airport</th>
          <th>Departure Time</th>
          <th>Arrival Airport</th>
          <th>Arrival Time</th>
          <th>Estimated Travel Time</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight, index) => (
          <tr key={index}>
            <td>{flight.flightNumber}</td>
            <td>{flight.departure.airport.iata}</td>
            <td>{flight.departure.time.local}</td>
            <td>{flight.arrival.airport.iata}</td>
            <td>{flight.arrival.time.local}</td>
            <td>{Math.round((flight.elapsedTime * 100) / 60) / 100}h</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;
