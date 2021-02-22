import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import {
  GET_COURSES,
  COURSES_ERROR,
  CREATE_COURSE,
  CLEAR_ERRORS,
  SET_LOADING,
  RESET_LOADING,
  CREATE_ERROR,
  CLEAR_COURSES,
} from '../types';

const SubjectState = (props) => {
  const initialState = {
    course: null,
    courses: null,
    pagination: null,
    total: 0,
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

  // Get Courses
  const getCourses = async (query = null) => {
    setLoading();
    try {
      let res;
      if (query == null) {
        res = await axios.get('/api/v1/course');
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

        res = await axios.get('/api/v1/course' + searchQuery);
      }

      dispatch({
        type: GET_COURSES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: COURSES_ERROR,
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

  // Clear Courses
  const clearCourses = () => dispatch({ type: CLEAR_COURSES });

  return (
    <CourseContext.Provider
      value={{
        loading: state.loading,
        course: state.course,
        courses: state.courses,
        error: state.error,
        pagination: state.pagination,
        total: state.total,
        clearErrors,
        setLoading,
        resetLoading,
        createCourse,
        getCourses,
        clearCourses,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default SubjectState;
