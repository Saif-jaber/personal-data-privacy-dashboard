import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

function App() {
  return(
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/Login" element={<LoginPage />} />
    </Routes>
  );
}

export default App
