import React, { useState } from 'react';
import './SignUpPage.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    annualFeesPaid: false, 
    paymentMethod: '', 
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardType: '', 
  });

  const [message, setMessage] = useState(''); 

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (formData.annualFeesPaid) {
      if (!formData.cardNumber || !formData.expiryDate) {
        setMessage('Please provide complete payment details.');
        return;
      }
    }

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
        : null, 
    };

    try {
      console.log(payload);
      const response = await axios.post('http://localhost:8080/auth/register', payload);
      if (response.status === 200 || response.status === 201) {
        alert('Registration successful!');
        setTimeout(() => {
          navigate('/login'); 
        }, 2000);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Already registered. Please log in.'); 
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 
    }
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
              required
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
              required
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
              required
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
              required
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
            </>
          )}
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        {message && <p style={{ color: 'black' }}>{message}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
