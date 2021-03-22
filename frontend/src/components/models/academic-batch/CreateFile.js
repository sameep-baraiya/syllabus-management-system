import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Context
import AcademicBatchContext from '../../../context/academicBatch/academicBatchContext';
import NotificationContext from '../../../context/notification/notificationContext';

const CreateFile = ({ mode, setMode }) => {
  const academicBatchContext = useContext(AcademicBatchContext);
  const notificationContext = useContext(NotificationContext);

  const { academicBatch, createFile } = academicBatchContext;
  const { socket } = notificationContext;

  // const [once, setOnce] = useState(false);

  const [reqObj, setReqObj] = useState({
    id: 0,
  });

  const doSelect = () => {
    setReqObj({
      socketId: socket.id,
      id: academicBatch ? academicBatch.id : 0,
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

  if (!socket._callbacks.$CREATE_FILE) {
    socket.on('CREATE_FILE', (data) => {
      console.log(data);
    });
  }

  console.log();

  return (
    <div>
      <div>Selected Acadmic Batch Id: {reqObj.id}</div>
      <Button
        variant='primary'
        onClick={() => {
          createFile({
            id: reqObj.id,
            type: 'SYLLABUS_BOOK_H',
            socketId: socket.id,
          });
        }}
      >
        Create Syllabus Book
      </Button>
    </div>
  );
};

CreateFile.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default CreateFile;
