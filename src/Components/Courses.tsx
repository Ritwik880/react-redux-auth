// Courses.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Syllabus from './Syllabus';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const Courses: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const courses = useSelector((state: RootState) => state.auth.courses);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<any | null>(null);

  useEffect(() => {
    const findCourseData = () => {
      const selectedCourse = courses.find((course: any) => course.id === courseId);
      setCourseData(selectedCourse);
    };

    if (user) {
      findCourseData();
    }
  }, [courseId, user, courses]);

  return (
    <div>
      {courseData ? (
        <Syllabus courseId={courseId} subcourses={courseData.subSubjects} />
      ) : (
        <div className='loading'>Loading course data...</div>
      )}
    </div>
  );
};

export default Courses;
