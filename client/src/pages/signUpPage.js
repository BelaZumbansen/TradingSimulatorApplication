import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/signUp.css'

export function SignUpPage() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setError] = useState('');

  if (localStorage.getItem('user')) {
    navigate('/home');
  }

  function handleLoginRequest(event) {
    event.preventDefault();
    navigate('/login');
  }

  function validate() {
    return email.length > 0 && email.includes('@') && email === confirmEmail
      && password.length >= 8 && /\d/.test(password) && password === confirmPassword;
  }

  const handleSignUp = (event) => {
    event.preventDefault();

    axios.post('/api/auth/signUp', {
      name: name,
      dateOfBirth: dateOfBirth,
      email: email,
      password: password
    },
    {
      withCredentials: true,
    })    
    .then((response) => {
      // Set current state and move to user homepage
      if (response.status === 200) {
        navigate('/home');
      } else {
        setError('User with this email already exists.');
      }
    }, (err) => {
      console.log(err);
      setError('User with this email already exists.');
    });
  }
  
  return (
    <div className="SignUp">
      <form onSubmit={handleSignUp} className='signUpForm'>
        <h1>Create Account</h1>
        <div>
          Full Name
          <input
          type="text"
          value={name}
          name="Name"
          className='signInCredential'
          placeholder='Full Name'
          onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Date Of Birth
          <input 
          type="text" 
          value={dateOfBirth}
          placeholder="MM/DD/YYYY"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
          className='signInCredential'
          onChange={({ target }) => setDateOfBirth(target.value)}/>
        </div>
        <div>
          Email
          <input
          type="text"
          value={email}
          name="Email"
          className='signInCredential'
          placeholder='Email'
          onChange={({ target }) => {
            setEmail(target.value);
            setError('')}
          }
          />
        </div>
        <div>
          Confirm Email
          <input
          type="text"
          value={confirmEmail}
          name="Confirm Email"
          className='signInCredential'
          placeholder='Re-Type Email'
          onChange={({ target }) => setConfirmEmail(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            className='signInCredential'
            placeholder='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            name="Confirm Password"
            className='signInCredential'
            placeholder='Re-Type Password'
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </div>
        <button type="submit" disabled={!validate()}>Sign Up</button>
      </form>
      <div className='signIn'>
        <h3 onClick={handleLoginRequest}>Sign In</h3>
      </div>
      <p>{errorMessage}</p>
    </div>
  )
}