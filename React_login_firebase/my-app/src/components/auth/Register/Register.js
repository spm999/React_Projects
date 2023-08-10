import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './Register.css'; // Import the external CSS file

const firebaseConfig = {
  apiKey: "AIzaSyCjy-yPCg1jRSEAU2EaAIIt6T2YzuZIXRA",
  authDomain: "loginreact-354d1.firebaseapp.com",
  projectId: "loginreact-354d1",
  storageBucket: "loginreact-354d1.appspot.com",
  messagingSenderId: "551534234223",
  appId: "1:551534234223:web:1821ce73daad67e7e45b9a",
  measurementId: "G-GVTQEBZSXN"
};


firebase.initializeApp(firebaseConfig);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    }
    const email=" ";

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
      {errorMessage && <p className="register-error">{errorMessage}</p>}
      <p className="register-link">
        Already have an account? <Link to="/Login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
