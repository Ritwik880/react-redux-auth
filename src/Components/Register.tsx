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

  // handle registration
  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // validate email format
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
      // Call the updated register function that includes email, username and password
      const user = await authService.register(username, email, password);
      dispatch(registerSuccess(user));

      // Redirect to the login page with credentials
      navigate('/', {
        state: { username, email, password },
      });
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  // Render the component
  return (
    <section className='landing-section'>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className='landing-div'>
        <h2 className='landing-heading'>Registration Form</h2>
        <input className='input-box' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className='input-box' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className='input-box' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={handleRegister} className='signup-button'>
          Register
        </button>
      </div>
    </section>
  );
};

// Export the Register component
export default Register;
