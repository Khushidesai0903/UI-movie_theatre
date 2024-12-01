import React, { useState, useEffect } from 'react';
import './SeatSelectionPage.css'; 
import { useNavigate } from 'react-router-dom';

const SeatSelectionPage = ({ setSelectedSeats }) => {
  const navigate = useNavigate();
  const [selectedSeats, updateSelectedSeats] = useState([]); 
  const [bookedSeats, setBookedSeats] = useState([]); 
  const [seatsData, setSeatsData] = useState([]); 
  const [movies, setMovies] = useState([]); 
  const [selectedMovieID, setSelectedMovieID] = useState(''); 
  const [showTimes, setShowTimes] = useState([]); 
  const [selectedShowId, setSelectedShowId] = useState(''); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchMovies = async () => {
      const token = sessionStorage.getItem('authToken');

      if (token) {
        try {
          const response = await fetch('/v1/movies/all', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }

          const movies = await response.json();
          setMovies(movies); 
        } catch (error) {
          console.error('Error fetching movies:', error);
          setError('Failed to fetch movies');
        }
      } else {
        setError('You must be logged in to view movie selections');
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchShowTimes = async () => {
      if (selectedMovieID) {
        const token = sessionStorage.getItem('authToken');
        try {
          const response = await fetch(`/v1/shows/${selectedMovieID}/1`, { 
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch show times');
          }

          const shows = await response.json();
          setShowTimes(shows); 
        } catch (error) {
          console.error('Error fetching show times:', error);
          setError('Failed to fetch show times');
        }
      } else {
        setShowTimes([]);
      }
    };

    fetchShowTimes();
  }, [selectedMovieID]);

  useEffect(() => {
    const fetchSeats = async () => {
      if (selectedShowId) {
        const token = sessionStorage.getItem('authToken');
        try {
          const response = await fetch(`/v1/seats/${selectedShowId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch seats');
          }

          const seatsDataFromBackend = await response.json();
          setSeatsData(seatsDataFromBackend); 
          const booked = seatsDataFromBackend
            .filter((seat) => seat.status === 'booked')
            .map((seat) => seat.seatId);
          setBookedSeats(booked); 
        } catch (error) {
          console.error('Error fetching seats:', error);
          setError('Failed to fetch seats');
        }
      }
    };

    fetchSeats();
  }, [selectedShowId]);

  const handleMovieChange = (e) => {
    setSelectedMovieID(e.target.value);
    setSelectedShowId(''); 
  };

  const handleTimeChange = (e) => {
    const showId = e.target.value;
    setSelectedShowId(showId);
    console.log('Selected Show ID:', showId);
    localStorage.setItem("selectedShowId", showId);
  };

  const handleSeatClick = (seatId) => {
    updateSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
    );
  };

  const proceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat!');
      return;
    }
    setSelectedSeats(selectedSeats);
    navigate('/payment');
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Choose Your Seats</h1>
        <p>Select your movie, theatre, and time, then pick your seats</p>
      </header>

      <main className="seat-selection-content">
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="dropdown-section">
          <h2>Select Your Movie</h2>
          <select value={selectedMovieID} onChange={handleMovieChange}>
            <option value="">Select a Movie</option>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <option key={movie.movieId} value={movie.movieId}>
                  {movie.title}
                </option>
              ))
            ) : (
              <option>No movies available</option>
            )}
          </select>

          <h2>Select Theatre</h2>
          <select>
            <option>Acmeplex</option>
            <option>Landmark</option>
          </select>

          <h2>Select Time</h2>
          <select value={selectedShowId} onChange={handleTimeChange}>
            <option value="">Select a Time</option>
            {showTimes.length > 0 ? (
              showTimes.map((show) => (
                <option key={show.showId} value={show.showId}>
                  {new Date(show.showTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </option>
              ))
            ) : (
              <option>No times available</option>
            )}
          </select>
        </div>

        <div className="seat-grid">
          {seatsData.length > 0 ? (
            seatsData.map((seat) => (
              <div
                key={seat.seatId}
                className={`seat ${
                  seat.status === 'booked'
                    ? 'booked'
                    : selectedSeats.includes(seat.seatId)
                    ? 'selected'
                    : 'available'
                }`}
                onClick={() =>
                  seat.status !== 'booked' && handleSeatClick(seat.seatId)
                }
              >
              </div>
            ))
          ) : (
            <p>No seats available.</p>
          )}
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="seat available"></div>
            <span>Available Seat</span>
          </div>
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected Seat</span>
          </div>
          <div className="legend-item">
            <div className="seat booked"></div>
            <span>Booked Seat</span>
          </div>
        </div>

        <button className="proceed-btn" onClick={proceedToPayment}>
          Proceed to Payment
        </button>
      </main>
    </div>
  );
};

export default SeatSelectionPage;
