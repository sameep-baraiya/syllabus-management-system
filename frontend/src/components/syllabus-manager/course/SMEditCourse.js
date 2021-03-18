import React, { useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

// Course Model Components
import EditCourse from '../../models/course/EditCourse';
import FindCourse from '../../models/course/FindCourse';
import ViewCourse from '../../models/course/ViewCourse';

// Context
import CourseContext from '../../../context/course/courseContext';

const SMEditCourse = () => {
  const cubjectContext = useContext(CourseContext);
  const { courses, getCourse, course } = cubjectContext;

  const [operationMode, setOperationMode] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getCourse(id);
  };

  const onCourseSelectClick = () => {
    if (operationMode === 'original') {
      setMode('original');
    }
    setIsSelected(false);
    setOperationMode('');
  };

  const selectionList = () => {
    return (
      <div>
        <FindCourse defaultSelect='id,courseCode,courseName' />
        {courses &&
          courses.map((it, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(it.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {it.courseCode}: {it.courseName}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <br />
      <h2>
        <strong>Edit/Clone Course</strong>
      </h2>
      <div className='mb-3'>
        Select operation :{' '}
        <Button
          variant={operationMode === 'original' ? 'info' : 'outline-info'}
          onClick={() => {
            operationMode === 'original'
              ? setOperationMode('')
              : setOperationMode('original');
          }}
          block
        >
          Set Original Course
        </Button>
      </div>
      {operationMode && (
        <Card>
          <Card.Header>Find and Select for setting original course</Card.Header>
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
      )}
      <hr />
      <EditCourse mode={mode} setMode={setMode} />
      <br />
    </div>
  );
};

export default SMEditCourse;
