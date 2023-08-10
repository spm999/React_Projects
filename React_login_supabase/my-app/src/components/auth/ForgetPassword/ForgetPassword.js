import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './ForgetPass.css'; // Import the CSS file for styling

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isResetRequested, setIsResetRequested] = useState(false);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const { token } = useParams(); // Retrieve the reset token from the URL parameters

  const supabaseUrl = 'https://mhjbtgjswaweofwtvdzk.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oamJ0Z2pzd2F3ZW9md3R2ZHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1NjM5OTIsImV4cCI6MjAwNTEzOTk5Mn0.2Dph8MW0dTjZs9hf2Lc2QYTxGtJkthPJtMi484bCYOQ';

  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password/${token}`,
      });

      if (error) {
        setError(error.message);
      } else {
        setIsResetRequested(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
        access_token: token,
      });

      if (error) {
        setError(error.message);
      } else {
        setIsPasswordUpdated(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="forget-password-container">
      <h2>Forgot Password</h2>
      {isResetRequested ? (
        isPasswordUpdated ? (
          <p>Your password has been successfully updated.</p>
        ) : (
          <form onSubmit={handleNewPasswordSubmit}>
            <div>
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Update Password</button>
          </form>
        )
      ) : (
        <form onSubmit={handleResetPassword}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Reset Password</button>
        </form>
      )}
      <p>
        Remember your password? <Link to="/Login">Login</Link>
      </p>
    </div>
  );
};

export default ForgetPassword;
