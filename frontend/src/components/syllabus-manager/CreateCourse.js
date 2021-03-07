import React, { Fragment, useState, useContext, useEffect } from 'react';
import {
  Form,
  Button,
  Card,
  Badge,
  InputGroup,
  FormControl,
  Table,
} from 'react-bootstrap';
import SubjectContext from '../../context/subject/subjectContext';
import CourseContext from '../../context/course/courseContext';
import CourseCardView from '../dashboard/CourseCardView';

const CreateCourse = () => {
  const subjectContext = useContext(SubjectContext);
  const courseContext = useContext(CourseContext);

  const { subjects, getSubjects, clearSubjects } = subjectContext;
  const { createCourse, getCourses, clearCourses, courses } = courseContext;

  const [searchQueryC, setSearchQueryC] = useState({
    search: '',
    attributes: { isOutdated: false },
    select: 'courseCode',
  });

  useEffect(() => {
    console.log('useEffect');
    clearCourses();
    // eslint-disable-next-line
  }, [searchQueryC.search]);

  const [isClone, setIsClone] = useState(false);

  const [searchQuery, setSearchQuery] = useState({
    search: '',
    attributes: { isOutdated: false },
    select: 'subjectCode,subjectName,subjectShort,department',
  });
  const { search } = searchQuery;
  useEffect(() => {
    clearSubjects();
    // eslint-disable-next-line
  }, [search]);
  const [reqObj, setReqObj] = useState({
    course: {
      courseCode: '',
      courseDescription: '',
      courseType: 'None',
      department: 'None',
      courseLength: 0,
      noOfSemesters: 0,
      updateNo: 0,
    },
    subjects: [],
  });
  const {
    courseCode,
    courseDescription,
    courseType,
    department,
    courseLength,
    noOfSemesters,
  } = reqObj.course;

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSelectionChange = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedSubjects(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      courseCode === '' ||
      courseType === 'None' ||
      department === 'None' ||
      courseLength === 0 ||
      noOfSemesters === 0
    ) {
      console.log('Enter proper data');
    } else {
      createCourse(reqObj);
    }
  };

  const onChange = (e) => {
    if (e.target.name === 'courseLength' || e.target.name === 'noOfSemesters') {
      setReqObj({
        ...reqObj,
        course: {
          ...reqObj.course,
          [e.target.name]: isNaN(parseInt(e.target.value))
            ? 0
            : parseInt(e.target.value),
        },
      });
    } else {
      setReqObj({
        ...reqObj,
        course: {
          ...reqObj.course,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const onClear = (e) => {
    setReqObj({
      course: {
        courseCode: '',
        courseDescription: '',
        courseType: 'None',
        department: 'None',
        courseLength: 0,
        noOfSemesters: 0,
        updateNo: 0,
      },
      subjects: [],
    });
    setSelectedSubjects([]);
    setSearchQuery({
      search: '',
      attributes: [['isOutdated', 'fasle']],
      select: 'subjectCode,subjectName,subjectShort,department',
    });
  };

  const onChangeSemNo = (e) => {
    const subjects = reqObj.subjects;
    subjects[parseInt(e.target.name)].semNo = isNaN(parseInt(e.target.value))
      ? 0
      : parseInt(e.target.value);
    setReqObj({
      ...reqObj,
      subjects: subjects,
    });
    sortSubjects();
  };
  const handleFocus = (e) => e.target.select();

  const onSearchInputChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      search: e.target.value,
    });
  };

  const onSearch = (e) => {
    getSubjects(searchQuery);
  };

  const sortSubjects = () => {
    const subjects = reqObj.subjects;
    subjects.sort((a, b) => a.semNo - b.semNo);
    setReqObj({
      ...reqObj,
      subjects,
    });
  };

  const onRemove = (e) => {
    const subjects = reqObj.subjects;
    subjects.splice(parseInt(e.target.name), 1);
    setReqObj({
      ...reqObj,
      subjects: subjects,
    });
    // array.splice
    sortSubjects();
  };

  const onAddSubjects = (e) => {
    const newSubjects = reqObj.subjects;
    selectedSubjects.forEach((ss) => {
      const ssCode = ss.split(',')[0];
      if (
        newSubjects
          .map((obj) => {
            return obj.subjectCode;
          })
          .indexOf(ssCode) === -1
      ) {
        newSubjects.push({
          subjectCode: ssCode,
          subjectName: ss.split(',').pop(),
          semNo: 1,
          alreadyExists: true,
        });
      }
    });
    setReqObj({
      ...reqObj,
      subjects: newSubjects,
    });
    sortSubjects();
  };

  const onSearchInputChangeC = (e) => {
    setSearchQueryC({
      ...searchQueryC,
      search: e.target.value,
    });
  };

  const onSearchC = (e) => {
    getCourses(searchQueryC);
  };

  const onGet = (e) => {
    getCourses({
      search: e.target.name,
      nestSelect: 'subjectCode,subjectName,subjectShort',
    });
    setIsClone(true);
  };

  const onClone = (e) => {
    const cloneSubjects = [];
    courses[0].Subjects.forEach((sub) => {
      cloneSubjects.push({
        subjectCode: sub.subjectCode,
        subjectName: sub.subjectName,
        semNo: sub.CourseSubject.semNo,
        alreadyExists: true,
      });
    });
    setReqObj({
      course: {
        courseCode: '',
        courseDescription:
          courses[0].courseDescription !== null
            ? courses[0].courseDescription
            : '',
        courseType:
          courses[0].courseType !== null ? courses[0].courseType : 'None',
        department:
          courses[0].department !== null ? courses[0].department : 'None',
        courseLength:
          courses[0].courseLength !== null ? courses[0].courseLength : 0,
        noOfSemesters:
          courses[0].noOfSemesters !== null ? courses[0].noOfSemesters : 0,
        updateNo: courses[0].updateNo !== null ? courses[0].updateNo : 0,
      },
      subjects: cloneSubjects,
    });
  };

  const getMode = (
    <Form>
      <Card bg='light'>
        <Card.Body>
          <Form.Group controlId='ccCourseSearch'>
            <Form.Label>Search Courses</Form.Label>
            <InputGroup className='mb-3'>
              <FormControl
                name='searchQuery'
                type='text'
                placeholder='Search by Course Code'
                value={searchQueryC.search}
                onChange={onSearchInputChangeC}
              />
              <InputGroup.Append>
                <Button variant='outline-success' onClick={onSearchC}>
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId='ccSearchResult'>
            <Form.Label>Select Course</Form.Label>
            {courses &&
              courses.map((course, index) => {
                return (
                  <div key={index} style={{ paddingBottom: '8px' }}>
                    <Button
                      name={course.courseCode}
                      variant='info'
                      onClick={onGet}
                    >
                      Get
                    </Button>{' '}
                    {course.courseCode}
                  </div>
                );
              })}
          </Form.Group>
        </Card.Body>
      </Card>
    </Form>
  );

  const cloneMode = courses && (
    <Card bg='light'>
      <Card.Body>
        <div>
          Clone Following Subject{' '}
          <Button variant='success' onClick={onClone}>
            Clone
          </Button>{' '}
          <Button
            variant='warning'
            onClick={(e) => {
              setIsClone(false);
            }}
          >
            Back to Search
          </Button>{' '}
          (Will not clone files)
        </div>
        {CourseCardView(courses[0], 0)}
      </Card.Body>
    </Card>
  );

  return (
    <Fragment>
      <h3>Clone Course</h3>
      {isClone ? cloneMode : getMode}
      <hr />
      <h3>Create Course</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='smCourseCode'>
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            name='courseCode'
            type='text'
            placeholder='Enter new course code'
            value={courseCode}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId='smCourseDescription'>
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            name='courseDescription'
            as='textarea'
            placeholder='Enter course description (optional)'
            rows={5}
            value={courseDescription}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId='smCourseLength'>
          <Form.Label>Course Length (No Of Months)</Form.Label>
          <Form.Control
            name='courseLength'
            type='number'
            placeholder='Enter new course length'
            value={courseLength}
            onChange={onChange}
            onFocus={handleFocus}
          />
        </Form.Group>
        <Form.Group controlId='smNoOfSemesters'>
          <Form.Label>No Of Semesters</Form.Label>
          <Form.Control
            name='noOfSemesters'
            type='number'
            placeholder='Enter new no of semesters'
            value={noOfSemesters}
            onChange={onChange}
            onFocus={handleFocus}
          />
        </Form.Group>
        <Form.Group controlId='smCourseType'>
          <Form.Label>Course Type</Form.Label>
          <Form.Control
            name='courseType'
            as='select'
            value={courseType}
            onChange={onChange}
          >
            <option>None</option>
            <option>B.Tech</option>
            <option>M.Tech</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='smDepartment'>
          <Form.Label>Department</Form.Label>
          <Form.Control
            name='department'
            as='select'
            value={department}
            onChange={onChange}
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
        <Card bg='light'>
          <Card.Body>
            <Form.Group controlId='smSubjectSearch'>
              <Form.Label>Search Subjects</Form.Label>
              <InputGroup className='mb-3'>
                <FormControl
                  name='searchQuery'
                  type='text'
                  placeholder='Search by Subject Code, Subject Name, Subject Short'
                  value={search}
                  onChange={onSearchInputChange}
                />
                <InputGroup.Append>
                  <Button variant='outline-success' onClick={onSearch}>
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId='smSearchResult'>
              <Form.Label>
                Select Subjects (Use Ctrl/Shift for multiple selection)
              </Form.Label>
              <Form.Control
                as='select'
                multiple
                onChange={handleSelectionChange}
                htmlSize={5}
              >
                {subjects &&
                  subjects.map((sub, index) => {
                    return (
                      <option key={index}>
                        {sub.subjectCode},{sub.subjectName} ({sub.subjectShort})
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>
            <Button variant='success' onClick={onAddSubjects}>
              Add Subjects
            </Button>{' '}
            <Badge variant='primary'>
              No of Subjects: {reqObj.subjects.length}
            </Badge>
            <hr />
            <Form.Group controlId='smSubjects'>
              <Form.Label>Assign Appropriate Semester Number</Form.Label>
              <div
                className='float-right'
                style={{ paddingBottom: '8px', paddingTop: '8px' }}
              >
                <Button
                  variant='warning'
                  size='sm'
                  onClick={(e) => {
                    sortSubjects();
                  }}
                >
                  <strong>Sort By Semester Number</strong>
                </Button>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject Code</th>
                    <th>Subject Name (Subject Short)</th>
                    <th>Semester Number</th>
                    <th>Remove Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {reqObj.subjects.map((sub, index) => (
                    <tr key={index}>
                      <td width='5%'>{index + 1}</td>
                      <td width='15%'>{sub.subjectCode}</td>
                      <td width='60%'>{sub.subjectName}</td>
                      <td width='10%'>
                        <FormControl
                          name={index}
                          type='number'
                          value={sub.semNo}
                          onChange={onChangeSemNo}
                          onFocus={handleFocus}
                        />
                      </td>
                      <td width='10%'>
                        <Button
                          variant='danger'
                          size='sm'
                          block
                          name={index}
                          onClick={onRemove}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form.Group>
          </Card.Body>
        </Card>
        <br />
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

export default CreateCourse;
