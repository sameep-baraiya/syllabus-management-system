import { GET_STORAGE_INFO, STORAGE_INFO_ERROR, CLEAR_ERRORS } from '../types';

const storageReducer = (state, action) => {
  switch (action.type) {
    case GET_STORAGE_INFO:
      return {
        ...state,
        error: null,
        storageInfo: action.payload.data,
      };
    case STORAGE_INFO_ERROR:
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

export default storageReducer;
