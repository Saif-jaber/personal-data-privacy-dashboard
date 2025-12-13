import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

function App() {
  return(
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Home" element={<HomePage />} />
    </Routes>
  );
}

export default App
