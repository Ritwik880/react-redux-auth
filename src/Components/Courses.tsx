import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Syllabus from './Syllabus';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface Subcourse {
  id: string;
  name: string;
  desc: string;
  completed: boolean;
}

interface Course {
  id: string;
  name: string;
  para: string;
  subSubjects: Subcourse[];
  completedCourses: string[];
  questionsData: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    completed: boolean;
  }>;
}

const Courses: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const courses = useSelector((state: RootState) => state.auth.courses);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<Course | null>(null);

  useEffect(() => {
    const findCourseData = () => {
      const selectedCourse = courses.find((course: Course) => course.id === courseId);
      if (selectedCourse !== undefined) {
        setCourseData(selectedCourse);
      } else {
        setCourseData(null);
      }
    };

    if (user) {
      findCourseData();
    }
  }, [courseId, user, courses]);

  return (
    <div>
      {courseData ? (
        <Syllabus courseId={courseId || ''} subcourses={courseData.subSubjects} questionsData={courseData.questionsData} />

      ) : (
        <div className='loading'>Loading course data...</div>
      )}
    </div>
  );
};

export default Courses;
