import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const UserDashboard = () => {

  const navigate = useNavigate();

  if (!localStorage.getItem('user')) {
    navigate('/home');
  }

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
      localStorage.clear();
      console.log(err);
    });
  }

  return (
    <div>
      <p>Logged In.</p>
      <form onSubmit={handleLogoutRequest}>
        <button type="submit">Log Out</button>
      </form>
    </div>
  )
}