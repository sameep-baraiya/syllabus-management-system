import React, { useContext } from 'react';

// Course Componets
import FindMeeting from '../models/meeting/FindMeeting';
import ViewMeeting from '../models/meeting/ViewMeeting';

// Context
import MeetingContext from '../../context/meeting/meetingContext';

const DashboardCourse = () => {
  const meetingContext = useContext(MeetingContext);
  const { meetings } = meetingContext;

  return (
    <div>
      <br />
      <FindMeeting defaultSelect='all' />
      {meetings &&
        meetings.map((it, index) => (
          <div key={index} className='mt-3'>
            <ViewMeeting meeting={it} />
          </div>
        ))}
    </div>
  );
};

export default DashboardCourse;
