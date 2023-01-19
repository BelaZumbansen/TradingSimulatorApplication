import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from './authenticator';

export default function Startup() {

  const loggedIn = isLoggedIn();
  return <>{loggedIn ? <Navigate to='/home' /> : <Navigate to='/login' />}</>
}