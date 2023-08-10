import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css'

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully!');
      const currentUser = firebase.auth().currentUser;
      setUser(currentUser);
      navigate('/TodoList/' + currentUser.uid, { replace: true });    } catch (error) {
      console.log("Error Occured:", error);
    }
  };

  return (
    <div className="login-container">
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
      <p className="forgot-pass">
        <Link to="/ForgetPass">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;

