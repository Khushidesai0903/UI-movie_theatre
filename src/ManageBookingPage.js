import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ManageBookingPage.css'; 

const ManageBookingPage = () => {
  const [bookings, setBookings] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [message, setMessage] = useState(''); 

  const navigate = useNavigate(); 
  const fetchBookings = async () => {
    try {
      setLoading(true); 
      const token = sessionStorage.getItem('authToken'); 

      if (!token) {
        setMessage('You need to log in to view bookings.');
        setLoading(false);
        return;
      }
      const response = await fetch('http://localhost:8080/v1/reservations/user', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to fetch bookings. Please try again later.');
        setLoading(false);
        return;
      }

      const data = await response.json(); 
      console.log('Fetched Data:', data); 

      if (Array.isArray(data) && data.length > 0) {
        setBookings(data); 
      } else {
        setMessage('No bookings found. Please make a booking first.');
      }

      setLoading(false); 
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
      setMessage(error.message);
      setLoading(false); 
    }
  };
  const cancelBooking = async (reservationId) => {
    try {
      const token = sessionStorage.getItem('authToken'); 
      if (!token) {
        setMessage('You need to log in to cancel bookings.');
        return;
      }
      const response = await fetch(`http://localhost:8080/v1/reservations/cancel/${reservationId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      console.log('Cancel Booking Response:', response); 

      if (!response.ok) {
        const errorData = await response.json(); 
        setMessage(errorData.message || 'Failed to cancel booking. Please try again.');
        return;
      }

      const data = await response.json();
      console.log('Cancel Booking Data:', data);

      if (data.success) {
        setMessage(data.message || 'Booking cancelled successfully.');
        setBookings((prevBookings) => prevBookings.filter((b) => b.reservationId !== reservationId));
      } else {
        setMessage(data.message || 'Failed to cancel booking. Please try again.');
      }
    } catch (error) {
      console.error('Error canceling booking:', error.message);
      setMessage(error.message); 
    }
  };

  const goToBookingPage = () => {
    navigate('/booking-options'); 
  };

  useEffect(() => {
    fetchBookings();
  }, []); 

  return (
    <div className="manage-booking">
      <div className="header">
        <h1>Manage Your Bookings</h1>
      </div>

      <div className="main-content">
        {loading ? (
          <p>Loading...</p> 
        ) : (
          <>
            {message && <p className="message">{message}</p>} {/* Show any feedback message */}

            {bookings.length > 0 ? (
              bookings.map((booking) => {
                console.log('Booking Object:', booking);
                return (
                  <div key={booking.reservationId || booking.id || booking.bookingId} className="booking-item">
                    <h3>Booking ID: {booking.reservationId || booking.id || booking.bookingId || 'Unknown'}</h3>
                    <p>Movie Name: {booking.movieName || 'Unknown'}</p>
                    <p>
                      Show Time:{' '}
                      {booking.showTime
                        ? new Date(booking.showTime).toLocaleString()
                        : 'Invalid Date'}
                    </p>
                    <p>Seat Number: {booking.seatNumber || 'N/A'}</p>
                    <button
                      className="btn cancel-btn"
                      onClick={() => cancelBooking(booking.reservationId || booking.id || booking.bookingId)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                );
              })
            ) : (
              <p>No bookings found. Please make a booking first.</p> 
            )}
          </>
          
        )}
        <div className="back-button">
        <button className="btn" onClick={goToBookingPage}>
          Back to Booking Options
        </button>
      </div>
      </div>
      
      <div className="footer">
        <p>&copy; 2024 AcmePlex. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default ManageBookingPage;
