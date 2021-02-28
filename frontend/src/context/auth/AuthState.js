import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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
import LoadingContext from '../loading/loadingContext';
import AlertContext from '../alert/alertContext';

const AuthState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const initialState = {
    token: localStorage.getItem('dsms-token'),
    isAuthenticated: null,
    registrationDone: false,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setLoading();
    setAuthToken(localStorage.getItem('dsms-token'));

    try {
      const res = await axios.get('/api/v1/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      setAlert('User data not found, Please login to system', 'warning');
      dispatch({ type: AUTH_ERROR });
    } finally {
      resetLoading();
    }
  };

  // Register User
  const register = async (formData) => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/auth/register', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // TODO Error handling
      // setAlert(err.response.data.msg, 'danger');
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    } finally {
      resetLoading();
    }
  };

  // Login User
  const login = async (formData) => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/auth/login', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
    resetLoading();
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear RegistrationDone
  const clearRegistrationDone = () =>
    dispatch({ type: CLEAR_REGISTRATION_DONE });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        registrationDone: state.registrationDone,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        clearRegistrationDone,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
