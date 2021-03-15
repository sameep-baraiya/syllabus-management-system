import React, { useState, useContext } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

// Academic Batch Model Components
import CreateAcademicBatch from '../models/academic-batch/CreateAcademicBatch';

// Subject Model Components
// import CreateSubject from '../models/subject/CreateSubject';
import FindSubject from '../models/subject/FindSubject';
import ViewSubject from '../models/subject/ViewSubject';

// Context
import SubjectContext from '../../context/subject/subjectContext';

const SMCreateAcademicBatch = () => {
  const subjectContext = useContext(SubjectContext);
  const { subjects, getSubject, subject } = subjectContext;

  const [operationMode, setOperationMode] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  // const [, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getSubject(id);
  };

  const onSubjectSelectClick = () => {
    if (operationMode === 'clone') {
      console.log('clone');
      // setMode('clone');
    } else if (operationMode === 'predecessor') {
      console.log('predecessor');
      // setMode('predecessor');
    } else if (operationMode === 'successor') {
      console.log('successor');
      // setMode('successor');
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
      <h2>
        <strong>Create/Clone Academic Batch</strong>
      </h2>
      <div className='mb-3'>
        Select operation :{' '}
        <ButtonGroup>
          <Button
            variant={operationMode === 'clone' ? 'primary' : 'outline-primary'}
            onClick={() => {
              operationMode === 'clone'
                ? setOperationMode('')
                : setOperationMode('clone');
            }}
          >
            Clone Academic Batch
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
            Set Successor Academic Batch
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
            Set Predecessor Academic Batch
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
      <CreateAcademicBatch />
    </div>
  );
};

export default SMCreateAcademicBatch;
