import React, { useState, useContext } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

// Subject Model Components
import EditSubject from '../../models/subject/EditSubject';
import FindSubject from '../../models/subject/FindSubject';
import ViewSubject from '../../models/subject/ViewSubject';

// Context
import SubjectContext from '../../../context/subject/subjectContext';

const SMEditSubject = () => {
  const subjectContext = useContext(SubjectContext);
  const { subjects, getSubject, subject } = subjectContext;

  const [operationMode, setOperationMode] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getSubject(id);
  };

  const onSubjectSelectClick = () => {
    if (operationMode === 'clone') {
      setMode('clone');
    } else if (operationMode === 'predecessor') {
      setMode('predecessor');
    } else if (operationMode === 'successor') {
      setMode('successor');
    } else if (operationMode === 'original') {
      setMode('original');
    }
    setIsSelected(false);
    setOperationMode('');
  };

  const selectionList = () => {
    return (
      <div>
        <FindSubject defaultSelect='id,subjectCode,subjectName,subjectShort' />
        {subjects &&
          subjects.map((sub, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(sub.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {sub.subjectCode}: {sub.subjectName} ({sub.subjectShort})
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <br />
      <h2>
        <strong>Edit/Clone Subject</strong>
      </h2>
      <div className='mb-3'>
        Select operation :{' '}
        <ButtonGroup>
          <Button
            variant={operationMode === 'original' ? 'info' : 'outline-info'}
            onClick={() => {
              operationMode === 'original'
                ? setOperationMode('')
                : setOperationMode('original');
            }}
          >
            Set Original Subject
          </Button>
          <Button
            variant={operationMode === 'clone' ? 'primary' : 'outline-primary'}
            onClick={() => {
              operationMode === 'clone'
                ? setOperationMode('')
                : setOperationMode('clone');
            }}
          >
            Clone Subject
          </Button>
          <Button
            variant={
              operationMode === 'successor' ? 'success' : 'outline-success'
            }
            onClick={() => {
              operationMode === 'successor'
                ? setOperationMode('')
                : setOperationMode('successor');
            }}
          >
            Set Successor Subject
          </Button>
          <Button
            variant={
              operationMode === 'predecessor' ? 'warning' : 'outline-warning'
            }
            onClick={() => {
              operationMode === 'predecessor'
                ? setOperationMode('')
                : setOperationMode('predecessor');
            }}
          >
            Set Predecessor Subject
          </Button>
        </ButtonGroup>
      </div>
      {operationMode && (
        <Card>
          <Card.Header>
            Find and Select for setting subject {operationMode}
          </Card.Header>
          <Card.Body>
            {isSelected ? (
              <div>
                <ViewSubject subject={subject} />
                <br />
                <Button variant='success' onClick={onSubjectSelectClick}>
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
      <EditSubject mode={mode} setMode={setMode} />
      <br />
    </div>
  );
};

export default SMEditSubject;
