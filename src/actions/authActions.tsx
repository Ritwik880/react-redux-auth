export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const MARK_SUBCOURSE_COMPLETE = 'MARK_SUBCOURSE_COMPLETE';
export const MARK_QUIZ_COMPLETE = 'MARK_QUIZ_COMPLETE';
export const UNMARK_QUIZ_COMPLETE = 'UNMARK_QUIZ_COMPLETE';


export const registerSuccess = (user: any) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const loginSuccess = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const markSubcourseComplete = (courseId: string, subcourseId: string) => ({
  type: MARK_SUBCOURSE_COMPLETE,
  payload: { courseId, subcourseId },
});

export const markQuizComplete = (courseId: string, quizId: number) => {
  return {
    type: MARK_QUIZ_COMPLETE,
    payload: {
      courseId,
      quizId,
    },
  };
};

export const unmarkQuizComplete = (courseId: string, quizId: number) => {
  return {
    type: UNMARK_QUIZ_COMPLETE,
    payload: {
      courseId,
      quizId,
    },
  };
};
