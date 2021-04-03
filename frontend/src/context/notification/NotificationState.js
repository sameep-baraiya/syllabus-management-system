import React, { useReducer, useContext } from 'react';
import NotificationContext from './notificationContext';
import notificationReducer from './notificationReducer';
import {
  INIT_NOTIFICATION,
  INIT_NOTIFICATION_ERROR,
  // SET_NOTIFICATION,
  RECONNECT_NOTIFICATION,
  RECONNECT_ERROR,
  CREATE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  CLEAR_ERRORS,
} from '../types';
import LoadingContext from '../loading/loadingContext';

const NotificationState = (props) => {
  const loadingContext = useContext(LoadingContext);
  const { setLoading, resetLoading } = loadingContext;

  const initialState = {
    tray: null,
    socket: null,
    response: null,
    error: null,
  };

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Init Notification
  const initNotification = async (id = 0) => {
    setLoading();
    try {
      dispatch({
        type: INIT_NOTIFICATION,
        payload: id,
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

  // Reconnect Notification
  const reconnectNotification = async () => {
    setLoading();
    try {
      dispatch({
        type: RECONNECT_NOTIFICATION,
      });
    } catch (err) {
      dispatch({
        type: RECONNECT_ERROR,
        payload: err.response,
      });
    } finally {
      resetLoading();
    }
  };

  // Create Notification
  const createNotification = async (msg = '', type = 'info') => {
    dispatch({
      type: CREATE_NOTIFICATION,
      payload: { msg, type },
    });
  };

  // Clear Notifications
  const clearNotifications = async () => {
    dispatch({
      type: CLEAR_NOTIFICATIONS,
    });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <NotificationContext.Provider
      value={{
        socket: state.socket,
        tray: state.tray,
        response: state.response,
        error: state.error,
        clearErrors,
        initNotification,
        reconnectNotification,
        createNotification,
        clearNotifications,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
