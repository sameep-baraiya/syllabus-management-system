import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_REGISTRATION_DONE,
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        registrationDone: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('dsms-token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        error: null,
      };
    case CLEAR_REGISTRATION_DONE:
      return {
        ...state,
        ...action.payload,
        registrationDone: false,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('dsms-token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        registrationDone: false,
        user: null,
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
