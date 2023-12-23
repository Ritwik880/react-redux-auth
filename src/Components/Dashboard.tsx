import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutSuccess } from '../actions/authActions';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const courses = useSelector((state: RootState) => state.auth.courses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

    const handleUserActivityEvents = ['mousemove', 'keydown', 'scroll'];
    handleUserActivityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    resetSessionTimeout();

    return () => {
      handleUserActivityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearTimeout(timeoutId);
    };
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/');
  };

  const handleCardClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <section className="dashboard">
      <div className="container">
        {sessionExpired ? (
          <h2>Your session has expired. Please log in again.</h2>
        ) : (
          <>
            <div className="header">
              <h2>Welcome to your Dashboard, {user?.username}!</h2>
              <button type="button" onClick={handleLogout} className="logout">
                Logout
              </button>
            </div>
            <h2 className='your-courses'>Your Courses</h2>
            <div className="dashboard-card">
              {courses &&
                courses.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item.id)}
                    className="card"
                  >
                    <footer>
                      <h2>{item.name}</h2>
                      <p>{item.para}</p>
                      {item.subSubjects.every(sub => sub.completed) ? (
                        <div className="completed-badge">Course Completion: Completed</div>
                      ) : (
                        <div className="completed-badge">Course Completion: In Progress</div>
                      )}
                    </footer>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
