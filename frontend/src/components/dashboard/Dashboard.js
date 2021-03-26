import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// Dashboard Sub Componentes
import DashboardSubject from './DashboardSubject';
import DashboardCourse from './DashboardCourse';
import DashboardAcademicBatch from './DashboardAcademicBatch';
import DashboardMeeting from './DashboardMeeting';

// Default Dashboard Componentes
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
        <PrivateRoute
          exact
          path='/dashboard/course'
          component={DashboardCourse}
        />
        <PrivateRoute
          exact
          path='/dashboard/academic-batch'
          component={DashboardAcademicBatch}
        />
        <PrivateRoute
          exact
          path='/dashboard/meeting'
          component={DashboardMeeting}
        />
        {/* <PrivateRoute exact path='/dashboard/course' component={FindCourse} /> */}

        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Dashboard;
