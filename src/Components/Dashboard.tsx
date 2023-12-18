// src/components/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { fetchUserDashboardData } from '../api';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../actions/authActions';

const Dashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [dashboardData, setDashboardData] = useState<any | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            // Redirect to login page if there's no user
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserDashboardData();
                setDashboardData(data);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const handleLogout = () => {
        // Dispatch the logoutSuccess action and navigate to the login page
        dispatch(logoutSuccess());
        navigate('/');
    };

    const handleCardClick = (courseId: string) => {
        // Use the courseId to construct the sub-subjects route or update the selected course
        navigate(`/courses/${courseId}`);
    };

    return (
        <section className="dashboard">
            <div className="container">
                {dashboardData ? (
                    <>
                        <div className='header'>
                            <h2>Welcome to your Dashboard, {user.username}!</h2>
                            <button type="button" onClick={handleLogout} className='logout'>
                                Logout
                            </button>
                        </div>
                        <h2>Your Courses</h2>
                        <div className="dashboard-card">
                            {dashboardData.courses &&
                                dashboardData.courses.map((item: any) => (
                                    <div className="card" key={item.id} onClick={() => handleCardClick(item.id)}>
                                        <footer>
                                            <h2>{item.name}</h2>
                                            <p>{item.para}</p>
                                        </footer>
                                    </div>
                                ))}
                        </div>
                    </>
                ) : (
                    <h2 className="dashboard-heading">Loading....</h2>
                )}
            </div>
        </section>
    );
};

export default Dashboard;
