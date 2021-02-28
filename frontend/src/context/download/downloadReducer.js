import { CLEAR_ERRORS, DOWNLOAD_FILE, DOWNLOAD_ERROR } from '../types';

const downloadReducer = (state, action) => {
  switch (action.type) {
    case DOWNLOAD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case DOWNLOAD_FILE:
    default:
      return state;
  }
};

export default downloadReducer;
