import React, { useState, Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Card,
  Badge,
  Row,
  Col,
  InputGroup,
  Alert,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Layout
import { iconTodo, iconValidate, iconCreate } from '../../layout/Icon';

// Utils
import s2pn from '../../../utils/s2pn';
import { departmentTypeOptions } from '../../../utils/configUtils';

// Context
import MeetingContext from '../../../context/meeting/meetingContext';
import ConfigContext from '../../../context/config/configContext';

const CreateMeeting = ({ mode, setMode, type }) => {
  const meetingContext = useContext(MeetingContext);
  const { meeting, createMeeting } = meetingContext;

  const configContext = useContext(ConfigContext);
  const { departmentType } = configContext;

  const initialReqObj = {
    meetingCode: '',
    meetingsNotes: '',
    dateOfMeeting: new Date(),
    requestedChanges: [],
    department: '',
    files: [{ name: '', file: null }],
    isFreezed: false,
  };

  const [reqObj, setReqObj] = useState({ ...initialReqObj });

  const {
    meetingCode,
    meetingsNotes,
    dateOfMeeting,
    requestedChanges,
    department,
    files,
    isFreezed,
  } = reqObj;

  const onChange = (e) => {
    setReqObj({
      ...reqObj,
      [e.target.name]: e.target.value,
    });
  };

  // const handleFocus = (e) => e.target.select();
  const meetingType = () => {
    return type === 'bos' ? 'Board Of Studies' : 'Academic Council';
  };

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

  // For Clearing all input
  const clearData = (e) => {
    setReqObj({ ...initialReqObj });
  };

  // Fires Create Query
  const onSubmit = (e) => {
    e.preventDefault(e);
    setShowNext(true);
  };

  const [showNext, setShowNext] = useState(false);

  const doClone = () => {
    const {
      meetingsNotes,
      dateOfMeeting,
      requestedChanges,
      department,
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

    setReqObj({
      meetingCode: '',
      meetingsNotes: meetingsNotes !== null ? meetingsNotes : '',
      dateOfMeeting:
        dateOfMeeting !== null ? new Date(dateOfMeeting) : new Date(),
      requestedChanges: newRequestedChanges !== null ? newRequestedChanges : [],
      department: department !== null ? department : '',
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

  const uiForm = () => (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId='CreateMeeting.meetingCode'>
        <Form.Label>{meetingType()} Meeting Code</Form.Label>
        <InputGroup>
          <Form.Control
            name='meetingCode'
            type='text'
            placeholder='Enter new meeting code'
            onChange={onChange}
            value={meetingCode}
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
            >
              Auto Generate
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId='CreateMeeting.meetingsNotes'>
        <Form.Label>Meeting Notes</Form.Label>
        <Form.Control
          name='meetingsNotes'
          as='textarea'
          placeholder='Enter meetings notes (optional)'
          rows={5}
          onChange={onChange}
          value={meetingsNotes}
        />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId='CreateMeeting.department'>
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
        </Col>
        <Col md='auto'>
          <Form.Group controlId='CreateMeeting.dataOfMeeting'>
            <Form.Label>Date Of Meeting</Form.Label>
            <br />
            <DatePicker
              selected={dateOfMeeting}
              onChange={(date) => setReqObj({ ...reqObj, dateOfMeeting: date })}
              dateFormat='dd/MM/yyyy'
              className='form-control'
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId='CreateMeeting.meetingProperty'>
        <Form.Label>Meeting Property</Form.Label>
        <Card>
          <Card.Body>
            <Form.Check
              name='isFreezed'
              type='checkbox'
              label='Is Freezed ?'
              checked={isFreezed}
              onChange={() => {
                setReqObj({ ...reqObj, isFreezed: !isFreezed });
              }}
            />
          </Card.Body>
        </Card>
      </Form.Group>
      <Form.Group controlId='CreateMeeting.changes'>
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
                          <option value='theory'>Modification in Theory</option>
                          <option value='practical'>
                            Modification in Practical
                          </option>
                          <option value='schema'>Modification in Schema</option>
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
      <Form.Group controlId='CreateMeeting.files'>
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
      <Button variant='primary' type='submit'>
        Review Input
      </Button>{' '}
      <Button variant='secondary' type='reset' onClick={clearData}>
        Clear
      </Button>
    </Form>
  );

  const validateData = () => {
    const alertArray = [];
    if (meetingCode === '') {
      alertArray.push(['Meeting Code should not be Empty', 'danger']);
    } else if (!/^[a-zA-Z0-9-_() .]+$/.test(meetingCode)) {
      alertArray.push([
        'Meeting Code only Alphanumeric and - _ ( ) . Allowed',
        'danger',
      ]);
    }

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

    if (department === 'None') {
      alertArray.push(['Department should not be Empty', 'danger']);
    } else if (department === 'Keep Empty For Now') {
      alertArray.push(['Department is set to Empty purposefully.', 'waring']);
    }

    if (isFreezed === true) {
      alertArray.push([
        'Meeting Freezed will make meeting editable by Admin only',
        'warning',
      ]);
    }

    files.forEach((file, index) => {
      if (file.file === null) {
        alertArray.push([
          `Number ${index + 1} Meeting Related File is Empty`,
          'danger',
        ]);
      }
    });

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
                Error Free, Can Create {meetingType()} Meeting
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
        {noOfDanger === 0 && (
          <Fragment>
            <Button
              variant='primary'
              onClick={() => {
                reqObj.meetingType = type;
                createMeeting(reqObj);
              }}
            >
              Create {meetingType()} Meeting
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {showNext ? (
        <div>
          <Button
            className='mb-2'
            variant='info'
            onClick={() => {
              setShowNext(false);
            }}
          >
            Back To Create {meetingType()} Meeting
          </Button>
          {validateData()}
        </div>
      ) : (
        <div>
          <h3>
            <strong>
              {iconCreate} Create {meetingType()} Meeting
            </strong>
          </h3>
          {uiForm()}
        </div>
      )}
    </Fragment>
  );
};

CreateMeeting.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default CreateMeeting;
