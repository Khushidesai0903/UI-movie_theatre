import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuestPage.css'; // Styling for GuestPage
import axios from 'axios'; // Import axios for backend requests

const GuestPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // To show loading state while submitting
  const navigate = useNavigate();

  const handleGuestAccess = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Backend call to store guest email
      const response = await axios.post('http://localhost:8080/guest/track', { email });
      
      if (response.status === 200) {
        // Assuming backend responds with a success status
        setMessage('Successfully logged in as guest!');
        
        // Store the email in sessionStorage for tracking
        sessionStorage.setItem('guestEmail', email);

        // Redirect to SeatSelectionPage
        navigate('/select-seats');
      } else {
        setMessage('Error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="guest-page">
      <header className="header">
        <h1>Continue as Guest</h1>
        <p>Enter your email to continue as a guest and access seat booking.</p>
      </header>

      <main className="main-options">
        <form onSubmit={handleGuestAccess}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '10px',
                margin: '10px 0',
                width: '300px',
                borderRadius: '5px',
              }}
            />
          </div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </form>

        {message && <p className="error-message">{message}</p>}
      </main>
    </div>
  );
};

export default GuestPage;
