import React, { useState } from 'react';
import './SignUpPage.css'; // Use existing CSS for styling
import axios from 'axios';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    annualFeesPaid: false, // Checkbox for annual fee
    paymentMethod: '', // Debit or Credit selection
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardType: '', // New field for card type (e.g., Visa, MasterCard)
  });

  const [message, setMessage] = useState(''); // For form success or error messages
  const [paymentMessage, setPaymentMessage] = useState(''); // For payment success or error messages
  const [paymentSubmitted, setPaymentSubmitted] = useState(false); // Track payment submission

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate payment if annual fee is selected
    if (formData.annualFeesPaid) {
      if (!paymentSubmitted) {
        setMessage('Please submit the payment first.');
        return;
      }
      if (!formData.cardNumber || !formData.expiryDate) {
        setMessage('Please provide complete payment details.');
        return;
      }
    }

    // Prepare payload for registration
    const payload = {
      user: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
      },
      cardDetails: formData.annualFeesPaid
        ? {
            cardNumber: formData.cardNumber,
            expirationDate: formData.expiryDate,
            cardType: formData.cardType,
            paymentMethod: formData.paymentMethod,
          }
        : null, // Include card details only if annual fee is paid
    };

    try {
      console.log(payload);
      const response = await axios.post('http://localhost:8080/auth/register', payload);
      if (response.status === 200 || response.status === 201) {
        setMessage('Registration successful!');
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error: Unable to register. Please check your inputs or try again later.');
    }
  };

  // Handle payment submission
  const handlePaymentSubmit = () => {
    if (!formData.paymentMethod) {
      setPaymentMessage('Please select a payment method.');
      return;
    }
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      setPaymentMessage('Please provide complete payment details.');
      return;
    }

    setPaymentMessage('Payment Successful! Thank you for paying the $20 annual fee.');
    setPaymentSubmitted(true);
  };

  return (
    <div className="signup-page">
      <header className="header">
        <h1>Sign Up</h1>
        <p>Create your account by filling out the information below.</p>
      </header>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="annualFeesPaid"
              checked={formData.annualFeesPaid}
              onChange={handleInputChange}
            />
            <label htmlFor="annualFeesPaid">
              Pay Annual Fee ($20 - Optional)
            </label>
          </div>
          {formData.annualFeesPaid && (
            <>
              <div className="form-group">
                <label htmlFor="paymentMethod">Payment Method:</label>
                <select
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="">Select Payment Method</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="Enter your card number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardType">Card Type:</label>
                <input
                  type="text"
                  id="cardType"
                  placeholder="Enter card type (e.g., Visa, MasterCard)"
                  value={formData.cardType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input
                  type="password"
                  id="cvv"
                  placeholder="Enter CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="button"
                className="btn"
                onClick={handlePaymentSubmit}
                disabled={paymentSubmitted} // Disable button if payment is already submitted
              >
                Submit Payment
              </button>
              {paymentMessage && <p>{paymentMessage}</p>}
            </>
          )}
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
