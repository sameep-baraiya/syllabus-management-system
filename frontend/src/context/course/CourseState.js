import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import {
  GET_COURSES,
  GET_COURSE,
  UPDATE_COURSE,
  COURSES_ERROR,
  COURSE_ERROR,
  DELETE_COURSE,
  DELETE_ERROR,
  UPDATE_ERROR,
  CREATE_COURSE,
  CLEAR_ERRORS,
  CREATE_ERROR,
  CLEAR_COURSES,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const SubjectState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    course: null,
    courses: null,
    pagination: null,
    total: 0,
    error: null,
  };

  const [state, dispatch] = useReducer(courseReducer, initialState);

  // Create Course
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

  // Get Course
  const getCourse = async (id = 0) => {
    setLoading();
    try {
      const res = await axios.get(`/api/v1/course/${id}`);

      dispatch({
        type: GET_COURSE,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: COURSE_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Update Course
  const updateCourse = async (reqObj) => {
    setLoading();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.put(
        `/api/v1/course/${reqObj.id}`,
        reqObj,
        config
      );

      dispatch({
        type: UPDATE_COURSE,
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

  // Delete Course
  const deleteCourse = async (reqObj) => {
    setLoading();
    try {
      let res;
      res = await axios.delete(`/api/v1/course/${reqObj.id}`, {
        data: { password: reqObj.password },
      });
      dispatch({
        type: DELETE_COURSE,
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

  // Clear Courses
  const clearCourses = () => dispatch({ type: CLEAR_COURSES });

  return (
    <CourseContext.Provider
      value={{
        course: state.course,
        courses: state.courses,
        error: state.error,
        pagination: state.pagination,
        total: state.total,
        clearErrors,
        createCourse,
        getCourses,
        getCourse,
        updateCourse,
        deleteCourse,
        clearCourses,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default SubjectState;
