import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import AnnouncementContext from './announcementContext';
import announcementReducer from './announcementReducer';
import {
  GET_ANNOUNCEMENTS,
  CREATE_ANNOUNCEMENT,
  CREATE_ERROR,
  ANNOUNCEMENTS_ERROR,
  CLEAR_ERRORS,
  GET_ANNOUNCEMENT,
  ANNOUNCEMENT_ERROR,
  UPDATE_ANNOUNCEMENT,
  UPDATE_ERROR,
  DELETE_ANNOUNCEMENT,
  DELETE_ERROR,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const AnnouncementState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    announcements: null,
    announcement: null,
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

  // Create Announcement
  const createAnnouncement = async (reqObj) => {
    setLoading();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(`/api/v1/announcement`, reqObj, config);

      dispatch({
        type: CREATE_ANNOUNCEMENT,
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

  // Get Announcement
  const getAnnouncement = async (id) => {
    setLoading();
    try {
      const res = await axios.get(`/api/v1/announcement/${id}`);

      dispatch({
        type: GET_ANNOUNCEMENT,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: ANNOUNCEMENT_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Update Announcement
  const updateAnnouncement = async (reqObj) => {
    setLoading();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(
        `/api/v1/announcement/${reqObj.id}`,
        reqObj,
        config
      );

      dispatch({
        type: UPDATE_ANNOUNCEMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Delete Announcement
  const deleteAnnouncement = async (reqObj) => {
    setLoading();
    try {
      let res;
      res = await axios.delete(`/api/v1/announcement/${reqObj.id}`, {
        data: { password: reqObj.password },
      });
      dispatch({
        type: DELETE_ANNOUNCEMENT,
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

  return (
    <AnnouncementContext.Provider
      value={{
        error: state.error,
        announcements: state.announcements,
        announcement: state.announcement,
        clearErrors,
        getAnnouncements,
        createAnnouncement,
        getAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
      }}
    >
      {props.children}
    </AnnouncementContext.Provider>
  );
};

export default AnnouncementState;
