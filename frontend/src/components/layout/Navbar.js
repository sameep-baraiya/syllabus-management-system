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
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Button, Nav, Dropdown, ButtonGroup } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';

const MainNavbar = () => {
  const histroy = useHistory();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, loadUser, logout } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const login = () => {
    histroy.replace('login');
  };

  // TODO Fix this
  const register = () => {
    histroy.replace('register');
  };

  const dashboard = () => {
    histroy.replace('dashboard');
  };

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
        <Button variant='secondary' onClick={login}>
          {iconLogIn} Log In
        </Button>{' '}
        <Button onClick={register}>{iconRegister} Register</Button>
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
        <Button variant='warning'>{iconNotification}</Button>{' '}
        <Dropdown as={ButtonGroup}>
          <Button variant='success'>
            {iconUser} {user != null && user.name.split('-')[0]}
          </Button>

          <Dropdown.Toggle split variant='success' id='dropdown-split-basic' />

          <Dropdown.Menu align='right'>
            <Dropdown.Item as='div'>
              <Button variant='light' block>
                {iconUserProfile} Your Profile
              </Button>
            </Dropdown.Item>
            <Dropdown.Item as='div'>
              <Button variant='light' block onClick={dashboard}>
                {iconDashboard} Dashboard
              </Button>
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
