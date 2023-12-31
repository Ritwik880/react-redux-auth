import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { markSubcourseComplete, markQuizComplete } from '../actions/authActions';
import Quiz from './Quiz';
import ReviewSection from './ReviewSection';
import { SHOW_QUIZZES_BUTTON_TEXT, GO_BACK, TOTAL_MARKS, COMPLETED_COURSES, REVIEW_QUIZ, NO_COURSES } from '../constants/constant';
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
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showReviewSection, setShowReviewSection] = useState<boolean>(false);
  const [showReviewButton, setShowReviewButton] = useState<boolean>(false);
  const [expandedSubcourses, setExpandedSubcourses] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (showCompleted) {
      const completed = subcourses?.filter((subcourse) => subcourse.completed) || [];
      setFilteredSubcourses(completed);
    } else {
      const filtered = subcourses?.filter((subcourse) => subcourse.name.toLowerCase().includes(searchQuery)) || [];
      setFilteredSubcourses(filtered);
    }
    return () => {
      setAnsweredQuizzes([]);
      setCurrentQuizIndex(0);
      setShowSubmitButton(false);
      setQuizSubmitted(false);
      setSelectedOptions([]);
      setShowReviewSection(false);
      setShowReviewButton(false);
      setExpandedSubcourses([]);
    };
  }, [showCompleted, searchQuery, subcourses, courseId]);

  const calculateTotalProgress = () => {
    const totalSubcourses = subcourses?.length || 0;

    if (totalSubcourses === 0) {
      return 0;
    }

    const completedSubcourses = subcourses?.reduce((sum, subcourse) => (subcourse.completed ? sum + 1 : sum), 0) || 0;

    const overallProgress = Math.floor((completedSubcourses / totalSubcourses) * 100);

    return overallProgress;
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleGoBack = () => {
    navigate('/dashboard', {
      state: {
        completedSubcourses: subcourses?.filter((subcourse) => subcourse.completed) || [],
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
    const maxLength = 100;
    return desc.length > maxLength ? `${desc.slice(0, maxLength)}...` : desc;
  };

  const toggleReadMore = (subcourseId: string): void => {
    setExpandedSubcourses((prevExpanded) =>
      prevExpanded.includes(subcourseId)
        ? prevExpanded.filter((id) => id !== subcourseId)
        : [...prevExpanded, subcourseId]
    );
  };

  const renderReviewSection = () => <ReviewSection answeredQuizzes={answeredQuizzes} questionsData={questionsData} />;

  return (
    <section className="dashboard">
      <div className="container">
        <div className="header">
          <h3 className="progress">Your Progress: {calculateTotalProgress()}% completed</h3>
          <button type="button" onClick={handleGoBack} className="logout">
           {GO_BACK}
          </button>
        </div>

        {totalMarks > 0 && (
          <div className="total-marks">
            <h4>{TOTAL_MARKS} {totalMarks}</h4>
          </div>
        )}

        {showQuizzes && currentQuizIndex < questionsData.length ? (
          <Quiz
            questionsData={questionsData}
            currentQuizIndex={currentQuizIndex}
            handleOptionClick={handleOptionClick}
            handleSubmitClick={handleSubmitClick}
            showSubmitButton={showSubmitButton}
            isLastQuestion={isLastQuestion}
            selectedOptions={selectedOptions}
          />
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
                {COMPLETED_COURSES}
              </label>
            </div>

            {calculateTotalProgress() === 100 && (
              <div>
                <button type="button" onClick={handleShowQuizzesClick} className="logout quiz">
                  {SHOW_QUIZZES_BUTTON_TEXT}
                </button>
              </div>
            )}
            {showReviewButton && (
              <button type="button" onClick={handleShowReviewClick} className="review-button quiz">
                {REVIEW_QUIZ}
              </button>
            )}

            {filteredSubcourses.length === 0 ? (
              <p>{NO_COURSES}</p>
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
