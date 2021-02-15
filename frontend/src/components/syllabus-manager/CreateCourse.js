import React, { Fragment, useState } from 'react';
import { Form, Button, Card, Badge } from 'react-bootstrap';

// TODO CreateCouse with Course Context
const CreateCourse = () => {
  const [reqObj, setReqObj] = useState({
    course: {
      courseCode: '',
      courseDescription: '',
      courseType: '',
      department: '',
      courseLength: 0,
      noOfSemesters: 0,
    },
    subjects: [],
  });
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='smCourseCode'>
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            name='courseCode'
            type='text'
            placeholder='Enter new course code'
          />
        </Form.Group>
        <Form.Group controlId='smCourseDescription'>
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            name='courseDescription'
            as='textarea'
            placeholder='Enter course description (optional)'
            rows={5}
          />
        </Form.Group>
        <Form.Group controlId='smCourseType'>
          <Form.Label>Course Type</Form.Label>
          <Form.Control as='select'>
            <option>None</option>
            <option>B.Tech</option>
            <option>M.Tech</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='smDepartment'>
          <Form.Label>Department</Form.Label>
          <Form.Control as='select'>
            <option>None</option>
            <option>CH - Chemical Engineering</option>
            <option>CI - Civil Engineering</option>
            <option>CE - Computer Engineering</option>
            <option>EC - Electronic Engineering</option>
            <option>ME - Mechanical Engineering</option>
            <option>IT - Information Technology</option>
          </Form.Control>
        </Form.Group>
        <Card bg='light'>
          <Card.Body>
            <Button variant='success'>Add Subject</Button>{' '}
            <Badge variant='primary'>
              No of Subjects: {reqObj.subjects.length}
            </Badge>
          </Card.Body>
        </Card>
        <br />
        <Button variant='primary' type='submit'>
          Submit
        </Button>{' '}
        <Button variant='secondary' type='reset'>
          Clear
        </Button>
      </Form>
    </Fragment>
  );
};

export default CreateCourse;
