import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../services/authenticator';

export function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isLoggedIn()) {
    return (<Navigate to='/home' />);
  }

  function validate() {
    return email.length > 0 && email.includes('@') && password.length >= 8;
  };

  function handleRegisterRequest(event) {
    event.preventDefault();
    navigate('/register');
  };
  
  const handleLogin = (event) => {
    event.preventDefault();

    axios.post('/api/auth/login', {
      email: email,
      password: password
    }, 
    {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {

        localStorage.setItem('user', response.data.user);
        navigate('/home');
      }
    }, (err) => {
      console.log(err);
    });
  }

  return (
    <div className="Login">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div>
          Email
          <input
          type="text"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" disabled={!validate()}>Login</button>
      </form>
      <form onSubmit={handleRegisterRequest}>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}