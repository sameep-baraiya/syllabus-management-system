import React, { useContext } from 'react';

// Course Componets
import FindAcademicBatch from '../models/academic-batch/FindAcademicBatch';
import ViewAcademicBatch from '../models/academic-batch/ViewAcademicBatch';

// Context
import AcademicBatchContext from '../../context/academicBatch/academicBatchContext';

const DashboardAcademicBatch = () => {
  const academicBatchContext = useContext(AcademicBatchContext);
  const { academicBatches } = academicBatchContext;

  return (
    <div>
      <FindAcademicBatch defaultSelect='all' />
      {academicBatches &&
        academicBatches.map((it, index) => (
          <ViewAcademicBatch academicBatch={it} key={index} />
        ))}
    </div>
  );
};

export default DashboardAcademicBatch;
