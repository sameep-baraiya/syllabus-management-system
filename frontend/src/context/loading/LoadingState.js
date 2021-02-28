import React, { useReducer } from 'react';
import LoadingContext from './loadingContext';
import loadingReducer from './loadingReducer';
import { SET_LOADING, RESET_LOADING } from '../types';

const AlertState = (props) => {
  const initialState = {
    loading: false,
  };

  const [state, dispatch] = useReducer(loadingReducer, initialState);

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Reset Loading
  const resetLoading = () => dispatch({ type: RESET_LOADING });

  return (
    <LoadingContext.Provider
      value={{
        loading: state.loading,
        setLoading,
        resetLoading,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

export default AlertState;
