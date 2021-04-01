import React, { useContext } from 'react';

// Course Componets
import FindCourse from '../models/course/FindCourse';
import ViewCourse from '../models/course/ViewCourse';

// Context
import CourseContext from '../../context/course/courseContext';

const DashboardCourse = () => {
  const courseContext = useContext(CourseContext);
  const { courses } = courseContext;

  return (
    <div>
      <br />
      <FindCourse defaultSelect='all' />
      {courses &&
        courses.map((it, index) => (
          <div key={index} className='mt-2'>
            <ViewCourse course={it} />
          </div>
        ))}
    </div>
  );
};

export default DashboardCourse;
