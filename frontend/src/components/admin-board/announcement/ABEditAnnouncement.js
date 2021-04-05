import React, { useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

// Announcement Model Components
import EditAnnouncement from '../../models/announcement/EditAnnouncement';
import ViewAnnouncement from '../../models/announcement/ViewAnnouncement';

// Context
import AnnouncementContext from '../../../context/announcement/announcementContext';

const ABEditAnnouncement = () => {
  const announcementContext = useContext(AnnouncementContext);
  const {
    announcements,
    getAnnouncement,
    getAnnouncements,
    announcement,
  } = announcementContext;

  const [operationMode, setOperationMode] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getAnnouncement(id);
  };

  const onAnnouncementSelectClick = () => {
    if (operationMode === 'original') {
      setMode('original');
    }
    setIsSelected(false);
    setOperationMode('');
  };

  const selectionList = () => {
    return (
      <div>
        <Button
          block
          size='sm'
          className='mb-3'
          onClick={() => {
            getAnnouncements();
          }}
        >
          Get Announcements
        </Button>
        {announcements &&
          announcements.map((it, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(it.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {it.title}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <br />
      <h2>
        <strong>Edit/Clone Announcement</strong>
      </h2>
      <div className='mb-3'>
        Select operation :{' '}
        <Button
          variant={operationMode === 'original' ? 'info' : 'outline-info'}
          onClick={() => {
            operationMode === 'original'
              ? setOperationMode('')
              : setOperationMode('original');
          }}
          block
        >
          Set Original Announcement
        </Button>
      </div>
      {operationMode && (
        <Card>
          <Card.Header>
            Find and Select for setting original announcement
          </Card.Header>
          <Card.Body>
            {isSelected ? (
              <div>
                <ViewAnnouncement announcement={announcement} />
                <br />
                <Button variant='success' onClick={onAnnouncementSelectClick}>
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
      <EditAnnouncement mode={mode} setMode={setMode} />
      <br />
    </div>
  );
};

export default ABEditAnnouncement;
