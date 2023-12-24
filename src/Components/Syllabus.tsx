import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { markSubcourseComplete, markQuizComplete, unmarkQuizComplete } from '../actions/authActions';

interface SubcourseProps {
  courseId: string;
  subcourses: Array<{ id: string; name: string; desc: string; completed: boolean }>;
  questionsData: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    completed: boolean;
  }>;
}

const Syllabus: React.FC<SubcourseProps> = ({ subcourses, courseId, questionsData }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [showQuizzes, setShowQuizzes] = useState<boolean>(false);
  const [filteredSubcourses, setFilteredSubcourses] = useState<Array<{ id: string; name: string; desc: string; completed: boolean }>>(
    subcourses || []
  );
  const [allQuizzesCompleted, setAllQuizzesCompleted] = useState<boolean>(false); // Add this line

  const navigate = useNavigate();

  const calculateTotalProgress = () => {
    const totalSubcourses = subcourses?.length || 0;

    if (totalSubcourses === 0) {
      return 0;
    }

    const completedSubcourses = subcourses?.reduce((sum, subcourse) => (subcourse.completed ? sum + 1 : sum), 0) || 0;

    const overallProgress = Math.floor((completedSubcourses / totalSubcourses) * 100);

    return overallProgress;
  };

  useEffect(() => {
    if (showCompleted) {
      const completed = subcourses?.filter((subcourse) => subcourse.completed) || [];
      setFilteredSubcourses(completed);
    } else {
      const filtered = subcourses?.filter((subcourse) => subcourse.name.toLowerCase().includes(searchQuery)) || [];
      setFilteredSubcourses(filtered);
    }
  }, [showCompleted, searchQuery, subcourses]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleGoBack = () => {
    navigate('/dashboard', {
      state: {
        completedSubcourses: subcourses?.filter(subcourse => subcourse.completed) || [],
        completedQuizzes: questionsData?.filter(quiz => quiz.completed) || [],
        courseId: courseId,
      },
    });
  };

  const handleRadioChange = (subcourseId: string) => {
    dispatch(markSubcourseComplete(courseId, subcourseId));
  };

  const handleCheckboxChange = () => {
    setShowCompleted(!showCompleted);
  };

  const handleShowQuizzesClick = () => {
    setShowQuizzes(!showQuizzes);
  };

  const handleOptionClick = async (quizId: number, selectedOption: string) => {
    const currentQuiz = questionsData.find((quiz) => quiz.id === quizId);
  
    if (currentQuiz) {
      const isCorrectOption = selectedOption === currentQuiz.correctAnswer;
  
      // Dispatch the appropriate action based on whether the option is correct
      if (isCorrectOption) {
        dispatch(markQuizComplete(courseId, quizId));
      } else {
        dispatch(unmarkQuizComplete(courseId, quizId));
      }
  
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Update the state to check if all quizzes are completed
      const updatedQuizzes = questionsData.map((quiz) => (quiz.id === quizId ? { ...quiz, completed: true } : quiz));
      const allQuizzesCompleted = updatedQuizzes.every((quiz) => quiz.completed);
  
      setAllQuizzesCompleted(allQuizzesCompleted);
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

        {showQuizzes ? (
          <div>
            <h3 className="completed-tag">Quizzes</h3>
            {allQuizzesCompleted ? (
              <p>You have successfully completed your quizzes!</p>
            ) : (
              <div className="dashboard-card">
                {questionsData?.map((quiz) => (
                  <div className="card" key={quiz.id}>
                    <footer className='footer'>
                      <h2>{quiz.question}</h2>
                      <div className="quiz-footer">
                        {quiz.options.map((option, index) => (
                          <label className="label" key={index}>
                            <input
                              type="checkbox"
                              onChange={() => handleOptionClick(quiz.id, option)}
                              checked={quiz.completed && option === quiz.correctAnswer}
                            />
                            {option}
                          </label>
                        ))}
                        <p>
                          {quiz.completed
                            ? quiz.completed && quiz.correctAnswer
                              ? 'Correct Answer!'
                              : 'Wrong Answer!'
                            : ''}
                        </p>
                      </div>
                    </footer>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <input
              type="text"
              className="input-box search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={showCompleted}
                onChange={handleCheckboxChange}
                id="completedCheckbox"
              />
              <label className="form-check-label" htmlFor="completedCheckbox">
                Completed Courses
              </label>
            </div>

            {calculateTotalProgress() === 100 && (
              <button type="button" onClick={handleShowQuizzesClick} className='logout quiz'>
                Show Quizzes
              </button>
            )}

            {filteredSubcourses.length === 0 ? (
              <p>No courses available</p>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Syllabus;
