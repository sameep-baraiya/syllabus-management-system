import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Alert, Button } from 'react-bootstrap';

// Announcement Model Components
import ViewAnnouncement from './ViewAnnouncement';

// Context
import AnnouncementContext from '../../../context/announcement/announcementContext';

const DeleteAnnouncement = ({ mode, setMode }) => {
  const announcementContext = useContext(AnnouncementContext);

  const { announcement, deleteAnnouncement } = announcementContext;

  const initReqObj = {
    id: 0,
    password: '',
  };

  const [reqObj, setReqObj] = useState({ ...initReqObj });

  const doOriginal = () => {
    const { id } = announcement;

    setReqObj({
      id,
      password: '',
      original: { ...announcement },
    });
    setMode('');
  };

  const onModeChange = () => {
    if (mode === 'original') {
      doOriginal();
    }
  };

  useEffect(() => {
    onModeChange();
    // eslint-disable-next-line
  }, [mode]);

  return (
    <div>
      {reqObj.original ? (
        <div>
          <h3>
            <strong>Delete Announcement</strong>
          </h3>
          <Form.Group controlId='DeleteAnnouncement.selectedAnnouncement'>
            <Form.Label>Original Announcement</Form.Label>
            <ViewAnnouncement announcement={reqObj.original} />
          </Form.Group>
          <Form.Group controlId='DeleteAnnouncement.password'>
            <Form.Label>
              Enter yout password to confirm delete opertion
            </Form.Label>
            <Form.Control
              type='password'
              value={reqObj.password}
              onChange={(e) => {
                setReqObj({
                  ...reqObj,
                  password: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Button
            variant='primary'
            onClick={() => {
              deleteAnnouncement(reqObj);
            }}
          >
            Delete Announcement
          </Button>{' '}
          <Button
            variant='secondary'
            onClick={() => {
              setReqObj({ ...initReqObj });
            }}
          >
            Reset
          </Button>
        </div>
      ) : (
        <Alert variant='warning'>
          <h4>
            <strong>Warning</strong>
          </h4>
          System does not asure everybody have readed announcement
        </Alert>
      )}
    </div>
  );
};

DeleteAnnouncement.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default DeleteAnnouncement;
