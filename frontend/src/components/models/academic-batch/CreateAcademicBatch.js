import React, { Fragment, useState, useContext, useEffect } from 'react';
import {
  Form,
  Button,
  Card,
  InputGroup,
  Row,
  Col,
  Alert,
  Table,
} from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import PropTypes from 'prop-types';

// Course Components
import FindCourse from '../course/FindCourse';
import ViewCourse from '../course/ViewCourse';

// Seubject Components
import FindSubject from '../subject/FindSubject';

// Context
import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';
import SubjectContext from '../../../context/subject/subjectContext';
import CourseContext from '../../../context/course/courseContext';

// Layout
import { iconCreate, iconValidate } from '../../layout/Icon';

const CreateAcademicBatch = ({ mode, setMode }) => {
  const academicBatchContext = useContext(AcademicBatchContext);
  const { createAcademicBatch, academicBatch } = academicBatchContext;

  const cubjectContext = useContext(CourseContext);
  const { courses, getCourse, course } = cubjectContext;

  const subjectContext = useContext(SubjectContext);
  const { subjects } = subjectContext;

  const initialReqObj = {
    academicBatchCode: '',
    academicBatchDescription: '',
    academicBatchName: '',
    startYear: '',
    endYear: '',
    courseObj: null,
    subjectsArr: [],
    isFreezed: false,
  };

  const [reqObj, setReqObj] = useState({ ...initialReqObj });

  const {
    academicBatchCode,
    academicBatchDescription,
    academicBatchName,
    startYear,
    endYear,
    courseObj,
    subjectsArr,
    isFreezed,
  } = reqObj;

  const [showNext, setShowNext] = useState(false);

  // Input onChange handler
  const onChange = (e) => {
    setReqObj({ ...reqObj, [e.target.name]: e.target.value });
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
    setReqObj(initialReqObj);
  };

  const doClone = () => {
    const {
      academicBatchDescription,
      academicBatchName,
      startYear,
      endYear,
      isFreezed,
    } = academicBatch;

    setReqObj({
      academicBatchCode: '',
      academicBatchName: academicBatchName !== null ? academicBatchName : '',
      academicBatchDescription:
        academicBatchDescription !== null ? academicBatchDescription : '',
      startYear: startYear !== null ? startYear : '',
      endYear: endYear !== null ? endYear : '',
      isFreezed: isFreezed !== null ? isFreezed : false,
    });
    setMode('');
  };

  const onModeChange = () => {
    if (mode === 'clone') {
      doClone();
    }
  };

  useEffect(() => {
    onModeChange();
    // eslint-disable-next-line
  }, [mode]);

  const [isSelected, setIsSelected] = useState(false);

  const onSelectClick = (id) => {
    setIsSelected(true);
    getCourse(id);
  };

  const onCourseSelectClick = () => {
    setReqObj({
      ...reqObj,
      courseObj: { ...course },
    });
    setIsSelected(false);
  };

  const selectionList = () => {
    return (
      <div>
        <FindCourse defaultSelect='id,courseCode,courseName' />
        {courses &&
          courses.map((it, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(it.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {it.courseCode}: {it.courseName}
            </div>
          ))}
      </div>
    );
  };

  const createAcademicBatchUI = () => (
    <div>
      <Form>
        <h3>
          <strong>{iconCreate} Create Academic Batch</strong>
        </h3>
        <Form.Group controlId='AcademicBatch.academicBatchCode'>
          <Form.Label>Academic Batch Code</Form.Label>
          <InputGroup>
            <Form.Control
              name='academicBatchCode'
              type='text'
              placeholder='Enter new academic batch code'
              onChange={onChange}
              value={academicBatchCode}
            />
            <InputGroup.Append>
              <Button
                variant='secondary'
                onClick={() => {
                  const randNum = Math.random();
                  const newAcademicBatchCode =
                    'TODO_ACADEMICBATCHCODE_' + randNum;
                  setReqObj({
                    ...reqObj,
                    academicBatchCode: newAcademicBatchCode,
                  });
                }}
              >
                Auto Generate
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId='AcademicBatch.academicBatchName'>
          <Form.Label>Academic Batch Name</Form.Label>
          <Form.Control
            name='academicBatchName'
            type='text'
            placeholder='Enter new academic batch name'
            onChange={onChange}
            value={academicBatchName}
          />
        </Form.Group>
        <Form.Group controlId='AcademicBatch.academicBatchDescription'>
          <Form.Label>Academic Batch Description</Form.Label>
          <Form.Control
            name='academicBatchDescription'
            as='textarea'
            placeholder='Enter academic batch description (optional)'
            rows={5}
            onChange={onChange}
            value={academicBatchDescription}
          />
        </Form.Group>
        <Form.Group controlId='AcademicBatch.academicBatchProperty'>
          <Form.Label>Academic Batch Property</Form.Label>
          <Card>
            <Card.Body>
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
        <Form.Group controlId='AcademicBatch.year'>
          <Row>
            <Col>
              <Form.Label>Start Year</Form.Label>
              <div>
                <DatePicker
                  selected={
                    startYear === ''
                      ? null
                      : new Date(parseInt(startYear) + 1, 0, 0)
                  }
                  onChange={(date) => {
                    if (date !== null) {
                      setReqObj({
                        ...reqObj,
                        startYear: `${date.getFullYear()}`,
                      });
                    }
                  }}
                  showYearPicker
                  dateFormat='yyyy'
                  className='form-control'
                />
              </div>
            </Col>
            <Col>
              <Form.Label>End Year</Form.Label>
              <div>
                <DatePicker
                  selected={
                    endYear === ''
                      ? null
                      : new Date(parseInt(endYear) + 1, 0, 0)
                  }
                  onChange={(date) => {
                    if (date !== null) {
                      setReqObj({
                        ...reqObj,
                        endYear: `${date.getFullYear()}`,
                      });
                    }
                  }}
                  showYearPicker
                  dateFormat='yyyy'
                  className='form-control'
                />
              </div>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Form.Group controlId='AcademicBatch.course'>
        <Form.Label>Select Course</Form.Label>
        {courseObj !== null ? (
          <Alert variant='info'>
            <strong>Selected Course : </strong>
            <br />
            {courseObj.courseCode}: {courseObj.courseName} [
            {courseObj.department}, {courseObj.courseType}]
            <Button
              variant='warning'
              size='sm'
              className='mb-1 mt-1'
              onClick={() => {
                setReqObj({
                  ...reqObj,
                  courseObj: null,
                });
              }}
            >
              Change Course
            </Button>
          </Alert>
        ) : (
          <Card>
            <Card.Body>
              {isSelected ? (
                <div>
                  <ViewCourse course={course} />
                  <br />
                  <Button variant='success' onClick={onCourseSelectClick}>
                    Select
                  </Button>{' '}
                  <Button
                    variant='secondary'
                    onClick={() => {
                      setIsSelected(false);
                    }}
                  >
                    Back To Search
                  </Button>
                </div>
              ) : (
                selectionList()
              )}
            </Card.Body>
          </Card>
        )}
      </Form.Group>
      <Form.Group controlId='AcademicBatch.subjects'>
        <Form.Label>Select Subjects</Form.Label>
        <Card>
          <Card.Body>
            <FindSubject defaultSelect='id,subjectCode,subjectName,subjectShort,listIndex,semNo' />
            {subjects &&
              subjects.map((sub, index) => (
                <div
                  key={index}
                  className='p-3 mb-2 bg-dark text-white'
                  onClick={() => {
                    const newSubjectArr = subjectsArr;
                    if (
                      newSubjectArr
                        .map((obj) => {
                          return obj.id;
                        })
                        .indexOf(sub.id) === -1
                    ) {
                      newSubjectArr.push({
                        id: sub.id,
                        subjectCode: sub.subjectCode,
                        subjectName: sub.subjectName,
                        subjectShort: sub.subjectShort,
                        semNo: sub.semNo,
                        listIndex: sub.listIndex,
                      });
                    }

                    setReqObj({
                      ...reqObj,
                      subjectsArr: newSubjectArr,
                    });
                  }}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                    Select
                  </span>
                  {sub.subjectCode}: {sub.subjectName} ({sub.subjectShort})
                  [Sem: {sub.semNo}, Index: {sub.listIndex}]
                </div>
              ))}
            <hr />

            <strong>Linked Subjects</strong>
            <div className='float-right mb-2'>
              <Button
                size='sm'
                variant='warning'
                onClick={() => {
                  const newSubjectArr = subjectsArr;
                  newSubjectArr.sort((a, b) => {
                    if (a.semNo === b.semNo) {
                      return a.listIndex - b.listIndex;
                    } else {
                      return a.semNo - b.semNo;
                    }
                  });
                  setReqObj({
                    ...reqObj,
                    subjectsArr: newSubjectArr,
                  });
                }}
              >
                Sort Subjects
              </Button>
            </div>
            <Table bordered striped>
              <thead>
                <tr className='table-secondary'>
                  <th width='2%'>#</th>
                  <th width='20%'>Subject Code</th>
                  <th width='45%'>Subject Name</th>
                  <th width='15%'>Subject Short</th>
                  <th width='6%'>Sem No</th>
                  <th width='6%'>List Index</th>
                  <th width='6%'>Remove</th>
                </tr>
              </thead>
              <tbody>
                {subjectsArr.map((sub, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sub.subjectCode}</td>
                    <td>{sub.subjectName}</td>
                    <td>{sub.subjectShort}</td>
                    <td>{sub.semNo}</td>
                    <td>{sub.listIndex}</td>
                    <td>
                      <Button
                        size='sm'
                        variant='danger'
                        block
                        onClick={() => {
                          const newSubjectArr = subjectsArr;
                          newSubjectArr.splice(index, 1);
                          setReqObj({
                            ...reqObj,
                            subjectsArr: newSubjectArr,
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Form.Group>
      <Button variant='primary' onClick={onSubmit}>
        Review Input
      </Button>{' '}
      <Button variant='secondary' onClick={onClear}>
        Clear
      </Button>
    </div>
  );

  const validateData = () => {
    const alertArray = [];
    if (academicBatchCode === '') {
      alertArray.push(['Academic Batch Code should not be Empty', 'danger']);
    } else if (!/^[a-zA-Z0-9-_() .]+$/.test(academicBatchCode)) {
      alertArray.push([
        'Academic Batch Code only Alphanumeric and - _ ( ) . Allowed',
        'danger',
      ]);
    }

    if (academicBatchName === '') {
      alertArray.push(['Academic Batch Name should not be Empty', 'danger']);
    } else if (!/^[a-zA-Z0-9-_() .]+$/.test(academicBatchName)) {
      alertArray.push([
        'Academic Batch Name only Alphanumeric and - _ ( ) . characters Allowed',
        'danger',
      ]);
    }

    if (academicBatchDescription === '') {
      alertArray.push([
        'Academic Batch Description (Optional) is Empty',
        'warning',
      ]);
    } else if (
      !/^([a-zA-Z0-9 _.\-~!@#$%^&*()_+{}[\]|\\:;"'<,>.?/`\n=]+)$/.test(
        academicBatchDescription
      )
    ) {
      alertArray.push([
        'Academic Batch Description only Alphanumeric and _ . - ~ ! @ # $ % ^ & * ( ) _ + { } [ ] | \\ : ; " \' < , > . ? / ` \\n characters Allowed',
        'danger',
      ]);
    }

    if (startYear.length !== 4 && isNaN(parseInt(startYear))) {
      alertArray.push(['Start Year must be in appropriate', 'danger']);
    }

    if (endYear.length !== 4 && isNaN(parseInt(endYear))) {
      alertArray.push(['End Year must be in appropriate', 'danger']);
    }

    if (!courseObj) {
      alertArray.push(['Course is not selected', 'warning']);
    }

    if (subjectsArr.length === 0) {
      alertArray.push(['0 Subject are selected', 'warning']);
    }

    if (isFreezed === true) {
      alertArray.push([
        'Academic Batch Freezed will make course editable by Admin only',
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
          Back To Create Academic Batch
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
              <Alert variant='success'>
                Error Free, Can Create Academic Batch
              </Alert>
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
          <strong>Academic Batch Data</strong>
        </h4>
        {noOfDanger === 0 && (
          <Fragment>
            <Button
              variant='primary'
              onClick={() => {
                const { courseObj, subjectsArr, ...rest } = reqObj;
                rest.courseId = courseObj ? courseObj.id : null;
                rest.subjects = [];
                subjectsArr.forEach((s) => {
                  rest.subjects.push(s.id);
                });
                if (rest.subjects.length === 0) {
                  delete rest.subjects;
                }
                if (!rest.courseId) {
                  delete rest.courseId;
                }

                createAcademicBatch(rest);
              }}
            >
              Create Academic Batch
            </Button>
          </Fragment>
        )}
      </div>
    );
  };

  return <div>{showNext ? validateData() : createAcademicBatchUI()}</div>;
};

CreateAcademicBatch.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default CreateAcademicBatch;
