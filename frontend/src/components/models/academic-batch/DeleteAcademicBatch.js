import React, { useEffect, useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Context
import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';
import { Fragment } from 'react';

const DeleteAcademicBatch = ({ mode, setMode }) => {
  const academicBatchContext = useContext(AcademicBatchContext);
  const { academicBatch, deleteAcademicBatch } = academicBatchContext;

  const [reqObj, setReqObj] = useState({
    id: 0,
    academicBatchCode: '',
    academicBatchName: '',
  });

  const [password, setPassowrd] = useState('');

  const doDelete = () => {
    setReqObj({
      id: academicBatch.id,
      academicBatchCode: academicBatch.academicBatchCode,
      academicBatchName: academicBatch.academicBatchName,
    });
    setMode('');
  };

  const onModeChange = () => {
    if (mode === 'delete') {
      doDelete();
    }
  };

  useEffect(() => {
    onModeChange();
    // eslint-disable-next-line
  }, [mode]);

  const onSubmit = (e) => {
    e.preventDefault();
    deleteAcademicBatch({
      id: reqObj.id,
      password: password,
    });
  };

  const onClear = (e) => {
    setPassowrd('');
    setReqObj({
      id: 0,
      academicBatchCode: '',
      academicBatchName: '',
    });
  };

  return (
    <div>
      {reqObj.id !== 0 ? (
        <Fragment>
          <Alert variant='info'>
            <h4>
              <strong>Academic Batch Details:</strong>
            </h4>
            <strong>Academic Batch Code:</strong> {reqObj.academicBatchCode}
            <br />
            <strong>Academic Batch Name:</strong> {reqObj.academicBatchName}
          </Alert>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='DeleteAcademicBatch.password'>
              <Form.Label>
                Enter you password then press submit to delete academic batch
              </Form.Label>
              <Form.Control
                type='password'
                value={password}
                placeholder='Enter password here'
                onChange={(e) => {
                  setPassowrd(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>{' '}
            <Button variant='secondary' type='reset' onClick={onClear}>
              Clear
            </Button>
          </Form>
        </Fragment>
      ) : (
        <Alert variant='warning'>
          <h4>
            <strong>Warning</strong>
          </h4>
          Usually academic batches contains important records attached with past
          subjects and courses. Possible use case if you have inserted academic
          batch by mistake.
        </Alert>
      )}
    </div>
  );
};

DeleteAcademicBatch.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default DeleteAcademicBatch;
