import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to AcmePlex</h1>
        <p>Your destination for an exceptional movie experience</p>
      </header>

      <main className="main-options">
        <div className="option">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <h2>Registered User</h2>
          <button className="btn" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>

        <div className="option">
          <FontAwesomeIcon icon={faUserPlus} className="icon" />
          <h2>Sign Up for Registration</h2>
          <button className="btn" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>

        <div className="option">
          <FontAwesomeIcon icon={faUserSecret} className="icon" />
          <h2>Continue as Guest</h2>
          <button className="btn" onClick={() => alert('Continue as Guest')}>
            Continue
          </button>
        </div>
      </main>

      <footer className="footer">
        <p> AcmePlex - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
