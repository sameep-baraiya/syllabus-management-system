import React, { Fragment } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { iconCourse } from '../layout/Icon';

const CourseCardView = (course, index) => {
  const {
    courseCode,
    courseDescription,
    department,
    courseType,
    courseLength,
    noOfSemesters,
    updateNo,
    isOutdated,
    createdAt,
    updatedAt,
    successorId,
    predecessorId,
  } = course;
  return (
    <Fragment key={index}>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>
            {iconCourse} {courseCode}
          </Card.Title>
          <Card.Subtitle>
            <Badge variant='primary'>{courseType}</Badge>{' '}
            <Badge variant='success'>{department}</Badge>{' '}
            <Badge variant='warning'>
              {courseLength !== undefined
                ? `Course Length: ${courseLength}`
                : null}
            </Badge>{' '}
            <Badge variant='secondary'>
              {noOfSemesters !== undefined
                ? `No Of Semesters: ${noOfSemesters}`
                : null}
            </Badge>{' '}
            <Badge variant='info'>
              {updateNo !== undefined ? `Version: ${updateNo}` : null}
            </Badge>{' '}
            <Badge variant='danger'>{isOutdated ? 'outdated' : null}</Badge>
          </Card.Subtitle>
          {createdAt && (
            <Fragment>
              <br />
              <strong>Course Created At:</strong>{' '}
              {new Date(createdAt).toLocaleString('en-BZ', {
                hour12: true,
              })}
            </Fragment>
          )}
          {updatedAt && (
            <Fragment>
              <br />
              <strong>Course Updated At:</strong>{' '}
              {new Date(updatedAt).toLocaleString('en-BZ', {
                hour12: true,
              })}
            </Fragment>
          )}
          {successorId && (
            <Fragment>
              <br />
              <strong>Successor Id:</strong> {successorId}
            </Fragment>
          )}
          {predecessorId && (
            <Fragment>
              <br />
              <strong>Predecessor Id:</strong> {predecessorId}
            </Fragment>
          )}
          {courseDescription && (
            <Fragment>
              <br />
              <strong>Description: </strong>
              <br />
              {courseDescription}
            </Fragment>
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default CourseCardView;
