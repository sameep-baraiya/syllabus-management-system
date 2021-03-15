import React, { Fragment, useState } from 'react';
import { Form, Button, Card, Table, Badge, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateBOSMeeting = () => {
  // const academicBatchContext = useContext(AcademicBatchContext);

  // const { createAcademicBatch } = academicBatchContext;

  const [reqObj, setReqObj] = useState({
    meetingCode: '',
    meetingsNotes: '',
    dateOfMeeting: new Date(),
    requestedChanges: [],
    department: '',
    files: [{ name: '', file: null }],
  });
  const {
    meetingCode,
    meetingsNotes,
    dateOfMeeting,
    requestedChanges,
    department,
    files,
  } = reqObj;

  const onChange = (e) => {
    setReqObj({
      ...reqObj,
      [e.target.name]: e.target.value,
    });
  };

  // const handleFocus = (e) => e.target.select();

  const onAddRequstClick = (e) => {
    requestedChanges.push({
      type: 'None',
      description: '',
      linkedSubjectCode: '',
      isApproved: false,
    });
    setReqObj({
      ...reqObj,
      requestedChanges,
    });
  };

  const onSelectChange = (e) => {
    requestedChanges[parseInt(e.target.name)].type = e.target.value;
    setReqObj({
      ...reqObj,
      requestedChanges,
    });
  };

  const onLinkedSubjectCodeChange = (e) => {
    requestedChanges[parseInt(e.target.name)].linkedSubjectCode =
      e.target.value;
    setReqObj({
      ...reqObj,
      requestedChanges,
    });
  };

  const onDescriptionChange = (e) => {
    requestedChanges[parseInt(e.target.name)].description = e.target.value;
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

  const onSubmit = (e) => {
    // e.preventDefault();
    // if (
    //   academicBatchCode === '' ||
    //   academicBatchName === '' ||
    //   yearLable === ''
    // ) {
    //   console.log('Enter proper data');
    // } else {
    //   createAcademicBatch(reqObj);
    // }
  };

  const onClear = (e) => {
    // setReqObj({
    //   academicBatchCode: '',
    //   academicBatchDescription: '',
    //   academicBatchName: '',
    //   yearLable: '',
    //   coursesObj: [],
    // });
    // setSelectedCourses([]);
    // setSearchQuery({
    //   search: '',
    //   select: 'courseCode',
    // });
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='bosMeetingCode'>
          <Form.Label>Meeting Code</Form.Label>
          <Form.Control
            name='meetingCode'
            type='text'
            placeholder='Enter new meeting code'
            onChange={onChange}
            value={meetingCode}
          />
        </Form.Group>
        <Form.Group controlId='bosMeetingsNotes'>
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
        <Form.Group controlId='bosDepartment'>
          <Form.Label>Department</Form.Label>
          <Form.Control
            name='department'
            as='select'
            onChange={onChange}
            value={department}
          >
            <option>None</option>
            <option>CH - Chemical Engineering</option>
            <option>CI - Civil Engineering</option>
            <option>CE - Computer Engineering</option>
            <option>EC - Electronic Engineering</option>
            <option>ME - Mechanical Engineering</option>
            <option>IT - Information Technology</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='bosDateOfMeeting'>
          <Form.Label>Date Of Meeting</Form.Label>
          <br />
          <DatePicker
            selected={dateOfMeeting}
            onChange={(date) => setReqObj({ ...reqObj, dateOfMeeting: date })}
            dateFormat='dd/MM/yyyy'
          />
        </Form.Group>
        <Form.Group controlId='bosRequestedChanges'>
          <Form.Label>Requested Changes</Form.Label>
          <Card>
            <Card.Body>
              <Button variant='success' onClick={onAddRequstClick}>
                Add Request Change
              </Button>{' '}
              <Badge variant='primary'>
                No of Rquested Changes: {requestedChanges.length}
              </Badge>
              <br />
              <br />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Type Of Change</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {requestedChanges.map((change, index) => (
                    <tr key={index}>
                      <td width='25%'>
                        <Form.Control
                          name={index}
                          as='select'
                          value={change.type}
                          onChange={onSelectChange}
                        >
                          <option>None</option>
                          <option value='add'>Addition of Subject</option>
                          <option value='mod'>Modification of Subject</option>
                          <option value='dep'>Deprecation of Subject</option>
                        </Form.Control>
                        <br />
                        <Form.Label>Type of Modificaion</Form.Label>
                        <Form.Control name={index} as='select'>
                          <option>None</option>
                          <option>Modification in Theory</option>
                          <option>Modification in Practical</option>
                          <option>Modification in Schema</option>
                          <option>Modification in SemNo/ListIndex</option>
                        </Form.Control>
                        <br />
                        <Form.Label>Linked Subject Code</Form.Label>
                        <Form.Control
                          name={index}
                          type='text'
                          placeholder='Linked Subject Code'
                          value={change.linkedSubjectCode}
                          onChange={onLinkedSubjectCodeChange}
                        />
                        <br />
                        <Form.Label>Linked Subject Name</Form.Label>
                        <Form.Control
                          name={index}
                          type='text'
                          placeholder='Linked Subject Name'
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
                        <br />
                        <Button
                          size='sm'
                          variant='danger'
                          name={index}
                          onClick={onRemove}
                        >
                          Remove Change
                        </Button>
                      </td>
                      <td width='75%'>
                        <Form.Control
                          name={index}
                          as='textarea'
                          placeholder='Enter change details'
                          value={change.description}
                          rows={20}
                          onChange={onDescriptionChange}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Form.Group>
        <Form.Group controlId='bosFiles'>
          <Form.Label>Upload Board of Studies Meeting Related Files</Form.Label>
          <Card>
            <Card.Body>
              {files.map((it, index) => (
                <Row key={index}>
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
                    <Form.File
                      name={index}
                      id={`file${index}`}
                      onChange={onFileChange}
                    />
                  </Col>
                </Row>
              ))}
              <br />
              <Button variant='success' onClick={moreFile}>
                Add File
              </Button>{' '}
              <Button variant='danger' onClick={removeLast}>
                Remove Last File
              </Button>
            </Card.Body>
          </Card>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>{' '}
        <Button variant='secondary' type='reset' onClick={onClear}>
          Clear
        </Button>
      </Form>
      <br />
    </Fragment>
  );
};

export default CreateBOSMeeting;
