import {
  CLEAR_ERRORS,
  GET_COURSES,
  GET_COURSE,
  UPDATE_COURSE,
  COURSES_ERROR,
  COURSE_ERROR,
  UPDATE_ERROR,
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
    case UPDATE_COURSE:
    case CREATE_COURSE:
      return {
        ...state,
        error: null,
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload.data,
      };
    case UPDATE_ERROR:
    case COURSE_ERROR:
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
    default:
      return state;
  }
};

export default authReducer;
