import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import MeetingContext from './meetingContext';
import meetingReducer from './meetingReducer';
import {
  CREATE_MEETING,
  GET_MEETINGS,
  MEETINGS_ERROR,
  CLEAR_ERRORS,
  CREATE_ERROR,
  CLEAR_MEETINGS,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const MeetingState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    meeting: null,
    meetings: null,
    pagination: null,
    total: 0,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(meetingReducer, initialState);

  // Get Meetings
  const getMeetings = async (query = null) => {
    setLoading();
    try {
      let res;
      if (query == null) {
        res = await axios.get('/api/v1/meeting');
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

        res = await axios.get('/api/v1/meeting' + searchQuery);
      }

      dispatch({
        type: GET_MEETINGS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: MEETINGS_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Create Meeting
  const createMeeting = async (reqObj) => {
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
      const res = await axios.post('/api/v1/meeting', formData, config);

      dispatch({
        type: CREATE_MEETING,
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

  // Clear Meetings
  const clearMeetings = () => dispatch({ type: CLEAR_MEETINGS });

  return (
    <MeetingContext.Provider
      value={{
        meeting: state.meeting,
        meetings: state.meetings,
        error: state.error,
        pagination: state.pagination,
        total: state.total,
        clearErrors,
        createMeeting,
        clearMeetings,
        getMeetings,
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export default MeetingState;
