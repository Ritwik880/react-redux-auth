import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../actions/authActions';
import { RootState } from '../reducers';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutSuccess());
        navigate('/')
    };

    return (
        <section className='landing-section'>
            <div className="landing-div">
                <h2 className='username'>Welcome, {user?.username}!</h2>
                <button onClick={handleLogout} className='signup-button'>Logout</button>
            </div>
        </section>
    );
};

export default Welcome;
