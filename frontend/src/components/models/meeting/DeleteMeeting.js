import React, { useEffect, useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Context
import MeetingContext from '../../../context/meeting/meetingContext';
import { Fragment } from 'react';

const DeleteMeeting = ({ mode, setMode }) => {
  const meetingContext = useContext(MeetingContext);
  const { meeting, deleteMeeting } = meetingContext;

  const [reqObj, setReqObj] = useState({
    id: 0,
    meetingCode: '',
    meetingType: 'bos',
  });

  const [password, setPassowrd] = useState('');

  const doDelete = () => {
    setReqObj({
      id: meeting.id,
      meetingCode: meeting.meetingCode,
      meetingType: meeting.meetingType,
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
    deleteMeeting({
      id: reqObj.id,
      password: password,
    });
  };

  const onClear = (e) => {
    setPassowrd('');
    setReqObj({
      id: 0,
      meetingCode: '',
      meetingType: 'bos',
    });
  };

  return (
    <div>
      {reqObj.id !== 0 ? (
        <Fragment>
          <Alert variant='info'>
            <h4>
              <strong>Meeting Details:</strong>
            </h4>
            <strong>Meeting Code:</strong> {reqObj.meetingCode}
            <br />
            <strong>Meeting Type:</strong>{' '}
            {reqObj.meetingType === 'bos'
              ? 'Board Of Studies'
              : 'Academic Council'}
          </Alert>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='DeleteMeeting.password'>
              <Form.Label>
                Enter you password then press submit to delete meeting
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
          Usually meetings contains important records attached with another
          meeting. Possible use case if you have inserted meeting by mistake.
        </Alert>
      )}
    </div>
  );
};

DeleteMeeting.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default DeleteMeeting;
