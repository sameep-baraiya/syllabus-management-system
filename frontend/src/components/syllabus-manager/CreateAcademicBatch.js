import React, { Fragment, useContext, useState, useEffect } from 'react';
import {
  Form,
  Button,
  Card,
  InputGroup,
  FormControl,
  Badge,
  Table,
} from 'react-bootstrap';
import CourseContext from '../../context/course/courseContext';
import AcademicBatchContext from '../../context/academicBatch/academicBatchContext';

const CreateAcademicBatch = () => {
  const courseContext = useContext(CourseContext);
  const academicBatchContext = useContext(AcademicBatchContext);

  const { getCourses, clearCourses, courses } = courseContext;
  const { createAcademicBatch } = academicBatchContext;

  const [reqObj, setReqObj] = useState({
    academicBatchCode: '',
    academicBatchDescription: '',
    academicBatchName: '',
    yearLable: '',
    coursesObj: [],
  });
  const {
    academicBatchCode,
    academicBatchDescription,
    academicBatchName,
    yearLable,
    coursesObj,
  } = reqObj;

  const [searchQuery, setSearchQuery] = useState({
    search: '',
    select: 'courseCode',
  });

  const { search } = searchQuery;

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleSelectionChange = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedCourses(value);
  };

  useEffect(() => {
    clearCourses();
    // eslint-disable-next-line
  }, [search]);

  const onChange = (e) => {
    setReqObj({
      ...reqObj,
      [e.target.name]: e.target.value,
    });
  };

  const onSearchInputChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      search: e.target.value,
    });
  };

  const onSearch = (e) => {
    getCourses(searchQuery);
  };

  const onRemove = (e) => {
    const courses = coursesObj;
    courses.splice(parseInt(e.target.name), 1);
    setReqObj({
      ...reqObj,
      coursesObj: courses,
    });
  };

  const onAddCourses = (e) => {
    const newCourses = coursesObj;
    selectedCourses.forEach((cc) => {
      if (
        newCourses
          .map((obj) => {
            return obj.courseCode;
          })
          .indexOf(cc) === -1
      ) {
        newCourses.push({
          courseCode: cc,
          startSemNo: 0,
          endSemNo: 0,
          stratMY: 'MM-YYYY',
          endMY: 'MM-YYYY',
        });
      }
    });
    setReqObj({
      ...reqObj,
      coursesObj: newCourses,
    });
  };

  const handleFocus = (e) => e.target.select();

  const onChangeField = (e) => {
    const field = e.target.name.split('.').pop();
    const index = parseInt(e.target.name.split('.')[0]);
    if (field === 'startSemNo' || field === 'endSemNo') {
      coursesObj[index][field] = isNaN(parseInt(e.target.value))
        ? 0
        : parseInt(e.target.value);
      setReqObj({
        ...reqObj,
        coursesObj,
      });
    } else {
      coursesObj[index][field] = e.target.value;
      setReqObj({
        ...reqObj,
        coursesObj,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      academicBatchCode === '' ||
      academicBatchName === '' ||
      yearLable === ''
    ) {
      console.log('Enter proper data');
    } else {
      createAcademicBatch(reqObj);
    }
  };

  const onClear = (e) => {
    setReqObj({
      academicBatchCode: '',
      academicBatchDescription: '',
      academicBatchName: '',
      yearLable: '',
      coursesObj: [],
    });
    setSelectedCourses([]);
    setSearchQuery({
      search: '',
      select: 'courseCode',
    });
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='acAcademicBatchCode'>
          <Form.Label>Academic Batch Code</Form.Label>
          <Form.Control
            name='academicBatchCode'
            type='text'
            placeholder='Enter new academic batch code'
            onChange={onChange}
            value={academicBatchCode}
          />
        </Form.Group>
        <Form.Group controlId='acAcademicBatchName'>
          <Form.Label>Academic Batch Name</Form.Label>
          <Form.Control
            name='academicBatchName'
            type='text'
            placeholder='Enter academic batch name'
            onChange={onChange}
            value={academicBatchName}
          />
        </Form.Group>
        <Form.Group controlId='acAcademicBatchDescription'>
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
        <Form.Group controlId='acYearLable'>
          <Form.Label>Year Lable</Form.Label>
          <Form.Control
            name='yearLable'
            type='text'
            placeholder='Enter year lable (Ex: 2020-2021)'
            onChange={onChange}
            value={yearLable}
          />
        </Form.Group>
        <Card bg='light'>
          <Card.Body>
            <Form.Group controlId='acCoursesSearch'>
              <Form.Label>Search Courses</Form.Label>
              <InputGroup className='mb-3'>
                <FormControl
                  name='searchQuery'
                  type='text'
                  placeholder='Search by Courses Code'
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
            <Form.Group controlId='acSearchResult'>
              <Form.Label>
                Select Courses (Use Ctrl/Shift for multiple selection)
              </Form.Label>
              <Form.Control
                as='select'
                multiple
                onChange={handleSelectionChange}
                htmlSize={5}
              >
                {courses &&
                  courses.map((course, index) => {
                    return <option key={index}>{course.courseCode}</option>;
                  })}
              </Form.Control>
            </Form.Group>
            <Button variant='success' onClick={onAddCourses}>
              Add Courses
            </Button>{' '}
            <Badge variant='primary'>No of Courses: {coursesObj.length}</Badge>
            <hr />
            <Form.Group controlId='acCourses'>
              <Form.Label>Assign Appropriate Field Data</Form.Label>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Start Sem No</th>
                    <th>End Sem No</th>
                    <th>Start Month/Year</th>
                    <th>End Month/Year</th>
                    <th>Remove Course</th>
                  </tr>
                </thead>
                <tbody>
                  {coursesObj.map((obj, index) => (
                    <tr key={index}>
                      <td width='20%'>{obj.courseCode}</td>
                      <td width='10%'>
                        <FormControl
                          name={`${index}.startSemNo`}
                          type='number'
                          value={obj.startSemNo}
                          onChange={onChangeField}
                          onFocus={handleFocus}
                        />
                      </td>
                      <td width='10%'>
                        <FormControl
                          name={`${index}.endSemNo`}
                          type='number'
                          value={obj.endSemNo}
                          onChange={onChangeField}
                          onFocus={handleFocus}
                        />
                      </td>
                      <td width='25%'>
                        <FormControl
                          name={`${index}.stratMY`}
                          type='text'
                          value={obj.stratMY}
                          onChange={onChangeField}
                          onFocus={handleFocus}
                        />
                      </td>
                      <td width='25%'>
                        <FormControl
                          name={`${index}.endMY`}
                          type='text'
                          value={obj.endMY}
                          onChange={onChangeField}
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

export default CreateAcademicBatch;
