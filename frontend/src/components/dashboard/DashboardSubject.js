import React, { Fragment, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import SubjectContext from '../../context/subject/subjectContext';

import { Button } from 'react-bootstrap';

// Subject Componets
import FindSubject from '../models/subject/FindSubject';
import ViewSubject from '../models/subject/ViewSubject';

const DashboardSubject = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const history = useHistory();
  const subjectContext = useContext(SubjectContext);
  const { subjects, subject, getSubjectByCode, getSubject } = subjectContext;

  if (query.get('subjectCode') || query.get('id')) {
    return (
      <div>
        <br />
        {!(subject && subject.subjectCode === query.get('subjectCode')) && (
          <div className='mb-2'>
            <Button
              onClick={() => {
                if (query.get('id')) {
                  getSubject(query.get('id'));
                } else {
                  getSubjectByCode(query.get('subjectCode'));
                }
              }}
              block
            >
              Get complet details about subject{' '}
              {query.get('id')
                ? `wiht id ${query.get('id')}`
                : `wid code ${query.get('subjectCode')}`}
            </Button>
          </div>
        )}

        {subject &&
          !query.get('id') &&
          subject.subjectCode === query.get('subjectCode') && (
            <ViewSubject subject={subject} />
          )}

        {subject && subject.id === parseInt(query.get('id')) && (
          <ViewSubject subject={subject} />
        )}
      </div>
    );
  } else {
    return (
      <Fragment>
        <br />
        <FindSubject defaultSelect='smp' />
        {/* {pagination && (
        <Pagination>
          <Pagination.Item
            name='first'
            active={pagination.prev === undefined}
            onClick={onPaginationClick}
          >
            First 0
          </Pagination.Item>
          <Pagination.Item
            name='previous'
            disabled={pagination.prev === undefined}
            onClick={onPaginationClick}
          >
            Previous {pagination.prev && pagination.prev.page}
          </Pagination.Item>
          <Pagination.Item name='current' active onClick={onPaginationClick}>
            Current {pagination.current.page}
          </Pagination.Item>
          <Pagination.Item
            name='next'
            disabled={pagination.next === undefined}
            onClick={onPaginationClick}
          >
            Next {pagination.next && pagination.next.page}
          </Pagination.Item>
          <Pagination.Item
            name='last'
            active={pagination.next === undefined}
            onClick={onPaginationClick}
          >
            Last {Math.ceil(total / pagination.current.limit) - 1}
          </Pagination.Item>
          <Pagination.Item disabled>
            <strong>{pagination.current.limit}</strong> Results Per Page
          </Pagination.Item>

          {total !== 0 ? (
            <Pagination.Item disabled>
              Total No Of Results: <strong>{total}</strong>
            </Pagination.Item>
          ) : null}
        </Pagination>
      )} */}
        {subjects &&
          subjects.map((it, index) => {
            return (
              <div key={index} className='mt-3 showon-parent'>
                <ViewSubject subject={it} />
                <Button
                  variant='primary'
                  className='showon-child'
                  block
                  size='sm'
                  onClick={() => {
                    getSubject(it.id);
                    history.push(
                      `/dashboard/subject?subjectCode=${it.subjectCode}`
                    );
                  }}
                >
                  View More
                </Button>
              </div>
            );
          })}
        <br />
      </Fragment>
    );
  }
};

DashboardSubject.propTypes = {
  mode: PropTypes.number,
};

export default DashboardSubject;
