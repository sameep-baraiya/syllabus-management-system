import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, RESET_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (message, variant) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        message,
        variant,
      },
    });
    setTimeout(() => {
      resetAlert();
    }, 2000);
  };

  // Reset Alert
  const resetAlert = () => dispatch({ type: RESET_ALERT });

  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        setAlert,
        resetAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
