import {
  GET_LOGGED_USERS,
  LOGGED_USERS_ERROR,
  CLEAR_ERRORS,
  CLEAR_USERS,
  GET_USERS,
  USERS_ERROR,
} from '../types';

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
    case GET_USERS:
      return {
        ...state,
        error: null,
        users: action.payload.data,
        total: action.payload.total,
        pagination: action.payload.pagination,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: null,
        total: 0,
        pagination: null,
      };
    case USERS_ERROR:
      return {
        ...state,
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
