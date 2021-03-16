import React, { useEffect, useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Context
import SubjectContext from '../../../context/subject/subjectContext';
import { Fragment } from 'react';

const DeleteSubject = ({ mode, setMode }) => {
  const subjectContext = useContext(SubjectContext);
  const { subject, deleteSubject } = subjectContext;

  const [reqObj, setReqObj] = useState({
    id: 0,
    subjectCode: '',
    subjectName: '',
    subjectShort: '',
  });

  const [password, setPassowrd] = useState('');

  const doDelete = () => {
    setReqObj({
      id: subject.id,
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      subjectShort: subject.subjectShort,
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
    deleteSubject({
      id: reqObj.id,
      password: password,
    });
  };

  const onClear = (e) => {
    setPassowrd('');
    setReqObj({
      id: 0,
      subjectCode: '',
      subjectName: '',
      subjectShort: '',
    });
  };

  return (
    <div>
      {reqObj.id !== 0 ? (
        <Fragment>
          <Alert variant='info'>
            <h4>
              <strong>Subject Details:</strong>
            </h4>
            <strong>Subject Code:</strong> {reqObj.subjectCode}
            <br />
            <strong>Subject Name:</strong> {reqObj.subjectName}
            <br />
            <strong>Subject Short:</strong> {reqObj.subjectShort}
          </Alert>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='DeleteSubject.password'>
              <Form.Label>
                Enter you password then press submit to delete subject
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
          Usually subjects are deprecated (by setting “is obsolete field” to
          true) because it contains important records attached with past
          academic batches and courses. Possible use case if you have inserted
          subject by mistake.
        </Alert>
      )}
    </div>
  );
};

DeleteSubject.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default DeleteSubject;
