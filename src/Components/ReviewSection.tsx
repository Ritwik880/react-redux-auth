import React from 'react';
import { CORRECT_ANSWER, REVIEW_QUIZ, YOUR_ANSWER } from '../constants/constant';

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
    <h3 className="completed-tag">{REVIEW_QUIZ}</h3>
    <div className="dashboard-card">
      {answeredQuizzes.map((quiz, index) => (
        <div key={index}>
          <div className="card">
            <footer className='footer'>
              <h4>{quiz.question}</h4>
              <p>{YOUR_ANSWER} {quiz.answer}</p>
              {questionsData[index] && (
                <p>{CORRECT_ANSWER} {questionsData[index].correctAnswer}</p>
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
