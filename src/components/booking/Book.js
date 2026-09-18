import API_URL from '../../api.js';
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoBackground from './videoBackground.jsx';
import BookingForm from './BookingForm.jsx';
import { endOfToday, format, startOfToday } from 'date-fns';

const Book = () => {
    const [departDate, setDepartDate] = useState(new Date());
    const { setFontSize } = useOutletContext();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [flights, setFlights] = useState([]);
    const [flightTableVisible, setFlightTableVisible] = useState(false);
    const [formData, setFormData] = useState({
        departureDate: format(startOfToday(), 'yyyy-MM-dd'),
        airportDeparture: 'MEL',
        airportArrival: 'SYD',
    });

    const handleDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setFormData({ ...formData, departureDate: formattedDate });
        setDepartDate(date);
    };

    const duration = 800;
    const delay = 100;
    const animStr = (i) =>
        `fadeIn ${duration}ms ease-out ${delay * i}ms forwards`;
    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        setIsVisible(true);
        setFontSize(4.3);
        const handleScroll = () => {
            const scrollableElement =
                document.querySelector('.booking-container');
            if (scrollableElement) {
                const scrollY = scrollableElement.scrollTop;
                if (scrollY > 30 && window.innerWidth <= 1600) {
                    setFontSize(2.9);
                } else {
                    setFontSize(4.3);
                }
            }
        };
        const scrollableElement = document.querySelector('.booking-container');
        if (scrollableElement) {
            scrollableElement.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollableElement) {
                scrollableElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [setFontSize]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.toUpperCase() });
    };

    const _handleSubmit = async (event) => {
        event.preventDefault();
        const { departureDate, airportDeparture, airportArrival } = formData;
        if (isLoading) return;
        setIsLoading(true);
        setMessage('');
        setFlights([]);
        setFlightTableVisible(false);

        try {
            const response = await fetch(
                `${API_URL}/flights/submit`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        flight: {
                            departureDate,
                            airportDeparture,
                            airportArrival,
                        },
                    }),
                },
            );

            const flightData = await response.json();
            if (!response.ok) {
                throw new Error(flightData.error || 'Flight search failed. Please try again.');
            }
            if (!Array.isArray(flightData)) {
                throw new Error('Flight search returned an unexpected response. Please try again.');
            }
            setFlights(flightData);
            setFlightTableVisible(true);
        } catch (error) {
            setMessage(error instanceof TypeError
                ? 'Unable to reach flight search. Check that the backend is running and try again.'
                : error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="book_background">
                <div className="video-container">
                    <VideoBackground />
                </div>
                <div className="booking-container">
                    <BookingForm
                        formData={formData}
                        handleChange={handleChange}
                        handleDateChange={handleDateChange}
                        handleSubmit={_handleSubmit}
                        departDate={departDate}
                        flights={flights}
                        flightTableVisible={flightTableVisible}
                        setFontSize={setFontSize}
                        isLoading={isLoading}
                        message={message}
                    />

                </div>
            </div>
        </>
    );
};

export default Book;
