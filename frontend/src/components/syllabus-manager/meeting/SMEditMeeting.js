import React, { useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

// Meeting Model Components
import EditMeeting from '../../models/meeting/EditMeeting';
import FindMeeting from '../../models/meeting/FindMeeting';
import ViewMeeting from '../../models/meeting/ViewMeeting';

// Context
import MeetingContext from '../../../context/meeting/meetingContext';

const SMCreateMeeting = () => {
  const meetingContext = useContext(MeetingContext);
  const { getMeeting, meetings, meeting } = meetingContext;

  const [operationMode, setOperationMode] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getMeeting(id);
  };

  const onMeetingSelectClick = () => {
    if (operationMode === 'original') {
      console.log('original');
      setMode('original');
    }
    setIsSelected(false);
    setOperationMode('');
  };

  const selectionList = () => {
    return (
      <div>
        <FindMeeting defaultSelect='id,meetingCode,meetingType' />
        {meetings &&
          meetings.map((mt, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(mt.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {mt.meetingCode}:{' '}
              {mt.meetingType === 'bos'
                ? 'Board Of Studies'
                : 'Academic Council'}
            </div>
          ))}
      </div>
    );
  };
  return (
    <div>
      <h2>
        <strong>Edit Meeting</strong>
      </h2>
      <div className='mb-3'>
        Select operation :{' '}
        <Button
          variant={operationMode === 'original' ? 'primary' : 'outline-primary'}
          onClick={() => {
            operationMode === 'original'
              ? setOperationMode('')
              : setOperationMode('original');
          }}
          block
        >
          Set Original Meeting
        </Button>
      </div>
      {operationMode && (
        <Card>
          <Card.Header>Find and Select for Meeting</Card.Header>
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
      )}
      <hr />
      <EditMeeting mode={mode} setMode={setMode} />
    </div>
  );
};

export default SMCreateMeeting;
