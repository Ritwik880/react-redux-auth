import React from 'react';
import './App.scss';
import './Card.scss';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Courses from './Components/Courses';
import Quiz from './Components/Quiz';

const App: React.FC = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/courses/:courseId" element={<Courses />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
};

export default App;
