import React, { Fragment, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Context
import SubjectContext from '../../../context/subject/subjectContext';
import ConfigContext from '../../../context/config/configContext';

// Utils
import s2pn from '../../../utils/s2pn';
import {
  departmentTypeOptions,
  // TODO Add This
  // subjectTypeOptions,
} from '../../../utils/configUtils';

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

const FindSubject = ({ defaultSelect = 'all' }) => {
  const subjectContext = useContext(SubjectContext);
  const { getSubjects, clearSubjects } = subjectContext;

  const configContext = useContext(ConfigContext);
  const { departmentType } = configContext;

  // Normal Search
  const [searchQuery, setSearchQuery] = useState({
    search: '',
    page: 0,
    select:
      defaultSelect !== 'smp'
        ? defaultSelect
        : 'id,subjectCode,subjectName,subjectShort,noOfFiles,department,isElective,semNo,listIndex,isFreezed,isOutdated,createdAt,updatedAt,headMasterJSON,updateNo',
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
    clearSubjects();
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

  // const onPaginationClick = (e) => {
  //   let page = -1;
  //   switch (e.target.name) {
  //     case 'first':
  //       page = pagination.prev !== undefined ? 0 : -1;
  //       break;
  //     case 'previous':
  //       page = pagination.prev !== undefined ? pagination.prev.page : -1;
  //       break;
  //     case 'current':
  //       page = pagination.current.page;
  //       break;
  //     case 'next':
  //       page = pagination.next !== undefined ? pagination.next.page : -1;
  //       break;
  //     case 'last':
  //       page =
  //         pagination.next !== undefined
  //           ? Math.ceil(total / pagination.current.limit) - 1
  //           : -1;
  //       break;
  //     default:
  //       page = -1;
  //   }
  //   if (page !== -1) {
  //     if (isAdvanced) {
  //       const copy = { ...advancedSearchQuery };
  //       if (copy.select === 'all') {
  //         delete copy.select;
  //       }
  //       copy.search = search;
  //       getSubjects({
  //         ...copy,
  //         page,
  //       });
  //     } else {
  //       getSubjects({
  //         ...searchQuery,
  //         page,
  //       });
  //     }
  //   }
  // };

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
          select: 'id,subjectCode,subjectName',
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
      getSubjects(copy);
    } else {
      const copy = { ...searchQuery };
      if (copy.select === 'all') {
        delete copy.select;
      }
      copy.search = search;
      getSubjects(copy);
    }
  };

  const advancedSearch = () => (
    <Form.Group as={Row} controlId='FindSubject.advancedSubjectSearch'>
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
              name='select.semNo'
              type='checkbox'
              label='Semester Number'
              onChange={onChange}
            />
            <Form.Check
              name='select.listIndex'
              type='checkbox'
              label='Index Number In List'
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
          <option value='semNo'>Semester Number</option>
          <option value='listIndex'>Index Number In List</option>
          <option value='noOfFiles'>No Of Files</option>
          <option value='isOutdated'>Is Outdated</option>
          <option value='isFreezed'>Is Freezed</option>
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
        <Form.Label>No Of Files ?</Form.Label>
        <Form.Control
          name='where.noOfFiles'
          type='number'
          placeholder='Enter No Of Files'
          onChange={onChange}
        />
        <br />
        <Form.Label>Is Freezed ?</Form.Label>
        <Form.Control name='where.isFreezed' as='select' onChange={onChange}>
          <option>None</option>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </Form.Control>
      </Col>

      <Col sm={4}>
        <h5>Where Clause</h5>
        <Form.Label>Department ?</Form.Label>
        <Form.Control name='where.department' as='select' onChange={onChange}>
          <option>None</option>
          {departmentTypeOptions(departmentType)}
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
        <br />
        <Form.Label>Semester Number ?</Form.Label>
        <Form.Control
          name='where.semNo'
          type='number'
          placeholder='Enter Semester Number'
          onChange={onChange}
        />
        <br />
        <Form.Label>Index Number In List ?</Form.Label>
        <Form.Control
          name='where.listIndex'
          type='number'
          placeholder='Enter Index Number In List'
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );

  return (
    <Form onSubmit={onSearch}>
      <Form.Group controlId='FindSubject.subjectSearch'>
        <h3>
          <strong>{iconSearch} Search Subjects</strong>
        </h3>

        {isAdvanced || defaultSelect === 'smp' ? null : (
          <p className='h6 text-muted'>
            <strong>Default Selected Fields: </strong>
            {searchQuery.select.split(',').join(', ')}
          </p>
        )}

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
  );
};

FindSubject.propTypes = {
  defaultSelect: PropTypes.string.isRequired,
};

export default FindSubject;
