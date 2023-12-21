import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseProps {
  courseData: {
    id: string;
    name: string;
    para: string;
    subSubjects: Array<{ id: string; name: string; desc: string; progress?: number }>;
  } | null;
}

const Syllabus: React.FC<CourseProps> = ({ courseData }) => {
  if (!courseData) {
    return <div>Course data not available</div>;
  }

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subSubjectsProgress, setSubSubjectsProgress] = useState<{ [key: string]: number }>(() => {
    // Initialize progress to 0 for each subSubject
    const initialProgress = {};
    courseData.subSubjects.forEach(subSubject => {
      initialProgress[subSubject.id] = 0;
    });
    return initialProgress;
  });
  const [allSubSubjectsCompleted, setAllSubSubjectsCompleted] = useState<boolean>(false);

  const [filteredSubjects, setFilteredSubjects] = useState<Array<{ id: string; name: string; desc: string; progress?: number }>>(courseData.subSubjects);

  const navigate = useNavigate();

  const calculateTotalProgress = () => {
    const totalSubSubjects = courseData.subSubjects.length;

    if (totalSubSubjects === 0) {
      return 0;
    }

    const completedSubSubjects = courseData.subSubjects.reduce((sum, subSubject) => {
      const progress = subSubjectsProgress[subSubject.id] || 0;
      return sum + progress;
    }, 0);

    // Calculate and return the overall progress
    return Math.floor((completedSubSubjects / (totalSubSubjects * 100)) * 100);
  };

  useEffect(() => {
    const isAllCompleted = courseData.subSubjects.every(
      (subSubject) => subSubjectsProgress[subSubject.id] === 100
    );

    setAllSubSubjectsCompleted(isAllCompleted);
  }, [courseData.subSubjects, subSubjectsProgress]);

  useEffect(() => {
    localStorage.setItem('subSubjectsProgress', JSON.stringify(subSubjectsProgress));
    if (allSubSubjectsCompleted) {
      const delay = 1000;
      const alertTimeout = setTimeout(() => {
        alert('Congratulations! You have completed all subjects.');
      }, delay);
      return () => clearTimeout(alertTimeout);
    }
  }, [subSubjectsProgress, allSubSubjectsCompleted]);

  useEffect(() => {
    const filtered = courseData.subSubjects.filter((subSubject) =>
      subSubject.name.toLowerCase().includes(searchQuery)
    );
    setFilteredSubjects(filtered);
  }, [searchQuery, courseData.subSubjects]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleSubjectChange = (subjectId: string) => {
    setSubSubjectsProgress((prev) => {
      const newProgress = Math.min((prev[subjectId] || 0) + 100, 100);
      const updatedProgress = { ...prev, [subjectId]: newProgress };

      const isAllCompleted = courseData.subSubjects.every(
        (subSubject) => updatedProgress[subSubject.id] === 100
      );

      setAllSubSubjectsCompleted(isAllCompleted);

      return updatedProgress;
    });
  };

  const handleGoBack = () => {
    if (allSubSubjectsCompleted) {
      navigate('/dashboard', { state: { allSubSubjectsCompleted: true } });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <section className="dashboard">
      <div className="container">
        <div className="header">
          <h3 className="progress">Your Progress: {calculateTotalProgress()}% completed</h3>
          <button type="button" onClick={handleGoBack} className="logout">
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
          {filteredSubjects.map((subSubject: any) => (
            <div className="card" key={subSubject.id}>
              <footer>
                <h2>{subSubject.name}</h2>
                <p>{subSubject.desc}</p>
                <div className="bottom-footer">
                  <label className="label">
                    <input
                      type="radio"
                      value={subSubject.id}
                      checked={subSubjectsProgress[subSubject.id] > 0}
                      onChange={() => handleSubjectChange(subSubject.id)}
                      className="radio"
                    />
                    {subSubject.name}
                  </label>
                  <p>{(subSubjectsProgress[subSubject.id] || 0)}% completed</p>
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
