import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import GuestPage from './GuestPage'; 
import SeatSelectionPage from './SeatSelectionPage';
import PaymentPage from './PaymentPage';
import BookingOptionsPage from './BookingOptionsPage'; // Import the BookingOptionsPage
import ManageBookingPage from './ManageBookingPage'; // Import the ManageBookingPage

function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Signup Page */}
        <Route path="/signup" element={<SignUpPage />} />

        {/* Guest Page */}
        <Route path="/guest" element={<GuestPage />} />

        {/* Booking Options Page */}
        <Route path="/booking-options" element={<BookingOptionsPage />} />

        {/* Seat Selection Page */}
        <Route
          path="/select-seats"
          element={<SeatSelectionPage setSelectedSeats={setSelectedSeats} />}
        />

        {/* Manage Booking Page */}
        <Route path="/manage-booking" element={<ManageBookingPage />} />

        {/* Payment Page */}
        <Route
          path="/payment"
          element={<PaymentPage selectedSeats={selectedSeats} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
