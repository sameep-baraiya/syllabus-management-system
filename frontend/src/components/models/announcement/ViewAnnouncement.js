import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap';

// Layout
import { iconAnnouncement } from '../../layout/Icon';

const ViewAnnouncement = ({ announcement = null }) => {
  if (!announcement) {
    return null;
  }

  const { title, department, createdAt, updatedAt, msg } = announcement;

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {iconAnnouncement} {title}
        </Card.Title>
        <Card.Subtitle className='mb-2'>
          <Badge variant='success'>{department}</Badge>{' '}
          <Badge variant='primary'>
            {createdAt &&
              `Created At: ${new Date(createdAt).toLocaleString('en-BZ', {
                hour12: true,
              })}`}
          </Badge>{' '}
          <Badge variant='info'>
            {updatedAt &&
              `Updated At: ${new Date(updatedAt).toLocaleString('en-BZ', {
                hour12: true,
              })}`}
          </Badge>
        </Card.Subtitle>
        <Card.Text>{msg}</Card.Text>
      </Card.Body>
    </Card>
  );
};

ViewAnnouncement.propTypes = {
  announcement: PropTypes.object,
};

export default ViewAnnouncement;
