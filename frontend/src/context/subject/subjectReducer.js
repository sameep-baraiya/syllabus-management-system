import {
  GET_SUBJECTS,
  // GET_SUBJECT,
  // ADD_SUBJECT,
  CLEAR_ERRORS,
  SUBJECTS_ERROR,
  SET_LOADING,
  RESET_LOADING,
  CREATE_SUBJECT,
  CREATE_ERROR,
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case GET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload.data,
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
