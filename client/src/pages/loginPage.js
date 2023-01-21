import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

export function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (localStorage.getItem('userEmail')) {
    navigate('/home');
  } else {
    localStorage.clear();
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
        
        setError(false);
        const user = response.data.user;
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('dateOfBirth', user.dateOfBirth);
        navigate('/home');
      } else {
        setError(true);
      }
    }, (err) => {
      console.log(err);
      setError(true);
    });
  }

  return (
    <div>
      <form onSubmit={handleLogin} className='loginForm'>
        <h1>Sign In</h1>
        <div className='errorBox' style={{display: error ? 'block' : 'none'}}>
          <p>Your username or password may be incorrect.</p>
        </div>
        <div>
          Username
          <input
          type="text"
          value={email}
          name="Email"
          className='loginCredential'
          placeholder='Email'
          onChange={({ target }) =>  {
            setEmail(target.value)}
          }
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            className='loginCredential'
            placeholder='Password'
            onChange={({ target }) => {
              setPassword(target.value)}
            }
          />
        </div>
        <button type="submit" disabled={!validate()}>Login</button>
      </form>
      <div className='createAccount'>
        <h3 onClick={handleRegisterRequest}>Create Account</h3>
      </div>
    </div>
  )
}