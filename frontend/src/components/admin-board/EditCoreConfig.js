import React, { useContext, useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';

// Context
import ConfigContext from '../../context/config/configContext';

const EditCoreConfig = () => {
  const configContext = useContext(ConfigContext);
  const {
    departmentType,
    subjectType,
    courseType,
    updateConfig,
  } = configContext;

  const initReqObj = {
    password: '',
    departmentType: [...departmentType],
    subjectType: [...subjectType],
    courseType: [...courseType],
  };

  const [reqObj, setReqObj] = useState({ ...initReqObj });

  const editableColumn = (keyName, heading) => (
    <div>
      <h4>{heading}</h4>
      {reqObj[keyName].map((it, index) => (
        <div key={index} className='mb-2'>
          <Form.Control
            type='text'
            value={it}
            onChange={(e) => {
              reqObj[keyName][index] = e.target.value;
              setReqObj({ ...reqObj });
            }}
            placeholder='This field cannot be empty'
          />
        </div>
      ))}
      <div>
        <Button
          className='mb-2'
          variant='success'
          block
          onClick={() => {
            reqObj[keyName].push('New');
            setReqObj({ ...reqObj });
          }}
        >
          Add New
        </Button>
      </div>
      <div>
        <Button
          variant='danger'
          block
          onClick={() => {
            reqObj[keyName].pop();
            setReqObj({ ...reqObj });
          }}
        >
          Remove Last
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <h3>
        <strong>Edit Core Config</strong>
      </h3>
      <Row>
        <Col>{editableColumn('departmentType', 'Department Type')}</Col>
        <Col>{editableColumn('subjectType', 'Subject Type')}</Col>
        <Col>{editableColumn('courseType', 'Course Type')}</Col>
      </Row>
      <br />
      <Alert variant='primary'>
        <h5>
          <strong>Note</strong>
        </h5>
        Following edits will not reflect on existing data. It will apply for new
        data and requried refresh to see effect.
      </Alert>
      <Form.Label>Enter password for confirmation</Form.Label>
      <Form.Control
        type='password'
        placeholder='Enter password here'
        onChange={(e) => {
          setReqObj({ ...reqObj, password: e.target.value });
        }}
      />
      <br />
      <Button
        onClick={() => {
          updateConfig(reqObj);
        }}
      >
        Submit Config
      </Button>{' '}
      <Button
        variant='secondary'
        onClick={() => {
          setReqObj({ ...initReqObj });
        }}
      >
        Rest
      </Button>
    </div>
  );
};

export default EditCoreConfig;
