import React, { useState } from 'react';

interface QuizSectionProps {
  questionsData: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    completed: boolean;
  }>;
  currentQuizIndex: number;
  handleOptionClick: (quizId: number, selectedOption: string) => void;
  handleSubmitClick: () => void;
  showSubmitButton: boolean;
  isLastQuestion: boolean;
  selectedOptions: string[];
}

const Quiz: React.FC<QuizSectionProps> = ({
  questionsData,
  currentQuizIndex,
  handleOptionClick,
  handleSubmitClick,
  showSubmitButton,
  isLastQuestion,
  selectedOptions,
}) => {
  const currentQuiz = questionsData[currentQuizIndex];

  return (
    <div>
      <h3 className="completed-tag">Quizzes</h3>
      <div className="dashboard-card">
        <div className="card" key={currentQuiz.id}>
          <footer className='footer'>
            <h2>{currentQuiz.question}</h2>
            <div className="quiz-footer">
              {currentQuiz.options.map((option, index) => (
                <label className="label" key={index}>
                  <input
                    type="checkbox"
                    onChange={() => handleOptionClick(currentQuiz.id, option)}
                    checked={selectedOptions.includes(option)}
                    className='radio'
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
  );
};

export default Quiz;
