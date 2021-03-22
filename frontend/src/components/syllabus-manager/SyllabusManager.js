import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Subject Components
import SMCreateSubject from './subject/SMCreateSubject';
import SMEditSubject from './subject/SMEditSubject';
import SMDeleteSubject from './subject/SMDeleteSubject';

// Course Components
import SMCreateCourse from './course/SMCreateCourse';
import SMEditCourse from './course/SMEditCourse';
import SMDeleteCourse from './course/SMDeleteCourse';

// Academic Batch Components
import SMCreateAcademicBatch from './academic-batch/SMCreateAcademicBatch';
import SMCreateFile from './academic-batch/SMCreateFile';

// Nested Syllabus Manager Route
// import CreateViaCSV from './CreateViaCSV';
// import CreateCourse from './CreateCourse';
import DefaultSM from './DefaultSM';
// import CreateSubject from './CreateSubject';
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
        path='/syllabus-manager/subject'
        component={SMCreateSubject}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/subject/edit'
        component={SMEditSubject}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/subject/delete'
        component={SMDeleteSubject}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/course/'
        component={SMCreateCourse}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/course/edit'
        component={SMEditCourse}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/course/delete'
        component={SMDeleteCourse}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/academic-batch'
        component={SMCreateAcademicBatch}
      />
      <PrivateRoute
        exact
        path='/syllabus-manager/academic-batch/create-file'
        component={SMCreateFile}
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
