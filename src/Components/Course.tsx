import React from 'react';

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

  const calculateTotalProgress = () => {
    const { subSubjects } = courseData;
    const totalSubSubjects = subSubjects.length;

    if (totalSubSubjects === 0) {
      return 0;
    }

    const completedSubSubjects = subSubjects.filter((subSubject) => (subSubject.progress || 0) === 100).length;
    return (completedSubSubjects / totalSubSubjects) * 100;
  };

  return (
    <section className="dashboard">
      <div className="container">
        <h3 className='progress'>Your Progress: {calculateTotalProgress()}% completed</h3>
        <div className="dashboard-card">
          {courseData.subSubjects.map((subSubject: any) => (
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
