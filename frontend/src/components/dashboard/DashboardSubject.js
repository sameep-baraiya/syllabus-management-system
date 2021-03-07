import React, { Fragment, useContext, useState } from 'react';
import SubjectContext from '../../context/subject/subjectContext';
// import DownloadContext from '../../context/download/downloadContext';

import { Button, ButtonGroup } from 'react-bootstrap';
import {
  iconCardView,
  iconListView,
  iconJsonView,
  iconResult,
} from '../layout/Icon';

// Subject Views
// import SubjectCardView from './SubjectCardView';
// import itemListView from './itemListView';
// import itemJsonView from './itemJsonView';

// Subject Componets
import FindSubject from '../models/subject/FindSubject';
import ViewSubject from '../models/subject/ViewSubject';

const DashboardSubject = () => {
  const subjectContext = useContext(SubjectContext);
  const { subjects } = subjectContext;

  // const downloadContext = useContext(DownloadContext);
  // const { download } = downloadContext;

  // const downloadFile = (e) => {
  //   download(e.target.name);
  // };

  const [viewMode, setViewMode] = useState('card');

  return (
    <Fragment>
      <FindSubject defaultSelect='all' />
      <h4>
        <strong>{iconResult} Result :</strong>

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
      </h4>
      <br />
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
        viewMode === 'card' &&
        subjects.map((it, index) => {
          return <ViewSubject subject={it} key={index} />;
        })}
      {/* {subjects && viewMode === 'list' && itemListView(subjects)} */}

      <br />
    </Fragment>
  );
};

export default DashboardSubject;
