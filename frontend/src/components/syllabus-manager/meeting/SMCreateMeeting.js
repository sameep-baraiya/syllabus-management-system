import React, { useState, useContext } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';

// Meeting Model Components
import CreateMeeting from '../../models/meeting/CreateMeeting';
import FindMeeting from '../../models/meeting/FindMeeting';
import ViewMeeting from '../../models/meeting/ViewMeeting';

// Context
import MeetingContext from '../../../context/meeting/meetingContext';

const SMCreateMeeting = () => {
  const meetingContext = useContext(MeetingContext);
  const { getMeeting, meetings, meeting } = meetingContext;

  const [operationMode, setOperationMode] = useState('');
  const [meetingType, setMeetingType] = useState('bos');
  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getMeeting(id);
  };

  const onMeetingSelectClick = () => {
    if (operationMode === 'clone') {
      console.log('clone');
      setMode('clone');
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
        <strong>Create/Clone Meeting</strong>
      </h2>
      <div className='mb-3'>
        Select operation :{' '}
        <Button
          variant={operationMode === 'clone' ? 'primary' : 'outline-primary'}
          onClick={() => {
            operationMode === 'clone'
              ? setOperationMode('')
              : setOperationMode('clone');
          }}
          block
        >
          Clone Meeting
        </Button>
      </div>
      {operationMode && (
        <Card>
          <Card.Header>Find and Select for Meeting to clone</Card.Header>
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
      <div>
        Select Type Of Meeting:
        <Row>
          <Col>
            <Button
              variant={meetingType === 'bos' ? 'primary' : 'outline-primary'}
              onClick={() => {
                setMeetingType('bos');
              }}
              block
            >
              Board Of Studies Meeting
            </Button>
          </Col>
          <Col>
            <Button
              variant={meetingType === 'ac' ? 'info' : 'outline-info'}
              onClick={() => {
                setMeetingType('ac');
              }}
              block
            >
              Academic Council Meeting
            </Button>
          </Col>
        </Row>
      </div>
      <hr />
      <CreateMeeting mode={mode} setMode={setMode} type={meetingType} />
    </div>
  );
};

export default SMCreateMeeting;
