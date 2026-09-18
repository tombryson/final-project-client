import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';

function renderProfile(onLogout = jest.fn()) {
  return render(
    <MemoryRouter initialEntries={['/profile']}>
      <Routes>
        <Route element={<Outlet context={{ currentUserId: 7, onLogout, toggleAuth: jest.fn() }} />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<p>Home page</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({
    id: 7, first_name: 'Demo', last_name: 'User', email: 'demo@example.test',
  }) });
});

test.each(['Logout', 'Log Out'])('%s signs out and returns home', async (name) => {
  const onLogout = jest.fn();
  renderProfile(onLogout);
  fireEvent.click(await screen.findByRole('button', { name, exact: true }));
  expect(onLogout).toHaveBeenCalledTimes(1);
  expect(await screen.findByText('Home page')).toBeInTheDocument();
});

test('a chosen picture replaces the silhouette and persists when the profile reopens', async () => {
  const page = renderProfile();
  const input = await screen.findByLabelText('Choose profile picture');
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  const bytes = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aX1sAAAAASUVORK5CYII='), char => char.charCodeAt(0));
  fireEvent.change(input, { target: { files: [new File([bytes], 'avatar.png', { type: 'image/png' })] } });
  const picture = await screen.findByAltText('Your profile');
  const savedPicture = localStorage.getItem('profilePicture:7');
  expect(picture).toHaveAttribute('src', savedPicture);
  expect(savedPicture).toMatch(/^data:image\/png;base64,/);
  expect(screen.getByRole('button', { name: 'Change picture' })).toBeInTheDocument();

  page.unmount();
  renderProfile();
  expect(await screen.findByAltText('Your profile')).toHaveAttribute('src', savedPicture);
});

test('the profile does not display another account’s picture from this browser', async () => {
  localStorage.setItem('profilePicture:8', 'data:image/png;base64,another-account');
  renderProfile();
  expect(await screen.findByRole('button', { name: 'Add picture' })).toBeInTheDocument();
  expect(screen.queryByAltText('Your profile')).not.toBeInTheDocument();
});

test('unsupported and oversized files show an error without saving a picture', async () => {
  renderProfile();
  const input = await screen.findByLabelText('Choose profile picture');
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  fireEvent.change(input, { target: { files: [new File(['text'], 'notes.txt', { type: 'text/plain' })] } });
  expect(screen.getByRole('alert')).toHaveTextContent('Choose a JPG, PNG or WebP image.');
  const largeFile = new File([new Uint8Array(2 * 1024 * 1024 + 1)], 'large.png', { type: 'image/png' });
  fireEvent.change(input, { target: { files: [largeFile] } });
  expect(screen.getByRole('alert')).toHaveTextContent('Choose an image smaller than 2 MB.');
  expect(localStorage.getItem('profilePicture:7')).toBeNull();
});

test('a browser storage failure does not claim the picture was saved', async () => {
  renderProfile();
  const input = await screen.findByLabelText('Choose profile picture');
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('Storage full', 'QuotaExceededError'); });
  fireEvent.change(input, { target: { files: [new File(['image'], 'avatar.png', { type: 'image/png' })] } });
  expect(await screen.findByRole('alert')).toHaveTextContent('Unable to save this picture.');
  expect(screen.queryByAltText('Your profile')).not.toBeInTheDocument();
});
