import React, { Fragment } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { iconUser } from '../../layout/Icon';
import PropTypes from 'prop-types';

// Utils
import unf from '../../../utils/unf';

const ViewUser = ({ user = null }) => {
  if (!unf(user)) {
    return null;
  }

  const {
    name,
    email,
    contactNumber,
    role,
    department,
    isApproved,
    createdAt,
    updatedAt,
    crudInfo,
  } = user;

  if (!unf(name) || !unf(email)) {
    return null;
  }

  const crudInfoType = (type) => {
    switch (type) {
      case 'USER_CREATE':
        return 'User Created';
      case 'USER_UPDATE':
        return 'User Updated';
      default:
        return 'Unexpected CRUD Operation';
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {iconUser} {name.split('-').join(' ')}
        </Card.Title>
        <Card.Subtitle className='mb-1'>
          <Badge variant='primary'>{email}</Badge>{' '}
          <Badge variant='success'>{department}</Badge>{' '}
          <Badge variant='secondary'>
            {unf(contactNumber) && `Contact Number: ${contactNumber}`}
          </Badge>{' '}
          <Badge variant='info'>{role}</Badge>{' '}
          <Badge variant='dark'>
            {unf(isApproved) && !isApproved && 'Unapproved User'}
          </Badge>
        </Card.Subtitle>
        {unf(createdAt) && (
          <div className='mb-1'>
            <strong>User Created At:</strong>{' '}
            {new Date(createdAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(updatedAt) && (
          <div className='mb-1'>
            <strong>User Updated At:</strong>{' '}
            {new Date(updatedAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(crudInfo) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Last CRUD Opertaion :</strong>
              <br />
              {crudInfoType(crudInfo.type)}
              <span className='text-muted'> - By {crudInfo.by}</span>
            </div>
          </Fragment>
        )}
      </Card.Body>
    </Card>
  );
};

ViewUser.propTypes = {
  user: PropTypes.object,
};

export default ViewUser;
