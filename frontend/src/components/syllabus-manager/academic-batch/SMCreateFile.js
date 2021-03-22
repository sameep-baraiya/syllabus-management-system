import React, { useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

// Academic Batch Model Components
import FindAcademicBatch from '../../models/academic-batch/FindAcademicBatch';
import ViewAcademicBatch from '../../models/academic-batch/ViewAcademicBatch';
import CreateFile from '../../models/academic-batch/CreateFile';

// Context
import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';

const SMCreateFile = () => {
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
    if (operationMode === 'select') {
      setMode('select');
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
        <strong>Select Academic Batch</strong>
      </h2>
      <div className='mb-3'>
        Select operation :{' '}
        <Button
          variant={operationMode === 'select' ? 'primary' : 'outline-primary'}
          onClick={() => {
            operationMode === 'select'
              ? setOperationMode('')
              : setOperationMode('select');
          }}
          block
        >
          Select Academic Batch
        </Button>
      </div>
      {operationMode && (
        <Card>
          <Card.Header>Find and Select for Academic Batch</Card.Header>
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
      <CreateFile mode={mode} setMode={setMode} />
    </div>
  );
};

export default SMCreateFile;
