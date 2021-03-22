import React, { useReducer, useContext } from 'react';
import NotificationContext from './notificationContext';
import notificationReducer from './notificationReducer';
import {
  INIT_NOTIFICATION,
  INIT_NOTIFICATION_ERROR,
  // SET_NOTIFICATION,
  CLEAR_ERRORS,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const SubjectState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    socket: null,
    response: null,
    error: null,
  };

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Init Notification
  const initNotification = async (reqObj) => {
    setLoading();
    try {
      dispatch({
        type: INIT_NOTIFICATION,
      });
    } catch (err) {
      dispatch({
        type: INIT_NOTIFICATION_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <NotificationContext.Provider
      value={{
        socket: state.socket,
        response: state.response,
        error: state.error,
        clearErrors,
        initNotification,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default SubjectState;
