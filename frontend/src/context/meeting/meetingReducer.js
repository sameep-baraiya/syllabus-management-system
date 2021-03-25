import {
  CREATE_MEETING,
  CLEAR_ERRORS,
  CREATE_ERROR,
  CLEAR_MEETINGS,
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case CLEAR_MEETINGS:
      return {
        ...state,
        meetings: null,
        pagination: null,
        total: 0,
      };
    case CREATE_MEETING:
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
