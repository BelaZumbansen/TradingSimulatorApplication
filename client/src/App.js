import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/loginPage'
import { SignUpPage } from './pages/signUpPage'
import UserDashboard from './pages/userDashboard';
import Startup from './services/startup';

function App() {

  return (
    <div  className="App">
      <Routes>
        <Route path="/" element={<Startup /> } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<UserDashboard />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
