import React, { Fragment, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Container,
  Col,
  Row,
  Button,
  Card,
  ButtonGroup,
} from 'react-bootstrap';
import { iconPassword, iconEmail } from '../layout/Icon';

const LogIn = () => {
  const histroy = useHistory();
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      histroy.push('/dashboard');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const register = () => {
    histroy.push('register');
  };

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const clearData = (e) => {
    setUser({
      email: '',
      password: '',
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      console.log('Empty Fields');
      // setAlert('Please enter all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  const loginForm = (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId='loginEmail'>
        <Form.Label>{iconEmail} Email address</Form.Label>
        <Form.Control
          name='email'
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={onChange}
        />
        <Form.Text className='text-muted'>
          Enter university email address
        </Form.Text>
      </Form.Group>
      <Form.Group controlId='loginPassword'>
        <Form.Label>{iconPassword} Password</Form.Label>
        <Form.Control
          name='password'
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={onChange}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>{' '}
      <Button variant='secondary' type='reset' onClick={clearData}>
        Clear
      </Button>
    </Form>
  );

  return (
    <Fragment>
      <br />
      <Container>
        <h2>Log In</h2>
        <Row>
          <Col sm={8}>{loginForm}</Col>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>Don't have account</Card.Title>
                <Card.Text>
                  For creating a new faculty-member/syllabus-manager account
                  request go to the register page.
                </Card.Text>
                <Button variant='success' onClick={register}>
                  Register New User
                </Button>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <Card.Title>Account recovery</Card.Title>
                <Card.Text>
                  {' '}
                  Recover your DDIT Syllabus Management System Account{' '}
                </Card.Text>
                <ButtonGroup aria-label='Basic example'>
                  <Button variant='warning'>Forgot Password</Button>
                  <Button variant='info'>Forgot Email</Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LogIn;
