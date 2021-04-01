import {
  CLEAR_ERRORS,
  DOWNLOAD_FILE,
  DOWNLOAD_ERROR,
  VIEW_FILE,
  VIEW_FILE_ERROR,
} from '../types';

const downloadReducer = (state, action) => {
  switch (action.type) {
    case DOWNLOAD_ERROR:
    case VIEW_FILE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
    case VIEW_FILE:
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
