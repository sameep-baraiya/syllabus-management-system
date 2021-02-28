import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import SubjectContext from './subjectContext';
import subjectReducer from './subjectReducer';
import {
  GET_SUBJECTS,
  // GET_SUBJECT,
  // TODO Create GET_SUBJECT Route
  CREATE_SUBJECT,
  CLEAR_ERRORS,
  SUBJECTS_ERROR,
  CREATE_ERROR,
  CLEAR_SUBJECTS,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const SubjectState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    subject: null,
    subjects: null,
    pagination: null,
    total: 0,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(subjectReducer, initialState);

  // Get Subjects
  const getSubjects = async (query = null) => {
    setLoading();
    try {
      let res;
      if (query == null) {
        res = await axios.get('/api/v1/subject');
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
        let attributes = '';
        if (query.attributes !== undefined) {
          Object.keys(query.attributes).forEach((key) => {
            attributes = attributes.concat(`&${key}=${query.attributes[key]}`);
          });
        }
        const searchQuery =
          sort + select + page + limit + sortBy + attributes + search;

        res = await axios.get('/api/v1/subject' + searchQuery);
      }

      dispatch({
        type: GET_SUBJECTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SUBJECTS_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Create Sujbect
  const createSubject = async (reqObj) => {
    setLoading();
    try {
      const formData = new FormData();
      const { files, ...rest } = reqObj;
      files.forEach((it) => {
        formData.append('file', it.file, it.name);
      });

      formData.append('data', JSON.stringify(rest));

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const res = await axios.post('/api/v1/subject', formData, config);

      dispatch({
        type: CREATE_SUBJECT,
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

  // Clear Subjects
  const clearSubjects = () => dispatch({ type: CLEAR_SUBJECTS });

  return (
    <SubjectContext.Provider
      value={{
        subject: state.subject,
        subjects: state.subjects,
        error: state.error,
        pagination: state.pagination,
        total: state.total,
        getSubjects,
        clearErrors,
        createSubject,
        clearSubjects,
      }}
    >
      {props.children}
    </SubjectContext.Provider>
  );
};

export default SubjectState;
