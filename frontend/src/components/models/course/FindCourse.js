import React, { Fragment, useContext, useState, useEffect } from 'react';
import CourseContext from '../../../context/course/courseContext';
import PropTypes from 'prop-types';

// Common
import { departmentOptions } from '../../../common/department';
import { courseTypeOptions } from '../../../common/courseType';

// Utils
import s2pn from '../../../utils/s2pn';

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

const FindCourse = ({ defaultSelect = 'all' }) => {
  const courseContext = useContext(CourseContext);
  const { getCourses, clearCourses } = courseContext;

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
    clearCourses();
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
          select: 'id,courseCode,courseName',
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
      getCourses(copy);
    } else {
      const copy = { ...searchQuery };
      if (copy.select === 'all') {
        delete copy.select;
      }
      copy.search = search;
      getCourses(copy);
    }
  };

  const advancedSearch = () => (
    <Form.Group as={Row} controlId='FindCourse.advancedCourseSearch'>
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
              name='select.courseCode'
              type='checkbox'
              label='Course Code'
              defaultChecked
              disabled
            />
            <Form.Check
              name='select.courseName'
              type='checkbox'
              label='Course Name'
              defaultChecked
              disabled
            />
            <Form.Check
              name='select.courseDescription'
              type='checkbox'
              label='Course Description'
              onChange={onChange}
            />
            <Form.Check
              name='select.courseType'
              type='checkbox'
              label='Course Type'
              onChange={onChange}
            />
            <Form.Check
              name='select.department'
              type='checkbox'
              label='Department'
              onChange={onChange}
            />
            <Form.Check
              name='select.noOfSem'
              type='checkbox'
              label='Number of Semester'
              onChange={onChange}
            />
            <Form.Check
              name='select.monthPerSem'
              type='checkbox'
              label='Month Per Semester'
              onChange={onChange}
            />
            <Form.Check
              name='select.isElective'
              type='checkbox'
              label='Is Elective'
              onChange={onChange}
            />
            <Form.Check
              name='select.isOutdated'
              type='checkbox'
              label='Is Outdated'
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
          <option value='courseCode'>Course Code</option>
          <option value='courseName'>Course Name</option>
          <option value='courseType'>Course Short</option>
          <option value='department'>Department</option>
          <option value='noOfSem'>Number of Semester</option>
          <option value='monthPerSem'>Month Per Semester</option>
          <option value='isOutdated'>Is Outdated</option>
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
        <hr />
        <Form.Label>Month Per Semester ?</Form.Label>
        <Form.Control
          name='where.monthPerSem'
          type='number'
          placeholder='Enter Month Per Semester'
          onChange={onChange}
        />
      </Col>

      <Col sm={4}>
        <h5>Where Clause</h5>
        <Form.Label>Department ?</Form.Label>
        <Form.Control name='where.department' as='select' onChange={onChange}>
          <option>None</option>
          {departmentOptions()}
        </Form.Control>
        <br />
        <Form.Label>Course Type ?</Form.Label>
        <Form.Control name='where.courseType' as='select' onChange={onChange}>
          <option>None</option>
          {courseTypeOptions()}
        </Form.Control>
        <br />
        <Form.Label>Is Freezed ?</Form.Label>
        <Form.Control name='where.isFreezed' as='select' onChange={onChange}>
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
        <Form.Label>Number of Semester ?</Form.Label>
        <Form.Control
          name='where.noOfSem'
          type='number'
          placeholder='Enter Number of Semester'
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );

  return (
    <Form onSubmit={onSearch}>
      <Form.Group controlId='FindCourse.courseSearch'>
        <h3>
          <strong>{iconSearch} Search courses</strong>
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
            placeholder='Search by Course Code, Course Name'
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

FindCourse.propTypes = {
  defaultSelect: PropTypes.string.isRequired,
};

export default FindCourse;
