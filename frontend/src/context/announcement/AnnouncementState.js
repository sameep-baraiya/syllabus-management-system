import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import AnnouncementContext from './announcementContext';
import announcementReducer from './announcementReducer';
import { GET_ANNOUNCEMENTS, ANNOUNCEMENTS_ERROR, CLEAR_ERRORS } from '../types';
import LoadingContext from '../loading/loadingContext';

const AnnouncementState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    announcements: null,
    error: null,
  };

  const [state, dispatch] = useReducer(announcementReducer, initialState);

  // Get Announcements
  const getAnnouncements = async () => {
    setLoading();
    try {
      const res = await axios.get(`/api/v1/announcement`);

      dispatch({
        type: GET_ANNOUNCEMENTS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: ANNOUNCEMENTS_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AnnouncementContext.Provider
      value={{
        error: state.error,
        announcements: state.announcements,
        clearErrors,
        getAnnouncements,
      }}
    >
      {props.children}
    </AnnouncementContext.Provider>
  );
};

export default AnnouncementState;
