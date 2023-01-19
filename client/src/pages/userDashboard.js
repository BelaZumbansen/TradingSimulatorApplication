import React from 'react'
import { isLoggedIn } from '../services/authenticator'
import { Navigate, useNavigate } from 'react-router-dom'
import Async from 'react-async'
import axios from 'axios'

const loggedIn = async () => {

  return isLoggedIn() 
    .then(res => res);
}

export const UserDashboard = () => {

  const navigate = useNavigate();

  function handleLogoutRequest(event) {
    event.preventDefault();
    
    axios.post('/api/auth/logout', {}, {
      withCredentials: true,
    })
    .then((response) => {

      if (response.status === 200) {
        localStorage.clear();
        navigate('/login');
      }
    }, (err) => {
      console.log(err);
    });
  }

  return (

    <Async promiseFn={loggedIn}>
      {({data, error, isLoading}) => {

        if (isLoading) return 'Loading...';
        if (error) {
          return (<Navigate to='/login' />);
        }
        if (data) {

          return (
            <div>
              <p>Logged In.</p>
              <form onSubmit={handleLogoutRequest}>
                <button type="submit">Log Out</button>
              </form>
            </div>
          )
        }
      }} 
    </Async> 
  )
}