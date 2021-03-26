import {
  CREATE_MEETING,
  CLEAR_ERRORS,
  CREATE_ERROR,
  CLEAR_MEETINGS,
  GET_MEETINGS,
  MEETINGS_ERROR,
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
    case MEETINGS_ERROR:
      return {
        ...state,
        meetings: null,
        error: action.payload,
      };
    case GET_MEETINGS:
      return {
        ...state,
        meetings: action.payload.data,
        pagination: action.payload.pagination,
        total: action.payload.total,
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
