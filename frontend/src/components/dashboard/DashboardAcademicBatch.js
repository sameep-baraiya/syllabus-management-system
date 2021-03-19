import React from 'react';

// Course Componets
import FindAcademicBatch from '../models/academic-batch/FindAcademicBatch';

const DashboardAcademicBatch = () => {
  return (
    <div>
      <FindAcademicBatch defaultSelect='id,academicBatchCode,academicBatchName' />
    </div>
  );
};

export default DashboardAcademicBatch;
