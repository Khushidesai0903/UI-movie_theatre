// import React from 'react';
// import './LandingPage.css'; // Reusing the same CSS for background

// const LoginPage = () => {
//   return (
//     <div className="landing-page">
//       <header className="header">
//         <h1>Login</h1>
//         <p>Please enter your email and password to login.</p>
//       </header>

//       <main className="main-options">
//         <form>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Email"
//               style={{
//                 padding: '10px',
//                 margin: '10px 0',
//                 width: '300px',
//                 borderRadius: '5px',
//               }}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Password"
//               style={{
//                 padding: '10px',
//                 margin: '10px 0',
//                 width: '300px',
//                 borderRadius: '5px',
//               }}
//             />
//           </div>
//           <button className="btn" type="submit">
//             Login
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState } from 'react';
// import './LandingPage.css'; // Reusing the same CSS for background

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent page refresh

//     try {
//       // Call the backend login API
//       const response = await fetch('http://localhost:8080/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed! Please check your credentials.');
//       }

//       // Check if the response is plain text
//       const token = await response.text();
//       setMessage(`Token: ${token}`);
//       console.log('JWT Token:', token); // Log token for debugging
//     } catch (error) {
//       setMessage(error.message);
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="landing-page">
//       <header className="header">
//         <h1>Login</h1>
//         <p>Please enter your email and password to login.</p>
//       </header>

//       <main className="main-options">
//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)} // Update email state
//               style={{
//                 padding: '10px',
//                 margin: '10px 0',
//                 width: '300px',
//                 borderRadius: '5px',
//               }}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} // Update password state
//               style={{
//                 padding: '10px',
//                 margin: '10px 0',
//                 width: '300px',
//                 borderRadius: '5px',
//               }}
//             />
//           </div>
//           <button className="btn" type="submit">
//             Login
//           </button>
//         </form>

//         {/* Display login message or token */}
//         {message && (
//           <div style={{ marginTop: '20px', color: 'red' }}>
//             <strong>{message}</strong>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import './LoginPage.css'; // Reusing the same CSS for background

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // Call the backend login API
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

      // Check if the response is plain text (JWT token)
      const token = await response.text();

      // Store the token in sessionStorage
      sessionStorage.setItem('authToken', token);

      // Optionally, redirect the user to another page (e.g., a dashboard or home page)
      // window.location.href = '/dashboard'; // Uncomment this line if you want to redirect

      console.log('JWT Token saved to sessionStorage:', token); // Log token for debugging

      // Clear message
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
