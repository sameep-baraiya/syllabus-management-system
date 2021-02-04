import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import {
  Form,
  Container,
  Col,
  Row,
  Button,
  Card,
  InputGroup,
} from 'react-bootstrap';
import {
  iconPassword,
  iconEmail,
  iconFirstName,
  iconMiddleName,
  iconLastName,
  iconContactNumber,
  iconUserRole,
  iconUserTie,
} from '../layout/Icon';

const LogIn = () => {
  const histroy = useHistory();
  const authContext = useContext(AuthContext);

  const { register, registrationDone, clearRegistrationDone } = authContext;

  useEffect(() => {
    if (registrationDone) {
      login();
      clearRegistrationDone();
    }
    // eslint-disable-next-line
  }, [registrationDone]);

  const login = () => {
    histroy.push('login');
  };

  const [user, setUser] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    role: 'faculty-member',
    department: 'None',
    password: '',
    password2: '',
  });

  const {
    firstName,
    middleName,
    lastName,
    email,
    contactNumber,
    role,
    department,
    password,
    password2,
  } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onRoleChange = (e) => {
    setUser({ ...user, role: e.target.id });
  };

  const clearData = (e) => {
    setUser({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      role: 'faculty-member',
      department: 'None',
      password: '',
      password2: '',
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (
      firstName === '' ||
      middleName === '' ||
      lastName === '' ||
      email === '' ||
      contactNumber === '' ||
      password === '' ||
      password2 === '' ||
      department === 'None'
    ) {
      console.log('Empty Fields');
      // setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      console.log('Password not mached');
      // setAlert('Passwords do not match', 'danger');
    } else {
      register({
        firstName,
        middleName,
        lastName,
        email,
        contactNumber,
        role,
        department,
        password,
        password2,
      });
    }
  };

  const loginForm = (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId='registerFirstName'>
        <Form.Label>{iconFirstName} First name</Form.Label>
        <Form.Control
          name='firstName'
          type='text'
          placeholder='Enter first name'
          value={firstName}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId='registerMiddleName'>
        <Form.Label>{iconMiddleName} Middle name</Form.Label>
        <Form.Control
          name='middleName'
          type='text'
          placeholder='Enter middle name'
          value={middleName}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId='registerLastName'>
        <Form.Label>{iconLastName} Last name</Form.Label>
        <Form.Control
          name='lastName'
          type='text'
          placeholder='Enter Last name'
          value={lastName}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId='registerEmail'>
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
      <Form.Group controlId='registerContactNumber'>
        <Form.Label>{iconContactNumber} Contact number</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id='inputGroupPrepend'>+91</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name='contactNumber'
            type='number'
            placeholder='Enter contact'
            value={contactNumber}
            onChange={onChange}
          />
        </InputGroup>
      </Form.Group>
      <hr />
      <Form.Group controlId='registerRole'>
        <Form.Label>{iconUserRole} Role</Form.Label>
        <div key={`inline-radio`} className='mb-2'>
          <Form.Check
            inline
            label='Faculty Member'
            type='radio'
            id='faculty-member'
            name='role'
            onChange={onRoleChange}
            defaultChecked
          />
          <Form.Check
            inline
            label='Syllabus Manager'
            type='radio'
            id='syllabus-manager'
            name='role'
            onChange={onRoleChange}
          />
        </div>
      </Form.Group>
      <Form.Group controlId='registerDepartment'>
        <Form.Label>{iconUserTie} Department</Form.Label>
        <Form.Control
          as='select'
          onChange={onChange}
          name='department'
          value={department}
        >
          <option>None</option>
          <option>CH - Chemical Engineering</option>
          <option>CI - Civil Engineering</option>
          <option>CE - Computer Engineering</option>
          <option>EC - Electronic Engineering</option>
          <option>ME - Mechanical Engineering</option>
          <option>IT - Information Technology</option>
        </Form.Control>
      </Form.Group>
      <hr />
      <Form.Group controlId='registerPassword'>
        <Form.Label>{iconPassword} Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={onChange}
          name='password'
        />
        <Form.Text className='text-muted'>
          Password must be alphanumeric and contain special character(!@#$%^&*)
        </Form.Text>
      </Form.Group>
      <Form.Group controlId='registerConfirmPassword'>
        <Form.Label>{iconPassword} Confirm password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter confirm password'
          value={password2}
          onChange={onChange}
          name='password2'
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
        <h2>Register</h2>
        <Row>
          <Col sm={8}>{loginForm}</Col>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>Already have an account?</Card.Title>
                <Card.Text>
                  If you already have an account go to the login page.
                </Card.Text>
                <Button variant='success' onClick={login}>
                  Login To Existing Account
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LogIn;
