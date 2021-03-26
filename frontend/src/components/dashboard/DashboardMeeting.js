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
      <FindMeeting defaultSelect='all' />
      {meetings &&
        meetings.map((it, index) => <ViewMeeting meeting={it} key={index} />)}
    </div>
  );
};

export default DashboardCourse;
