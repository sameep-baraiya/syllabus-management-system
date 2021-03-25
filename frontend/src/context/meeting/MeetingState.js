import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import MeetingContext from './meetingContext';
import meetingReducer from './meetingReducer';
import {
  CREATE_MEETING,
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
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export default MeetingState;
