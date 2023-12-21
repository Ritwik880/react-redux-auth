import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Syllabus from './Syllabus';
import { fetchUserDashboardData } from '../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const Courses: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<any | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await fetchUserDashboardData();

        const isNewUser = !user
        const initialProgress: { [key: string]: number } = {};

        data.courses.forEach((course: any) => {
          course.subSubjects.forEach((subSubject: any) => {
            initialProgress[subSubject.id] = isNewUser ? 0 : subSubject.progress || 0;
          });
        });

        const selectedCourse = data.courses.find((course: any) => course.id === courseId);
        if (selectedCourse) {
          selectedCourse.subSubjects.forEach((subSubject: any) => {
            subSubject.progress = initialProgress[subSubject.id];
          });
        }

        setCourseData(selectedCourse);
      } catch (error) {
        console.error('Error fetching course data', error);
      }
    };

    fetchCourseData();
  }, [courseId, user]);

  return (
    <div>
      {courseData ? (
        <Syllabus courseData={courseData} />
      ) : (
        <div className='loading'>Loading course data...</div>
      )}
    </div>
  );
};

export default Courses;
