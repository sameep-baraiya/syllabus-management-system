import React from 'react';
import { Link } from 'react-router-dom';

// Layout Components
import { iconSyllabusManger } from '../layout/Icon';

const DefaultSM = () => {
  return (
    <div>
      <br />
      <h2>
        <strong>{iconSyllabusManger} Syllabus Manger</strong>
      </h2>
      <p className='text-muted'>
        Dashboard contains create, update, delete related funality for subjects,
        academic batches, courses, meetings. It also contains create files
        funality for perticular academic batch.
      </p>
      <ul>
        <li>
          <Link to='/syllabus-manager/subject'>Create Subject</Link>
        </li>
        <li>
          <Link to='/syllabus-manager/subject/edit'>Edit Subject</Link>
        </li>
        <li>
          <Link to='/syllabus-manager/subject/delete'>Delete Subject</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/syllabus-manager/academic-batch'>
            Create Academic Batch
          </Link>
        </li>
        <li>
          <Link to='/syllabus-manager/academic-batch/edit'>
            Edit Academic Batch
          </Link>
        </li>
        <li>
          <Link to='/syllabus-manager/academic-batch/delete'>
            Delete Academic Batch
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/syllabus-manager/academic-batch/create-file'>
            Create Files
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/syllabus-manager/course'>Create Course</Link>
        </li>
        <li>
          <Link to='/syllabus-manager/course/edit'>Edit Course</Link>
        </li>
        <li>
          <Link to='/syllabus-manager/course/delete'>Delete Course</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/syllabus-manager/meeting'>Create Meeting</Link>
        </li>
        <li>
          <Link to='/syllabus-manager/meeting/edit'>Edit Meeting</Link>
        </li>
        <li>
          <Link to='/syllabus-manager/meeting/delete'>Delete Meeting</Link>
        </li>
      </ul>
    </div>
  );
};

export default DefaultSM;
