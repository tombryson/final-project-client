import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import departure from '../../images/book-icon.png';
import arrival from '../../images/icon-arrival.png';
import * as RDP from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiFlightTable from './ApiFlightTable.js';

const BookingForm = ({
    formData,
    handleChange,
    handleDateChange,
    handleSubmit,
    departDate,
    flights,
    flightTableVisible,
    setFontSize,
    isLoading,
    message,
}) => {
    const RDPC = RDP.default?.default || RDP.default || RDP;

    return (
        <form className="results__container" onSubmit={handleSubmit}>
            <div className="booking-margin">
                <div className="search__container">
                    <div className="destination__container">
                        <div id="input-group">
                            <div className="input-group-text">
                                <img
                                    src={departure}
                                    id="flight-icons"
                                    alt="plane taking off"
                                    width="30px"
                                />
                                Departing
                            </div>
                            <input
                                type="text"
                                maxLength={3}
                                className="form-control"
                                id="form-control"
                                name="airportDeparture"
                                required
                                onChange={handleChange}
                                value={formData.airportDeparture}
                                placeholder="Airport code eg. MEL"
                            />
                        </div>
                        <div id="input-group">
                            <div className="input-group-text">
                                <img
                                    src={arrival}
                                    id="flight-icons"
                                    alt="plane landing"
                                    width="30px"
                                />
                                Arriving
                            </div>
                            <input
                                type="text"
                                maxLength={3}
                                className="form-control"
                                id="form-control"
                                name="airportArrival"
                                required
                                onChange={handleChange}
                                value={formData.airportArrival}
                                placeholder="Airport code eg. SYD"
                            />
                        </div>
                    </div>
                    <div className="datepicker__container">
                        <div id="input-group">
                            <div className="input-group-text">
                                <img
                                    src={departure}
                                    id="flight-icons"
                                    alt="plane taking off"
                                    width="30px"
                                />
                                Departure Date
                            </div>
                            <div className="date-picker">
                                <RDPC
                                    showIcon
                                    selected={departDate}
                                    name="departureDate"
                                    onChange={handleDateChange}
                                    placeholder="today"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-button__container">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="button__search--booking"
                    >
                        {isLoading ? 'Searching…' : 'Search'}
                    </button>
                </div>
            </div>
            {message && <p role="alert" className="alert alert-danger">{message}</p>}
            {flightTableVisible && flights.length === 0 && (
                <p role="status" className="alert alert-info">
                    No flights found for this route and date.
                </p>
            )}
            {flightTableVisible && (
                <ApiFlightTable flights={flights} setFontSize={setFontSize} />
            )}
        </form>
    );
};

export default BookingForm;
