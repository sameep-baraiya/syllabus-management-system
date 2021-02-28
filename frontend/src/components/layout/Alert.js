import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { fucIconAlert } from './Icon';
import AlertContext from '../../context/alert/alertContext';

const MainAlert = () => {
  const alertContext = useContext(AlertContext);
  const { message, variant, isVisible } = alertContext;

  const visible = {
    visibility: 'visible',
    opacity: '1',
    transition: 'opacity 0.3s linear',
  };

  const hidden = {
    visibility: 'hidden',
    opacity: '0',
    transition: 'visibility 0s 0.3s, opacity 0.3s linear',
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
      }}
    >
      <Alert variant={variant} style={isVisible ? visible : hidden}>
        {fucIconAlert(variant)} {message}
      </Alert>
    </div>
  );
};

export default MainAlert;
