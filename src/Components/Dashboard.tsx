import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { fetchUserDashboardData } from '../api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutSuccess } from '../actions/authActions';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [completedSubSubjects, setCompletedSubSubjects] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const handleSessionExpiration = () => {
      dispatch(logoutSuccess());
      navigate('/');
    };

    let timeoutId: NodeJS.Timeout;

    const resetSessionTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSessionExpired(true);
        handleSessionExpiration();
      }, 60000);
    };

    const handleUserActivity = () => {
      resetSessionTimeout();
    };

    // Check for user activity
    const handleUserActivityEvents = ['mousemove', 'keydown', 'scroll'];
    handleUserActivityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    // Initial session timeout setup
    resetSessionTimeout();

    return () => {
      // Clean up event listeners on component unmount
      handleUserActivityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearTimeout(timeoutId);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    const allSubSubjectsCompleted =
      location.state && location.state.allSubSubjectsCompleted;

    if (user || allSubSubjectsCompleted) {
      fetchData();
    }

    const storedCompletedSubSubjects = localStorage.getItem(
      'completedSubSubjects'
    );
    if (storedCompletedSubSubjects) {
      setCompletedSubSubjects(JSON.parse(storedCompletedSubSubjects));
    }
  }, [user, location.state]);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/');
  };

  const handleCardClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const isCourseCompleted = (courseId: string) => {
    return (
      dashboardData &&
      dashboardData.courses &&
      dashboardData.courses.some(
        (course) =>
          course.id === courseId &&
          course.completedCourses.length === course.subSubjects.length
      )
    );
  };

  return (
    <section className="dashboard">
      <div className="container">
        {sessionExpired ? (
          <h2>Your session has expired. Please log in again.</h2>
        ) : (
          <>
            {dashboardData ? (
              <>
                <div className="header">
                  <h2>Welcome to your Dashboard, {user?.username}!</h2>
                  <button type="button" onClick={handleLogout} className="logout">
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
                        className="card"
                      >
                        <footer>
                          <h2>{item.name}</h2>
                          <p>{item.para}</p>
                          <p>
                            Status:{' '}
                            {isCourseCompleted(item.id) ? 'Completed' : 'In Progress'}
                          </p>
                        </footer>
                      </div>
                    ))}
                </div>

                {completedSubSubjects.length > 0 && (
                  <div>
                    <h2>Completed Sub-Subjects</h2>
                    <ul>
                      {completedSubSubjects.map((subSubject: any) => (
                        <li
                          key={`${subSubject.courseName}-${subSubject.subSubjectName}`}
                        >
                          <strong>{subSubject.courseName}:</strong>{' '}
                          {subSubject.subSubjectName} - {subSubject.subSubjectDesc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <h2 className="dashboard-heading">Loading....</h2>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
