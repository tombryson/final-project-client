import React from "react";

const UserProfile = () => {

    return (
        <div className="booking-container">
            
  <div class="sidebar">
    <h2>Profile Menu</h2>
    <a href="#overview">Overview</a>
    <a href="#my-flights">My Flights</a>
    <a href="#preferences">Preferences</a>
    <a href="#settings">Settings</a>
    <a href="#logout">Logout</a>
  </div>

  <div class="content">
    <div class="section" id="overview">
      <h2>Overview</h2>
      <p><strong>Name:</strong> John Doe</p>
      <p><strong>Email:</strong> john.doe@example.com</p>
      <p><strong>Upcoming Flight:</strong> Flight 123, 25th Dec 2024</p>
    </div>

    <div class="section" id="my-flights">
      <h2>My Flights</h2>
      <div class="flight-card">
        <p><strong>Flight:</strong> 123</p>
        <p><strong>Date:</strong> 25th Dec 2024</p>
        <p><strong>Seats:</strong> 12A, 12B</p>
        <p><strong>Status:</strong> Upcoming</p>
      </div>
      <div class="flight-card">
        <p><strong>Flight:</strong> 456</p>
        <p><strong>Date:</strong> 10th Nov 2024</p>
        <p><strong>Seats:</strong> 10C</p>
        <p><strong>Status:</strong> Completed</p>
      </div>
    </div>

    <div class="section" id="preferences">
      <h2>Preferences</h2>
      <p><strong>Seat Preference:</strong> Aisle</p>
      <p><strong>Preferred Airports:</strong> JFK, LAX</p>
    </div>

    <div class="section" id="settings">
      <h2>Settings</h2>
      <p><a href="#">Change Password</a></p>
      <p><a href="#">Update Email/Phone</a></p>
      <p><a href="#">Delete Account</a></p>
    </div>

    <div class="section" id="logout">
      <h2>Logout</h2>
      <button>Log Out</button>
    </div>
  </div>
        </div>
    )
}

export default UserProfile