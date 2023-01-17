import logo from './logo.svg';
import './App.css';
import React from 'react';
import { LoginPage } from './pages/loginPage'
import { SignUpPage } from './pages/signUpPage'
import axios from 'axios'

function App() {

  return (
    <div>
      <LoginPage />
    </div>
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." :data}</p>
      </header>
    </div>
    */
  );
}

export default App;
