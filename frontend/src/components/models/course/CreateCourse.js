import React, { Fragment, useState, useContext } from 'react';
import {
  Form,
  Button,
  Card,
  InputGroup,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';

// Context
import CourseContext from '../../../context/course/courseContext';
import ConfigContext from '../../../context/config/configContext';

// Utils
import s2pn from '../../../utils/s2pn';
import {
  departmentTypeOptions,
  courseTypeOptions,
} from '../../../utils/configUtils';

// Layout
import { iconCreate, iconValidate } from '../../layout/Icon';

const CreateCourse = () => {
  const courseContext = useContext(CourseContext);
  const configContext = useContext(ConfigContext);

  const { departmentType, courseType: courseTypeArr } = configContext;
  const { createCourse } = courseContext;

  const [reqObj, setReqObj] = useState({
    courseCode: '',
    courseName: '',
    courseDescription: '',
    courseType: 'None',
    department: 'None',
    noOfSem: 0,
    monthPerSem: 0,
    isOutdated: false,
    isFreezed: false,
  });

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
  } = reqObj;

  const [showNext, setShowNext] = useState(false);

  // Input onChange handler
  const onChange = (e) => {
    setReqObj({ ...reqObj, [e.target.name]: e.target.value });
  };

  // Input-Number onChange handler
  const onChangeNum = (e) => {
    setReqObj({ ...reqObj, [e.target.name]: s2pn(e.target.value) });
  };

  // checkBox onChange handler
  const onChangeCheckBox = (e) => {
    setReqObj({ ...reqObj, [e.target.name]: e.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowNext(true);
  };

  const onClear = (e) => {
    setReqObj({
      courseCode: '',
      courseName: '',
      courseDescription: '',
      courseType: 'None',
      department: 'None',
      noOfSem: 0,
      monthPerSem: 0,
      isOutdated: false,
      isFreezed: false,
    });
  };

  const createCourseUI = () => (
    <Form onSubmit={onSubmit}>
      <h3>
        <strong>{iconCreate} Create Course</strong>
      </h3>
      <Form.Group controlId='CreateCourse.courseCode'>
        <Form.Label>Course Code</Form.Label>
        <InputGroup>
          <Form.Control
            name='courseCode'
            type='text'
            placeholder='Enter new course code'
            onChange={onChange}
            value={courseCode}
          />
          <InputGroup.Append>
            <Button
              variant='secondary'
              onClick={() => {
                const randNum = Math.random();
                const newCourseCode = 'TODO_COURSECODE_' + randNum;
                setReqObj({
                  ...reqObj,
                  courseCode: newCourseCode,
                });
              }}
            >
              Auto Generate
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId='CreateCourse.courseName'>
        <Form.Label>Course Name</Form.Label>
        <Form.Control
          name='courseName'
          type='text'
          placeholder='Enter new course name'
          onChange={onChange}
          value={courseName}
        />
      </Form.Group>
      <Form.Group controlId='CreateCourse.courseDescription'>
        <Form.Label>Course Description</Form.Label>
        <Form.Control
          name='courseDescription'
          as='textarea'
          placeholder='Enter course description (optional)'
          rows={5}
          onChange={onChange}
          value={courseDescription}
        />
      </Form.Group>
      <Form.Group controlId='CreateCourse.courseType'>
        <Form.Label>Course Type</Form.Label>
        <Form.Control
          name='courseType'
          as='select'
          onChange={onChange}
          value={courseType}
        >
          <option>None</option>
          {courseTypeOptions(courseTypeArr)}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='CreateCourse.department'>
        <Form.Label>Department</Form.Label>
        <Form.Control
          name='department'
          as='select'
          onChange={onChange}
          value={department}
        >
          <option>None</option>
          {departmentTypeOptions(departmentType)}
        </Form.Control>
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId='CreateCourse.noOfSem'>
            <Form.Label>Number Of Semesters</Form.Label>
            <Form.Control
              name='noOfSem'
              type='number'
              placeholder='Enter new no of sem'
              value={noOfSem}
              onChange={onChangeNum}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='CreateCourse.monthPerSem'>
            <Form.Label>Months Per Semester</Form.Label>
            <Form.Control
              name='monthPerSem'
              type='number'
              placeholder='Enter new month per sem'
              value={monthPerSem}
              onChange={onChangeNum}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId='CreateCourse.subjectProperty'>
        <Form.Label>Course Property</Form.Label>
        <Card>
          <Card.Body>
            <Form.Check
              name='isOutdated'
              type='checkbox'
              label='Is Outdated ?'
              checked={isOutdated}
              onChange={onChangeCheckBox}
            />
            <Form.Check
              name='isFreezed'
              type='checkbox'
              label='Is Freezed ?'
              checked={isFreezed}
              onChange={onChangeCheckBox}
            />
          </Card.Body>
        </Card>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Review Input
      </Button>{' '}
      <Button variant='secondary' type='reset' onClick={onClear}>
        Clear
      </Button>
    </Form>
  );

  const validateData = () => {
    const alertArray = [];
    if (courseCode === '') {
      alertArray.push(['Course Code should not be Empty', 'danger']);
    } else if (!/^[a-zA-Z0-9-_() .]+$/.test(courseCode)) {
      alertArray.push([
        'Course Code only Alphanumeric and - _ ( ) . Allowed',
        'danger',
      ]);
    }

    if (courseName === '') {
      alertArray.push(['Course Name should not be Empty', 'danger']);
    } else if (!/^[a-zA-Z0-9-_() .]+$/.test(courseName)) {
      alertArray.push([
        'Course Name only Alphanumeric and - _ ( ) . characters Allowed',
        'danger',
      ]);
    }

    if (courseDescription === '') {
      alertArray.push(['Course Description (Optional) is Empty', 'warning']);
    } else if (
      !/^([a-zA-Z0-9 _.\-~!@#$%^&*()_+{}[\]|\\:;"'<,>.?/`\n=]+)$/.test(
        courseDescription
      )
    ) {
      alertArray.push([
        'Course Description only Alphanumeric and _ . - ~ ! @ # $ % ^ & * ( ) _ + { } [ ] | \\ : ; " \' < , > . ? / ` \\n characters Allowed',
        'danger',
      ]);
    }

    if (department === 'None') {
      alertArray.push(['Course Department should not be Empty', 'danger']);
    } else if (department === 'Keep Empty For Now') {
      alertArray.push([
        'Course Department is set to Empty purposefully.',
        'warning',
      ]);
    }

    if (courseType === 'None') {
      alertArray.push(['Course Type should not be Empty', 'danger']);
    } else if (courseType === 'Keep Empty For Now') {
      alertArray.push(['Course Type is set to Empty purposefully.', 'warning']);
    }

    if (isFreezed === true) {
      alertArray.push([
        'Course Freezed will make course editable by Admin only',
        'warning',
      ]);
    }

    let noOfDanger = 0;
    let noOfWarning = 0;
    alertArray.forEach((it) => {
      if (it[1] === 'danger') {
        noOfDanger += 1;
      } else {
        noOfWarning += 1;
      }
    });

    return (
      <div>
        <Button
          className='mb-2'
          variant='info'
          onClick={() => {
            setShowNext(false);
          }}
        >
          Back To Create Course
        </Button>
        <h3>
          <strong>{iconValidate} Validate Input</strong>
        </h3>
        <Row className='mb-2 mt-1'>
          <Col>
            <Alert variant='danger'>Error: {noOfDanger}</Alert>
          </Col>
          <Col>
            <Alert variant='warning'>Warning: {noOfWarning}</Alert>
          </Col>
          {noOfDanger === 0 && (
            <Col>
              <Alert variant='success'>Error Free, Can Create Course</Alert>
            </Col>
          )}
        </Row>
        {alertArray.map((it, index) => (
          <div key={index} className='mb-2'>
            <Alert variant={it[1]}>{it[0]}</Alert>
          </div>
        ))}
        <hr />
        <h4>
          <strong>Course Data</strong>
        </h4>
        {noOfDanger === 0 && (
          <Fragment>
            <Button
              variant='primary'
              onClick={() => {
                console.log(reqObj);
                createCourse(reqObj);
              }}
            >
              Create Course
            </Button>
          </Fragment>
        )}
      </div>
    );
  };

  return <div>{showNext ? validateData() : createCourseUI()}</div>;
};

export default CreateCourse;
