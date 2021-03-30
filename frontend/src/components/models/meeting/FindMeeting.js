import React, { Fragment, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Context
import MeetingContext from '../../../context/meeting/meetingContext';
import ConfigContext from '../../../context/config/configContext';

// Utils
import s2pn from '../../../utils/s2pn';
import { departmentTypeOptions } from '../../../utils/configUtils';

// Icons
import { iconSearch } from '../../layout/Icon';

import {
  Button,
  Form,
  InputGroup,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';

const FindMeeting = ({ defaultSelect = 'all' }) => {
  const meetingContext = useContext(MeetingContext);
  const { getMeetings, clearMeetings } = meetingContext;

  const configContext = useContext(ConfigContext);
  const { departmentType } = configContext;

  // Normal Search
  const [searchQuery, setSearchQuery] = useState({
    search: '',
    page: 0,
    select: defaultSelect,
  });
  const { search } = searchQuery;

  // Advanced Search
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
    clearMeetings();
    // eslint-disable-next-line
  }, [search]);

  // Swiching Between Normal and Advanced Mode
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

  // Normal Search
  const onSearchInputChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      search: e.target.value,
    });
  };

  // Advanced Search
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
      case 'page':
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
          select: 'id,meetingCode',
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
      [e.target.name]: s2pn(e.target.value),
    });
  };

  // TODO Fix here
  const whereClause = (e) => {
    const setField = e.target.name.split('.').pop();
    if (e.target.value !== 'None' && e.target.value !== '') {
      if (
        setField === 'updateNo' ||
        setField === 'semNo' ||
        setField === 'listIndex' ||
        setField === 'noOfFiles'
      ) {
        attributes[setField] = s2pn(e.target.value);
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

  // Fires Search Query
  const onSearch = (e) => {
    e.preventDefault();
    if (isAdvanced) {
      const copy = { ...advancedSearchQuery };
      if (copy.select === 'all') {
        delete copy.select;
      }
      copy.search = search;
      getMeetings(copy);
    } else {
      const copy = { ...searchQuery };
      if (copy.select === 'all') {
        delete copy.select;
      }
      copy.search = search;
      getMeetings(copy);
    }
  };

  const advancedSearch = () => (
    <Form.Group as={Row} controlId='FindMeeting.advancedMeetingSearch'>
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
              name='select.id'
              type='checkbox'
              label='Id'
              defaultChecked
              disabled
            />
            <Form.Check
              name='select.meetingCode'
              type='checkbox'
              label='Meeting Code'
              defaultChecked
              disabled
            />
            <Form.Check
              name='select.meetingsNotes'
              type='checkbox'
              label='Meeting Notes'
              onChange={onChange}
            />
            <Form.Check
              name='select.department'
              type='checkbox'
              label='Department'
              onChange={onChange}
            />
            <Form.Check
              name='select.meetingType'
              type='checkbox'
              label='Meeting Type'
              onChange={onChange}
            />
            <Form.Check
              name='select.dateOfMeeting'
              type='checkbox'
              label='Date Of Meeting'
              onChange={onChange}
            />
            <Form.Check
              name='select.requestedChanges'
              type='checkbox'
              label='Requested Changes'
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
              name='select.isFreezed'
              type='checkbox'
              label='Is Freezed'
              onChange={onChange}
            />
            <Form.Check
              name='select.crudInfo'
              type='checkbox'
              label='Last CRUD Operation Info'
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
          </Fragment>
        ) : null}
      </Col>

      <Col sm={4}>
        <h5>Sorting And Pagination</h5>
        <Form.Label>Sort By</Form.Label>
        <Form.Control name='sortBy' as='select' onChange={onChange}>
          <option value='id'>Id (default)</option>
          <option value='meetingCode'>Meeting Code</option>
          <option value='dateOfMeeting'>Date Of Meeting</option>
          <option value='department'>Department</option>
          <option value='isFreezed'>Is Freezed</option>
          <option value='createdAt'>Created At</option>
          <option value='updatedAt'>Updated At</option>
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
        <br />
        <Form.Label>Page Number (default 0)</Form.Label>
        <Form.Control
          name='page'
          type='number'
          placeholder='Enter Page Number'
          defaultValue='0'
          onChange={onChange}
        />
      </Col>

      <Col sm={4}>
        <h5>Where Clause</h5>
        <Form.Label>Department ?</Form.Label>
        <Form.Control name='where.department' as='select' onChange={onChange}>
          <option>None</option>
          {departmentTypeOptions(departmentType)}
        </Form.Control>
        <br />
        <Form.Label>Is Freezed ?</Form.Label>
        <Form.Control name='where.isFreezed' as='select' onChange={onChange}>
          <option>None</option>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </Form.Control>
      </Col>
    </Form.Group>
  );

  return (
    <Form onSubmit={onSearch}>
      <Form.Group controlId='FindMeeting.meetingSearch'>
        <h3>
          <strong>{iconSearch} Search Meetings</strong>
        </h3>

        {isAdvanced ? null : (
          <p className='h6 text-muted'>
            <strong>Default Selected Fields: </strong>
            {searchQuery.select.split(',').join(', ')}
          </p>
        )}

        <InputGroup className='mb-3'>
          <FormControl
            name='searchQuery'
            type='text'
            placeholder='Search by Meeting Code'
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
  );
};

FindMeeting.propTypes = {
  defaultSelect: PropTypes.string.isRequired,
};

export default FindMeeting;
