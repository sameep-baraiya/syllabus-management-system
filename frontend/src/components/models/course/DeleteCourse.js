import React, { useEffect, useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Context
import CourseContext from '../../../context/course/courseContext';
import { Fragment } from 'react';

const DeleteCourse = ({ mode, setMode }) => {
  const courseContext = useContext(CourseContext);
  const { course, deleteCourse } = courseContext;

  const [reqObj, setReqObj] = useState({
    id: 0,
    courseCode: '',
    courseName: '',
  });

  const [password, setPassowrd] = useState('');

  const doDelete = () => {
    setReqObj({
      id: course.id,
      courseCode: course.courseCode,
      courseName: course.courseName,
    });
    setMode('');
  };

  const onModeChange = () => {
    if (mode === 'delete') {
      doDelete();
    }
  };

  useEffect(() => {
    onModeChange();
    // eslint-disable-next-line
  }, [mode]);

  const onSubmit = (e) => {
    e.preventDefault();
    deleteCourse({
      id: reqObj.id,
      password: password,
    });
  };

  const onClear = (e) => {
    setPassowrd('');
    setReqObj({
      id: 0,
      courseCode: '',
      courseName: '',
    });
  };

  return (
    <div>
      {reqObj.id !== 0 ? (
        <Fragment>
          <Alert variant='info'>
            <h4>
              <strong>Course Details:</strong>
            </h4>
            <strong>Course Code:</strong> {reqObj.courseCode}
            <br />
            <strong>Course Name:</strong> {reqObj.courseName}
          </Alert>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='DeleteCourse.password'>
              <Form.Label>
                Enter you password then press submit to delete course
              </Form.Label>
              <Form.Control
                type='password'
                value={password}
                placeholder='Enter password here'
                onChange={(e) => {
                  setPassowrd(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>{' '}
            <Button variant='secondary' type='reset' onClick={onClear}>
              Clear
            </Button>
          </Form>
        </Fragment>
      ) : (
        <Alert variant='warning'>
          <h4>
            <strong>Warning</strong>
          </h4>
          Usually courses are deprecated (by setting “is obsolete field” to
          true) because it contains important records attached with past
          academic batches. Possible use case if you have inserted course by
          mistake.
        </Alert>
      )}
    </div>
  );
};

DeleteCourse.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default DeleteCourse;
