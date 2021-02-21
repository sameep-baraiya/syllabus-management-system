import React, { useReducer } from 'react';
import axios from 'axios';
import DownloadContext from './downloadContext';
import downloadReducer from './downloadReducer';
import {
  CLEAR_ERRORS,
  SET_LOADING,
  RESET_LOADING,
  DOWNLOAD_FILE,
  DOWNLOAD_ERROR,
} from '../types';

const SubjectState = (props) => {
  const initialState = {
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(downloadReducer, initialState);

  // Get Subjects
  const download = async (filename) => {
    setLoading();
    try {
      const res = await axios.get(`/api/v1/download/${filename}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      dispatch({
        type: DOWNLOAD_FILE,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: DOWNLOAD_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Reset Loading
  const resetLoading = () => dispatch({ type: RESET_LOADING });

  return (
    <DownloadContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        download,
        clearErrors,
        setLoading,
        resetLoading,
      }}
    >
      {props.children}
    </DownloadContext.Provider>
  );
};

export default SubjectState;
