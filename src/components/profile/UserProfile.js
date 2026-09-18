import API_URL from '../../api.js';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './userProfile.module.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUserId, onLogout, toggleAuth } = useOutletContext();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState('');
  const [pictureError, setPictureError] = useState('');
  const pictureInput = useRef(null);
  const pictureReader = useRef(null);

  const handlePictureChange = (evt) => {
    const file = evt.target.files[0];
    evt.target.value = '';
    if (!file) return;
    setPictureError('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setPictureError('Choose a JPG, PNG or WebP image.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPictureError('Choose an image smaller than 2 MB.');
      return;
    }
    pictureReader.current?.abort();
    const reader = new FileReader();
    pictureReader.current = reader;
    reader.onload = () => {
      try {
        localStorage.setItem(`profilePicture:${user.id}`, reader.result);
        setPicture(reader.result);
      } catch {
        setPictureError('Unable to save this picture. Try a smaller image or free up browser storage.');
      }
    };
    reader.onerror = () => setPictureError('Unable to read this picture. Please try another image.');
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    let isCurrent = true;
    setUser(null);
    setMessage('');
    setPicture('');
    setPictureError('');
    if (!currentUserId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetch(`${API_URL}/auto_login`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to load your profile.');
        if (isCurrent) {
          try {
            setPicture(localStorage.getItem(`profilePicture:${data.id}`) || '');
          } catch {
            setPictureError('Picture storage is unavailable in this browser.');
          }
          setUser(data);
        }
      })
      .catch((error) => { if (isCurrent) setMessage(error.message); })
      .finally(() => { if (isCurrent) setIsLoading(false); });
    return () => {
      isCurrent = false;
      pictureReader.current?.abort();
    };
  }, [currentUserId]);

  const signOut = () => {
    onLogout();
    navigate('/');
  };

  if (!currentUserId) {
    return (
      <div className={styles['user-profile-page']}>
        <button className={styles.button} type="button" onClick={toggleAuth}>Sign in to view your profile</button>
      </div>
    );
  }

  return (
    <>
      <div className={styles['user-profile-page']}>
        <div className={styles.content}>
          <div className={styles.section} id="overview">
            <h2>Overview</h2>
            {isLoading && <p role="status">Loading your profile…</p>}
            {message && <p role="alert">{message}</p>}
            {user && (
              <div className={styles['profile-details']}>
                <div className={styles['profile-picture']}>
                  <div className={styles.avatar}>
                    {picture ? <img src={picture} alt="Your profile" /> : <FontAwesomeIcon icon={faUser} title="Default profile picture" />}
                  </div>
                  <input ref={pictureInput} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose profile picture" onChange={handlePictureChange} hidden />
                  <button className={styles['picture-button']} type="button" onClick={() => pictureInput.current.click()}>
                    {picture ? 'Change picture' : 'Add picture'}
                  </button>
                </div>
                <div>
                  <p><strong>Name:</strong> {[user.first_name, user.last_name].filter(Boolean).join(' ') || 'Not provided'}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  {pictureError && <p role="alert">{pictureError}</p>}
                </div>
              </div>
            )}
          </div>
          <div className={styles.section} id="my-flights">
            <h2>My Flights</h2>
            <Link to="/myflights">View your booked flights</Link>
          </div>
          <div className={styles.section} id="logout">
            <h2>Logout</h2>
            <button className={styles.button} type="button" onClick={signOut}>Log Out</button>
          </div>
        </div>
        <nav className={styles.sidebar} aria-label="Profile sections">
          <a href="#overview">
            Overview
          </a>
          <a href="#my-flights">
            My Flights
          </a>
          <button type="button" onClick={signOut}>
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default UserProfile;
