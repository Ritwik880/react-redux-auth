import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Course from './Course';
import { fetchUserDashboardData } from '../api/api';

const Courses: React.FC = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<any | null>(null);


  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await fetchUserDashboardData();
        const course = data.courses.find((course: any) => course.id === courseId);
        setCourseData(course);
      } catch (error) {
        console.error('Error fetching course data', error);
      }
    };

    fetchCourseData();
  }, [courseId]);



  return (
    <div>
      {courseData ? (
        <Course courseData={courseData}/>
      ) : (
        <div className='loading'>Loading course data...</div>
      )}
    </div>
  );
};

export default Courses;
