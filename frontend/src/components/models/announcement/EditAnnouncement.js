import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert } from 'react-bootstrap';

// Context
import AnnouncementContext from '../../../context/announcement/announcementContext';
import ConfigContext from '../../../context/config/configContext';

// Utils
import { departmentTypeOptions } from '../../../utils/configUtils';

// Layout
import { iconEdit } from '../../layout/Icon';

// Model Announcement Components
import ViewAnnouncement from './ViewAnnouncement';

const EditAnnouncement = ({ mode, setMode }) => {
  const announcementContext = useContext(AnnouncementContext);
  const configContext = useContext(ConfigContext);

  const { departmentType } = configContext;
  const { updateAnnouncement, announcement } = announcementContext;

  const [reqObj, setReqObj] = useState({
    title: '',
    msg: '',
    department: 'None',
  });

  const { title, msg, department } = reqObj;

  // Input onChange handler
  const onChange = (e) => {
    setReqObj({ ...reqObj, [e.target.name]: e.target.value });
  };

  const doOriginal = () => {
    const { title, msg, department } = announcement;

    const original = { ...announcement };

    setReqObj({
      title: title !== null ? title : '',
      msg: msg !== null ? msg : '',
      department: department !== null ? department : 'None',
      original,
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

  if (reqObj.original) {
    return (
      <div>
        <h3>
          <strong>{iconEdit} Edit Announcement</strong>
        </h3>
        <Form>
          <Form.Group controlId='CreateAnnouncement.original'>
            <Form.Label>Original Announcement</Form.Label>
            <ViewAnnouncement announcement={reqObj.original} />
          </Form.Group>
          <Form.Group controlId='CreateAnnouncement.title'>
            <Form.Label>Announcement Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title here'
              name='title'
              value={title}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId='CreateAnnouncement.department'>
            <Form.Label>Department</Form.Label>
            <Form.Control
              name='department'
              as='select'
              onChange={onChange}
              value={department}
            >
              <option>None</option>
              {departmentTypeOptions(departmentType)}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='CreateAnnouncement.msg'>
            <Form.Label>Announcement Message</Form.Label>
            <Form.Control
              name='msg'
              as='textarea'
              placeholder='Enter announcement message'
              rows={5}
              onChange={onChange}
              value={msg}
            />
          </Form.Group>
          <Button
            onClick={() => {
              if (title === '' || msg === '' || department === 'None') {
                console.log('Enter input properly');
              } else {
                const { original, ...rest } = reqObj;
                rest.id = original.id;

                updateAnnouncement(rest);
              }
            }}
          >
            Submit
          </Button>{' '}
          <Button
            type='reset'
            variant='secondary'
            onClick={() => {
              setReqObj({
                title: '',
                msg: '',
                department: 'None',
              });
            }}
          >
            Reset
          </Button>
        </Form>
      </div>
    );
  } else {
    return (
      <Alert variant='info'>
        Set Original Announcement First to proceed forward
      </Alert>
    );
  }
};

EditAnnouncement.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default EditAnnouncement;
