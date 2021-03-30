import React, { useState, useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Card,
  Alert,
} from 'react-bootstrap';

// Context
import CourseContext from '../../../context/course/courseContext';
import ConfigContext from '../../../context/config/configContext';

// Layout
import { iconEdit, iconValidate, iconCopy } from '../../layout/Icon';

// Utils
import s2pn from '../../../utils/s2pn';
import {
  departmentTypeOptions,
  courseTypeOptions,
} from '../../../utils/configUtils';

const EditCourse = ({ mode, setMode }) => {
  const courseContext = useContext(CourseContext);
  const { course, updateCourse } = courseContext;

  const configContext = useContext(ConfigContext);
  const { departmentType, courseType: courseTypeArr } = configContext;

  const initialReqObj = {
    id: null,
    courseCode: '',
    courseName: '',
    courseDescription: '',
    courseType: 'None',
    department: 'None',
    noOfSem: 0,
    monthPerSem: 0,
    isOutdated: false,
    isFreezed: false,
  };

  const initialUpdateObj = {
    courseCode: true,
    courseName: true,
    courseDescription: true,
    courseType: true,
    department: true,
    noOfSem: true,
    monthPerSem: true,
    isOutdated: true,
    isFreezed: true,
  };

  const [uObj, setUObj] = useState({ ...initialUpdateObj });

  const uObjChange = (e) => {
    setUObj({
      ...uObj,
      [e.target.name]: !uObj[e.target.name],
    });
  };

  const keepOG = (name) => (
    <div className='mt-1'>
      <Form.Check
        name={name}
        type='checkbox'
        checked={uObj[name]}
        label='Keep Original ?'
        onChange={uObjChange}
      />
    </div>
  );

  const [reqObj, setReqObj] = useState({ ...initialReqObj });
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

  const uObjCopy = (name) => {
    setReqObj({
      ...reqObj,
      [name]: reqObj.original[name] ? reqObj.original[name] : reqObj[name],
    });
  };

  const copySpan = (name) => (
    <span
      name={name}
      className='ml-1 mr-1 text-muted'
      onClick={() => {
        uObjCopy(name);
      }}
      style={{ cursor: 'pointer' }}
    >
      {iconCopy}
    </span>
  );

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

  // For Clearing all input
  const clearData = (e) => {
    setReqObj({ ...initialReqObj });
  };

  const [showNext, setShowNext] = useState(false);

  // Fires Create Query
  const onSubmit = (e) => {
    e.preventDefault(e);
    setShowNext(true);
  };

  const doOriginal = () => {
    const {
      courseName,
      courseDescription,
      courseType,
      department,
      noOfSem,
      monthPerSem,
      isOutdated,
      isFreezed,
    } = course;

    const original = { ...course };

    setReqObj({
      courseCode: '',
      department: department !== null ? department : 'None',
      courseName: courseName !== null ? courseName : '',
      courseType: courseType !== null ? courseType : 'None',
      courseDescription: courseDescription !== null ? courseDescription : '',
      noOfSem: noOfSem !== null ? noOfSem : 0,
      monthPerSem: monthPerSem !== null ? monthPerSem : 0,
      isOutdated: isOutdated !== null ? isOutdated : false,
      isFreezed: isFreezed !== null ? isFreezed : false,
      original,
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

  const uiCourseCode = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Course Code</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Course Code:{' '}
                {reqObj.original.courseCode && reqObj.original.courseCode}
                {copySpan('courseCode')}
              </div>
              {keepOG('courseCode')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditCourse.courseCode'>
            <InputGroup>
              <Form.Control
                name='courseCode'
                type='text'
                placeholder='Enter new course code'
                onChange={onChange}
                value={courseCode}
                disabled={uObj.courseCode}
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
                  disabled={uObj.courseCode}
                >
                  Auto Generate
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiCourseName = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Course Name</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Course Name:{' '}
                {reqObj.original.courseName && reqObj.original.courseName}
                {copySpan('courseName')}
              </div>
              {keepOG('courseName')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditCourse.courseName'>
            <Form.Control
              name='courseName'
              type='text'
              placeholder='Enter new course name'
              onChange={onChange}
              value={courseName}
              disabled={uObj.courseName}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiCourseDescription = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Course Description</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Course Description:{' '}
                {reqObj.original.courseDescription &&
                  reqObj.original.courseDescription}
                {copySpan('courseDescription')}
              </div>
              {keepOG('courseDescription')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditCourse.courseDescription'>
            <Form.Control
              name='courseDescription'
              as='textarea'
              placeholder='Enter course description (optional)'
              rows={5}
              onChange={onChange}
              value={courseDescription}
              disabled={uObj.courseDescription}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiCourseDepartment = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Course Department</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Course Department:{' '}
                {reqObj.original.department && reqObj.original.department}
                {copySpan('department')}
              </div>
              {keepOG('department')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditCourse.department'>
            <Form.Control
              name='department'
              as='select'
              onChange={onChange}
              value={department}
              disabled={uObj.department}
            >
              <option>None</option>
              {departmentTypeOptions(departmentType)}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiCourseType = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Course Type</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Course Type:{' '}
                {reqObj.original.courseType && reqObj.original.courseType}
                {copySpan('courseType')}
              </div>
              {keepOG('courseType')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditCourse.courseType'>
            <Form.Control
              name='courseType'
              as='select'
              onChange={onChange}
              value={courseType}
              disabled={uObj.courseType}
            >
              <option>None</option>
              {courseTypeOptions(courseTypeArr)}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiCourseProperty = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Course Property</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Is Outdated: {reqObj.original.isOutdated ? 'Yes' : 'No'}
                {keepOG('isOutdated')}
                <br />
                Is Freezed: {reqObj.original.isFreezed ? 'Yes' : 'No'}
                {keepOG('isFreezed')}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditCourse.courseProperty'>
            <Card>
              <Card.Body>
                <Form.Check
                  name='isOutdated'
                  type='checkbox'
                  label='Is Outdated ?'
                  checked={isOutdated}
                  onChange={onChangeCheckBox}
                  disabled={uObj.isOutdated}
                />
                <Form.Check
                  name='isFreezed'
                  type='checkbox'
                  label='Is Freezed ?'
                  checked={isFreezed}
                  onChange={onChangeCheckBox}
                  disabled={uObj.isFreezed}
                />
              </Card.Body>
            </Card>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiCourseNoOfSem = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Number Of Semesters In Course</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Semester Number:{' '}
                {reqObj.original.noOfSem && reqObj.original.noOfSem}
                {copySpan('noOfSem')}
              </div>
              {keepOG('noOfSem')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditCourse.noOfSem'>
            <Form.Control
              name='noOfSem'
              type='number'
              placeholder='Enter new no of sem'
              value={noOfSem}
              onChange={onChangeNum}
              disabled={uObj.noOfSem}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiCourseListIndex = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Months Per Semester In Course</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Months Per Semester:{' '}
                {reqObj.original.monthPerSem && reqObj.original.monthPerSem}
                {copySpan('monthPerSem')}
              </div>
              {keepOG('monthPerSem')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditCourse.monthPerSem'>
            <Form.Control
              name='monthPerSem'
              type='number'
              placeholder='Enter new month per sem'
              value={monthPerSem}
              onChange={onChangeNum}
              disabled={uObj.monthPerSem}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiForm = () => {
    return reqObj.original ? (
      <Form onSubmit={onSubmit}>
        <h3>
          <strong>{iconEdit} Edit Course</strong>
        </h3>
        <Row>
          <Col lg={3}>
            <h4 className='text-muted'>Original Course</h4>
          </Col>
          <Col lg={9}>
            <h4 className='text-muted'>Edited Course</h4>
          </Col>
        </Row>
        {uiCourseCode()}
        {uiCourseName()}
        {uiCourseDescription()}
        {uiCourseDepartment()}
        {uiCourseType()}
        {uiCourseProperty()}
        {uiCourseNoOfSem()}
        {uiCourseListIndex()}
        <div className='mt-3'>
          <Button variant='primary' type='submit'>
            Review Input
          </Button>{' '}
          <Button variant='secondary' type='reset' onClick={clearData}>
            Clear
          </Button>
        </div>
      </Form>
    ) : (
      <Fragment>
        <Alert variant='info'>
          Set Original Course First to proceed forward
        </Alert>
      </Fragment>
    );
  };

  const validateData = () => {
    const alertArray = [];
    if (uObj.courseCode === false) {
      if (courseCode === '') {
        alertArray.push(['Course Code should not be Empty', 'danger']);
      } else if (!/^[a-zA-Z0-9-_() .]+$/.test(courseCode)) {
        alertArray.push([
          'Course Code only Alphanumeric and - _ ( ) . Allowed',
          'danger',
        ]);
      }
    }

    if (uObj.courseName === false) {
      if (courseName === '') {
        alertArray.push(['Course Name should not be Empty', 'danger']);
      } else if (!/^[a-zA-Z0-9-_() .]+$/.test(courseName)) {
        alertArray.push([
          'Course Name only Alphanumeric and - _ ( ) . characters Allowed',
          'danger',
        ]);
      }
    }

    if (uObj.courseDescription === false) {
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
    }

    if (uObj.department === false) {
      if (department === 'None') {
        alertArray.push(['Course Department should not be Empty', 'danger']);
      } else if (department === 'Keep Empty For Now') {
        alertArray.push([
          'Course Department is set to Empty purposefully.',
          'warning',
        ]);
      }
    }

    if (uObj.courseType === false) {
      if (courseType === 'None') {
        alertArray.push(['Course Type should not be Empty', 'danger']);
      } else if (courseType === 'Keep Empty For Now') {
        alertArray.push([
          'Course Type is set to Empty purposefully.',
          'warning',
        ]);
      }
    }

    if (uObj.isFreezed === false) {
      if (isFreezed === true) {
        alertArray.push([
          'Course Freezed will make course editable by Admin only',
          'warning',
        ]);
      }
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
      <Fragment>
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
              <Alert variant='success'>Error Free, Can Edit Course</Alert>
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
                const { ...rest } = reqObj;
                Object.keys(reqObj.original).forEach((key, index) => {
                  if (uObj[key] === true) {
                    delete rest[key];
                  }
                });

                // Seting id
                rest.id = rest.original.id;

                // Original Case
                delete rest.original;

                updateCourse(rest);
              }}
            >
              Edit Course
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  };

  return (
    <div>
      {showNext ? (
        <div>
          <Button
            className='mb-2'
            variant='info'
            onClick={() => {
              setShowNext(false);
            }}
          >
            Back To Edit Course
          </Button>
          {validateData()}
        </div>
      ) : (
        uiForm()
      )}
    </div>
  );
};

EditCourse.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default EditCourse;
