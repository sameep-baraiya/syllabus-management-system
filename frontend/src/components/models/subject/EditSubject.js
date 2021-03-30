import React, { useState, useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Card,
  Table,
  Alert,
} from 'react-bootstrap';

// Context
import SubjectContext from '../../../context/subject/subjectContext';
import ConfigContext from '../../../context/config/configContext';

// Layout
import { iconEdit, iconValidate, iconCopy } from '../../layout/Icon';
import PdfView from '../../layout/PdfView';

// Utils
import s2pn from '../../../utils/s2pn';
import {
  departmentTypeOptions,
  subjectTypeOptions,
} from '../../../utils/configUtils';

// TODO This
// Subject Model Componets
// import HaedMasterJSONInput from './HaedMasterJSONInput';
// import SubjectReqView from './SubjectReqView';

const EditSubject = ({ mode, setMode }) => {
  const subjectContext = useContext(SubjectContext);
  const { subject, updateSubject } = subjectContext;

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

  const initialUpdateObj = {
    subjectCode: true,
    subjectName: true,
    subjectShort: true,
    subjectType: true,
    subjectDescription: true,
    department: true,
    headMasterJSON: true,
    theoryFile: true,
    isElective: true,
    practicalFile: true,
    semNo: true,
    listIndex: true,
    isOutdated: true,
    isFreezed: true,
    files: true,
    updateNo: true,
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

  // Go for validation
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

  const doOriginal = () => {
    // setReqObj({
    //   ...reqObj,
    //   original: {
    //     ...subject,
    //   },
    // });
    doClone(true);
  };

  const doClone = (originalFlag = false) => {
    const originalCase = {};

    if (originalFlag) {
      originalCase.original = { ...subject };
    }

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
      ...originalCase,
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
    } else if (mode === 'original') {
      doOriginal();
    }
  };

  useEffect(() => {
    onModeChange();
    // eslint-disable-next-line
  }, [mode]);

  const uiSubjectUpdateNo = () => (
    <div>
      <div className='mb-2'>
        <strong>&#9658; Version Of Subject (Read Only)</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Version No:{' '}
                {reqObj.original.updateNo && reqObj.original.updateNo}
              </div>
              {keepOG('updateNo')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          {!uObj.updateNo && (
            <Table bordered>
              <tbody>
                <tr>
                  <td className='table-secondary'>Predecessor Subject</td>
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
                    Predecessor Version :{' '}
                    {reqObj.predecessor && reqObj.predecessor.updateNo}
                  </td>
                </tr>
                <tr>
                  <td className='table-secondary'> Current Subject</td>
                  <td>
                    {subjectCode}: {subjectName}({subjectShort})
                  </td>

                  <td>Current Version : (auto identify)</td>
                </tr>
                <tr>
                  <td className='table-secondary'>Successor Subject</td>
                  {reqObj.successor ? (
                    <td>
                      {reqObj.successor.subjectCode}:{' '}
                      {reqObj.successor.subjectName}(
                      {reqObj.successor.subjectCode})
                    </td>
                  ) : (
                    <td>None Successor</td>
                  )}
                  <td>
                    Successor Version :{' '}
                    {reqObj.successor && reqObj.successor.updateNo}
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );

  const uiSubjectCode = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Code</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Subject Code:{' '}
                {reqObj.original.subjectCode && reqObj.original.subjectCode}
                {copySpan('subjectCode')}
              </div>
              {keepOG('subjectCode')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditSubject.subjectCode'>
            <InputGroup>
              <Form.Control
                name='subjectCode'
                type='text'
                placeholder='Enter new subject code'
                onChange={onChange}
                value={subjectCode}
                disabled={uObj.subjectCode}
              />
              <InputGroup.Append>
                <Button
                  variant='secondary'
                  disabled={uObj.subjectCode}
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
        </Col>
      </Row>
    </div>
  );

  const uiSubjectName = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Name</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Subject Name:{' '}
                {reqObj.original.subjectName && reqObj.original.subjectName}
                {copySpan('subjectName')}
              </div>
              {keepOG('subjectName')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditSubject.subjectName'>
            <Form.Control
              name='subjectName'
              type='text'
              placeholder='Enter subject name'
              onChange={onChange}
              value={subjectName}
              disabled={uObj.subjectName}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiSubjectShort = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Short</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Subject Short:{' '}
                {reqObj.original.subjectShort && reqObj.original.subjectShort}
                {copySpan('subjectShort')}
              </div>
              {keepOG('subjectShort')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditSubject.subjectShort'>
            <Form.Control
              name='subjectShort'
              type='text'
              placeholder='Enter subject short'
              onChange={onChange}
              value={subjectShort}
              disabled={uObj.subjectShort}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiSubjectDescription = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Description</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Subject Description:{' '}
                {reqObj.original.subjectDescription &&
                  reqObj.original.subjectDescription}
                {copySpan('subjectDescription')}
              </div>
              {keepOG('subjectDescription')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditSubject.subjectDescription'>
            <Form.Control
              name='subjectDescription'
              as='textarea'
              placeholder='Enter subject description (optional)'
              rows={5}
              onChange={onChange}
              value={subjectDescription}
              disabled={uObj.subjectDescription}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiSubjectDepartment = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Department</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Subject Department:{' '}
                {reqObj.original.department && reqObj.original.department}
                {copySpan('department')}
              </div>
              {keepOG('department')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditSubject.department'>
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

  const uiSubjectType = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Type</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Subject Type:{' '}
                {reqObj.original.subjectType && reqObj.original.subjectType}
                {copySpan('subjectType')}
              </div>
              {keepOG('subjectType')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditSubject.subjectType'>
            <Form.Control
              name='subjectType'
              as='select'
              onChange={onChange}
              value={subjectType}
              disabled={uObj.subjectType}
            >
              <option>None</option>
              {subjectTypeOptions(subjectTypeArr)}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiSubjectProperty = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Property</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Is Elective: {reqObj.original.isElective ? 'Yes' : 'No'}
                {keepOG('isElective')}
                <br />
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
          <Form.Group controlId='EditSubject.subjectProperty'>
            <Card>
              <Card.Body>
                <Form.Check
                  name='isElective'
                  type='checkbox'
                  label='Is Elective ?'
                  checked={isElective}
                  onChange={onChangeCheckBox}
                  disabled={uObj.isElective}
                />
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

  const uiSubjectSemNo = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Semester Number</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Semester Number:{' '}
                {reqObj.original.semNo && reqObj.original.semNo}
                {copySpan('semNo')}
              </div>
              {keepOG('semNo')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditSubject.semNo'>
            <Form.Control
              name='semNo'
              type='number'
              placeholder='Enter semester number'
              onChange={onChangeNum}
              value={semNo}
              disabled={uObj.semNo}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiSubjectListIndex = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Index Number In List</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Index Number In List:{' '}
                {reqObj.original.listIndex && reqObj.original.listIndex}
                {copySpan('listIndex')}
              </div>
              {keepOG('listIndex')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Form.Group controlId='EditSubject.listIndex'>
            <Form.Control
              name='listIndex'
              type='number'
              placeholder='Enter index number in list'
              onChange={onChangeNum}
              value={listIndex}
              disabled={uObj.listIndex}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const uiSubjectTheoryFile = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Theory File</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Theory File Name:
                <br />
                {reqObj.original.theoryFile && reqObj.original.theoryFile.name}
                <hr />
                Theory File Path:
                <br />
                {reqObj.original.theoryFile && reqObj.original.theoryFile.path}
              </div>
              {keepOG('theoryFile')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          {!uObj.theoryFile && (
            <Fragment>
              {reqObj.cloneTheoryFile && (
                <Form.Group controlId='EditSubject.cloneTheoryFile'>
                  <Form.Label>
                    Cloned Theory File (Handle Server Side)
                  </Form.Label>
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
                          newReqObj.theoryFile = {
                            name: '',
                            file: null,
                            url: '',
                          };
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
                <Form.Group controlId='EditSubject.theoryFile'>
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
                                  if (
                                    newTheoryFile.file.type ===
                                    'application/pdf'
                                  ) {
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
            </Fragment>
          )}
        </Col>
      </Row>
    </div>
  );

  const uiSubjectPracticalFile = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject Practical File</strong>
      </div>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div>
                Practical File Name:
                <br />
                {reqObj.original.practicalFile &&
                  reqObj.original.practicalFile.name}
                <hr />
                Practical File Path:
                <br />
                {reqObj.original.practicalFile &&
                  reqObj.original.practicalFile.path}
              </div>
              {keepOG('practicalFile')}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          {!uObj.practicalFile && (
            <Fragment>
              {reqObj.clonePracticalFile && (
                <Form.Group controlId='EditSubject.clonePracticalFile'>
                  <Form.Label>
                    Cloned Practical File (Handle Server Side)
                  </Form.Label>
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
                          newReqObj.practicalFile = {
                            name: '',
                            file: null,
                            url: '',
                          };
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
                <Form.Group controlId='EditSubject.practicalFile'>
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
                                  practicalFile: {
                                    name: '',
                                    file: null,
                                    url: '',
                                  },
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
                                    newPracticalFile.file.type ===
                                    'application/pdf'
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
          )}
        </Col>
      </Row>
    </div>
  );

  const uiSubjectFile = () => (
    <div>
      <div className='mb-2 mt-2'>
        <strong>&#9658; Subject File</strong>
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
                <Form.Group controlId='EditSubject.cloneFiles'>
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
              <Form.Group controlId='EditSubject.files'>
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
          )}
        </Col>
      </Row>
    </div>
  );

  const uiForm = () => {
    return reqObj.original ? (
      <Form onSubmit={onSubmit}>
        <h3>
          <strong>{iconEdit} Edit Subject</strong>
        </h3>
        <Row>
          <Col lg={3}>
            <h4 className='text-muted'>Original Subject</h4>
          </Col>
          <Col lg={9}>
            <h4 className='text-muted'>Edited Subject</h4>
          </Col>
        </Row>
        {uiSubjectUpdateNo()}
        {uiSubjectCode()}
        {uiSubjectName()}
        {uiSubjectShort()}
        {uiSubjectDescription()}
        {uiSubjectDepartment()}
        {uiSubjectType()}
        {uiSubjectProperty()}
        {uiSubjectSemNo()}
        {uiSubjectListIndex()}
        {uiSubjectTheoryFile()}
        {uiSubjectPracticalFile()}
        {uiSubjectFile()}
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
          Set Original Subject First to proceed forward
        </Alert>
      </Fragment>
    );
  };

  const validateData = () => {
    const alertArray = [];
    if (uObj.subjectCode === false) {
      if (subjectCode === '') {
        alertArray.push(['Subject Code should not be Empty', 'danger']);
      } else if (!/^[a-zA-Z0-9-_() .]+$/.test(subjectCode)) {
        alertArray.push([
          'Subject Code only Alphanumeric and - _ ( ) . Allowed',
          'danger',
        ]);
      }
    }

    if (uObj.subjectName === false) {
      if (subjectName === '') {
        alertArray.push(['Subject Name should not be Empty', 'danger']);
      } else if (!/^[a-zA-Z0-9-_() .]+$/.test(subjectName)) {
        alertArray.push([
          'Subject Name only Alphanumeric and - _ ( ) . characters Allowed',
          'danger',
        ]);
      }
    }

    if (uObj.subjectShort === false) {
      if (subjectShort === '') {
        alertArray.push(['Subject Short is Empty', 'warning']);
      } else if (!/^[a-zA-Z0-9-_() .]+$/.test(subjectShort)) {
        alertArray.push([
          'Subject Short only Alphanumeric and - _ ( ) . characters Allowed',
          'danger',
        ]);
      }
    }

    if (uObj.subjectDescription === false) {
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
    }

    if (uObj.department === false) {
      if (department === 'None') {
        alertArray.push(['Subject Department should not be Empty', 'danger']);
      } else if (department === 'Keep Empty For Now') {
        alertArray.push([
          'Subject Department is set to Empty purposefully.',
          'waring',
        ]);
      }
    }

    if (uObj.subjectType === false) {
      if (subjectType === 'None') {
        alertArray.push(['Subject Type should not be Empty', 'danger']);
      } else if (subjectType === 'Keep Empty For Now') {
        alertArray.push([
          'Subject Type is set to Empty purposefully.',
          'waring',
        ]);
      }
    }

    if (uObj.isFreezed === false) {
      if (isFreezed === true) {
        alertArray.push([
          'Subject Freezed will make subject editable by Admin only',
          'warning',
        ]);
      }
    }

    if (uObj.semNo === false) {
      if (semNo === 0) {
        alertArray.push(['Subject Semester Number is zero', 'warning']);
      }
    }

    if (uObj.listIndex === false) {
      if (listIndex === 0) {
        alertArray.push(['Subject Index Number In List is zero', 'warning']);
      }
    }

    if (uObj.headMasterJSON === false) {
      if (headMasterJSON.points.reduce((a, b) => a + b) === 0) {
        alertArray.push(['Head Master look like Empty', 'warning']);
      }
    }

    if (uObj.theoryFile === false) {
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
    }

    if (uObj.practicalFile === false) {
      if (!reqObj.clonePracticalFile) {
        if (practicalFile.file === null) {
          alertArray.push([
            'Subject Practical File is not Uploaded',
            'warning',
          ]);
        } else if (practicalFile.file.type !== 'application/pdf') {
          alertArray.push([
            'Subject Practical File should be in PDF formate',
            'danger',
          ]);
        }
      }
    }

    if (uObj.files === false) {
      files.forEach((file, index) => {
        if (file.file === null) {
          alertArray.push([
            `Number ${index + 1} Subject Related File is Empty`,
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
              <Alert variant='success'>Error Free, Can Edit Subject</Alert>
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
                // Keeping only modifed value in request object
                Object.keys(reqObj.original).forEach((key, index) => {
                  if (uObj[key] === true) {
                    delete rest[key];
                  }
                });

                // Clone Cases
                if (uObj.theoryFile === true) {
                  delete rest.cloneTheoryFile;
                }
                if (uObj.practicalFile === true) {
                  delete rest.clonePracticalFile;
                }
                if (uObj.files === true) {
                  delete rest.cloneFiles;
                }

                // Seting id
                rest.id = rest.original.id;

                // Original Case
                delete rest.original;

                console.log(rest);
                updateSubject(rest);
              }}
            >
              Edit Subject
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
            Back To Edit Subject
          </Button>
          {validateData()}
        </div>
      ) : (
        uiForm()
      )}
    </div>
  );
};

EditSubject.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default EditSubject;
