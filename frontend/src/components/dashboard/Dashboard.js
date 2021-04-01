import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// Dashboard Sub Componentes
import DashboardSubject from './DashboardSubject';
import DashboardCourse from './DashboardCourse';
import DashboardAcademicBatch from './DashboardAcademicBatch';
import DashboardMeeting from './DashboardMeeting';

// Default Dashboard Componentes
import DefaultDashboard from './DefaultDashboard';

// Page Componets
import NotFound from '../page/NotFound';

const Dashboard = (props) => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/dashboard/' component={DefaultDashboard} />
        <Route exact path='/dashboard/subject' component={DashboardSubject} />
        <Route exact path='/dashboard/course' component={DashboardCourse} />
        <Route
          exact
          path='/dashboard/academic-batch'
          component={DashboardAcademicBatch}
        />
        <Route exact path='/dashboard/meeting' component={DashboardMeeting} />

        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Dashboard;
