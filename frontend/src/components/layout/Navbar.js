import React, { Fragment, useContext, useEffect } from 'react';
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
  iconNotification,
  iconSyllabusManger,
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
import AuthContext from '../../context/auth/authContext';
import LoadingContext from '../../context/loading/loadingContext';

const MainNavbar = () => {
  const authContext = useContext(AuthContext);
  const loadingContext = useContext(LoadingContext);

  const { isAuthenticated, user, loadUser, logout } = authContext;
  const { loading } = loadingContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onClickLogout = () => {
    logout();
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
        <Nav.Link as={Link} to='/syllabus-manager'>
          {iconSyllabusManger} Syllabus Manager
        </Nav.Link>
      </Nav>
      <div>
        {loading ? (
          <Fragment>
            <Spinner animation='border' variant='light' size='sm' />{' '}
          </Fragment>
        ) : null}
        <Button variant='warning'>{iconNotification}</Button>{' '}
        <Dropdown as={ButtonGroup}>
          <Button variant='success'>
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
