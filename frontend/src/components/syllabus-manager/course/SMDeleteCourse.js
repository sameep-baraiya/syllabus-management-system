import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';

// Course Model Components
import DeleteCourse from '../../models/course/DeleteCourse';
import FindCourse from '../../models/course/FindCourse';
import ViewCourse from '../../models/course/ViewCourse';

// Context
import CourseContext from '../../../context/course/courseContext';

const SMDeleteCourse = () => {
  const courseContext = useContext(CourseContext);
  const { courses, getCourse, course } = courseContext;

  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getCourse(id);
  };

  const onCourseSelectClick = () => {
    setMode('delete');
    setIsSelected(false);
  };

  const selectionList = () => {
    return (
      <div>
        <FindCourse defaultSelect='id,courseCode,courseName' />
        {courses &&
          courses.map((course, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(course.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {course.courseCode}: {course.courseName}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <br />
      <h2>
        <strong>Delete Course</strong>
      </h2>
      <Card>
        <Card.Header>Select course that you want to delete</Card.Header>
        <Card.Body>
          {isSelected ? (
            <div>
              <ViewCourse course={course} />
              <br />
              <Button variant='success' onClick={onCourseSelectClick}>
                Select
              </Button>{' '}
              <Button
                variant='secondary'
                onClick={() => {
                  setIsSelected(false);
                }}
              >
                Back To Search
              </Button>
            </div>
          ) : (
            selectionList()
          )}
        </Card.Body>
      </Card>
      <hr />
      <DeleteCourse mode={mode} setMode={setMode} />
      <br />
    </div>
  );
};

export default SMDeleteCourse;
