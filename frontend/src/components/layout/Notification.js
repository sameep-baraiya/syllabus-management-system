import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';

// Custom popover css
import '../style/popover.css';

// Icons
import { iconNotification } from './Icon';

// Context
import NotificationContext from '../../context/notification/notificationContext';

const Notification = () => {
  const notificationContext = useContext(NotificationContext);
  const { tray, clearNotifications } = notificationContext;

  const [show, setShow] = useState(false);
  const [visited, setVisited] = useState(true);

  useEffect(() => {
    if (tray) {
      setVisited(false);
    }
    // eslint-disable-next-line
  }, [tray]);
  return (
    <Fragment>
      <div className='notification_popover_wrapper'>
        <Button
          variant='warning'
          onClick={() => {
            setShow(!show);
            setVisited(true);
          }}
          active={show}
        >
          <span className={!visited ? 'notification_rotate' : ''}>
            {iconNotification}
          </span>
          {tray && <span> +{tray.length}</span>}
        </Button>
        <div
          className={`notification_popover_content ${
            show && 'notification_popover_show'
          }`}
        >
          <div>
            {!tray && (
              <div className='mb-2 text-center'>
                <strong className='text-muted'>
                  You Have No New Notifications
                </strong>
              </div>
            )}
            {tray &&
              tray.map((it, index) => (
                <Fragment key={index}>
                  <Card bg={it.type} text='white' className='mb-2'>
                    <Card.Body>
                      <Card.Text>{it.msg}</Card.Text>
                    </Card.Body>
                  </Card>
                </Fragment>
              ))}
            <Button
              variant='warning'
              size='sm'
              block
              onClick={() => {
                clearNotifications();
              }}
            >
              Clear Notifications
            </Button>
          </div>
        </div>
      </div>{' '}
    </Fragment>
  );
};

export default Notification;
