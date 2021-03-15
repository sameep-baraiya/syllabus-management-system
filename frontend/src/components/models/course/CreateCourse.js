// import React, { Fragment, useContext, useState, useEffect } from 'react';
// import { Form, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
// import CourseContext from '../../../context/course/courseContext';
// import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';
// import CourseCardView from '../../dashboard/CourseCardView';

const CreateCourse = () => {
  // const courseContext = useContext(CourseContext);
  // const academicBatchContext = useContext(AcademicBatchContext);

  // const { getCourses, clearCourses, courses } = courseContext;
  // const { createAcademicBatch } = academicBatchContext;

  // const [reqObj, setReqObj] = useState({
  //   academicBatchCode: '',
  //   academicBatchDescription: '',
  //   academicBatchName: '',
  //   yearLable: '',
  //   courseCode: '',
  // });
  // const {
  //   academicBatchCode,
  //   academicBatchDescription,
  //   academicBatchName,
  //   yearLable,
  // } = reqObj;

  // const [searchQuery, setSearchQuery] = useState({
  //   search: '',
  //   select: 'courseCode',
  // });

  // const { search } = searchQuery;

  // const [isCourseSelected, setIsCourseSelected] = useState(false);

  // useEffect(() => {
  //   setIsCourseSelected(false);
  //   clearCourses();
  //   // eslint-disable-next-line
  // }, [search]);

  // const onChange = (e) => {
  //   setReqObj({
  //     ...reqObj,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     academicBatchCode === '' ||
  //     academicBatchName === '' ||
  //     yearLable === ''
  //   ) {
  //     console.log('Enter proper data');
  //   } else {
  //     createAcademicBatch(reqObj);
  //   }
  // };

  // const onClear = (e) => {
  //   setReqObj({
  //     academicBatchCode: '',
  //     academicBatchDescription: '',
  //     academicBatchName: '',
  //     yearLable: '',
  //     coursesId: '',
  //   });
  //   setSearchQuery({
  //     search: '',
  //     select: 'courseCode',
  //   });
  // };

  return (
    <div>
      {/* <Form onSubmit={onSubmit}>
        <Form.Group controlId='abAcademicBatchCode'>
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            name='academicBatchCode'
            type='text'
            placeholder='Enter new academic batch code'
            onChange={onChange}
            value={academicBatchCode}
          />
        </Form.Group>
        <Form.Group controlId='abAcademicBatchDescription'>
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            name='academicBatchDescription'
            as='textarea'
            placeholder='Enter academic batch description (optional)'
            rows={5}
            onChange={onChange}
            value={academicBatchDescription}
          />
        </Form.Group>
        <Form.Group controlId='smCourseLength'>
          <Form.Label>Course Length (No Of Months)</Form.Label>
          <Form.Control
            name='courseLength'
            type='number'
            placeholder='Enter new course length'
          />
        </Form.Group>
        <Form.Group controlId='smNoOfSemesters'>
          <Form.Label>No Of Semesters</Form.Label>
          <Form.Control
            name='noOfSemesters'
            type='number'
            placeholder='Enter new no of semesters'
          />
        </Form.Group>
        <Form.Group controlId='smCourseType'>
          <Form.Label>Course Type</Form.Label>
          <Form.Control name='courseType' as='select'>
            <option>None</option>
            <option>B.Tech</option>
            <option>M.Tech</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='smDepartment'>
          <Form.Label>Department</Form.Label>
          <Form.Control name='department' as='select'>
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
      <br /> */}
    </div>
  );
};

export default CreateCourse;
