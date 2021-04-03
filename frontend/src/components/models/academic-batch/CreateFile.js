import React, { useContext, useEffect, useState } from 'react';
import { Button, Alert, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Context
import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';
import NotificationContext from '../../../context/notification/notificationContext';

const CreateFile = ({ mode, setMode }) => {
  const academicBatchContext = useContext(AcademicBatchContext);
  const notificationContext = useContext(NotificationContext);

  const { academicBatch, createFile } = academicBatchContext;
  const { socket, createNotification } = notificationContext;

  const [reqObj, setReqObj] = useState({
    id: 0,
    includeTheory: false,
    includePractical: false,
    includeHeadmaster: false,
    semesterChoice: 'all',
    academicBatchCode: '',
    academicBatchName: '',
  });

  const {
    includeTheory,
    includePractical,
    includeHeadmaster,
    semesterChoice,
    academicBatchCode,
    academicBatchName,
  } = reqObj;

  const doSelect = () => {
    setReqObj({
      id: academicBatch ? academicBatch.id : 0,
      includeTheory: false,
      includePractical: false,
      includeHeadmaster: false,
      semesterChoice: 'all',
      academicBatchCode: academicBatch ? academicBatch.academicBatchCode : '',
      academicBatchName: academicBatch ? academicBatch.academicBatchName : '',
    });
    setMode('');
  };

  const onModeChange = () => {
    if (mode === 'select') {
      doSelect();
    }
  };

  useEffect(() => {
    onModeChange();
    // eslint-disable-next-line
  }, [mode]);

  if (socket) {
    if (!socket._callbacks.$CREATE_FILE) {
      socket.on('CREATE_FILE', (data) => {
        if (data.success) {
          createNotification(
            `Academic Batch ${data.code}, File Type ${data.type} Created Successfully`,
            'success'
          );
        }
      });
    }
  }

  // checkBox onChange handler
  const onChangeCheckBox = (e) => {
    setReqObj({ ...reqObj, [e.target.name]: e.target.checked });
  };

  // checkBox onChange handler
  const onChangeRadio = (e) => {
    setReqObj({ ...reqObj, semesterChoice: e.target.value });
  };

  return (
    <div>
      {reqObj.id === 0 ? (
        <div>
          <Alert variant='info'>Select Academic Batch fisrt</Alert>
        </div>
      ) : (
        <div>
          <Alert variant='success' className='mb-2'>
            <h5>
              <strong>Selected Academic Batch Details:</strong>
            </h5>
            <strong>Academic Batch Id:</strong> {reqObj.id}
            <br />
            <strong>Academic Batch Code:</strong> {academicBatchCode}
            <br />
            <strong>Academic Batch Name:</strong> {academicBatchName}
          </Alert>

          <Alert variant='info' className='mb-2'>
            <h4>
              <strong>Create Syllabus Book</strong>
            </h4>
            <Form.Check
              name='includeTheory'
              type='checkbox'
              label='Include Theory ?'
              checked={includeTheory}
              onChange={onChangeCheckBox}
            />
            <Form.Check
              name='includePractical'
              type='checkbox'
              label='Include Practical ?'
              checked={includePractical}
              onChange={onChangeCheckBox}
            />
            <Form.Check
              name='includeHeadmaster'
              type='checkbox'
              label='Include Headmaster ?'
              checked={includeHeadmaster}
              onChange={onChangeCheckBox}
            />
            <br />
            <p>
              <strong>Will create detailed syllabus book: </strong>
              <br />
              <strong>Part 1:</strong> University Name, Type of course,
              Department <br />
              <strong>Part 2:</strong> Total Credit and Exam Scheme score
              semester wise <br />
              <strong>Part 3:</strong> Subject Wise Credit and Exam Scheme
              structure <br />
              <strong>Part 4:</strong> Detailed Subject wise infomation
            </p>
            <Button
              variant='primary'
              onClick={() => {
                let type = 'SYLLABUS_BOOK_';

                if (includeHeadmaster) type += 'H';
                if (includeTheory) type += 'T';
                if (includePractical) type += 'P';
                if (type === 'SYLLABUS_BOOK_') type = 'SYLLABUS_BOOK';

                // console.log(type);
                createFile({
                  id: reqObj.id,
                  type: type,
                  socketId: socket.id,
                });
              }}
              className='mb-2 mt-2'
            >
              Create Syllabus Book
            </Button>
          </Alert>
          <Alert variant='info'>
            <h4>
              <strong>Create Only Credit and Exam Scheme Structure</strong>
            </h4>
            <Form.Check
              name='semesterChoice'
              type='radio'
              label='Only Even Semesters ?'
              value='even'
              checked={semesterChoice === 'even'}
              onChange={onChangeRadio}
            />
            <Form.Check
              name='semesterChoice'
              type='radio'
              label='Only Odd Semesters ?'
              value='odd'
              checked={semesterChoice === 'odd'}
              onChange={onChangeRadio}
            />
            <Form.Check
              name='semesterChoice'
              type='radio'
              label='All Semesters ?'
              value='all'
              checked={semesterChoice === 'all'}
              onChange={onChangeRadio}
            />
            <br />
            <p>
              <strong>
                Will create Credit and Exam Scheme Structure with there
                respective headmaster:
              </strong>
              <br />
              <strong>Part 1:</strong> Total Credit and Exam Scheme score
              semester wise <br />
              <strong>Part 2:</strong> Subject Wise Credit and Exam Scheme
              structure <br />
            </p>
            <Button
              variant='primary'
              onClick={() => {
                let type = 'CE_';
                type = type.concat(semesterChoice.toUpperCase());

                // console.log(type);
                createFile({
                  id: reqObj.id,
                  type: type,
                  socketId: socket.id,
                });
              }}
              className='mb-2 mt-2'
            >
              Create Credit/Exam Scheme Structure
            </Button>
          </Alert>
        </div>
      )}
    </div>
  );
};

CreateFile.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default CreateFile;
