// src/PaymentPage.js
import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage = ({ selectedSeats }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const seatCost = 10;
  const totalAmount = selectedSeats.length * seatCost;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert(`Payment of $${totalAmount} successful!`);
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <p>Total Seats: {selectedSeats.length}</p>
      <p>Total Amount: ${totalAmount}</p>
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"
            placeholder="1234 5678 9101 1121"
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
        <button type="submit">Pay ${totalAmount}</button>
      </form>
    </div>
  );
};

export default PaymentPage;
