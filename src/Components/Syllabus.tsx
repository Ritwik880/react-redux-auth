import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { markSubcourseComplete } from '../actions/authActions';

interface SubcourseProps {
  courseId: string;
  subcourses: Array<{ id: string; name: string; desc: string; completed: boolean }>;
}

const Syllabus: React.FC<SubcourseProps> = ({ subcourses, courseId }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [filteredSubcourses, setFilteredSubcourses] = useState<Array<{ id: string; name: string; desc: string; completed: boolean }>>(
    subcourses || []
  );

  const navigate = useNavigate();

  const calculateTotalProgress = () => {
    const totalSubcourses = subcourses?.length || 0;

    if (totalSubcourses === 0) {
      return 0;
    }

    const completedSubcourses = subcourses?.reduce((sum, subcourse) => (subcourse.completed ? sum + 1 : sum), 0) || 0;

    // Calculate and return the overall progress
    const overallProgress = Math.floor((completedSubcourses / totalSubcourses) * 100);

    return overallProgress;
  };

  useEffect(() => {
    const filtered = subcourses?.filter((subcourse) => subcourse.name.toLowerCase().includes(searchQuery)) || [];
    setFilteredSubcourses(filtered);
  }, [searchQuery, subcourses]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleGoBack = (courseId: string) => {
    navigate('/dashboard', {
      state: {
        completedSubcourses: subcourses?.filter(subcourse => subcourse.completed) || [],
        courseId: courseId, // Pass courseId to the state
      },
    });
  };
  
  const handleRadioChange = (subcourseId: string) => {
    dispatch(markSubcourseComplete(courseId, subcourseId));
  };

  return (
    <section className="dashboard">
      <div className="container">
        <div className="header">
          <h3 className="progress">Your Progress: {calculateTotalProgress()}% completed</h3>
          <button type="button" onClick={() => handleGoBack(courseId)} className="logout">
            Go Back
          </button>
        </div>

        <input
          type="text"
          className="input-box search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="dashboard-card">
          {filteredSubcourses.map((subcourse) => (
            <div className="card" key={subcourse.id}>
              <footer>
                <h2>{subcourse.name}</h2>
                <p>{subcourse.desc}</p>
                <div className="bottom-footer">
                  <label className="label">
                    <input
                      type="radio"
                      className="radio"
                      onChange={() => handleRadioChange(subcourse.id)}
                      checked={subcourse.completed}
                    />
                    {subcourse.name}
                  </label>
                  <p>{subcourse.completed ? '100%' : '0%'} completed</p>
                </div>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Syllabus;
