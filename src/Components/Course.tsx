import React, { useState, ChangeEvent } from 'react';

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

  const calculateTotalProgress = () => {
    const totalSubSubjects = filteredSubSubjects.length;

    if (totalSubSubjects === 0) {
      return 0;
    }

    const completedSubSubjects = filteredSubSubjects.filter((subSubject) => (subSubject.progress || 0) === 100).length;
    return (completedSubSubjects / totalSubSubjects) * 100;
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = courseData.subSubjects.filter((subSubject) =>
      subSubject.name.toLowerCase().includes(query)
    );

    setFilteredSubSubjects(filtered);
  };

  return (
    <section className="dashboard">
      <div className="container">
        <h3 className='progress'>Your Progress: {calculateTotalProgress()}% completed</h3>
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
