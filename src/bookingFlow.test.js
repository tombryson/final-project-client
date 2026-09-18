import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Confirmation from './components/confirmation/confirmation';
import MyFlights from './components/MyFlights';
import LoginForm from './components/signIn/LoginForm';

jest.mock('axios');

const flight = {
  bookingToken: 'signed-flight', flightNumber: '400', carrier: { iata: 'QF' },
  departure: { airport: { iata: 'MEL' }, date: { local: '2026-09-15' } },
  arrival: { airport: { iata: 'SYD' } },
};
const seat = { row: 12, col: 0, name: '12A' };

function renderPage(page, state = { flight, seat }) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/booking/400', state }]}>
      <Routes>
        <Route element={<Outlet context={{ currentUserId: 7, toggleAuth: jest.fn() }} />}>
          <Route path="/booking/:id" element={page} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
  localStorage.clear();
  global.fetch = jest.fn();
});

test('confirmation saves the selected seat and shows success only after the server accepts it', async () => {
  localStorage.setItem('token', 'user-token');
  fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 42 }) });
  renderPage(<Confirmation />);
  fireEvent.click(screen.getByRole('button', { name: 'Book', exact: true }));
  expect(await screen.findByRole('heading', { name: 'Booking saved' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View My Flights' })).toHaveAttribute('href', '/myflights');
  const [url, request] = fetch.mock.calls[0];
  expect(url).toBe('http://localhost:3000/bookings');
  expect(request.headers.Authorization).toBe('Bearer user-token');
  expect(JSON.parse(request.body)).toEqual({ booking: { flight_token: 'signed-flight', rows: 12, cols: 0 } });
});

test('a seat conflict keeps the user on confirmation and offers another seat', async () => {
  fetch.mockResolvedValue({ ok: false, status: 409, json: async () => ({ error: 'That seat has already been booked.' }) });
  renderPage(<Confirmation />);
  fireEvent.click(screen.getByRole('button', { name: 'Book', exact: true }));
  expect(await screen.findByRole('alert')).toHaveTextContent('That seat has already been booked.');
  expect(screen.queryByText('Booking saved')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Choose another seat' })).toHaveAttribute('href', '/book/flights/400');
});

test('opening confirmation without a selection offers a way back to search', () => {
  renderPage(<Confirmation />, null);
  expect(screen.getByRole('link', { name: 'Return to search' })).toHaveAttribute('href', '/book');
  expect(fetch).not.toHaveBeenCalled();
});

test('My Flights loads saved bookings from the server and displays the seat letter', async () => {
  localStorage.setItem('token', 'user-token');
  axios.get.mockResolvedValue({ data: [{ id: 42, rows: 12, cols: 0, flight: {
    id: 8, carrier: 'QF', flight_number: '400', from: 'MEL', to: 'SYD', date: '2026-09-15',
  } }] });
  renderPage(<MyFlights />);
  expect(await screen.findByText('Seat: 12A · Booking #42')).toBeInTheDocument();
  expect(screen.getByText('MEL to SYD · 2026-09-15')).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/bookings', { headers: { Authorization: 'Bearer user-token' } });
});

test('My Flights gives a user with no bookings a way to find their first flight', async () => {
  axios.get.mockResolvedValue({ data: [] });
  renderPage(<MyFlights />);
  expect(await screen.findByRole('heading', { name: 'No bookings yet' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Find a flight' })).toHaveAttribute('href', '/book');
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

const savedBooking = { id: 42, rows: 12, cols: 0, flight: {
  id: 8, carrier: 'QF', flight_number: '400', from: 'MEL', to: 'SYD', date: '2026-09-15',
} };

test('cancelling removes the booking only after the server succeeds', async () => {
  localStorage.setItem('token', 'user-token');
  axios.get.mockResolvedValue({ data: [savedBooking] });
  let finishCancel;
  axios.delete.mockReturnValue(new Promise((resolve) => { finishCancel = resolve; }));
  renderPage(<MyFlights />);
  fireEvent.click(await screen.findByRole('button', { name: 'Cancel booking' }));
  const modal = await screen.findByRole('dialog', { name: 'Cancel this booking?' });
  expect(axios.delete).not.toHaveBeenCalled();
  fireEvent.click(within(modal).getByRole('button', { name: 'Cancel booking' }));
  expect(screen.getByRole('button', { name: 'Cancelling…' })).toBeDisabled();
  expect(screen.getByText('Seat: 12A · Booking #42')).toBeInTheDocument();
  expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/bookings/42', { headers: { Authorization: 'Bearer user-token' } });
  await act(async () => finishCancel({ status: 204 }));
  expect(await screen.findByRole('heading', { name: 'No bookings yet' })).toBeInTheDocument();
  expect(screen.queryByText('Seat: 12A · Booking #42')).not.toBeInTheDocument();
});

test('a failed cancellation keeps the booking visible and allows another attempt', async () => {
  axios.get.mockResolvedValue({ data: [savedBooking] });
  axios.delete.mockRejectedValue(new Error('Network error'));
  renderPage(<MyFlights />);
  fireEvent.click(await screen.findByRole('button', { name: 'Cancel booking' }));
  const modal = await screen.findByRole('dialog', { name: 'Cancel this booking?' });
  fireEvent.click(within(modal).getByRole('button', { name: 'Cancel booking' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Unable to cancel your booking.');
  expect(screen.getByText('Seat: 12A · Booking #42')).toBeInTheDocument();
  expect(within(modal).getByRole('button', { name: 'Cancel booking' })).toBeEnabled();
});

test('keeping a booking closes the modal without sending a cancellation request', async () => {
  axios.get.mockResolvedValue({ data: [savedBooking] });
  renderPage(<MyFlights />);
  fireEvent.click(await screen.findByRole('button', { name: 'Cancel booking' }));
  const modal = await screen.findByRole('dialog', { name: 'Cancel this booking?' });
  fireEvent.click(within(modal).getByRole('button', { name: 'Keep booking' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(axios.delete).not.toHaveBeenCalled();
  expect(screen.getByText('Seat: 12A · Booking #42')).toBeInTheDocument();
});

test('sign in uses the login endpoint and keeps the returned user', async () => {
  const handleLogin = jest.fn();
  fetch.mockResolvedValue({ ok: true, json: async () => ({ user: { id: 7 }, jwt: 'user-token' }) });
  render(<LoginForm handleLogin={handleLogin} />);
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'demo@example.test' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'demo-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  await waitFor(() => expect(handleLogin).toHaveBeenCalledWith({ id: 7 }));
  expect(fetch.mock.calls[0][0]).toBe('http://localhost:3000/login');
  expect(localStorage.getItem('token')).toBe('user-token');
});

test('failed sign in shows the error without treating the user as authenticated', async () => {
  const handleLogin = jest.fn();
  fetch.mockResolvedValue({ ok: false, json: async () => ({ error: 'Incorrect email or password.' }) });
  render(<LoginForm handleLogin={handleLogin} />);
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'demo@example.test' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Incorrect email or password.');
  expect(handleLogin).not.toHaveBeenCalled();
  expect(localStorage.getItem('token')).toBeNull();
});
