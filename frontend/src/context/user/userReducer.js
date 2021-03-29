import { GET_LOGGED_USERS, LOGGED_USERS_ERROR, CLEAR_ERRORS } from '../types';

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_LOGGED_USERS:
      return {
        ...state,
        loggedUsers: action.payload.data,
      };
    case LOGGED_USERS_ERROR:
      return {
        ...state,
        loggedUsers: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
