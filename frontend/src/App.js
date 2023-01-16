import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import TwoFARegister from './pages/TwoFARegister/TwoFARegister';
import TwoFAVerify from './pages/TwoFAVerify/TwoFAVerify';
import Main from './pages/Main/Main';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/two-fa-register-page" element={<TwoFARegister />} />
            <Route exact path="/two-fa-verify-page" element={<TwoFAVerify />} />
            <Route exact path="/main-page" element={<Main />}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
