import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';

// Meeting Model Components
import DeleteMeeting from '../../models/meeting/DeleteMeeting';
import FindMeeting from '../../models/meeting/FindMeeting';
import ViewMeeting from '../../models/meeting/ViewMeeting';

// Context
import MeetingContext from '../../../context/meeting/meetingContext';

const SMDeleteMeeting = () => {
  const meetingContext = useContext(MeetingContext);
  const { meetings, getMeeting, meeting } = meetingContext;

  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getMeeting(id);
  };

  const onMeetingSelectClick = () => {
    setMode('delete');
    setIsSelected(false);
  };

  const selectionList = () => {
    return (
      <div>
        <FindMeeting defaultSelect='id,meetingCode,meetingType' />
        {meetings &&
          meetings.map((meeting, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(meeting.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {meeting.meetingCode}:{' '}
              {meeting.meetingType === 'bos'
                ? 'Board Of Studies'
                : 'Academic Council'}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <br />
      <h2>
        <strong>Delete Meeting</strong>
      </h2>
      <Card>
        <Card.Header>Select meeting that you want to delete</Card.Header>
        <Card.Body>
          {isSelected ? (
            <div>
              <ViewMeeting meeting={meeting} />
              <br />
              <Button variant='success' onClick={onMeetingSelectClick}>
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
      <DeleteMeeting mode={mode} setMode={setMode} />
      <br />
    </div>
  );
};

export default SMDeleteMeeting;
