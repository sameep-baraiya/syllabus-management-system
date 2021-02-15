import React, { Fragment } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { iconSubject } from '../layout/Icon';

// TODO Improve This
// Nested Syllabus Manager Route
import AllSubjects from './AllSubjects';
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
        <Link to='/dashboard/subject/'>• Show all Subject</Link>
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
              component={AllSubjects}
            />

            <Route component={NotFound} />
          </Switch>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
