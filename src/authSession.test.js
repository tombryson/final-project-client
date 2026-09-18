import { act, fireEvent, render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom/client';

jest.mock('./components/SiteHead.js', () => () => null);
jest.mock('./components/home/Home.js', () => () => null);
jest.mock('./components/home/CarouselHome.js', () => () => null);
jest.mock('./components/home/WelcomePage.js', () => () => null);
jest.mock('./components/home/DealsCallout.js', () => () => null);
jest.mock('./components/NavBar.js', () => ({ currentUserId, onLogout }) => (
  <div>
    <p>{currentUserId ? 'Signed in' : 'Signed out'}</p>
    <button onClick={onLogout}>Log out</button>
  </div>
));

let app;
beforeAll(() => {
  const rootRender = jest.fn();
  const createRoot = jest.spyOn(ReactDOM, 'createRoot').mockReturnValueOnce({ render: rootRender });
  require('./index');
  app = rootRender.mock.calls[0][0];
  createRoot.mockRestore();
});

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem('token', 'original-token');
  sessionStorage.setItem('currentUserId', '7');
  global.fetch = jest.fn();
});

test('a delayed auto-login response cannot sign the user back in after logout', async () => {
  let respond;
  fetch.mockReturnValue(new Promise((resolve) => { respond = resolve; }));
  render(app);
  fireEvent.click(screen.getByRole('button', { name: 'Log out' }));
  await act(async () => respond({ ok: true, json: async () => ({ id: 7 }) }));
  expect(screen.getByText('Signed out')).toBeInTheDocument();
  expect(sessionStorage.getItem('currentUserId')).toBeNull();
  expect(localStorage.getItem('token')).toBeNull();
});

test('logout also wins if the previous response body is still being read', async () => {
  let finishBody;
  fetch.mockResolvedValue({ ok: true, json: () => new Promise((resolve) => { finishBody = resolve; }) });
  render(app);
  await act(async () => {});
  fireEvent.click(screen.getByRole('button', { name: 'Log out' }));
  await act(async () => finishBody({ id: 7 }));
  expect(screen.getByText('Signed out')).toBeInTheDocument();
  expect(sessionStorage.getItem('currentUserId')).toBeNull();
});

test('a valid unchanged token still restores the signed-in user', async () => {
  sessionStorage.removeItem('currentUserId');
  fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 7 }) });
  render(app);
  expect(await screen.findByText('Signed in')).toBeInTheDocument();
  expect(sessionStorage.getItem('currentUserId')).toBe('7');
});
