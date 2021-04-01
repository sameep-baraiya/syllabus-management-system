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
import SMEditAcademicBatch from './academic-batch/SMEditAcademicBatch';
import SMCreateFile from './academic-batch/SMCreateFile';
import SMDeleteAcademicBatch from './academic-batch/SMDeleteAcademicBatch';

// Meeting Components
import SMCreateMeeting from './meeting/SMCreateMeeting';
import SMEditMeeting from './meeting/SMEditMeeting';
import SMDeleteMeeting from './meeting/SMDeleteMeeting';

// Default Syllabus Manager Page
import DefaultSM from './DefaultSM';

// Page Componets
import NotFound from '../page/NotFound';

const SyllabusManager = (props) => {
  return (
    <Switch>
      <Route exact path='/syllabus-manager/' component={DefaultSM} />
      <Route
        exact
        path='/syllabus-manager/subject'
        component={SMCreateSubject}
      />
      <Route
        exact
        path='/syllabus-manager/subject/edit'
        component={SMEditSubject}
      />
      <Route
        exact
        path='/syllabus-manager/subject/delete'
        component={SMDeleteSubject}
      />
      <Route
        exact
        path='/syllabus-manager/course/'
        component={SMCreateCourse}
      />
      <Route
        exact
        path='/syllabus-manager/course/edit'
        component={SMEditCourse}
      />
      <Route
        exact
        path='/syllabus-manager/course/delete'
        component={SMDeleteCourse}
      />
      <Route
        exact
        path='/syllabus-manager/academic-batch'
        component={SMCreateAcademicBatch}
      />
      <Route
        exact
        path='/syllabus-manager/academic-batch/edit'
        component={SMEditAcademicBatch}
      />
      <Route
        exact
        path='/syllabus-manager/academic-batch/delete'
        component={SMDeleteAcademicBatch}
      />
      <Route
        exact
        path='/syllabus-manager/academic-batch/create-file'
        component={SMCreateFile}
      />
      <Route
        exact
        path='/syllabus-manager/meeting'
        component={SMCreateMeeting}
      />
      <Route
        exact
        path='/syllabus-manager/meeting/edit'
        component={SMEditMeeting}
      />
      <Route
        exact
        path='/syllabus-manager/meeting/delete'
        component={SMDeleteMeeting}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default SyllabusManager;
