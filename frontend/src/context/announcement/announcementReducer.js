import {
  GET_ANNOUNCEMENTS,
  CREATE_ANNOUNCEMENT,
  CREATE_ERROR,
  ANNOUNCEMENTS_ERROR,
  CLEAR_ERRORS,
} from '../types';

const loadingReducer = (state, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload.data,
        error: null,
      };
    case ANNOUNCEMENTS_ERROR:
    case CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
    case CREATE_ANNOUNCEMENT:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default loadingReducer;
