import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import ConfigContext from './configContext';
import configReducer from './configReducer';
import {
  INIT_CONFIG,
  INIT_CONFIG_ERROR,
  CLEAR_ERRORS,
  UPDATE_ERROR,
  UPDATE_CONFIG,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const ConfigState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    departmentType: null,
    courseType: null,
    subjectType: null,
    error: null,
  };

  const [state, dispatch] = useReducer(configReducer, initialState);

  // Init Config
  const initConfig = async () => {
    setLoading();
    try {
      const res = await axios.get('/api/v1/config');

      dispatch({
        type: INIT_CONFIG,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: INIT_CONFIG_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Update Config
  const updateConfig = async (reqObj) => {
    setLoading();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put('/api/v1/config', reqObj, config);

      dispatch({
        type: UPDATE_CONFIG,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
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
    <ConfigContext.Provider
      value={{
        departmentType: state.departmentType,
        courseType: state.courseType,
        subjectType: state.subjectType,
        error: state.error,
        clearErrors,
        initConfig,
        updateConfig,
      }}
    >
      {props.children}
    </ConfigContext.Provider>
  );
};

export default ConfigState;
