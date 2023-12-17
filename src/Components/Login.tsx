import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../authService';
import { loginSuccess } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create the Login component
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || '');
  const [password, setPassword] = useState(location.state?.password || '');
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async () => {
    try {
      const user = await authService.login({ username, password });
      dispatch(loginSuccess(user));
      navigate('/dashboard');
    } catch (error) {
      toast.error('User does not exist!');
    }
  };

  const handleSignUp = ()=>{
    navigate("/register");
  }

  // Render the component
  return (
    <section className='landing-section'>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="landing-div">
        <h2 className='landing-heading'>Login Form</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className='input-box' />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='input-box' />
        <button onClick={handleLogin} className='signup-button'>Login</button>
        <button className='signup-button' onClick={handleSignUp}>Sign Up</button>
      </div>
    </section>
  );
};

// Export the Login component
export default Login;
