import React, { useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

// Academic Batch Model Components
import CreateAcademicBatch from '../../models/academic-batch/CreateAcademicBatch';
import FindAcademicBatch from '../../models/academic-batch/FindAcademicBatch';
import ViewAcademicBatch from '../../models/academic-batch/ViewAcademicBatch';

// Context
import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';

const SMCreateAcademicBatch = () => {
  const academicBatchContext = useContext(AcademicBatchContext);
  const {
    getAcademicBatch,
    academicBatches,
    academicBatch,
  } = academicBatchContext;

  const [operationMode, setOperationMode] = useState('');
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
      <hr />
      <CreateAcademicBatch mode={mode} setMode={setMode} />
    </div>
  );
};

export default SMCreateAcademicBatch;
