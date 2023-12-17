// src/components/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { fetchUserDashboardData } from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [dashboardData, setDashboardData] = useState<any | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        // Fetch user-specific data when the component mounts
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

    if (!user) {
        return null;
    }


    return (
        <div className="dashboard">
            {
                dashboardData ? <>
                    <h2 className='dashboard-heading'>Welcome to your Dashboard, {user.username}!</h2>
                    <div className='dashboard-card'>
                        <div className="course-listing">
                            <h2>Course Listing</h2>
                            <ul>
                                {dashboardData.courses.map((course: any) => (
                                    <li key={course.id}>{course.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="courses-in-progress">
                            <h2>Courses in Progress</h2>
                            <p>{dashboardData.progress}</p>
                        </div>
                        <div className="achievements">
                            <h2>Achievements</h2>
                            <ul>
                                {dashboardData.achievements.map((achievement: any) => (
                                    <li key={achievement.id}>{achievement.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div></> : <h2 className='dashboard-heading'>Loading....</h2>
            }
        </div>
    );
};

export default Dashboard;
