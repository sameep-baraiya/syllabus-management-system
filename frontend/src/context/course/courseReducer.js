import {
  CLEAR_ERRORS,
  SET_LOADING,
  GET_COURSES,
  COURSES_ERROR,
  RESET_LOADING,
  CREATE_COURSE,
  CREATE_ERROR,
  CLEAR_COURSES,
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        error: null,
        courses: action.payload.data,
        total: action.payload.total,
        pagination: action.payload.pagination,
      };
    case CLEAR_COURSES:
      return {
        ...state,
        courses: null,
        total: 0,
        pagination: null,
      };
    case CREATE_COURSE:
      return {
        ...state,
        error: null,
      };
    case COURSES_ERROR:
    case CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RESET_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
