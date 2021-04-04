import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// Context
import AnnouncementContext from '../../../context/announcement/announcementContext';
import ConfigContext from '../../../context/config/configContext';

// Utils
import { departmentTypeOptions } from '../../../utils/configUtils';

// Layout
import { iconCreate } from '../../layout/Icon';

const CreateAnnouncement = () => {
  const announcementContext = useContext(AnnouncementContext);
  const configContext = useContext(ConfigContext);

  const { departmentType } = configContext;
  const { createAnnouncement } = announcementContext;

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

  return (
    <div>
      <h3>
        <strong>{iconCreate} Create Announcement</strong>
      </h3>
      <Form>
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
              createAnnouncement(reqObj);
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
};

export default CreateAnnouncement;
