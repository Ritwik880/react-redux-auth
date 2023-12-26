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
  const [answeredQuizzes, setAnsweredQuizzes] = useState<Array<{ question: string; answer: string; correct: boolean }>>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0); // Track the current quiz index
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showReviewSection, setShowReviewSection] = useState<boolean>(false);
  const [showReviewButton, setShowReviewButton] = useState<boolean>(false);
  const [expandedSubcourses, setExpandedSubcourses] = useState<string[]>([]);



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

      const isAnswerCorrect = currentQuiz.correctAnswer === selectedOption;

      setAnsweredQuizzes((prevQuizzes) => {
        const updatedQuizzes = [...prevQuizzes, { question: currentQuiz.question, answer: selectedOption, correct: isAnswerCorrect }];
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
    const totalMarks = answeredQuizzes.reduce((total, answeredQuiz) => (answeredQuiz.correct ? total + 1 : total), 0);
    setTotalMarks(totalMarks);
    setShowQuizzes(false);
    setShowReviewButton(true);
  };

  const handleShowReviewClick = () => {
    setShowQuizzes(false);
    setShowReviewSection(true);
  };

  const truncateDescription = (desc: string): string => {
    const maxLength = 100; // Set your desired maximum length
    return desc.length > maxLength ? `${desc.slice(0, maxLength)}...` : desc;
  };

  const toggleReadMore = (subcourseId: string): void => {
    setExpandedSubcourses((prevExpanded) =>
      prevExpanded.includes(subcourseId)
        ? prevExpanded.filter((id) => id !== subcourseId)
        : [...prevExpanded, subcourseId]
    );
  };


  const renderReviewSection = () => (
    <>
      <h3 className="completed-tag">Review Quizzes</h3>
      <div className="dashboard-card">
        {answeredQuizzes.map((quiz, index) => (
          <div key={index}>
            <div className="card">
              <footer className='footer'>
                <h2>{quiz.question}</h2>
                <p>Your Answer: {quiz.answer}</p>
                {questionsData[index] && (
                  <p>Correct Answer: {questionsData[index].correctAnswer}</p>
                )}
                <p>{quiz.correct ? 'Correct' : 'Incorrect'}</p>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </>
  );

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
        ) : showReviewSection ? (
          renderReviewSection()
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
              <div>
                <button type="button" onClick={handleShowQuizzesClick} className='logout quiz'>
                  Show Quizzes
                </button>
              </div>
            )}
            {
              showReviewButton && <button type="button" onClick={handleShowReviewClick} className='review-button quiz'>
                Review Quizzes
              </button>
            }


            {filteredSubcourses.length === 0 ? (
              <p>No courses available</p>
            ) : (
              <div className="dashboard-card">
                {filteredSubcourses.map((subcourse) => (
                  <div className="card" key={subcourse.id}>
                    <footer>
                      <h2>{subcourse.name}</h2>
                      <p>{expandedSubcourses.includes(subcourse.id) ? subcourse.desc : truncateDescription(subcourse.desc)}</p>
                      <a href="#" onClick={() => toggleReadMore(subcourse.id)}>
                        {expandedSubcourses.includes(subcourse.id) ? 'Read Less' : 'Read More'}
                      </a>
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
