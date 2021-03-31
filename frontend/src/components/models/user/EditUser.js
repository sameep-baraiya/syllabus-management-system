import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Alert, Button } from 'react-bootstrap';

// User Model Component
import ViewUser from './ViewUser';

// Context
import UserContext from '../../../context/user/userContext';
import ConfigContext from '../../../context/config/configContext';

// Utils
import { departmentTypeOptions } from '../../../utils/configUtils';

// Layout
import { iconEdit } from '../../layout/Icon';

const EditUser = ({ mode, setMode }) => {
  const userContext = useContext(UserContext);
  const configContext = useContext(ConfigContext);

  const { user, updateUser } = userContext;
  const { departmentType } = configContext;

  const initReqObj = {
    id: 0,
    role: 'faculty-member',
    department: 'None',
  };

  const [reqObj, setReqObj] = useState({ ...initReqObj });

  const doOriginal = () => {
    const { id, role, department } = user;

    setReqObj({
      id,
      role,
      department,
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
            <strong>{iconEdit} Edit User</strong>
          </h3>
          <Form.Group controlId='EditUser.selectedUser'>
            <Form.Label>Original User</Form.Label>
            <ViewUser user={reqObj.original} />
          </Form.Group>
          <Form.Group controlId='EditUser.role'>
            <Form.Label>Role</Form.Label>
            <div className='mb-2'>
              <Form.Check
                inline
                label='Faculty Member'
                type='radio'
                name='role'
                onChange={() => {
                  setReqObj({
                    ...reqObj,
                    role: 'faculty-member',
                  });
                }}
                checked={reqObj.role === 'faculty-member'}
              />
              <Form.Check
                inline
                label='Syllabus Manager'
                type='radio'
                name='role'
                onChange={() => {
                  setReqObj({
                    ...reqObj,
                    role: 'syllabus-manager',
                  });
                }}
                checked={reqObj.role === 'syllabus-manager'}
              />
              <Form.Check
                inline
                label='Admin'
                type='radio'
                name='role'
                onChange={() => {
                  setReqObj({
                    ...reqObj,
                    role: 'admin',
                  });
                }}
                checked={reqObj.role === 'admin'}
              />
            </div>
          </Form.Group>
          <Form.Group controlId='EditUser.department'>
            <Form.Label>Department</Form.Label>
            <Form.Control
              as='select'
              onChange={(e) => {
                setReqObj({
                  ...reqObj,
                  department: e.target.value,
                });
              }}
              name='department'
              value={reqObj.department}
            >
              <option>None</option>
              {departmentTypeOptions(departmentType)}
            </Form.Control>
          </Form.Group>
          <Button
            variant='primary'
            onClick={() => {
              updateUser(reqObj);
            }}
          >
            Submit
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
        <Alert variant='info'>Set Original User First to proceed forward</Alert>
      )}
    </div>
  );
};

EditUser.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default EditUser;
