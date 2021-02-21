import {
  CLEAR_ERRORS,
  SET_LOADING,
  RESET_LOADING,
  DOWNLOAD_FILE,
  DOWNLOAD_ERROR,
} from '../types';

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
    case DOWNLOAD_FILE:
    default:
      return state;
  }
};

export default downloadReducer;
