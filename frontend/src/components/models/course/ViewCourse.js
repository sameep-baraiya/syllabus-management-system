import React, { Fragment } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { iconCourse } from '../../layout/Icon';
import PropTypes from 'prop-types';

// Utils
import unf from '../../../utils/unf';

const ViewCourse = ({ course = null }) => {
  if (!unf(course)) {
    return null;
  }

  const {
    courseCode,
    courseName,
    courseDescription,
    courseType,
    department,
    noOfSem,
    monthPerSem,
    isOutdated,
    isFreezed,
    createdAt,
    updatedAt,
    crudInfo,
  } = course;

  if (!unf(courseCode) || !unf(courseName)) {
    return null;
  }

  const crudInfoType = (type) => {
    switch (type) {
      case 'COURSE_CREATE':
        return 'Course Created';
      case 'COURSE_UPDATE':
        return 'Course Updated';
      default:
        return 'Unexpected CRUD Operation';
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {iconCourse} {courseName}{' '}
          <Badge className='text-muted'>({courseCode})</Badge>
        </Card.Title>
        <Card.Subtitle className='mb-1'>
          <Badge variant='secondary'>{courseType}</Badge>{' '}
          <Badge variant='success'>{department}</Badge>{' '}
          <Badge variant='primary'>
            {unf(noOfSem) && `No fo Sems: ${noOfSem}`}
          </Badge>{' '}
          <Badge variant='info'>
            {unf(monthPerSem) && `Month per Sem: ${monthPerSem}`}
          </Badge>{' '}
          <Badge variant='danger'>
            {unf(isOutdated) && isOutdated && 'outdated'}
          </Badge>{' '}
          <Badge variant='danger'>
            {unf(isFreezed) && isFreezed && 'freezed'}
          </Badge>
        </Card.Subtitle>
        {unf(createdAt) && (
          <div className='mb-1'>
            <strong>Subject Created At:</strong>{' '}
            {new Date(createdAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(updatedAt) && (
          <div className='mb-1'>
            <strong>Subject Updated At:</strong>{' '}
            {new Date(updatedAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </div>
        )}
        {unf(courseDescription) && (
          <Fragment>
            <div className='mb-1'>
              <strong>Description: </strong>
              <br />
              {courseDescription}
            </div>
          </Fragment>
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

ViewCourse.propTypes = {
  subject: PropTypes.object,
};

export default ViewCourse;
