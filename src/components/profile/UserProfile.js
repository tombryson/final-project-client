import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './userProfile.module.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const signOut = () => {
    sessionStorage.removeItem('currentUserId');
    navigate('/');
  };

  return (
    <>
      <div className={styles['user-profile-page']}>
        <div class="content">
          <div class="section" id="overview">
            <h2>Overview</h2>
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Email:</strong> john.doe@example.com
            </p>
            <p>
              <strong>Upcoming Flight:</strong> Flight 123, 25th Dec 2024
            </p>
          </div>
          <div class="section" id="my-flights">
            <h2>My Flights</h2>
            <div class="flight-card">
              <p>
                <strong>Flight:</strong> 123
              </p>
              <p>
                <strong>Date:</strong> 25th Dec 2024
              </p>
              <p>
                <strong>Seats:</strong> 12A, 12B
              </p>
              <p>
                <strong>Status:</strong> Upcoming
              </p>
            </div>
            <div class="flight-card">
              <p>
                <strong>Flight:</strong> 456
              </p>
              <p>
                <strong>Date:</strong> 10th Nov 2024
              </p>
              <p>
                <strong>Seats:</strong> 10C
              </p>
              <p>
                <strong>Status:</strong> Completed
              </p>
            </div>
          </div>
          <div class="section" id="preferences">
            <h2>Preferences</h2>
            <p>
              <strong>Seat Preference:</strong> Aisle
            </p>
            <p>
              <strong>Preferred Airports:</strong> JFK, LAX
            </p>
          </div>

          <div class="section" id="settings">
            <h2>Settings</h2>
            <p>
              <a href="#">Change Password</a>
            </p>
            <p>
              <a href="#">Update Email/Phone</a>
            </p>
            <p>
              <a href="#">Delete Account</a>
            </p>
          </div>

          <div class="section" id="logout">
            <h2>Logout</h2>
            <button onClick={signOut}>Log Out</button>
          </div>
        </div>
        <div class={styles.sidebar}>
          <a className="nav-button" href="#overview">
            Overview
          </a>
          <a className="nav-button" href="#my-flights">
            My Flights
          </a>
          <a className="nav-button" href="#preferences">
            Preferences
          </a>
          <a className="nav-button" href="#settings">
            Settings
          </a>
          <a className="nav-button" href="#logout">
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
