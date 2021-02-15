import React, { Fragment, useContext, useEffect, useState } from 'react';
import SubjectContext from '../../context/subject/subjectContext';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import {
  iconCardView,
  iconListView,
  iconJsonView,
  iconResult,
} from '../layout/Icon';

// Subject Views
import subjectCardView from './subjectCardView';
import subjectListView from './subjectListView';
import subjectJsonView from './subjectJsonView';

const AllSubjects = () => {
  const subjectContext = useContext(SubjectContext);
  const { subjects, getSubjects } = subjectContext;

  const [viewMode, setViewMode] = useState('card');

  useEffect(() => {
    console.log('All Subjects useEffect');
    getSubjects();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h3>List of all subjects</h3>
      <h5>
        Number of subjects {subjects && subjects.length}
        <ButtonGroup aria-label='viewMode' className='float-right'>
          <Button
            name='card'
            variant={viewMode === 'card' ? 'success' : 'warning'}
            onClick={() => setViewMode('card')}
          >
            {iconCardView}
          </Button>
          <Button
            name='list'
            variant={viewMode === 'list' ? 'success' : 'warning'}
            onClick={() => setViewMode('list')}
          >
            {iconListView}
          </Button>
          <Button
            name='json'
            variant={viewMode === 'json' ? 'success' : 'warning'}
            onClick={() => setViewMode('json')}
          >
            {iconJsonView}
          </Button>
        </ButtonGroup>
      </h5>
      <br />
      <Card>
        <Card.Body>
          <h4>
            <strong>{iconResult} Result :</strong>
          </h4>
          {subjects &&
            viewMode === 'card' &&
            subjects.map((it, index) => {
              return subjectCardView(it, index);
            })}
          {subjects && viewMode === 'list' && subjectListView(subjects)}
          {subjects &&
            viewMode === 'json' &&
            subjects.map((it, index) => {
              return subjectJsonView(it, index);
            })}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default AllSubjects;
