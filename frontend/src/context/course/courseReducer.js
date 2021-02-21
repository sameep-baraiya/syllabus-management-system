import {
  CLEAR_ERRORS,
  SET_LOADING,
  RESET_LOADING,
  CREATE_COURSE,
  CREATE_ERROR,
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case CREATE_COURSE:
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
