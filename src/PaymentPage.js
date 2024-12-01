import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';

const PaymentPage = ({ selectedSeats, selectedShowId }) => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [error, setError] = useState('');

  const handlePaymentSubmit = async (e) => {
    console.log('Selected Seats:', selectedSeats);
    console.log('Selected Show ID:', selectedShowId);
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv) {
      setError('Please fill in all card details.');
      return;
    }

    const payload = {
      seats: selectedSeats.map((seat, index) => ({
        seatId: seat,
        theaterId: 1,
        showId: localStorage.getItem('selectedShowId'),
        amount: 10.0,
      })),
      cardDetails: {
        cardId: 0,
        userId: 2,
        cardNumber: cardNumber.replace(/\s+/g, ''),
        expirationDate: expiryDate,
        cardType: 'Visa',
        paymentMethod: 'Credit Card',
      },
    };

    console.log('Payload:', payload);

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      setError('You must be logged in to complete the reservation.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/v1/reservations/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log('Response:', result);

      if (result.status === false) {
        setPopupMessage(result.response || 'An error occurred.');
      } else {
        setPopupMessage('Payment successful'); 
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error: Failed to process the reservation.');
    }
  };

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => {
        navigate('/booking-options');
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [popupMessage, navigate]);
  
  return (
    <div className="payment-page">
      <h1>Payment</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {popupMessage && (
        <>
          <div className="popup-backdrop" onClick={() => setPopupMessage('')}></div>
          <div className="popup">
            <p>{popupMessage}</p>
            {/* <button onClick={() => setPopupMessage('')}>Close</button> */}
          </div>
        </>
      )}

      <p>Total Seats: {selectedSeats.length}</p>
      <p>Total Amount: ${selectedSeats.length * 10.0}</p>

      <form onSubmit={handlePaymentSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="19"
            placeholder="1234 5678 9012 3456"
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            maxLength="5"
            placeholder="MM/YY"
          />
        </label>
        <label>
          CVV:
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength="3"
            placeholder="123"
          />
        </label>
        <button type="submit">Pay ${selectedSeats.length * 10.0}</button>
      </form>
    </div>
  );
};

export default PaymentPage;
