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

const Course: React.FC<CourseProps> = ({ courseData }) => {
  if (!courseData) {
    return <div>Course data not available</div>;
  }

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subSubjectsProgress, setSubSubjectsProgress] = useState<{ [key: string]: number }>({});
  const [allSubSubjectsCompleted, setAllSubSubjectsCompleted] = useState<boolean>(false);
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
  
    // Use Math.floor to round down to the nearest integer
    return Math.floor((completedSubSubjects / (totalSubSubjects * 100)) * 100);
  };

  useEffect(() => {
    const isAllCompleted = courseData.subSubjects.every(
      (subSubject) => subSubjectsProgress[subSubject.id] === 100
    );

    setAllSubSubjectsCompleted(isAllCompleted);
  }, [courseData.subSubjects, subSubjectsProgress]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = courseData.subSubjects.filter((subSubject) =>
      subSubject.name.toLowerCase().includes(query)
    );

    setSubSubjectsProgress((prev) => {
      const updatedProgress: { [key: string]: number } = {};
      filtered.forEach((subSubject) => {
        updatedProgress[subSubject.id] = prev[subSubject.id] || 0;
      });
      return updatedProgress;
    });
  };

  const handleSubjectChange = (subjectId: string) => {
    // Update the progress of the selected subject
    setSubSubjectsProgress((prev) => ({
      ...prev,
      [subjectId]: prev[subjectId] ? prev[subjectId] + 100 : 100,
    }));
  };

  const handleGoBack = () => {
    if (allSubSubjectsCompleted) {
      // Pass the state to the dashboard route
      navigate('/dashboard', { state: { allSubSubjectsCompleted: true } });
    } else {
      // You can customize this logic or provide feedback if needed
      navigate('/dashboard')
    }
  };

  return (
    <section className="dashboard">
      <div className="container">
        <div className='header'>
          <h3 className='progress'>Your Progress: {calculateTotalProgress()}% completed</h3>
          <button type="button" onClick={handleGoBack} className='logout'>
            Go Back
          </button>
        </div>

        <input
          type="text"
          className='input-box search'
          placeholder='Search'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="dashboard-card">
          {courseData.subSubjects.map((subSubject: any) => (
            <div className="card" key={subSubject.id}>

              <footer>
                <h2>{subSubject.name}</h2>
                <p>{subSubject.desc}</p>
                <div className='bottom-footer'>
                  <label className='label'>
                    <input
                      type="radio"
                      value={subSubject.id}
                      checked={subSubjectsProgress[subSubject.id] > 0}
                      onChange={() => handleSubjectChange(subSubject.id)}
                      className='radio'
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

export default Course;
