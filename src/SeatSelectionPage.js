// // src/SeatSelectionPage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LandingPage.css';
// import './SeatSelectionPage.css';

// const SeatSelectionPage = ({ setSelectedSeats }) => {
//   const navigate = useNavigate();
//   const [selectedSeats, updateSelectedSeats] = useState([]);
//   const [bookedSeats] = useState([2, 5, 9]);

//   const handleSeatClick = (index) => {
//     updateSelectedSeats((prev) =>
//       prev.includes(index) ? prev.filter((seat) => seat !== index) : [...prev, index]
//     );
//   };

//   const proceedToPayment = () => {
//     if (selectedSeats.length === 0) {
//       alert('Please select at least one seat!');
//       return;
//     }
//     setSelectedSeats(selectedSeats);
//     navigate('/payment');
//   };

//   return (
//     <div className="landing-page">
//       <header className="header">
//         <h1>Choose Your Seats</h1>
//         <p>Select your movie, theatre, and time, then pick your seats</p>
//       </header>

//       <main className="seat-selection-content">
//         <div className="dropdown-section">
//           <h2>Select Your Movie</h2>
//           <select>
//             <option>The Substance</option>
//             <option>Monkey Man</option>
//             <option>Killer Heat</option>
//           </select>

//           <h2>Select Theatre</h2>
//           <select>
//             <option>Acmeplex</option>
//             <option>Landmark</option>
//           </select>

//           <h2>Select Time</h2>
//           <select>
//             <option>10:00 AM</option>
//             <option>1:00 PM</option>
//             <option>4:00 PM</option>
//           </select>
//         </div>

//         <div className="seat-grid">
//           {Array.from({ length: 20 }).map((_, index) => (
//             <div
//               key={index}
//               className={`seat ${
//                 bookedSeats.includes(index)
//                   ? 'booked'
//                   : selectedSeats.includes(index)
//                   ? 'selected'
//                   : 'available'
//               }`}
//               onClick={() => !bookedSeats.includes(index) && handleSeatClick(index)}
//             />
//           ))}
//         </div>

//         <div className="legend">
//           <div className="legend-item">
//             <div className="seat available"></div>
//             <span>Available Seat</span>
//           </div>
//           <div className="legend-item">
//             <div className="seat selected"></div>
//             <span>Selected Seat</span>
//           </div>
//           <div className="legend-item">
//             <div className="seat booked"></div>
//             <span>Booked Seat</span>
//           </div>
//         </div>

//         <button className="proceed-btn" onClick={proceedToPayment}>
//           Proceed to Payment
//         </button>
//       </main>
//     </div>
//   );
// };

// export default SeatSelectionPage;

import React, { useState, useEffect } from 'react';
import './SeatSelectionPage.css'; // Reusing the same CSS for background

const SeatSelectionPage = ({ setSelectedSeats }) => {
  const [selectedSeats, updateSelectedSeats] = useState([]);
  const [bookedSeats] = useState([2, 5, 9]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [error, setError] = useState('');

  // Fetch movies from backend when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/v1/movies/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
    
        const movies = await response.json();
        console.log('Movies:', movies); // Log movies data for debugging
    
        setMovies(movies); // Update state to store movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    

    fetchMovies();
  }, []); // Empty dependency array means it runs once when the component mounts

  const handleSeatClick = (index) => {
    updateSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((seat) => seat !== index) : [...prev, index]
    );
  };

  const proceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat!');
      return;
    }
    setSelectedSeats(selectedSeats);
    // Proceed to the payment page
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
          <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
            <option value="">Select a Movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.title}>
                {movie.title}
              </option>
            ))}
          </select>

          <h2>Select Theatre</h2>
          <select>
            <option>Acmeplex</option>
            <option>Landmark</option>
          </select>

          <h2>Select Time</h2>
          <select>
            <option>10:00 AM</option>
            <option>1:00 PM</option>
            <option>4:00 PM</option>
          </select>
        </div>

        <div className="seat-grid">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className={`seat ${
                bookedSeats.includes(index)
                  ? 'booked'
                  : selectedSeats.includes(index)
                  ? 'selected'
                  : 'available'
              }`}
              onClick={() => !bookedSeats.includes(index) && handleSeatClick(index)}
            />
          ))}
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
