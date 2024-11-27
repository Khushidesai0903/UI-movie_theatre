// import React from 'react';
// import './LandingPage.css'; // Reusing the same CSS for background

// const SignUpPage = () => {
//   return (
//     <div className="landing-page">
//       <header className="header">
//         <h1>Sign Up</h1>
//         <p>Create your account by filling out the information below.</p>
//       </header>

//       <main className="main-options">
//         <form>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               placeholder="Name"
//               style={{
//                 padding: '10px',
//                 margin: '10px 0',
//                 width: '300px',
//                 borderRadius: '5px',
//               }}
//             />
//           </div>
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
//           <div className="form-group">
//             <label htmlFor="address">Address:</label>
//             <input
//               type="text"
//               id="address"
//               placeholder="Address"
//               style={{
//                 padding: '10px',
//                 margin: '10px 0',
//                 width: '300px',
//                 borderRadius: '5px',
//               }}
//             />
//           </div>
//           <button className="btn" type="submit">
//             Sign Up
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default SignUpPage;


// import React, { useState } from 'react';
// import './SignUpPage.css'; // Use existing CSS for styling
// import axios from 'axios';

// const SignUpPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     address: '',
//   });

//   const [message, setMessage] = useState(''); // For success or error message

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page reload
//     try {
//       const response = await axios.post('http://localhost:8080/auth/register', formData);
//       if (response.status === 200 || response.status === 201) {
//         setMessage('Registration successful!');
//       } else {
//         setMessage('Registration failed. Please try again.');
//       }
//     } catch (error) {
//       setMessage('Error: Unable to register. Please check your inputs or try again later.');
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-form">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="address">Address:</label>
//             <input
//               type="text"
//               id="address"
//               placeholder="Enter your address"
//               value={formData.address}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="submit" className="btn">
//             Sign Up
//           </button>
//         </form>
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;


import React, { useState } from 'react';
import './SignUpPage.css'; // Use existing CSS for styling
import axios from 'axios';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    annualFeesPaid: false, // Add state for the checkbox
  });

  const [message, setMessage] = useState(''); // For success or error message

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
    try {
      const response = await axios.post('http://localhost:8080/auth/register', formData);
      if (response.status === 200 || response.status === 201) {
        setMessage('Registration successful!');
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error: Unable to register. Please check your inputs or try again later.');
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
            <label htmlFor="annualFeesPaid">Annual Fees Paid</label>
          </div>
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
