import React, { useContext } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

// Layout
import { iconAnnouncement } from '../layout/Icon';

// Context
import AnnouncementContext from '../../context/announcement/announcementContext';

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
            <Card>
              <Card.Body>
                <Card.Title>
                  {iconAnnouncement} {it.title}
                </Card.Title>
                <Card.Subtitle className='mb-2'>
                  <Badge variant='success'>{it.department}</Badge>
                </Card.Subtitle>
                <Card.Text>{it.msg}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default Announcement;
