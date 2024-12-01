import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingOptionsPage.css'; 

const BookingOptionsPage = () => {
  const navigate = useNavigate();

  const handleBookTickets = () => {
    navigate('/select-seats'); 
  };

  const handleManageBooking = () => {
    navigate('/manage-booking'); 
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <div className="booking-options">
      <div className="header">
        <h1>Choose an Option</h1>
        {/* Logout Button */}
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-options">
        {/* Option for Booking Tickets */}
        <div className="option" onClick={handleBookTickets}>
          <h2>Book Tickets</h2>
          <button className="btn">Book Now</button>
        </div>

        {/* Option for Managing Bookings */}
        <div className="option" onClick={handleManageBooking}>
          <h2>Manage Booking</h2>
          <button className="btn">Manage</button>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 AcmePlex. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default BookingOptionsPage;
