import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import SubjectContext from './subjectContext';
import subjectReducer from './subjectReducer';
import {
  GET_SUBJECTS,
  GET_SUBJECT,
  CREATE_SUBJECT,
  CLEAR_ERRORS,
  SUBJECTS_ERROR,
  SUBJECT_ERROR,
  CREATE_ERROR,
  CLEAR_SUBJECTS,
  UPDATE_SUBJECT,
  UPDATE_ERROR,
  DELETE_SUBJECT,
  DELETE_ERROR,
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

  // Get Subject
  const getSubject = async (id = 0) => {
    setLoading();
    try {
      let res;
      res = await axios.get(`/api/v1/subject/${id}`);
      dispatch({
        type: GET_SUBJECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SUBJECT_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Get Subject by sbuject code
  const getSubjectByCode = async (code = '') => {
    setLoading();
    try {
      let res;
      res = await axios.get(`/api/v1/subject/code/${code}`);
      dispatch({
        type: GET_SUBJECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SUBJECT_ERROR,
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
      const { files, theoryFile, practicalFile, ...rest } = reqObj;

      if (theoryFile) {
        formData.append('theory', theoryFile.file, theoryFile.name);
      }

      if (practicalFile) {
        formData.append('practical', practicalFile.file, practicalFile.name);
      }

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

  // Update Sujbect
  const updateSubject = async (reqObj) => {
    setLoading();
    try {
      const formData = new FormData();
      const { files, theoryFile, practicalFile, ...rest } = reqObj;

      if (theoryFile) {
        formData.append('theory', theoryFile.file, theoryFile.name);
      }

      if (practicalFile) {
        formData.append('practical', practicalFile.file, practicalFile.name);
      }

      files.forEach((it) => {
        formData.append('file', it.file, it.name);
      });

      formData.append('data', JSON.stringify(rest));

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const res = await axios.put(
        `/api/v1/subject/${reqObj.id}`,
        formData,
        config
      );

      dispatch({
        type: UPDATE_SUBJECT,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: UPDATE_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Delete Subject
  const deleteSubject = async (reqObj) => {
    setLoading();
    try {
      let res;
      res = await axios.delete(`/api/v1/subject/${reqObj.id}`, {
        data: { password: reqObj.password },
      });
      dispatch({
        type: DELETE_SUBJECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: DELETE_ERROR,
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
        getSubject,
        getSubjects,
        clearErrors,
        createSubject,
        clearSubjects,
        updateSubject,
        deleteSubject,
        getSubjectByCode,
      }}
    >
      {props.children}
    </SubjectContext.Provider>
  );
};

export default SubjectState;
