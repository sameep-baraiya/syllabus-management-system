import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Form, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import CourseContext from '../../context/course/courseContext';
import AcademicBatchContext from '../../context/academicBatch/academicBatchContext';
import CourseCardView from '../dashboard/CourseCardView';

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
    courseCode: '',
  });
  const {
    academicBatchCode,
    academicBatchDescription,
    academicBatchName,
    yearLable,
  } = reqObj;

  const [searchQuery, setSearchQuery] = useState({
    search: '',
    select: 'courseCode',
  });

  const { search } = searchQuery;

  const [isCourseSelected, setIsCourseSelected] = useState(false);

  useEffect(() => {
    setIsCourseSelected(false);
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

  const onCourseSelect = (e) => {
    setReqObj({
      ...reqObj,
      courseCode: e.target.name,
    });

    setIsCourseSelected(true);

    getCourses({
      search: e.target.name,
      select: '',
    });
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
      coursesId: '',
    });
    setSearchQuery({
      search: '',
      select: 'courseCode',
    });
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='abAcademicBatchCode'>
          <Form.Label>Academic Batch Code</Form.Label>
          <Form.Control
            name='academicBatchCode'
            type='text'
            placeholder='Enter new academic batch code'
            onChange={onChange}
            value={academicBatchCode}
          />
        </Form.Group>
        <Form.Group controlId='abAcademicBatchName'>
          <Form.Label>Academic Batch Name</Form.Label>
          <Form.Control
            name='academicBatchName'
            type='text'
            placeholder='Enter academic batch name'
            onChange={onChange}
            value={academicBatchName}
          />
        </Form.Group>
        <Form.Group controlId='abAcademicBatchDescription'>
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
        <Form.Group controlId='abYearLable'>
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
            <Form.Group controlId='abCoursesSearch'>
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
            <Form.Group controlId='abSearchResult'>
              <Form.Label>Select Course</Form.Label>
              {courses &&
                (isCourseSelected
                  ? CourseCardView(courses[0], 0)
                  : courses.map((course, index) => {
                      return (
                        <div key={index} style={{ paddingBottom: '8px' }}>
                          <Button
                            name={course.courseCode}
                            onClick={onCourseSelect}
                          >
                            Select {course.courseCode}
                          </Button>
                        </div>
                      );
                    }))}
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
