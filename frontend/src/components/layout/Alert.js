import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { fucIconAlert } from './Icon';
import AlertContext from '../../context/alert/alertContext';

const MainAlert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;

  const visible = {
    visibility: 'visible',
    opacity: '1',
    transition: 'opacity 0.3s linear',
    zIndex: '+10',
  };

  const hidden = {
    visibility: 'hidden',
    opacity: '0',
    transition: 'visibility 0s 0.3s, opacity 0.3s linear',
    zIndex: '-10',
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: '-10',
      }}
    >
      <Alert variant={alert && alert.variant} style={alert ? visible : hidden}>
        {fucIconAlert(alert && alert.variant)} {alert && alert.message}
      </Alert>
    </div>
  );
};

export default MainAlert;
