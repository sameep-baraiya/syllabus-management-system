import React, { useReducer } from 'react';
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
  SET_LOADING,
  RESET_LOADING,
  CREATE_ERROR,
} from '../types';

const SubjectState = (props) => {
  const initialState = {
    subject: null,
    subjects: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(subjectReducer, initialState);

  // Get Subjects
  const getSubjects = async () => {
    setLoading();
    try {
      const res = await axios.get('/api/v1/subject');

      dispatch({
        type: GET_SUBJECTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SUBJECTS_ERROR,
        payload: err.response.data,
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

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Reset Loading
  const resetLoading = () => dispatch({ type: RESET_LOADING });

  return (
    <SubjectContext.Provider
      value={{
        loading: state.loading,
        subject: state.subject,
        subjects: state.subjects,
        error: state.error,
        getSubjects,
        clearErrors,
        setLoading,
        resetLoading,
        createSubject,
      }}
    >
      {props.children}
    </SubjectContext.Provider>
  );
};

export default SubjectState;
