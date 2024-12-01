import React, { useState } from 'react';
import './LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed! Please check your credentials.');
      }
      const token = await response.text();
      sessionStorage.setItem('authToken', token); 
      console.log('JWT Token saved to sessionStorage:', token); 
      window.location.href = '/booking-options'; 
      setMessage('');
    } catch (error) {
      setMessage(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Login</h1>
        <p>Please enter your email and password to login.</p>
      </header>

      <main className="main-options">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
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
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '10px',
                margin: '10px 0',
                width: '300px',
                borderRadius: '5px',
              }}
            />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
        </form>

        {message && <p className="error-message">{message}</p>}
      </main>
    </div>
  );
};

export default LoginPage;
