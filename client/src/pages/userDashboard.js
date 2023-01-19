import React from 'react'
import { isLoggedIn } from '../services/authenticator'
import { Navigate } from 'react-router-dom'

export default function UserDashboard() {

  if (!isLoggedIn()) {
    return (<Navigate to='/login' />);
  }

  return (
    <div>
      <p>Logged In.</p>
    </div>
  )
};