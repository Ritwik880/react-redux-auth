// Import necessary modules
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../authService';
import { registerSuccess } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return;
    }
  
    if (!username || !password || !email) {
      toast.error('Please fill in all fields');
      return;
    }
  
    try {
      const user = await authService.register(username, email, password);
      user.completedCourses = {};
      
      dispatch(registerSuccess(user));
      navigate('/', {
        state: { username, email, password },
      });
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <section className='landing-section'>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className='landing-div'>
        <h2 className='landing-heading'>Sign Up</h2>
        <input className='input-box' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className='input-box' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className='input-box' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className='button-div'>
          <button type="button" onClick={handleRegister} className='signup-button'>
            Sign Up
          </button>
          <a onClick={() => navigate('/')} className='login-text'>Login</a>
        </div>
      </div>
    </section>
  );
};

export default Register;
