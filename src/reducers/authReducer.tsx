import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/authActions';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
