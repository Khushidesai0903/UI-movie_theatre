import React, { useState } from 'react';
import './ManageBookingPage.css'; // Import the CSS file for styles

const ManageBookingPage = () => {
  const [bookingId, setBookingId] = useState(''); // State to track the booking ID input
  const [isCancelAllowed, setIsCancelAllowed] = useState(true); // State to track if cancellation is allowed
  const [isRegisteredUser, setIsRegisteredUser] = useState(true); // State to track if the user is registered
  const [adminFeePercentage] = useState(15); // Default to 15% admin fee for non-registered users

  // Function to handle booking cancellation
  const handleCancelBooking = () => {
    if (isCancelAllowed) {
      // Simulate cancellation logic
      alert('Your booking has been canceled successfully!');
    } else {
      alert('You cannot cancel your booking at this time.');
    }
  };

  return (
    <div className="manage-booking">
      <div className="header">
        <h1>Manage Your Booking</h1>
      </div>

      <div className="main-content">
        <div>
          <label htmlFor="booking-id">Booking ID:</label>
          <input
            type="text"
            id="booking-id"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)} // Handle input change for booking ID
            placeholder="Enter your booking ID"
          />
        </div>

        <div>
          <button onClick={handleCancelBooking} className="btn">Cancel Booking</button>
        </div>

        <div>
          <h3>Cancellation Information</h3>
          <p>
            {isRegisteredUser
              ? `As a registered user, no admin fee will be applied.`
              : `A ${adminFeePercentage}% admin fee will apply for cancellations.`}
          </p>
          <p>{isCancelAllowed ? "You can cancel your booking within 72 hours." : "You cannot cancel this booking."}</p>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 AcmePlex. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default ManageBookingPage;
