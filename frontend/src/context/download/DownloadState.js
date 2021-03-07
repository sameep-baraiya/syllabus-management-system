import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import DownloadContext from './downloadContext';
import downloadReducer from './downloadReducer';
import { CLEAR_ERRORS, DOWNLOAD_FILE, DOWNLOAD_ERROR } from '../types';
import LoadingContext from '../loading/loadingContext';

const DownloadState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(downloadReducer, initialState);

  // Download File Based On Path
  const download = async (filepath) => {
    setLoading();
    try {
      const res = await axios.get(`/api/v1/download/${filepath}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filepath.split('/').pop());
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

  return (
    <DownloadContext.Provider
      value={{
        error: state.error,
        download,
        clearErrors,
      }}
    >
      {props.children}
    </DownloadContext.Provider>
  );
};

export default DownloadState;
