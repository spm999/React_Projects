import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the external CSS file
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mhjbtgjswaweofwtvdzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oamJ0Z2pzd2F3ZW9md3R2ZHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1NjM5OTIsImV4cCI6MjAwNTEzOTk5Mn0.2Dph8MW0dTjZs9hf2Lc2QYTxGtJkthPJtMi484bCYOQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.log('Registration error:', error.message);
      } else {
        console.log('Registration successful');
        console.log('User:', user);
        // Additional logic or redirection after successful registration
      }
    } catch (error) {
      console.log('Registration error:', error.message);
    }
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
