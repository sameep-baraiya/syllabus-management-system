import React, { Fragment } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { iconCreateCourse, iconCreateSubject } from '../layout/Icon';

// TODO Improve this
// Nested Syllabus Manager Route
import CreateViaCSV from './CreateViaCSV';
import CreateCourse from './CreateCourse';
import DefaultSM from './DefaultSM';
import CreateSubject from './CreateSubject';

// Routing Componets
import PrivateRoute from '../routing/PrivateRoute';

// Page Componets
import NotFound from '../page/NotFound';

const SyllabusManager = (props) => {
  const SMNavigation = (
    <Card>
      <Card.Body>
        <Card.Title>{iconCreateCourse} Create Course</Card.Title>
        <Link to='/syllabus-manager/course/'>• Create via UI</Link>
        <br />
        <Link to='/syllabus-manager/course/csv'>• Create via CSV</Link>
        <br />
        <br />
        <Card.Title>{iconCreateSubject} Create Subject</Card.Title>
        <Link to='/syllabus-manager/subject/'>• Create via UI</Link>
      </Card.Body>
    </Card>
  );
  return (
    <Fragment>
      <br />
      <Row>
        <Col sm={3}>{SMNavigation}</Col>
        <Col sm={9}>
          <Switch>
            <PrivateRoute
              exact
              path='/syllabus-manager/'
              component={DefaultSM}
            />
            <PrivateRoute
              exact
              path='/syllabus-manager/course/'
              component={CreateCourse}
            />
            <PrivateRoute
              exact
              path='/syllabus-manager/course/csv'
              component={CreateViaCSV}
            />
            <PrivateRoute
              exact
              path='/syllabus-manager/subject'
              component={CreateSubject}
            />
            <Route component={NotFound} />
          </Switch>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SyllabusManager;
