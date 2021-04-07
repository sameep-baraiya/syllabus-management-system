import React from 'react';
import { Link } from 'react-router-dom';

// Layout Components
import { iconDashboard } from '../layout/Icon';

const DefaultDashboard = () => {
  return (
    <div>
      <br />
      <h2>
        <strong>{iconDashboard} Dashboard</strong>
      </h2>
      <p className='text-muted'>
        Dashboard contains all basic searching funality for subjects, academic
        batches, courses, meetings.
      </p>
      <ul>
        <li>
          <Link to='/dashboard/subject'>Find Subject</Link>
        </li>
        <li>
          <Link to='/dashboard/course'>Find Course</Link>
        </li>
        <li>
          <Link to='/dashboard/academic-batch'>Find Academic Batch</Link>
        </li>
        <li>
          <Link to='/dashboard/meeting'>Find Meeting</Link>
        </li>
      </ul>
    </div>
  );
};

export default DefaultDashboard;
