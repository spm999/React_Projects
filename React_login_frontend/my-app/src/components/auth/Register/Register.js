import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the external CSS file

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration form submitted');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button" type="submit">Register</button>
      </form>
      <p className="register-link">
        Already have an account? <Link to="/Login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
