import React, { Fragment, useContext, useState, useEffect } from 'react';
import SubjectContext from '../../context/subject/subjectContext';
import DownloadContext from '../../context/download/downloadContext';

import {
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  FormControl,
  Pagination,
  Row,
  Col,
} from 'react-bootstrap';
import {
  iconCardView,
  iconListView,
  iconJsonView,
  iconResult,
} from '../layout/Icon';

// Subject Views
import SubjectCardView from './SubjectCardView';
import itemListView from './itemListView';
import itemJsonView from './itemJsonView';

const FindSubjects = () => {
  const subjectContext = useContext(SubjectContext);
  const {
    subjects,
    getSubjects,
    clearSubjects,
    total,
    pagination,
  } = subjectContext;

  const downloadContext = useContext(DownloadContext);
  const { download } = downloadContext;

  const downloadFile = (e) => {
    download(e.target.name);
  };

  const [viewMode, setViewMode] = useState('card');

  const [searchQuery, setSearchQuery] = useState({
    search: '',
    page: 0,
  });
  const { search } = searchQuery;

  const [advancedSearchQuery, setAdvancedSearchQuery] = useState({
    page: 0,
    select: 'all',
    sortBy: 'id',
    sort: 'ASC',
    limit: 5,
    attributes: {},
  });

  const { select, attributes } = advancedSearchQuery;

  const [isAdvanced, setIsAdvanced] = useState(false);

  useEffect(() => {
    clearSubjects();
    // eslint-disable-next-line
  }, [search]);

  const onSearchInputChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      search: e.target.value,
    });
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (isAdvanced) {
      const copy = { ...advancedSearchQuery };
      if (copy.select === 'all') {
        delete copy.select;
      }
      copy.search = search;
      getSubjects(copy);
    } else {
      getSubjects(searchQuery);
    }
  };

  const onPaginationClick = (e) => {
    let page = -1;
    switch (e.target.name) {
      case 'first':
        page = pagination.prev !== undefined ? 0 : -1;
        break;
      case 'previous':
        page = pagination.prev !== undefined ? pagination.prev.page : -1;
        break;
      case 'current':
        page = pagination.current.page;
        break;
      case 'next':
        page = pagination.next !== undefined ? pagination.next.page : -1;
        break;
      case 'last':
        page =
          pagination.next !== undefined
            ? Math.ceil(total / pagination.current.limit) - 1
            : -1;
        break;
      default:
        page = -1;
    }
    if (page !== -1) {
      if (isAdvanced) {
        const copy = { ...advancedSearchQuery };
        if (copy.select === 'all') {
          delete copy.select;
        }
        copy.search = search;
        getSubjects({
          ...copy,
          page,
        });
      } else {
        getSubjects({
          ...searchQuery,
          page,
        });
      }
    }
  };

  const onChange = (e) => {
    switch (e.target.name.split('.')[0]) {
      case 'select':
        selectionClause(e);
        break;
      case 'sortBy':
      case 'sort':
        nameClause(e);
        break;
      case 'limit':
        numberClause(e);
        break;
      case 'where':
        whereClause(e);
        break;
      default:
    }
  };

  const selectionClause = (e) => {
    if (e.target.name === 'select.all') {
      if (e.target.checked === true) {
        setAdvancedSearchQuery({
          ...advancedSearchQuery,
          select: 'all',
        });
      } else {
        setAdvancedSearchQuery({
          ...advancedSearchQuery,
          select: 'subjectCode,subjectName',
        });
      }
    } else {
      const newSelectTerm = e.target.name.split('.').pop();
      if (e.target.checked === true) {
        setAdvancedSearchQuery({
          ...advancedSearchQuery,
          select: `${select},${newSelectTerm}`,
        });
      } else {
        setAdvancedSearchQuery({
          ...advancedSearchQuery,
          select: select.replace(`,${newSelectTerm}`, ''),
        });
      }
    }
  };

  const nameClause = (e) => {
    setAdvancedSearchQuery({
      ...advancedSearchQuery,
      [e.target.name]: e.target.value,
    });
  };

  const numberClause = (e) => {
    setAdvancedSearchQuery({
      ...advancedSearchQuery,
      [e.target.name]: isNaN(parseInt(e.target.value))
        ? 0
        : parseInt(e.target.value),
    });
  };

  const whereClause = (e) => {
    const setField = e.target.name.split('.').pop();
    if (e.target.value !== 'None' && e.target.value !== '') {
      if (setField === 'updateNo') {
        attributes[setField] = isNaN(parseInt(e.target.value))
          ? 0
          : parseInt(e.target.value);
        setAdvancedSearchQuery({
          ...advancedSearchQuery,
          attributes,
        });
      } else {
        attributes[setField] = e.target.value;
        setAdvancedSearchQuery({
          ...advancedSearchQuery,
          attributes,
        });
      }
    } else {
      delete attributes[setField];
      setAdvancedSearchQuery({
        ...advancedSearchQuery,
        attributes,
      });
    }
  };

  const onClickAdvanved = (e) => {
    if (isAdvanced === false) {
      setAdvancedSearchQuery({
        search: '',
        page: 0,
        select: 'all',
        sortBy: 'id',
        sort: 'ASC',
        limit: 5,
        attributes: {},
      });
    }
    setIsAdvanced(!isAdvanced);
  };

  const advancedSearch = () => (
    <Form.Group as={Row} controlId='dAdvancedSubjectSearch'>
      <Col sm={4}>
        <h5>Selections Clause</h5>
        <Form.Check
          name='select.all'
          type='checkbox'
          label='All (default)'
          onChange={onChange}
          defaultChecked
        />
        <hr />
        {advancedSearchQuery.select !== 'all' ? (
          <Fragment>
            <Form.Check
              name='select.subjectCode'
              type='checkbox'
              label='Subject Code'
              defaultChecked
              disabled
            />
            <Form.Check
              name='select.subjectName'
              type='checkbox'
              label='Subject Name'
              defaultChecked
              disabled
            />
            <Form.Check
              name='select.subjectShort'
              type='checkbox'
              label='Subject Short'
              onChange={onChange}
            />
            <Form.Check
              name='select.subjectDescription'
              type='checkbox'
              label='Subject Description'
              onChange={onChange}
            />
            <Form.Check
              name='select.department'
              type='checkbox'
              label='Department'
              onChange={onChange}
            />
            <Form.Check
              name='select.headMasterJSON'
              type='checkbox'
              label='Head Master JSON'
              onChange={onChange}
            />
            <Form.Check
              name='select.theory'
              type='checkbox'
              label='Theory'
              onChange={onChange}
            />
            <Form.Check
              name='select.isElective'
              type='checkbox'
              label='Is Elective'
              onChange={onChange}
            />
            <Form.Check
              name='select.practical'
              type='checkbox'
              label='Practical'
              onChange={onChange}
            />
            <Form.Check
              name='select.files'
              type='checkbox'
              label='Files'
              onChange={onChange}
            />
            <Form.Check
              name='select.noOfFiles'
              type='checkbox'
              label='No Of Files'
              onChange={onChange}
            />
            <Form.Check
              name='select.isOutdated'
              type='checkbox'
              label='Is Outdated'
              onChange={onChange}
            />
            <Form.Check
              name='select.updateNo'
              type='checkbox'
              label='Update No'
              onChange={onChange}
            />
            <Form.Check
              name='select.createdAt'
              type='checkbox'
              label='Created At'
              onChange={onChange}
            />
            <Form.Check
              name='select.updatedAt'
              type='checkbox'
              label='Updated At'
              onChange={onChange}
            />
            <Form.Check
              name='select.successorId'
              type='checkbox'
              label='Successor Id'
              onChange={onChange}
            />
            <Form.Check
              name='select.predecessorId'
              type='checkbox'
              label='Predecessor Id'
              onChange={onChange}
            />
          </Fragment>
        ) : null}
      </Col>

      <Col sm={4}>
        <h5>Sorting And Pagination</h5>
        <Form.Label>Sort By</Form.Label>
        <Form.Control name='sortBy' as='select' onChange={onChange}>
          <option value='id'>Id (default)</option>
          <option value='subjectCode'>Subject Code</option>
          <option value='subjectName'>Subject Name</option>
          <option value='subjectShort'>Subject Short</option>
          <option value='department'>Department</option>
          <option value='isElective'>Is Elective</option>
          <option value='noOfFiles'>No Of Files</option>
          <option value='isOutdated'>Is Outdated</option>
          <option value='updateNo'>Update No</option>
          <option value='createdAt'>Created At</option>
          <option value='updatedAt'>Updated At</option>
          <option value='successorId'>Successor Id</option>
          <option value='predecessorId'>Predecessor Id</option>
        </Form.Control>
        <br />
        <Form.Label>Sort Method</Form.Label>
        <Form.Check
          type='radio'
          label='Ascending Order (default)'
          name='sort'
          id='ascSortMethod'
          value='ASC'
          defaultChecked
          onChange={onChange}
        />
        <Form.Check
          type='radio'
          label='Descending Order'
          name='sort'
          value='DESC'
          id='descSortMethod'
          onChange={onChange}
        />
        <br />
        <Form.Label>Results Per Page (default 5)</Form.Label>
        <Form.Control
          name='limit'
          type='number'
          placeholder='Enter limit'
          defaultValue='5'
          onChange={onChange}
        />
      </Col>

      <Col sm={4}>
        <h5>Where Clause</h5>
        <Form.Label>Department ?</Form.Label>
        <Form.Control name='where.department' as='select' onChange={onChange}>
          <option>None</option>
          <option>CH - Chemical Engineering</option>
          <option>CI - Civil Engineering</option>
          <option>CE - Computer Engineering</option>
          <option>EC - Electronic Engineering</option>
          <option>ME - Mechanical Engineering</option>
          <option>IT - Information Technology</option>
        </Form.Control>
        <br />
        <Form.Label>Is Elective ?</Form.Label>
        <Form.Control name='where.isElective' as='select' onChange={onChange}>
          <option>None</option>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </Form.Control>
        <br />
        <Form.Label>Is Outdated ?</Form.Label>
        <Form.Control name='where.isOutdated' as='select' onChange={onChange}>
          <option>None</option>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </Form.Control>
        <br />
        <Form.Label>Update No ?</Form.Label>
        <Form.Control
          name='where.updateNo'
          type='number'
          placeholder='Enter Update No'
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );

  return (
    <Fragment>
      <Form onSubmit={onSearch}>
        <Form.Group controlId='dSubjectSearch'>
          <Form.Label>Search Subjects</Form.Label>
          <InputGroup className='mb-3'>
            <FormControl
              name='searchQuery'
              type='text'
              placeholder='Search by Subject Code, Subject Name, Subject Short'
              value={search}
              onChange={onSearchInputChange}
            />
            <InputGroup.Append>
              <Button variant='outline-success' type='submit'>
                Search
              </Button>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button
                variant={isAdvanced ? 'info' : 'outline-info'}
                onClick={onClickAdvanved}
              >
                Advanced Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        {isAdvanced ? advancedSearch() : null}
      </Form>

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
      {pagination && (
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
      )}
      {subjects &&
        viewMode === 'card' &&
        subjects.map((it, index) => {
          return SubjectCardView(it, index, downloadFile);
        })}
      {subjects && viewMode === 'list' && itemListView(subjects)}
      {subjects &&
        viewMode === 'json' &&
        subjects.map((it, index) => {
          return itemJsonView(it, index);
        })}
      <br />
    </Fragment>
  );
};

export default FindSubjects;
