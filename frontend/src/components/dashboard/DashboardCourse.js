import React from 'react';

// Course Componets
import FindCourse from '../models/course/FindCourse';

const DashboardCourse = () => {
  return (
    <div>
      <FindCourse defaultSelect='all' />
    </div>
  );
};

export default DashboardCourse;
