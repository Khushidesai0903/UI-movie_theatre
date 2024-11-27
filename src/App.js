import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import SeatSelectionPage from './SeatSelectionPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PaymentPage from './PaymentPage';

function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/select-seats"
          element={<SeatSelectionPage setSelectedSeats={setSelectedSeats} />}
        />
        <Route
          path="/payment"
          element={<PaymentPage selectedSeats={selectedSeats} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
