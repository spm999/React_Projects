import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic of login
    console.log('Login form submitted');
    console.log('Email', email);
    console.log('Password', password);
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit">Login</button>
      </form>

      <p className="register-link">
        Don't have an account? <Link to="/Register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
