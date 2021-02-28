import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, RESET_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = {
    message: '',
    variant: 'info',
    isVisible: false,
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
        message: state.message,
        variant: state.variant,
        isVisible: state.isVisible,
        setAlert,
        resetAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
