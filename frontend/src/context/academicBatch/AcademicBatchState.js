import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import AcademicBatchContext from './academicBatchContext';
import academicBatchReducer from './academicBatchReducer';
import { CREATE_ACADEMIC_BATCH, CLEAR_ERRORS, CREATE_ERROR } from '../types';
import LoadingContext from '../loading/loadingContext';

const SubjectState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    academicBatch: null,
    academicBatchs: null,
    pagination: null,
    total: 0,
    error: null,
  };

  const [state, dispatch] = useReducer(academicBatchReducer, initialState);

  // Create Academic Batch
  const createAcademicBatch = async (reqObj) => {
    setLoading();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/v1/academic-batch', reqObj, config);

      dispatch({
        type: CREATE_ACADEMIC_BATCH,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: CREATE_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AcademicBatchContext.Provider
      value={{
        academicBatch: state.academicBatch,
        academicBatchs: state.academicBatchs,
        error: state.error,
        pagination: state.pagination,
        total: state.total,
        clearErrors,
        createAcademicBatch,
      }}
    >
      {props.children}
    </AcademicBatchContext.Provider>
  );
};

export default SubjectState;
