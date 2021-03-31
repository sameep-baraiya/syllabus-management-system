import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import {
  GET_LOGGED_USERS,
  LOGGED_USERS_ERROR,
  CLEAR_USERS,
  GET_USERS,
  USERS_ERROR,
  CLEAR_ERRORS,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const UserState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    user: null,
    users: null,
    pagination: null,
    total: 0,
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

  // Get Logged Users
  const getUsers = async (query = 0) => {
    setLoading();
    try {
      let res;
      if (query == null) {
        res = await axios.get('/api/v1/user');
      } else {
        const sort =
          query.sort !== undefined ? `?sort=${query.sort}` : '?sort=ASC';
        const select =
          query.select !== undefined ? `&select=${query.select}` : '';
        const page = query.page !== undefined ? `&page=${query.page}` : '';
        const limit = query.limit !== undefined ? `&limit=${query.limit}` : '';
        const sortBy =
          query.sortBy !== undefined ? `&sortBy=${query.sortBy}` : '';
        const search =
          query.search !== undefined ? `&search=${query.search}` : '';
        const nestSelect =
          query.nestSelect !== undefined
            ? `&nestSelect=${query.nestSelect}`
            : '';
        let attributes = '';
        if (query.attributes !== undefined) {
          Object.keys(query.attributes).forEach((key) => {
            attributes = attributes.concat(`&${key}=${query.attributes[key]}`);
          });
        }
        const searchQuery =
          sort +
          select +
          page +
          limit +
          sortBy +
          attributes +
          search +
          nestSelect;

        res = await axios.get('/api/v1/user' + searchQuery);
      }
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        pagination: state.pagination,
        total: state.total,
        loggedUsers: state.loggedUsers,
        error: state.error,
        clearErrors,
        getLoggedUsers,
        clearUsers,
        getUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
