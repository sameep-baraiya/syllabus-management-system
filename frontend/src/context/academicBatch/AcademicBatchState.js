import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import AcademicBatchContext from './academicBatchContext';
import academicBatchReducer from './academicBatchReducer';
import {
  CREATE_ACADEMIC_BATCH,
  CLEAR_ERRORS,
  CREATE_ERROR,
  GET_ACADEMIC_BATCHES,
  GET_ACADEMIC_BATCH,
  ACADEMIC_BATCHES_ERROR,
  ACADEMIC_BATCH_ERROR,
  CLEAR_ACADEMIC_BATCHES,
  CREATE_FILE,
  CREATE_FILE_ERROR,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const SubjectState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    academicBatch: null,
    academicBatches: null,
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

  // Get Subjects
  const getAcademicBatches = async (query = null) => {
    setLoading();
    try {
      let res;
      if (query == null) {
        res = await axios.get('/api/v1/academic-batch');
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

        res = await axios.get('/api/v1/academic-batch' + searchQuery);
      }

      dispatch({
        type: GET_ACADEMIC_BATCHES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: ACADEMIC_BATCHES_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Get Academic Batch
  const getAcademicBatch = async (query = 0) => {
    setLoading();
    try {
      let res = null;
      if (Number.isFinite(query)) {
        res = await axios.get(`/api/v1/academic-batch/${query}`);
      } else {
        const nestSelect =
          query.nestSelect !== undefined
            ? `?nestSelect=${query.nestSelect}`
            : '';
        const id = query.id !== undefined ? query.id : 0;
        const searchQuery = `/api/v1/academic-batch/${id}${nestSelect}`;
        res = await axios.get(searchQuery);
      }

      dispatch({
        type: GET_ACADEMIC_BATCH,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: ACADEMIC_BATCH_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Create File
  const createFile = async (reqObj = null) => {
    setLoading();
    try {
      const { id, ...rest } = reqObj;
      const res = await axios.post(`/api/v1/academic-batch/${id}`, rest);
      dispatch({
        type: CREATE_FILE,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: CREATE_FILE_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Academic Batches
  const clearAcademicBatches = () => dispatch({ type: CLEAR_ACADEMIC_BATCHES });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AcademicBatchContext.Provider
      value={{
        academicBatch: state.academicBatch,
        academicBatches: state.academicBatches,
        error: state.error,
        pagination: state.pagination,
        total: state.total,
        clearErrors,
        createAcademicBatch,
        getAcademicBatches,
        clearAcademicBatches,
        getAcademicBatch,
        createFile,
      }}
    >
      {props.children}
    </AcademicBatchContext.Provider>
  );
};

export default SubjectState;
