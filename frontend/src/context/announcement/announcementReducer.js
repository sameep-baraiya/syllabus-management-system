import {
  GET_ANNOUNCEMENTS,
  CREATE_ANNOUNCEMENT,
  CREATE_ERROR,
  ANNOUNCEMENTS_ERROR,
  CLEAR_ERRORS,
  GET_ANNOUNCEMENT,
  ANNOUNCEMENT_ERROR,
  UPDATE_ANNOUNCEMENT,
  UPDATE_ERROR,
} from '../types';

const loadingReducer = (state, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload.data,
        error: null,
      };
    case GET_ANNOUNCEMENT:
      return {
        ...state,
        announcement: action.payload.data,
        error: null,
      };
    case ANNOUNCEMENT_ERROR:
    case ANNOUNCEMENTS_ERROR:
    case CREATE_ERROR:
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
    case CREATE_ANNOUNCEMENT:
    case UPDATE_ANNOUNCEMENT:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default loadingReducer;
