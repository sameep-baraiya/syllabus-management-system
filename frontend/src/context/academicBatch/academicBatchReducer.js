import { CLEAR_ERRORS, CREATE_ACADEMIC_BATCH, CREATE_ERROR } from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case CREATE_ACADEMIC_BATCH:
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
