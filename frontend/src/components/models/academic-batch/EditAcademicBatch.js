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
  Table,
} from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Context
import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';
import SubjectContext from '../../../context/subject/subjectContext';
import CourseContext from '../../../context/course/courseContext';

// Course Components
import FindCourse from '../course/FindCourse';
import ViewCourse from '../course/ViewCourse';

// Subject Components
import FindSubject from '../subject/FindSubject';

// Layout
import { iconEdit, iconValidate, iconCopy } from '../../layout/Icon';

const EditAcademicBatch = ({ mode, setMode }) => {
  const academicBatchContext = useContext(AcademicBatchContext);
  const { academicBatch, updateAcademicBatch } = academicBatchContext;

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

  const initialUpdateObj = {
    academicBatchCode: true,
    academicBatchDescription: true,
    academicBatchName: true,
    startYear: true,
    endYear: true,
    courseObj: true,
    subjectsArr: true,
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
    academicBatchCode,
    academicBatchDescription,
    academicBatchName,
    startYear,
    endYear,
    courseObj,
    subjectsArr,
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
      academicBatchDescription,
      academicBatchName,
      startYear,
      endYear,
      isFreezed,
      course,
      subjects,
    } = academicBatch;

    const original = { ...academicBatch };

    setReqObj({
      academicBatchCode: '',
      academicBatchName: academicBatchName !== null ? academicBatchName : '',
      academicBatchDescription:
        academicBatchDescription !== null ? academicBatchDescription : '',
      startYear: startYear !== null ? startYear : '',
      endYear: endYear !== null ? endYear : '',
      isFreezed: isFreezed !== null ? isFreezed : false,
      courseObj: course !== null ? course : false,
      subjectsArr:
        subjects !== null && Array.isArray(subjects) && subjects.length
          ? subjects
          : [],
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

  const uiAcademicBatchCode = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Academic Batch Code</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Academic Batch Code:{' '}
                {reqObj.original.academicBatchCode &&
                  reqObj.original.academicBatchCode}
                {copySpan('academicBatchCode')}
              </div>
              {keepOG('academicBatchCode')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditAcademicBatch.academicBatchCode'>
            <InputGroup>
              <Form.Control
                name='academicBatchCode'
                type='text'
                placeholder='Enter new academic batch code'
                onChange={onChange}
                value={academicBatchCode}
                disabled={uObj.academicBatchCode}
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
                  disabled={uObj.academicBatchCode}
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

  const uiAcademicBatchName = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Academic Batch Name</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Academic Batch Name:{' '}
                {reqObj.original.academicBatchName &&
                  reqObj.original.academicBatchName}
                {copySpan('academicBatchName')}
              </div>
              {keepOG('academicBatchName')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditAcademicBatch.academicBatchName'>
            <Form.Control
              name='academicBatchName'
              type='text'
              placeholder='Enter new academic batch name'
              onChange={onChange}
              value={academicBatchName}
              disabled={uObj.academicBatchName}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiAcademicBatchDescription = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Academic Batch Description</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Academic Batch Description:{' '}
                {reqObj.original.academicBatchDescription &&
                  reqObj.original.academicBatchDescription}
                {copySpan('academicBatchDescription')}
              </div>
              {keepOG('academicBatchDescription')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditAcademicBatch.academicBatchDescription'>
            <Form.Control
              name='academicBatchDescription'
              as='textarea'
              placeholder='Enter academic batch description (optional)'
              rows={5}
              onChange={onChange}
              value={academicBatchDescription}
              disabled={uObj.academicBatchDescription}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiAcademicBatchProperty = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Academic Batch Property</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Is Freezed: {reqObj.original.isFreezed ? 'Yes' : 'No'}
                {keepOG('isFreezed')}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditAcademicBatch.academicBatchProperty'>
            <Card>
              <Card.Body>
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

  const uiStartYear = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Start Year</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Start Year:{' '}
                {reqObj.original.startYear && reqObj.original.startYear}
              </div>
              {keepOG('startYear')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditAcademicBatch.startYear'>
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
                disabled={uObj.startYear}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiEndYear = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; End Year</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                End Year: {reqObj.original.endYear && reqObj.original.endYear}
              </div>
              {keepOG('endYear')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditAcademicBatch.endYear'>
            <div>
              <DatePicker
                selected={
                  startYear === ''
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
                disabled={uObj.endYear}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiCourse = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Select Course</strong>
      </div>
      <div>
        <Card>
          <Card.Body>
            <div>
              <strong>Original Course : </strong>
              <br />
              {reqObj.original.course &&
                reqObj.original.course.courseCode}:{' '}
              {reqObj.original.course && reqObj.original.course.courseName}
              <br />[
              {reqObj.original.course &&
                reqObj.original.course.department},{' '}
              {reqObj.original.course && reqObj.original.course.courseType}]
            </div>
            {keepOG('courseObj')}
          </Card.Body>
        </Card>
      </div>

      {!uObj.courseObj && (
        <Fragment>
          <br />
          <div>
            <Form.Group controlId='EditAcademicBatch.courseObj'>
              {courseObj !== null ? (
                <Alert variant='info'>
                  <strong>Selected Course : </strong>
                  <br />
                  {courseObj.courseCode}: {courseObj.courseName}
                  <br />[{courseObj.department}, {courseObj.courseType}]
                  <br />
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
          </div>
        </Fragment>
      )}
    </div>
  );

  const uiSubjects = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Select Subjects</strong>
      </div>
      <div>
        <Card>
          <Card.Body>
            <div>Orginal Selected Subjects:</div>
            {keepOG('subjectsArr')}
          </Card.Body>
        </Card>
      </div>
      {!uObj.subjectsArr && (
        <Fragment>
          <br />
          <div>
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
                        {sub.subjectCode}: {sub.subjectName} ({sub.subjectShort}
                        ) [Sem: {sub.semNo}, Index: {sub.listIndex}]
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
          </div>
        </Fragment>
      )}
    </div>
  );

  const uiForm = () => {
    return reqObj.original ? (
      <div>
        <Form>
          <h3>
            <strong>{iconEdit} Edit Academic Batch</strong>
          </h3>
          <Row>
            <Col lg={3}>
              <h4 className='text-muted'>Original Academic Batch</h4>
            </Col>
            <Col lg={9}>
              <h4 className='text-muted'>Edited Academic Batch</h4>
            </Col>
          </Row>
          {uiAcademicBatchCode()}
          {uiAcademicBatchName()}
          {uiAcademicBatchDescription()}
          {uiAcademicBatchProperty()}
          {uiStartYear()}
          {uiEndYear()}
        </Form>
        {uiCourse()}
        {uiSubjects()}
        <div className='mt-3'>
          <Button variant='primary' onClick={onSubmit}>
            Review Input
          </Button>{' '}
          <Button variant='secondary' onClick={clearData}>
            Clear
          </Button>
        </div>
      </div>
    ) : (
      <Fragment>
        <Alert variant='info'>
          Set Original Academic Batch First to proceed forward
        </Alert>
      </Fragment>
    );
  };

  const validateData = () => {
    const alertArray = [];
    if (uObj.academicBatchCode === false) {
      if (academicBatchCode === '') {
        alertArray.push(['Academic Batch Code should not be Empty', 'danger']);
      } else if (!/^[a-zA-Z0-9-_() .]+$/.test(academicBatchCode)) {
        alertArray.push([
          'Academic Batch Code only Alphanumeric and - _ ( ) . Allowed',
          'danger',
        ]);
      }
    }

    if (uObj.academicBatchName === false) {
      if (academicBatchName === '') {
        alertArray.push(['Academic Batch Name should not be Empty', 'danger']);
      } else if (!/^[a-zA-Z0-9-_() .]+$/.test(academicBatchName)) {
        alertArray.push([
          'Academic Batch Name only Alphanumeric and - _ ( ) . characters Allowed',
          'danger',
        ]);
      }
    }

    if (uObj.academicBatchDescription === false) {
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
    }

    if (uObj.isFreezed === false) {
      if (isFreezed === true) {
        alertArray.push([
          'Academic Batch Freezed will make it editable by Admin only',
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
              <Alert variant='success'>
                Error Free, Can Edit Academic Batch
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
                const { ...rest } = reqObj;
                Object.keys(reqObj.original).forEach((key, index) => {
                  if (uObj[key] === true) {
                    delete rest[key];
                  }
                });

                if (uObj.courseObj) {
                  delete rest.courseObj;
                } else {
                  rest.courseId = rest.courseObj.id;
                  delete rest.courseObj;
                }

                if (uObj.subjectsArr) {
                  delete rest.subjectsArr;
                } else {
                  rest.subjects = [];
                  subjectsArr.forEach((s) => {
                    rest.subjects.push(s.id);
                  });
                  delete rest.subjectsArr;
                }

                // Seting id
                rest.id = rest.original.id;

                // Original Case
                delete rest.original;

                console.log(rest);
                updateAcademicBatch(rest);
              }}
            >
              Edit Academic Batch
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
            Back To Edit Academic Batch
          </Button>
          {validateData()}
        </div>
      ) : (
        uiForm()
      )}
    </div>
  );
};

EditAcademicBatch.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default EditAcademicBatch;
