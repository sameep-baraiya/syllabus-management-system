import { GET_ANNOUNCEMENTS, ANNOUNCEMENTS_ERROR, CLEAR_ERRORS } from '../types';

const loadingReducer = (state, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload.data,
      };
    case ANNOUNCEMENTS_ERROR:
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

export default loadingReducer;
