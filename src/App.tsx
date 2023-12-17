import React from 'react';
import './App.scss'
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

const App: React.FC = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  );
};

export default App;
