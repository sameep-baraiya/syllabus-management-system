import React, { Fragment, useState, useContext } from 'react';
import { Form, Button, Table, Card, Row, Col } from 'react-bootstrap';
import SubjectContext from '../../context/subject/subjectContext';

const CreateSubject = () => {
  const subjectContext = useContext(SubjectContext);
  const { createSubject } = subjectContext;

  const [reqObj, setReqObj] = useState({
    subjectCode: '',
    subjectName: '',
    subjectShort: '',
    subjectDescription: '',
    department: 'None',
    headMasterJSON: {
      headMasters: [
        'Lecture',
        'Tutorial',
        'Practical',
        'L+T',
        'P',
        'Total CS',
        'Theory',
        'Sessional',
        'Practical',
        'Term Work',
        'Total ES',
      ],
      headGroups: [
        'Teaching Scheme',
        'Teaching Scheme',
        'Teaching Scheme',
        'Credit Structure',
        'Credit Structure',
        'Credit Structure',
        'Exam Scheme',
        'Exam Scheme',
        'Exam Scheme',
        'Exam Scheme',
        'Exam Scheme',
      ],
      points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    theory: '',
    isElective: false,
    practical: '',
    files: [{ name: '', file: null }],
  });
  const {
    subjectCode,
    subjectName,
    subjectShort,
    subjectDescription,
    department,
    headMasterJSON,
    theory,
    isElective,
    practical,
    files,
  } = reqObj;

  const onChange = (e) => {
    setReqObj({ ...reqObj, [e.target.name]: e.target.value });
  };
  const onChangeCheckBox = (e) => {
    setReqObj({ ...reqObj, isElective: !isElective });
  };
  const changeFileTitle = (e) => {
    const tempFile = files;
    tempFile[parseInt(e.target.name)].name = e.target.value;
    setReqObj({
      ...reqObj,
      files: tempFile,
    });
  };

  const changeCellValue = (e) => {
    const tempPointsArray = reqObj.headMasterJSON.points;
    tempPointsArray[parseInt(e.target.name)] = isNaN(parseInt(e.target.value))
      ? 0
      : parseInt(e.target.value);
    setReqObj({
      ...reqObj,
      headMasterJSON: {
        ...reqObj.headMasterJSON,
        points: tempPointsArray,
      },
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
  const clearData = (e) => {
    setReqObj({
      subjectCode: '',
      subjectName: '',
      subjectShort: '',
      subjectDescription: '',
      department: 'None',
      headMasterJSON: {
        headMasters: [
          'Theory',
          'Sessional',
          'Practical',
          'Term Work',
          'Lecture',
          'Tutorial',
          'Practical',
          'L+T',
          'P',
          'Total',
        ],
        headGroups: [
          'Exam Scheme',
          'Exam Scheme',
          'Exam Scheme',
          'Exam Scheme',
          'Teaching Scheme',
          'Teaching Scheme',
          'Teaching Scheme',
          'Credit Structure',
          'Credit Structure',
          'Total',
        ],
        points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      theory: '',
      isElective: false,
      practical: '',
      files: [{ name: '', file: null }],
    });
  };
  const onSubmit = (e) => {
    e.preventDefault(e);
    if (
      subjectCode === '' ||
      subjectName === '' ||
      subjectShort === '' ||
      department === 'None'
    ) {
      console.log('Please fill data');
    } else {
      createSubject(reqObj);
    }
  };
  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='smSubjectCode'>
          <Form.Label>Subject Code</Form.Label>
          <Form.Control
            name='subjectCode'
            type='text'
            placeholder='Enter new subject code'
            onChange={onChange}
            value={subjectCode}
          />
        </Form.Group>
        <Form.Group controlId='smSubjectName'>
          <Form.Label>Subject Name</Form.Label>
          <Form.Control
            name='subjectName'
            type='text'
            placeholder='Enter subject name'
            onChange={onChange}
            value={subjectName}
          />
        </Form.Group>
        <Form.Group controlId='smSubjectShort'>
          <Form.Label>Subject Short</Form.Label>
          <Form.Control
            name='subjectShort'
            type='text'
            placeholder='Enter subject short'
            onChange={onChange}
            value={subjectShort}
          />
        </Form.Group>
        <Form.Group controlId='smSubjectDescription'>
          <Form.Label>Subject Description</Form.Label>
          <Form.Control
            name='subjectDescription'
            as='textarea'
            placeholder='Enter subject description (optional)'
            rows={5}
            onChange={onChange}
            value={subjectDescription}
          />
        </Form.Group>
        <Form.Group controlId='smDepartment'>
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
        <Form.Group controlId='smHeadMaster'>
          <Form.Label>Head Master</Form.Label>
          <Table striped bordered hover>
            <thead>
              <tr>{cellMakerHeadGroups(headMasterJSON.headGroups)}</tr>
            </thead>
            <thead>
              <tr>{cellMaker(headMasterJSON.headMasters)}</tr>
            </thead>
            <tbody>
              <tr>
                {editableCellMaker(headMasterJSON.points, changeCellValue)}
              </tr>
            </tbody>
          </Table>
        </Form.Group>
        <Form.Group>
          <Form.Label>Subject Property</Form.Label>
          <Card>
            <Card.Body>
              <Form.Check
                name='isElective'
                type='checkbox'
                id='checkbox'
                label='Is Elective ?'
                onChange={onChangeCheckBox}
                checked={isElective}
              />
            </Card.Body>
          </Card>
        </Form.Group>
        <Form.Group controlId='smTheory'>
          <Form.Label>Subject Theory</Form.Label>
          <Form.Control
            name='theory'
            as='textarea'
            placeholder='Enter subject theory (optional)'
            rows={10}
            onChange={onChange}
            value={theory}
          />
        </Form.Group>
        <Form.Group controlId='smPractical'>
          <Form.Label>Subject Practical</Form.Label>
          <Form.Control
            name='practical'
            as='textarea'
            placeholder='Enter subject practical (optional)'
            rows={10}
            onChange={onChange}
            value={practical}
          />
        </Form.Group>
        <Form.Group controlId='smFiles'>
          <Form.Label>Upload Subject Related Files</Form.Label>

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
        <Button variant='secondary' type='reset' onClick={clearData}>
          Clear
        </Button>
      </Form>
      <br />
    </Fragment>
  );
};

const cellMaker = (arr = []) => {
  return (
    <Fragment>
      {arr.map((it, index) => (
        <td key={index}>{it}</td>
      ))}
    </Fragment>
  );
};

const cellMakerHeadGroups = (arr = []) => {
  let counts = {};
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  return (
    <Fragment>
      {Object.keys(counts).map((it, index) => (
        <td key={index} colSpan={counts[it]}>
          {it}
        </td>
      ))}
    </Fragment>
  );
};

const editableCellMaker = (arr = [], changeCellValue) => {
  const handleFocus = (e) => e.target.select();
  return (
    <Fragment>
      {arr.map((it, index) => (
        <td key={index}>
          <Form.Control
            name={index}
            type='text'
            onChange={changeCellValue}
            value={it}
            onFocus={handleFocus}
          />
        </td>
      ))}
    </Fragment>
  );
};

export default CreateSubject;
