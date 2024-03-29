import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  iconUser,
  iconLogOut,
  iconLogIn,
  iconRegister,
  iconHome,
  iconAbout,
  iconUserProfile,
  iconDashboard,
  iconAnnouncement,
  iconSyllabusManger,
  iconAdminBoard,
} from './Icon';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
  Spinner,
} from 'react-bootstrap';

// Layout Notification
import Notification from './Notification';

// Context
import AuthContext from '../../context/auth/authContext';
import LoadingContext from '../../context/loading/loadingContext';
import NotificationContext from '../../context/notification/notificationContext';
import ConfigContext from '../../context/config/configContext';

const MainNavbar = () => {
  const histroy = useHistory();
  const authContext = useContext(AuthContext);
  const loadingContext = useContext(LoadingContext);
  const notificationContext = useContext(NotificationContext);
  const configContext = useContext(ConfigContext);

  const { isAuthenticated, user, loadUser, logout } = authContext;
  const { loading } = loadingContext;
  const {
    initNotification,
    socket,
    reconnectNotification,
  } = notificationContext;
  const { initConfig } = configContext;

  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    initConfig();
    loadUser();
    console.log('Yes');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user && user.id) {
      initNotification(user.id);
    }
    // eslint-disable-next-line
  }, [user]);

  const onClickLogout = () => {
    logout();
    socket.disconnect();
  };

  if (socket) {
    if (socket._callbacks) {
      if (!socket._callbacks.$disconnect) {
        socket.on('disconnect', () => {
          console.log('Disconnected');
          socket.disconnect();
          setIsDisconnected(true);
        });
      }
    }
  }

  if (socket) {
    if (socket._callbacks) {
      if (socket._callbacks.$connect) {
        if (socket._callbacks.$connect.length < 2) {
          socket.on('connect', () => {
            console.log('Connected');
            setIsDisconnected(false);
          });
        }
      }
    }
  }

  const reconnect = () => {
    reconnectNotification();
  };

  const guestLinks = (
    <Fragment>
      <Navbar.Brand as={Link} to='/'>
        <strong>DDIT Syllabus Management System</strong>
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link as={Link} to='/'>
          {iconHome} Home
        </Nav.Link>
        <Nav.Link as={Link} to='/about'>
          {iconAbout} About
        </Nav.Link>
      </Nav>
      <div>
        {loading ? (
          <Fragment>
            <Spinner animation='border' variant='light' size='sm' />{' '}
          </Fragment>
        ) : null}
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <Button variant='secondary'>{iconLogIn} Log In</Button>
        </Link>{' '}
        <Link to='/register' style={{ textDecoration: 'none' }}>
          <Button>{iconRegister} Register</Button>
        </Link>
      </div>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Navbar.Brand as={Link} to='/'>
        <strong>DSMS</strong>
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link as={Link} to='/announcement'>
          {iconAnnouncement} Announcement
        </Nav.Link>
        <Nav.Link as={Link} to='/dashboard'>
          {iconDashboard} Dashboard
        </Nav.Link>
        {user && (user.role === 'syllabus-manager' || user.role === 'admin') && (
          <Nav.Link as={Link} to='/syllabus-manager'>
            {iconSyllabusManger} Syllabus Manager
          </Nav.Link>
        )}
        {user && user.role === 'admin' && (
          <Nav.Link as={Link} to='/admin-board'>
            {iconAdminBoard} Admin Board
          </Nav.Link>
        )}
      </Nav>
      <div>
        {loading ? (
          <Fragment>
            <Spinner animation='border' variant='light' size='sm' />{' '}
          </Fragment>
        ) : null}
        {isDisconnected && (
          <Fragment>
            <Button variant='danger' onClick={reconnect}>
              You Are Disconnected
            </Button>{' '}
          </Fragment>
        )}
        <Notification />
        <Dropdown as={ButtonGroup}>
          <Button
            variant='success'
            onClick={() => {
              histroy.push('/profile');
            }}
          >
            {iconUser} {user != null && user.name.split('-')[0]}
          </Button>

          <Dropdown.Toggle split variant='success' id='dropdown-split-basic' />

          <Dropdown.Menu align='right'>
            <Dropdown.Item as='div'>
              <Link to='/profile' style={{ textDecoration: 'none' }}>
                <Button variant='light' block>
                  {iconUserProfile} Your Profile
                </Button>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as='div'>
              <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                <Button variant='light' block>
                  {iconDashboard} Dashboard
                </Button>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as='div'>
              <Button variant='danger' block onClick={onClickLogout}>
                {iconLogOut} Log Out
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Fragment>
  );

  return (
    <Navbar bg='dark' variant='dark'>
      {isAuthenticated ? authLinks : guestLinks}
    </Navbar>
  );
};

export default MainNavbar;
