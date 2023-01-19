import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { loggedIn } from './authenticator';
import { useAsync } from 'react-async'

export default function Startup() {

  const isLoggedIn = useAsync({ promiseFn: loggedIn });
  return <>{isLoggedIn ? <Navigate to='/home' /> : <Navigate to='/login' />}</>
}