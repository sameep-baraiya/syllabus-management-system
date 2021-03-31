import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Alert, Button } from 'react-bootstrap';

// User Model Component
import ViewUser from './ViewUser';

// Context
import UserContext from '../../../context/user/userContext';

const DeleteUser = ({ mode, setMode }) => {
  const userContext = useContext(UserContext);

  const { user, deleteUser } = userContext;

  const initReqObj = {
    id: 0,
    password: '',
  };

  const [reqObj, setReqObj] = useState({ ...initReqObj });

  const doOriginal = () => {
    const { id } = user;

    setReqObj({
      id,
      password: '',
      original: { ...user },
    });
    setMode('');
  };

  const onModeChange = () => {
    if (mode === 'original') {
      doOriginal();
    }
  };

  useEffect(() => {
    onModeChange();
    // eslint-disable-next-line
  }, [mode]);

  return (
    <div>
      {reqObj.original ? (
        <div>
          <h3>
            <strong>Delete User</strong>
          </h3>
          <Form.Group controlId='DeleteUser.selectedUser'>
            <Form.Label>Original User</Form.Label>
            <ViewUser user={reqObj.original} />
          </Form.Group>
          <Form.Group controlId='DeleteUser.password'>
            <Form.Label>
              Enter yout password to confirm delete opertion
            </Form.Label>
            <Form.Control
              type='password'
              value={reqObj.password}
              onChange={(e) => {
                setReqObj({
                  ...reqObj,
                  password: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Button
            variant='primary'
            onClick={() => {
              deleteUser(reqObj);
            }}
          >
            Delete User
          </Button>{' '}
          <Button
            variant='secondary'
            onClick={() => {
              setReqObj({ ...initReqObj });
            }}
          >
            Reset
          </Button>
        </div>
      ) : (
        <Alert variant='warning'>
          <h4>
            <strong>Warning</strong>
          </h4>
          Usually users contains important records attached with past activity.
          Possible use case if you have created user by mistake.
        </Alert>
      )}
    </div>
  );
};

DeleteUser.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default DeleteUser;
