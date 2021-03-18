import React, { useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

// Academic Batch Model Components
import CreateAcademicBatch from '../../models/academic-batch/CreateAcademicBatch';
import FindSubject from '../../models/subject/FindSubject';
import ViewSubject from '../../models/subject/ViewSubject';

// Context
import SubjectContext from '../../../context/subject/subjectContext';

const SMCreateAcademicBatch = () => {
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
      console.log('clone');
      setMode('clone');
    }
    setIsSelected(false);
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
        <Button
          variant={operationMode === 'clone' ? 'primary' : 'outline-primary'}
          onClick={() => {
            operationMode === 'clone'
              ? setOperationMode('')
              : setOperationMode('clone');
          }}
          block
        >
          Clone Academic Batch
        </Button>
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
      <CreateAcademicBatch mode={mode} setMode={setMode} />
    </div>
  );
};

export default SMCreateAcademicBatch;
