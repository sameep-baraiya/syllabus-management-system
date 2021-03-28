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
  Badge,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Context
import MeetingContext from '../../../context/meeting/meetingContext';

// Layout
import { iconEdit, iconValidate, iconCopy, iconTodo } from '../../layout/Icon';

// Utils
import s2pn from '../../../utils/s2pn';

// Common
import { departmentOptions } from '../../../common/department';

const EditMeeting = ({ mode, setMode }) => {
  const meetingContext = useContext(MeetingContext);
  const { meeting, updateMeeting } = meetingContext;

  const initialReqObj = {
    meetingCode: '',
    meetingsNotes: '',
    meetingType: 'bos',
    dateOfMeeting: new Date(),
    requestedChanges: [],
    department: '',
    files: [{ name: '', file: null }],
    isFreezed: false,
  };

  const initialUpdateObj = {
    meetingCode: true,
    meetingsNotes: true,
    meetingType: false,
    dateOfMeeting: true,
    requestedChanges: true,
    department: true,
    files: true,
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
    meetingCode,
    meetingsNotes,
    meetingType,
    dateOfMeeting,
    requestedChanges,
    department,
    files,
    isFreezed,
  } = reqObj;

  const meetingTypeFun = () => {
    return meetingType === 'bos' ? 'Board Of Studies' : 'Academic Council';
  };

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

  const onAddRequstClick = (e) => {
    requestedChanges.push({
      type: 'None',
      mType: 'None',
      description: '',
      linkedSubjectCode: '',
      linkedSubjectName: '',
      effectiveFrom: new Date(),
      isApproved: false,
    });
    setReqObj({
      ...reqObj,
      requestedChanges,
    });
  };

  const onRequestChange = (e) => {
    const split = e.target.name.split('.');
    requestedChanges[s2pn(split[0])][split[1]] = e.target.value;
    setReqObj({
      ...reqObj,
      requestedChanges,
    });
  };

  const onCheckboxChagne = (e) => {
    requestedChanges[parseInt(e.target.name)].isApproved = e.target.checked;
    setReqObj({
      ...reqObj,
      requestedChanges,
    });
  };

  const onRemove = (e) => {
    requestedChanges.splice(parseInt(e.target.name), 1);
    setReqObj({
      ...reqObj,
      requestedChanges,
    });
  };

  // Input onChange handler
  const onChange = (e) => {
    setReqObj({ ...reqObj, [e.target.name]: e.target.value });
  };

  // Input-Number onChange handler
  // const onChangeNum = (e) => {
  //   setReqObj({ ...reqObj, [e.target.name]: s2pn(e.target.value) });
  // };

  // checkBox onChange handler
  const onChangeCheckBox = (e) => {
    setReqObj({ ...reqObj, [e.target.name]: e.target.checked });
  };

  // For Clearing all input
  const clearData = (e) => {
    setReqObj({ ...initialReqObj });
  };

  // Related To File
  const onFileChange = (e) => {
    const tempFile = files;
    tempFile[parseInt(e.target.name)].name = e.target.files[0].name.split(
      '.'
    )[0];
    tempFile[parseInt(e.target.name)].file = e.target.files[0];
    setReqObj({
      ...reqObj,
      files: tempFile,
    });
  };

  const changeFileTitle = (e) => {
    const tempFile = files;
    tempFile[parseInt(e.target.name)].name = e.target.value;
    setReqObj({
      ...reqObj,
      files: tempFile,
    });
  };

  const moreFile = (e) => {
    const tempFile = files;
    tempFile.push({ name: '', file: null });
    setReqObj({
      ...reqObj,
      files: tempFile,
    });
  };

  const removeLast = (e) => {
    const tempFile = files;
    tempFile.pop();
    setReqObj({
      ...reqObj,
      files: tempFile,
    });
  };

  const removeFileFromClone = (index) => {
    let newCloneFiles = reqObj.cloneFiles;
    if (index > -1) {
      newCloneFiles.splice(index, 1);
    }
    if (newCloneFiles.length === 0) {
      newCloneFiles = null;
    }
    setReqObj({
      ...reqObj,
      cloneFiles: newCloneFiles,
    });
  };

  const [showNext, setShowNext] = useState(false);

  // Fires Create Query
  const onSubmit = (e) => {
    e.preventDefault(e);
    setShowNext(true);
  };

  const doOriginal = () => {
    const {
      meetingsNotes,
      dateOfMeeting,
      meetingType,
      requestedChanges,
      department,
      files,
      isFreezed,
    } = meeting;

    let newRequestedChanges = null;
    if (requestedChanges) {
      if (Array.isArray(requestedChanges)) {
        newRequestedChanges = requestedChanges.map((it) => {
          return {
            ...it,
            effectiveFrom: new Date(it.effectiveFrom),
          };
        });
      }
    }

    const original = {
      ...meeting,
      requestedChanges: newRequestedChanges,
      dateOfMeeting: dateOfMeeting !== null ? new Date(dateOfMeeting) : null,
    };

    setReqObj({
      meetingCode: '',
      meetingsNotes: meetingsNotes !== null ? meetingsNotes : '',
      meetingType: meetingType !== null ? meetingType : 'bos',
      dateOfMeeting:
        dateOfMeeting !== null ? new Date(dateOfMeeting) : new Date(),
      requestedChanges: newRequestedChanges !== null ? newRequestedChanges : [],
      department: department !== null ? department : '',
      isFreezed: isFreezed !== null ? isFreezed : false,
      files: [{ name: '', file: null }],
      cloneFiles: files !== null ? files : null,
      original: { ...original },
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

  const uiMeetingCode = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Meeting Code</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Meeting Code:{' '}
                {reqObj.original.meetingCode && reqObj.original.meetingCode}
                {copySpan('meetingCode')}
              </div>
              {keepOG('meetingCode')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditMeeting.meetingCode'>
            <InputGroup>
              <Form.Control
                name='meetingCode'
                type='text'
                placeholder='Enter new meeting code'
                onChange={onChange}
                value={meetingCode}
                disabled={uObj.meetingCode}
              />
              <InputGroup.Append>
                <Button
                  variant='secondary'
                  onClick={() => {
                    const randNum = Math.random();
                    const newMeetingCode = 'TODO_MEETING_' + randNum;
                    setReqObj({
                      ...reqObj,
                      meetingCode: newMeetingCode,
                    });
                  }}
                  disabled={uObj.meetingCode}
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

  const uiMeetingsNotes = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Meetings Notes</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Meeting Notes:{' '}
                {reqObj.original.meetingsNotes && reqObj.original.meetingsNotes}
                {copySpan('meetingsNotes')}
              </div>
              {keepOG('meetingsNotes')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditMeeting.meetingsNotes'>
            <Form.Control
              name='meetingsNotes'
              as='textarea'
              placeholder='Enter meetings notes (optional)'
              rows={5}
              onChange={onChange}
              value={meetingsNotes}
              disabled={uObj.meetingsNotes}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiDepartment = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Department</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Department:{' '}
                {reqObj.original.department && reqObj.original.department}
                {copySpan('department')}
              </div>
              {keepOG('department')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditMeeting.department'>
            <Form.Control
              name='department'
              as='select'
              onChange={onChange}
              value={department}
              disabled={uObj.department}
            >
              <option>None</option>
              {departmentOptions()}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiDateOfMeeting = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Date Of Meeting</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Department:{' '}
                {reqObj.original.dateOfMeeting &&
                  new Date(reqObj.original.dateOfMeeting).toLocaleString(
                    'en-BZ',
                    {
                      hour12: true,
                    }
                  )}
              </div>
              {keepOG('dateOfMeeting')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditMeeting.dateOfMeeting'>
            <DatePicker
              selected={dateOfMeeting}
              onChange={(date) => setReqObj({ ...reqObj, dateOfMeeting: date })}
              dateFormat='dd/MM/yyyy'
              className='form-control'
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiMeetingProperty = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Meeting Property</strong>
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
          <Form.Group controlId='EditMeeting.meetingProperty'>
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

  const uiSubjectFile = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Meeting File</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                {reqObj.original.files &&
                  reqObj.original.files.map((file, index) => (
                    <div key={index}>
                      #{index + 1} File Name:
                      <br />
                      {file.name}
                      <hr />#{index + 1} File Path:
                      <br />
                      {file.path}
                    </div>
                  ))}
              </div>
              {keepOG('files')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          {!uObj.files && (
            <Fragment>
              {reqObj.cloneFiles && Array.isArray(reqObj.cloneFiles) && (
                <Form.Group controlId='EditMeeting.cloneFiles'>
                  <Form.Label>Cloned Files (Handle Server Side)</Form.Label>
                  <Table bordered>
                    <thead>
                      <tr className='table-secondary'>
                        <th>File Name</th>
                        <th>File Path</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reqObj.cloneFiles.map((file, index) => (
                        <tr key={index}>
                          <td>{file.name}</td>
                          <td>{file.path}</td>
                          <td>
                            <Button onClick={() => removeFileFromClone(index)}>
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Form.Group>
              )}
              <Form.Group controlId='EditMeeting.files'>
                <Form.Label>Upload Meeting Related Files</Form.Label>
                <Card>
                  <Card.Body>
                    {Array.isArray(files) &&
                      files.map((it, index) => (
                        <Row key={index} className='mb-2'>
                          <Col>
                            <Form.Control
                              name={index}
                              type='text'
                              placeholder='Enter file title'
                              value={it.name}
                              onChange={changeFileTitle}
                            />
                          </Col>
                          <Col>
                            {it.file ? (
                              <Button
                                variant='warning'
                                block
                                onClick={() => {
                                  files[index] = { name: '', file: null };
                                  setReqObj({
                                    ...reqObj,
                                    files,
                                  });
                                }}
                              >
                                Change File
                              </Button>
                            ) : (
                              <Fragment>
                                <Form.File
                                  name={index}
                                  id={`file${index}`}
                                  onChange={onFileChange}
                                />
                              </Fragment>
                            )}
                          </Col>
                        </Row>
                      ))}
                    <div className='mt-2'>
                      <Button variant='success' onClick={moreFile}>
                        Add File
                      </Button>{' '}
                      <Button variant='danger' onClick={removeLast}>
                        Remove Last File
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Form.Group>
            </Fragment>
          )}
        </Col>
      </Row>
    </div>
  );

  const uiRequestedChanges = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Requested Changes</strong>
      </div>
      <div>
        <Card>
          <Card.Body>
            <div>
              <strong>Original Requested Changes : </strong>
              {requestedChanges && Array.isArray(requestedChanges) && (
                <Fragment>
                  <div className='mb-1'>
                    <Table bordered size='sm'>
                      <thead>
                        <tr className='table-secondary'>
                          <th>Index</th>
                          <th>Type of Change</th>
                          <th>Type of Modificaion</th>
                          <th>Effective From</th>
                          <th>Is Approved</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requestedChanges.map((rq, index) => (
                          <Fragment key={index}>
                            <tr className='table-info'>
                              <td>{index + 1}</td>
                              <td>{rq.type}</td>
                              <td>{rq.mType}</td>
                              <td>
                                {new Date(rq.effectiveFrom).toLocaleString(
                                  'en-BZ',
                                  {
                                    hour12: true,
                                  }
                                )}
                              </td>
                              <td>{rq.isApproved === true ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                              <td colSpan={5}>
                                <strong>Subject :</strong>{' '}
                                {rq.linkedSubjectCode}: {rq.linkedSubjectName}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={5}>
                                <strong>Description :</strong>
                                <br />
                                {rq.description}
                              </td>
                            </tr>
                          </Fragment>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Fragment>
              )}
            </div>
            {keepOG('requestedChanges')}
          </Card.Body>
        </Card>
      </div>

      {!uObj.requestedChanges && (
        <Fragment>
          <br />
          <Form.Group controlId='EditMeeting.changes'>
            <Form.Label>Requested Changes</Form.Label>
            <Card>
              <Card.Body>
                <div>
                  <Button variant='success' onClick={onAddRequstClick}>
                    Add Request Change
                  </Button>{' '}
                  <Badge variant='primary'>
                    No of Rquested Changes: {requestedChanges.length}
                  </Badge>
                </div>
                {requestedChanges.map((change, index) => (
                  <div key={index}>
                    <hr />
                    <h5 className='text-muted '>
                      <strong>
                        {iconTodo} Change Number {index + 1}
                      </strong>
                    </h5>
                    <div className='mt-2'>
                      <Row>
                        <Col>
                          <Form.Label>Type of Change</Form.Label>
                          <Form.Control
                            name={`${index}.type`}
                            as='select'
                            value={change.type}
                            onChange={onRequestChange}
                          >
                            <option>None</option>
                            <option value='add'>Addition of Subject</option>
                            <option value='mod'>Modification of Subject</option>
                            <option value='dep'>Deprecation of Subject</option>
                          </Form.Control>
                        </Col>
                        {change.type === 'mod' && (
                          <Col>
                            <Form.Label>Type of Modificaion</Form.Label>
                            <Form.Control
                              name={`${index}.mType`}
                              as='select'
                              value={change.mType}
                              onChange={onRequestChange}
                            >
                              <option>None</option>
                              <option value='theory'>
                                Modification in Theory
                              </option>
                              <option value='practical'>
                                Modification in Practical
                              </option>
                              <option value='schema'>
                                Modification in Schema
                              </option>
                              <option value='semindex'>
                                Modification in SemNo/ListIndex
                              </option>
                            </Form.Control>
                          </Col>
                        )}
                        <Col md='auto'>
                          <Form.Label>Effective From</Form.Label>
                          <br />
                          <DatePicker
                            selected={change.effectiveFrom}
                            onChange={(date) => {
                              requestedChanges[index].effectiveFrom = date;
                              setReqObj({
                                ...reqObj,
                                requestedChanges,
                              });
                            }}
                            dateFormat='dd/MM/yyyy'
                            className='form-control'
                          />
                        </Col>
                      </Row>

                      <br />
                      <Form.Label>
                        Linked Subject Code (Will create if does not exist)
                      </Form.Label>
                      <Form.Control
                        name={`${index}.linkedSubjectCode`}
                        type='text'
                        placeholder='Linked Subject Code'
                        value={change.linkedSubjectCode}
                        onChange={onRequestChange}
                      />
                      <br />
                      <Form.Label>Linked Subject Name</Form.Label>
                      <Form.Control
                        name={`${index}.linkedSubjectName`}
                        type='text'
                        placeholder='Linked Subject Name'
                        value={change.linkedSubjectName}
                        onChange={onRequestChange}
                      />
                      <br />
                      <Form.Label>Is Change approved in Meeting ?</Form.Label>

                      <Form.Check
                        name={index}
                        type='checkbox'
                        label='Is approved ?'
                        checked={change.isApproved}
                        onChange={onCheckboxChagne}
                      />
                    </div>
                    <br />
                    <div>
                      <Form.Label>Change Details</Form.Label>
                      <div className='float-right mb-2'>
                        <Button
                          size='sm'
                          variant='danger'
                          name={index}
                          onClick={onRemove}
                        >
                          Remove Change
                        </Button>
                      </div>
                      <Form.Control
                        name={`${index}.description`}
                        as='textarea'
                        placeholder='Enter change details'
                        value={change.description}
                        rows={7}
                        onChange={onRequestChange}
                      />
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Form.Group>
        </Fragment>
      )}
    </div>
  );

  const uiForm = () => {
    return reqObj.original ? (
      <Form onSubmit={onSubmit}>
        <h3>
          <strong>
            {iconEdit} Edit {meetingTypeFun()} Meeting
          </strong>
        </h3>
        <Row>
          <Col lg={3}>
            <h4 className='text-muted'>Original Meeting</h4>
          </Col>
          <Col lg={9}>
            <h4 className='text-muted'>Edited Meeting</h4>
          </Col>
        </Row>
        {uiMeetingCode()}
        {uiMeetingsNotes()}
        {uiDepartment()}
        {uiDateOfMeeting()}
        {uiMeetingProperty()}
        {uiSubjectFile()}
        {uiRequestedChanges()}
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
          Set Original Meeting First to proceed forward
        </Alert>
      </Fragment>
    );
  };

  const validateData = () => {
    const alertArray = [];
    if (uObj.meetingCode === false) {
      if (meetingCode === '') {
        alertArray.push(['Meeting Code should not be Empty', 'danger']);
      } else if (!/^[a-zA-Z0-9-_() .]+$/.test(meetingCode)) {
        alertArray.push([
          'Meeting Code only Alphanumeric and - _ ( ) . Allowed',
          'danger',
        ]);
      }
    }

    if (uObj.meetingsNotes === false) {
      if (meetingsNotes === '') {
        alertArray.push(['Meeting Notes (Optional) is Empty', 'warning']);
      } else if (
        !/^([a-zA-Z0-9 _.\-~!@#$%^&*()_+{}[\]|\\:;"'<,>.?/`\n=]+)$/.test(
          meetingsNotes
        )
      ) {
        alertArray.push([
          'Meeting Notes only Alphanumeric and _ . - ~ ! @ # $ % ^ & * ( ) _ + { } [ ] | \\ : ; " \' < , > . ? / ` \\n characters Allowed',
          'danger',
        ]);
      }
    }

    if (uObj.department === false) {
      if (department === 'None') {
        alertArray.push(['Department should not be Empty', 'danger']);
      } else if (department === 'Keep Empty For Now') {
        alertArray.push(['Department is set to Empty purposefully.', 'waring']);
      }
    }

    if (uObj.isFreezed === false) {
      if (isFreezed === true) {
        alertArray.push([
          'Meeting Freezed will make meeting editable by Admin only',
          'warning',
        ]);
      }
    }

    if (uObj.files === false) {
      files.forEach((file, index) => {
        if (file.file === null) {
          alertArray.push([
            `Number ${index + 1} Meeting Related File is Empty`,
            'danger',
          ]);
        }
      });
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
                Error Free, Can Edit {meetingTypeFun()} Meeting
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
          <strong>Meeting Data</strong>
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

                // Clone Cases
                if (uObj.files === true) {
                  delete rest.cloneFiles;
                }

                // Seting id
                rest.id = rest.original.id;

                // Original Case
                delete rest.original;

                console.log(rest);
                updateMeeting(rest);
              }}
            >
              Edit {meetingTypeFun()} Meeting
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
            Back To Edit Meeting
          </Button>
          {validateData()}
        </div>
      ) : (
        uiForm()
      )}
    </div>
  );
};

EditMeeting.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default EditMeeting;
