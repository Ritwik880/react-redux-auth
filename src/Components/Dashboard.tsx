import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { fetchUserDashboardData } from '../api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutSuccess } from '../actions/authActions';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/');
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

    if (user || (location.state && location.state.allSubSubjectsCompleted)) {
      fetchData();
    }
  }, [user, location.state]);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/');
  };

  const handleCardClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const getCourseStatusText = (courseId: string) => {
    console.log(courseId);
    return isCourseCompleted(courseId) ? 'Completed' : 'In Progress';
  };

  const isCourseCompleted = (courseId: string) => {
    console.log('dashboardData:', dashboardData);
    console.log('subSubjectsProgress:', dashboardData?.subSubjectsProgress);
    console.log('progress:', dashboardData?.subSubjectsProgress?.[courseId]);
    return (
      dashboardData &&
      dashboardData.subSubjectsProgress &&
      dashboardData.subSubjectsProgress[courseId] !== undefined &&
      dashboardData.subSubjectsProgress[courseId] === 100
    );
  };

  return (
    <section className="dashboard">
      <div className="container">
        {
          dashboardData ? (
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
                    <div
                      key={item.id}
                      onClick={() => handleCardClick(item.id)}
                      className='card'
                    >
                      <footer>
                        <h2>{item.name}</h2>
                        <p>{item.para}</p>
                        <p>Status: {getCourseStatusText(item.id)}</p>
                      </footer>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <h2 className="dashboard-heading">Loading....</h2>
          )

        }
      </div>
    </section>
  );
};

export default Dashboard;
