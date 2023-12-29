import React from 'react';

interface ReviewSectionProps {
  answeredQuizzes: Array<{ question: string; answer: string; correct: boolean }>;
  questionsData: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    completed: boolean;
  }>;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ answeredQuizzes, questionsData }) => (
  <>
    <h3 className="completed-tag">Review Quizzes</h3>
    <div className="dashboard-card">
      {answeredQuizzes.map((quiz, index) => (
        <div key={index}>
          <div className="card">
            <footer className='footer'>
              <h4>{quiz.question}</h4>
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

export default ReviewSection;
