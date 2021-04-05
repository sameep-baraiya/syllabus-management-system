import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';

// Layout
import { iconAnnouncement } from '../layout/Icon';

// Context
import AnnouncementContext from '../../context/announcement/announcementContext';

// Announcement Model Components
import ViewAnnouncement from '../models/announcement/ViewAnnouncement';

const Announcement = () => {
  const announcementContext = useContext(AnnouncementContext);
  const { announcements, getAnnouncements } = announcementContext;

  return (
    <div>
      <br />
      <h2>
        <strong>{iconAnnouncement} Announcement</strong>
      </h2>
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
          <div key={index} className='mb-3'>
            <ViewAnnouncement announcement={it} />
          </div>
        ))}
    </div>
  );
};

export default Announcement;
