import React, { useState, useContext, useEffect, Fragment } from 'react';
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Table,
  InputGroup,
  Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Context
import SubjectContext from '../../../context/subject/subjectContext';
import ConfigContext from '../../../context/config/configContext';

// Layout
import { iconCreate, iconValidate } from '../../layout/Icon';
import PdfView from '../../layout/PdfView';

// Utils
import s2pn from '../../../utils/s2pn';
import {
  departmentTypeOptions,
  subjectTypeOptions,
} from '../../../utils/configUtils';

// Subject Model Componets
import HaedMasterJSONInput from './HaedMasterJSONInput';
import SubjectReqView from './SubjectReqView';

const CreateSubject = ({ mode, setMode }) => {
  const subjectContext = useContext(SubjectContext);
  const { subject, createSubject } = subjectContext;

  const configContext = useContext(ConfigContext);
  const { departmentType, subjectType: subjectTypeArr } = configContext;

  const initialReqObj = {
    subjectCode: '',
    department: 'None',
    subjectName: '',
    subjectShort: '',
    subjectType: 'None',
    subjectDescription: '',
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
      headGroups: ['Teaching Scheme', 'Credit Structure', 'Exam Scheme'],
      headGroupsLength: [3, 3, 5],
      points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    theoryFile: { name: '', file: null, url: '' },
    isElective: false,
    practicalFile: { name: '', file: null, url: '' },
    semNo: 0,
    listIndex: 0,
    isOutdated: false,
    isFreezed: false,
    files: [{ name: '', file: null }],
  };

  const [reqObj, setReqObj] = useState({ ...initialReqObj });
  const {
    subjectCode,
    subjectName,
    subjectShort,
    subjectType,
    subjectDescription,
    department,
    headMasterJSON,
    theoryFile,
    isElective,
    practicalFile,
    semNo,
    listIndex,
    isOutdated,
    isFreezed,
    files,
  } = reqObj;

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

  const [showNext, setShowNext] = useState(false);

  // Fires Create Query
  const onSubmit = (e) => {
    e.preventDefault(e);
    setShowNext(true);
  };

  const doPredecessor = () => {
    setReqObj({
      ...reqObj,
      predecessor: {
        ...subject,
      },
    });
    setMode('');
  };

  const doSuccessor = () => {
    setReqObj({
      ...reqObj,
      successor: {
        ...subject,
      },
    });
    setMode('');
  };

  const doClone = () => {
    const {
      subjectName,
      subjectShort,
      subjectType,
      subjectDescription,
      department,
      headMasterJSON,
      theoryFile,
      isElective,
      practicalFile,
      isOutdated,
      isFreezed,
      semNo,
      listIndex,
      files,
    } = subject;

    const filesNullCase = {};

    if (!theoryFile) {
      filesNullCase.theoryFile = { name: '', file: null, url: '' };
    }

    if (!practicalFile) {
      filesNullCase.practicalFile = { name: '', file: null, url: '' };
    }

    delete reqObj.theoryFile;
    delete reqObj.practicalFile;

    setReqObj({
      ...reqObj,
      subjectCode: '',
      department: department !== null ? department : 'None',
      subjectName: subjectName !== null ? subjectName : '',
      subjectShort: subjectShort !== null ? subjectShort : '',
      subjectType: subjectType !== null ? subjectType : 'None',
      subjectDescription: subjectDescription !== null ? subjectDescription : '',
      headMasterJSON:
        headMasterJSON !== null
          ? headMasterJSON
          : {
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
      cloneTheoryFile: theoryFile !== null ? theoryFile : null,
      isElective: isElective !== null ? isElective : false,
      clonePracticalFile: practicalFile !== null ? practicalFile : null,
      files: [{ name: '', file: null }],
      semNo: semNo !== null ? semNo : 0,
      listIndex: listIndex !== null ? listIndex : 0,
      isOutdated: isOutdated !== null ? isOutdated : false,
      isFreezed: isFreezed !== null ? isFreezed : false,
      cloneFiles: files !== null ? files : null,
      ...filesNullCase,
    });
    setMode('');
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

  const onModeChange = () => {
    if (mode === 'clone') {
      doClone();
    } else if (mode === 'predecessor') {
      doPredecessor();
    } else if (mode === 'successor') {
      doSuccessor();
    }
  };

  useEffect(() => {
    onModeChange();
    // eslint-disable-next-line
  }, [mode]);

  const updateNo = () => (
    <Form.Group controlId='CreateSubject.updateNo'>
      <Form.Label>Version Of Subject (Read Only)</Form.Label>
      <Table bordered>
        <thead>
          <tr className='table-secondary'>
            <th>Predecessor Subject</th>
            <th>Current Subject</th>
            <th>Successor Subject</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {reqObj.predecessor ? (
              <td>
                {reqObj.predecessor.subjectCode}:{' '}
                {reqObj.predecessor.subjectName}(
                {reqObj.predecessor.subjectCode})
              </td>
            ) : (
              <td>None Predecessor</td>
            )}
            <td>
              {subjectCode}: {subjectName}({subjectShort})
            </td>
            {reqObj.successor ? (
              <td>
                {reqObj.successor.subjectCode}: {reqObj.successor.subjectName}(
                {reqObj.successor.subjectCode})
              </td>
            ) : (
              <td>None Successor</td>
            )}
          </tr>
          <tr>
            <td>
              Predecessor Version :{' '}
              {reqObj.predecessor && reqObj.predecessor.updateNo}
            </td>
            <td>Current Version : (auto identify)</td>
            <td>
              Successor Version :{' '}
              {reqObj.successor && reqObj.successor.updateNo}
            </td>
          </tr>
        </tbody>
      </Table>
    </Form.Group>
  );

  const nameToDescription = () => (
    <Fragment>
      <Form.Group controlId='CreateSubject.subjectCode'>
        <Form.Label>Subject Code</Form.Label>
        <InputGroup>
          <Form.Control
            name='subjectCode'
            type='text'
            placeholder='Enter new subject code'
            onChange={onChange}
            value={subjectCode}
          />
          <InputGroup.Append>
            <Button
              variant='secondary'
              onClick={() => {
                const randNum = Math.random();
                const newSubCode = 'TODO_SUBCODE_' + randNum;
                setReqObj({
                  ...reqObj,
                  subjectCode: newSubCode,
                });
              }}
            >
              Auto Generate
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId='CreateSubject.subjectName'>
        <Form.Label>Subject Name</Form.Label>
        <Form.Control
          name='subjectName'
          type='text'
          placeholder='Enter subject name'
          onChange={onChange}
          value={subjectName}
        />
      </Form.Group>
      <Form.Group controlId='CreateSubject.subjectShort'>
        <Form.Label>Subject Short</Form.Label>
        <Form.Control
          name='subjectShort'
          type='text'
          placeholder='Enter subject short'
          onChange={onChange}
          value={subjectShort}
        />
      </Form.Group>
      <Form.Group controlId='CreateSubject.subjectDescription'>
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
    </Fragment>
  );

  const departmentToProperty = () => (
    <Fragment>
      <Row>
        <Col>
          <Form.Group controlId='CreateSubject.department'>
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
        <Col>
          <Form.Group controlId='CreateSubject.subjectType'>
            <Form.Label>Subject Type</Form.Label>
            <Form.Control
              name='subjectType'
              as='select'
              onChange={onChange}
              value={subjectType}
            >
              <option>None</option>
              {subjectTypeOptions(subjectTypeArr)}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId='CreateSubject.subjectProperty'>
        <Form.Label>Subject Property</Form.Label>
        <Card>
          <Card.Body>
            <Form.Check
              name='isElective'
              type='checkbox'
              label='Is Elective ?'
              checked={isElective}
              onChange={onChangeCheckBox}
            />
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
    </Fragment>
  );

  const semNoToListIndex = () => (
    <Row>
      <Col>
        <Form.Group controlId='CreateSubject.semNo'>
          <Form.Label>Semester Number</Form.Label>
          <Form.Control
            name='semNo'
            type='number'
            placeholder='Enter semester number'
            onChange={onChangeNum}
            value={semNo}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId='CreateSubject.listIndex'>
          <Form.Label>Index Number In List</Form.Label>
          <Form.Control
            name='listIndex'
            type='number'
            placeholder='Enter index number in list'
            onChange={onChangeNum}
            value={listIndex}
          />
        </Form.Group>
      </Col>
    </Row>
  );

  const theoryToPractical = () => (
    <Fragment>
      {reqObj.cloneTheoryFile && (
        <Form.Group controlId='CreateSubject.cloneTheoryFile'>
          <Form.Label>Cloned Theory File (Handle Server Side)</Form.Label>
          <Card>
            <Card.Body>
              <strong>File Name : </strong>
              {reqObj.cloneTheoryFile.name}
              <br />
              <strong>File Path : </strong>
              {reqObj.cloneTheoryFile.path}
              <br />
              <Button
                variant='danger'
                onClick={() => {
                  const newReqObj = reqObj;
                  newReqObj.theoryFile = { name: '', file: null, url: '' };
                  delete newReqObj.cloneTheoryFile;
                  setReqObj({
                    ...newReqObj,
                  });
                }}
              >
                Remove Theory File
              </Button>
            </Card.Body>
          </Card>
        </Form.Group>
      )}
      {theoryFile && (
        <Form.Group controlId='CreateSubject.theoryFile'>
          <Form.Label>Subject Theory File</Form.Label>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Control
                    name='theoryFile'
                    type='text'
                    placeholder='Enter file theory file title'
                    value={theoryFile.name}
                    onChange={(e) => {
                      const newTheoryFile = reqObj.theoryFile;
                      newTheoryFile.name = e.target.value;
                      setReqObj({
                        ...reqObj,
                        theoryFile: newTheoryFile,
                      });
                    }}
                  />
                </Col>
                <Col>
                  {theoryFile.file ? (
                    <Button
                      block
                      variant='danger'
                      onClick={() => {
                        setReqObj({
                          ...reqObj,
                          theoryFile: { name: '', file: null, url: '' },
                        });
                      }}
                    >
                      Remove File
                    </Button>
                  ) : (
                    <Fragment>
                      <Form.File
                        onChange={(e) => {
                          const newTheoryFile = reqObj.theoryFile;
                          newTheoryFile.file = e.target.files[0];
                          if (newTheoryFile.file.type === 'application/pdf') {
                            newTheoryFile.name = e.target.files[0].name.split(
                              '.'
                            )[0];
                            newTheoryFile.url = URL.createObjectURL(
                              e.target.files[0]
                            );
                            setReqObj({
                              ...reqObj,
                              theoryFile: newTheoryFile,
                            });
                          }
                        }}
                      />
                    </Fragment>
                  )}
                </Col>
              </Row>
              <PdfView url={theoryFile.url} />
            </Card.Body>
          </Card>
        </Form.Group>
      )}

      {reqObj.clonePracticalFile && (
        <Form.Group controlId='CreateSubject.clonePracticalFile'>
          <Form.Label>Cloned Practical File (Handle Server Side)</Form.Label>
          <Card>
            <Card.Body>
              <strong>File Name : </strong>
              {reqObj.clonePracticalFile.name}
              <br />
              <strong>File Path : </strong>
              {reqObj.clonePracticalFile.path}
              <br />
              <Button
                variant='danger'
                onClick={() => {
                  const newReqObj = reqObj;
                  newReqObj.practicalFile = { name: '', file: null, url: '' };
                  delete newReqObj.clonePracticalFile;
                  setReqObj({
                    ...newReqObj,
                  });
                }}
              >
                Remove Practical File
              </Button>
            </Card.Body>
          </Card>
        </Form.Group>
      )}

      {practicalFile && (
        <Form.Group controlId='CreateSubject.practicalFile'>
          <Form.Label>Subject Practical File</Form.Label>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Control
                    name='practicalFile'
                    type='text'
                    placeholder='Enter file practical file tilte'
                    value={practicalFile.name}
                    onChange={(e) => {
                      const newPracticalFile = reqObj.practicalFile;
                      newPracticalFile.name = e.target.value;
                      setReqObj({
                        ...reqObj,
                        practicalFile: newPracticalFile,
                      });
                    }}
                  />
                </Col>
                <Col>
                  {practicalFile.file ? (
                    <Button
                      block
                      variant='danger'
                      onClick={() => {
                        setReqObj({
                          ...reqObj,
                          practicalFile: { name: '', file: null, url: '' },
                        });
                      }}
                    >
                      Remove File
                    </Button>
                  ) : (
                    <Fragment>
                      <Form.File
                        onChange={(e) => {
                          const newPracticalFile = reqObj.practicalFile;
                          newPracticalFile.file = e.target.files[0];
                          if (
                            newPracticalFile.file.type === 'application/pdf'
                          ) {
                            newPracticalFile.name = e.target.files[0].name.split(
                              '.'
                            )[0];
                            newPracticalFile.url = URL.createObjectURL(
                              e.target.files[0]
                            );
                            setReqObj({
                              ...reqObj,
                              practicalFile: newPracticalFile,
                            });
                          }
                        }}
                      />
                    </Fragment>
                  )}
                </Col>
              </Row>
              <PdfView url={practicalFile.url} />
            </Card.Body>
          </Card>
        </Form.Group>
      )}
    </Fragment>
  );

  const cloneFileToFile = () => (
    <Fragment>
      {reqObj.cloneFiles && Array.isArray(reqObj.cloneFiles) && (
        <Form.Group controlId='CreateSubject.cloneFiles'>
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
      <Form.Group controlId='CreateSubject.files'>
        <Form.Label>Upload Subject Related Files</Form.Label>
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
  );

  const validateData = () => {
    const alertArray = [];
    if (subjectCode === '') {
      alertArray.push(['Subject Code should not be Empty', 'danger']);
    } else if (!/^[a-zA-Z0-9-_() .]+$/.test(subjectCode)) {
      alertArray.push([
        'Subject Code only Alphanumeric and - _ ( ) . Allowed',
        'danger',
      ]);
    }

    if (subjectName === '') {
      alertArray.push(['Subject Name should not be Empty', 'danger']);
    } else if (!/^[a-zA-Z0-9-_() .]+$/.test(subjectName)) {
      alertArray.push([
        'Subject Name only Alphanumeric and - _ ( ) . characters Allowed',
        'danger',
      ]);
    }

    if (subjectShort === '') {
      alertArray.push(['Subject Short is Empty', 'warning']);
    } else if (!/^[a-zA-Z0-9-_() .]+$/.test(subjectShort)) {
      alertArray.push([
        'Subject Short only Alphanumeric and - _ ( ) . characters Allowed',
        'danger',
      ]);
    }

    if (subjectDescription === '') {
      alertArray.push(['Subject Description (Optional) is Empty', 'warning']);
    } else if (
      !/^([a-zA-Z0-9 _.\-~!@#$%^&*()_+{}[\]|\\:;"'<,>.?/`\n=]+)$/.test(
        subjectDescription
      )
    ) {
      alertArray.push([
        'Subject Description only Alphanumeric and _ . - ~ ! @ # $ % ^ & * ( ) _ + { } [ ] | \\ : ; " \' < , > . ? / ` \\n characters Allowed',
        'danger',
      ]);
    }

    if (department === 'None') {
      alertArray.push(['Subject Department should not be Empty', 'danger']);
    } else if (department === 'Keep Empty For Now') {
      alertArray.push([
        'Subject Department is set to Empty purposefully.',
        'waring',
      ]);
    }

    if (subjectType === 'None') {
      alertArray.push(['Subject Type should not be Empty', 'danger']);
    } else if (subjectType === 'Keep Empty For Now') {
      alertArray.push(['Subject Type is set to Empty purposefully.', 'waring']);
    }

    if (isFreezed === true) {
      alertArray.push([
        'Subject Freezed will make subject editable by Admin only',
        'warning',
      ]);
    }

    if (semNo === 0) {
      alertArray.push(['Subject Semester Number is zero', 'warning']);
    }

    if (listIndex === 0) {
      alertArray.push(['Subject Index Number In List is zero', 'warning']);
    }

    if (headMasterJSON.points.reduce((a, b) => a + b) === 0) {
      alertArray.push(['Head Master look like Empty', 'warning']);
    }

    if (!reqObj.cloneTheoryFile) {
      if (theoryFile.file === null) {
        alertArray.push(['Subject Theory File is not Uploaded', 'warning']);
      } else if (theoryFile.file.type !== 'application/pdf') {
        alertArray.push([
          'Subject Theory File should be in PDF formate',
          'danger',
        ]);
      }
    }

    if (!reqObj.clonePracticalFile) {
      if (practicalFile.file === null) {
        alertArray.push(['Subject Practical File is not Uploaded', 'warning']);
      } else if (practicalFile.file.type !== 'application/pdf') {
        alertArray.push([
          'Subject Practical File should be in PDF formate',
          'danger',
        ]);
      }
    }

    files.forEach((file, index) => {
      if (file.file === null) {
        alertArray.push([
          `Number ${index + 1} Subject Related File is Empty`,
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
              <Alert variant='success'>Error Free, Can Create Subject</Alert>
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
          <strong>Subject Data</strong>
        </h4>
        <SubjectReqView reqObj={reqObj} />
        {noOfDanger === 0 && (
          <Fragment>
            <Button
              variant='primary'
              onClick={() => {
                const { theoryFile, practicalFile, ...rest } = reqObj;

                if (theoryFile && theoryFile.file !== null) {
                  rest.theoryFile = theoryFile;
                }

                if (practicalFile && practicalFile.file !== null) {
                  rest.practicalFile = practicalFile;
                }
                console.log(rest);
                createSubject(rest);
              }}
            >
              Create Subject
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
            Back To Create Subject
          </Button>
          {validateData()}
        </div>
      ) : (
        <Form onSubmit={onSubmit}>
          <h3>
            <strong>{iconCreate} Create Subject</strong>
          </h3>
          {updateNo()}
          {nameToDescription()}
          {departmentToProperty()}
          {semNoToListIndex()}
          <Form.Group controlId='CreateSubject.headMasterJSON'>
            <Form.Label>Head Master</Form.Label>
            <HaedMasterJSONInput reqObj={reqObj} setReqObj={setReqObj} />
          </Form.Group>
          {theoryToPractical()}
          {cloneFileToFile()}
          <Button variant='primary' type='submit'>
            Review Input
          </Button>{' '}
          <Button variant='secondary' type='reset' onClick={clearData}>
            Clear
          </Button>
        </Form>
      )}
    </Fragment>
  );
};

CreateSubject.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default CreateSubject;
