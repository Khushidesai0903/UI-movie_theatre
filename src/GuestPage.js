import React, { useState } from 'react';
import './GuestPage.css';
import { useNavigate } from 'react-router-dom'; 

const GuestPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleGuestAccess = async (e) => {
    e.preventDefault(); 

    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true); 

    try {
      const response = await fetch('http://localhost:8080/auth/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          alert('User is already registered. Please log in');
          setTimeout(() => {
            navigate('/login'); 
          }, 2000); 
        } else {
          throw new Error('Something went wrong, please try again.');
        }
      }

      else {const token = await response.text(); 

      sessionStorage.setItem('authToken', token);

      console.log('JWT Token saved to sessionStorage:', token); 
      window.location.href = '/booking-options';
      } 

      setMessage('');
    } catch (error) {
      setMessage(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Continue as Guest</h1>
        <p>Please enter your email to continue as a guest and access seat booking.</p>
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
              required
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
