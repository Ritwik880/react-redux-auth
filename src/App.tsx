// src/App.tsx

import React from 'react';
import './App.scss'
import { Route, Routes, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Register from './Components/Register';
import Login from './Components/Login';
import { logoutSuccess } from './actions/authActions';
import Welcome from './Components/Welcome';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.user !== null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // In a real-world scenario, you might want to perform additional actions, such as clearing user data on the server
    dispatch(logoutSuccess());
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome/>} />
      </Routes>
    </div>
  );
};

export default App;
