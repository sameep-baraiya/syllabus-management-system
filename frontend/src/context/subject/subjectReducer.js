import {
  GET_SUBJECTS,
  GET_SUBJECT,
  CLEAR_ERRORS,
  SUBJECTS_ERROR,
  SUBJECT_ERROR,
  CREATE_SUBJECT,
  CREATE_ERROR,
  CLEAR_SUBJECTS,
  UPDATE_SUBJECT,
  UPDATE_ERROR,
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case GET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload.data,
        total: action.payload.total,
        pagination: action.payload.pagination,
      };
    case GET_SUBJECT:
      return {
        ...state,
        subject: action.payload.data,
      };
    case CLEAR_SUBJECTS:
      return {
        ...state,
        subjects: null,
        pagination: null,
        total: 0,
      };
    case SUBJECTS_ERROR:
      return {
        ...state,
        subjects: null,
        error: action.payload,
      };
    case SUBJECT_ERROR:
      return {
        ...state,
        subject: null,
        error: action.payload,
      };
    case CREATE_SUBJECT:
      return {
        ...state,
        error: null,
      };
    case UPDATE_SUBJECT:
      return {
        ...state,
        error: null,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
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
