import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// Nested Syllabus Manager Route
import DashboardSubject from './DashboardSubject';
// import FindCourse from './FindCourse';
import DefaultDashboard from './DefaultDashboard';

// Routing Componets
import PrivateRoute from '../routing/PrivateRoute';

// Page Componets
import NotFound from '../page/NotFound';

const Dashboard = (props) => {
  return (
    <Fragment>
      <Switch>
        <PrivateRoute exact path='/dashboard/' component={DefaultDashboard} />
        <PrivateRoute
          exact
          path='/dashboard/subject'
          component={DashboardSubject}
        />
        {/* <PrivateRoute exact path='/dashboard/course' component={FindCourse} /> */}

        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Dashboard;
