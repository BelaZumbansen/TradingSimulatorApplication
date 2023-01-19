import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');

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
      } else {
        setError('Invalid Email or Password');
      }
    }, (err) => {
      console.log(err);
      setError('Invalid Email or Password');
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
          onChange={({ target }) =>  {
            setEmail(target.value);
            setError('')}
          }
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value)
              setError('')}
            }
          />
        </div>
        <button type="submit" disabled={!validate()}>Login</button>
      </form>
      <form onSubmit={handleRegisterRequest}>
        <button type="submit">Sign Up</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  )
}