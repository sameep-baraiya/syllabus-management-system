import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import AccountRequestContext from './accountRequestContext';
import accountRequestReducer from './accountRequestReducer';
import {
  GET_ACCOUNT_REQUESTS,
  ACCOUNT_REQUESTS_ERROR,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ERROR,
  CLEAR_ERRORS,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const AccountRequestState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    accountRequests: null,
    error: null,
  };

  const [state, dispatch] = useReducer(accountRequestReducer, initialState);

  // Get Account Requests
  const getAccountRequests = async () => {
    setLoading();
    try {
      const res = await axios.get('/api/v1/account-request');
      dispatch({
        type: GET_ACCOUNT_REQUESTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ACCOUNT_REQUESTS_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Update Account Request
  const updateAccountRequest = async (reqObj) => {
    setLoading();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.put(
        `/api/v1/account-request/${reqObj.id}`,
        reqObj,
        config
      );

      dispatch({
        type: UPDATE_ACCOUNT_REQUEST,
        payload: res.data,
      });
      getAccountRequests();
    } catch (err) {
      dispatch({
        type: UPDATE_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AccountRequestContext.Provider
      value={{
        accountRequests: state.accountRequests,
        error: state.error,
        clearErrors,
        getAccountRequests,
        updateAccountRequest,
      }}
    >
      {props.children}
    </AccountRequestContext.Provider>
  );
};

export default AccountRequestState;
