import React, { useContext, useState, useEffect } from 'react';
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
  };

  const hidden = {
    visibility: 'hidden',
    opacity: '0',
    transition: 'visibility 0s 0.3s, opacity 0.3s linear',
  };

  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (alert) {
      setVariant(alert.variant);
      setMessage(alert.message);
    }
  }, [alert]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: alert ? '+10' : '-10',
      }}
    >
      <Alert variant={variant} style={alert ? visible : hidden}>
        {fucIconAlert(variant)} {message}
      </Alert>
    </div>
  );
};

export default MainAlert;
