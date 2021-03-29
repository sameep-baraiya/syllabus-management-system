import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import StorageContext from './storageContext';
import storageReducer from './storageReducer';
import { GET_STORAGE_INFO, STORAGE_INFO_ERROR, CLEAR_ERRORS } from '../types';
import LoadingContext from '../loading/loadingContext';

const StorageState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    storageInfo: null,
    error: null,
  };

  const [state, dispatch] = useReducer(storageReducer, initialState);

  // Get Storage Info
  const getStorageInfo = async () => {
    setLoading();
    try {
      const res = await axios.get('/api/v1/storage/info');

      dispatch({
        type: GET_STORAGE_INFO,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: STORAGE_INFO_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <StorageContext.Provider
      value={{
        storageInfo: state.storageInfo,
        error: state.error,
        clearErrors,
        getStorageInfo,
      }}
    >
      {props.children}
    </StorageContext.Provider>
  );
};

export default StorageState;
