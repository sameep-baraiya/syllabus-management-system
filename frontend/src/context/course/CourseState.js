import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import {
  // GET_SUBJECT,
  // TODO Create GET_SUBJECT Route
  CREATE_COURSE,
  CLEAR_ERRORS,
  SET_LOADING,
  RESET_LOADING,
  CREATE_ERROR,
} from '../types';

const SubjectState = (props) => {
  const initialState = {
    course: null,
    courses: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(courseReducer, initialState);

  // Create Sujbect
  const createCourse = async (reqObj) => {
    setLoading();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/v1/course', reqObj, config);

      dispatch({
        type: CREATE_COURSE,
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
    <CourseContext.Provider
      value={{
        loading: state.loading,
        course: state.course,
        courses: state.courses,
        error: state.error,
        clearErrors,
        setLoading,
        resetLoading,
        createCourse,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default SubjectState;
