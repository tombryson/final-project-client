import React, { useState } from 'react';
import axios from 'axios';
import bootstrap from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import departure from '../images/book-icon.png'
import arrival from '../images/icon-arrival.png';

const Book = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [flights, setFlights] = useState([{}]);

  const _handleSubmit = (event) => {
    console.log('submitting')
    event.preventDefault();
    axios(`http://localhost:3000/search/${from}/${to}.json`).then((response) => {
      setFlights(response.data);
	  console.log(response.data)
    })
	};

  const _handleTo = (form) => {
    setTo(form.target.value);
  };

  const _handleFrom = (form) => {
    console.log("handling")
    setFrom(form.target.value);
  };

  const flight = flights.map(item => {
	console.log(item.flight_id) 
	console.log(item.id);
	return (<FlightTable key={item.flight_id} flights={item}/>)
  })


  return (
    <>
		<h3 className="book">Search for an existing flight</h3>
		<form className="book-form" onSubmit={_handleSubmit}>
		<div className="search-form">
			<div className="col-sm-3 my-1">
			<label className="sr-only">Search</label>
			<div id="input-group">
				<div className="input-group-prepend">
				<div className="input-group-text">
					<img src={departure} id='flight-icons' alt="plane taking off" width="30px"></img>Departing
				</div>
				</div>
				<input
				type="text"
				className="form-control"
				id='form-control'
				required
				onChange={_handleFrom}
				placeholder="eg. MEL"
				/>
			</div>
			<div id="input-group">
			<div className="input-group-prepend">
				<div className="input-group-text">
				<img src={arrival} id='flight-icons' alt="plane landing" width="30px"></img>Arriving
				</div>
			</div>
			<input
				type="text"
				className="form-control"
				id='form-control'
				required
				onChange={_handleTo}
				placeholder="eg. SYD"
			/>
			</div>
			<button type="submit" className="btn btn-primary mb-2">Submit</button>
			</div>
		</div>
		</form>
		{flight}
    </>
  );
};

const FlightTable = (props) => {
	console.log('rendering the flighttable')
	console.log(props);
	return (
		<div>
			<a href={`http://localhost:3000/flights/${props.flights.id}`}>
			Flight: from {props.flights.from} to {props.flights.to} departing on {props.flights.date}
			</a>
		</div>
	)

}

export default Book;
