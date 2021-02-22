import React, { Fragment } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { iconSubject, iconCourse } from '../layout/Icon';

// Nested Syllabus Manager Route
import FindSubjects from './FindSubjects';
import FindCourse from './FindCourse';
import DefaultDashboard from './DefaultDashboard';

// Routing Componets
import PrivateRoute from '../routing/PrivateRoute';

// Page Componets
import NotFound from '../page/NotFound';

const Dashboard = (props) => {
  const SMNavigation = (
    <Card>
      <Card.Body>
        <Card.Title>{iconSubject} Subject</Card.Title>
        <Link to='/dashboard/subject/'>• Find Subjects</Link>
        <br />
        <br />
        <Card.Title>{iconCourse} Course</Card.Title>
        <Link to='/dashboard/course/'>• Find Course</Link>
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
              path='/dashboard/'
              component={DefaultDashboard}
            />
            <PrivateRoute
              exact
              path='/dashboard/subject'
              component={FindSubjects}
            />
            <PrivateRoute
              exact
              path='/dashboard/course'
              component={FindCourse}
            />

            <Route component={NotFound} />
          </Switch>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
