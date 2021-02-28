import {
  GET_SUBJECTS,
  // GET_SUBJECT,
  // ADD_SUBJECT,
  CLEAR_ERRORS,
  SUBJECTS_ERROR,
  CREATE_SUBJECT,
  CREATE_ERROR,
  CLEAR_SUBJECTS,
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

    case CREATE_SUBJECT:
      return {
        ...state,
        error: null,
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
