import React, { useState, ChangeEvent } from 'react';
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
  const [filteredSubSubjects, setFilteredSubSubjects] = useState(courseData.subSubjects);
  const navigate = useNavigate();

  const calculateTotalProgress = () => {
    const totalSubSubjects = courseData.subSubjects.length;

    if (totalSubSubjects === 0) {
      return 0;
    }

    const completedSubSubjects = courseData.subSubjects.reduce((sum, subSubject) => {
      const progress = subSubject.progress || 0;
      return sum + progress;
    }, 0);

    return (completedSubSubjects / (totalSubSubjects * 100)) * 100;
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = courseData.subSubjects.filter((subSubject) =>
      subSubject.name.toLowerCase().includes(query)
    );

    setFilteredSubSubjects(filtered);
  };

  const handleGoBack = ()=>{
    navigate('/dashboard')
  }

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
          {filteredSubSubjects.map((subSubject: any) => (
            <div className="card" key={subSubject.id}>
              <footer>
                <h2>{subSubject.name}</h2>
                <p>{subSubject.desc}</p>
                <p>Progress: {(subSubject.progress || 0)}% completed</p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Course;
