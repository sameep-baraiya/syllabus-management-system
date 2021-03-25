import React, { useState, useContext } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';

// Academic Batch Model Components
import CreateMeeting from '../../models/meeting/CreateMeeting';
import FindAcademicBatch from '../../models/academic-batch/FindAcademicBatch';
import ViewAcademicBatch from '../../models/academic-batch/ViewAcademicBatch';

// Context
import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';

const SMCreateMeeting = () => {
  const academicBatchContext = useContext(AcademicBatchContext);
  const {
    getAcademicBatch,
    academicBatches,
    academicBatch,
  } = academicBatchContext;

  const [operationMode, setOperationMode] = useState('');
  const [meetingType, setMeetingType] = useState('bos');
  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getAcademicBatch({
      id: id,
      nestSelect: 'Course,Subject',
    });
  };

  const onAcademicBatchSelectClick = () => {
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
        <FindAcademicBatch defaultSelect='id,academicBatchCode,academicBatchName' />
        {academicBatches &&
          academicBatches.map((ab, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(ab.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {ab.academicBatchCode}: {ab.academicBatchName}
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
          <Card.Header>Find and Select for Academic Batch to clone</Card.Header>
          <Card.Body>
            {isSelected ? (
              <div>
                <ViewAcademicBatch academicBatch={academicBatch} />
                <br />
                <Button variant='success' onClick={onAcademicBatchSelectClick}>
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
