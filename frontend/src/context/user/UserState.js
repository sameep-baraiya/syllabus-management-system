import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import { GET_LOGGED_USERS, LOGGED_USERS_ERROR, CLEAR_ERRORS } from '../types';
import LoadingContext from '../loading/loadingContext';

const UserState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    loggedUsers: null,
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get Logged Users
  const getLoggedUsers = async (id = 0) => {
    setLoading();
    try {
      const res = await axios.get('/api/v1/user/logged');
      dispatch({
        type: GET_LOGGED_USERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGGED_USERS_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <UserContext.Provider
      value={{
        loggedUsers: state.loggedUsers,
        error: state.error,
        clearErrors,
        getLoggedUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
