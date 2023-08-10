import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mhjbtgjswaweofwtvdzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oamJ0Z2pzd2F3ZW9md3R2ZHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1NjM5OTIsImV4cCI6MjAwNTEzOTk5Mn0.2Dph8MW0dTjZs9hf2Lc2QYTxGtJkthPJtMi484bCYOQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.log('Login error:', error.message);
      } else {
        console.log('Login successful');
        console.log('User:', user);
        // Additional logic or redirection after successful login
      }
    } catch (error) {
      console.log('Login error:', error.message);
    }
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
      <p className="forget-link">
         <Link to="/Forget">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;
