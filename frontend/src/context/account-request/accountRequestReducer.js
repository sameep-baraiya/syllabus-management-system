import {
  GET_ACCOUNT_REQUESTS,
  ACCOUNT_REQUESTS_ERROR,
  CLEAR_ERRORS,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ERROR,
} from '../types';

const accountRequestReducer = (state, action) => {
  switch (action.type) {
    case GET_ACCOUNT_REQUESTS:
      return {
        ...state,
        accountRequests: action.payload.data,
        error: null,
      };
    case ACCOUNT_REQUESTS_ERROR:
      return {
        ...state,
        accountRequests: null,
        error: action.payload,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_ACCOUNT_REQUEST:
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default accountRequestReducer;
