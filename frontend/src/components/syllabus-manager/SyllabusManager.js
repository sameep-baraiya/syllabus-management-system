import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Nested Syllabus Manager Route
// import CreateViaCSV from './CreateViaCSV';
// import CreateCourse from './CreateCourse';
import DefaultSM from './DefaultSM';
// import CreateSubject from './CreateSubject';
import SMCreateSubject from './SMCreateSubject';
import SMCreateAcademicBatch from './SMCreateAcademicBatch';
import SMCreateCourse from './SMCreateCourse';
// import CreateAcademicBatch from './CreateAcademicBatch';
import CreateACMeeting from './CreateACMeeting';
import CreateBOSMeeting from './CreateBOSMeeting';

// Routing Componets
import PrivateRoute from '../routing/PrivateRoute';

// Page Componets
import NotFound from '../page/NotFound';

const SyllabusManager = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path='/syllabus-manager/' component={DefaultSM} />
      <PrivateRoute
        exact
        path='/syllabus-manager/course/'
        component={SMCreateCourse}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/subject'
        component={SMCreateSubject}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/academic-batch'
        component={SMCreateAcademicBatch}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/acmeeting'
        component={CreateACMeeting}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/bosmeeting'
        component={CreateBOSMeeting}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default SyllabusManager;
