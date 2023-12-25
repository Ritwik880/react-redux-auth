import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { markSubcourseComplete, markQuizComplete } from '../actions/authActions';

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
  const [allQuizzesCompleted, setAllQuizzesCompleted] = useState<boolean>(false);
  const [answeredQuizzes, setAnsweredQuizzes] = useState<Array<{ question: string; answer: string }>>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0); // Track the current quiz index
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);




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
        completedQuizzes: answeredQuizzes,
        courseId: courseId,
      },
    });
    setIsLastQuestion(false);

  };

  const handleRadioChange = (subcourseId: string) => {
    dispatch(markSubcourseComplete(courseId, subcourseId));
  };

  const handleCheckboxChange = () => {
    setShowCompleted(!showCompleted);
  };

  const handleShowQuizzesClick = () => {
    setShowQuizzes(true);
    setShowSubmitButton(true);
  };

  const handleOptionClick = async (quizId: number, selectedOption: string) => {
    if (quizSubmitted) {
      return;
    }

    const currentQuiz = questionsData.find((quiz) => quiz.id === quizId);


    if (currentQuiz) {
      setSelectedOptions((prevOptions) => {
        const updatedOptions = prevOptions.includes(selectedOption)
          ? prevOptions.filter((option) => option !== selectedOption)
          : [...prevOptions, selectedOption];
        return updatedOptions;
      });

      setAnsweredQuizzes((prevQuizzes) => {
        const updatedQuizzes = [...prevQuizzes, { question: currentQuiz.question, answer: selectedOption }];
        return updatedQuizzes;
      });
      dispatch(markQuizComplete(courseId, quizId));

      const isLastQuestion = currentQuizIndex === questionsData.length - 1;
      setIsLastQuestion(isLastQuestion);

      if (isLastQuestion) {
        setShowSubmitButton(true);
      }
      const allQuizzesCompleted = questionsData.every((quiz) => quiz.completed);
      setAllQuizzesCompleted(allQuizzesCompleted);
      if (!allQuizzesCompleted && !isLastQuestion) {
        setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      }
    }
  };


  const handleSubmitClick = () => {
    setQuizSubmitted(true);
    const totalMarks = answeredQuizzes.reduce((total, answeredQuiz) => {
      const currentQuiz = questionsData.find((quiz) => quiz.question === answeredQuiz.question);
      if (currentQuiz && currentQuiz.correctAnswer === answeredQuiz.answer) {
        return total + 1;
      }
      return total;
    }, 0);

    setTotalMarks(totalMarks);
    setShowQuizzes(false);
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

        {totalMarks > 0 && (
          <div className="total-marks">
            <h4>Total Marks Obtained In Quiz: {totalMarks}</h4>
          </div>
        )}

        {showQuizzes && currentQuizIndex < questionsData.length ? (
          <div>
            <h3 className="completed-tag">Quizzes</h3>
            <div className="dashboard-card">
              <div className="card" key={questionsData[currentQuizIndex].id}>
                <footer className='footer'>
                  <h2>{questionsData[currentQuizIndex].question}</h2>
                  <div className="quiz-footer">
                    {questionsData[currentQuizIndex].options.map((option, index) => (
                      <label className="label" key={index}>
                        <input
                          type="checkbox"
                          onChange={() => handleOptionClick(questionsData[currentQuizIndex].id, option)}
                          checked={selectedOptions.includes(option)}
                        />
                        {option}
                      </label>
                    ))}


                  </div>
                  {showSubmitButton && isLastQuestion && (
                    <button type="button" onClick={handleSubmitClick} className='logout quiz'>
                      Submit
                    </button>
                  )}
                </footer>
              </div>
            </div>
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