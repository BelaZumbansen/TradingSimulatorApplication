import React, { useState } from 'react'

export function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validate() {
    return email.length > 0 && email.includes('@') && password.length >= 8;
  }

  const handleLogin = (event) => {
    event.preventDefault();
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
    </div>
  )
}