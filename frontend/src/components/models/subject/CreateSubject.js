import React, { useState, useContext } from 'react';
import { Form, Button, Table, Card, Row, Col } from 'react-bootstrap';
import SubjectContext from '../../../context/subject/subjectContext';
import { iconCreate } from '../../layout/Icon';

// Utils
import s2pn from '../../../utils/s2pn';
import cellMaker from '../../../utils/cellMaker';
import cellMakerHeadGroups from '../../../utils/cellMakerHeadGroups';
import editableCellMaker from '../../../utils/editableCellMaker';

// TODO V1 Create Subject
const CreateSubject = () => {
  const subjectContext = useContext(SubjectContext);
  const {
    createSubject,
    // clearSubjects,
    // getSubjects,
    // subjects,
  } = subjectContext;

  // const [searchQuery, setSearchQuery] = useState({
  //   search: '',
  //   attributes: { isOutdated: false },
  //   select: 'subjectCode,subjectName,subjectShort,department',
  // });
  // const { search } = searchQuery;

  // const [isClone, setIsClone] = useState(false);

  // useEffect(() => {
  //   clearSubjects();
  //   // eslint-disable-next-line
  // }, [search]);

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
    semNo: 0,
    listIndex: 0,
    updateNo: 0,
    isOutdated: false,
    isFreezed: false,
    files: [{ name: '', file: null }],
    // successorId: '',
    // predecessor: '',
  });
  const {
    subjectCode,
    subjectName,
    subjectShort,
    subjectDescription,
    department,
    headMasterJSON,
    // theory,
    // isElective,
    // practical,
    semNo,
    listIndex,
    // updateNo,
    // isOutdated,
    // isFreezed,
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

  // Related to HaedMasterJSON
  const changeCellValue = (e) => {
    const tempPointsArray = reqObj.headMasterJSON.points;
    // TODO s2pf
    tempPointsArray[parseInt(e.target.name)] = s2pn(e.target.value);
    setReqObj({
      ...reqObj,
      headMasterJSON: {
        ...reqObj.headMasterJSON,
        points: tempPointsArray,
      },
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
    setReqObj({
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
      semNo: 0,
      listIndex: 0,
      updateNo: 0,
      isOutdated: false,
      isFreezed: false,
      files: [{ name: '', file: null }],
    });
  };

  // Fires Create Query
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
  // const onSearchInputChange = (e) => {
  //   setSearchQuery({
  //     ...searchQuery,
  //     search: e.target.value,
  //   });
  // };

  // const onSearch = (e) => {
  //   getSubjects(searchQuery);
  // };

  // const onGet = (e) => {
  //   getSubjects({
  //     search: e.target.name,
  //   });
  //   setIsClone(true);
  // };

  // const onClone = (e) => {
  //   const {
  //     subjectName,
  //     subjectShort,
  //     subjectDescription,
  //     department,
  //     headMasterJSON,
  //     theory,
  //     isElective,
  //     practical,
  //   } = subjects[0];
  //   setReqObj({
  //     subjectCode: '',
  //     subjectName: subjectName !== null ? subjectName : '',
  //     subjectShort: subjectShort !== null ? subjectShort : '',
  //     subjectDescription: subjectDescription !== null ? subjectDescription : '',
  //     department: department !== null ? department : 'None',
  //     headMasterJSON:
  //       headMasterJSON !== null
  //         ? headMasterJSON
  //         : {
  //             headMasters: [
  //               'Lecture',
  //               'Tutorial',
  //               'Practical',
  //               'L+T',
  //               'P',
  //               'Total CS',
  //               'Theory',
  //               'Sessional',
  //               'Practical',
  //               'Term Work',
  //               'Total ES',
  //             ],
  //             headGroups: [
  //               'Teaching Scheme',
  //               'Teaching Scheme',
  //               'Teaching Scheme',
  //               'Credit Structure',
  //               'Credit Structure',
  //               'Credit Structure',
  //               'Exam Scheme',
  //               'Exam Scheme',
  //               'Exam Scheme',
  //               'Exam Scheme',
  //               'Exam Scheme',
  //             ],
  //             points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //           },
  //     theory: theory !== null ? theory : '',
  //     isElective: isElective !== null ? isElective : false,
  //     practical: practical !== null ? practical : '',
  //     files: [{ name: '', file: null }],
  //   });
  // };

  // const getMode = (
  //   <Form>
  //     <Card bg='light'>
  //       <Card.Body>
  //         <Form.Group controlId='smSubjectSearch'>
  //           <Form.Label>Search Subjects</Form.Label>
  //           <InputGroup className='mb-3'>
  //             <FormControl
  //               name='searchQuery'
  //               type='text'
  //               placeholder='Search by Subject Code, Subject Name, Subject Short'
  //               value={search}
  //               onChange={onSearchInputChange}
  //             />
  //             <InputGroup.Append>
  //               <Button variant='outline-success' onClick={onSearch}>
  //                 Search
  //               </Button>
  //             </InputGroup.Append>
  //           </InputGroup>
  //         </Form.Group>
  //         <Form.Group controlId='smSearchResult'>
  //           <Form.Label>Select Subject</Form.Label>
  //           {subjects &&
  //             subjects.map((sub, index) => {
  //               return (
  //                 <div key={index} style={{ paddingBottom: '8px' }}>
  //                   <Button
  //                     name={sub.subjectCode}
  //                     variant='info'
  //                     onClick={onGet}
  //                   >
  //                     Get
  //                   </Button>{' '}
  //                   {sub.subjectCode},{sub.subjectName} ({sub.subjectShort})
  //                 </div>
  //               );
  //             })}
  //         </Form.Group>
  //       </Card.Body>
  //     </Card>
  //   </Form>
  // );

  // const cloneMode = subjects && (
  //   <Card bg='light'>
  //     <Card.Body>
  //       <div>
  //         Clone Following Subject{' '}
  //         <Button variant='success' onClick={onClone}>
  //           Clone
  //         </Button>{' '}
  //         <Button
  //           variant='warning'
  //           onClick={(e) => {
  //             setIsClone(false);
  //           }}
  //         >
  //           Back to Search
  //         </Button>{' '}
  //         (Will not clone files)
  //       </div>
  //       {SubjectCardView(subjects[0], 0)}
  //     </Card.Body>
  //   </Card>
  // );
  return (
    <Form onSubmit={onSubmit}>
      <h3>
        <strong>{iconCreate} Create Subject</strong>
      </h3>
      <Form.Group controlId='CreateSubject.subjectCode'>
        <Form.Label>Subject Code</Form.Label>
        <Form.Control
          name='subjectCode'
          type='text'
          placeholder='Enter new subject code'
          onChange={onChange}
          value={subjectCode}
        />
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
      <Form.Group controlId='CreateSubject.department'>
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
      <Form.Group controlId='CreateSubject.headMasterJSON'>
        <Form.Label>Head Master</Form.Label>
        <Table striped bordered hover>
          <thead>
            <tr>{cellMakerHeadGroups(headMasterJSON.headGroups)}</tr>
          </thead>
          <thead>
            <tr>{cellMaker(headMasterJSON.headMasters)}</tr>
          </thead>
          <tbody>
            <tr>{editableCellMaker(headMasterJSON.points, changeCellValue)}</tr>
          </tbody>
        </Table>
      </Form.Group>
      <Form.Group controlId='CreateSubject.subjectProperty'>
        <Form.Label>Subject Property</Form.Label>
        <Card>
          <Card.Body>
            <Form.Check
              name='isElective'
              type='checkbox'
              label='Is Elective ?'
              onChange={onChangeCheckBox}
            />
            <Form.Check
              name='isOutdated'
              type='checkbox'
              label='Is Outdated ?'
              onChange={onChangeCheckBox}
            />
            <Form.Check
              name='isFreezed'
              type='checkbox'
              label='Is Freezed ?'
              onChange={onChangeCheckBox}
            />
          </Card.Body>
        </Card>
      </Form.Group>
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
      {/* <Form.Group controlId='smTheory'>
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
        </Form.Group> */}
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
  );
};

export default CreateSubject;
